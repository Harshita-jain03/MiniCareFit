// import API_URLS from "@/src/lib/api";
// import { fetchWithTokenRetry, decodeTokenFromRequest } from "@/src/lib/auth/server";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   console.log("➡️ GET /api/parent/todo");

//   try {
//     // ✅ decode logged-in parent
//     const me = decodeTokenFromRequest(req);
//     if (!me) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // ✅ get parent-child mappings
//     const { data: mappings } = await fetchWithTokenRetry(API_URLS.PARENT_CHILD_MAPPING.GET_ALL, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });

//     // child IDs for this parent
//     const childIds: number[] = mappings
//       .filter((m: any) => m.parent === me.user_id)
//       .map((m: any) => m.child);

//     if (childIds.length === 0) {
//       return NextResponse.json([], { status: 200 });
//     }

//     // ✅ get all tasks
//     const { data: tasks } = await fetchWithTokenRetry(API_URLS.TODO.GET_ALL, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });

//     // ✅ filter tasks for only those children
//     const filtered = tasks.filter((task: any) => childIds.includes(task.assigned_to));

//     // ✅ format
//     const formatted = filtered.map((task: any) => ({
//       id: task.id,
//       title: task.title,
//       description: task.description,
//       deadline: task.deadline,
//       points: task.points,
//       status: task.status,
//       assignedTo: task.assigned_to,
//       assignedBy: task.assigned_by,
//     }));

//     return NextResponse.json(formatted, { status: 200 });
//   } catch (err) {
//     console.error("[todo] Failed to fetch tasks:", err);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }


// src/app/api/parent/todo/route.ts
import API_URLS from "@/src/lib/api";
import { fetchWithTokenRetry, decodeTokenFromRequest } from "@/src/lib/auth/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("➡️ GET /api/parent/todo");

  try {
    const me = decodeTokenFromRequest(req);
    if (!me) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // parent-child mappings
    const { data: mappings } = await fetchWithTokenRetry(API_URLS.PARENT_CHILD_MAPPING.GET_ALL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const childIds: number[] = (mappings || [])
      .filter((m: any) => Number(m.parent) === Number(me.user_id))
      .map((m: any) => Number(m.child));

    if (childIds.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // all tasks
    const { data: tasks } = await fetchWithTokenRetry(API_URLS.TODO.GET_ALL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const filtered = (tasks || []).filter((t: any) => childIds.includes(Number(t.assigned_to)));
    const formatted = filtered.map((t: any) => ({
      id: t.id,
      title: t.title,
      description: t.description,
      deadline: t.deadline, // ISO or null
      points: t.points,
      status: t.status,
      assignedTo: t.assigned_to,
      assignedBy: t.assigned_by,
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (err) {
    console.error("[todo] Failed to fetch tasks:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  console.log("➡️ POST /api/parent/todo");

  try {
    const me = decodeTokenFromRequest(req);
    if (!me) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // fetch mappings to verify the child belongs to this parent
    const { data: mappings } = await fetchWithTokenRetry(API_URLS.PARENT_CHILD_MAPPING.GET_ALL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const childIds: number[] = (mappings || [])
      .filter((m: any) => Number(m.parent) === Number(me.user_id))
      .map((m: any) => Number(m.child));

    const assignedTo = Number(body.assigned_to);
    if (!assignedTo || !childIds.includes(assignedTo)) {
      return NextResponse.json(
        { error: "Assigned child is not linked to this parent." },
        { status: 400 }
      );
    }

    // construct payload for backend
    const payload = {
      title: body.title,
      description: body.description,
      deadline: body.deadline ?? null, // pass ISO or null
      points: Number(body.points) || 0,
      status: (body.status || "PENDING").toUpperCase(),
      assigned_to: assignedTo,
      assigned_by: Number(me.user_id),             // ✅ force to logged in parent
    };

    const { data, status } = await fetchWithTokenRetry(API_URLS.TODO.CREATE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return NextResponse.json(data, { status });
  } catch (err) {
    console.error("[todo] Failed to create task:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
