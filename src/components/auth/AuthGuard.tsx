import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Zap } from 'lucide-react';
interface AuthGuardProps {
  children: React.ReactNode;
}
export function AuthGuard({ children }: AuthGuardProps) {
  const isAuthenticated = useAuth((s) => s.isAuthenticated);
  const isLoading = useAuth((s) => s.isLoading);
  const location = useLocation();
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-[100]">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
          <Zap className="size-16 text-primary relative animate-bounce" fill="currentColor" />
        </div>
        <p className="mt-8 text-lg font-medium animate-pulse">Authenticating Session...</p>
      </div>
    );
  }
  if (!isAuthenticated) {
    // We redirect to landing but the LandingPage will handle opening the LoginModal if state passed
    return <Navigate to="/" state={{ from: location, triggerLogin: true }} replace />;
  }
  return <>{children}</>;
}