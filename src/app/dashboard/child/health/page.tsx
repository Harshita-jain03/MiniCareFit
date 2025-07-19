"use client";
import { useState } from "react";
import FoodForm from "./foodForm";
import FoodTable from "./foodTable";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

type FoodEntry = {
  food: string;
  mealType: string;
  quantity: string;
};

// Dummy data
const barData = [
  { name: "Pizza", value: 8 },
  { name: "Milk", value: 15 },
  { name: "Rice", value: 10 },
  { name: "Bread", value: 20 },
  { name: "Samosa", value: 25 },
];

const lineData = [
  { week: "Week 1", calories: 500 },
  { week: "Week 2", calories: 650 },
  { week: "Week 3", calories: 700 },
  { week: "Week 4", calories: 800 },
];

export default function HealthPage() {
  const [showSummary, setShowSummary] = useState(false);
  const [foodItems, setFoodItems] = useState<FoodEntry[]>([]);

  const handleAddFood = (item: FoodEntry) => {
    setFoodItems((prev) => [...prev, item]);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-700">
            {showSummary ? "📊 Weekly Health Summary" : "🩺 Health Dashboard"}
          </h1>
          <button
            onClick={() => setShowSummary(!showSummary)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition"
          >
            {showSummary ? "⬅ Back to Dashboard" : "📈 View Summary"}
          </button>
        </div>

        {/* Main View */}
        {!showSummary ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Form */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-lg font-semibold text-blue-600 mb-4">
                  🍽️ Log Your Meal
                </h2>
                <FoodForm onAddFood={handleAddFood} />
              </div>

              {/* Right: Table */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-lg font-semibold text-blue-600 mb-4">
                  📋 Food Items Added
                </h2>
                <FoodTable items={foodItems} />
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-8">
            {/* Motivation */}
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-700">
                💪 Great job tracking your nutrition this week!
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Total Calories", value: "2,650", emoji: "🔥" },
                { label: "Total Protein", value: "180 g", emoji: "🥩" },
                { label: "Total Carbohydrates", value: "320 g", emoji: "🍞" },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 p-5 rounded-xl shadow text-center text-white"
                >
                  <p className="text-sm">{card.emoji} {card.label}</p>
                  <p className="text-2xl font-bold mt-1">{card.value}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-lg text-blue-600 font-semibold mb-4">
                  🍔 Top Food Items
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Line Chart */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-lg text-blue-600 font-semibold mb-4">
                  📆 Weekly Calories Progress
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={lineData}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="calories" stroke="#06b6d4" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
