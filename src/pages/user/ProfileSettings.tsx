
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, User, Shield, Eye, EyeOff, Smartphone, Monitor, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface Device {
  id: string;
  name: string;
  type: "desktop" | "mobile" | "tablet";
  browser: string;
  location: string;
  lastActive: string;
  current: boolean;
}

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(true);
  
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [devices] = useState<Device[]>([
    {
      id: "1",
      name: "MacBook Pro",
      type: "desktop",
      browser: "Chrome 120.0",
      location: "San Francisco, CA",
      lastActive: "2024-01-15 14:30:00",
      current: true,
    },
    {
      id: "2",
      name: "iPhone 15 Pro",
      type: "mobile",
      browser: "Safari 17.0",
      location: "San Francisco, CA",
      lastActive: "2024-01-15 12:15:00",
      current: false,
    },
    {
      id: "3",
      name: "Work Desktop",
      type: "desktop",
      browser: "Edge 120.0",
      location: "San Francisco, CA",
      lastActive: "2024-01-14 18:45:00",
      current: false,
    },
  ]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // API call would go here
      toast({
        title: "Profile updated",
        description: "Your profile information has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    try {
      // API call would go here
      toast({
        title: "Password changed",
        description: "Your password has been successfully updated.",
      });
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRevokeDevice = async (deviceId: string) => {
    try {
      // API call would go here
      toast({
        title: "Device revoked",
        description: "The selected device has been revoked access.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to revoke device access.",
        variant: "destructive",
      });
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "mobile":
        return <Smartphone className="w-5 h-5" />;
      case "tablet":
        return <Smartphone className="w-5 h-5" />;
      default:
        return <Monitor className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="ghost"
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
              <p className="text-gray-600">Manage your account information and security settings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white p-1 border">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="devices" className="flex items-center">
              <Monitor className="w-4 h-4 mr-2" />
              Devices
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your account information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl">
                        {profile.firstName[0]}{profile.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button type="button" variant="outline" size="sm">
                        Change Photo
                      </Button>
                      <p className="text-sm text-gray-500 mt-1">
                        JPG, GIF or PNG. 1MB max.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            {/* Password Change */}
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit">Update Password</Button>
                </form>
              </CardContent>
            </Card>

            {/* Two-Factor Authentication */}
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-600">
                      {mfaEnabled ? "Enabled" : "Disabled"}
                    </p>
                  </div>
                  <Switch
                    checked={mfaEnabled}
                    onCheckedChange={setMfaEnabled}
                  />
                </div>
                
                {mfaEnabled && (
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium text-green-800">2FA is enabled</p>
                        <p className="text-sm text-green-600">Your account is protected</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => navigate('/2fa-setup')}
                      variant="outline"
                      size="sm"
                    >
                      Manage
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Devices Tab */}
          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>
                  Manage devices and sessions that have access to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {devices.map((device) => (
                    <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-gray-400">
                          {getDeviceIcon(device.type)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{device.name}</h4>
                            {device.current && (
                              <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                                Current
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{device.browser}</span>
                            <span className="flex items-center">
                              <Globe className="w-3 h-3 mr-1" />
                              {device.location}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            Last active: {new Date(device.lastActive).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      {!device.current && (
                        <Button
                          onClick={() => handleRevokeDevice(device.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          Revoke
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-1">Security Tip</h4>
                  <p className="text-sm text-blue-600">
                    If you see any unfamiliar devices or locations, revoke access immediately and change your password.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileSettings;
