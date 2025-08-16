import API_URLS from '@/src/lib/api';;
import { fetchWithTokenRetry } from '@/src/lib/auth/server';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(_req: NextRequest) {
  try {
    const { data, status } = await fetchWithTokenRetry(API_URLS.FOOD_ITEMS.GET_ALL, {
      method: 'GET',
    });
    return NextResponse.json(data, { status });
  } catch (err) {
    console.error('[food-items] GET failed:', err);
    return NextResponse.json({ error: 'Failed to load food items' }, { status: 500 });
  }
}




export async function POST(request: NextRequest) {
  console.log('➡️ POST /admin/parent/register');

  try {
    const formData = await request.formData(); // Correct for multipart/form-data

    const body: Record<string, any> = {};
    formData.forEach((value, key) => {
      body[key] = value;
    });

    const finalUrl = API_URLS.FOOD_LOGS.CREATE;

    const { data, status } = await fetchWithTokenRetry(finalUrl, {
      method: 'POST',
      body: formData, // Forward the same FormData to your backend API
    });

    return NextResponse.json(data, { status });
  } catch (err) {
    console.error('[parent/register] Failed to register parent:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
