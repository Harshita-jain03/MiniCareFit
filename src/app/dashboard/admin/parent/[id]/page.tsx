"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditParentPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    const fetchParent = async () => {
      try {
        const res = await fetch(`http://localhost:8000/users/users/${id}/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setFormData({ username: data.username, email: data.email });
      } catch (err) {
        console.error("Failed to fetch parent:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchParent();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    try {
      const res = await fetch(`http://localhost:8000/users/users/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          username: formData.username,
          email: formData.email,
        }),
      });

      if (res.ok) {
        alert("✅ Parent updated successfully");
        router.push("/dashboard/admin/parent");
      } else {
        const err = await res.json();
        alert("❌ Failed: " + (err?.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Error during PATCH:", err);
    }
  };

  if (loading) return <p>Loading parent...</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-black">✏️ Edit Parent</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1 text-black">Username:</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="w-full p-2 border rounded text-black"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-black">Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-2 border rounded text-black"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          💾 Save Changes
        </button>
      </form>
    </div>
  );
}
