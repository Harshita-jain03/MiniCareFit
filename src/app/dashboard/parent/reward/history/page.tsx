// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Link from "next/link";

// type RewardRow = {
//   id: number;
//   name: string;
//   description: string;
//   required_points: number;
//   is_active: boolean;
//   valid_till: string;   // ISO
//   created_at: string;   // ISO
//   updated_at: string;   // ISO
//   created_by: number;
//   updated_by?: number | null;
//   child_id?: number | null;
// };

// export default function RewardHistoryPage() {
//   const [rows, setRows] = useState<RewardRow[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");

//   // simple client-side filters
//   const [q, setQ] = useState("");
//   const [onlyActive, setOnlyActive] = useState<"all" | "active" | "inactive">("all");

//   useEffect(() => {
//     (async () => {
//       setLoading(true);
//       setErr("");
//       try {
//         const res = await fetch("/api/parent/reward", { cache: "no-store" });
//         const json = await res.json();
//         if (!res.ok) throw new Error(json?.error || "Failed to load");
//         setRows(Array.isArray(json?.results) ? json.results : []);
//       } catch (e: any) {
//         setErr(e?.message || "Failed to load");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const filtered = useMemo(() => {
//     let list = rows;
//     if (q.trim()) {
//       const s = q.toLowerCase();
//       list = list.filter(
//         (r) =>
//           r.name.toLowerCase().includes(s) ||
//           (r.description || "").toLowerCase().includes(s) ||
//           String(r.child_id || "").includes(s)
//       );
//     }
//     if (onlyActive !== "all") {
//       const want = onlyActive === "active";
//       list = list.filter((r) => r.is_active === want);
//     }
//     // sort: newest first
//     return [...list].sort(
//       (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//     );
//   }, [rows, q, onlyActive]);

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-semibold text-gray-800 text-black">Reward History</h1>
//         <div className="flex items-center gap-2">
//           <Link
//             href="/dashboard/parent/reward"
//             className="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-100 text-black"
//           >
//             ← Back to Create
//           </Link>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl border border-gray-200 p-4 text-black">
//         <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-black">
//           <div className="flex gap-2">
//             <input
//               value={q}
//               onChange={(e) => setQ(e.target.value)}
//               placeholder="Search by name/description/child id…"
//               className="w-72 max-w-full border rounded-md px-3 py-2 text-black"
//             />
//             <select
//               value={onlyActive}
//               onChange={(e) => setOnlyActive(e.target.value as any)}
//               className="border rounded-md px-3 py-2 text-black"
//             >
//               <option value="all">All</option>
//               <option value="active">Active only</option>
//               <option value="inactive">Inactive only</option>
//             </select>
//           </div>

//           <div className="text-sm text-gray-600 text-black">
//             Showing <b>{filtered.length}</b> of <b>{rows.length}</b>
//           </div>
//         </div>

//         <div className="mt-4 overflow-x-auto">
//           {loading ? (
//             <div className="py-10 text-center text-gray-600">Loading…</div>
//           ) : err ? (
//             <div className="py-4 text-red-600">{err}</div>
//           ) : filtered.length === 0 ? (
//             <div className="py-10 text-center text-gray-600">No rewards found.</div>
//           ) : (
//             <table className="w-full text-sm border border-gray-200 rounded-md overflow-hidden">
//               <thead className="bg-gray-50">
//                 <tr className="text-left">
//                   <th className="p-2 border-b">ID</th>
//                   <th className="p-2 border-b">Name</th>
//                   <th className="p-2 border-b">Required Points</th>
//                   <th className="p-2 border-b">Active</th>
//                   <th className="p-2 border-b">Valid Till</th>
//                   <th className="p-2 border-b">Child ID</th>
//                   <th className="p-2 border-b">Created At</th>
//                   <th className="p-2 border-b">Description</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map((r) => (
//                   <tr key={r.id} className="border-b">
//                     <td className="p-2">{r.id}</td>
//                     <td className="p-2 font-medium">{r.name}</td>
//                     <td className="p-2">{r.required_points}</td>
//                     <td className="p-2">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs ${
//                           r.is_active
//                             ? "bg-green-100 text-green-800"
//                             : "bg-gray-100 text-gray-700"
//                         }`}
//                       >
//                         {r.is_active ? "Active" : "Inactive"}
//                       </span>
//                     </td>
//                     <td className="p-2">
//                       {r.valid_till ? new Date(r.valid_till).toLocaleString() : "—"}
//                     </td>
//                     <td className="p-2">{r.child_id ?? "—"}</td>
//                     <td className="p-2">
//                       {r.created_at ? new Date(r.created_at).toLocaleString() : "—"}
//                     </td>
//                     <td className="p-2 max-w-[360px]">
//                       <div className="line-clamp-2 text-gray-700">{r.description || "—"}</div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type RewardRow = {
  id: number;
  name: string;
  description: string;
  required_points: number;
  is_active: boolean;
  valid_till: string;   // ISO
  created_at: string;   // ISO
  updated_at: string;   // ISO
  created_by: number;
  updated_by?: number | null;
  child_id?: number | null;
};

