import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, X } from 'lucide-react';

export function OfflineStatusIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showReconnected, setShowReconnected] = useState(false);
  
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      // Auto-hide the reconnected message after 3 seconds
      setTimeout(() => setShowReconnected(false), 3000);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setIsDismissed(false); // Reset dismissed state when going offline
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Don't render anything if online and not showing the reconnected message
  if (isOnline && !showReconnected) return null;
  
  // Don't render if the offline message was dismissed
  if (!isOnline && isDismissed) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md animate-fadeIn">
      {!isOnline ? (
        <div className="bg-amber-100 dark:bg-amber-900 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 p-4 rounded-lg shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <WifiOff className="h-5 w-5 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium">You're offline</p>
                <p className="text-sm">You can still use most features. Your progress will be saved locally and sync when you reconnect.</p>
              </div>
            </div>
            <button 
              onClick={() => setIsDismissed(true)}
              className="ml-3 flex-shrink-0 text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : showReconnected && (
        <div className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200 p-4 rounded-lg shadow-lg">
          <div className="flex items-center">
            <Wifi className="h-5 w-5 mr-3 flex-shrink-0" />
            <p className="font-medium">You're back online! Syncing your data...</p>
          </div>
        </div>
      )}
    </div>
  );
}