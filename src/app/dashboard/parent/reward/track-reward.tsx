"use client";
import { useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type Reward = {
  id: number;
  name: string;
  points: number;
  tasks: Task[];
  requested: boolean;
  approved: boolean;
  given: boolean;
};

export default function RewardTrackerPage() {
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: 1,
      name: "Cycle",
      points: 10000,
      tasks: [
        { id: 1, title: "Daily 1 hour study", completed: true },
        { id: 2, title: "Finish homework", completed: true },
      ],
      requested: true,
      approved: true,
      given: false,
    },
    {
      id: 2,
      name: "Telescope",
      points: 5000,
      tasks: [
        { id: 3, title: "Wake up at 6 AM", completed: true },
        { id: 4, title: "Drink 2L water", completed: true },
      ],
      requested: true,
      approved: false,
      given: false,
    },
  ]);

  const toggleTask = (rewardId: number, taskId: number) => {
    setRewards((prev) =>
      prev.map((reward) =>
        reward.id === rewardId
          ? {
              ...reward,
              tasks: reward.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : reward
      )
    );
  };

  const handleRequest = (rewardId: number) => {
    setRewards((prev) =>
      prev.map((reward) =>
        reward.id === rewardId ? { ...reward, requested: true } : reward
      )
    );
  };

  const handleGiveReward = (rewardId: number) => {
    setRewards((prev) =>
      prev.map((reward) =>
        reward.id === rewardId ? { ...reward, given: true } : reward
      )
    );
  };

  const allTasksCompleted = (tasks: Task[]) =>
    tasks.length > 0 && tasks.every((task) => task.completed);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-blue-600">🎯 Track Your Rewards</h1>

      {rewards.map((reward) => (
        <div key={reward.id} className="bg-white p-4 rounded shadow space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-blue-700">
              {reward.name} ({reward.points} pts)
            </h2>

            {reward.given ? (
              <span className="text-green-600 font-medium">🎁 Reward Given</span>
            ) : reward.approved && allTasksCompleted(reward.tasks) ? (
              <button
                onClick={() => handleGiveReward(reward.id)}
                className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
              >
                🎁 Give Reward
              </button>
            ) : reward.approved && reward.requested && allTasksCompleted(reward.tasks) ? (
              <span className="text-green-600 font-medium">
                ✅ Reward Completed Successfully
              </span>
            ) : reward.requested ? (
              <span className="text-yellow-600 font-medium">⏳ Pending Approval</span>
            ) : allTasksCompleted(reward.tasks) ? (
              <button
                onClick={() => handleRequest(reward.id)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                ✅ Request Reward
              </button>
            ) : (
              <span className="text-gray-500 text-sm">Incomplete</span>
            )}
          </div>

          {/* Task List */}
          <ul className="space-y-1">
            {reward.tasks.map((task) => (
              <li key={task.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(reward.id, task.id)}
                  className="accent-blue-600"
                />
                <span
                  className={`${
                    task.completed ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {task.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
