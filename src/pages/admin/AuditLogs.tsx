
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { Activity, Search, Filter, Download, Eye, Calendar, MapPin, User, AlertCircle, CheckCircle, Info } from "lucide-react";

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  status: "success" | "failed" | "warning";
  ipAddress: string;
  userAgent: string;
  details: any;
  location?: string;
}

const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [dateRange, setDateRange] = useState<string>("7d");

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: "1",
      timestamp: "2024-01-15T14:30:00Z",
      user: "john.doe@example.com",
      action: "Login",
      resource: "Authentication",
      status: "success",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      location: "San Francisco, CA",
      details: {
        sessionId: "sess_abc123",
        mfaUsed: true,
        duration: "2.3s"
      }
    },
    {
      id: "2",
      timestamp: "2024-01-15T14:28:00Z",
      user: "admin@example.com",
      action: "User Created",
      resource: "users/alice.wilson",
      status: "success",
      ipAddress: "10.0.0.5",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      location: "New York, NY",
      details: {
        newUserId: "user_456",
        assignedRoles: ["User"],
        invitationSent: true
      }
    },
    {
      id: "3",
      timestamp: "2024-01-15T14:25:00Z",
      user: "suspicious.user@example.com",
      action: "Login Failed",
      resource: "Authentication",
      status: "failed",
      ipAddress: "185.220.101.45",
      userAgent: "curl/7.68.0",
      location: "Unknown",
      details: {
        reason: "Invalid credentials",
        attempts: 5,
        blocked: true
      }
    },
    {
      id: "4",
      timestamp: "2024-01-15T14:20:00Z",
      user: "manager@example.com",
      action: "Role Updated",
      resource: "roles/developer",
      status: "success",
      ipAddress: "192.168.1.105",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      location: "San Francisco, CA",
      details: {
        roleId: "role_789",
        addedPermissions: ["api:write"],
        removedPermissions: ["system:admin"]
      }
    },
    {
      id: "5",
      timestamp: "2024-01-15T14:15:00Z",
      user: "api-service@example.com",
      action: "API Key Generated",
      resource: "api-keys/prod-service",
      status: "success",
      ipAddress: "10.0.0.10",
      userAgent: "internal-service/1.0",
      location: "Data Center",
      details: {
        keyId: "key_xyz789",
        scopes: ["read", "write"],
        expiresAt: "2025-01-15T14:15:00Z"
      }
    },
    {
      id: "6",
      timestamp: "2024-01-15T14:10:00Z",
      user: "guest.user@example.com",
      action: "Access Denied",
      resource: "admin/users",
      status: "warning",
      ipAddress: "203.0.113.0",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
      location: "London, UK",
      details: {
        requiredPermission: "users:read",
        userPermissions: ["profile:read"]
      }
    },
  ]);

  const actionTypes = [
    "Login", "Logout", "Login Failed",
    "User Created", "User Updated", "User Deleted",
    "Role Created", "Role Updated", "Role Deleted",
    "Policy Created", "Policy Updated", "Policy Deleted",
    "API Key Generated", "API Key Revoked",
    "Access Denied", "Permission Changed"
  ];

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = selectedAction === "all" || log.action === selectedAction;
    const matchesStatus = selectedStatus === "all" || log.status === selectedStatus;
    return matchesSearch && matchesAction && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Success</Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleExportLogs = () => {
    // In a real app, this would generate and download a CSV/JSON file
    const csvContent = [
      "Timestamp,User,Action,Resource,Status,IP Address,Location",
      ...filteredLogs.map(log => 
        `${log.timestamp},${log.user},${log.action},${log.resource},${log.status},${log.ipAddress},${log.location || 'Unknown'}`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Activity className="w-8 h-8 mr-3" />
            Audit Logs
          </h1>
          <p className="text-gray-600 mt-1">Monitor system activity and security events</p>
        </div>
        
        <Button
          onClick={handleExportLogs}
          variant="outline"
          className="flex items-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Action</label>
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger>
                  <SelectValue placeholder="All actions" />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-48 overflow-y-auto">
                  <SelectItem value="all">All Actions</SelectItem>
                  {actionTypes.map((action) => (
                    <SelectItem key={action} value={action}>
                      {action}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All status" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="1d">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
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
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-2xl font-bold">{filteredLogs.length}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Successful</p>
                <p className="text-2xl font-bold text-green-600">
                  {filteredLogs.filter(log => log.status === 'success').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Warnings</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {filteredLogs.filter(log => log.status === 'warning').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-red-600">
                  {filteredLogs.filter(log => log.status === 'failed').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Event Log ({filteredLogs.length} events)</CardTitle>
          <CardDescription>
            Detailed log of all system activities and user actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium">
                          {new Date(log.timestamp).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{log.user}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.action}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-mono">{log.resource}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(log.status)}
                      {getStatusBadge(log.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span>{log.location || 'Unknown'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedLog(log)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center">
                            <Activity className="w-5 h-5 mr-2" />
                            Audit Log Detail
                          </DialogTitle>
                          <DialogDescription>
                            Detailed information about this event
                          </DialogDescription>
                        </DialogHeader>
                        
                        {selectedLog && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-gray-600">Timestamp</label>
                                <p className="text-sm">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">Status</label>
                                <div className="mt-1">{getStatusBadge(selectedLog.status)}</div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-gray-600">User</label>
                                <p className="text-sm">{selectedLog.user}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">Action</label>
                                <p className="text-sm">{selectedLog.action}</p>
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium text-gray-600">Resource</label>
                              <p className="text-sm font-mono">{selectedLog.resource}</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-gray-600">IP Address</label>
                                <p className="text-sm font-mono">{selectedLog.ipAddress}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">Location</label>
                                <p className="text-sm">{selectedLog.location || 'Unknown'}</p>
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium text-gray-600">User Agent</label>
                              <p className="text-sm break-all">{selectedLog.userAgent}</p>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium text-gray-600">Additional Details</label>
                              <pre className="text-xs bg-gray-100 p-3 rounded-lg overflow-x-auto">
                                {JSON.stringify(selectedLog.details, null, 2)}
                              </pre>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogs;
