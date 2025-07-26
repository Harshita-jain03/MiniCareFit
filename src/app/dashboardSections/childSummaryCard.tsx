"use client";
import { useEffect, useState } from "react";

type FoodItem = {
  name: string;
  calories: number;
};

type HealthSummary = {
  day: string;
  date: string;
  total_fat: number;
  total_protein: number;
  total_carbohydrate: number;
  total_calories: number;
  feedback: "GOOD" | "BAD";
  summary?: FoodItem[];
};

export default function SummaryCard() {
  const [balance, setBalance] = useState(300);
  const [motivationIndex, setMotivationIndex] = useState(0);
  const [weeklyData, setWeeklyData] = useState<HealthSummary[]>([]);
  const [selectedSummary, setSelectedSummary] = useState<FoodItem[] | null>(null);
  const [modalDay, setModalDay] = useState<string>("");

  const motivations = [
    "Consistency is the key to success.",
    "Small steps every day lead to big results.",
    "Stay positive and keep moving forward.",
    "Believe in yourself—you've got this!",
    "Progress, not perfection.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMotivationIndex((prev) => (prev + 1) % motivations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // ✅ Replace this with real API call later
    const dummyData: HealthSummary[] = [
      {
        day: "Mon",
        date: "2025-07-14",
        total_fat: 18,
        total_protein: 50,
        total_carbohydrate: 120,
        total_calories: 1400,
        feedback: "GOOD",
        summary: [
          { name: "Milk", calories: 200 },
          { name: "Dal", calories: 300 },
          { name: "Rice", calories: 400 },
        ],
      },
      {
        day: "Tue",
        date: "2025-07-15",
        total_fat: 30,
        total_protein: 25,
        total_carbohydrate: 160,
        total_calories: 1700,
        feedback: "BAD",
        summary: [
          { name: "Pizza", calories: 700 },
          { name: "Samosa", calories: 500 },
        ],
      },
    ];
    setWeeklyData(dummyData);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6 space-y-6">
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center">
            <p className="text-sm text-gray-500">Total Balance</p>
            <p className="text-3xl font-bold text-blue-600">{balance}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Today's Progress</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className="bg-green-500 h-4 rounded-full text-xs text-white text-center"
                style={{ width: "60%" }}
              >
                60%
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow p-4 text-white text-center transition-all duration-1000">
            <p className="text-sm">⭐ Keep it up!</p>
            <p className="font-semibold mt-1">{motivations[motivationIndex]}</p>
          </div>
        </div>

        {/* Weekly Health Update Table */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg text-blue-600 font-semibold mb-2">Weekly Health Update</h3>
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-2 py-1">Day</th>
                <th className="px-2 py-1">Date</th>
                <th className="px-2 py-1">Fat (g)</th>
                <th className="px-2 py-1">Protein (g)</th>
                <th className="px-2 py-1">Carbs (g)</th>
                <th className="px-2 py-1">Calories</th>
                <th className="px-2 py-1">Feedback</th>
                {/* <th className="px-2 py-1">Summary</th> */}
              </tr>
            </thead>
            <tbody>
              {weeklyData.map((day, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-2 py-1 text-black">{day.day}</td>
                  <td className="px-2 py-1 text-black">{day.date}</td>
                  <td className="px-2 py-1 text-black">{day.total_fat}</td>
                  <td className="px-2 py-1 text-black">{day.total_protein}</td>
                  <td className="px-2 py-1 text-black">{day.total_carbohydrate}</td>
                  <td className="px-2 py-1 text-black">{day.total_calories}</td>
                  <td className={`px-2 py-1 font-semibold ${day.feedback === "GOOD" ? "text-green-600" : "text-red-600"}`}>
                    {day.feedback}
                  </td>
                  {/* <td className="px-2 py-1">
                    <button
                      onClick={() => {
                        setSelectedSummary(day.summary || []);
                        setModalDay(day.day);
                      }}
                      className="bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Modal */}
        {selectedSummary && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
              <button
                onClick={() => setSelectedSummary(null)}
                className="absolute top-2 right-3 text-xl text-gray-600 hover:text-red-500"
              >
                &times;
              </button>
              <h2 className="text-lg font-bold text-blue-600 mb-4">
                Food Summary - {modalDay}
              </h2>

              {selectedSummary.length > 0 ? (
                <ul className="space-y-2">
                  {selectedSummary.map((item, i) => (
                    <li key={i} className="flex justify-between">
                      <span className="text-black">{item.name}</span>
                      <span className="text-gray-600">{item.calories} cal</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No items available.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
