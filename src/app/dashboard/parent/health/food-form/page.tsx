// // // // // "use client";
// // // // // import { useState } from "react";

// // // // // type FoodEntry = {
// // // // //   food: string;
// // // // //   mealType: string;
// // // // //   quantity: string;
// // // // // };

// // // // // export default function FoodForm({
// // // // //   onAddFood,
// // // // // }: {
// // // // //   onAddFood: (item: FoodEntry) => void;
// // // // // }) {
// // // // //   const [entry, setEntry] = useState<FoodEntry>({
// // // // //     food: "",
// // // // //     mealType: "",
// // // // //     quantity: "",
// // // // //   });

// // // // //   const handleSubmit = (e: React.FormEvent) => {
// // // // //     e.preventDefault();
// // // // //     if (!entry.food || !entry.mealType || !entry.quantity) return;
// // // // //     onAddFood(entry); // ✅ Pass up to HealthPage
// // // // //     setEntry({ food: "", mealType: "", quantity: "" }); // Clear form
// // // // //   };

// // // // //   return (
// // // // //     <form onSubmit={handleSubmit} className="space-y-3">
// // // // //       <input
// // // // //         type="text"
// // // // //         placeholder="Food Item"
// // // // //         className="w-full border px-3 py-2 rounded text-gray-700"
// // // // //         value={entry.food}
// // // // //         onChange={(e) => setEntry({ ...entry, food: e.target.value })}
// // // // //         required
// // // // //       />
// // // // //       <select
// // // // //         className="w-full border px-3 py-2 rounded text-gray-700"
// // // // //         value={entry.mealType}
// // // // //         onChange={(e) => setEntry({ ...entry, mealType: e.target.value })}
// // // // //         required
// // // // //       >
// // // // //         <option value="">Select Meal Type</option>
// // // // //         <option value="Breakfast">🍳 Breakfast</option>
// // // // //         <option value="Lunch">🍛 Lunch</option>
// // // // //         <option value="Dinner">🍽️ Dinner</option>
// // // // //         <option value="Snack">🍿 Snack</option>
// // // // //       </select>
// // // // //       <input
// // // // //         type="text"
// // // // //         placeholder="Quantity (e.g. 1 bowl)"
// // // // //         className="w-full border px-3 py-2 rounded text-gray-700"
// // // // //         value={entry.quantity}
// // // // //         onChange={(e) => setEntry({ ...entry, quantity: e.target.value })}
// // // // //         required
// // // // //       />
// // // // //       <button
// // // // //         type="submit"
// // // // //         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
// // // // //       >
// // // // //         ➕ Add Food Item
// // // // //       </button>
// // // // //     </form>
// // // // //   );
// // // // // }

// // // // "use client";

// // // // import { useState } from "react";
// // // // import { useRouter } from "next/navigation";

// // // // export default function FoodFormPage() {
// // // //   const router = useRouter();
// // // //   const [foodItem, setFoodItem] = useState("");
// // // //   const [mealType, setMealType] = useState("Breakfast");
// // // //   const [quantity, setQuantity] = useState(1);
// // // //   const [error, setError] = useState("");

// // // //   // 🔹 TEMP: Replace with actual child id from parent dashboard context or API
// // // //   const childId = 15; // <-- set dynamically later

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     setError("");

// // // //     try {
// // // //       const res = await fetch("/api/parent/health/child-food-logs", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({
// // // //           child: childId,          // ✅ send child id
// // // //           food_item: foodItem,     // backend must accept ID or name
// // // //           meal_type: mealType,
// // // //           quantity: Number(quantity),
// // // //         }),
// // // //       });

// // // //       if (!res.ok) {
// // // //         const msg = await res.json().catch(() => ({}));
// // // //         throw new Error(msg.detail || "Failed to create food log");
// // // //       }

// // // //       router.push("/dashboard/parent/health");
// // // //     } catch (err: any) {
// // // //       setError(err.message);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto text-black">
// // // //       <h2 className="text-lg font-semibold mb-4 text-blue-600">Add Food Log</h2>

// // // //       {error && <p className="text-red-600 mb-2">{error}</p>}

// // // //       <form onSubmit={handleSubmit} className="space-y-4">
// // // //         <input
// // // //           type="text"
// // // //           placeholder="Food name or ID"
// // // //           value={foodItem}
// // // //           onChange={(e) => setFoodItem(e.target.value)}
// // // //           className="w-full border px-3 py-2 rounded-md"
// // // //           required
// // // //         />

// // // //         <select
// // // //           value={mealType}
// // // //           onChange={(e) => setMealType(e.target.value)}
// // // //           className="w-full border px-3 py-2 rounded-md"
// // // //         >
// // // //           <option>Breakfast</option>
// // // //           <option>Lunch</option>
// // // //           <option>Dinner</option>
// // // //           <option>Snack</option>
// // // //         </select>

// // // //         <input
// // // //           type="number"
// // // //           placeholder="Quantity"
// // // //           value={quantity}
// // // //           onChange={(e) => setQuantity(e.target.valueAsNumber)}
// // // //           className="w-full border px-3 py-2 rounded-md"
// // // //           min="1"
// // // //           required
// // // //         />

