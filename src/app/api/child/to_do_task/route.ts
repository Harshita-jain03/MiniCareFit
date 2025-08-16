import { NextRequest, NextResponse } from "next/server";
import API_URLS from "@/src/lib/api";
import {
  fetchWithTokenRetry,
  getTokenFromRequest,
  decodeTokenFromRequest,
  decodeToken,
} from "@/src/lib/auth/server";

// Pull bearer from header or ?bearer= for client-side fallbacks
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

const VALID_STATUS = new Set(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"]);

export async function POST(req: NextRequest) {
  try {
    const cookieToken = getTokenFromRequest(req);
    const headerToken = getHeaderToken(req);
    if (!cookieToken && !headerToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const fd = await req.formData();

    // deadline -> ISO (if provided)
    const rawDeadline = fd.get("deadline");
    if (rawDeadline && String(rawDeadline).trim() !== "") {
      const iso = new Date(String(rawDeadline)).toISOString();
      fd.set("deadline", iso);
    }

    // status -> ensure valid Django enum or drop it (backend default is PENDING)
    const rawStatus = fd.get("status");
    if (rawStatus) {
      const normalized = String(rawStatus).trim().toUpperCase();
      if (VALID_STATUS.has(normalized)) {
        fd.set("status", normalized);
      } else {
        fd.delete("status");
      }
    }

    // child from token
    const payload = cookieToken ? decodeTokenFromRequest(req) : decodeToken(headerToken || undefined);
    const role = String((payload as any)?.role || "").toLowerCase();

    const childId: number | null =
      (payload as any)?.child_id ??
      (payload as any)?.child?.id ??
      ((role === "child" || role === "student") ? (payload as any)?.user_id : null);

    if (!childId || Number.isNaN(Number(childId))) {
      return NextResponse.json({ error: "Child not found in token" }, { status: 400 });
    }

    // default assignee/assigner = child (when the child creates own task)
    if (!fd.get("assigned_to")) fd.set("assigned_to", String(childId));
    if (!fd.get("assigned_by")) fd.set("assigned_by", String(childId));

    const { data, status } = await backendFetch(
      !!cookieToken,
      API_URLS.TODO.TASKS, // http://localhost:8000/todo/todo-tasks/
      { method: "POST", body: fd },
      headerToken
    );

    return NextResponse.json(data, { status });
  } catch (err) {
    console.error("[api/child/to_do_task] POST error:", err);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}




export async function GET(req: NextRequest) {
  try {
    const cookieToken = getTokenFromRequest(req);
    const headerToken = getHeaderToken(req);
    if (!cookieToken && !headerToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = cookieToken ? decodeTokenFromRequest(req) : decodeToken(headerToken || undefined);
    const role = String((payload as any)?.role || "").toLowerCase();

    const childId: number | null =
      (payload as any)?.child_id ??
      (payload as any)?.child?.id ??
      ((role === "child" || role === "student") ? (payload as any)?.user_id : null);

    if (!childId) {
      return NextResponse.json({ error: "Child not found in token" }, { status: 400 });
    }

    // get all, then filter assigned_to
    const { data, status } = await backendFetch(
      !!cookieToken,
      API_URLS.TODO.TASKS, // http://localhost:8000/todo/todo-tasks/
      { method: "GET" },
      headerToken
    );

    if (status >= 400) {
      return NextResponse.json(data, { status });
    }

    const all: any[] = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
    const mine = all.filter((t) => {
      const a = (t as any).assigned_to;
      const id = typeof a === "object" ? a?.id : a;
      return Number(id) === Number(childId);
    });

    return NextResponse.json(mine, { status: 200 });
  } catch (err) {
    console.error("[api/child/to_do_task] GET error:", err);
    return NextResponse.json({ error: "Failed to load tasks" }, { status: 500 });
  }
}
