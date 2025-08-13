import React from 'react';

interface ProductionGuardProps {
  children: React.ReactNode;
}

export function ProductionGuard({ children }: ProductionGuardProps) {
  return <>{children}</>;
}