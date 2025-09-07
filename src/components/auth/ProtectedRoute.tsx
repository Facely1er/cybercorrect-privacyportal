import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LoadingState } from '../../common/LoadingState';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
  fallbackPath?: string;
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  fallbackPath = '/login' 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, userRole } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return <LoadingState message="Checking authentication..." />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check role-based access if required
  if (requiredRole) {
    const userHasRequiredRole = Array.isArray(requiredRole) 
      ? requiredRole.includes(userRole || '')
      : userRole === requiredRole;

    if (!userHasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
}

// Convenience components for common protection patterns
export function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole={['administrator']}>
      {children}
    </ProtectedRoute>
  );
}

export function StaffRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole={['administrator', 'teacher', 'it-staff']}>
      {children}
    </ProtectedRoute>
  );
}

export function StudentRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole={['student']}>
      {children}
    </ProtectedRoute>
  );
}