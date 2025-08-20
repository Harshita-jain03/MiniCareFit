// app/api/admin/my_account/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchWithTokenRetry, decodeTokenFromRequest, decodeToken } from "@/src/lib/auth/server";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

/** Read Bearer token from header (if present) */
function getBearer(req: NextRequest): string | null {
  const h = req.headers.get("authorization") || "";
  return h.startsWith("Bearer ") ? h : null;
}

/** Get user id from either Authorization header token or cookies */
function getUserId(req: NextRequest): number | null {
  // 1) Try Authorization header
  const bearer = getBearer(req);
  if (bearer) {
    const payload = decodeToken(bearer.replace(/^Bearer\s+/i, ""));
    const uid = (payload as any)?.user_id ?? (payload as any)?.id ?? null;
    if (uid) return uid as number;
  }
  // 2) Fallback to cookie token
  const cookiePayload = decodeTokenFromRequest(req);
  const uid = (cookiePayload as any)?.user_id ?? (cookiePayload as any)?.id ?? null;
  return uid ?? null;
}

export async function GET(req: NextRequest) {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const detailUrl = `${BASE}/users/users/${userId}/`;
    const bearer = getBearer(req);

    // If caller sent an Authorization header, forward it.
    // Otherwise rely on cookies via fetchWithTokenRetry.
    let data: any;
    let status = 200;

    if (bearer) {
      const r = await fetch(detailUrl, {
        method: "GET",
        headers: { Authorization: bearer },
        cache: "no-store",
      });
      status = r.status;
      data = await r.json().catch(() => null);
    } else {
      const resp = await fetchWithTokenRetry(detailUrl, { method: "GET" });
      status = resp.status;
      data = resp.data;
    }

    if (status !== 200 || !data) {
      return NextResponse.json({ error: "Failed to fetch user" }, { status: status || 500 });
    }

    // Return the exact user object from /users/users/{id}/
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("[my_account] GET error:", err);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
