"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TodoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(""); // yyyy-MM-ddTHH:mm (from <input type="datetime-local" />)
  const [points, setPoints] = useState<string>("");
  // ✅ match Django enums exactly
  const [status, setStatus] = useState<"PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED">("PENDING");

  async function addTask(e: React.FormEvent) {
    e.preventDefault();

    const t = title.trim();
    if (!t) return;

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", t);
      if (description.trim()) fd.append("description", description.trim());
      if (deadline) fd.append("deadline", deadline);      // API route will convert to ISO
      if (points.trim()) fd.append("points", points.trim());
      if (status) fd.append("status", status);            // ✅ valid enum sent

      // Auth: use cookie if present; also support localStorage -> header + ?bearer=
      const lsToken =
        (typeof window !== "undefined" &&
          (localStorage.getItem("token") || localStorage.getItem("accessToken"))) || "";

      const url = lsToken
        ? `/api/child/to_do_task?bearer=${encodeURIComponent(lsToken)}`
        : `/api/child/to_do_task`;

      const res = await fetch(url, {
        method: "POST",
        body: fd,
        headers: lsToken ? { Authorization: `Bearer ${lsToken}` } : {},
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(json?.error ? `Failed: ${json.error}` : "Failed to create task");
        return;
      }

      alert("✅ Task created");
      router.push("/dashboard/child/to-do-list");
    } catch (err) {
      console.error(err);
      alert("Request failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 min-h-[400px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">📝 Create To-Do Task</h2>
        </div>

        <form onSubmit={addTask} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-2 rounded-md text-gray-800"
              placeholder="e.g. Finish homework"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full border border-gray-300 px-4 py-2 rounded-md text-gray-800"
              rows={3}
              placeholder="Optional details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
              <input
                type="datetime-local"
                className="w-full border border-gray-300 px-4 py-2 rounded-md text-gray-800"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
              <input
                type="number"
                min={0}
                className="w-full border border-gray-300 px-4 py-2 rounded-md text-gray-800"
                placeholder="e.g. 10"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full border border-gray-300 px-4 py-2 rounded-md text-gray-800"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED")
                }
              >
                <option value="PENDING">PENDING</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-md font-semibold disabled:opacity-60"
            >
              {saving ? "Saving…" : "➕ Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
