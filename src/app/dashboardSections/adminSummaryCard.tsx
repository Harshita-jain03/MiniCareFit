import { ColDef } from "ag-grid-community";
import BaseTable from "../components/tables/basetable";

export default function SummaryCard() {
  const columns: ColDef[] = [
    {
      headerName: "Profile Pic",
      field: "avatar",
     
    },
    { headerName: "Name", field: "name" },
    { headerName: "Tasks", field: "tasks" },
    { headerName: "Points", field: "points", sortable: true },
    { headerName: "Rank", field: "rank", sortable: true },
  ];

  const dummyData = [
    {
      id: 1,
      name: "Ram",
      tasks: 4,
      points: 1000,
      rank: 1,
      
    },
    {
      id: 2,
      name: "Jiya",
      tasks: 3,
      points: 900,
      rank: 2,
      
    },
  ];

  return (
    <div className="bg-grey shadow-xl rounded-2xl p-6 w-full max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">SUMMARY</h2>
        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:scale-105 transition-all">
          🔗 Share
        </button>
      </div>

      {/* 🚀 Use static data for now */}
      <BaseTable
        columns={columns}
        gridOptions={{ rowData: dummyData }}
      />
    </div>
  );
}
