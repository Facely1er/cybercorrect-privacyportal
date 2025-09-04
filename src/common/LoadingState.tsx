import React from 'react';
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface LoadingStateProps {
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  children?: React.ReactNode;
  loadingMessage?: string;
  emptyMessage?: string;
  emptyAction?: {
    label: string;
    onClick: () => void;
  };
}

export function LoadingState({
  loading = false,
  error = null,
  onRetry,
  children,
  loadingMessage = 'Loading...',
  emptyMessage = 'No data available',
  emptyAction
}: LoadingStateProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <Loader2 className="h-10 w-10 animate-spin text-primary-600 dark:text-primary-400 mx-auto mb-4" />
          <p className="text-muted-foreground">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 shadow-sm max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
          <p className="text-muted-foreground mb-4 text-center">{error}</p>
          
          {onRetry && (
            <Button onClick={onRetry} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (!children) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">{emptyMessage}</h3>
          {emptyAction && (
            <Button onClick={emptyAction.onClick} className="mt-4">
              {emptyAction.label}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}