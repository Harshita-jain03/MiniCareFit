// /app/api/child/food-summary/route.ts
import { fetchWithTokenRetry } from "@/src/lib/auth/server";
import API_URLS from "@/src/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization");
  const { searchParams } = new URL(req.url);
  const child_id = searchParams.get("id");

  try {
    const { data, status } = await fetchWithTokenRetry(
      `${API_URLS.HEALTH.FOOD_SUMMARY}?child_id=${child_id}`,
      {
        method: "GET",
        headers: {
          Authorization: token || "",
        },
      }
    );

    return NextResponse.json(data, { status });
  } catch (error) {
    console.error("[food-summary] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch food summary" },
      { status: 500 }
    );
  }
}
