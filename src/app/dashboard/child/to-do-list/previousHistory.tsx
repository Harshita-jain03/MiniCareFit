"use client";
import { useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type DayHistory = {
  day: string;
  date: string;
  tasks: Task[];
};

export default function PreviousHistory() {
  const [history] = useState<DayHistory[]>([
    {
      day: "Day 1",
      date: "2025-07-18",
      tasks: [
        { id: 1, title: "Brush Teeth", completed: true },
        { id: 2, title: "Do Homework", completed: false },
      ],
    },
    {
      day: "Day 2",
      date: "2025-07-17",
      tasks: [{ id: 3, title: "Read Book", completed: true }],
    },
  ]);

  const [selectedDayTasks, setSelectedDayTasks] = useState<Task[] | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>("");

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        🗓️ Previous 7 Days Summary
      </h3>
      <table className="w-full text-sm border">
        <thead className="bg-blue-400">
          <tr>
            <th className="px-2 py-1 text-left text-white">Day</th>
            <th className="px-2 py-1 text-left text-white">Date</th>
            <th className="px-2 py-1 text-left text-white">Summary</th>
          </tr>
        </thead>
        <tbody>
          {history.map((day, i) => (
            <tr key={i} className="border-b ">
              <td className="px-2 py-1 text-black">{day.day}</td>
              <td className="px-2 py-1 text-black">{day.date}</td>
              <td className="px-2 py-1">
                <button
                  onClick={() => {
                    setSelectedDay(day.day);
                    setSelectedDayTasks(day.tasks);
                  }}
                  className="text-blue-500 underline"
                >
                  View Summary
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedDayTasks && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-md relative">
            <button
              onClick={() => setSelectedDayTasks(null)}
              className="absolute top-2 right-4 text-gray-600 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-bold text-blue-600 mb-4">
              {selectedDay} Summary
            </h2>
            <ul className="space-y-2 text-gray-700">
              {selectedDayTasks.map((task, i) => (
                <li
                  key={i}
                  className={`border-b py-1 ${
                    task.completed ? "line-through text-gray-700" : ""
                  }`}
                >
                  {task.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
