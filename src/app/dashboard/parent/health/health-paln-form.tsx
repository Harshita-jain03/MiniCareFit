"use client";
import { useState } from "react";

export default function HealthPlanForm() {
  const [foodPlan, setFoodPlan] = useState<string[]>([]);
  const [waterGoal, setWaterGoal] = useState(2000); // in ml
  const [newFood, setNewFood] = useState("");

  const addFoodItem = () => {
    if (newFood) {
      setFoodPlan([...foodPlan, newFood]);
      setNewFood("");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold text-blue-600">📝 Set Today's Eating Plan</h2>

      <div className="flex gap-2">
        <input
          className="border px-3 py-2 rounded w-full text-gray-700"
          placeholder="Add food item (e.g. Chapati, Milk)"
          value={newFood}
          onChange={(e) => setNewFood(e.target.value)}
        />
        <button onClick={addFoodItem} className="bg-blue-600 text-white px-3 py-2 rounded">
          Add
        </button>
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">💧 Water Goal (ml)</label>
        <input
          type="number"
          className="border px-3 py-2 rounded w-full text-gray-700"
          value={waterGoal}
          onChange={(e) => setWaterGoal(Number(e.target.value))}
        />
      </div>

      <div>
        <p className="text-gray-700 mt-2">✅ Today's Plan:</p>
        <ul className="list-disc pl-5 text-gray-700">
          {foodPlan.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <p>💧 Water Target: {waterGoal} ml</p>
      </div>
    </div>
  );
}
