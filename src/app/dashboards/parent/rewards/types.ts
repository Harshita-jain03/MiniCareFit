export interface RewardRequest {
    id: string;
    childName: string;
    itemName: string;
    description: string;
    originalPrice: number;
    approvedPrice?: number;
    status: 'pending' | 'approved' | 'rejected' | 'gifted';
    icon: string;
    createdAt: Date;
  }
  
  export interface RewardStats {
    totalRewards: number;
    todaysEarning: number;
    averageEarning: number;
  }
  
  export interface UpdateRewardRequestData {
    status: 'pending' | 'approved' | 'rejected' | 'gifted';
    approvedPrice?: number;
  }
  