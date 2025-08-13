import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './useSupabase';
import { User } from '@supabase/supabase-js';
import { Profile } from '../lib/supabase';
import { useLocation } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  checkingSession: boolean;
  userRole: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  checkingSession: true,
  userRole: null
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, loading, error } = useUser();
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    // When user data loads, we're done checking the session
    if (!loading) {
      setCheckingSession(false);
    }
  }, [loading]);

  // Determine user role from profile
  const userRole = profile?.role || null;
  
  // Determine if user is authenticated
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        profile, 
        isAuthenticated, 
        isLoading: loading, 
        error: error ? String(error) : null,
        checkingSession,
        userRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface RequireAuthProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

/**
 * A component that redirects to the login page if the user is not authenticated
 */
function RequireAuth({ children, allowedRoles }: RequireAuthProps) {
  const { user, profile, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return <LoadingState loading={true} loadingMessage="Verifying authentication..." />;
  }

  return <>{children}</>;
}