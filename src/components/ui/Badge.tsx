import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'ferpa' | 'coppa' | 'gdpr' | 'ccpa' | 'cpra' | 'pipeda' | 'bipa' | 'shield' | 'sopipa' | 'vcdpa' | 'general';
  level?: 'beginner' | 'intermediate' | 'advanced';
  className?: string;
}

export function Badge({ children, variant = "default", level, className = "" }: BadgeProps) {
  const getVariantStyles = (): string => {
    switch (variant) {
      case 'ferpa':
        return 'bg-blue-100 text-blue-900 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700';
      case 'coppa':
        return 'bg-green-100 text-green-900 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700';
      case 'gdpr':
        return 'bg-purple-100 text-purple-900 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700';
      case 'ccpa':
        return 'bg-purple-100 text-purple-900 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700';
      case 'cpra':
        return 'bg-indigo-100 text-indigo-900 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700';
      case 'pipeda':
        return 'bg-red-100 text-red-900 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700';
      case 'bipa':
        return 'bg-emerald-100 text-emerald-900 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700';
      case 'shield':
        return 'bg-slate-100 text-slate-900 border-slate-200 dark:bg-slate-900/30 dark:text-slate-300 dark:border-slate-700';
      case 'sopipa':
        return 'bg-orange-100 text-orange-900 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700';
      case 'vcdpa':
        return 'bg-teal-100 text-teal-900 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700';
      case 'general':
        return 'bg-gray-100 text-gray-900 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600';
      default:
        return 'bg-gray-100 text-gray-900 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600';
    }
  };

  const getLevelStyles = (): string => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-900 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-900 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-900 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700';
      default:
        return 'bg-gray-100 text-gray-900 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600';
    }
  };

  const styles = level ? getLevelStyles() : getVariantStyles();

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${styles} ${className}`}>
      {children}
    </span>
  );
}