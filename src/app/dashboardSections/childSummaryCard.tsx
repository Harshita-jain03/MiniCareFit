"use client";
import { useEffect, useState } from "react";

export default function SummaryCard() {
  const [balance, setBalance] = useState(300);
  const [motivationIndex, setMotivationIndex] = useState(0);

  const summaryData = [
    { item: "Pizza", date: "Today", calories: 500, feedback: "BAD" },
    { item: "Milk", date: "Today", calories: 1000, feedback: "GOOD" },
    { item: "Bread", date: "Today", calories: 500, feedback: "GOOD" },
    { item: "Rice", date: "Today", calories: 105, feedback: "GOOD" },
    { item: "Dal", date: "Yesterday", calories: 500, feedback: "GOOD" },
    { item: "Samosa", date: "Yesterday", calories: 1000, feedback: "BAD" },
  ];

  const motivations = [
    "Consistency is the key to success.",
    "Small steps every day lead to big results.",
    "Stay positive and keep moving forward.",
    "Believe in yourself—you've got this!",
    "Progress, not perfection.",
  ];

  // Rotate motivation message every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMotivationIndex((prev) => (prev + 1) % motivations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      

      {/* Main */}
      <main className="flex-1 p-6 space-y-6">
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Balance */}
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center">
            <p className="text-sm text-gray-500">Total Balance</p>
            <p className="text-3xl font-bold text-blue-600">{balance}</p>
            
          </div>

          {/* Progress */}
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Weekly Goal Progress</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className="bg-green-500 h-4 rounded-full text-xs text-white text-center"
                style={{ width: "60%" }}
              >
                60%
              </div>
            </div>
          </div>

          {/* Rotating Motivation */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow p-4 text-white text-center transition-all duration-1000">
            <p className="text-sm">⭐ Keep it up!</p>
            <p className="font-semibold mt-1">{motivations[motivationIndex]}</p>
          </div>
        </div>

        {/* Summary Table */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg text-blue-600 font-semibold">Summary</h3>
            
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-2 py-1">Food Item</th>
                <th className="px-2 py-1">Date/Time</th>
                <th className="px-2 py-1">Calories</th>
                <th className="px-2 py-1">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {summaryData.map((row, i) => (
                <tr key={i} className="border-b  hover:bg-gray-50">
                  <td className="px-2 text-black py-1">{row.item}</td>
                  <td className="px-2 text-black py-1">{row.date}</td>
                  <td className="px-2 text-black py-1">{row.calories}</td>
                  <td
                    className={`px-2 py-1 font-semibold ${
                      row.feedback === "GOOD"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {row.feedback}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-blue-600 cursor-pointer hover:underline">
            Show All My History
          </p>
        </div>
      </main>
    </div>
  );
}
