// // src/app/api/reward/balance/route.ts
// import API_URLS from "@/src/lib/api";
// import { NextRequest, NextResponse } from "next/server";
// import {
//   fetchWithTokenRetry,
//   getTokenFromRequest,
// } from "@/src/lib/auth/server";

// function getHeaderToken(req: NextRequest): string | null {
//   const hdr = req.headers.get("authorization") || "";
//   if (hdr.toLowerCase().startsWith("bearer ")) return hdr.slice(7).trim();
//   const q = new URL(req.url).searchParams.get("bearer");
//   return q || null;
// }

// async function backendFetch(
//   cookieTokenPresent: boolean,
//   url: string,
//   init: RequestInit,
//   headerToken?: string | null
// ) {
//   if (cookieTokenPresent) return fetchWithTokenRetry(url, init);
//   const headers = {
//     ...(init.headers || {}),
//     ...(headerToken ? { Authorization: `Bearer ${headerToken}` } : {}),
//   };
//   const res = await fetch(url, { ...init, headers, cache: "no-store" });
//   const ct = res.headers.get("content-type") || "";
//   const data = ct.includes("application/json") ? await res.json() : await res.text();
//   return { data, status: res.status };
// }

// export async function GET(req: NextRequest) {
//   try {
//     const cookieToken = getTokenFromRequest(req);
//     const headerToken = getHeaderToken(req);
//     if (!cookieToken && !headerToken) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
//     const { data, status } = await backendFetch(
//       !!cookieToken,
//       API_URLS.REWARDS.BALANCE,
//       { method: "GET" },
//       headerToken
//     );
//     return NextResponse.json(data, { status: status || 200 });
//   } catch (e) {
//     console.error("[/api/reward/balance] error:", e);
//     return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
//   }
// }


// src/app/api/reward/balance/route.ts
import { NextRequest, NextResponse } from "next/server";
import API_URLS from "@/src/lib/api";
import { fetchWithTokenRetry } from "@/src/lib/auth/server";

// IMPORTANT: add this in your API_URLS if not present:
// REWARD: { BALANCE: `${BASE_URL}/reward/balance/` }

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const childId = url.searchParams.get("child") || url.searchParams.get("user_id") || "";

  // Build backend URL
  const be = new URL(API_URLS.REWARDS.BALANCE);

  // If you have the query-enabled balance (child_id on list), pass it through:
  if (childId) be.searchParams.set("child_id", String(childId));

  // Otherwise, backend /reward/balance/ (no params) returns current user's balance
  const { data, status } = await fetchWithTokenRetry(be.toString(), { method: "GET" });
  return NextResponse.json(data, { status });
}
