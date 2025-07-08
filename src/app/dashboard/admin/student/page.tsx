"use client";

import { ColDef } from "ag-grid-community";
import Basetable from "@/src/app/components/tables/basetable";// adjust if your BaseTable path is different
import { useRef } from "react";

export default function StudentsPage() {
  const tableRef = useRef<any>(null);

  // Define columns for the table
  const columns: ColDef[] = [
    { headerName: "ID", field: "id", width: 80 },
    { headerName: "Name", field: "name" },
    { headerName: "Age", field: "age" },
    { headerName: "Grade", field: "grade" },
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

  // Dummy data to show in the table
  const dummyData = [
    { id: 1, name: "Ram", age: 12, grade: "6th" },
    { id: 2, name: "Jiya", age: 11, grade: "5th" },
  ];

  // Handlers for edit and delete
  const handleEdit = (student: any) => {
    const name = prompt("Update name:", student.name);
    const age = prompt("Update age:", student.age.toString());
    const grade = prompt("Update grade:", student.grade);
    if (name && age && grade) {
      alert(`Updated to: ${name}, ${age}, ${grade}`);
      // You can implement actual update logic here
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this student?")) {
      alert(`Deleted student with id ${id}`);
      // You can implement actual delete logic here
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">All Students</h2>
        <button
          onClick={() => {
            const name = prompt("Enter student name:");
            const age = prompt("Enter age:");
            const grade = prompt("Enter grade:");
            if (name && age && grade) {
              alert(`Added: ${name}, ${age}, ${grade}`);
              // You can implement actual add logic here
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Student
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
