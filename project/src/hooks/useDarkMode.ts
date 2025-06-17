import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useDarkMode() {
  const [darkMode, setDarkMode] = useLocalStorage('todo-dark-mode', false);

  useEffect(() => {
    // Check system preference on first load
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (!localStorage.getItem('todo-dark-mode')) {
      setDarkMode(mediaQuery.matches);
    }

    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('todo-dark-mode')) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setDarkMode]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return [darkMode, setDarkMode] as const;
}