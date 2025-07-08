"use server";

import { RewardRequest, RewardStats, UpdateRewardRequestData } from './types';

// Dummy data for demonstration
const dummyRewardRequests: RewardRequest[] = [
  {
    id: '1',
    childName: 'Emma',
    itemName: 'New Toy Car',
    description: 'A red racing car toy that I saw in the store window',
    originalPrice: 200,
    status: 'pending',
    icon: '🚗',
    createdAt: new Date('2024-06-29'),
  },
  {
    id: '2',
    childName: 'Alex',
    itemName: 'Video Game',
    description: 'The new adventure game that my friends are playing',
    originalPrice: 300,
    approvedPrice: 250,
    status: 'approved',
    icon: '🎮',
    createdAt: new Date('2024-06-28'),
  },
  {
    id: '3',
    childName: 'Emma',
    itemName: 'Art Supplies',
    description: 'Colored pencils and drawing pad for my art projects',
    originalPrice: 150,
    status: 'gifted',
    icon: '🎨',
    createdAt: new Date('2024-06-27'),
  },
];

const dummyRewardStats: RewardStats = {
  totalRewards: 850,
  todaysEarning: 150,
  averageEarning: 120,
};

export async function getRewardRequests(): Promise<RewardRequest[]> {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/parent/reward-requests');
    // return await response.json();
    
    // Return dummy data for now
    return dummyRewardRequests;
  } catch (error) {
    console.error('Error fetching reward requests:', error);
    return [];
  }
}

export async function getRewardStats(): Promise<RewardStats> {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/parent/reward-stats');
    // return await response.json();
    
    // Return dummy data for now
    return dummyRewardStats;
  } catch (error) {
    console.error('Error fetching reward stats:', error);
    return { totalRewards: 0, todaysEarning: 0, averageEarning: 0 };
  }
}

export async function updateRewardRequest(id: string, data: UpdateRewardRequestData): Promise<RewardRequest | null> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/parent/reward-requests/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // return await response.json();
      
      // Simulate updating dummy data
      const index = dummyRewardRequests.findIndex(request => request.id === id);
      if (index !== -1) {
        dummyRewardRequests[index] = { ...dummyRewardRequests[index], ...data };
        return dummyRewardRequests[index];
      }
      return null;
    } catch (error) {
      console.error('Error updating reward request:', error);
      return null;
    }
  }