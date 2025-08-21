import { NextRequest, NextResponse } from "next/server";
import API_URLS from "@/src/lib/api";
import { fetchWithTokenRetry } from "@/src/lib/auth/server";

// export async function GET(_req: NextRequest) {
//   try {
//     const { data, status } = await fetchWithTokenRetry(API_URLS.FOOD_ITEMS.GET_ALL, { method: "GET" });
//     const list = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
//     return NextResponse.json({ results: list, count: list.length }, { status: status || 200 });
//   } catch (err) {
//     console.error("[food-items] GET error:", err);
//     return NextResponse.json({ results: [], count: 0 }, { status: 200 });
//   }
// }


export async function GET(_req: NextRequest) {
  try {
    const { data, status } = await fetchWithTokenRetry(API_URLS.FOOD_ITEMS.GET_ALL, { method: "GET" });
    const list = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
    return NextResponse.json({ results: list, count: list.length }, { status: status || 200 });
  } catch (err) {
    console.error("[food-items] GET error:", err);
    return NextResponse.json({ results: [], count: 0 }, { status: 200 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, status } = await fetchWithTokenRetry(API_URLS.FOOD_ITEMS.CREATE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return NextResponse.json(data, { status });
  } catch (err) {
    console.error("[food-items] POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
