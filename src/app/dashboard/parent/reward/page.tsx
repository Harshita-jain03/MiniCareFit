// 'use client';
// import React, { useState, useEffect } from 'react';
// import { getRewardRequests, updateRewardRequest, getRewardStats } from './services';
// import type { RewardRequest, RewardStats } from './types';

// export default function Rewards() {
//   const [rewardRequests, setRewardRequests] = useState<RewardRequest[]>([]);
//   const [rewardStats, setRewardStats] = useState<RewardStats | null>(null);

//   useEffect(() => {
//     loadRewardData();
//   }, []);

//   const loadRewardData = async () => {
//     const [requests, stats] = await Promise.all([
//       getRewardRequests(),
//       getRewardStats()
//     ]);
//     setRewardRequests(requests);
//     setRewardStats(stats);
//   };

//   const handleApproveRequest = async (id: string, newPrice?: number) => {
//     await updateRewardRequest(id, { status: 'approved', approvedPrice: newPrice });
//     loadRewardData();
//   };

//   const handleRejectRequest = async (id: string) => {
//     await updateRewardRequest(id, { status: 'rejected' });
//     loadRewardData();
//   };

//   const handleGiftReward = async (id: string) => {
//     await updateRewardRequest(id, { status: 'gifted' });
//     loadRewardData();
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'approved':
//         return 'bg-green-100 text-green-800';
//       case 'rejected':
//         return 'bg-red-100 text-red-800';
//       case 'gifted':
//         return 'bg-blue-100 text-blue-800';
//       default:
//         return 'bg-yellow-100 text-yellow-800';
//     }
//   };

//   if (!rewardStats) {
//     return <div className="flex items-center justify-center h-64">Loading...</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <h2 className="text-3xl font-bold text-gray-900">Rewards Management</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Total Rewards</p>
//               <p className="text-2xl font-bold text-gray-900">{rewardStats.totalRewards}</p>
//             </div>
//             <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
//               <span className="text-xl">🏆</span>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Today's Earning</p>
//               <p className="text-2xl font-bold text-gray-900">{rewardStats.todaysEarning}</p>
//             </div>
//             <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
//               <span className="text-xl">📈</span>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Average Earning</p>
//               <p className="text-2xl font-bold text-gray-900">{rewardStats.averageEarning}</p>
//             </div>
//             <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
//               <span className="text-xl">📊</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h3 className="text-xl text-gray-900 font-semibold">Reward Requests</h3>
//         </div>
//         <div className="divide-y divide-gray-200">
//           {rewardRequests.map((request) => (
//             <div key={request.id} className="p-6">
//               <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                   <div className="flex items-center space-x-3 mb-2">
//                     <span className="text-2xl">{request.icon}</span>
//                     <div>
//                       <h4 className="text-lg font-semibold text-gray-900">{request.itemName}</h4>
//                       <p className="text-sm text-gray-500">Requested by {request.childName}</p>
//                     </div>
//                   </div>
//                   <p className="text-gray-600 mb-2">{request.description}</p>
//                   <div className="flex items-center space-x-4 text-sm">
//                     <span className="text-gray-500">
//                       Original Price: <span className="font-medium">{request.originalPrice} points</span>
//                     </span>
//                     {request.approvedPrice && request.approvedPrice !== request.originalPrice && (
//                       <span className="text-green-600">
//                         Approved Price: <span className="font-medium">{request.approvedPrice} points</span>
//                       </span>
//                     )}
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
//                       {request.status}
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="flex flex-col space-y-2 ml-4">
//                   {request.status === 'pending' && (
//                     <>
//                       <div className="flex space-x-2">
//                         <input
//                           type="number"
//                           placeholder="New price"
//                           className="w-24 px-2 py-1 text-sm border border-gray-300 rounded"
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') {
//                               const newPrice = parseInt((e.target as HTMLInputElement).value);
//                               if (newPrice > 0) {
//                                 handleApproveRequest(request.id, newPrice);
//                               }
//                             }
//                           }}
//                         />
//                         <button
//                           onClick={() => handleApproveRequest(request.id)}
//                           className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
//                         >
//                           Approve
//                         </button>
//                       </div>
//                       <button
//                         onClick={() => handleRejectRequest(request.id)}
//                         className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}
                  
