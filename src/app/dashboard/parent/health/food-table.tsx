// // "use client";

// // import Basetable from "@/src/app/components/tables/basetable";
// // import basetable from "@/src/app/components/tables/basetable"; // adjust this path to match your actual file structure
// // import type { ColDef } from "ag-grid-community";

// // const foodTableColumns: ColDef[] = [
// //   { field: "food", headerName: "Food" },
// //   { field: "date", headerName: "Date" },
// //   { field: "time", headerName: "Time" },
// //   { field: "quantity", headerName: "Quantity" },
// //   { field: "mealType", headerName: "Meal Type" },
// //   { field: "fat", headerName: "Fat (g)", filter: "agNumberColumnFilter" },
// //   { field: "protein", headerName: "Protein (g)", filter: "agNumberColumnFilter" },
// //   { field: "carbs", headerName: "Carbs (g)", filter: "agNumberColumnFilter" },
// //   { field: "calories", headerName: "Calories", filter: "agNumberColumnFilter" },
// // ];

// // export default function FoodTableWrapper() {
// //   return (
// //     <div className="bg-white p-6 rounded-xl shadow-md">
// //       <h2 className="text-lg font-semibold text-blue-600 mb-4">
// //         📋 Food Items Added
// //       </h2>
// //       <Basetable
// //         columns={foodTableColumns}
// //         endpoint="/api/food-items/"
// //         autoRefresh={false}
// //         searchFields={[{ key: "food", placeholder: "Search food..." }]}
// //         dropdownFilters={[
// //           {
// //             key: "mealType",
// //             label: "Meal Type",
// //             options: [
// //               { label: "All", value: "" },
// //               { label: "Breakfast", value: "Breakfast" },
// //               { label: "Lunch", value: "Lunch" },
// //               { label: "Dinner", value: "Dinner" },
// //             ],
// //           },
// //         ]}
// //       />
// //     </div>
// //   );
// // }


// "use client";

// import Basetable from "@/src/app/components/tables/basetable";
// import type { ColDef } from "ag-grid-community";

// const foodTableColumns: ColDef[] = [
//   { field: "food", headerName: "Food" },
//   { field: "date", headerName: "Date" },
//   { field: "time", headerName: "Time" },
//   { field: "quantity", headerName: "Quantity" },
//   { field: "mealType", headerName: "Meal Type" },
//   // { field: "fat", headerName: "Fat (g)", filter: "agNumberColumnFilter" },
//   // { field: "protein", headerName: "Protein (g)", filter: "agNumberColumnFilter" },
//   // { field: "carbs", headerName: "Carbs (g)", filter: "agNumberColumnFilter" },
//   // { field: "calories", headerName: "Calories", filter: "agNumberColumnFilter" },
// ];

// export default function ParentHealthPage() {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md text-black">
//       <h2 className="text-lg font-semibold text-blue-600 mb-4 text-black">
//         📋 Food Items Added (Your Children)
//       </h2>
//       <Basetable
//         columns={foodTableColumns}
//         endpoint="/api/parent/health" // 👈 uses our new filtered route
//         autoRefresh={false}
//         searchFields={[{ key: "food", placeholder: "Search food..." }]}
//         dropdownFilters={[
//           {
//             key: "mealType",
//             label: "Meal Type",
//             options: [
//               { label: "All", value: "" },
//               { label: "Breakfast", value: "BREAKFAST" },
//               { label: "Lunch", value: "LUNCH" },
//               { label: "Dinner", value: "DINNER" },
//             ],
//           },
//         ]}
//       />
//     </div>
//   );
// }


"use client";

import Basetable from "@/src/app/components/tables/basetable";
import type { ColDef } from "ag-grid-community";

const foodItemColumns: ColDef[] = [
  { field: "name", headerName: "Food" },
  { field: "calories", headerName: "Calories", filter: "agNumberColumnFilter" },
  { field: "protein", headerName: "Protein (g)", filter: "agNumberColumnFilter" },
  { field: "fat", headerName: "Fat (g)", filter: "agNumberColumnFilter" },
  { field: "carbohydrate", headerName: "Carbs (g)", filter: "agNumberColumnFilter" },
];

export default function ParentHealthPage() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-black">
      <h2 className="text-lg font-semibold text-blue-600 mb-4">
        📋 Food Items Catalog
      </h2>

      <Basetable
        columns={foodItemColumns}
        endpoint="/api/parent/health"   // 👈 uses proxy above
        autoRefresh={false}
        searchFields={[{ key: "name", placeholder: "Search food..." }]}
      />
    </div>
  );
}
