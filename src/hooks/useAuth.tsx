import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './useSupabase';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  checkingSession: boolean;
  userRole: string | null;
  signIn: (email: string, password: string) => Promise<{ data: AuthResponse | null; error: AuthError | null }>;
  signUp: (email: string, password: string, userData: Record<string, unknown>) => Promise<{ data: AuthResponse | null; error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ data: Profile | null; error: AuthError | null }>;
}

interface User {
  id: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

interface AuthResponse {
  user: User;
  session: Session;
}

interface Session {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  expires_in: number;
  token_type: string;
  user: User;
}

interface AuthError {
  message: string;
  status?: number;
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