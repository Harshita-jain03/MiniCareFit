"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react"; // Optional icons

interface RewardRequest {
  id: number;
  childName: string;
  rewardName: string;
  points: number;
  status: "Pending" | "Approved" | "Rejected";
}

export default function ChildRequestPage() {
  const [requests, setRequests] = useState<RewardRequest[]>([
    { id: 1, childName: "Ria", rewardName: "Cycle", points: 10000, status: "Pending" },
    { id: 2, childName: "Avi", rewardName: "Drone", points: 20000, status: "Approved" },
    { id: 3, childName: "Ria", rewardName: "Frost Guard", points: 3000, status: "Rejected" },
  ]);

  const updateStatus = (id: number, newStatus: "Approved" | "Rejected") => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: newStatus } : r
      )
    );
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-blue-700">✅ Approve Reward Requests</h2>
      <table className="w-full text-sm border rounded overflow-hidden shadow">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="p-3 text-left">Child</th>
            <th className="p-3 text-left">Reward</th>
            <th className="p-3 text-left">Points</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id} className="border-b hover:bg-gray-50 transition">
              <td className="p-3 text-gray-800">{r.childName}</td>
              <td className="p-3 text-gray-800">{r.rewardName}</td>
              <td className="p-3 text-gray-800">{r.points}</td>
              <td
                className={`p-3 font-semibold ${
                  r.status === "Approved"
                    ? "text-green-600"
                    : r.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {r.status}
              </td>
              <td className="p-3 space-x-2">
                {r.status === "Pending" ? (
                  <>
                    <button
                      onClick={() => updateStatus(r.id, "Approved")}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded inline-flex items-center"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" /> Approve
                    </button>
                    <button
                      onClick={() => updateStatus(r.id, "Rejected")}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded inline-flex items-center"
                    >
                      <XCircle className="w-4 h-4 mr-1" /> Reject
                    </button>
                  </>
                ) : (
                  <span className="text-sm text-gray-400">No actions</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
