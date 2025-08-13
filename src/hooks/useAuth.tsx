// Simplified auth hook to prevent deployment issues
export const useAuth = () => {
  return {
    user: null,
    profile: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    checkingSession: false,
    userRole: null
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};