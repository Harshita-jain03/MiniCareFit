// "use client";
// import { useRouter } from "next/navigation";
// import FoodTable from "./food-table";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   CartesianGrid,
//   Legend,
// } from "recharts";
// import { useState } from "react";

// const barData = [ /* same as before */ ];
// const lineData = [ /* same as before */ ];

// export default function HealthPage() {
//   const router = useRouter();
//   const [showSummary, setShowSummary] = useState(false);

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <main className="flex-1 p-6 space-y-8">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-2xl font-bold text-blue-700">
//             {showSummary ? "📊 Weekly Health Summary" : "🩺 Health Dashboard"}
//           </h1>
//           <div className="space-x-3">
//             <button
//               onClick={() => setShowSummary(!showSummary)}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition"
//             >
//               {showSummary ? "⬅ Back to Dashboard" : "📈 View Summary"}
//             </button>
//             <button
//               onClick={() => router.push("/dashboard/parent/health/food-form")}
//               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition"
//             >
//               ➕ Add Food
//             </button>
//           </div>
//         </div>

//         {/* Main View */}
//         {!showSummary ? (
//           <>
//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <FoodTable/>
//             </div>
//           </>
//         ) : (
//           <div className="space-y-8">{/* Same Summary Section as Before */}</div>
//         )}
//       </main>
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import Basetable from "@/src/app/components/tables/basetable";
import type { ColDef } from "ag-grid-community";

const logColumns: ColDef[] = [
  { field: "created_at", headerName: "Date/Time" },
  { field: "meal_type", headerName: "Meal" },
  { field: "quantity", headerName: "Qty" },
  { field: "food_item.name", headerName: "Food" },
  { field: "food_item.calories", headerName: "Calories", filter: "agNumberColumnFilter" },
  { field: "food_item.protein", headerName: "Protein (g)", filter: "agNumberColumnFilter" },
  { field: "food_item.fat", headerName: "Fat (g)", filter: "agNumberColumnFilter" },
  { field: "food_item.carbohydrate", headerName: "Carbs (g)", filter: "agNumberColumnFilter" },
];

export default function ParentHealthPage() {
  const router = useRouter();

  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-black">
      {/* Header row with buttons */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-blue-600">🍽️ Child Food Logs</h2>
        <button
          onClick={() => router.push("/dashboard/parent/health/food-form")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
        >
          ➕ Add Food
        </button>
      </div>

      {/* Table */}
      <Basetable
        columns={logColumns}
        endpoint="/api/parent/health/child-food-logs"
        autoRefresh={true}
        searchFields={[{ key: "food_item.name", placeholder: "Search food..." }]}
      />
    </div>
  );
}
