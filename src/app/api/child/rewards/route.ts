// /app/api/rewards/route.ts
import API_URLS from "@/src/lib/api";
import { fetchWithTokenRetry } from "@/src/lib/auth/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization") || "";
    const { data, status } = await fetchWithTokenRetry(API_URLS.REWARDS.GET_ALL, {
      method: "GET",
      headers: { Authorization: token },
    });
    return NextResponse.json(data, { status });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch rewards" }, { status: 500 });
  }
}
