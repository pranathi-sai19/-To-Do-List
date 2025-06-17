import React from 'react';
import { useTasks } from '../hooks/useTasks';
import { useDarkMode } from '../hooks/useDarkMode';
import { Header } from './Header';
import { AddTaskForm } from './AddTaskForm';
import { SearchBar } from './SearchBar';
import { FilterTabs } from './FilterTabs';
import { TaskList } from './TaskList';

export function TodoApp() {
  const {
    tasks,
    filter,
    searchQuery,
    taskStats,
    setFilter,
    setSearchQuery,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    toggleImportant,
    clearCompleted,
    reorderTasks
  } = useTasks();

  const [darkMode, setDarkMode] = useDarkMode();

  const hasCompletedTasks = taskStats.completed > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Header
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onClearCompleted={clearCompleted}
          hasCompletedTasks={hasCompletedTasks}
        />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <AddTaskForm onAddTask={addTask} />
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <FilterTabs
            currentFilter={filter}
            onFilterChange={setFilter}
            taskStats={taskStats}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onToggleImportant={toggleImportant}
            onUpdate={updateTask}
            onDelete={deleteTask}
            onReorder={reorderTasks}
          />
        </div>

        {taskStats.total > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {taskStats.completed} of {taskStats.total} tasks completed
              {taskStats.important > 0 && ` • ${taskStats.important} important tasks remaining`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}