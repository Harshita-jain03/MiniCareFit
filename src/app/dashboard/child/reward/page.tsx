"use client";

import { useState } from "react";
import Link from "next/link";

interface Reward {
  id: number;
  name: string;
  points: number;
}
interface Request {
  id: number;
  name: string;
  points: number;
  status: "Pending" | "Approved" | "Rejected";
}
export default function RewardPage() {
  const rewards = [
    { id: 1,name: "Frost Guard", points: 500, image: "/rewards/jaket.png" },
    { id: 2,name: "Cycle", points: 10000, image: "/rewards/cycle.png" },
    { id: 3,name: "Drone", points: 20000, image: "/rewards/drone.png" },
  ];

  const [requests, setRequests] = useState<Request[]>([
  { id: 1, name: "Cycle", points: 5000, status: "Approved" },
  { id: 2, name: "Drone", points: 20000, status: "Pending" },
  { id: 3, name: "Frost Guard", points: 3000, status: "Rejected" },
]);

  const [balance, setBalance] = useState(25000);
  const [history, setHistory] = useState<
    { date: string; item: string; points: number }[]
  >([]);
  const [showHistory, setShowHistory] = useState(false);
  const [message, setMessage] = useState("");
  const handlePurchase = (reward: Reward) => {
    setRequests([
      ...requests,
      { id: reward.id, name: reward.name, points: reward.points, status: "Pending" },
    ]);
    setMessage(`Your request for "${reward.name}" has been sent to your parent for approval.`);
    setTimeout(() => setMessage(""), 4000);
  };
//   const handlePurchase = (reward: { name: string; points: number; image: string }) => {
//   // Create overlay div
//   const modal = document.createElement("div");
//   modal.className =
//     "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

//   // Create modal content
//   
//   `;

//   document.body.appendChild(modal);

//   // Attach event listeners
//   (document.getElementById("yes") as HTMLButtonElement).onclick = () => {
//     if (balance < reward.points) {
//       alert("You do not have enough points to purchase this item.");
//     } else {
//       setBalance(balance - reward.points);
//       setHistory([
//         ...history,
//         {
//           date: new Date().toISOString().split("T")[0],
//           item: reward.name,
//           points: reward.points,
//         },
//       ]);
//       alert(`You have successfully purchased "${reward.name}".`);
//     }
//     document.body.removeChild(modal);
//   };

//   (document.getElementById("no") as HTMLButtonElement).onclick = () => {
//     document.body.removeChild(modal);
//   };
// };


  return (
    <div className="space-y-8">
      <h1 className="text-2xl text-blue-500 font-bold">
        Rewards
      </h1>
      {message && (
        <div className="bg-green-100 border border-green-300 text-green-700 p-3 rounded">
          {message}
        </div>
      )}
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-lg text-center">
          <div className="text-sm">Total Balance</div>
          <div className="text-3xl font-bold mt-2">{balance}</div>
        </div>
        
        
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-lg text-center">
    <div className="text-sm">Today Earnings</div>
    <div className="text-3xl font-bold mt-2">
      {history.filter(
        (h) =>
          h.date === new Date().toISOString().split("T")[0]
      ).reduce((sum, h) => sum + h.points, 0)}
    </div>
  </div>

  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-lg text-center">
    <div className="text-sm">Average Earnings</div>
    <div className="text-3xl font-bold mt-2">
      {history.length === 0
        ? 0
        : Math.floor(
            history.reduce((sum, h) => sum + h.points, 0) /
              history.length
          )}
    </div>
  </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setShowHistory(true)}
          className="px-4 py-2 rounded font-medium bg-blue-600 text-white"
        >
          View History
        </button>
        <Link className="px-4 py-2 rounded font-medium bg-blue-600 text-white"
  href={{
    pathname: "/dashboard/child/reward/summary",
    query: { data: JSON.stringify(history) }
  }}
>
  Summary
</Link>

      </div>

      {/* Rewards List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <div
            key={reward.name}
            className="flex flex-col text-blue-300 items-center bg-white rounded-lg shadow p-4"
          >
            <img
              src={reward.image}
              alt={reward.name}
              className="w-24 h-24 object-contain mb-2"
            />
            <div className="font-semibold">{reward.name}</div>
            <div className="text-blue-600 text-sm">
              Points: {reward.points}
            </div>
            <button
              onClick={() => handlePurchase(reward)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Request Purchase
            </button>
          </div>
        ))}
      </div>

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-lg space-y-4">
            <h2 className="text-xl text-blue-500 font-bold">Purchased Rewards</h2>
            {requests.filter(r => r.status === "Approved").length === 0 ? (
              <p className="text-gray-700">No approved purchases yet.</p>
            ) : (
              <table className="w-full text-sm border">
                <thead className="bg-gray-500">
                  <tr>
                    <th className="p-2  text-left">Reward</th>
                    <th className="p-2 text-left">Points</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requests
                    .filter(r => r.status === "Approved")
                    .map((req, idx) => (
                      <tr key={idx}>
                        <td className="p-2 text-black">{req.name}</td>
                        <td className="p-2 text-black">{req.points}</td>
                        <td className="p-2 text-green-600">{req.status}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
            <div className="flex justify-end">
              <button
                onClick={() => setShowHistory(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}