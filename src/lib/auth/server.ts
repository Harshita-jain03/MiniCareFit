import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import API_URLS from "@/src/lib/api";
import { UserPayload } from "@/src/types/jwt";
  // ✅ adjust path if needed


// ----------------------
// TOKEN UTILS
// ----------------------

export function getTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get("token")?.value || null;
}

export function decodeTokenFromRequest(
  request: NextRequest
): UserPayload | null {
  const token = getTokenFromRequest(request);
  return decodeToken(token || undefined);
}

export function decodeToken(token?: string): UserPayload | null {
  if (!token) return null;
  try {
    const decoded = jwtDecode<UserPayload>(token);
    if (decoded.exp * 1000 < Date.now()) return null;
    return decoded;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}

export async function saveToken(
  token: string,
  refresh: string
): Promise<NextResponse> {
  const response = new NextResponse();

  response.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  response.cookies.set("refreshToken", refresh, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
 


  return response;
}

export function clearToken(): NextResponse {
  const res = new NextResponse();
  res.cookies.delete("token");
  res.cookies.delete("refreshToken");
  return res;
}

// ----------------------
// REFRESH TOKEN FUNCTION
// ----------------------

// export function refresh(refreshToken: string): Promise<Response> {
//   return fetch(API_URLS.REFRESH, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ refresh: refreshToken }),
//   });
// }

// ----------------------
// REFRESH TOKEN FUNCTION
// ----------------------

export function refreshAccessToken(refreshToken: string): Promise<Response> {
  return fetch(API_URLS.REFRESH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });
}


// ----------------------
// FETCH WITH TOKEN RETRY
// ----------------------

export async function fetchWithTokenRetry(
  url: string,
  options: RequestInit = {}
): Promise<{ data: any; status: number }> {
  const cookieStore = await cookies();

  let accessToken = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isAccessValid = decodeToken(accessToken);
  const isRefreshValid = decodeToken(refreshToken);

  if (!isAccessValid && !isRefreshValid) {
  
    return redirect("/login");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  let res = await fetch(url, {
    ...options,
    headers,
    cache: "no-store",
  });
 

  // if (res.status === 401 && isRefreshValid) {
  //   console.log("[Retry] Trying refresh token");

  //   const refreshRes = await refresh(refreshToken);
  //   if (refreshRes.ok) {
  //     const { access } = await refreshRes.json();
  //     accessToken = access;

  //     headers.Authorization = `Bearer ${access}`;

  //     res = await fetch(url, {
  //       ...options,
  //       headers,
  //       cache: "no-store",
  //     });
  //   } else {
  //     console.log("[Retry] Refresh failed. Redirecting.");
  //     return redirect("/login");
  //   }
  // }
  if (res.status === 401 && isRefreshValid) {
  console.log("[Retry] Trying refresh token");

  const refreshRes = await refreshAccessToken(refreshToken!);
  if (refreshRes.ok) {
    const { access } = await refreshRes.json();
    accessToken = access;

    headers.Authorization = `Bearer ${access}`;

    res = await fetch(url, {
      ...options,
      headers,
      cache: "no-store",
    });
  } else {
   
    return redirect("/login");
  }
}


  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  const data = isJson ? await res.json() : await res.text();

  return { data, status: res.status };
}

// ----------------------
// FETCH WITHOUT TOKEN
// ----------------------

export async function fetchWithoutToken(
  url: string,
  options: RequestInit = {}
): Promise<{ data: any; status: number }> {
  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    const data = isJson ? await res.json() : await res.text();

    return { data, status: res.status };
  } catch (error) {
    console.error("[fetchWithoutToken] Failed:", error);
    return {
      data: { error: "Request failed" },
      status: 500,
    };
  }
}