//                   {request.status === 'approved' && (
//                     <button
//                       onClick={() => handleGiftReward(request.id)}
//                       className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//                     >
//                       🎁 Gift It
//                     </button>
//                   )}
                  
//                   {request.status === 'gifted' && (
//                     <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded text-sm font-medium">
//                       ✅ Gifted
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
          
//           {rewardRequests.length === 0 && (
//             <div className="p-6 text-center text-gray-500">
//               No reward requests at the moment
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useState } from "react";
// import Link from "next/link";

// interface Reward {
//   id: number;
//   name: string;
//   points: number;
// }
// interface Request {
//   id: number;
//   name: string;
//   points: number;
//   status: "Pending" | "Approved" | "Rejected";
// }
// export default function RewardPage() {
//   const rewards = [
//     { id: 1,name: "Frost Guard", points: 500, image: "/rewards/jaket.png" },
//     { id: 2,name: "Cycle", points: 10000, image: "/rewards/cycle.png" },
//     { id: 3,name: "Drone", points: 20000, image: "/rewards/drone.png" },
//   ];

//   const [requests, setRequests] = useState<Request[]>([
//   { id: 1, name: "Cycle", points: 5000, status: "Approved" },
//   { id: 2, name: "Drone", points: 20000, status: "Pending" },
//   { id: 3, name: "Frost Guard", points: 3000, status: "Rejected" },
// ]);

//   const [balance, setBalance] = useState(25000);
//   const [history, setHistory] = useState<
//     { date: string; item: string; points: number }[]
//   >([]);
//   const [showHistory, setShowHistory] = useState(false);
//   const [message, setMessage] = useState("");
//   const handlePurchase = (reward: Reward) => {
//     setRequests([
//       ...requests,
//       { id: reward.id, name: reward.name, points: reward.points, status: "Pending" },
//     ]);
//     setMessage(`Your request for "${reward.name}" has been sent to your parent for approval.`);
//     setTimeout(() => setMessage(""), 4000);
//   };
// //   const handlePurchase = (reward: { name: string; points: number; image: string }) => {
// //   // Create overlay div
// //   const modal = document.createElement("div");
// //   modal.className =
// //     "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

// //   // Create modal content
// //   
// //   `;

// //   document.body.appendChild(modal);

// //   // Attach event listeners
// //   (document.getElementById("yes") as HTMLButtonElement).onclick = () => {
// //     if (balance < reward.points) {
// //       alert("You do not have enough points to purchase this item.");
// //     } else {
// //       setBalance(balance - reward.points);
// //       setHistory([
// //         ...history,
// //         {
// //           date: new Date().toISOString().split("T")[0],
// //           item: reward.name,
// //           points: reward.points,
// //         },
// //       ]);
// //       alert(`You have successfully purchased "${reward.name}".`);
// //     }
// //     document.body.removeChild(modal);
// //   };

// //   (document.getElementById("no") as HTMLButtonElement).onclick = () => {
// //     document.body.removeChild(modal);
// //   };
// // };


//   return (
//     <div className="space-y-8">
//       <h1 className="text-2xl text-blue-500 font-bold">
//         Rewards
//       </h1>
//       {message && (
//         <div className="bg-green-100 border border-green-300 text-green-700 p-3 rounded">
//           {message}
//         </div>
//       )}
//       {/* Top Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-lg text-center">
//           <div className="text-sm">Total Balance</div>
//           <div className="text-3xl font-bold mt-2">{balance}</div>
//         </div>
        
        
//         <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-lg text-center">
//     <div className="text-sm">Today Earnings</div>
//     <div className="text-3xl font-bold mt-2">
//       {history.filter(
//         (h) =>
//           h.date === new Date().toISOString().split("T")[0]
//       ).reduce((sum, h) => sum + h.points, 0)}
//     </div>
//   </div>

