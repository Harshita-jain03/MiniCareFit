

"use client";

import { useEffect, useState } from "react";

type RedemptionRow = {
  id: number;
  date: string;
  time: string;
  name: string;
  points: number | string;
};

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
  const [rows, setRows] = useState<RedemptionRow[]>([]);
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

        const list: any[] = Array.isArray(r)
          ? r
          : Array.isArray(r?.results)
          ? r.results
          : [];

        // Use serializer extras: reward_name & points
        const view: RedemptionRow[] = list
          .map((x) => {
            const d = new Date(x.redeemed_at);
            const name = x.reward_name || `#${x.reward}`;
            const pts =
              typeof x.points === "number" ? x.points : x.points ?? "-";
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
                  <th className="px-3 py-2 border text-right text-black">
                    Points
                  </th>
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
