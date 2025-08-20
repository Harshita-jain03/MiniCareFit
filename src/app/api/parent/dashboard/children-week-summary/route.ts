// import API_URLS from '@/src/lib/api';;
// import { fetchWithTokenRetry } from '@/src/lib/auth/server';
// import { NextRequest, NextResponse } from 'next/server';


// export async function GET(req: NextRequest) {
 

//   try {
//     const token = req.headers.get("authorization");

//     const { data, status } = await fetchWithTokenRetry(API_URLS.REPORTS.CHILDREN_WEEK_SUMMARY, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': token || '',
//       },
//     });

//     return NextResponse.json(data, { status });
//   } catch (err) {
//     console.error('[parent] Failed to fetch students:', err);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }



import API_URLS from '@/src/lib/api';
import { fetchWithTokenRetry } from '@/src/lib/auth/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization') || '';

    const { data, status } = await fetchWithTokenRetry(
      API_URLS.REPORTS.CHILDREN_WEEK_SUMMARY,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    );

    return NextResponse.json(data, { status });
  } catch (err) {
    console.error('[reports] Failed to fetch week summary:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}