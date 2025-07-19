"use client";

import { useState } from "react";
import AddRewardPage from "./add-reward";
import TrackRewardPage from "./track-reward";
import ChildRequestPage from "./child-requests";

export default function ParentRewardDashboard() {
  const [activeTab, setActiveTab] = useState<"add" | "track" | "approve">("add");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">🎁 Parent Reward Panel</h1>

      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setActiveTab("add")}
          className={`px-4 py-2 rounded font-medium transition ${
            activeTab === "add"
              ? "bg-blue-600 text-white"
              : "bg-blue-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          ➕ Add Reward
        </button>

        <button
          onClick={() => setActiveTab("track")}
          className={`px-4 py-2 rounded font-medium transition ${
            activeTab === "track"
              ? "bg-blue-600 text-white"
              : "bg-blue-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          📊 Track Rewards
        </button>

        <button
          onClick={() => setActiveTab("approve")}
          className={`px-4 py-2 rounded font-medium transition ${
            activeTab === "approve"
              ? "bg-blue-600 text-white"
              : "bg-blue-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          ✅ Requested Rewards
        </button>
      </div>

      {/* Render Tabs */}
      <div className="mt-4">
        {activeTab === "add" && <AddRewardPage />}
        {activeTab === "track" && <TrackRewardPage />}
        {activeTab === "approve" && <ChildRequestPage />}
      </div>
    </div>
  );
}
