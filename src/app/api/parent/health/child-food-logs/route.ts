// import { NextRequest, NextResponse } from "next/server";
// import API_URLS from "@/src/lib/api";
// import { fetchWithTokenRetry, decodeTokenFromRequest } from "@/src/lib/auth/server";

// export async function GET(req: NextRequest) {
//   try {
//     // who is the parent?
//     const payload = decodeTokenFromRequest(req);
//     const parentId = payload?.user_id;
//     if (!parentId) return NextResponse.json({ results: [], count: 0 }, { status: 401 });

//     // fetch mappings
//     const { data: mappings, status: mapStatus } = await fetchWithTokenRetry(
//       API_URLS.PARENT_CHILD_MAPPING.GET_ALL,
//       { method: "GET" }
//     );
//     if (mapStatus >= 400 || !Array.isArray(mappings)) {
//       return NextResponse.json({ results: [], count: 0 }, { status: mapStatus || 500 });
//     }

//     const childId = (mappings.find((m: any) => Number(m?.parent) === Number(parentId)) || {})?.child;
//     if (!childId) {
//       return NextResponse.json({ results: [], count: 0, message: "No child mapped to this parent" }, { status: 200 });
//     }

//     // fetch child food logs (backend supports ?child=)
//     const url = `${API_URLS.FOOD_LOGS.GET_ALL}?child=${encodeURIComponent(childId)}`;
//     const { data: logs, status: logsStatus } = await fetchWithTokenRetry(url, { method: "GET" });
//     if (logsStatus >= 400) {
//       return NextResponse.json({ results: [], count: 0 }, { status: logsStatus });
//     }

//     // Normalize → plain array for Basetable:
//     const list = Array.isArray(logs?.results) ? logs.results : Array.isArray(logs) ? logs : [];
//     return NextResponse.json({ results: list, count: list.length }, { status: 200 });
//   } catch (err) {
//     console.error("[child-food-logs] GET error:", err);
//     return NextResponse.json({ results: [], count: 0 }, { status: 200 });
//   }
// }


// export async function POST(req: NextRequest) {
//   try {
//     const payload = decodeTokenFromRequest(req);
//     const parentId = payload?.user_id;
//     if (!parentId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

//     const body = await req.json().catch(() => null) as {
//       food: string;
//       mealType: string; // Breakfast/Lunch/…
//       quantity: number; // numeric quantity (e.g., 1, 2)
//       // optional macros when creating new items quickly:
//       calories?: number; protein?: number; fat?: number; carbohydrate?: number;
//     };
//     if (!body?.food || !body?.mealType || !body?.quantity) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }

//     // map parent->child
//     const { data: mappings } = await fetchWithTokenRetry(API_URLS.PARENT_CHILD_MAPPING.GET_ALL, { method: "GET" });
//     const childId = (Array.isArray(mappings) ? mappings : []).find((m: any) => Number(m?.parent) === Number(parentId))?.child;
//     if (!childId) return NextResponse.json({ error: "No child mapped to this parent" }, { status: 400 });

//     // find or create food item
//     const listRes = await fetchWithTokenRetry(API_URLS.FOOD_ITEMS.GET_ALL, { method: "GET" });
//     const items = Array.isArray(listRes.data) ? listRes.data
//                  : Array.isArray(listRes.data?.results) ? listRes.data.results : [];
//     let foodItem = items.find((it: any) => String(it?.name).toLowerCase() === body.food.toLowerCase());

//     if (!foodItem) {
//       // quick-create with provided macros or zeros
//       const createRes = await fetchWithTokenRetry(API_URLS.FOOD_LOGS.CREATE, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: body.food,
//           calories: body.calories ?? 0,
//           protein: body.protein ?? 0,
//           fat: body.fat ?? 0,
//           carbohydrate: body.carbohydrate ?? 0,
//         }),
//       });
//       if (createRes.status >= 400) {
//         return NextResponse.json({ error: "Failed to create food item" }, { status: 400 });
//       }
//       foodItem = createRes.data;
//     }

//     // create food LOG
//     const createLog = await fetchWithTokenRetry(API_URLS.FOOD_LOGS.CREATE, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         child: childId,
//         food_item: foodItem.id,
//         meal_type: body.mealType,
//         quantity: body.quantity,
//       }),
//     });

//     if (createLog.status >= 400) {
//       return NextResponse.json({ error: "Failed to create food log" }, { status: createLog.status });
//     }

