"use client";

import { useState } from "react";

interface Reward {
  id: number;
  name: string;
  points: number;
  image: string;
}

export default function RewardRequestPage() {
  const rewards: Reward[] = [
    { id: 1, name: "Frost Guard", points: 500, image: "/rewards/jaket.png" },
    { id: 2, name: "Cycle", points: 10000, image: "/rewards/cycle.png" },
    { id: 3, name: "Drone", points: 20000, image: "/rewards/drone.png" },
  ];

  const [balance] = useState(25000);
  const [requestedIds, setRequestedIds] = useState<number[]>([]);
  const [message, setMessage] = useState("");

  const handleRequest = (reward: Reward) => {
    if (balance < reward.points) {
      setMessage("You don't have enough points to request this reward.");
    } else {
      if (!requestedIds.includes(reward.id)) {
        setRequestedIds([...requestedIds, reward.id]);
        setMessage(`✅ Request for "${reward.name}" has been sent for approval!`);
      }
    }
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-blue-600">🎁 Request Rewards</h1>

      {message && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded border border-green-300 text-gray-800">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rewards.map((reward) => {
          const isRequested = requestedIds.includes(reward.id);
          return (
            <div
              key={reward.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center text-gray-800"
            >
              <img
                src={reward.image}
                alt={reward.name}
                className="w-24 h-24 object-contain mb-2"
              />
              <h3 className="text-lg font-semibold text-blue-700">
                {reward.name}
              </h3>
              <p className="text-sm text-gray-600">Points: {reward.points}</p>
              <button
                onClick={() => handleRequest(reward)}
                className={`mt-3 px-4 py-2 rounded ${
                  isRequested
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                disabled={isRequested}
              >
                {isRequested ? "✅ Requested" : "Request Purchase"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
