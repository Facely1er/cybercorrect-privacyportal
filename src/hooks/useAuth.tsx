import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './useSupabase';

interface AuthContextType {
  user: any;
  profile: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  checkingSession: boolean;
  userRole: string | null;
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signUp: (email: string, password: string, userData: Record<string, unknown>) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
  updateProfile: (updates: any) => Promise<{ data: any; error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, loading, error, signIn, signUp, signOut, updateProfile } = useUser();
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    // Set checking session to false after initial load
    if (!loading) {
      setCheckingSession(false);
    }
  }, [loading]);

  const userRole = profile?.role || null;
  const isAuthenticated = !!user && !loading;

  const value = {
    user,
    profile,
    isAuthenticated,
    isLoading: loading,
    error,
    checkingSession,
    userRole,
    signIn,
    signUp,
    signOut,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};