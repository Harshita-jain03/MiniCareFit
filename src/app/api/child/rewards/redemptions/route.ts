// src/app/api/reward/redemptions/route.ts
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

export async function GET(req: NextRequest) {
  try {
    const cookieToken = getTokenFromRequest(req);
    const headerToken = getHeaderToken(req);
    if (!cookieToken && !headerToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, status } = await backendFetch(
      !!cookieToken,
      API_URLS.REWARDS.REDEMPTIONS,
      { method: "GET" },
      headerToken
    );
    return NextResponse.json(data, { status: status || 200 });
  } catch (e) {
    console.error("[/api/reward/redemptions] error:", e);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
