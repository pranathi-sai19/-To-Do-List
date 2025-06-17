import React, { useState } from 'react';
import { Task } from '../types/Task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onToggleImportant: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}

export function TaskList({
  tasks,
  onToggle,
  onToggleImportant,
  onUpdate,
  onDelete,
  onReorder
}: TaskListProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      onReorder(draggedIndex, dragOverIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No tasks found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Add a new task to get started with your productivity journey!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          className={`transition-all duration-200 ${
            dragOverIndex === index ? 'transform scale-105' : ''
          }`}
        >
          <TaskItem
            task={task}
            onToggle={onToggle}
            onToggleImportant={onToggleImportant}
            onUpdate={onUpdate}
            onDelete={onDelete}
            isDragging={draggedIndex === index}
          />
        </div>
      ))}
    </div>
  );
}