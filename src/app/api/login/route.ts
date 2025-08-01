import { NextRequest, NextResponse } from "next/server";
import API_URLS from "@/src/lib/api";
import { saveToken } from "@/src/lib/auth/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("[Login API] Body:", body);

  const response = await fetch(API_URLS.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  console.log("[Login API] Backend responded with:", data);

  if (!response.ok || !data?.access || !data?.refresh) {
    return NextResponse.json({ error: "Login failed" }, { status: 401 });
  }

  // Save tokens in cookies and return a JSON success message
  const res = await saveToken(data.access, data.refresh);

  // Optionally include decoded user info from token here if needed
  return new NextResponse(JSON.stringify({ message: "Login successful" }), {
    status: 200,
    headers: res.headers, // preserve Set-Cookie from saveToken
  });
}
