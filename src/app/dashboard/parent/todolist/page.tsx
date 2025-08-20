// 'use client';
// import React, { useState, useEffect } from 'react';
// import { getTasks, addTask, updateTask, deleteTask } from './services';
// import type { Task } from './types';

// const taskIcons = ['📚', '🧹', '🍽️', '🦷', '🏃', '🎯', '💪', '🎨', '🎵', '🏆'];

// export default function TodoList() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [isAddingTask, setIsAddingTask] = useState(false);
//   const [editingTask, setEditingTask] = useState<Task | null>(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     icon: '📚',
//     description: '',
//     timeToComplete: '',
//     reward: 50,
//   });

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   const loadTasks = async () => {
//     const taskList = await getTasks();
//     setTasks(taskList);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (editingTask) {
//       await updateTask(editingTask.id, formData);
//       setEditingTask(null);
//     } else {
//       await addTask(formData);
//     }

//     setFormData({
//       name: '',
//       icon: '📚',
//       description: '',
//       timeToComplete: '',
//       reward: 50,
//     });
//     setIsAddingTask(false);
//     loadTasks();
//   };

//   const handleEdit = (task: Task) => {
//     setEditingTask(task);
//     setFormData({
//       name: task.name,
//       icon: task.icon,
//       description: task.description,
//       timeToComplete: task.timeToComplete,
//       reward: task.reward,
//     });
//     setIsAddingTask(true);
//   };

//   const handleDelete = async (id: string) => {
//     await deleteTask(id);
//     loadTasks();
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'completed':
//         return 'bg-green-100 text-green-800';
//       case 'in-progress':
//         return 'bg-yellow-100 text-yellow-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-3xl font-bold text-gray-900">To-Do List Management</h2>
//         <button
//           onClick={() => setIsAddingTask(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Add New Task
//         </button>
//       </div>

//       {isAddingTask && (
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <h3 className="text-xl font-semibold mb-4">
//             {editingTask ? 'Edit Task' : 'Add New Task'}
//           </h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Time to Complete</label>
//                 <input
//                   type="text"
//                   value={formData.timeToComplete}
//                   onChange={(e) => setFormData({ ...formData, timeToComplete: e.target.value })}
//                   placeholder="e.g., 30 minutes, 1 hour"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Select Icon</label>
//               <div className="grid grid-cols-10 gap-2">
//                 {taskIcons.map((icon) => (
//                   <button
//                     key={icon}
//                     type="button"
//                     onClick={() => setFormData({ ...formData, icon })}
//                     className={`p-3 text-2xl rounded-lg border-2 hover:bg-gray-50 ${
//                       formData.icon === icon ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
//                     }`}
//                   >
//                     {icon}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//               <textarea
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 rows={3}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Reward Points</label>
//               <select
//                 value={formData.reward}
//                 onChange={(e) => setFormData({ ...formData, reward: parseInt(e.target.value) })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value={50}>50 Points</option>
//                 <option value={100}>100 Points</option>
//                 <option value={150}>150 Points</option>
//                 <option value={200}>200 Points</option>
//               </select>
//             </div>

//             <div className="flex space-x-3">
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 {editingTask ? 'Update Task' : 'Add Task'}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsAddingTask(false);
//                   setEditingTask(null);
//                   setFormData({
//                     name: '',
//                     icon: '📚',
//                     description: '',
//                     timeToComplete: '',
//                     reward: 50,
//                   });
//                 }}
//                 className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h3 className="text-xl text-gray-900 font-semibold">Task List</h3>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kid</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reward</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {tasks.map((task) => (
//                 <tr key={task.id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.assignedTo}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <span className="text-xl mr-2">{task.icon}</span>
//                       <span className="text-sm font-medium text-gray-900">{task.name}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{task.description}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.timeToComplete}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.reward} pts</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
//                       {task.status.replace('-', ' ')}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
//                     <button
//                       onClick={() => handleEdit(task)}
//                       className="text-blue-600 hover:text-blue-900"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(task.id)}
//                       className="text-red-600 hover:text-red-900"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import React, { useState, useEffect } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  deadline: string | null;
  points: number;
  status: string;
  assignedTo: number;
  assignedBy: number;
  icon?: string;
  name?: string;
  timeToComplete?: string;
  reward?: number;
};

const taskIcons = ["📚", "🧹", "🍽️", "🦷", "🏃", "🎯", "💪", "🎨", "🎵", "🏆"];

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    icon: "📚",
    description: "",
    timeToComplete: "",
    reward: 50,
  });

  useEffect(() => {
    loadTasks();
  }, []);

  // ✅ fetch tasks from our new route
  const loadTasks = async () => {
    try {
      const res = await fetch("/api/parent/todo", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (err) {
      console.error("Error loading tasks:", err);
    }
  };

  // placeholder submit for now
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // you can later integrate POST to /api/parent/todo here
    setFormData({
      name: "",
      icon: "📚",
      description: "",
      timeToComplete: "",
      reward: 50,
    });
    setIsAddingTask(false);
    setEditingTask(null);
    loadTasks();
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      name: task.title || "",
      icon: task.icon || "📚",
      description: task.description || "",
      timeToComplete: task.timeToComplete || "",
      reward: task.points || 50,
    });
    setIsAddingTask(true);
  };

  const handleDelete = async (id: number) => {
    // you can add DELETE integration here later
    console.log("Delete task", id);
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "IN-PROGRESS":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">To-Do List Management</h2>
        <button
          onClick={() => setIsAddingTask(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Task
        </button>
      </div>

      {isAddingTask && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingTask ? "Edit Task" : "Add New Task"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time to Complete
                </label>
                <input
                  type="text"
                  value={formData.timeToComplete}
                  onChange={(e) => setFormData({ ...formData, timeToComplete: e.target.value })}
                  placeholder="e.g., 30 minutes, 1 hour"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Icon
              </label>
              <div className="grid grid-cols-10 gap-2">
                {taskIcons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon })}
                    className={`p-3 text-2xl rounded-lg border-2 hover:bg-gray-50 ${
                      formData.icon === icon ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reward Points
              </label>
              <select
                value={formData.reward}
                onChange={(e) => setFormData({ ...formData, reward: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={50}>50 Points</option>
                <option value={100}>100 Points</option>
                <option value={150}>150 Points</option>
                <option value={200}>200 Points</option>
              </select>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingTask ? "Update Task" : "Add Task"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAddingTask(false);
                  setEditingTask(null);
                  setFormData({
                    name: "",
                    icon: "📚",
                    description: "",
                    timeToComplete: "",
                    reward: 50,
                  });
                }}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl text-gray-900 font-semibold">Task List</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reward
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {task.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">{task.icon || "📚"}</span>
                      <span className="text-sm font-medium text-gray-900">{task.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {task.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.timeToComplete || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.points} pts
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status.replace("-", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(task)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
