"use client";

import { useEffect } from 'react';
import { useAuth } from '@/hooks/auth';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { initializeAuth } = useAuth();

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return unsubscribe; // Cleanup listener on unmount
  }, []); // Remove dependency to prevent infinite loop

  return <>{children}</>;
}