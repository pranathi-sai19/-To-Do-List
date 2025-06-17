import React from 'react';
import { Moon, Sun, CheckSquare, Trash2 } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onClearCompleted: () => void;
  hasCompletedTasks: boolean;
}

export function Header({
  darkMode,
  onToggleDarkMode,
  onClearCompleted,
  hasCompletedTasks
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500 rounded-lg">
          <CheckSquare className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          TaskFlow
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {hasCompletedTasks && (
          <button
            onClick={onClearCompleted}
            className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
            Clear Completed
          </button>
        )}

        <button
          onClick={onToggleDarkMode}
          className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}