// src/app/api/reward/redeem/route.ts
import API_URLS from "@/src/lib/api";
import { NextRequest, NextResponse } from "next/server";
import {
  fetchWithTokenRetry,
  getTokenFromRequest,
} from "@/src/lib/auth/server";

function getHeaderToken(req: NextRequest): string | null {
  const hdr = req.headers.get("authorization") || "";
  if (hdr.toLowerCase().startsWith("bearer ")) return hdr.slice(7).trim();
  const q = new URL(req.url).searchParams.get("bearer");
  return q || null;
}

async function backendFetch(
  cookieTokenPresent: boolean,
  url: string,
  init: RequestInit,
  headerToken?: string | null
) {
  if (cookieTokenPresent) return fetchWithTokenRetry(url, init);
  const headers = {
    ...(init.headers || {}),
    ...(headerToken ? { Authorization: `Bearer ${headerToken}` } : {}),
  };
  const res = await fetch(url, { ...init, headers, cache: "no-store" });
  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("application/json") ? await res.json() : await res.text();
  return { data, status: res.status };
}

export async function POST(req: NextRequest) {
  try {
    const cookieToken = getTokenFromRequest(req);
    const headerToken = getHeaderToken(req);
    if (!cookieToken && !headerToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    // backend accepts { reward: id } or { reward_id: id }
    const payload =
      body.reward ? body : body.reward_id ? { reward: body.reward_id } : body;

    const { data, status } = await backendFetch(
      !!cookieToken,
      API_URLS.REWARDS.REDEEM,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
      headerToken
    );

    return NextResponse.json(data, { status: status || 201 });
  } catch (e) {
    console.error("[/api/reward/redeem] error:", e);
    return NextResponse.json({ error: "Failed to redeem" }, { status: 500 });
  }
}
