import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, AlertTriangle, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useUser } from '../../hooks/useSupabase';

export function AnonymousBrowsingNotice() {
  const [dismissed, setDismissed] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we should show the notice
  useEffect(() => {
    const noticeDismissed = localStorage.getItem('anonymous_notice_dismissed');
    if (noticeDismissed === 'true') {
      setDismissed(true);
    }
  }, []);
  
  // Don't show for logged in users or on auth pages
  if (user || dismissed || 
      location.pathname.includes('/login') || 
      location.pathname.includes('/register')) {
    return null;
  }
  
  const handleDismiss = () => {
    localStorage.setItem('anonymous_notice_dismissed', 'true');
    setDismissed(true);
  };
  
  const handleLogin = () => {
    navigate('/login', { state: { from: location } });
  };
  
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800 py-2 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center text-sm text-blue-700 dark:text-blue-300">
          <User className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>
            You're browsing as a guest. <span className="hidden sm:inline">Progress and settings will be saved locally on this device only.</span>
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={handleLogin}>
            Log In
          </Button>
          <Button size="sm" variant="ghost" onClick={handleDismiss} className="text-blue-700 dark:text-blue-300">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}