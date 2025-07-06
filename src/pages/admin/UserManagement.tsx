
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
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Search, Plus, MoreHorizontal, Edit, Trash2, Shield, Ban, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: "active" | "suspended" | "pending";
  role: string;
  mfaEnabled: boolean;
  lastLogin: string;
  createdAt: string;
}

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const [users] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      status: "active",
      role: "Admin",
      mfaEnabled: true,
      lastLogin: "2024-01-15 14:30:00",
      createdAt: "2024-01-01 10:00:00",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: "active",
      role: "Manager",
      mfaEnabled: true,
      lastLogin: "2024-01-15 12:15:00",
      createdAt: "2024-01-02 09:30:00",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      status: "suspended",
      role: "User",
      mfaEnabled: false,
      lastLogin: "2024-01-10 08:45:00",
      createdAt: "2024-01-03 14:20:00",
    },
    {
      id: "4",
      name: "Alice Wilson",
      email: "alice.wilson@example.com",
      status: "pending",
      role: "User",
      mfaEnabled: false,
      lastLogin: "Never",
      createdAt: "2024-01-15 16:00:00",
    },
  ]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    sendInvite: true,
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // API call would go here
      toast({
        title: "User created successfully",
        description: `${newUser.name} has been added to the system.`,
      });
      setIsCreateModalOpen(false);
      setNewUser({ name: "", email: "", role: "", sendInvite: true });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create user. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUserAction = async (action: string, userId: string, userName: string) => {
    try {
      // API call would go here
      toast({
        title: `User ${action}`,
        description: `${userName} has been ${action.toLowerCase()}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${action.toLowerCase()} user.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Users className="w-8 h-8 mr-3" />
            User Management
          </h1>
          <p className="text-gray-600 mt-1">Manage user accounts, roles, and permissions</p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>
                Add a new user to the system and assign their role.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="sendInvite"
                  type="checkbox"
                  checked={newUser.sendInvite}
                  onChange={(e) => setNewUser({ ...newUser, sendInvite: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="sendInvite" className="text-sm">
                  Send invitation email to user
                </Label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create User</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Manage user accounts and their access permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>2FA</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    {user.mfaEnabled ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {user.lastLogin !== "Never" ? new Date(user.lastLogin).toLocaleDateString() : "Never"}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuItem onClick={() => handleUserAction("Edit", user.id, user.name)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUserAction("Reset Password", user.id, user.name)}>
                          <Shield className="mr-2 h-4 w-4" />
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === "active" ? (
                          <DropdownMenuItem 
                            onClick={() => handleUserAction("Suspended", user.id, user.name)}
                            className="text-yellow-600"
                          >
                            <Ban className="mr-2 h-4 w-4" />
                            Suspend User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem 
                            onClick={() => handleUserAction("Activated", user.id, user.name)}
                            className="text-green-600"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Activate User
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleUserAction("Deleted", user.id, user.name)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete User
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
    </div>
  );
};

export default UserManagement;
