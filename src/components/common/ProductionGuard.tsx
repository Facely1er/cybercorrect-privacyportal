import React from 'react';

interface ProductionGuardProps {
  children: React.ReactNode;
}

export function ProductionGuard({ children }: ProductionGuardProps) {
  // Simple wrapper that just renders children - no complex logic
  return <>{children}</>;
}