
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, User, Clock, MapPin, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoginActivity {
  id: string;
  timestamp: string;
  location: string;
  device: string;
  success: boolean;
}

interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

const UserDashboard = () => {
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder-avatar.jpg",
    lastLogin: "2024-01-15 14:30:00",
    mfaEnabled: true,
  });

  const [userRoles] = useState<UserRole[]>([
    {
      id: "1",
      name: "Developer",
      description: "Access to development resources",
      permissions: ["read:projects", "write:code", "deploy:staging"],
    },
    {
      id: "2",
      name: "Team Member",
      description: "Standard team access",
      permissions: ["read:documents", "write:comments"],
    },
  ]);

  const [recentActivity] = useState<LoginActivity[]>([
    {
      id: "1",
      timestamp: "2024-01-15 14:30:00",
      location: "San Francisco, CA",
      device: "Chrome on macOS",
      success: true,
    },
    {
      id: "2",
      timestamp: "2024-01-14 09:15:00",
      location: "San Francisco, CA",
      device: "Safari on iPhone",
      success: true,
    },
    {
      id: "3",
      timestamp: "2024-01-13 16:45:00",
      location: "Unknown Location",
      device: "Chrome on Windows",
      success: false,
    },
  ]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
                <p className="text-gray-600">Manage your account and security settings</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate('/profile')}
                variant="outline"
                className="flex items-center"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Two-Factor Auth</span>
                    <Badge variant={user.mfaEnabled ? "default" : "secondary"} className="bg-green-100 text-green-800">
                      {user.mfaEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Login</span>
                    <span className="text-sm font-medium">{new Date(user.lastLogin).toLocaleDateString()}</span>
                  </div>
                </div>

                <Button
                  onClick={() => navigate('/profile')}
                  className="w-full mt-4"
                  variant="outline"
                >
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Assigned Roles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Your Roles & Permissions
                </CardTitle>
                <CardDescription>
                  Roles assigned to your account and their associated permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userRoles.map((role) => (
                    <div key={role.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-lg">{role.name}</h4>
                        <Badge variant="outline">{role.permissions.length} permissions</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{role.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map((permission, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Login Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Login Activity
                </CardTitle>
                <CardDescription>
                  Your recent login attempts and sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${activity.success ? 'bg-green-500' : 'bg-red-500'}`} />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">
                              {activity.success ? 'Successful Login' : 'Failed Login Attempt'}
                            </span>
                            <Badge variant={activity.success ? "default" : "destructive"} className="text-xs">
                              {activity.success ? 'Success' : 'Failed'}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {new Date(activity.timestamp).toLocaleString()}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {activity.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {activity.device}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline" size="sm">
                    View All Activity
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
