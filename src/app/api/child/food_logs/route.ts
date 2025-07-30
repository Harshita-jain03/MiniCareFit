// /app/api/child/food-log/route.ts
import API_URLS from '@/src/lib/api';
import { fetchWithTokenRetry } from '@/src/lib/auth/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization');
    const body = await req.json();

    const { data, status } = await fetchWithTokenRetry(API_URLS.HEALTH.FOOD_LOGS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token || '',
      },
      body: JSON.stringify(body),
    });

    return NextResponse.json(data, { status });
  } catch (error) {
    console.error('[child/food-log] Error:', error);
    return NextResponse.json({ error: 'Failed to log food' }, { status: 500 });
  }
}
