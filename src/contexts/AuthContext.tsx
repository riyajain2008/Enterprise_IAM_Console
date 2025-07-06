
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Mock user with permissions - in real app, this would come from login API
  const [user, setUser] = useState<User | null>({
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'Administrator',
    permissions: [
      'read:projects',
      'write:projects',
      'read:audit-logs',
      'read:billing',
      'manage:billing',
      'read:users',
      'write:users',
      'read:roles',
      'write:roles'
    ]
  });

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false;
  };

  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  return (
    <AuthContext.Provider value={{ user, setUser, hasPermission, hasAnyPermission }}>
      {children}
    </AuthContext.Provider>
  );
};
