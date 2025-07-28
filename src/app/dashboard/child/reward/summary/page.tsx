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

interface Request {
  id: number;
  name: string;
  points: number;
  status: "Pending" | "Approved" | "Rejected";
  date: string; // YYYY-MM-DD
}

export default function SummaryPage() {
  // Dummy data
  const [requests] = useState<Request[]>([
    { id: 1, name: "Cycle", points: 5000, status: "Approved", date: "2024-07-05" },
    { id: 2, name: "Drone", points: 20000, status: "Pending", date: "2024-07-06" },
    { id: 3, name: "Frost Guard", points: 3000, status: "Approved", date: "2024-07-06" },
    { id: 4, name: "Skateboard", points: 4000, status: "Rejected", date: "2024-07-06" },
    { id: 5, name: "Telescope", points: 7000, status: "Pending", date: "2024-07-07" },
  ]);

  // Counts
  const statusCounts = [
    {
      name: "Pending",
      count: requests.filter((r) => r.status === "Pending").length,
    },
    {
      name: "Approved",
      count: requests.filter((r) => r.status === "Approved").length,
    },
    {
      name: "Rejected",
      count: requests.filter((r) => r.status === "Rejected").length,
    },
  ];

  // Points per date (only approved)
  const pointsPerDate = Array.from(
    requests
      .filter((r) => r.status === "Approved")
      .reduce((map, r) => {
        if (!map.has(r.date)) {
          map.set(r.date, r.points);
        } else {
          map.set(r.date, map.get(r.date)! + r.points);
        }
        return map;
      }, new Map<string, number>())
  ).map(([date, total]) => ({
    date,
    points: total,
  }));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-blue-600">Rewards Summary</h1>

      {/* Counts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statusCounts.map((s) => (
          <div
            key={s.name}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded shadow text-center"
          >
            <p className="font-semibold">{s.name} Requests</p>
            <p className="text-2xl font-bold">{s.count}</p>
          </div>
        ))}
      </div>

      {/* Chart: Requests by Status */}
      

      

      {/* Table: All Requests */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg text-blue-600 font-semibold mb-2">All Requests</h2>
        <table className="w-full text-sm border">
          <thead className="bg-gray-500">
            <tr>
              <th className="p-2  text-left">Reward</th>
              <th className="p-2 text-left">Points</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <td className="p-2 text-black">{r.name}</td>
                <td className="p-2 text-black">{r.points}</td>
                <td className="p-2 text-black">{r.date}</td>
                <td
                  className={`p-2 font-semibold ${
                    r.status === "Approved"
                      ? "text-green-600"
                      : r.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {r.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart: Points Earned by Date */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg text-blue-600 font-semibold mb-2">Points Earned by Date</h2>
        {pointsPerDate.length === 0 ? (
          <p className="text-gray-500">No approved rewards yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pointsPerDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="points" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}