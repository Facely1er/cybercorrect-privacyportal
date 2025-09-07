import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({ children, variant = "default", size = "md", className = "" }: BadgeProps) {
  const getVariantStyles = (): string => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-900 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-900 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700';
      case 'error':
        return 'bg-red-100 text-red-900 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700';
      case 'info':
        return 'bg-blue-100 text-blue-900 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700';
      case 'secondary':
        return 'bg-gray-100 text-gray-900 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600';
      default:
        return 'bg-primary-100 text-primary-900 border-primary-200 dark:bg-primary-900/30 dark:text-primary-300 dark:border-primary-700';
    }
  };

  const getSizeStyles = (): string => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs';
      case 'lg':
        return 'px-3 py-1 text-sm';
      default:
        return 'px-2.5 py-0.5 text-xs';
    }
  };

  const styles = `${getVariantStyles()} ${getSizeStyles()}`;

  return (
    <span className={`inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${styles} ${className}`}>
      {children}
    </span>
  );
}