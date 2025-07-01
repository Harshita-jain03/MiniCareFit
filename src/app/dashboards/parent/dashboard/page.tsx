import React from 'react';
import StatsCard from '../_components/StatsCard';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Tasks"
          value="12"
          icon="✅"
          color="blue"
        />
        <StatsCard
          title="Completed Today"
          value="5"
          icon="🎯"
          color="green"
        />
        <StatsCard
          title="Total Rewards"
          value="850"
          icon="🏆"
          color="yellow"
        />
        <StatsCard
          title="Food Items"
          value="24"
          icon="🍎"
          color="red"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl text-gray-900 font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center text-gray-800 justify-between py-2 border-b">
            <span>Emma completed "Brush teeth"</span>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center text-gray-800 justify-between py-2 border-b">
            <span>New food item "Apple" added</span>
            <span className="text-sm text-gray-500">4 hours ago</span>
          </div>
          <div className="flex items-center text-gray-800 justify-between py-2">
            <span>Reward request: "New toy car"</span>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}