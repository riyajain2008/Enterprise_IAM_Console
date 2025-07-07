
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Shield, User, ArrowRight } from "lucide-react";
import { mockRoles, Role, setStoredRole } from "@/utils/permissions";
import { toast } from "@/hooks/use-toast";

const RoleAssumptionPage = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Mock user data - in real app, this would come from auth context
  const mockUser = {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    availableRoles: mockRoles
  };

  const handleRoleSelect = (roleId: string) => {
    const role = mockRoles.find(r => r.id === roleId);
    if (role) {
      setSelectedRole(role);
    }
  };

  const handleAssumeRole = async () => {
    if (!selectedRole) return;
    
    setLoading(true);
    
    try {
      // Simulate API call to assume role
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store the assumed role
      setStoredRole(selectedRole);
      
      toast({
        title: "Role Assumed Successfully",
        description: `You are now acting as ${selectedRole.name}`,
      });
      
      // Redirect to resources dashboard
      navigate('/resources');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assume role. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="max-w-4xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assume Role</h1>
          <p className="text-gray-600">Select a role to access cloud resources</p>
        </div>

        {/* User Info */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <CardTitle className="text-lg">{mockUser.name}</CardTitle>
                <CardDescription>{mockUser.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Role Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Available Roles</CardTitle>
            <CardDescription>
              Choose a role to assume. Each role has different permissions for accessing cloud resources.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Select Role</label>
              <Select onValueChange={handleRoleSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a role to assume" />
                </SelectTrigger>
                <SelectContent>
                  {mockUser.availableRoles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium">{role.name}</span>
                        <Badge variant="secondary" className="ml-2">
                          {Object.keys(role.permissions).length} services
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Selected Role Details */}
            {selectedRole && (
              <div className="border rounded-lg p-4 bg-blue-50">
                <h3 className="font-semibold text-blue-900 mb-2">{selectedRole.name}</h3>
                <p className="text-blue-700 text-sm mb-3">{selectedRole.description}</p>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-900">Permissions:</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(selectedRole.permissions).map(([service, actions]) => (
                      <Badge key={service} variant="outline" className="text-xs">
                        {service}: {actions.join(', ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleAssumeRole}
              disabled={!selectedRole || loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {loading ? (
                "Assuming Role..."
              ) : (
                <>
                  Assume Role
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="text-center text-sm text-gray-500">
          <p>By assuming this role, you agree to use permissions responsibly and in accordance with security policies.</p>
        </div>
      </div>
    </div>
  );
};

export default RoleAssumptionPage;
