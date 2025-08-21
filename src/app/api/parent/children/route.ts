// src/app/api/parent/children/route.ts
import API_URLS from "@/src/lib/api";
import { fetchWithTokenRetry, decodeTokenFromRequest } from "@/src/lib/auth/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("➡️ GET /api/parent/children");
  try {
    const me = decodeTokenFromRequest(req);
    if (!me) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: mappings } = await fetchWithTokenRetry(API_URLS.PARENT_CHILD_MAPPING.GET_ALL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const childIds: number[] = (mappings || [])
      .filter((m: any) => Number(m.parent) === Number(me.user_id))
      .map((m: any) => Number(m.child));

    if (childIds.length === 0) {
      return NextResponse.json({ results: [], count: 0 }, { status: 200 });
    }

    // if you have a Users endpoint, fetch details and filter by ids.
    const { data: users } = await fetchWithTokenRetry(API_URLS.PARENT_REGISTER.GET_ALL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const kids = (users || [])
      .filter((u: any) => childIds.includes(Number(u.id)))
      .map((u: any) => ({ id: u.id, name: u.username || u.first_name || `Child #${u.id}` }));

    return NextResponse.json({ results: kids, count: kids.length }, { status: 200 });
  } catch (err) {
    console.error("[children] Failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
