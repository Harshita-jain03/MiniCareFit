// "use client";

// import { useState } from "react";
// import Link from "next/link";

// interface Reward {
//   id: number;
//   name: string;
//   points: number;
// }
// interface Request {
//   id: number;
//   name: string;
//   points: number;
//   status: "Pending" | "Approved" | "Rejected";
// }
// export default function RewardPage() {
//   const rewards = [
//     { id: 1,name: "Frost Guard", points: 500, image: "/rewards/jaket.png" },
//     { id: 2,name: "Cycle", points: 10000, image: "/rewards/cycle.png" },
//     { id: 3,name: "Drone", points: 20000, image: "/rewards/drone.png" },
//   ];

//   const [requests, setRequests] = useState<Request[]>([
//   { id: 1, name: "Cycle", points: 5000, status: "Approved" },
//   { id: 2, name: "Drone", points: 20000, status: "Pending" },
//   { id: 3, name: "Frost Guard", points: 3000, status: "Rejected" },
// ]);

//   const [balance, setBalance] = useState(25000);
//   const [history, setHistory] = useState<
//     { date: string; item: string; points: number }[]
//   >([]);
//   const [showHistory, setShowHistory] = useState(false);
//   const [message, setMessage] = useState("");
//   const handlePurchase = (reward: Reward) => {
//     setRequests([
//       ...requests,
//       { id: reward.id, name: reward.name, points: reward.points, status: "Pending" },
//     ]);
//     setMessage(`Your request for "${reward.name}" has been sent to your parent for approval.`);
//     setTimeout(() => setMessage(""), 4000);
//   };
// //   const handlePurchase = (reward: { name: string; points: number; image: string }) => {
// //   // Create overlay div
// //   const modal = document.createElement("div");
// //   modal.className =
// //     "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

// //   // Create modal content
// //   
// //   `;

// //   document.body.appendChild(modal);

// //   // Attach event listeners
// //   (document.getElementById("yes") as HTMLButtonElement).onclick = () => {
// //     if (balance < reward.points) {
// //       alert("You do not have enough points to purchase this item.");
// //     } else {
// //       setBalance(balance - reward.points);
// //       setHistory([
// //         ...history,
// //         {
// //           date: new Date().toISOString().split("T")[0],
// //           item: reward.name,
// //           points: reward.points,
// //         },
// //       ]);
// //       alert(`You have successfully purchased "${reward.name}".`);
// //     }
// //     document.body.removeChild(modal);
// //   };

// //   (document.getElementById("no") as HTMLButtonElement).onclick = () => {
// //     document.body.removeChild(modal);
// //   };
// // };


//   return (
//     <div className="space-y-8">
//       <h1 className="text-2xl text-blue-500 font-bold">
//         Rewards
//       </h1>
//       {message && (
//         <div className="bg-green-100 border border-green-300 text-green-700 p-3 rounded">
//           {message}
//         </div>
//       )}
//       {/* Top Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-lg text-center">
//           <div className="text-sm">Total Balance</div>
//           <div className="text-3xl font-bold mt-2">{balance}</div>
//         </div>
        
        
//         <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-lg text-center">
//     <div className="text-sm">Today Earnings</div>
//     <div className="text-3xl font-bold mt-2">
//       {history.filter(
//         (h) =>
//           h.date === new Date().toISOString().split("T")[0]
//       ).reduce((sum, h) => sum + h.points, 0)}
//     </div>
//   </div>

//   <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-lg text-center">
//     <div className="text-sm">Average Earnings</div>
//     <div className="text-3xl font-bold mt-2">
//       {history.length === 0
//         ? 0
//         : Math.floor(
//             history.reduce((sum, h) => sum + h.points, 0) /
//               history.length
//           )}
//     </div>
//   </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-4">
//         <button
//           onClick={() => setShowHistory(true)}
//           className="px-4 py-2 rounded font-medium bg-blue-600 text-white"
//         >
//           View History
//         </button>
//         <Link className="px-4 py-2 rounded font-medium bg-blue-600 text-white"
//   href={{
//     pathname: "/dashboard/child/reward/summary",
//     query: { data: JSON.stringify(history) }
//   }}
// >
//   Summary
// </Link>

//       </div>

//       {/* Rewards List */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {rewards.map((reward) => (
//           <div
//             key={reward.name}
//             className="flex flex-col text-blue-300 items-center bg-white rounded-lg shadow p-4"
//           >
//             <img
//               src={reward.image}
//               alt={reward.name}
//               className="w-24 h-24 object-contain mb-2"
//             />
//             <div className="font-semibold">{reward.name}</div>
//             <div className="text-blue-600 text-sm">
//               Points: {reward.points}
//             </div>
//             <button
//               onClick={() => handlePurchase(reward)}
//               className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Request Purchase
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* History Modal */}
//       {showHistory && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow w-full max-w-lg space-y-4">
//             <h2 className="text-xl text-blue-500 font-bold">Purchased Rewards</h2>
//             {requests.filter(r => r.status === "Approved").length === 0 ? (
//               <p className="text-gray-700">No approved purchases yet.</p>
//             ) : (
//               <table className="w-full text-sm border">
//                 <thead className="bg-gray-500">
//                   <tr>
//                     <th className="p-2  text-left">Reward</th>
//                     <th className="p-2 text-left">Points</th>
//                     <th className="p-2 text-left">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {requests
//                     .filter(r => r.status === "Approved")
//                     .map((req, idx) => (
//                       <tr key={idx}>
//                         <td className="p-2 text-black">{req.name}</td>
//                         <td className="p-2 text-black">{req.points}</td>
//                         <td className="p-2 text-green-600">{req.status}</td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             )}
//             <div className="flex justify-end">
//               <button
//                 onClick={() => setShowHistory(false)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";

