"use client";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import Link from "next/link";
import { RewardRequest } from "../../parent/reward/types";


interface Request {
  id: number;
  name: string;
  points: number;
  status: "Pending" | "Approved" | "Rejected";
  date: string;
}

export default function SummaryPage() {
  const [requests] = useState<Request[]>([
    { id: 1, name: "Cycle", points: 5000, status: "Approved", date: "2024-07-05" },
    { id: 2, name: "Drone", points: 20000, status: "Pending", date: "2024-07-06" },
    { id: 3, name: "Frost Guard", points: 3000, status: "Approved", date: "2024-07-06" },
    { id: 4, name: "Skateboard", points: 4000, status: "Rejected", date: "2024-07-06" },
    { id: 5, name: "Telescope", points: 7000, status: "Pending", date: "2024-07-07" },
  ]);

  const statusCounts = [
    { name: "Pending", count: requests.filter(r => r.status === "Pending").length },
    { name: "Approved", count: requests.filter(r => r.status === "Approved").length },
    { name: "Rejected", count: requests.filter(r => r.status === "Rejected").length },
  ];

  const pointsPerDate = Array.from(
    requests.filter(r => r.status === "Approved").reduce((map, r) => {
      map.set(r.date, (map.get(r.date) || 0) + r.points);
      return map;
    }, new Map<string, number>())
  ).map(([date, points]) => ({ date, points }));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">🎁 Reward Summary</h1>
      
      <div className="flex justify-end">
    
    <Link
    
    href="/dashboard/child/reward/request"
    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium"
  >
    + Request Reward
    
  </Link>
  
    

</div>


      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statusCounts.map((s) => (
          <div key={s.name} className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 rounded-xl shadow text-center">
            <p className="font-semibold">{s.name} Requests</p>
            <p className="text-2xl font-bold mt-1">{s.count}</p>
          </div>
        ))}
      </div>

      {/* Chart - Points per Date */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-blue-600 mb-3">📈 Points Redeemed Per Date</h2>
        {pointsPerDate.length === 0 ? (
          <p className="text-gray-500">No approved rewards yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pointsPerDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="points" fill="#14b8a6" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Table - All Requests */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl text-blue-600 font-semibold mb-2">📋 All Reward Requests</h2>
        <table className="w-full border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Reward</th>
              <th className="p-2 text-left">Points</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="p-2 text-gray-800">{r.name}</td>
                <td className="p-2 text-gray-800">{r.points}</td>
                <td className="p-2 text-gray-800">{r.date}</td>
                <td className={`p-2 font-semibold ${
                  r.status === "Approved" ? "text-green-600" :
                  r.status === "Rejected" ? "text-red-600" :
                  "text-yellow-600"
                }`}>
                  {r.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
