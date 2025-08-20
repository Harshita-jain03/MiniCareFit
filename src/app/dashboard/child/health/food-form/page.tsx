// 'use client';

// import { useEffect, useState } from 'react';

// type FoodItem = { id: number; name: string };

// export default function FoodLogForm() {
//   const [saving, setSaving] = useState(false);
//   const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
//   const [loadingItems, setLoadingItems] = useState(true);

//   // Load food items for dropdown
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch('/api/child/health', { cache: 'no-store' });
//         const json = await res.json();
//         // backend may return {results: [...]} or just [...]
//         const list = Array.isArray(json) ? json : Array.isArray(json?.results) ? json.results : [];
//         setFoodItems(list as FoodItem[]);
//       } catch (e) {
//         console.error('Failed to load food items:', e);
//       } finally {
//         setLoadingItems(false);
//       }
//     })();
//   }, []);

//   async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       const fd = new FormData(e.currentTarget); // quantity, meal_type, child, food_item

//       const res = await fetch('/api/child/health', {
//         method: 'POST',
//         body: fd,
//       });

//       const json = await res.json().catch(() => ({}));
//       if (!res.ok) {
//         alert(json?.error ? `Failed: ${json.error}` : 'Failed to create food log');
//         return;
//       }
//       alert('Food log created ✅');
//       // window.location.href = '/dashboard/child/health';
//     } catch (err) {
//       console.error(err);
//       alert('Request failed');
//     } finally {
//       setSaving(false);
//     }
//   }

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
//       <h1 className="text-xl font-semibold mb-4 text-black">Add Food Log</h1>

//       <form onSubmit={onSubmit} className="space-y-3">
//         <input
//           type="number"
//           name="quantity"
//           placeholder="Quantity (e.g., 1)"
//           className="w-full border px-3 py-2 rounded text-black"
//           min={0}
//           required
//         />

//         <select name="meal_type" className="w-full border px-3 py-2 rounded text-black" required>
//           <option value="">Select Meal Type</option>
//           <option value="BREAKFAST">BREAKFAST</option>
//           <option value="LUNCH">LUNCH</option>
//           <option value="DINNER">DINNER</option>
//           <option value="SNACK">SNACK</option>
//         </select>

//         <input
//           type="number"
//           name="child"
//           placeholder="Child ID"
//           className="w-full border px-3 py-2 rounded text-black"
//           min={1}
//           required
//         />

//         <select name="food_item" className="w-full border px-3 py-2 rounded text-black" required>
//           <option value="">{loadingItems ? 'Loading food items…' : 'Select Food Item'}</option>
//           {!loadingItems &&
//             foodItems.map((fi) => (
//               <option key={fi.id} value={fi.id}>
//                 {fi.name}
//               </option>
//             ))}
//         </select>

//         <button
//           type="submit"
//           disabled={saving}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60"
//         >
//           {saving ? 'Saving…' : 'Save'}
//         </button>
//       </form>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type FoodItem = { id: number; name: string };

export default function FoodLogForm() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);

  // Load food items for dropdown
  useEffect(() => {
    (async () => {
      try {
        // no child param here -> route returns FOOD ITEMS
        const res = await fetch('/api/child/health', { cache: 'no-store' });
        const json = await res.json();
        const list = Array.isArray(json) ? json : Array.isArray(json?.results) ? json.results : [];
        setFoodItems(list as FoodItem[]);
      } catch (e) {
        console.error('Failed to load food items:', e);
      } finally {
        setLoadingItems(false);
      }
    })();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData(e.currentTarget); // quantity, meal_type, child, food_item

      const res = await fetch('/api/child/health', {
        method: 'POST',
        body: fd,
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(json?.error ? `Failed: ${json.error}` : 'Failed to create food log');
        return;
      }

      // ✅ navigate back to the main health page
      // use replace() if you DON'T want the form page kept in history
      router.replace('/dashboard/child/health');
      router.refresh(); // re-fetch server components (optional but nice)
    } catch (err) {
      console.error(err);
      alert('Request failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-4 text-black">Add Food Log</h1>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="number"
          name="quantity"
          placeholder="Quantity (e.g., 1)"
          className="w-full border px-3 py-2 rounded text-black"
          min={1}
          required
        />

        <select name="meal_type" className="w-full border px-3 py-2 rounded text-black" required>
          <option value="">Select Meal Type</option>
          <option value="BREAKFAST">BREAKFAST</option>
          <option value="LUNCH">LUNCH</option>
          <option value="DINNER">DINNER</option>
          <option value="SNACK">SNACK</option>
        </select>

        {/* if the server route derives child from token, this can be hidden or removed */}
        <input
          type="number"
          name="child"
          placeholder="Child ID"
          className="w-full border px-3 py-2 rounded text-black"
          min={1}
          required
        />

        <select name="food_item" className="w-full border px-3 py-2 rounded text-black" required>
          <option value="">{loadingItems ? 'Loading food items…' : 'Select Food Item'}</option>
          {!loadingItems &&
            foodItems.map((fi) => (
              <option key={fi.id} value={fi.id}>
                {fi.name}
              </option>
            ))}
        </select>

        <button
          type="submit"
          disabled={saving}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </form>
    </div>
  );
}
