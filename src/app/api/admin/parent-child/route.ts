// // /app/api/users/parent-child-mappings/route.ts

// import { NextRequest, NextResponse } from "next/server";
// import API_URLS from "@/src/lib/api";
// import { fetchWithTokenRetry } from "@/src/lib/auth/server";

// export async function POST(req: NextRequest) {
//   try {
//     const token = req.headers.get("authorization") || "";
//     const body = await req.json();

//     const { data, status } = await fetchWithTokenRetry(API_URLS.PARENT_CHILD_MAPPING.CREATE, {
//       method: "POST",
//       headers: {
//         Authorization: token,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });

//     return NextResponse.json(data, { status });
//   } catch (err) {
//     console.error("Error in parent-child mapping route:", err);
//     return NextResponse.json({ error: "Failed to map parent and child" }, { status: 500 });
//   }
// }



// app/api/admin/parent-child/route.ts
import { NextRequest, NextResponse } from "next/server";
import API_URLS from "@/src/lib/api";
import { fetchWithTokenRetry } from "@/src/lib/auth/server";

// GET: list all mappings (return a plain array for the UI)
export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization") || "";
    const url = `${API_URLS.PARENT_CHILD_MAPPING.GET_ALL}?${req.nextUrl.searchParams.toString()}`;

    const { data, status } = await fetchWithTokenRetry(url, {
      method: "GET",
      headers: { Authorization: token },
    });

    const rows = Array.isArray(data) ? data : data?.results || [];
    return NextResponse.json(rows, { status });
  } catch (err) {
    console.error("[parent-child] GET failed:", err);
    return NextResponse.json({ error: "Failed to fetch mappings" }, { status: 500 });
  }
}

// POST: create one mapping
export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization") || "";
    const body = await req.json();

    const { data, status } = await fetchWithTokenRetry(API_URLS.PARENT_CHILD_MAPPING.CREATE, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return NextResponse.json(data, { status });
  } catch (err) {
    console.error("[parent-child] POST failed:", err);
    return NextResponse.json({ error: "Failed to map parent and child" }, { status: 500 });
  }
}
