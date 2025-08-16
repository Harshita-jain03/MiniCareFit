// "use client";

// import { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Legend,
// } from "recharts";

// interface Request {
//   id: number;
//   name: string;
//   points: number;
//   status: "Pending" | "Approved" | "Rejected";
//   date: string; // YYYY-MM-DD
// }

// export default function SummaryPage() {
//   // Dummy data
//   const [requests] = useState<Request[]>([
//     { id: 1, name: "Cycle", points: 5000, status: "Approved", date: "2024-07-05" },
//     { id: 2, name: "Drone", points: 20000, status: "Pending", date: "2024-07-06" },
//     { id: 3, name: "Frost Guard", points: 3000, status: "Approved", date: "2024-07-06" },
//     { id: 4, name: "Skateboard", points: 4000, status: "Rejected", date: "2024-07-06" },
//     { id: 5, name: "Telescope", points: 7000, status: "Pending", date: "2024-07-07" },
//   ]);

//   // Counts
//   const statusCounts = [
//     {
//       name: "Pending",
//       count: requests.filter((r) => r.status === "Pending").length,
//     },
//     {
//       name: "Approved",
//       count: requests.filter((r) => r.status === "Approved").length,
//     },
//     {
//       name: "Rejected",
//       count: requests.filter((r) => r.status === "Rejected").length,
//     },
//   ];

//   // Points per date (only approved)
//   const pointsPerDate = Array.from(
//     requests
//       .filter((r) => r.status === "Approved")
//       .reduce((map, r) => {
//         if (!map.has(r.date)) {
//           map.set(r.date, r.points);
//         } else {
//           map.set(r.date, map.get(r.date)! + r.points);
//         }
//         return map;
//       }, new Map<string, number>())
//   ).map(([date, total]) => ({
//     date,
//     points: total,
//   }));

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold text-blue-600">Rewards Summary</h1>

//       {/* Counts */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {statusCounts.map((s) => (
//           <div
//             key={s.name}
//             className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded shadow text-center"
//           >
//             <p className="font-semibold">{s.name} Requests</p>
//             <p className="text-2xl font-bold">{s.count}</p>
//           </div>
//         ))}
//       </div>

//       {/* Chart: Requests by Status */}
      

      

//       {/* Table: All Requests */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="text-lg text-blue-600 font-semibold mb-2">All Requests</h2>
//         <table className="w-full text-sm border">
//           <thead className="bg-gray-500">
//             <tr>
//               <th className="p-2  text-left">Reward</th>
//               <th className="p-2 text-left">Points</th>
//               <th className="p-2 text-left">Date</th>
//               <th className="p-2 text-left">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map((r) => (
//               <tr key={r.id}>
//                 <td className="p-2 text-black">{r.name}</td>
//                 <td className="p-2 text-black">{r.points}</td>
//                 <td className="p-2 text-black">{r.date}</td>
//                 <td
//                   className={`p-2 font-semibold ${
//                     r.status === "Approved"
//                       ? "text-green-600"
//                       : r.status === "Rejected"
//                       ? "text-red-600"
//                       : "text-yellow-600"
//                   }`}
//                 >
//                   {r.status}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Chart: Points Earned by Date */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="text-lg text-blue-600 font-semibold mb-2">Points Earned by Date</h2>
//         {pointsPerDate.length === 0 ? (
//           <p className="text-gray-500">No approved rewards yet.</p>
//         ) : (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={pointsPerDate}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="points" fill="#10b981" />
//             </BarChart>
//           </ResponsiveContainer>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";

type Redemption = {
  id: number;
  redeemed_at: string; // ISO
  reward: number;
  reward_snapshot?: { name?: string; required_points?: number };
};

type Reward = { id: number; name: string; required_points: number };

function getTokenFromLS(): string | null {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    null
  );
}

function buildAuthHeaders(): Headers {
  const h = new Headers();
  const t = getTokenFromLS();
  if (t) h.set("Authorization", `Bearer ${t}`);
  return h;
}

export default function RewardsHistoryPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const auth = buildAuthHeaders();

        const rRes = await fetch("/api/child/rewards/redemptions", {
          headers: auth,
          cache: "no-store",
        });
        const r = await rRes.json();
        const list: Redemption[] = Array.isArray(r)
          ? r
          : Array.isArray(r?.results)
          ? r.results
          : [];

        // (Optional) build name map if needed
        const rewardIds = [...new Set(list.map((x) => x.reward).filter(Boolean))];
        let nameMap: Record<number, Reward> = {};
        if (rewardIds.length) {
          const allRes = await fetch("/api/child/rewards/rewards", {
            headers: auth,
            cache: "no-store",
          });
          const all = await allRes.json();
          const arr: Reward[] = Array.isArray(all)
            ? all
            : Array.isArray(all?.results)
            ? all.results
            : [];
          nameMap = arr.reduce((acc, it) => {
            acc[it.id] = it;
            return acc;
          }, {} as Record<number, Reward>);
        }

        const view = list
          .map((x) => {
            const d = new Date(x.redeemed_at);
            const meta = nameMap[x.reward];
            const name = x.reward_snapshot?.name || meta?.name || `#${x.reward}`;
            const pts =
              x.reward_snapshot?.required_points ?? meta?.required_points ?? "-";
            return {
              id: x.id,
              date: d.toLocaleDateString(),
              time: d.toLocaleTimeString(),
              name,
              points: pts,
            };
          })
          .sort((a, b) => (a.id > b.id ? -1 : 1));

        setRows(view);
      } catch (e) {
        console.error("[history] load error:", e);
        setRows([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-blue-700">
          🎉 Redemption History
        </h1>
        <a href="/dashboard/child/reward" className="text-blue-600 underline">
          ⬅ Back to Rewards
        </a>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        {loading ? (
          <p>Loading…</p>
        ) : rows.length === 0 ? (
          <p className="text-gray-500">No redemptions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 border text-left text-black">Date</th>
                  <th className="px-3 py-2 border text-left text-black">Time</th>
                  <th className="px-3 py-2 border text-left text-black">Reward</th>
                  <th className="px-3 py-2 border text-right text-black">Points</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td className="px-3 py-2 border text-black">{r.date}</td>
                    <td className="px-3 py-2 border text-black">{r.time}</td>
                    <td className="px-3 py-2 border text-black">{r.name}</td>
                    <td className="px-3 py-2 border text-right text-black">
                      {r.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
