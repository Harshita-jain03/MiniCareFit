"use client";
import { useState } from "react";

type FoodEntry = {
  food: string;
  mealType: string;
  quantity: string;
};

export default function FoodForm({
  onAddFood,
}: {
  onAddFood: (item: FoodEntry) => void;
}) {
  const [entry, setEntry] = useState<FoodEntry>({
    food: "",
    mealType: "",
    quantity: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entry.food || !entry.mealType || !entry.quantity) return;
    onAddFood(entry); // ✅ Pass up to HealthPage
    setEntry({ food: "", mealType: "", quantity: "" }); // Clear form
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
