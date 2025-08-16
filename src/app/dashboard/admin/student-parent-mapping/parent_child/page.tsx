"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  role: string;
}

export default function ParentChildMappingPage() {
  const [parents, setParents] = useState<User[]>([]);
  const [children, setChildren] = useState<User[]>([]);
  const [selectedParent, setSelectedParent] = useState<number | null>(null);
  const [selectedChild, setSelectedChild] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  // 🧠 Step 1: Get token from localStorage or fallback for testing
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token") || " "
      : "";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("Using token:", token); // Debug token

        const res = await fetch("/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        console.log("Fetched users from API:", data);

        const parentUsers = data.filter((user: User) => user.role?.toLowerCase() === "parent");
        const childUsers = data.filter((user: User) => user.role?.toLowerCase() === "child");

        setParents(parentUsers);
        setChildren(childUsers);
      } catch (err) {
        console.error("❌ Error fetching users:", err);
        setMessage("❌ Failed to load users");
      }
    };

    if (token) {
      fetchUsers();
    } else {
      console.warn("⚠️ No token found");
    }
  }, [token]);

  const handleMap = async () => {
    if (!selectedParent || !selectedChild) {
      setMessage("⚠️ Please select both a parent and a child.");
      return;
    }

    try {
      const res = await fetch("/api/admin/parent-child", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ parent: selectedParent, child: selectedChild }),
      });

      if (res.ok) {
        setMessage("✅ Parent and child successfully mapped!");
        setSelectedParent(null);
        setSelectedChild(null);
      } else {
        const error = await res.json();
        setMessage(`❌ Mapping failed: ${error?.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error during mapping:", err);
      setMessage("❌ Something went wrong while mapping.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-black">Parent-Child Mapping</h1>

      <div>
        <label className="block font-medium mb-1 text-black">Select Parent ID</label>
        <select
          className="w-full border rounded px-3 py-2 text-black"
          value={selectedParent ?? ""}
          onChange={(e) => setSelectedParent(Number(e.target.value))}
        >
          <option value="">-- Select Parent ID --</option>
          {parents.map((parent) => (
            <option key={parent.id} value={parent.id}>
              Parent #{parent.id}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1 text-black">Select Child ID</label>
        <select
          className="w-full border rounded px-3 py-2 text-black" 
          value={selectedChild ?? ""}
          onChange={(e) => setSelectedChild(Number(e.target.value))}
        >
          <option value="">-- Select Child ID --</option>
          {children.map((child) => (
            <option key={child.id} value={child.id}>
              Child #{child.id}
            </option>
          ))}
        </select>
      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
        onClick={handleMap}
      >
        Map Parent to Child
      </button>

      {message && <p className="text-sm mt-4 text-black">{message}</p>}
    </div>
  );
}



