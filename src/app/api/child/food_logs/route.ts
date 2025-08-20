import API_URLS from "@/src/lib/api";
import { fetchWithTokenRetry } from "@/src/lib/auth/server";
import { buildAuthHeader } from "@/src/lib/auth/utlis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "") || "";
  const { data, status } = await fetchWithTokenRetry(API_URLS.FOOD_LOGS.GET_ALL, {
    method: "GET",
    headers: buildAuthHeader(token),
  });

  // ✅ Wrap the array response into { results: [], count: N }
  return NextResponse.json({ results: data, count: data.length }, { status });
}
