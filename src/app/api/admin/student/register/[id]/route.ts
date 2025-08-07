// import API_URLS from '@/src/lib/api';
// import { fetchWithTokenRetry } from '@/src/lib/auth/server';
// import { NextRequest, NextResponse } from 'next/server';

// export async function PATCH(request: NextRequest) {
//   console.log('➡️ PATCH /admin/student/register');

//   try {
//     const token = request.headers.get("authorization");
//     // const contentType = request.headers.get("content-type") || "";
//      try {
//     const token = request.headers.get("authorization");

//     const { data, status } = await fetchWithTokenRetry(API_URLS.STUDENT_REGISTER.UPDATE, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': token || '',
//       },
//     });

//       return NextResponse.json(data, { status });
//   } catch (err) {
//     console.error('[student/register] Failed to fetch students:', err);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

// //     let body;
// //     if (contentType.includes("application/json")) {
// //       body = await request.json();
// //     } else if (contentType.includes("multipart/form-data")) {
// //       body = await request.formData();
// //     } else {
// //       return NextResponse.json({ error: "Unsupported Content-Type" }, { status: 400 });
// //     }

// //     const id = body.id || body.get("id");

// //     if (!id) {
// //       return NextResponse.json({ error: "Missing student ID" }, { status: 400 });
// //     }

// //     const updateUrl = API_URLS.STUDENT_REGISTER.UPDATE(id);

// //     let fetchOptions: RequestInit;

// //     if (contentType.includes("application/json")) {
// //       const { id, ...updateFields } = body;
// //       fetchOptions = {
// //         method: 'PATCH',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': token || '',
// //         },
// //         body: JSON.stringify(updateFields),
// //       };
// //     } else {
// //       fetchOptions = {
// //         method: 'PATCH',
// //         headers: {
// //           'Authorization': token || '',
// //         },
// //         body: body, // FormData is directly passed
// //       };
// //     }

// //     const { data, status } = await fetchWithTokenRetry(updateUrl, fetchOptions);

// //     return NextResponse.json(data, { status });
// //   } catch (err) {
// //     console.error('[PATCH student] Error:', err);
// //     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
// //   }
// // }

import API_URLS from '@/src/lib/api';
import { fetchWithTokenRetry } from '@/src/lib/auth/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  console.log('➡️ PATCH /admin/student/register');

  try {
    const token = request.headers.get("authorization");
    const contentType = request.headers.get("content-type") || "";

    let body;
    if (contentType.includes("application/json")) {
      body = await request.json();
    } else if (contentType.includes("multipart/form-data")) {
      body = await request.formData();
    } else {
      return NextResponse.json({ error: "Unsupported Content-Type" }, { status: 400 });
    }

    const id = body.id || body.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing student ID" }, { status: 400 });
    }

    const updateUrl = API_URLS.STUDENT_REGISTER.UPDATE(id);

    let fetchOptions: RequestInit;

    if (contentType.includes("application/json")) {
      const { id, ...updateFields } = body;
      fetchOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token || '',
        },
        body: JSON.stringify(updateFields),
      };
    } else {
      fetchOptions = {
        method: 'PATCH',
        headers: {
          'Authorization': token || '',
        },
        body: body,  // Pass FormData directly
      };
    }

    const { data, status } = await fetchWithTokenRetry(updateUrl, fetchOptions);

    return NextResponse.json(data, { status });
  } catch (err) {
    console.error('[PATCH student/register] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
