"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type UserLite = { id: number; name?: string };
interface Mapping {
  id: number;
  parent: UserLite | number; // supports either nested object or just ID
  child: UserLite | number;
  created_at?: string;
}

export default function ParentChildListPage() {
  const router = useRouter();
  const [mappings, setMappings] = useState<Mapping[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || " " : "";

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/parent-child", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch mappings");
        const data = await res.json();
        setMappings(Array.isArray(data) ? data : data?.results || []);
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to load mapped records");
      } finally {
        setLoading(false);
      }
    };
    if (token) load();
  }, [token]);

  const rows = useMemo(
    () =>
      mappings.map((m) => {
        const parentId = typeof m.parent === "number" ? m.parent : m.parent?.id;
        const parentName =
          typeof m.parent === "number" ? `Parent #${m.parent}` : m.parent?.name || `Parent #${parentId}`;

        const childId = typeof m.child === "number" ? m.child : m.child?.id;
        const childName =
          typeof m.child === "number" ? `Child #${m.child}` : m.child?.name || `Child #${childId}`;

        return {
          id: m.id,
          parentId,
          parentName,
          childId,
          childName,
          created: m.created_at ? new Date(m.created_at).toLocaleString() : "-",
        };
      }),
    [mappings]
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 bg-white rounded shadow">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Parent–Child Mappings</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
          onClick={() => router.push("/dashboard/admin/student-parent-mapping/parent_child")}
        >
          + Map Parent to Child
        </button>
      </div>

      {loading ? (
        <p className="text-black">Loading…</p>
      ) : rows.length === 0 ? (
        <div className="text-black">
          <p>No mappings found.</p>
          <button
            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
            onClick={() => router.push("/admin/parent-child/map")}
          >
            Create first mapping
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-4 py-2 border text-black">#</th>
                <th className="text-left px-4 py-2 border text-black">Parent</th>
                <th className="text-left px-4 py-2 border text-black">Child</th>
                <th className="text-left px-4 py-2 border text-black">Created</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-black">{r.id}</td>
                  <td className="px-4 py-2 border text-black">
                    {r.parentName} (ID: {r.parentId})
                  </td>
                  <td className="px-4 py-2 border text-black">
                    {r.childName} (ID: {r.childId})
                  </td>
                  <td className="px-4 py-2 border text-black">{r.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {message && <p className="text-sm text-black">{message}</p>}
    </div>
  );
}