// // // //         <button
// // // //           type="submit"
// // // //           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium w-full"
// // // //         >
// // // //           ➕ Add Food Item
// // // //         </button>
// // // //       </form>
// // // //     </div>
// // // //   );
// // // // }


// // // "use client";

// // // import { useState } from "react";
// // // import { useRouter } from "next/navigation";

// // // export default function FoodFormPage() {
// // //   const router = useRouter();
// // //   const [food, setFood] = useState("");
// // //   const [mealType, setMealType] = useState("Breakfast");
// // //   const [quantity, setQuantity] = useState(1);
// // //   const [error, setError] = useState("");

// // //   // TODO: make dynamic (from parent selection or query)
// // //   const childId = 16; // <-- set this based on the mapped/selected child

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setError("");

// // //     try {
// // //       const res = await fetch("/api/parent/health/child-food-logs", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           child: childId,            // ✅ send child id explicitly
// // //           food: food.trim(),         // food NAME; API route finds/creates item
// // //           mealType,                  // will be uppercased in API route
// // //           quantity: Number(quantity)
// // //         }),
// // //       });

// // //       if (!res.ok) {
// // //         const j = await res.json().catch(() => ({}));
// // //         throw new Error(j?.error || "Failed to create food log");
// // //       }

// // //       router.push("/dashboard/parent/health");
// // //     } catch (err: any) {
// // //       setError(err.message);
// // //     }
// // //   };

// // //   return (
// // //     <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto text-black">
// // //       <h2 className="text-lg font-semibold mb-4 text-blue-600">Add Food Log</h2>
// // //       {error && <p className="text-red-600 mb-2">{error}</p>}

// // //       <form onSubmit={handleSubmit} className="space-y-4">
// // //         <input
// // //           type="text"
// // //           placeholder="Food name (e.g., Poha)"
// // //           value={food}
// // //           onChange={(e) => setFood(e.target.value)}
// // //           className="w-full border px-3 py-2 rounded-md"
// // //           required
// // //         />

// // //         <select
// // //           value={mealType}
// // //           onChange={(e) => setMealType(e.target.value)}
// // //           className="w-full border px-3 py-2 rounded-md"
// // //         >
// // //           <option>Breakfast</option>
// // //           <option>Lunch</option>
// // //           <option>Dinner</option>
// // //           <option>Snack</option>
// // //         </select>

// // //         <input
// // //           type="number"
// // //           min={0.1}
// // //           step={0.1}
// // //           placeholder="Quantity"
// // //           value={quantity}
// // //           onChange={(e) => setQuantity(e.target.valueAsNumber)}
// // //           className="w-full border px-3 py-2 rounded-md"
// // //           required
// // //         />

// // //         <button
// // //           type="submit"
// // //           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium w-full"
// // //         >
// // //           ➕ Add Food Item
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }


// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";

// // export default function FoodFormPage() {
// //   const router = useRouter();
// //   const [food, setFood] = useState("");
// //   const [mealType, setMealType] = useState("Breakfast");
// //   const [quantity, setQuantity] = useState(1);
// //   const [error, setError] = useState("");

// //   // TODO: make this dynamic from selection/mapping
// //   const childId = 16; // <-- REQUIRED: send this

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError("");
// //     try {
// //       const res = await fetch("/api/parent/health/child-food-logs", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           child: childId,          // ✅ send child id
// //           food: food.trim(),       // name (e.g., "Milk")
// //           mealType,                // "Breakfast" | "Lunch" | ...
// //           quantity: Number(quantity),
// //         }),
// //       });

// //       if (!res.ok) {
// //         const j = await res.json().catch(() => ({}));
// //         throw new Error(j?.error || "Failed to create food log");
// //       }

// //       router.push("/dashboard/parent/health");
// //     } catch (err: any) {
// //       setError(err.message);
// //     }
// //   };

// //   return (
// //     <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto text-black">
// //       <h2 className="text-lg font-semibold mb-4 text-blue-600">Add Food Log</h2>
// //       {error && <p className="text-red-600 mb-2">{error}</p>}

// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <input
// //           type="text"
// //           placeholder="Food name (e.g., Poha)"
// //           value={food}
// //           onChange={(e) => setFood(e.target.value)}
// //           className="w-full border px-3 py-2 rounded-md"
// //           required
// //         />
// //         <select
// //           value={mealType}
// //           onChange={(e) => setMealType(e.target.value)}
// //           className="w-full border px-3 py-2 rounded-md"
// //         >
// //           <option>Breakfast</option>
// //           <option>Lunch</option>
// //           <option>Dinner</option>
// //           <option>Snack</option>
// //         </select>
// //         <input
// //           type="number"
// //           min={0.1}
// //           step={0.1}
// //           placeholder="Quantity"
// //           value={quantity}
// //           onChange={(e) => setQuantity(e.target.valueAsNumber)}
// //           className="w-full border px-3 py-2 rounded-md"
// //           required
// //         />
// //         <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium w-full">
// //           ➕ Add Food Item
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function FoodFormPage() {
//   const router = useRouter();
//   const [food, setFood] = useState("");
//   const [mealType, setMealType] = useState("Breakfast");
//   const [quantity, setQuantity] = useState(1);
//   const [childId, setChildId] = useState<number | null>(null);
//   const [error, setError] = useState("");

//   // fetch mapped child on mount
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch("/api/parent/child", { cache: "no-store" });
//         const j = await res.json();
//         if (res.ok && j?.child?.id) setChildId(Number(j.child.id));
//         else setError(j?.error || j?.message || "No mapped child found");
//       } catch {
//         setError("Failed to load child mapping");
//       }
//     })();
//   }, []);

//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (!childId) {
//       setError("No mapped child available.");
//       return;
//     }

//     try {
//       const res = await fetch("/api/parent/health/child-food-logs", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           child: childId,       // ✅ use mapped child
//           food: food.trim(),    // name; server will find/create the item
//           mealType,             // server uppercases it
//           quantity: Number(quantity),
//         }),
//       });

//       if (!res.ok) {
//         const j = await res.json().catch(() => ({}));
//         throw new Error(j?.error || "Failed to create food log");
//       }

//       router.push("/dashboard/parent/health");
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto text-black">
//       <h2 className="text-lg font-semibold mb-4 text-blue-600">Add Food Log</h2>
//       {error && <p className="text-red-600 mb-2">{error}</p>}
//       {!childId ? (
//         <div className="text-gray-600 text-sm">Loading child mapping…</div>
//       ) : (
//         <form onSubmit={submit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Food name (e.g., Poha)"
//             value={food}
//             onChange={(e) => setFood(e.target.value)}
//             className="w-full border px-3 py-2 rounded-md"
//             required
//           />
//           <select
//             value={mealType}
//             onChange={(e) => setMealType(e.target.value)}
//             className="w-full border px-3 py-2 rounded-md"
//           >
//             <option>Breakfast</option>
//             <option>Lunch</option>
//             <option>Dinner</option>
//             <option>Snack</option>
//           </select>
//           <input
//             type="number"
//             min={0.1}
//             step={0.1}
//             placeholder="Quantity"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.valueAsNumber)}
//             className="w-full border px-3 py-2 rounded-md"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium w-full"
//           >
//             ➕ Add Food Item
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type FoodItem = { id: number; name: string; calories: number; protein: number; fat: number; carbohydrate: number };

export default function FoodFormPage() {
  const router = useRouter();
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [foodItemId, setFoodItemId] = useState<number | "">("");
  const [mealType, setMealType] = useState("Breakfast");
  const [quantity, setQuantity] = useState(1);
  const [childId, setChildId] = useState<number | null>(null);
  const [error, setError] = useState("");

  // Load mapped child & food items
  useEffect(() => {
    (async () => {
      try {
        const [childRes, itemsRes] = await Promise.all([
          fetch("/api/parent/child", { cache: "no-store" }),
          fetch("/api/parent/health/food-items", { cache: "no-store" }),
        ]);
        const childJ = await childRes.json();
        const itemsJ = await itemsRes.json();
        if (childRes.ok && childJ?.child?.id) setChildId(Number(childJ.child.id));
        else setError(childJ?.error || childJ?.message || "No mapped child found");

        const items: FoodItem[] = Array.isArray(itemsJ?.results) ? itemsJ.results : [];
        setFoodItems(items);
      } catch {
        setError("Failed to load data");
      }
    })();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!childId) return setError("No mapped child available.");
    if (!foodItemId || typeof foodItemId !== "number") return setError("Please select a food item.");

    try {
      const res = await fetch("/api/parent/health/child-food-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          child: childId,
          foodItemId,                // 🔸 send the item ID
          mealType,                  // server will uppercase
          quantity: Number(quantity)
        }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Failed to create food log");
      }

      router.push("/dashboard/parent/health");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto text-black">
      <h2 className="text-lg font-semibold mb-4 text-blue-600">Add Food Log</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}

      {!childId ? (
        <div className="text-gray-600 text-sm">Loading…</div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          {/* Food dropdown */}
          <select
            value={foodItemId === "" ? "" : String(foodItemId)}
            onChange={(e) => setFoodItemId(e.target.value ? Number(e.target.value) : "")}
            className="w-full border px-3 py-2 rounded-md"
            required
          >
            <option value="">Food item (from catalog)</option>
            {foodItems.map((fi) => (
              <option key={fi.id} value={fi.id}>
                {fi.name} {/* you can also show macros here if you want */}
              </option>
            ))}
          </select>

          {/* Meal type */}
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>

          {/* Quantity */}
          <input
            type="number"
            min={0.1}
            step={0.1}
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.valueAsNumber)}
            className="w-full border px-3 py-2 rounded-md"
            required
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium w-full"
          >
            ➕ Add Food Item
          </button>
        </form>
      )}
    </div>
  );
}
