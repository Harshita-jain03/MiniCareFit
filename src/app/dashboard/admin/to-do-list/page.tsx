"use client";

import { useState } from "react";

type Task = {
  id: number;
  title: string;
  points: number;
  completed: boolean;
};

export default function ToDoListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newPoints, setNewPoints] = useState("");

  const handleAddTask = () => {
    if (!newTitle || !newPoints) {
      alert("Please enter both title and points.");
      return;
    }

    setTasks((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: newTitle,
        points: parseInt(newPoints, 10),
        completed: false,
      },
    ]);
    setNewTitle("");
    setNewPoints("");
  };

  const handleMarkDone = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">📝 To-Do List</h2>

        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Task title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          <input
            type="number"
            placeholder="Points"
            value={newPoints}
            onChange={(e) => setNewPoints(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-28 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            + Add Task
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No tasks added yet.</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex justify-between items-center p-4 rounded border ${
                  task.completed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                }`}
              >
                <div>
                  <p
                    className={`font-medium text-lg ${
                      task.completed ? "line-through text-gray-500" : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-500">Points: {task.points}</p>
                </div>
                <div className="flex gap-3">
                  {!task.completed && (
                    <button
                      onClick={() => handleMarkDone(task.id)}
                      className="text-green-600 hover:underline"
                    >
                      ✅ Mark as Done
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-600 hover:underline"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
