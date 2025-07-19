"use client";
import { useState } from "react";

const todayPlan = {
  foodItems: ["Milk", "Chapati", "Paneer"],
  waterTarget: 2000, // in ml
  targetWeight: 30,  // optional
};

export default function ChildDailyHealthLog() {
  const [eatenItems, setEatenItems] = useState<string[]>([]);
  const [waterDrank, setWaterDrank] = useState(0);
  const [currentWeight, setCurrentWeight] = useState("");

  const toggleItem = (item: string) => {
    setEatenItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const pendingItems = todayPlan.foodItems.filter(item => !eatenItems.includes(item));

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-blue-600">🧒 Today's Health Log</h2>

      {/* Food Tracker */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">🍽️ Food Tracker</h3>
        <ul className="space-y-1">
          {todayPlan.foodItems.map(item => (
            <li key={item} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={eatenItems.includes(item)}
                onChange={() => toggleItem(item)}
                className="accent-blue-500"
              />
              <span
                className={eatenItems.includes(item)
                  ? "line-through text-gray-400"
                  : "text-gray-800"}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Water Intake */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">💧 Water Intake</h3>
        <input
          type="number"
          className="border px-3 py-2 rounded w-48"
          value={waterDrank}
          onChange={(e) => setWaterDrank(Number(e.target.value))}
          placeholder="ml drank today"
        />
        <p className="text-sm mt-1 text-gray-600">
          Target: {todayPlan.waterTarget} ml
        </p>
      </div>

      {/* Weight Input */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">⚖️ Weight</h3>
        <input
          type="number"
          className="border px-3 py-2 rounded w-48"
          value={currentWeight}
          onChange={(e) => setCurrentWeight(e.target.value)}
          placeholder="Today's weight (kg)"
        />
      </div>

      {/* Summary */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-700 mb-2">📊 Summary</h3>
        <p>✅ Eaten: {eatenItems.length} / {todayPlan.foodItems.length}</p>
        <p>🔴 Pending: {pendingItems.join(", ") || "None 🎉"}</p>
        <p>💧 Water: {waterDrank} / {todayPlan.waterTarget} ml</p>
        <p>⚖️ Weight: {currentWeight || "Not logged yet"}</p>
      </div>
    </div>
  );
}