//   <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-lg text-center">
//     <div className="text-sm">Average Earnings</div>
//     <div className="text-3xl font-bold mt-2">
//       {history.length === 0
//         ? 0
//         : Math.floor(
//             history.reduce((sum, h) => sum + h.points, 0) /
//               history.length
//           )}
//     </div>
//   </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-4">
//         <button
//           onClick={() => setShowHistory(true)}
//           className="px-4 py-2 rounded font-medium bg-blue-600 text-white"
//         >
//           View History
//         </button>
//         <Link className="px-4 py-2 rounded font-medium bg-blue-600 text-white"
//   href={{
//     pathname: "/dashboard/child/reward/summary",
//     query: { data: JSON.stringify(history) }
//   }}
// >
//   Summary
// </Link>

//       </div>

//       {/* Rewards List */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {rewards.map((reward) => (
//           <div
//             key={reward.name}
//             className="flex flex-col text-blue-300 items-center bg-white rounded-lg shadow p-4"
//           >
//             <img
//               src={reward.image}
//               alt={reward.name}
//               className="w-24 h-24 object-contain mb-2"
//             />
//             <div className="font-semibold">{reward.name}</div>
//             <div className="text-blue-600 text-sm">
//               Points: {reward.points}
//             </div>
//             <button
//               onClick={() => handlePurchase(reward)}
//               className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Request Purchase
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* History Modal */}
//       {showHistory && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow w-full max-w-lg space-y-4">
//             <h2 className="text-xl text-blue-500 font-bold">Purchased Rewards</h2>
//             {requests.filter(r => r.status === "Approved").length === 0 ? (
//               <p className="text-gray-700">No approved purchases yet.</p>
//             ) : (
//               <table className="w-full text-sm border">
//                 <thead className="bg-gray-500">
//                   <tr>
//                     <th className="p-2  text-left">Reward</th>
//                     <th className="p-2 text-left">Points</th>
//                     <th className="p-2 text-left">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {requests
//                     .filter(r => r.status === "Approved")
//                     .map((req, idx) => (
//                       <tr key={idx}>
//                         <td className="p-2 text-black">{req.name}</td>
//                         <td className="p-2 text-black">{req.points}</td>
//                         <td className="p-2 text-green-600">{req.status}</td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             )}
//             <div className="flex justify-end">
//               <button
//                 onClick={() => setShowHistory(false)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";

export default function RewardsPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    required_points: 0,
    is_active: true,
    valid_till: "",
  });

  const [message, setMessage] = useState("");

  // ✅ Handle <input> (text, number, checkbox, datetime-local)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Handle <textarea>
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/parent/reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Reward created successfully!");
        setForm({
          name: "",
          description: "",
          required_points: 0,
          is_active: true,
          valid_till: "",
        });
      } else {
        setMessage("❌ Error: " + (data.error || "Failed to create reward"));
      }
    } catch (err) {
      console.error("Failed to create reward:", err);
      setMessage("❌ Internal error");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
      {/* Top bar with title + history button */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-blue-600 text-black">
          🎁 Create Reward
        </h2>
        <Link
          href="/dashboard/parent/reward/history"
          className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black"
        >
          View Reward History
        </Link>
      </div>

      {/* Create form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Reward Name"
          value={form.name}
          onChange={handleInputChange}
          className="w-full border rounded p-2 text-black"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleTextChange}
          className="w-full border rounded p-2 text-black"
          required
        />

        <input
          type="number"
          name="required_points"
          placeholder="Required Points"
          value={form.required_points}
          onChange={handleInputChange}
          className="w-full border rounded p-2 text-black"
          required
        />

        <label className="flex items-center space-x-2 text-black">
          <input
            type="checkbox"
            name="is_active"
            checked={form.is_active}
            onChange={handleInputChange}
          />
          <span>Active</span>
        </label>

        <input
          type="datetime-local"
          name="valid_till"
          value={form.valid_till}
          onChange={handleInputChange}
          className="w-full border rounded p-2 text-black"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create Reward
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-black">{message}</p>}
    </div>
  );
}
