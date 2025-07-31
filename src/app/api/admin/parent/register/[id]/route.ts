import API_URLS from '@/src/lib/api';
import { fetchWithTokenRetry } from '@/src/lib/auth/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  console.log('➡️ PATCH /admin/student/register');

  try {
    const body = await request.json();
    const token = request.headers.get("authorization");
    const { id, ...updateFields } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing student ID" }, { status: 400 });
    }

    const { data, status } = await fetchWithTokenRetry(`${API_URLS.PARENT_REGISTER.UPDATE}${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token || '',
      },
      body: JSON.stringify(updateFields),
    });

    return NextResponse.json(data, { status });
  } catch (err) {
    console.error('[PATCH student] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
