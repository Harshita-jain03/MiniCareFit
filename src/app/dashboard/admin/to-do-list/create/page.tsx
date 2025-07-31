"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/src/lib/auth/client"; // ✅ Correct import

export default function CreateTaskPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    points: "",
    assigned_to: "",
    assigned_by: "",
  });

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, description, deadline, points, assigned_to, assigned_by } = formData;

    if (!title || !points) {
      alert("Title and Points are required");
      return;
    }

    const payload = {
      title,
      description,
      due_date: new Date(deadline).toISOString(),
      points: parseInt(points),
      assigned_to: parseInt(assigned_to),
      assigned_by: parseInt(assigned_by),
    };

    try {
      const data = await apiFetch("http://localhost:8000/todo/todo-tasks/", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      alert("✅ Task created!");
      console.log(data);

      // Reset form
      setFormData({
        title: "",
        description: "",
        deadline: "",
        points: "",
        assigned_to: "",
        assigned_by: "",
      });

    } catch (err: any) {
      console.error("❌ Error while creating task:", err);
      alert("Something went wrong: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleAddTask}
      className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-xl"
    >
      <h2 className="text-2xl font-bold mb-4 text-purple-800">📝 Create New Task</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="p-2 border rounded text-black" />
        <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="p-2 border rounded text-black" />
        <input type="datetime-local" placeholder="Deadline" value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} className="p-2 border rounded text-black" />
        <input type="number" placeholder="Points" value={formData.points} onChange={(e) => setFormData({ ...formData, points: e.target.value })} className="p-2 border rounded text-black" />
        <input type="number" placeholder="Assigned To (User ID)" value={formData.assigned_to} onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })} className="p-2 border rounded text-black" />
        <input type="number" placeholder="Assigned By (User ID)" value={formData.assigned_by} onChange={(e) => setFormData({ ...formData, assigned_by: e.target.value })} className="p-2 border rounded text-black" />
      </div>

      <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
        ➕ Add Task
      </button>
    </form>
  );
}
