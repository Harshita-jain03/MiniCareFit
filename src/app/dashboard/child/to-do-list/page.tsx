"use client";
import { useState } from "react";
import PreviousHistory from "./previousHistory"; // ✅ Import your component

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TodoPage() {
  const [todayTasks, setTodayTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const addTask = () => {
    if (!taskInput.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title: taskInput.trim(),
      completed: false,
    };
    setTodayTasks([...todayTasks, newTask]);
    setTaskInput("");
  };

  const toggleComplete = (id: number) => {
    setTodayTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 min-h-[400px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
            📝 Child Todo List
          </h2>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition"
          >
            {showHistory ? "⬅ Back to Today" : "📅 Previous 7 Days"}
          </button>
        </div>

        {/* Content View */}
        {!showHistory ? (
          <>
            {/* Task Input Form */}
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                className="flex-1 border border-gray-300 px-5 py-3 rounded-md text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="✍️ What do you want to do today?"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
              />
              <button
                onClick={addTask}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-md text-xl font-bold transition"
                title="Add Task"
              >
                ➕
              </button>
            </div>

            {/* Today's Task List */}
            <div className="space-y-3 text-gray-700">
              {todayTasks.length === 0 ? (
                <p className="text-gray-500 text-center">No tasks added for today. 🎉</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {todayTasks.map((task) => (
                    <li
                      key={task.id}
                      className="flex justify-between items-center py-3"
                    >
                      <span
                        className={`text-base ${
                          task.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {task.title}
                      </span>
                      <button
                        onClick={() => toggleComplete(task.id)}
                        className={`text-xs px-4 py-2 rounded-md font-semibold ${
                          task.completed
                            ? "bg-gray-300 text-gray-700"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        {task.completed ? "Undo" : "Mark Done"}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        ) : (
          <PreviousHistory />
        )}
      </div>
    </div>
  );
}
