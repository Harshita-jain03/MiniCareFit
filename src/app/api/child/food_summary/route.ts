import API_URLS from '@/src/lib/api';
import { fetchWithTokenRetry } from '@/src/lib/auth/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  console.log('➡️ GET /api/child/food-summary?id=123');

  const { searchParams } = new URL(req.url);
  const childId = searchParams.get('id');

  if (!childId) {
    return NextResponse.json({ error: 'Child ID is required' }, { status: 400 });
  }

  try {
    const token = req.headers.get('authorization');

    const url = `${API_URLS.HEALTH.GET_ALL}?child_id=${childId}`;

    const { data, status } = await fetchWithTokenRetry(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token || '',
      },
    });

    return NextResponse.json(data, { status });
  } catch (err) {
    console.error('[child/food-summary] Failed to fetch food data:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
