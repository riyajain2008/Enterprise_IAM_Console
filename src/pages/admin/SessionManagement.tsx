
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Search, MoreHorizontal, LogOut, Shield, Smartphone, Monitor, Globe, Clock, MapPin, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Session {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  deviceType: "desktop" | "mobile" | "tablet";
  deviceName: string;
  browser: string;
  browserVersion: string;
  os: string;
  ipAddress: string;
  location: string;
  loginTime: string;
  lastActivity: string;
  status: "active" | "idle" | "expired";
  isCurrent: boolean;
  sessionDuration: string;
  riskScore?: number;
}

const SessionManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedDevice, setSelectedDevice] = useState<string>("all");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const [sessions] = useState<Session[]>([
    {
      id: "sess_1",
      userId: "user_1",
      userName: "John Doe",
      userEmail: "john.doe@example.com",
      deviceType: "desktop",
      deviceName: "MacBook Pro",
      browser: "Chrome",
      browserVersion: "120.0.6099.129",
      os: "macOS 14.2",
      ipAddress: "192.168.1.100",
      location: "San Francisco, CA, US",
      loginTime: "2024-01-15T09:30:00Z",
      lastActivity: "2024-01-15T14:30:00Z",
      status: "active",
      isCurrent: true,
      sessionDuration: "5h 0m",
      riskScore: 10,
    },
    {
      id: "sess_2",
      userId: "user_2",
      userName: "Jane Smith",
      userEmail: "jane.smith@example.com",
      deviceType: "mobile",
      deviceName: "iPhone 15 Pro",
      browser: "Safari",
      browserVersion: "17.2",
      os: "iOS 17.2",
      ipAddress: "10.0.0.15",
      location: "New York, NY, US",
      loginTime: "2024-01-15T08:15:00Z",
      lastActivity: "2024-01-15T14:25:00Z",
      status: "active",
      isCurrent: false,
      sessionDuration: "6h 15m",
      riskScore: 15,
    },
    {
      id: "sess_3",
      userId: "user_3",
      userName: "Bob Johnson",
      userEmail: "bob.johnson@example.com",
      deviceType: "desktop",
      deviceName: "Windows PC",
      browser: "Edge",
      browserVersion: "120.0.2210.89",
      os: "Windows 11",
      ipAddress: "203.0.113.10",
      location: "London, UK",
      loginTime: "2024-01-15T06:00:00Z",
      lastActivity: "2024-01-15T12:30:00Z",
      status: "idle",
      isCurrent: false,
      sessionDuration: "8h 30m",
      riskScore: 25,
    },
    {
      id: "sess_4",
      userId: "user_4",
      userName: "Alice Wilson",
      userEmail: "alice.wilson@example.com",
      deviceType: "tablet",
      deviceName: "iPad Pro",
      browser: "Safari",
      browserVersion: "17.2",
      os: "iPadOS 17.2",
      ipAddress: "172.16.0.5",
      location: "Toronto, ON, CA",
      loginTime: "2024-01-14T16:45:00Z",
      lastActivity: "2024-01-15T11:20:00Z",
      status: "active",
      isCurrent: false,
      sessionDuration: "21h 45m",
      riskScore: 5,
    },
    {
      id: "sess_5",
      userId: "user_5",
      userName: "Charlie Brown",
      userEmail: "charlie.brown@example.com",
      deviceType: "desktop",
      deviceName: "Unknown Device",
      browser: "Unknown",
      browserVersion: "Unknown",
      os: "Linux",
      ipAddress: "185.220.101.45",
      location: "Unknown Location",
      loginTime: "2024-01-15T13:00:00Z",
      lastActivity: "2024-01-15T13:05:00Z",
      status: "expired",
      isCurrent: false,
      sessionDuration: "5m",
      riskScore: 85,
    },
  ]);

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch = session.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || session.status === selectedStatus;
    const matchesDevice = selectedDevice === "all" || session.deviceType === selectedDevice;
    return matchesSearch && matchesStatus && matchesDevice;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "idle":
        return <Badge className="bg-yellow-100 text-yellow-800">Idle</Badge>;
      case "expired":
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case "mobile":
        return <Smartphone className="w-4 h-4 text-gray-500" />;
      case "tablet":
        return <Smartphone className="w-4 h-4 text-gray-500" />;
      default:
        return <Monitor className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRiskBadge = (riskScore?: number) => {
    if (!riskScore) return null;
    
    if (riskScore < 20) {
      return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>;
    } else if (riskScore < 50) {
      return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">High Risk</Badge>;
    }
  };

  const handleRevokeSession = async (sessionId: string, userName: string) => {
    try {
      // API call would go here
      toast({
        title: "Session revoked",
        description: `Session for ${userName} has been terminated.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to revoke session.",
        variant: "destructive",
      });
    }
  };

  const handleRevokeAllSessions = async (userId: string, userName: string) => {
    try {
      // API call would go here
      toast({
        title: "All sessions revoked",
        description: `All sessions for ${userName} have been terminated.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to revoke all sessions.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Eye className="w-8 h-8 mr-3" />
          Session Management
        </h1>
        <p className="text-gray-600 mt-1">Monitor and manage active user sessions</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search sessions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All status" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="idle">Idle</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Device Type</label>
              <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                <SelectTrigger>
                  <SelectValue placeholder="All devices" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Devices</SelectItem>
                  <SelectItem value="desktop">Desktop</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="tablet">Tablet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold">{filteredSessions.length}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {filteredSessions.filter(s => s.status === 'active').length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Idle</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {filteredSessions.filter(s => s.status === 'idle').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Risk</p>
                <p className="text-2xl font-bold text-red-600">
                  {filteredSessions.filter(s => (s.riskScore || 0) >= 50).length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sessions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions ({filteredSessions.length})</CardTitle>
          <CardDescription>
            Current user sessions and their security details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSessions.map((session) => (
                <TableRow key={session.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt={session.userName} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm">
                          {session.userName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900 flex items-center">
                          {session.userName}
                          {session.isCurrent && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{session.userEmail}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getDeviceIcon(session.deviceType)}
                      <div>
                        <div className="text-sm font-medium">{session.deviceName}</div>
                        <div className="text-xs text-gray-500">
                          {session.browser} {session.browserVersion}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span>{session.location}</span>
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      {session.ipAddress}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{session.sessionDuration}</div>
                    <div className="text-xs text-gray-500">
                      Last: {new Date(session.lastActivity).toLocaleTimeString()}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(session.status)}</TableCell>
                  <TableCell>{getRiskBadge(session.riskScore)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuItem onClick={() => setSelectedSession(session)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleRevokeSession(session.id, session.userName)}
                          className="text-red-600"
                          disabled={session.isCurrent}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Revoke Session
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleRevokeAllSessions(session.userId, session.userName)}
                          className="text-red-600"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Revoke All Sessions
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Session Detail Modal */}
      <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
        <DialogContent className="bg-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Session Details
            </DialogTitle>
            <DialogDescription>
              Detailed information about this user session
            </DialogDescription>
          </DialogHeader>
          
          {selectedSession && (
            <div className="space-y-6">
              {/* User Info */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="" alt={selectedSession.userName} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {selectedSession.userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-lg">{selectedSession.userName}</h3>
                  <p className="text-gray-600">{selectedSession.userEmail}</p>
                </div>
                {selectedSession.isCurrent && (
                  <Badge className="bg-blue-100 text-blue-800">Current Session</Badge>
                )}
              </div>

              {/* Session Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Session ID</label>
                  <p className="text-sm font-mono">{selectedSession.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedSession.status)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Login Time</label>
                  <p className="text-sm">{new Date(selectedSession.loginTime).toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Last Activity</label>
                  <p className="text-sm">{new Date(selectedSession.lastActivity).toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Session Duration</label>
                  <p className="text-sm">{selectedSession.sessionDuration}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Risk Score</label>
                  <div className="mt-1">{getRiskBadge(selectedSession.riskScore)}</div>
                </div>
              </div>

              {/* Device Info */}
              <div className="space-y-3 p-4 border rounded-lg">
                <h4 className="font-medium flex items-center">
                  {getDeviceIcon(selectedSession.deviceType)}
                  <span className="ml-2">Device Information</span>
                </h4>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Device:</span>
                    <p>{selectedSession.deviceName}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">OS:</span>
                    <p>{selectedSession.os}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Browser:</span>
                    <p>{selectedSession.browser} {selectedSession.browserVersion}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">IP Address:</span>
                    <p className="font-mono">{selectedSession.ipAddress}</p>
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-600 text-sm">Location:</span>
                  <p className="flex items-center text-sm">
                    <Globe className="w-4 h-4 mr-1" />
                    {selectedSession.location}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                {!selectedSession.isCurrent && (
                  <Button
                    onClick={() => handleRevokeSession(selectedSession.id, selectedSession.userName)}
                    variant="destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Revoke Session
                  </Button>
                )}
                <Button variant="outline" onClick={() => setSelectedSession(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SessionManagement;
