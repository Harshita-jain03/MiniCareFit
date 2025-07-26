'use client';
import React, { useState, useEffect } from 'react';
import { getRewardRequests, updateRewardRequest, getRewardStats } from './services';
import type { RewardRequest, RewardStats } from './types';

export default function Rewards() {
  const [rewardRequests, setRewardRequests] = useState<RewardRequest[]>([]);
  const [rewardStats, setRewardStats] = useState<RewardStats | null>(null);

  useEffect(() => {
    loadRewardData();
  }, []);

  const loadRewardData = async () => {
    const [requests, stats] = await Promise.all([
      getRewardRequests(),
      getRewardStats()
    ]);
    setRewardRequests(requests);
    setRewardStats(stats);
  };

  const handleApproveRequest = async (id: string, newPrice?: number) => {
    await updateRewardRequest(id, { status: 'approved', approvedPrice: newPrice });
    loadRewardData();
  };

  const handleRejectRequest = async (id: string) => {
    await updateRewardRequest(id, { status: 'rejected' });
    loadRewardData();
  };

  const handleGiftReward = async (id: string) => {
    await updateRewardRequest(id, { status: 'gifted' });
    loadRewardData();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'gifted':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (!rewardStats) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Rewards Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Rewards</p>
              <p className="text-2xl font-bold text-gray-900">{rewardStats.totalRewards}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <span className="text-xl">🏆</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Earning</p>
              <p className="text-2xl font-bold text-gray-900">{rewardStats.todaysEarning}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <span className="text-xl">📈</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Earning</p>
              <p className="text-2xl font-bold text-gray-900">{rewardStats.averageEarning}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <span className="text-xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl text-gray-900 font-semibold">Reward Requests</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {rewardRequests.map((request) => (
            <div key={request.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{request.icon}</span>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{request.itemName}</h4>
                      <p className="text-sm text-gray-500">Requested by {request.childName}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{request.description}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-500">
                      Original Price: <span className="font-medium">{request.originalPrice} points</span>
                    </span>
                    {request.approvedPrice && request.approvedPrice !== request.originalPrice && (
                      <span className="text-green-600">
                        Approved Price: <span className="font-medium">{request.approvedPrice} points</span>
                      </span>
                    )}
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  {request.status === 'pending' && (
                    <>
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          placeholder="New price"
                          className="w-24 px-2 py-1 text-sm border border-gray-300 rounded"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const newPrice = parseInt((e.target as HTMLInputElement).value);
                              if (newPrice > 0) {
                                handleApproveRequest(request.id, newPrice);
                              }
                            }
                          }}
                        />
                        <button
                          onClick={() => handleApproveRequest(request.id)}
                          className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                      </div>
                      <button
                        onClick={() => handleRejectRequest(request.id)}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  
                  {request.status === 'approved' && (
                    <button
                      onClick={() => handleGiftReward(request.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      🎁 Gift It
                    </button>
                  )}
                  
                  {request.status === 'gifted' && (
                    <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                      ✅ Gifted
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {rewardRequests.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No reward requests at the moment
            </div>
          )}
        </div>
      </div>
    </div>
  );
}