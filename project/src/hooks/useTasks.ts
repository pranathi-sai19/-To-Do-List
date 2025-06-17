import { useState, useEffect, useMemo } from 'react';
import { Task, TaskFilter } from '../types/Task';
import { useLocalStorage } from './useLocalStorage';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('todo-tasks', []);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Convert stored dates back to Date objects
  useEffect(() => {
    setTasks(current => 
      current.map(task => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt)
      }))
    );
  }, []);

  const addTask = (text: string, important: boolean = false) => {
    if (!text.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      important,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setTasks(current => [newTask, ...current]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(current =>
      current.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(current => current.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    updateTask(id, { completed: !tasks.find(t => t.id === id)?.completed });
  };

  const toggleImportant = (id: string) => {
    updateTask(id, { important: !tasks.find(t => t.id === id)?.important });
  };

  const clearCompleted = () => {
    setTasks(current => current.filter(task => !task.completed));
  };

  const reorderTasks = (startIndex: number, endIndex: number) => {
    setTasks(current => {
      const result = Array.from(current);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Filter by completion status
      if (filter === 'completed' && !task.completed) return false;
      if (filter === 'pending' && task.completed) return false;
      if (filter === 'important' && !task.important) return false;

      // Filter by search query
      if (searchQuery.trim()) {
        return task.text.toLowerCase().includes(searchQuery.toLowerCase());
      }

      return true;
    });
  }, [tasks, filter, searchQuery]);

  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const important = tasks.filter(t => t.important && !t.completed).length;

    return { total, completed, pending, important };
  }, [tasks]);

  return {
    tasks: filteredTasks,
    allTasks: tasks,
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
  };
}