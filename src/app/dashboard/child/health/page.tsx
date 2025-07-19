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
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-blue-600">
            {showSummary ? "Weekly Health Summary" : "Health Dashboard"}
          </h1>
          <button
            onClick={() => setShowSummary(!showSummary)}
            className="bg-blue-600 text-white px-4 py-2 rounded font-medium"
          >
            {showSummary ? "Back to Dashboard" : "View Summary"}
          </button>
        </div>

        {/* Main View */}
        {!showSummary ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FoodForm />
              <FoodTable />
            </div>
          </>
        ) : (
          <div className="space-y-6">
            {/* Motivational Message */}
            <p className="text-gray-700 text-lg text-center">
              💪 Great work tracking your nutrition this week!
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded shadow text-center">
                <p className="text-sm">Total Calories</p>
                <p className="text-2xl font-bold text-white">2,650</p>
              </div>
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded shadow text-center">
                <p className="text-sm">Total Protein</p>
                <p className="text-2xl font-bold text-white">180 g</p>
              </div>
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded shadow text-center">
                <p className="text-sm">Total Carbohydrates</p>
                <p className="text-2xl font-bold text-white">320 g</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <div className="bg-white rounded-xl shadow p-4">
                <h2 className="text-lg text-blue-600 font-semibold mb-2">
                  Top Food Items
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
              <div className="bg-white rounded-xl shadow p-4">
                <h2 className="text-lg text-blue-600 font-semibold mb-2">
                  Weekly Calories Progress
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
