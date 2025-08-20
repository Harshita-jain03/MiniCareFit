"use client";

import { useEffect, useMemo, useState } from "react";

type Balance = {
  user_id?: number;
  earned_points: number;
  spent_points: number;
  balance: number;
};

type Reward = {
  id: number;
  name: string;
  description: string;
  required_points: number;
  is_active: boolean;
  valid_till?: string | null;
};

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token") || localStorage.getItem("accessToken");
}

/** decode user_id from JWT without extra libs */
function getUserIdFromToken(): number | null {
  try {
    const t = getToken();
    if (!t) return null;
    const [, payloadB64] = t.split(".");
    const json = JSON.parse(
      atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/"))
    );
    const id = json?.user_id ?? json?.uid ?? json?.sub;
    return typeof id === "number" ? id : Number(id) || null;
  } catch {
    return null;
  }
}

function buildAuthHeaders(): Headers {
  const h = new Headers();
  const t = getToken();
  if (t) h.set("Authorization", `Bearer ${t}`);
  return h;
}

export default function RewardsPage() {
  const [balance, setBalance] = useState<Balance | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState<number | null>(null);

  // keep track of items redeemed in this session (one-time redeem UX)
  const [redeemedIds, setRedeemedIds] = useState<Set<number>>(new Set());

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

        const bJson = await bRes.json();
        const rJson = await rRes.json();

        // collapse balance ARRAY to logged-in user's row
        const uid = getUserIdFromToken();
        let picked: Balance | null = null;

        if (Array.isArray(bJson)) {
          const mine =
            bJson.find((x: any) => String(x.user_id) === String(uid)) ??
            bJson[0] ??
            null;
          if (mine) {
            picked = {
              user_id: Number(mine.user_id),
              earned_points: Number(mine.earned_points || 0),
              spent_points: Number(mine.spent_points || 0),
              balance:
                typeof mine.balance === "number"
                  ? mine.balance
                  : Number(mine.earned_points || 0) -
                    Number(mine.spent_points || 0),
            };
          }
        } else if (bJson && typeof bJson === "object") {
          picked = {
            user_id: Number(bJson.user_id ?? uid ?? 0),
            earned_points: Number(bJson.earned_points || 0),
            spent_points: Number(bJson.spent_points || 0),
            balance:
              typeof bJson.balance === "number"
                ? bJson.balance
                : Number(bJson.earned_points || 0) -
                  Number(bJson.spent_points || 0),
          };
        }

        const list: Reward[] = Array.isArray(rJson)
          ? rJson
          : Array.isArray(rJson?.results)
          ? rJson.results
          : [];

        setBalance(picked);
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
        body: JSON.stringify({ reward_id: reward.id }), // backend expects reward_id
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(json?.error || "Redeem failed");
        return;
      }

      // accept current backend flat format or future totals
      const totals =
        json?.totals ??
        (json?.balance_after !== undefined
          ? {
              earned_points: Number(json.earned_points || 0),
              spent_points: Number(json.spent_points || 0),
              balance: Number(json.balance_after || 0),
            }
          : null);

      if (totals) {
        setBalance({
          user_id: balance.user_id,
          earned_points: totals.earned_points,
          spent_points: totals.spent_points,
          balance: totals.balance,
        });
      } else {
        // fallback: refetch balance
        const bRes = await fetch("/api/child/rewards/balance", {
          headers: buildAuthHeaders(),
          cache: "no-store",
        });
        const bJson = await bRes.json();
        const uid = getUserIdFromToken();
        const mine = Array.isArray(bJson)
          ? bJson.find((x: any) => String(x.user_id) === String(uid)) ?? bJson[0]
          : bJson;
        if (mine) {
          setBalance({
            user_id: Number(mine.user_id ?? uid ?? 0),
            earned_points: Number(mine.earned_points || 0),
            spent_points: Number(mine.spent_points || 0),
            balance:
              typeof mine.balance === "number"
                ? mine.balance
                : Number(mine.earned_points || 0) -
                  Number(mine.spent_points || 0),
          });
        }
      }

      // UX: mark this reward as redeemed once (disable button / label)
      setRedeemedIds((prev) => new Set([...prev, reward.id]));

      // optional: flip item inactive in the table immediately
      setRewards((prev) =>
        prev.map((it) =>
          it.id === reward.id ? { ...it, is_active: false } : it
        )
      );

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
    if (redeemedIds.has(r.id)) return false; // one-time redeem UX
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
                  const already = redeemedIds.has(r.id);
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
                          disabled={!ok || redeeming === r.id || already}
                          className={`px-3 py-1 rounded text-white ${
                            ok && !already
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-gray-400"
                          } disabled:opacity-60`}
                        >
                          {redeeming === r.id
                            ? "Processing…"
                            : already
                            ? "Redeemed"
                            : "Redeem"}
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
