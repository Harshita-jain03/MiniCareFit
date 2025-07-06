export interface Task {
    id: string;
    name: string;
    icon: string;
    description: string;
    timeToComplete: string;
    reward: number;
    assignedTo: string;
    status: 'not-started' | 'in-progress' | 'completed';
    createdAt: Date;
  }
  
  export interface AddTaskData {
    name: string;
    icon: string;
    description: string;
    timeToComplete: string;
    reward: number;
  }