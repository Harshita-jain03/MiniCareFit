import { NextRequest, NextResponse } from "next/server";
import API_URLS from "@/src/lib/api";
import { fetchWithTokenRetry } from "@/src/lib/auth/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization") || "";

    const { data, status } = await fetchWithTokenRetry(API_URLS.USERS.GET_ALL, {
      method: "GET",
      headers: { Authorization: token },
    });

    return NextResponse.json(data, { status });
  } catch (error) {
    console.error("Error fetching users in proxy route:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