//     return NextResponse.json(createLog.data, { status: 201 });
//   } catch (err) {
//     console.error("[child-food-logs] POST error:", err);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import API_URLS from "@/src/lib/api";
import { fetchWithTokenRetry, decodeTokenFromRequest } from "@/src/lib/auth/server";

/**
 * GET: Return the mapped child's food logs as {results, count}
 */
export async function GET(req: NextRequest) {
  try {
    const payload = decodeTokenFromRequest(req);
    const parentId = payload?.user_id;
    if (!parentId) return NextResponse.json({ results: [], count: 0 }, { status: 401 });

    const { data: mappings, status: mapStatus } = await fetchWithTokenRetry(
      API_URLS.PARENT_CHILD_MAPPING.GET_ALL,
      { method: "GET" }
    );
    if (mapStatus >= 400 || !Array.isArray(mappings)) {
      return NextResponse.json({ results: [], count: 0 }, { status: mapStatus || 500 });
    }

    const childId =
      (mappings.find((m: any) => Number(m?.parent) === Number(parentId)) || {})?.child;

    if (!childId) {
      return NextResponse.json(
        { results: [], count: 0, message: "No child mapped to this parent" },
        { status: 200 }
      );
    }

    const url = `${API_URLS.FOOD_LOGS.GET_ALL}?child=${encodeURIComponent(childId)}`;
    const { data: logs, status: logsStatus } = await fetchWithTokenRetry(url, { method: "GET" });
    if (logsStatus >= 400) return NextResponse.json({ results: [], count: 0 }, { status: logsStatus });

    const list = Array.isArray(logs?.results) ? logs.results : Array.isArray(logs) ? logs : [];
    return NextResponse.json({ results: list, count: list.length }, { status: 200 });
  } catch (err) {
    console.error("[child-food-logs] GET error:", err);
    return NextResponse.json({ results: [], count: 0 }, { status: 200 });
  }
}

/**
 * POST: Add a food log.
 * Body can be:
 *  - { child, food, mealType, quantity }   // (child provided)
 *  - { food, mealType, quantity }          // (child inferred via mapping)
 */
export async function POST(req: NextRequest) {
  try {
    const payload = decodeTokenFromRequest(req);
    const parentId = payload?.user_id;
    if (!parentId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const body = (await req.json().catch(() => null)) as {
      child?: number;             // preferred: client sends child
      foodItemId?: number;        // 🔸 NEW: direct food item id from dropdown
      mealType?: string;
      quantity?: number;
      // legacy fields (if someone still posts by name)
      food?: string;
    };

    const quantity = Number(body?.quantity);
    const mealType = (body?.mealType || "").toUpperCase();
    let childId = body?.child;

    if (!mealType || !quantity) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Fallback to mapping if child not provided
    if (!childId) {
      const { data: mappings } = await fetchWithTokenRetry(API_URLS.PARENT_CHILD_MAPPING.GET_ALL, { method: "GET" });
      childId = (Array.isArray(mappings) ? mappings : [])
        .find((m: any) => Number(m?.parent) === Number(parentId))?.child;
    }
    if (!childId) return NextResponse.json({ error: "No child available" }, { status: 400 });

    let foodItemId = Number(body?.foodItemId);

    // If no id was provided, try to resolve by name (legacy support)
    if (!foodItemId && body?.food) {
      const listRes = await fetchWithTokenRetry(API_URLS.FOOD_ITEMS.GET_ALL, { method: "GET" });
      const items = Array.isArray(listRes.data)
        ? listRes.data
        : Array.isArray(listRes.data?.results)
        ? listRes.data.results
        : [];
      const match = items.find(
        (it: any) => String(it?.name).toLowerCase() === body.food!.trim().toLowerCase()
      );
      if (match?.id) foodItemId = Number(match.id);
    }

    if (!foodItemId) {
      return NextResponse.json({ error: "Select a valid food item" }, { status: 400 });
    }

    // Create the FOOD LOG (child id INCLUDED here)
    const createLog = await fetchWithTokenRetry(API_URLS.FOOD_LOGS.CREATE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        child: childId,
        food_item: foodItemId,
        meal_type: mealType,
        quantity,
      }),
    });

    if (createLog.status >= 400) {
      return NextResponse.json({ error: "Failed to create food log" }, { status: createLog.status });
    }

    return NextResponse.json(createLog.data, { status: 201 });
  } catch (err) {
    console.error("[child-food-logs] POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
