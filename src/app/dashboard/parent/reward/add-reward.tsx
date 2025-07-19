"use client";

import { useState } from "react";

type Task = {
  id: number;
  title: string;
};

export default function AddRewardPage() {
  const [rewardName, setRewardName] = useState("");
  const [points, setPoints] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (!taskInput.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: taskInput.trim() }]);
    setTaskInput("");
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSubmit = () => {
    const payload = {
      rewardName,
      points,
      description,
      tasks,
    };

    console.log("Submitting:", payload);

    // TODO: Replace this with your API call
    alert("Reward added successfully!");
    
    // Reset form
    setRewardName("");
    setPoints(0);
    setDescription("");
    setTasks([]);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-blue-600">🎁 Add New Reward</h1>

      {/* Reward Info */}
      <div className="space-y-4 text-gray-700">
        <input
          type="text"
          placeholder="Reward Name"
          className="w-full border px-3 py-2 rounded text-gray-700"
          value={rewardName}
          onChange={(e) => setRewardName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Reward Points"
          className="w-full border px-3 py-2 rounded text-black"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
        />
        <textarea 
          placeholder="Reward Description (optional)"
          className="w-full border px-3 py-2 rounded text-black"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Task Section */}
      <div className="space-y-2">
        <h2 className="font-semibold text-blue-500">Assign Tasks</h2>
        <div className="flex gap-2 text-gray-700">
          <input
            type="text"
            placeholder="Enter task"
            className="w-full border px-3 py-2 rounded text-gray-700"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            ➕ Add Task
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-1">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center border-b py-1 text-gray-700">
              <span>{task.title}</span>
              <button
                onClick={() => removeTask(task.id)}
                className="text-red-500 text-sm"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        ✅ Submit Reward
      </button>
    </div>
  );
}
