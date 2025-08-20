"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ColDef } from "ag-grid-community";
import Basetable from "@/src/app/components/tables/basetable";

type Task = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  points: number;
  status: "PENDING" | "COMPLETED";
  assigned_to: number;
  assigned_by: number;
};

export default function ToDoMainPage() {
  const router = useRouter();
  const tableRef = useRef<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("access_token");

      try {
        const res = await fetch("/api/admin/to_do_list", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch tasks");

        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("❌ Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const columns: ColDef[] = [
    { headerName: "ID", field: "id", width: 80 },
    { headerName: "Title", field: "title" },
    { headerName: "Description", field: "description" },
    {
      headerName: "Deadline",
      field: "deadline",
      valueFormatter: (params) =>
        new Date(params.value).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
    },
    { headerName: "Points", field: "points" },
    {
      headerName: "Status",
      field: "status",
      cellRenderer: (params: any) => (
        <span
          className={`px-2 py-1 rounded text-white text-sm ${
            params.value === "COMPLETED" ? "bg-green-600" : "bg-yellow-600"
          }`}
        >
          {params.value}
        </span>
      ),
    },
    { headerName: "Assigned to child", field: "assigned_to_name" },
    { headerName: "Assigned To", field: "assigned_to" },
    { headerName: "Assigned By", field: "assigned_by" },
    { headerName: "Assigned By parent or Teacher", field: "assigned_by_name" },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-700">📋 All Tasks</h2>
        <button
          onClick={() => router.push("/dashboard/admin/to-do-list/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Create Task
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : (
        <Basetable
          ref={tableRef}
          columns={columns}
          gridOptions={{
            rowData: tasks,
            pagination: true,
            domLayout: "autoHeight",
          }}
        />
      )}
    </div>
  );
}
