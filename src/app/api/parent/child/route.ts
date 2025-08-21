import { NextRequest, NextResponse } from "next/server";
import API_URLS from "@/src/lib/api";
import { fetchWithTokenRetry, decodeTokenFromRequest } from "@/src/lib/auth/server";

export async function GET(req: NextRequest) {
  try {
    const payload = decodeTokenFromRequest(req);
    const parentId = payload?.user_id;
    if (!parentId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { data: mappings, status } = await fetchWithTokenRetry(
      API_URLS.PARENT_CHILD_MAPPING.GET_ALL,
      { method: "GET" }
    );
    if (status >= 400 || !Array.isArray(mappings)) {
      return NextResponse.json({ error: "Failed to load mappings" }, { status: status || 500 });
    }

    const match = mappings.find((m: any) => Number(m?.parent) === Number(parentId));
    if (!match) {
      return NextResponse.json({ child: null, message: "No child mapped" }, { status: 200 });
    }

    return NextResponse.json({ child: { id: match.child, name: match.child_name ?? "" } }, { status: 200 });
  } catch (e) {
    console.error("[/api/parent/child] error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