export default function RewardHistoryPage() {
  const [rows, setRows] = useState<RewardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // simple client-side filters
  const [q, setQ] = useState("");
  const [onlyActive, setOnlyActive] = useState<"all" | "active" | "inactive">("all");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const res = await fetch("/api/parent/reward", { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to load");
        setRows(Array.isArray(json?.results) ? json.results : []);
      } catch (e: any) {
        setErr(e?.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    let list = rows;
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(s) ||
          (r.description || "").toLowerCase().includes(s) ||
          String(r.child_id || "").includes(s)
      );
    }
    if (onlyActive !== "all") {
      const want = onlyActive === "active";
      list = list.filter((r) => r.is_active === want);
    }
    // sort: newest first
    return [...list].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [rows, q, onlyActive]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 text-black">
          Reward History
        </h1>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/parent/reward"
            className="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-100 text-black"
          >
            ← Back to Create
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 text-black">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-black">
          <div className="flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name/description/child id…"
              className="w-72 max-w-full border rounded-md px-3 py-2 text-black"
            />
            <select
              value={onlyActive}
              onChange={(e) => setOnlyActive(e.target.value as any)}
              className="border rounded-md px-3 py-2 text-black"
            >
              <option value="all">All</option>
              <option value="active">Active only</option>
              <option value="inactive">Inactive only</option>
            </select>
          </div>

          <div className="text-sm text-gray-600 text-black">
            Showing <b>{filtered.length}</b> of <b>{rows.length}</b>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          {loading ? (
            <div className="py-10 text-center text-gray-600">Loading…</div>
          ) : err ? (
            <div className="py-4 text-red-600">{err}</div>
          ) : filtered.length === 0 ? (
            <div className="py-10 text-center text-gray-600">
              No rewards found.
            </div>
          ) : (
            <table className="w-full text-sm border border-gray-300 rounded-md overflow-hidden">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  <th className="p-2 border border-gray-300">ID</th>
                  <th className="p-2 border border-gray-300">Name</th>
                  <th className="p-2 border border-gray-300">Required Points</th>
                  <th className="p-2 border border-gray-300">Active</th>
                  <th className="p-2 border border-gray-300">Valid Till</th>
                  <th className="p-2 border border-gray-300">Child ID</th>
                  <th className="p-2 border border-gray-300">Created At</th>
                  <th className="p-2 border border-gray-300">Description</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id}>
                    <td className="p-2 border border-gray-300">{r.id}</td>
                    <td className="p-2 border border-gray-300 font-medium">
                      {r.name}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {r.required_points}
                    </td>
                    <td className="p-2 border border-gray-300">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          r.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {r.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-2 border border-gray-300">
                      {r.valid_till
                        ? new Date(r.valid_till).toLocaleString()
                        : "—"}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {r.child_id ?? "—"}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {r.created_at
                        ? new Date(r.created_at).toLocaleString()
                        : "—"}
                    </td>
                    <td className="p-2 border border-gray-300 max-w-[360px]">
                      <div className="line-clamp-2 text-gray-700">
                        {r.description || "—"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
