// // // src/app/api/food-logs/route.ts
// // import API_URLS from "@/src/lib/api";
// // import {
// //   fetchWithTokenRetry,
// //   decodeTokenFromRequest,
// // } from "@/src/lib/auth/server";
// // import { NextRequest, NextResponse } from "next/server";

// // export async function GET(req: NextRequest) {
// //   console.log("➡️ GET /api/food-logs (filtered by parent)");

// //   try {
// //     // ✅ decode logged-in parent from token
// //     const me = decodeTokenFromRequest(req);
// //     if (!me) {
// //       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //     }

// //     // ✅ fetch mappings
// //     const { data: mappings } = await fetchWithTokenRetry(
// //       API_URLS.PARENT_CHILD_MAPPING.GET_ALL,
// //       {
// //         method: "GET",
// //         headers: { "Content-Type": "application/json" },
// //       }
// //     );

// //     // filter mappings by parent_id = logged-in user_id
// //     const childIds: number[] = mappings
// //       .filter((m: any) => m.parent === me.user_id)
// //       .map((m: any) => m.child);

// //     if (childIds.length === 0) {
// //       return NextResponse.json([], { status: 200 });
// //     }

// //     // ✅ fetch food logs
// //     const { data: logs } = await fetchWithTokenRetry(API_URLS.FOOD_LOGS.GET_ALL, {
// //       method: "GET",
// //       headers: { "Content-Type": "application/json" },
// //     });

// //     // ✅ filter logs by child IDs
// //     const filtered = logs.filter((log: any) => childIds.includes(log.child));

// //     // ✅ format rows for table
// //     const formatted = filtered.map((log: any) => ({
// //       id: log.id,
// //       food: log.food_item?.name || "-",
// //       date: log.created_at_date,
// //       time: log.created_at_time,
// //       quantity: log.quantity,
// //       mealType: log.meal_type,
// //       fat: log.food_item?.fat ?? 0,
// //       protein: log.food_item?.protein ?? 0,
// //       carbs: log.food_item?.carbohydrate ?? 0,
// //       calories: log.food_item?.calories ?? 0,
// //     }));

// //     return NextResponse.json(formatted, { status: 200 });
// //   } catch (err) {
// //     console.error("[food-logs] Failed:", err);
// //     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
// //   }
// // }


// // src/app/api/food-logs/route.ts
// import API_URLS from "@/src/lib/api";
// import { fetchWithTokenRetry, decodeTokenFromRequest } from "@/src/lib/auth/server";
// import { NextRequest, NextResponse } from "next/server";

// /**
//  * GET /api/food-logs
//  * Filters child food logs to ONLY the children mapped to the logged-in parent.
//  * Optional query params:
//  *   - q: string (search by food name)
//  *   - mealType: "BREAKFAST" | "LUNCH" | "DINNER"
//  *   - dateFrom, dateTo: "YYYY-MM-DD"
//  *   - child: number (force a single child id, still must belong to the parent)
//  */
// export async function GET(req: NextRequest) {
//   console.log("➡️ GET /api/food-logs (filtered by parent)");
//   try {
//     const me = decodeTokenFromRequest(req);
//     if (!me) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const url = new URL(req.url);
//     const q = (url.searchParams.get("q") || "").trim().toLowerCase();
//     const mealType = url.searchParams.get("mealType") || "";
//     const dateFrom = url.searchParams.get("dateFrom") || "";
//     const dateTo = url.searchParams.get("dateTo") || "";
//     const childParam = url.searchParams.get("child");

//     // 1) Fetch mappings and get child IDs for this parent
//     const mapResp = await fetchWithTokenRetry(API_URLS.PARENT_CHILD_MAPPING.GET_ALL, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });
//     const mappings = Array.isArray(mapResp.data)
//       ? mapResp.data
//       : Array.isArray(mapResp.data?.results)
//       ? mapResp.data.results
//       : [];

//     const childIds: number[] = mappings
//       .filter((m: any) => m?.parent === me.user_id)
//       .map((m: any) => Number(m?.child))
//       .filter((n: any) => Number.isFinite(n));

//     // If parent has no mapped children
//     if (childIds.length === 0) return NextResponse.json([], { status: 200 });

//     // If a specific child was requested, only allow if mapped to this parent
//     const forcedChildId = childParam ? Number(childParam) : null;
//     const allowedChildSet = new Set(
//       forcedChildId && childIds.includes(forcedChildId) ? [forcedChildId] : childIds
//     );

//     // 2) Fetch food logs (handles both paginated and non-paginated backends)
//     const logsResp = await fetchWithTokenRetry(API_URLS.FOOD_LOGS.GET_ALL, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });

//     const logs = Array.isArray(logsResp.data)
//       ? logsResp.data
//       : Array.isArray(logsResp.data?.results)
//       ? logsResp.data.results
//       : [];

//     // 3) Filter by allowed children + optional filters
//     const filtered = logs.filter((log: any) => {
//       if (!allowedChildSet.has(Number(log?.child))) return false;

//       // meal type
//       if (mealType && log?.meal_type !== mealType) return false;

//       // date range (assumes backend returns created_at_date = "YYYY-MM-DD")
//       if (dateFrom && log?.created_at_date < dateFrom) return false;
//       if (dateTo && log?.created_at_date > dateTo) return false;

//       // text search by food name
//       if (q) {
//         const name = String(log?.food_item?.name || "").toLowerCase();
//         if (!name.includes(q)) return false;
//       }
//       return true;
//     });

//     // 4) Format rows for Basetable
//     const rows = filtered.map((log: any) => ({
//       id: log.id,
//       food: log.food_item?.name || "-",
//       date: log.created_at_date,
//       time: log.created_at_time,
//       quantity: log.quantity,
//       mealType: log.meal_type,
//       fat: log.food_item?.fat ?? 0,
//       protein: log.food_item?.protein ?? 0,
//       carbs: log.food_item?.carbohydrate ?? 0,
//       calories: log.food_item?.calories ?? 0,
//       child: log.child, // keep handy if you later add a child filter UI
//     }));

//     return NextResponse.json(rows, { status: 200 });
//   } catch (err) {
//     console.error("[food-logs] Failed:", err);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }



// import API_URLS from "@/src/lib/api";
// import { fetchWithTokenRetry } from "@/src/lib/auth/server";
// import { buildAuthHeader } from "@/src/lib/auth/utlis";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const token = req.headers.get("authorization")?.replace("Bearer ", "") || "";
//   const { data, status } = await fetchWithTokenRetry(API_URLS.FOOD_ITEMS.GET_ALL, {
//     method: "GET",
//     headers: buildAuthHeader(token),
//   });

//   // ✅ Wrap the array response into { results: [], count: N }
//   return NextResponse.json({ results: data, count: data.length }, { status });
// }



import API_URLS from "@/src/lib/api";
import { fetchWithTokenRetry } from "@/src/lib/auth/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  try {
    const { data, status } = await fetchWithTokenRetry(
      API_URLS.FOOD_ITEMS.GET_ALL,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    // Backend may return array or { results: [...] }
    const list = Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [];

    // Return a plain array for Basetable
    return NextResponse.json(list, { status: status || 200 });
  } catch (err) {
    console.error("[/api/parent/health] error:", err);
    return NextResponse.json([], { status: 200 }); // empty list is safe for the table
  }
}
