"use client";

import Basetable from "@/src/app/components/tables/basetable";
import type { ColDef } from "ag-grid-community";

const foodTableColumns: ColDef[] = [
  { field: "food_item", headerName: "Food" }, // ✅ corrected
  { field: "date", headerName: "Date" },
  { field: "time", headerName: "Time" },
  { field: "quantity", headerName: "Quantity" },
  { field: "meal_type", headerName: "Meal Type" }, // ✅ ensure matches backend
  { field: "fat", headerName: "Fat (g)", filter: "agNumberColumnFilter" },
  { field: "protein", headerName: "Protein (g)", filter: "agNumberColumnFilter" },
  { field: "carbs", headerName: "Carbs (g)", filter: "agNumberColumnFilter" },
  { field: "calories", headerName: "Calories", filter: "agNumberColumnFilter" },
];

export default function FoodTableWrapper() {
  const childId = "9"; // ✅ Replace with dynamic child ID if needed

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-blue-600 mb-4">
        📋 Food Items Added
      </h2>
      <Basetable
        columns={foodTableColumns}
        endpoint={`/api/child/food-logs?id=${childId}`} // ✅ correct route
        autoRefresh={false}
        searchFields={[{ key: "food_item", placeholder: "Search food..." }]} // ✅ updated
        dropdownFilters={[
          {
            key: "meal_type", // ✅ updated
            label: "Meal Type",
            options: [
              { label: "All", value: "" },
              { label: "Breakfast", value: "Breakfast" },
              { label: "Lunch", value: "Lunch" },
              { label: "Dinner", value: "Dinner" },
              { label: "Snack", value: "Snack" },
            ],
          },
        ]}
      />
    </div>
  );
}
