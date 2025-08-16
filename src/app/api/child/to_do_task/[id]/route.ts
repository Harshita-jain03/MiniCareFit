import { NextRequest, NextResponse } from "next/server";
import API_URLS from "@/src/lib/api";
import {
  fetchWithTokenRetry,
  getTokenFromRequest,
  decodeTokenFromRequest,
  decodeToken,
} from "@/src/lib/auth/server";

function getHeaderToken(req: NextRequest): string | null {
  const hdr = req.headers.get("authorization") || "";
  if (hdr.toLowerCase().startsWith("bearer ")) return hdr.slice(7).trim();
  const q = new URL(req.url).searchParams.get("bearer");
  return q || null;
}
async function backendFetch(cookieTokenPresent: boolean, url: string, init: RequestInit, headerToken?: string | null) {
  if (cookieTokenPresent) return fetchWithTokenRetry(url, init);
  const headers = { ...(init.headers || {}), ...(headerToken ? { Authorization: `Bearer ${headerToken}` } : {}) };
  const res = await fetch(url, { ...init, headers, cache: "no-store" });
  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("application/json") ? await res.json() : await res.text();
  return { data, status: res.status };
}

const VALID_STATUS = new Set(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"]);

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const cookieToken = getTokenFromRequest(req);
    const headerToken = getHeaderToken(req);
    if (!cookieToken && !headerToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    let status = String(body?.status || "").toUpperCase();
    if (!VALID_STATUS.has(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const url = `${API_URLS.TODO.TASKS}${params.id}/`;
    const { data, status: s } = await backendFetch(
      !!cookieToken,
      url,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      },
      headerToken
    );

    return NextResponse.json(data, { status: s });
  } catch (err) {
    console.error("[api/child/to_do_task/:id] PATCH error:", err);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}
