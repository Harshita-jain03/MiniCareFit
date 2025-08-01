"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ColDef } from "ag-grid-community";
import Basetable from "@/src/app/components/tables/basetable";

interface Parent {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function ParentsPage() {
  const tableRef = useRef<any>(null);
  const router = useRouter();
  const [parents, setParents] = useState<Parent[]>([]);
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const res = await fetch("/api/admin/parent/register", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch parents");

        const data = await res.json();
        const parentsOnly = data.filter((user: Parent) => user.role === "parent");
        setParents(parentsOnly);
      } catch (err) {
        console.error("❌ Failed to fetch parents:", err);
      }
    };

    fetchParents();
  }, []);

  const handleEdit = (parent: Parent) => {
    router.push(`/dashboard/admin/parent/${parent.id}`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this parent?")) {
      setMsg(`🗑️ Deleted parent with ID: ${id}`);
      // TODO: API call to delete parent
    }
  };

  const columns: ColDef[] = [
    { headerName: "ID", field: "id", width: 80 },
    { headerName: "Name", field: "username" },
    { headerName: "Email", field: "email" },
    { headerName: "Role", field: "role" },
    {
      headerName: "Actions",
      field: "id",
      cellRenderer: (params: any) => (
        <div className="space-x-2">
          <button
            onClick={() => handleEdit(params.data)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(params.data.id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-700">
          👨‍👩‍👧 All Parents
        </h2>
        <button
          onClick={() => router.push("/dashboard/admin/parent/register")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Register Parent
        </button>
      </div>

      {msg && (
        <div className="mb-4 text-green-700 font-medium bg-green-100 px-4 py-2 rounded-lg shadow">
          {msg}
        </div>
      )}

      <Basetable ref={tableRef} columns={columns} gridOptions={{ rowData: parents }} />
    </div>
  );
}
