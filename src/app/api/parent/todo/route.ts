import API_URLS from "@/src/lib/api";
import { fetchWithTokenRetry, decodeTokenFromRequest } from "@/src/lib/auth/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("➡️ GET /api/parent/todo");

  try {
    // ✅ decode logged-in parent
    const me = decodeTokenFromRequest(req);
    if (!me) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ get parent-child mappings
    const { data: mappings } = await fetchWithTokenRetry(API_URLS.PARENT_CHILD_MAPPING.GET_ALL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // child IDs for this parent
    const childIds: number[] = mappings
      .filter((m: any) => m.parent === me.user_id)
      .map((m: any) => m.child);

    if (childIds.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // ✅ get all tasks
    const { data: tasks } = await fetchWithTokenRetry(API_URLS.TODO.GET_ALL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // ✅ filter tasks for only those children
    const filtered = tasks.filter((task: any) => childIds.includes(task.assigned_to));

    // ✅ format
    const formatted = filtered.map((task: any) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      points: task.points,
      status: task.status,
      assignedTo: task.assigned_to,
      assignedBy: task.assigned_by,
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (err) {
    console.error("[todo] Failed to fetch tasks:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
