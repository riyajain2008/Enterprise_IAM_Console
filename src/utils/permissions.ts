
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: {
    [resource: string]: string[];
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  availableRoles: Role[];
  activeRole?: Role;
}

// Mock roles data
export const mockRoles: Role[] = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full access to all resources and actions',
    permissions: {
      s3: ['read', 'create', 'upload', 'delete'],
      dynamodb: ['read', 'create', 'update', 'delete'],
      lambda: ['read', 'create', 'deploy', 'delete', 'logs'],
      apigateway: ['read', 'create', 'update', 'delete'],
      cloudfront: ['read', 'create', 'invalidate', 'delete'],
      route53: ['read', 'create', 'update', 'delete']
    }
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Development and deployment permissions',
    permissions: {
      s3: ['read', 'upload'],
      dynamodb: ['read', 'create', 'update'],
      lambda: ['read', 'create', 'deploy', 'logs'],
      apigateway: ['read', 'create', 'update'],
      cloudfront: ['read'],
      route53: ['read']
    }
  },
  {
    id: 'readonly',
    name: 'ReadOnly',
    description: 'Read-only access to resources',
    permissions: {
      s3: ['read'],
      dynamodb: ['read'],
      lambda: ['read', 'logs'],
      apigateway: ['read'],
      cloudfront: ['read'],
      route53: ['read']
    }
  }
];

export const hasPermission = (activeRole: Role | null, resource: string, action: string): boolean => {
  if (!activeRole) return false;
  
  const resourcePermissions = activeRole.permissions[resource];
  return resourcePermissions ? resourcePermissions.includes(action) : false;
};

export const getStoredRole = (): Role | null => {
  const stored = localStorage.getItem('activeRole');
  return stored ? JSON.parse(stored) : null;
};

export const setStoredRole = (role: Role): void => {
  localStorage.setItem('activeRole', JSON.stringify(role));
};

export const clearStoredRole = (): void => {
  localStorage.removeItem('activeRole');
};
