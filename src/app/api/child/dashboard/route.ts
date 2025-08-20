import API_URLS from '@/src/lib/api';
import {
  fetchWithTokenRetry,
  decodeTokenFromRequest,
  getTokenFromRequest,
} from '@/src/lib/auth/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // must have auth cookies
    const token = getTokenFromRequest(req);
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const url = new URL(req.url);

    // Optional testing override: /api/child/dashboard?child=15
    const override = url.searchParams.get('child');
    if (override) {
      const [w, p] = await Promise.all([
        fetchWithTokenRetry(`${API_URLS.HEALTH.WEEKLY_SUMMARY}?child_id=${override}`, { method: 'GET' }),
        fetchWithTokenRetry(`${API_URLS.HEALTH.PROGRESS_TODAY}?child_id=${override}`, { method: 'GET' }),
      ]);
      return NextResponse.json(
        { child_id: Number(override), weekly: w.data ?? null, progress: p.data ?? null },
        { status: 200, headers: { 'x-child-id': String(override) } }
      );
    }

    // 1) decode JWT to get logged-in user id
    const payload = decodeTokenFromRequest(req) as any | null;
    const userId = payload?.user_id;
    if (!userId) {
      return NextResponse.json(
        { child_id: null, weekly: null, progress: null, debug: 'user_id missing in token' },
        { status: 200 }
      );
    }

    // 2) fetch that user’s record from /users/users/{id}/ (no backend changes)
    const userResp = await fetchWithTokenRetry(API_URLS.USERS.GET_ONE(userId), { method: 'GET' });
    if (userResp.status === 404) {
      return NextResponse.json(
        { child_id: null, weekly: null, progress: null, debug: `user ${userId} not found` },
        { status: 200 }
      );
    }
    const user = userResp.data || {};

    // 3) role check: only allow if role is "child"
    const role = String(user?.role || payload?.role || '').toLowerCase();
    if (role !== 'child') {
      // you asked to show data only for child users
      return NextResponse.json(
        { error: 'Only child users have a health dashboard', child_id: null },
        { status: 403 }
      );
    }

    // 4) use logged-in user id as child_id
    const childId = Number(userId);

    // 5) hit health APIs with child_id
    const weeklyUrl   = `${API_URLS.HEALTH.WEEKLY_SUMMARY}?child_id=${childId}`;
    const progressUrl = `${API_URLS.HEALTH.PROGRESS_TODAY}?child_id=${childId}`;

    const [w, p] = await Promise.all([
      fetchWithTokenRetry(weeklyUrl, { method: 'GET' }),
      fetchWithTokenRetry(progressUrl, { method: 'GET' }),
    ]);

    return NextResponse.json(
      { child_id: childId, weekly: w.data ?? null, progress: p.data ?? null },
      { status: 200, headers: { 'x-child-id': String(childId) } }
    );
  } catch (err) {
    console.error('[api/child/dashboard] GET error:', err);
    return NextResponse.json({ error: 'Failed to load child dashboard' }, { status: 500 });
  }
}
