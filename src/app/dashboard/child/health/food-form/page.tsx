'use client';

import { useState } from "react";

type FoodEntry = {
  food: string;
  mealType: string;
  quantity: string;
};

export default function FoodForm({
  childId,
  onAddFood,
}: {
  childId: number;
  onAddFood?: (item: FoodEntry) => void;
}) {
  const [entry, setEntry] = useState<FoodEntry>({
    food: "",
    mealType: "",
    quantity: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { food, mealType, quantity } = entry;

    if (!food || !mealType || !quantity) return;

    try {
      const res = await fetch('http://localhost:8000/health/food-logs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({
          child: childId,
          food_item: food,
          meal_type: mealType,
          quantity,
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result?.error || 'Something went wrong');

      console.log("✅ Food logged:", result);
      if (onAddFood) onAddFood(entry);
      setEntry({ food: "", mealType: "", quantity: "" }); // Clear form

    } catch (err) {
      console.error("❌ Error submitting food log:", err);
      alert("Failed to submit food entry.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Food Item"
        className="w-full border px-3 py-2 rounded text-gray-700"
        value={entry.food}
        onChange={(e) => setEntry({ ...entry, food: e.target.value })}
        required
      />
      <select
        className="w-full border px-3 py-2 rounded text-gray-700"
        value={entry.mealType}
        onChange={(e) => setEntry({ ...entry, mealType: e.target.value })}
        required
      >
        <option value="">Select Meal Type</option>
        <option value="Breakfast">🍳 Breakfast</option>
        <option value="Lunch">🍛 Lunch</option>
        <option value="Dinner">🍽️ Dinner</option>
        <option value="Snack">🍿 Snack</option>
      </select>
      <input
        type="text"
        placeholder="Quantity (e.g. 1 bowl)"
        className="w-full border px-3 py-2 rounded text-gray-700"
        value={entry.quantity}
        onChange={(e) => setEntry({ ...entry, quantity: e.target.value })}
        required
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        ➕ Add Food Item
      </button>
    </form>
  );
}
