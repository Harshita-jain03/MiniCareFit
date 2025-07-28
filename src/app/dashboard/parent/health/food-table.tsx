"use client";

import Basetable from "@/src/app/components/tables/basetable";
import basetable from "@/src/app/components/tables/basetable"; // adjust this path to match your actual file structure
import type { ColDef } from "ag-grid-community";

const foodTableColumns: ColDef[] = [
  { field: "food", headerName: "Food" },
  { field: "date", headerName: "Date" },
  { field: "time", headerName: "Time" },
  { field: "quantity", headerName: "Quantity" },
  { field: "mealType", headerName: "Meal Type" },
  { field: "fat", headerName: "Fat (g)", filter: "agNumberColumnFilter" },
  { field: "protein", headerName: "Protein (g)", filter: "agNumberColumnFilter" },
  { field: "carbs", headerName: "Carbs (g)", filter: "agNumberColumnFilter" },
  { field: "calories", headerName: "Calories", filter: "agNumberColumnFilter" },
];

export default function FoodTableWrapper() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-blue-600 mb-4">
        📋 Food Items Added
      </h2>
      <Basetable
        columns={foodTableColumns}
        endpoint="/api/food-items/"
        autoRefresh={false}
        searchFields={[{ key: "food", placeholder: "Search food..." }]}
        dropdownFilters={[
          {
            key: "mealType",
            label: "Meal Type",
            options: [
              { label: "All", value: "" },
              { label: "Breakfast", value: "Breakfast" },
              { label: "Lunch", value: "Lunch" },
              { label: "Dinner", value: "Dinner" },
            ],
          },
        ]}
      />
    </div>
  );
}
