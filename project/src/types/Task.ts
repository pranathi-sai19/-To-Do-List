export interface Task {
  id: string;
  text: string;
  completed: boolean;
  important: boolean;
  createdAt: Date;
  updatedAt: Date;
  category?: string;
}

export type TaskFilter = 'all' | 'completed' | 'pending' | 'important';

export interface TaskState {
  tasks: Task[];
  filter: TaskFilter;
  searchQuery: string;
  darkMode: boolean;
}