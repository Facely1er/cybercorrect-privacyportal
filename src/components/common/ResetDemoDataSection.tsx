import React, { useState } from 'react';
import { AlertCircle, Trash2, RotateCcw, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNotifications, createNotification } from '../../contexts/NotificationContext';
import { demoDataService } from '../../services/demoDataService';
import { DataExportImport } from './DataExportImport';

interface ResetDemoDataSectionProps {
  className?: string;
  variant?: 'default' | 'sidebar' | 'minimal';
  title?: string;
}

export function ResetDemoDataSection({ 
  className = '', 
  variant = 'default',
  title = 'Reset Demo Data'
}: ResetDemoDataSectionProps) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const { addNotification } = useNotifications();

  const handleResetDemoData = () => {
    try {
      // Use the demo data service for proper cleanup
      demoDataService.flushDemoData();
      
      setShowResetConfirm(false);
      setResetSuccess(true);
      
      // Add notification for data reset
      addNotification(createNotification.dataReset());
      
      // Hide success message after a brief moment, then reload the page
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error('Error resetting demo data:', error);
      alert('Error resetting demo data. Please try again.');
    }
  };

  if (variant === 'minimal') {
    return (
      <div className={`${className} mt-6`}>
        {!showResetConfirm && !resetSuccess ? (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowResetConfirm(true)}
            className="min-w-max border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Reset Demo Data
          </Button>
        ) : showResetConfirm ? (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowResetConfirm(false)}
            >
              Cancel
            </Button>
            <Button 
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleResetDemoData}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Confirm Reset
            </Button>
          </div>
        ) : (
          <div className="flex items-center text-green-600 dark:text-green-400">
            <CheckCircle className="mr-2 h-4 w-4" />
            Data has been reset
          </div>
        )}
        
        {/* Data Management Tools */}
        <div className="mt-6">
          <DataExportImport showDemoControls={false} />
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-4 ${className}`}>
        <h3 className="text-base font-medium mb-2 flex items-center">
          <RotateCcw className="h-4 w-4 mr-2" />
          {title}
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          Clear all stored demo data including assessment progress, training completion, and user preferences.
          Theme settings will be preserved.
        </p>
        
        {resetSuccess ? (
          <div className="p-2 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded flex items-center justify-center gap-2 text-green-700 dark:text-green-300 text-sm">
            <CheckCircle className="h-4 w-4" />
            <span>Data reset successful!</span>
          </div>
        ) : showResetConfirm ? (
          <div className="space-y-3">
            <div className="p-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-300 text-xs">
                <AlertCircle className="h-4 w-4" />
                <span>This action cannot be undone.</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={handleResetDemoData}
              >
                Reset
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowResetConfirm(true)}
            className="w-full border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Reset Demo Data
          </Button>
        )}
        
        {/* Data Management Tools */}
        <div className="mt-4">
          <DataExportImport showDemoControls={false} />
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
          <RotateCcw className="h-5 w-5" />
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto text-center">
          Clear all stored demo data including assessment progress, training completion, and user preferences. 
          This will reset the application to its initial state (theme settings will be preserved).
        </p>
        
        {resetSuccess ? (
          <div className="mb-8 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-300">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Demo data has been successfully reset!</span>
            </div>
          </div>
        ) : !showResetConfirm ? (
          <Button 
            variant="outline" 
            onClick={() => setShowResetConfirm(true)}
            className="mx-auto block min-w-max border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Reset Demo Data
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-300 mb-2">
                <AlertCircle className="h-4 w-4" />
                <span className="font-medium">Confirm Reset</span>
              </div>
              <p className="text-sm text-red-600 dark:text-red-400">
                This action cannot be undone. All demo data will be permanently removed.
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button 
                variant="outline" 
                onClick={() => setShowResetConfirm(false)}
                size="sm"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleResetDemoData}
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Yes, Reset Data
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}