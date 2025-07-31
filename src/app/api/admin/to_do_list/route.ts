import { NextRequest, NextResponse } from "next/server";
import { fetchWithTokenRetry } from "@/src/lib/auth/server";
import API_URLS from "@/src/lib/api";


export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization");

    const { data, status } = await fetchWithTokenRetry(
      API_URLS.TODO.TASKS,  // will be set below
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
      }
    );

    return NextResponse.json(data, { status });
  } catch (err) {
    console.error("❌ [GET /api/todo/tasks] Failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}



// app/api/todo/tasks/route.ts


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, status } = await fetchWithTokenRetry(
      API_URLS.TODO.CREATE,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    return NextResponse.json(data, { status });
  } catch (err) {
    console.error("❌ POST /api/todo/tasks error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
