import API_URLS from '@/src/lib/api';;
import { fetchWithTokenRetry } from '@/src/lib/auth/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('➡️ POST /admin/parent/register');

  try {
    const formData = await request.formData(); // FormData must match client

    const finalUrl = API_URLS.PARENT_REGISTER.CREATE; // assumes your backend expects this

    const { data, status } = await fetchWithTokenRetry(finalUrl, {
      method: 'POST',
      body: formData,
    });

    return NextResponse.json(data, { status });
  } catch (err) {
    console.error('[parent/register] Failed to register parent:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
