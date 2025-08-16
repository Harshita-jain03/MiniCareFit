'use client';

import { useEffect, useState } from 'react';

type ApiFoodLog = {
  id: number;
  quantity: number;
  meal_type: string;
  created_at: string;
  child: number;
  food_item: {
    id: number;
    name: string;
    calories: number;
    protein: number;
    fat: number;
    carbohydrate: number;
  };
};

type Props = {
  childId: number;
};

export default function FoodLogsTable({ childId }: Props) {
  const [rows, setRows] = useState<ApiFoodLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/child/dashboard?child=${childId}`, { cache: 'no-store' });
        const json = await res.json();
        const list = Array.isArray(json?.results) ? json.results : (Array.isArray(json) ? json : []);
        setRows(list as ApiFoodLog[]);
      } catch (e) {
        console.error('Failed to load food logs:', e);
        setRows([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [childId]);

  if (loading) return <div className="text-sm text-gray-500">Loading logs…</div>;

  if (!rows.length) {
    return <div className="text-sm text-gray-500">No food logs found for this child.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 border text-left text-black">Date</th>
            <th className="px-3 py-2 border text-left text-black">Time</th>
            <th className="px-3 py-2 border text-left text-black">Food</th>
            <th className="px-3 py-2 border text-right text-black">Qty</th>
            <th className="px-3 py-2 border text-left text-black">Meal</th>
            <th className="px-3 py-2 border text-right text-black">Fat (g)</th>
            <th className="px-3 py-2 border text-right text-black">Protein (g)</th>
            <th className="px-3 py-2 border text-right text-black">Carbs (g)</th>
            <th className="px-3 py-2 border text-right text-black">Calories</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const d = (r as any).created_at_date ?? r.created_at.slice(0, 10);
            const t = (r as any).created_at_time ?? r.created_at.slice(11, 19);
            const qty = r.quantity ?? 1;
            const fat = (r.food_item.fat ?? 0) * qty;
            const protein = (r.food_item.protein ?? 0) * qty;
            const carb = (r.food_item.carbohydrate ?? 0) * qty;
            const cal = (r.food_item.calories ?? 0) * qty;

            return (
              <tr key={r.id}>
                <td className="px-3 py-2 border text-black">{d}</td>
                <td className="px-3 py-2 border text-black">{t}</td>
                <td className="px-3 py-2 border text-black">{r.food_item?.name ?? '-'}</td>
                <td className="px-3 py-2 border text-right text-black">{qty}</td>
                <td className="px-3 py-2 border text-black">{r.meal_type}</td>
                <td className="px-3 py-2 border text-right text-black">{fat}</td>
                <td className="px-3 py-2 border text-right text-black">{protein}</td>
                <td className="px-3 py-2 border text-right text-black">{carb}</td>
                <td className="px-3 py-2 border text-right text-black">{cal}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
