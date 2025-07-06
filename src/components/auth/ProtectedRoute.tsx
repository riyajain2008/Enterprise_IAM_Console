
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermissions: string[];
  requireAll?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredPermissions, 
  requireAll = false 
}) => {
  const { user, hasPermission, hasAnyPermission } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = requireAll 
    ? requiredPermissions.every(permission => hasPermission(permission))
    : hasAnyPermission(requiredPermissions);

  if (!hasAccess) {
    return <Navigate to="/access-denied" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
