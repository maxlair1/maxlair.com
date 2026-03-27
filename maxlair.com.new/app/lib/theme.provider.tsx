'use client';

import * as React from 'react';
import { onHandleAppearanceChange } from './utilities';
import { useEffect } from 'react';

const ThemeContext = React.createContext<{
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
}>({
  theme: 'light',
  setTheme: () => {},
});

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({
  initialTheme,
  children,
}: {
  initialTheme: 'light' | 'dark' | 'system';
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = React.useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return initialTheme === 'system' ? getSystemTheme() : initialTheme;
  });

  React.useEffect(() => {
    const resolvedTheme = initialTheme === 'system' ? getSystemTheme() : theme;
    setThemeState(resolvedTheme);
    document.cookie = `theme=${resolvedTheme}; path=/`;
    document.documentElement.dataset.theme = resolvedTheme;
  }, [initialTheme]);

  React.useEffect(() => {
    document.cookie = `theme=${theme}; path=/`;
    document.documentElement.dataset.theme = theme;
    onHandleAppearanceChange(theme === 'dark' ? 'theme-dark' : 'theme-light');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
};


export default function useTheme() {
    const ctx = React.useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider') && console.error('useTheme must be used within ThemeProvider');
    return ctx;
}

export function ThemeScript() {
  useEffect(() => {
    try {
      const theme = localStorage.getItem("theme");
      if (theme) {
        document.documentElement.setAttribute("data-theme", theme);
      }
    } catch {}
  }, []);
  return null;
}