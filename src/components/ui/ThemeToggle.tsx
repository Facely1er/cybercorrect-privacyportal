import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from './Button';
import { useTheme } from '../theme/ThemeProvider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-[1.2rem] w-[1.2rem]" />;
      case 'dark':
        return <Moon className="h-[1.2rem] w-[1.2rem]" />;
      case 'system':
        return <Monitor className="h-[1.2rem] w-[1.2rem]" />;
      default:
        return <Sun className="h-[1.2rem] w-[1.2rem]" />;
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={cycleTheme} 
      className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
      title={`Current theme: ${theme}. Click to cycle through themes.`}
    >
      {getIcon()}
      <span className="sr-only">Toggle theme (current: {theme})</span>
    </Button>
  );
}