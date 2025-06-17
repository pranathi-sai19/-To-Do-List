import React, { useState } from 'react';
import { Check, Star, Edit2, Trash2, GripVertical } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onToggleImportant: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  isDragging?: boolean;
}

export function TaskItem({
  task,
  onToggle,
  onToggleImportant,
  onUpdate,
  onDelete,
  isDragging = false
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim() && editText !== task.text) {
      onUpdate(task.id, { text: editText.trim() });
    }
    setIsEditing(false);
    setEditText(task.text);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div
      className={`group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 transition-all duration-200 hover:shadow-md ${
        isDragging ? 'shadow-lg rotate-2 scale-105' : ''
      } ${task.completed ? 'opacity-75' : ''}`}
    >
      <div className="flex items-center gap-3">
        <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <GripVertical className="w-4 h-4" />
        </div>

        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
          }`}
        >
          {task.completed && <Check className="w-3 h-3" />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className="w-full px-2 py-1 bg-transparent border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
              maxLength={500}
            />
          ) : (
            <p
              className={`text-gray-900 dark:text-white transition-all duration-200 ${
                task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
              }`}
            >
              {task.text}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {task.createdAt.toLocaleDateString()}
            </span>
            {task.important && (
              <Star className="w-3 h-3 text-amber-500 fill-current" />
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onToggleImportant(task.id)}
            className={`p-1.5 rounded transition-colors duration-200 ${
              task.important
                ? 'text-amber-500 hover:text-amber-600'
                : 'text-gray-400 hover:text-amber-500'
            }`}
            title="Toggle important"
          >
            <Star className={`w-4 h-4 ${task.important ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-gray-400 hover:text-blue-500 rounded transition-colors duration-200"
            title="Edit task"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-gray-400 hover:text-red-500 rounded transition-colors duration-200"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}