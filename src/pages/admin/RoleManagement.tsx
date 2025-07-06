
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Shield, Plus, MoreHorizontal, Edit, Trash2, Users, Key } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  createdAt: string;
  isSystem: boolean;
}

const RoleManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const [roles] = useState<Role[]>([
    {
      id: "1",
      name: "Super Admin",
      description: "Full system access with all administrative privileges",
      permissions: ["*"],
      userCount: 2,
      createdAt: "2024-01-01T00:00:00Z",
      isSystem: true,
    },
    {
      id: "2",
      name: "Administrator",
      description: "Administrative access to most system features",
      permissions: [
        "users:read", "users:write", "users:delete",
        "roles:read", "roles:write",
        "policies:read", "policies:write",
        "audit:read"
      ],
      userCount: 5,
      createdAt: "2024-01-01T00:00:00Z",
      isSystem: true,
    },
    {
      id: "3",
      name: "Manager",
      description: "Team management and reporting capabilities",
      permissions: [
        "users:read", "users:write",
        "roles:read",
        "policies:read",
        "audit:read",
        "reports:read"
      ],
      userCount: 12,
      createdAt: "2024-01-02T00:00:00Z",
      isSystem: false,
    },
    {
      id: "4",
      name: "Developer",
      description: "Development team access to technical resources",
      permissions: [
        "api:read", "api:write",
        "keys:read", "keys:write",
        "logs:read"
      ],
      userCount: 25,
      createdAt: "2024-01-03T00:00:00Z",
      isSystem: false,
    },
    {
      id: "5",
      name: "User",
      description: "Standard user access to basic features",
      permissions: [
        "profile:read", "profile:write",
        "dashboard:read"
      ],
      userCount: 1203,
      createdAt: "2024-01-01T00:00:00Z",
      isSystem: true,
    },
  ]);

  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  });

  const availablePermissions = [
    { category: "Users", permissions: ["users:read", "users:write", "users:delete"] },
    { category: "Roles", permissions: ["roles:read", "roles:write", "roles:delete"] },
    { category: "Policies", permissions: ["policies:read", "policies:write", "policies:delete"] },
    { category: "API Keys", permissions: ["keys:read", "keys:write", "keys:delete"] },
    { category: "Audit", permissions: ["audit:read", "audit:write"] },
    { category: "Reports", permissions: ["reports:read", "reports:write"] },
    { category: "System", permissions: ["system:read", "system:write", "system:admin"] },
  ];

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // API call would go here
      toast({
        title: "Role created successfully",
        description: `${newRole.name} role has been created.`,
      });
      setIsCreateModalOpen(false);
      setNewRole({ name: "", description: "", permissions: [] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create role. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsEditModalOpen(true);
  };

  const handleDeleteRole = async (roleId: string, roleName: string) => {
    try {
      // API call would go here
      toast({
        title: "Role deleted",
        description: `${roleName} role has been deleted.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete role.",
        variant: "destructive",
      });
    }
  };

  const togglePermission = (permission: string, roleData: any, setRoleData: any) => {
    const currentPermissions = roleData.permissions;
    const updatedPermissions = currentPermissions.includes(permission)
      ? currentPermissions.filter((p: string) => p !== permission)
      : [...currentPermissions, permission];
    
    setRoleData({ ...roleData, permissions: updatedPermissions });
  };

  const PermissionSelector = ({ roleData, setRoleData }: any) => (
    <div className="space-y-4">
      <Label>Permissions</Label>
      <div className="space-y-4 max-h-64 overflow-y-auto">
        {availablePermissions.map((category) => (
          <div key={category.category} className="border rounded-lg p-3">
            <h4 className="font-medium text-sm mb-2">{category.category}</h4>
            <div className="space-y-2">
              {category.permissions.map((permission) => (
                <div key={permission} className="flex items-center space-x-2">
                  <input
                    id={permission}
                    type="checkbox"
                    checked={roleData.permissions.includes(permission)}
                    onChange={() => togglePermission(permission, roleData, setRoleData)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor={permission} className="text-sm font-normal">
                    {permission}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Shield className="w-8 h-8 mr-3" />
            Role Management
          </h1>
          <p className="text-gray-600 mt-1">Manage user roles and their permissions</p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>
                Define a new role with specific permissions for your users.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateRole} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roleName">Role Name</Label>
                <Input
                  id="roleName"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  placeholder="e.g., Content Manager"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="roleDescription">Description</Label>
                <Textarea
                  id="roleDescription"
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  placeholder="Describe what this role can do..."
                  rows={3}
                />
              </div>

              <PermissionSelector roleData={newRole} setRoleData={setNewRole} />

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Role</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Card key={role.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  {role.name}
                  {role.isSystem && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      System
                    </Badge>
                  )}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem onClick={() => handleEditRole(role)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Role
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Users className="mr-2 h-4 w-4" />
                      View Users
                    </DropdownMenuItem>
                    {!role.isSystem && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteRole(role.id, role.name)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Role
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="text-sm">
                {role.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Users with this role:</span>
                <Badge variant="outline" className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {role.userCount}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Permissions:</span>
                  <Badge variant="outline" className="flex items-center">
                    <Key className="w-3 h-3 mr-1" />
                    {role.permissions.includes("*") ? "All" : role.permissions.length}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {role.permissions.includes("*") ? (
                    <Badge className="text-xs bg-red-100 text-red-800">Full Access</Badge>
                  ) : (
                    role.permissions.slice(0, 3).map((permission) => (
                      <Badge key={permission} variant="secondary" className="text-xs">
                        {permission}
                      </Badge>
                    ))
                  )}
                  {role.permissions.length > 3 && !role.permissions.includes("*") && (
                    <Badge variant="secondary" className="text-xs">
                      +{role.permissions.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="text-xs text-gray-500 pt-2 border-t">
                Created: {new Date(role.createdAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Role Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Modify the role permissions and details.
            </DialogDescription>
          </DialogHeader>
          {selectedRole && (
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editRoleName">Role Name</Label>
                <Input
                  id="editRoleName"
                  defaultValue={selectedRole.name}
                  disabled={selectedRole.isSystem}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="editRoleDescription">Description</Label>
                <Textarea
                  id="editRoleDescription"
                  defaultValue={selectedRole.description}
                  rows={3}
                />
              </div>

              {!selectedRole.permissions.includes("*") && (
                <PermissionSelector 
                  roleData={selectedRole} 
                  setRoleData={setSelectedRole} 
                />
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleManagement;
