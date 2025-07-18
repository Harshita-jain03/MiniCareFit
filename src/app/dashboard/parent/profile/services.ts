"use server";

import type { ParentProfile, UpdateProfileRequest, ApiResponse } from './types';

const dummyProfile: ParentProfile = {
  id: "parent_123",
  name: "Reshma K",
  email: "reshma.k@email.com",
  phone: "+1 (555) 123-4567",
  children: ["Emma K", "Liam K", "Olivia K"],
  profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b586?w=150&h=150&fit=crop&crop=face",
  statistics: {
    totalTasks: 87,
    completedTasks: 64,
    totalRewards: 3250,
    activeDays: 45,
    averageTasksPerWeek: 12
  },
  preferences: {
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    language: "en",
    timezone: "America/New_York"
  },
  createdAt: "2024-01-15T09:00:00Z",
  updatedAt: "2024-06-28T14:30:00Z"
};

export async function getParentProfile(): Promise<ParentProfile | null> {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (process.env.NODE_ENV === 'development') {
      return dummyProfile;
    }

    const response = await fetch(`${process.env.API_BASE_URL}/api/parent/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    const result: ApiResponse<ParentProfile> = await response.json();

    if (result.success && result.data) {
      return result.data;
    }

    return null;
  } catch (error) {
    console.error('Error fetching parent profile:', error);
    return dummyProfile;
  }
}

export async function updateParentProfile(profileData: UpdateProfileRequest): Promise<ParentProfile | null> {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (process.env.NODE_ENV === 'development') {
      const updatedProfile: ParentProfile = {
        ...dummyProfile,
        ...profileData,
        preferences: {
          ...dummyProfile.preferences,
          ...(profileData.preferences ?? {}),
        },
        updatedAt: new Date().toISOString(),
      };
      return updatedProfile;
    }

    const response = await fetch(`${process.env.API_BASE_URL}/api/parent/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    const result: ApiResponse<ParentProfile> = await response.json();

    if (result.success && result.data) {
      return result.data;
    }

    return null;
  } catch (error) {
    console.error('Error updating parent profile:', error);

    const updatedProfile: ParentProfile = {
      ...dummyProfile,
      ...profileData,
      preferences: {
        ...dummyProfile.preferences,
        ...(profileData.preferences ?? {}),
      },
      updatedAt: new Date().toISOString(),
    };

    return updatedProfile;
  }
}

export async function uploadProfilePicture(file: File): Promise<string | null> {
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (process.env.NODE_ENV === 'development') {
      return "https://images.unsplash.com/photo-1494790108755-2616b612b586?w=150&h=150&fit=crop&crop=face";
    }

    const formData = new FormData();
    formData.append('profilePicture', file);

    const response = await fetch(`${process.env.API_BASE_URL}/api/parent/profile/picture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload profile picture');
    }

    const result: ApiResponse<{ url: string }> = await response.json();

    if (result.success && result.data) {
      return result.data.url;
    }

    return null;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    return null;
  }
}

export async function deleteAccount(): Promise<boolean> {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch(`${process.env.API_BASE_URL}/api/parent/account`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete account');
    }

    const result: ApiResponse<null> = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error deleting account:', error);
    return false;
  }
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch(`${process.env.API_BASE_URL}/api/parent/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to change password');
    }

    const result: ApiResponse<null> = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error changing password:', error);
    return false;
  }
}