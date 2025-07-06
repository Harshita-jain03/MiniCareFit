export interface ParentProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    children: string[];
    profilePicture?: string;
    statistics: ProfileStatistics;
    preferences: ProfilePreferences;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ProfileStatistics {
    totalTasks: number;
    completedTasks: number;
    totalRewards: number;
    activeDays: number;
    averageTasksPerWeek: number;
  }
  
  export interface ProfilePreferences {
    emailNotifications: boolean;
    pushNotifications: boolean;
    weeklyReports: boolean;
    language: string;
    timezone: string;
  }
  
  export interface UpdateProfileRequest {
    name: string;
    email: string;
    phone: string;
    children: string[];
    preferences?: Partial<ProfilePreferences>;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
  }