import React, { useState } from 'react';
import { Plus, Star } from 'lucide-react';

interface AddTaskFormProps {
  onAddTask: (text: string, important: boolean) => void;
}

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [text, setText] = useState('');
  const [important, setImportant] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text, important);
      setText('');
      setImportant(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
            className="w-full px-4 py-3 pr-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            maxLength={500}
          />
          <button
            type="button"
            onClick={() => setImportant(!important)}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded transition-colors duration-200 ${
              important
                ? 'text-amber-500 hover:text-amber-600'
                : 'text-gray-400 hover:text-amber-500'
            }`}
            title="Mark as important"
          >
            <Star className={`w-4 h-4 ${important ? 'fill-current' : ''}`} />
          </button>
        </div>
        <button
          type="submit"
          disabled={!text.trim()}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>
      {text.length > 450 && (
        <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
          {500 - text.length} characters remaining
        </p>
      )}
    </form>
  );
}