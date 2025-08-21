// // src/app/api/rewards/route.ts
// import API_URLS from "@/src/lib/api";
// import { fetchWithTokenRetry } from "@/src/lib/auth/server";
// import { NextRequest, NextResponse } from "next/server";

// // export async function GET(req: NextRequest) {
// //   console.log("➡️ GET /api/parent/reward");

// //   try {
// //     const { data, status } = await fetchWithTokenRetry(API_URLS.REWARDS.GET_ALL, {
// //       method: "GET",
// //       headers: { "Content-Type": "application/json" },
// //     });

// //     return NextResponse.json(data, { status });
// //   } catch (err) {
// //     console.error("[rewards] Failed to fetch:", err);
// //     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
// //   }
// // }

// // export async function POST(req: NextRequest) {
// //   console.log("➡️ POST /api/parent/rewards");

// //   try {
// //     const body = await req.json(); // client will send JSON

// //     const { data, status } = await fetchWithTokenRetry(API_URLS.REWARDS.CREATE, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(body),
// //     });

// //     return NextResponse.json(data, { status });
// //   } catch (err) {
// //     console.error("[rewards] Failed to create:", err);
// //     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
// //   }
// // }


// export async function POST(req: NextRequest) {
//   console.log("➡️ POST /api/parent/reward");

//   try {
//     const body = await req.json();

//     // inject created_by and updated_by from logged-in user
//     // (assuming your JWT payload has user_id)
//     const me = decodeTokenFromRequest(req);
//     if (me) {
//       body.created_by = me.user_id;
//       body.updated_by = me.user_id;
//     }

//     const { data, status } = await fetchWithTokenRetry(API_URLS.REWARDS.CREATE, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });

//     return NextResponse.json(data, { status });
//   } catch (err) {
//     console.error("[rewards] Failed to create:", err);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }


import API_URLS from "@/src/lib/api";
import { fetchWithTokenRetry, decodeTokenFromRequest } from "@/src/lib/auth/server";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
  console.log("➡️ GET /api/parent/reward/mine");
  try {
    const me = decodeTokenFromRequest(req);
    if (!me?.user_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Pull all rewards from backend
    const { data, status } = await fetchWithTokenRetry(API_URLS.REWARDS.GET_ALL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!Array.isArray(data)) {
      return NextResponse.json({ error: "Unexpected backend response" }, { status: 500 });
    }

    // Filter by created_by === me.user_id
    const mine = data.filter((r: any) => Number(r?.created_by) === Number(me.user_id));
    return NextResponse.json({ results: mine, count: mine.length }, { status: 200 });
  } catch (err) {
    console.error("[reward/mine] Failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  console.log("➡️ POST /api/parent/reward");

  try {
    const body = await req.json();

    // ✅ inject created_by & updated_by from logged-in user
    const me = decodeTokenFromRequest(req);
    if (me) {
      body.created_by = me.user_id;
      body.updated_by = me.user_id;
    }

    const { data, status } = await fetchWithTokenRetry(API_URLS.REWARDS.CREATE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return NextResponse.json(data, { status });
  } catch (err) {
    console.error("[reward] Failed to create:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
