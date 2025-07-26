// src/lib/auth/server.ts

export async function fetchWithTokenRetry(
  url: string,
  options: RequestInit = {}
): Promise<{ data: any; status: number }> {
  try {
    const res = await fetch(url, options);
    const data = await res.json().catch(() => ({}));
    return { data, status: res.status };
  } catch (error) {
    console.error("[fetchWithTokenRetry] Server fetch failed:", error);
    return { data: { error: "Server error" }, status: 500 };
  }
}
