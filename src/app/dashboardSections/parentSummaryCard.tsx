// // app/dashboard/parent/weekly/page.tsx
// // If your folder path is different, place this file accordingly.

// type DayRow = {
//   date: string;
//   day: string;
//   tasks_completed: number;
//   rewards: number;
//   calories: number;
// };

// type Points = {
//   earned_all_time: number;
//   spent_all_time: number;
//   balance: number;
//   earned_this_week: number;
// };

// type ChildSummary = {
//   child: { id: number; name: string };
//   range: { from_?: string; to: string };
//   daily: DayRow[];
//   totals: { tasks_completed: number; rewards: number; calories: number };
//   points: Points;
// };

// type WeeklyData = {
//   range: { from: string; to: string };
//   count: number;
//   summaries: ChildSummary[];
// };

// // const DATA: WeeklyData = {
// //   range: {
// //     from: "2025-08-11",
// //     to: "2025-08-17",
// //   },
// //   count: 1,
// //   summaries: [
// //     {
// //       child: {
// //         // id: 1,
// //         // name: "harshita",
// //       },
// //       range: {
// //         from_: "2025-08-11",
// //         to: "2025-08-17",
// //       },
// //       daily: [
// //         // { date: "2025-08-11", day: "Mon", tasks_completed: 0, rewards: 0, calories: 0 },
// //         // { date: "2025-08-12", day: "Tue", tasks_completed: 0, rewards: 0, calories: 0 },
// //         // { date: "2025-08-13", day: "Wed", tasks_completed: 0, rewards: 0, calories: 100 },
// //         // { date: "2025-08-14", day: "Thu", tasks_completed: 0, rewards: 0, calories: 0 },
// //         // { date: "2025-08-15", day: "Fri", tasks_completed: 0, rewards: 0, calories: 0 },
// //         // { date: "2025-08-16", day: "Sat", tasks_completed: 0, rewards: 0, calories: 0 },
// //         // { date: "2025-08-17", day: "Sun", tasks_completed: 0, rewards: 0, calories: 0 },
// //       ],
// //       totals: { tasks_completed: 0, rewards: 0, calories: 100 },
// //       points: { earned_all_time: 0, spent_all_time: 0, balance: 0, earned_this_week: 0 },
// //     },
// //   ],
// // };

// export default function WeeklyTablePage() {
//   // const summary = DATA.summaries?.[0];
//   // const balance = summary?.points?.balance ?? 0;

//   return (
//     <div className="p-6">
//       <div className="mb-4">
//         <h1 className="text-2xl font-semibold text-black">Weekly Summary</h1>
//         <p className="text-sm text-gray-500">
//           {/* {summary?.child?.name ? `Child: ${summary.child.name}` : null} */}
//           {/* {summary?.range?.to ? ` • ${DATA.range.from} → ${DATA.range.to}` : null} */}
//         </p>
//       </div>

//       <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
//         <table className="min-w-full border-collapse">
//             <thead className="bg-gray-50">
//               <tr>
//                 {/* Keeping Date/Day hidden if you truly want ONLY the three columns,
//                     but they’re useful; remove these two <th>/<td> blocks if not needed */}
//                 <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
//                   Date
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
//                   Day
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
//                   Tasks
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
//                   Balance
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
//                   Calories
//                 </th>
//               </tr>
//             </thead>
//             {/* <tbody>
//               {summary?.daily?.map((d) => (
//                 <tr key={d.date} className="odd:bg-white even:bg-gray-50">
//                   <td className="px-4 py-3 text-sm text-gray-800 text-black">{d.date}</td>
//                   <td className="px-4 py-3 text-sm text-gray-800 text-black">{d.day}</td>
//                   <td className="px-4 py-3 text-sm font-medium text-black">{d.tasks_completed}</td>
//                   <td className="px-4 py-3 text-sm font-medium text-black">{balance}</td>
//                   <td className="px-4 py-3 text-sm font-medium text-black">{d.calories}</td>
//                 </tr>
//               ))} */}
//             {/* </tbody> */}
//             <tfoot>
//               <tr className="bg-gray-100">
//                 <td className="px-4 py-3 text-sm font-semibold text-gray-700 text-black" colSpan={2}>
//                   Totals
//                 </td>
//                 <td className="px-4 py-3 text-sm font-semibold text-black">
//                   {/* {summary?.totals?.tasks_completed ?? 0} */}
//                 </td>
//                 {/* <td className="px-4 py-3 text-sm font-semibold text-black">{balance}</td> */}
//                 <td className="px-4 py-3 text-sm font-semibold text-black">
//                   {/* {summary?.totals?.calories ?? 0} */}
//                 </td>
//               </tr>
//             </tfoot>
//         </table>
//       </div>
//     </div>
//   );
// }

