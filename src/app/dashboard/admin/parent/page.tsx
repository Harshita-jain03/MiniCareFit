"use client";

import { ColDef } from "ag-grid-community";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Basetable from "@/src/app/components/tables/basetable"; // Adjust path if needed

export default function ParentsPage() {
  const tableRef = useRef<any>(null);
  const router = useRouter();

  // Dummy parent data (replace with fetched data later)
  const dummyData = [
    { id: 1, name: "Ram", child_name: "Rohan" },
    { id: 2, name: "Jiya", child_name: "Riya" },
  ];

  // Edit parent
  const handleEdit = (parent: any) => {
    const name = prompt("Update name:", parent.name);
    const child_name = prompt("Update child name:", parent.child_name);

    if (name && child_name) {
      alert(`Updated to: ${name}, ${child_name}`);
      // TODO: Add API update logic here
    }
  };

  // ❌ FIXED: This was wrongly nested before
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this parent?")) {
      alert(`Deleted parent with ID: ${id}`);
      // TODO: Add API delete logic here
    }
  };

  const columns: ColDef[] = [
    { headerName: "ID", field: "id", width: 80 },
    { headerName: "Name", field: "name" },
    { headerName: "Child Name", field: "child_name" },
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
          📚 All Parents and their Children
        </h2>
        <button
          onClick={() => router.push("/dashboard/admin/parent/register")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Register parent
        </button>
      </div>

      <Basetable
        ref={tableRef}
        columns={columns}
        gridOptions={{ rowData: dummyData }}
      />
    </div>
  );
}
