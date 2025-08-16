"use client";

import { useEffect, useState } from "react";

type Status = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

type Task = {
  id: number;
  title: string;
  description?: string;
  deadline?: string | null;
  points?: number;
  status: Status;
  assigned_to: number | { id: number };
  assigned_by: number | { id: number };
  created_at?: string;
};

export default function ToDoTable() {
  const [rows, setRows] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/child/to_do_task", { cache: "no-store" });
        const data = await res.json();
        setRows(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Failed to load tasks:", e);
        setRows([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function updateStatus(id: number, next: Status) {
    setSavingId(id);
    try {
      const lsToken =
        (typeof window !== "undefined" &&
          (localStorage.getItem("token") || localStorage.getItem("accessToken"))) || "";

      const url = lsToken
        ? `/api/child/to_do_task/${id}?bearer=${encodeURIComponent(lsToken)}`
        : `/api/child/to_do_task/${id}`;

      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...(lsToken ? { Authorization: `Bearer ${lsToken}` } : {}) },
        body: JSON.stringify({ status: next }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(json?.error ? `Failed: ${json.error}` : "Failed to update");
        return;
      }

      setRows((prev) => prev.map((t) => (t.id === id ? { ...t, status: next } as Task : t)));
    } catch (e) {
      console.error(e);
      alert("Request failed");
    } finally {
      setSavingId(null);
    }
  }

  if (loading) return <div className="text-sm text-gray-500">Loading…</div>;
  if (!rows.length) return <div className="text-sm text-gray-500">No tasks found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 border text-left text-black">Title</th>
            <th className="px-3 py-2 border text-left text-black">Description</th>
            <th className="px-3 py-2 border text-left text-black">Deadline</th>
            <th className="px-3 py-2 border text-right text-black">Points</th>
            <th className="px-3 py-2 border text-left text-black">Status</th>
            <th className="px-3 py-2 border text-left text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const deadline =
              r.deadline ? new Date(r.deadline).toLocaleString() : "-";
            return (
              <tr key={r.id}>
                <td className="px-3 py-2 border text-black">{r.title}</td>
                <td className="px-3 py-2 border text-black">
                  {r.description || "-"}
                </td>
                <td className="px-3 py-2 border text-black">{deadline}</td>
                <td className="px-3 py-2 border text-right text-black">
                  {r.points ?? 0}
                </td>
                <td className="px-3 py-2 border text-black">
                  <select
                    className="border px-2 py-1 rounded text-black"
                    value={r.status}
                    disabled={savingId === r.id}
                    onChange={(e) =>
                      updateStatus(
                        r.id,
                        e.target.value as "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
                      )
                    }
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </td>
                <td className="px-3 py-2 border text-black">
                  {r.status !== "COMPLETED" && (
                    <button
                      disabled={savingId === r.id}
                      onClick={() => updateStatus(r.id, "COMPLETED")}
                      className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
                    >
                      Mark Completed
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
