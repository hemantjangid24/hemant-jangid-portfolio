import { useState, useEffect } from 'react';
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') return localStorage.getItem('theme') || 'dark';
    return 'dark';
  });
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme(p => p==='dark'?'light':'dark');
  return { theme, toggleTheme };
}
