// src/app/dashboard/child/to-do-list/page.tsx
import Link from "next/link";
import ToDoTable from "./to_do_table";

export default function ToDoMain() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-blue-600">✅ My Tasks</h2>
        <Link
          href="/dashboard/child/to-do-list/to_do_form"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          ➕ Create To-Do Task
        </Link>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <ToDoTable />
      </div>
    </div>
  );
}