// // import { cookies } from 'next/headers';

// // // ---- Types based on your response shape ----
// // export type DayRow = {
// //   date: string;
// //   day: string;
// //   tasks_completed: number;
// //   rewards: number;
// //   calories: number;
// // };

// // export type Points = {
// //   earned_all_time: number;
// //   spent_all_time: number;
// //   balance: number;
// //   earned_this_week: number;
// // };

// // export type ChildSummary = {
// //   child: { id: number; name: string };
// //   range: { from_?: string; to: string };
// //   daily: DayRow[];
// //   totals: { tasks_completed: number; rewards: number; calories: number };
// //   points: Points;
// // };

// // export type WeeklyData = {
// //   range: { from: string; to: string };
// //   count: number;
// //   summaries: ChildSummary[];
// // };

// // async function getWeeklySummary(): Promise<WeeklyData> {
// //   const cookieStore = await cookies(); // ✅ FIX: use await
// //   const token = cookieStore.get('token')?.value ?? '';

// //   const res = await fetch('/api/parent/dashboard/children-week-summary', {
// //     method: 'GET',
// //     headers: token ? { Authorization: `Bearer ${token}` } : {},
// //     cache: 'no-store',
// //   });

// //   if (!res.ok) {
// //     let msg = `Failed to load weekly summary (${res.status})`;
// //     try {
// //       const j = await res.json();
// //       if (j?.error) msg = j.error;
// //     } catch {}
// //     throw new Error(msg);
// //   }

// //   return res.json();
// // }

// // export default async function WeeklyTablePage() {
// //   let data: WeeklyData | null = null;
// //   let error: string | null = null;

// //   try {
// //     data = await getWeeklySummary();
// //   } catch (e: any) {
// //     error = e?.message || 'Failed to fetch';
// //   }

// //   const summary = data?.summaries?.[0];
// //   const balance = summary?.points?.balance ?? 0;

// //   return (
// //     <div className="p-6">
// //       <div className="mb-4">
// //         <h1 className="text-2xl font-semibold">Weekly Summary</h1>
// //         {summary ? (
// //           <p className="text-sm text-gray-500">
// //             {summary.child?.name ? `Child: ${summary.child.name}` : null}
// //             {data?.range?.from && data?.range?.to ? ` • ${data.range.from} → ${data.range.to}` : null}
// //           </p>
// //         ) : null}
// //       </div>

