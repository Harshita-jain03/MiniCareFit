import API_URLS from '@/src/lib/api';;
import { fetchWithTokenRetry } from '@/src/lib/auth/server';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
  console.log('➡️ GET /admin/student/register');

  try {
    const token = req.headers.get("authorization");

    const { data, status } = await fetchWithTokenRetry(API_URLS.STUDENT_REGISTER.CREATE, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token || '',
      },
    });

    return NextResponse.json(data, { status });
  } catch (err) {
    console.error('[student/register] Failed to fetch students:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  console.log('➡️ POST /admin/student/register');

  try {
    // const formData = await request.formData(); // FormData must match client
    const body = await request.json();


    const finalUrl = API_URLS.STUDENT_REGISTER.CREATE; // assumes your backend expects this

    const { data, status } = await fetchWithTokenRetry(finalUrl, {
      method: 'POST',
      headers: {
    'Content-Type': 'application/json',
  },
      body: JSON.stringify(body),
    });

    return NextResponse.json(data, { status });
  } catch (err) {
    console.error('[student/register] Failed to register student:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


