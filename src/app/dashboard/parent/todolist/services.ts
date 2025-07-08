"use server";

import { Task, AddTaskData } from './types';

// Dummy data for demonstration
const dummyTasks: Task[] = [
  {
    id: '1',
    name: 'Brush Teeth',
    icon: '🦷',
    description: 'Brush teeth for 2 minutes morning and evening',
    timeToComplete: '5 minutes',
    reward: 50,
    assignedTo: 'Emma',
    status: 'completed',
    createdAt: new Date('2024-06-25'),
  },
  {
    id: '2',
    name: 'Clean Room',
    icon: '🧹',
    description: 'Organize toys and make bed',
    timeToComplete: '20 minutes',
    reward: 100,
    assignedTo: 'Emma',
    status: 'in-progress',
    createdAt: new Date('2024-06-24'),
  },
  {
    id: '3',
    name: 'Read Book',
    icon: '📚',
    description: 'Read at least 10 pages of any book',
    timeToComplete: '30 minutes',
    reward: 150,
    assignedTo: 'Alex',
    status: 'not-started',
    createdAt: new Date('2024-06-23'),
  },
  {
    id: '4',
    name: 'Exercise',
    icon: '🏃',
    description: 'Do physical activity for 15 minutes',
    timeToComplete: '15 minutes',
    reward: 100,
    assignedTo: 'Alex',
    status: 'completed',
    createdAt: new Date('2024-06-22'),
  },
];

export async function getTasks(): Promise<Task[]> {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/parent/tasks');
    // return await response.json();
    
    // Return dummy data for now
    return dummyTasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
}

export async function addTask(data: AddTaskData): Promise<Task | null> {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/parent/tasks', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // return await response.json();
    
    // Simulate adding to dummy data
    const newTask: Task = {
      id: Date.now().toString(),
      ...data,
      assignedTo: 'Emma', // Default assignment
      status: 'not-started',
      createdAt: new Date(),
    };
    dummyTasks.push(newTask);
    return newTask;
  } catch (error) {
    console.error('Error adding task:', error);
    return null;
  }
}

export async function updateTask(id: string, data: AddTaskData): Promise<Task | null> {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/parent/tasks/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // return await response.json();
    
    // Simulate updating dummy data
    const index = dummyTasks.findIndex(task => task.id === id);
    if (index !== -1) {
      dummyTasks[index] = { ...dummyTasks[index], ...data };
      return dummyTasks[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating task:', error);
    return null;
  }
}

export async function deleteTask(id: string): Promise<boolean> {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/parent/tasks/${id}`, {
    //   method: 'DELETE',
    // });
    // return response.ok;
    
    // Simulate deleting from dummy data
    const index = dummyTasks.findIndex(task => task.id === id);
    if (index !== -1) {
      dummyTasks.splice(index, 1);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
}