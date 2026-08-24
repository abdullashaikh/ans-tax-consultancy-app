import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useClientAuth } from '../../context/ClientAuthContext';

interface ClientProtectedRouteProps {
  children: ReactNode;
}

export const ClientProtectedRoute: React.FC<ClientProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useClientAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
            Verifying Client Session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/portal/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