type Balance = { earned_points: number; spent_points: number; balance: number };
type Reward = {
  id: number;
  name: string;
  description: string;
  required_points: number;
  is_active: boolean;
  valid_till?: string | null;
};

function getTokenFromLS(): string | null {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    null
  );
}

/** Build a real Headers object so TS is happy (no union type). */
function buildAuthHeaders(): Headers {
  const h = new Headers();
  const t = getTokenFromLS();
  if (t) h.set("Authorization", `Bearer ${t}`);
  return h;
}

export default function RewardsPage() {
  const [balance, setBalance] = useState<Balance | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const auth = buildAuthHeaders();

        const [bRes, rRes] = await Promise.all([
          fetch("/api/child/rewards/balance", { headers: auth, cache: "no-store" }),
          fetch("/api/child/rewards/reward?is_active=true", {
            headers: auth,
            cache: "no-store",
          }),
        ]);

        const b = await bRes.json();
        const r = await rRes.json();

        const list = Array.isArray(r)
          ? r
          : Array.isArray(r?.results)
          ? (r.results as Reward[])
          : [];

        setBalance(b as Balance);
        setRewards(list);
      } catch (e) {
        console.error("[rewards] load error:", e);
        setRewards([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function redeem(reward: Reward) {
    if (!balance) return;
    if (!canRedeem(reward, balance)) return;

    if (!confirm(`Redeem "${reward.name}" for ${reward.required_points} points?`))
      return;

    setRedeeming(reward.id);
    try {
      const headers = buildAuthHeaders();
      headers.set("Content-Type", "application/json");

      const res = await fetch("/api/child/rewards/redeem", {
        method: "POST",
        headers,
        body: JSON.stringify({ reward_id: reward.id }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(json?.error || "Redeem failed");
        return;
      }

      // If backend sends totals, use them. Otherwise, refetch balance.
      const totals = json?.totals;
      if (totals && typeof totals.balance === "number") {
        setBalance({
          earned_points: totals.earned_points,
          spent_points: totals.spent_points,
          balance: totals.balance,
        });
      } else {
        const bRes = await fetch("/api/child/rewards/balance", {
          headers: buildAuthHeaders(),
          cache: "no-store",
        });
        const b = await bRes.json();
        setBalance(b as Balance);
      }

      alert("✅ Redeemed!");
    } catch (e) {
      console.error(e);
      alert("Redeem request failed");
    } finally {
      setRedeeming(null);
    }
  }

  const now = useMemo(() => new Date(), []);
  function isExpired(valid_till?: string | null) {
    if (!valid_till) return false;
    const dt = new Date(valid_till);
    return dt.getTime() < now.getTime();
  }

  function canRedeem(r: Reward, bal: Balance) {
    if (!r.is_active) return false;
    if (isExpired(r.valid_till)) return false;
    return (bal?.balance ?? 0) >= r.required_points;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-blue-700">🎁 Rewards</h1>
        <a
          href="/dashboard/child/reward/history"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          View History
        </a>
      </div>

      {/* Balance Card */}
      <div className="bg-white rounded-xl shadow p-5">
        {balance ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-gray-500 text-sm">Earned</p>
              <p className="text-2xl font-bold text-green-600">
                {balance.earned_points}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Spent</p>
              <p className="text-2xl font-bold text-red-500">
                {balance.spent_points}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Current Balance</p>
              <p className="text-2xl font-bold text-blue-700">
                {balance.balance}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Loading balance…</p>
        )}
      </div>

      {/* Rewards Table */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-lg font-semibold text-blue-600 mb-3">
          Active Rewards
        </h2>
        {loading ? (
          <p>Loading rewards…</p>
        ) : rewards.length === 0 ? (
          <p className="text-gray-500">No active rewards.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 border text-left text-black">Name</th>
                  <th className="px-3 py-2 border text-left text-black">
                    Description
                  </th>
                  <th className="px-3 py-2 border text-right text-black">
                    Required
                  </th>
                  <th className="px-3 py-2 border text-center text-black">
                    Valid Till
                  </th>
                  <th className="px-3 py-2 border text-center text-black">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {rewards.map((r) => {
                  const expired = isExpired(r.valid_till);
                  const ok = balance ? canRedeem(r, balance) : false;
                  return (
                    <tr key={r.id}>
                      <td className="px-3 py-2 border text-black">{r.name}</td>
                      <td className="px-3 py-2 border text-black">
                        {r.description}
                      </td>
                      <td className="px-3 py-2 border text-right text-black">
                        {r.required_points}
                      </td>
                      <td className="px-3 py-2 border text-center text-black">
                        {r.valid_till ? (
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              expired
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {expired
                              ? "Expired"
                              : new Date(r.valid_till).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2 border text-center">
                        <button
                          onClick={() => redeem(r)}
                          disabled={!ok || redeeming === r.id}
                          className={`px-3 py-1 rounded text-white ${
                            ok
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-gray-400"
                          } disabled:opacity-60`}
                        >
                          {redeeming === r.id ? "Processing…" : "Redeem"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
