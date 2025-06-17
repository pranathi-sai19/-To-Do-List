import React from 'react';
import { TaskFilter } from '../types/Task';
import { ListTodo, CheckCircle, Clock, Star } from 'lucide-react';

interface FilterTabsProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  taskStats: {
    total: number;
    completed: number;
    pending: number;
    important: number;
  };
}

export function FilterTabs({ currentFilter, onFilterChange, taskStats }: FilterTabsProps) {
  const tabs = [
    {
      key: 'all' as TaskFilter,
      label: 'All',
      icon: ListTodo,
      count: taskStats.total,
    },
    {
      key: 'pending' as TaskFilter,
      label: 'Pending',
      icon: Clock,
      count: taskStats.pending,
    },
    {
      key: 'completed' as TaskFilter,
      label: 'Completed',
      icon: CheckCircle,
      count: taskStats.completed,
    },
    {
      key: 'important' as TaskFilter,
      label: 'Important',
      icon: Star,
      count: taskStats.important,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tabs.map(({ key, label, icon: Icon, count }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            currentFilter === key
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span>{label}</span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              currentFilter === key
                ? 'bg-white/20 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            {count}
          </span>
        </button>
      ))}
    </div>
  );
}