// //       {error ? (
// //         <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
// //           {error}
// //         </div>
// //       ) : !summary ? (
// //         <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-700">
// //           No data found.
// //         </div>
// //       ) : (
// //         <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
// //           <table className="min-w-full border-collapse">
// //             <thead className="bg-gray-50">
// //               <tr>
// //                 <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
// //                   Date
// //                 </th>
// //                 <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
// //                   Day
// //                 </th>
// //                 <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
// //                   Tasks
// //                 </th>
// //                 <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
// //                   Balance
// //                 </th>
// //                 <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
// //                   Calories
// //                 </th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {summary.daily?.map((d) => (
// //                 <tr key={d.date} className="odd:bg-white even:bg-gray-50">
// //                   <td className="px-4 py-3 text-sm text-gray-800">{d.date}</td>
// //                   <td className="px-4 py-3 text-sm text-gray-800">{d.day}</td>
// //                   <td className="px-4 py-3 text-sm font-medium">{d.tasks_completed}</td>
// //                   <td className="px-4 py-3 text-sm font-medium">{balance}</td>
// //                   <td className="px-4 py-3 text-sm font-medium">{d.calories}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //             <tfoot>
// //               <tr className="bg-gray-100">
// //                 <td className="px-4 py-3 text-sm font-semibold text-gray-700" colSpan={2}>
// //                   Totals
// //                 </td>
// //                 <td className="px-4 py-3 text-sm font-semibold">
// //                   {summary.totals?.tasks_completed ?? 0}
// //                 </td>
// //                 <td className="px-4 py-3 text-sm font-semibold">{balance}</td>
// //                 <td className="px-4 py-3 text-sm font-semibold">
// //                   {summary.totals?.calories ?? 0}
// //                 </td>
// //               </tr>
// //             </tfoot>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// src/app/dashboard/parent/weekly/page.tsx
import { cookies, headers } from "next/headers";

type DayRow = { date: string; day: string; tasks_completed: number; rewards: number; calories: number; };
type Points = { earned_all_time: number; spent_all_time: number; balance: number; earned_this_week: number; };

async function getParentChildWeekSummary() {
  const cookieStore = await cookies();
  const hdrs = await headers();

  // Build an ABSOLUTE same-origin URL
  const base =
    process.env.NEXT_PUBLIC_APP_URL ||
    `http://${hdrs.get("host") || "localhost:3000"}`;
  const url = new URL("/api/parent/dashboard/week-summary", base).toString();

  // Forward cookies so the API route can read JWT
  const res = await fetch(url, {
    cache: "no-store",
    headers: { Cookie: cookieStore.toString() },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || `Failed to load (${res.status})`);
  }

  return res.json() as Promise<{
    child: { id: number; name: string } | null;
    range: { from?: string; from_?: string; to?: string } | null;
    daily: DayRow[];
    totals: { tasks_completed: number; rewards: number; calories: number };
    points: Points;
    message?: string;
  }>;
}

export default async function WeeklyTablePage() {
  let data: Awaited<ReturnType<typeof getParentChildWeekSummary>> | null = null;
  let error: string | null = null;

  try {
    data = await getParentChildWeekSummary();
  } catch (e: any) {
    error = e?.message || "Failed to fetch";
  }

  const daily = data?.daily || [];
  const totals = data?.totals || { tasks_completed: 0, rewards: 0, calories: 0 };
  const balance = data?.points?.balance ?? 0;

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-black">Weekly Summary</h1>
        <p className="text-sm text-gray-500">
          {data?.child?.name ? `Child: ${data.child.name}` : data?.message || ""}
          {(data?.range?.from || (data?.range as any)?.from_) && data?.range?.to
            ? ` • ${(data!.range as any).from || (data!.range as any).from_} → ${data!.range!.to}`
            : ""}
        </p>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
      ) : daily.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-700">
          No data found for this week.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">Day</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">Tasks</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">Balance</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">Calories</th>
              </tr>
            </thead>
            <tbody>
              {daily.map((d) => (
                <tr key={d.date} className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-black">{d.date}</td>
                  <td className="px-4 py-3 text-sm text-black">{d.day}</td>
                  <td className="px-4 py-3 text-sm font-medium text-black">{d.tasks_completed}</td>
                  <td className="px-4 py-3 text-sm font-medium text-black">{balance}</td>
                  <td className="px-4 py-3 text-sm font-medium text-black">{d.calories}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100">
                <td className="px-4 py-3 text-sm font-semibold text-black" colSpan={2}>Totals</td>
                <td className="px-4 py-3 text-sm font-semibold text-black">{totals.tasks_completed}</td>
                <td className="px-4 py-3 text-sm font-semibold text-black">{balance}</td>
                <td className="px-4 py-3 text-sm font-semibold text-black">{totals.calories}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
