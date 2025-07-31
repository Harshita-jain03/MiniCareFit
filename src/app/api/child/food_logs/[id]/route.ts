// /app/api/child/food-logs/route.ts
import API_URLS from '@/src/lib/api';
import { fetchWithTokenRetry } from '@/src/lib/auth/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization');
    const { searchParams } = new URL(req.url);
    const childId = searchParams.get('id');

    if (!childId) {
      return NextResponse.json({ error: 'Child ID is required' }, { status: 400 });
    }

    const url = `${API_URLS.HEALTH.FOOD_LOGS}?child_id=${childId}`;

    const { data, status } = await fetchWithTokenRetry(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token || '',
      },
    });

    return NextResponse.json(data, { status });
  } catch (error) {
    console.error('[child/food-logs] GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch food logs' }, { status: 500 });
  }
}
