"use client";

import { useState } from "react";

export default function SummaryCard() {
  const today = new Date().toLocaleDateString("en-GB");

  const [todayData] = useState({
    food: ["Milk", "Chapati", "Paneer"],
    calories: 720,
    rewardsCompleted: 1,
    tasks: [
      { title: "Finish homework", completed: true },
      { title: "Read a book", completed: false },
      { title: "Drink 2L water", completed: true },
      { title: "Exercise 30 mins", completed: false },
    ],
  });

  const [weeklyData] = useState([
    { day: "Mon", tasks: 2, rewards: 1, calories: 850 },
    { day: "Tue", tasks: 3, rewards: 0, calories: 720 },
    { day: "Wed", tasks: 1, rewards: 0, calories: 560 },
    { day: "Thu", tasks: 4, rewards: 1, calories: 900 },
    { day: "Fri", tasks: 2, rewards: 0, calories: 700 },
    { day: "Sat", tasks: 3, rewards: 2, calories: 820 },
    { day: "Sun", tasks: 3, rewards: 1, calories: 750 },
  ]);

  const completedTasks = todayData.tasks.filter(t => t.completed);
  const pendingTasks = todayData.tasks.filter(t => !t.completed);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">👨‍👩‍👧 Parent Dashboard</h1>

      {/* Section 1: Today's Snapshot */}
      <div className="bg-white p-4 rounded shadow space-y-3 text-gray-800">
        <h2 className="text-xl font-semibold text-blue-600">📅 Today - {today}</h2>
        <p>🍴 <b>Food Consumed:</b> {todayData.food.join(", ")}</p>
        <p>🔥 <b>Total Calories:</b> {todayData.calories} kcal</p>
        <p>✅ <b>Tasks Completed:</b> {completedTasks.length}</p>
        <p>🏆 <b>Rewards Completed:</b> {todayData.rewardsCompleted}</p>
      </div>

      {/* Section 2: Completed Tasks */}
      <div className="bg-white p-4 rounded shadow text-gray-800">
        <h2 className="text-xl font-semibold text-green-600 mb-2">✅ Completed Tasks</h2>
        {completedTasks.length > 0 ? (
          <ul className="list-disc pl-6 space-y-1">
            {completedTasks.map((task, idx) => (
              <li key={idx}>✅ {task.title}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tasks completed today.</p>
        )}
      </div>

      {/* Section 3: Pending Tasks */}
      <div className="bg-white p-4 rounded shadow text-gray-800">
        <h2 className="text-xl font-semibold text-yellow-600 mb-2">⏳ Pending Tasks</h2>
        {pendingTasks.length > 0 ? (
          <ul className="list-disc pl-6 space-y-1">
            {pendingTasks.map((task, idx) => (
              <li key={idx}>⏳ {task.title}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No pending tasks. Great job!</p>
        )}
      </div>

      {/* Section 4: Past 7 Days Overview */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold text-blue-600 mb-3">📊 Past 7 Days Overview</h2>
        <table className="w-full text-sm border">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-2 text-left">Day</th>
              <th className="p-2 text-left">Tasks</th>
              <th className="p-2 text-left">Rewards</th>
              <th className="p-2 text-left">Calories</th>
            </tr>
          </thead>
          <tbody>
            {weeklyData.map((d, i) => (
              <tr key={i} className="border-b">
                <td className="p-2 text-gray-800">{d.day}</td>
                <td className="p-2 text-gray-800">{d.tasks}</td>
                <td className="p-2 text-gray-800">{d.rewards}</td>
                <td className="p-2 text-gray-800">{d.calories} kcal</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 5: Reward Management Note */}
    
    </div>
  );
}
