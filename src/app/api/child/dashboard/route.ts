

// src/app/api/child/dashboard/route.ts
import API_URLS from '@/src/lib/api';
import {
  fetchWithTokenRetry,
  decodeTokenFromRequest,
  getTokenFromRequest,
} from '@/src/lib/auth/server';
import { NextRequest, NextResponse } from 'next/server';

function extractChildId(me: any, payload: any): number | null {
  // 1) explicit fields
  if (payload?.child_id) return Number(payload.child_id);
  if (me?.child_id) return Number(me.child_id);

  // 2) nested shapes we’ve seen
  if (me?.child?.id) return Number(me.child.id);
  if (me?.profile?.child?.id) return Number(me.profile.child.id);

  // 3) if the JWT role is child, sometimes the user_id is the child id
  if (payload?.role && String(payload.role).toLowerCase() === 'child' && payload?.user_id) {
    return Number(payload.user_id);
  }

  return null;
}

export async function GET(req: NextRequest) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ?id= override
    const url = new URL(req.url);
    const overrideId = url.searchParams.get('id');
    let childId: number | null = overrideId ? Number(overrideId) : null;

    // Try to resolve from JWT + /users/me
    if (!childId) {
      const payload = decodeTokenFromRequest(req) as any | null;

      let me: any = null;
      try {
        const meRes = await fetchWithTokenRetry(API_URLS.USER.GET_ME, { method: 'GET' });
        me = meRes.data || null;
      } catch {
        /* ignore – we’ll fall back */
      }

      childId = extractChildId(me, payload);
    }

    // If still not found, do NOT 400; return empty list with debug header
    if (!childId || Number.isNaN(childId)) {
      return new NextResponse(JSON.stringify([]), {
        status: 200,
        headers: {
          'content-type': 'application/json',
          'x-child-id': 'not-found',
          'x-debug': 'child id not found in token or /users/me',
        },
      });
    }

    // Fetch all logs from backend
    const { data } = await fetchWithTokenRetry(API_URLS.FOOD_LOGS.GET_ALL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const list: any[] = Array.isArray(data?.results)
      ? data.results
      : Array.isArray(data)
      ? data
      : [];

    // Filter logs belonging to this child
    const filtered = list.filter((r) => Number(r?.child) === Number(childId));

    return new NextResponse(JSON.stringify(filtered), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'x-child-id': String(childId),
      },
    });
  } catch (err) {
    console.error('[api/child/dashboard] GET error:', err);
    return NextResponse.json({ error: 'Failed to fetch child food logs' }, { status: 500 });
  }
}
