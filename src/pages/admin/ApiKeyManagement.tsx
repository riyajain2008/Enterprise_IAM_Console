
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
import { Key, Plus, Search, MoreHorizontal, Copy, Eye, EyeOff, Trash2, Calendar, Clock, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ApiKey {
  id: string;
  name: string;
  description: string;
  key: string;
  prefix: string;
  scopes: string[];
  status: "active" | "revoked" | "expired";
  createdBy: string;
  createdAt: string;
  expiresAt?: string;
  lastUsed?: string;
  usageCount: number;
  rateLimit: number;
}

const ApiKeyManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
  const [showKeyValue, setShowKeyValue] = useState<string | null>(null);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  const [apiKeys] = useState<ApiKey[]>([
    {
      id: "key_1",
      name: "Production API",
      description: "Main production API access for web application",
      key: "sk_prod_1234567890abcdef",
      prefix: "sk_prod_",
      scopes: ["read", "write", "delete"],
      status: "active",
      createdBy: "admin@example.com",
      createdAt: "2024-01-01T00:00:00Z",
      expiresAt: "2025-01-01T00:00:00Z",
      lastUsed: "2024-01-15T14:30:00Z",
      usageCount: 15420,
      rateLimit: 1000,
    },
    {
      id: "key_2",
      name: "Mobile App Integration",
      description: "API key for mobile application authentication",
      key: "sk_mobile_abcdef1234567890",
      prefix: "sk_mobile_",
      scopes: ["read", "write"],
      status: "active",
      createdBy: "dev@example.com",
      createdAt: "2024-01-05T00:00:00Z",
      expiresAt: "2024-07-05T00:00:00Z",
      lastUsed: "2024-01-15T13:45:00Z",
      usageCount: 8932,
      rateLimit: 500,
    },
    {
      id: "key_3",
      name: "Analytics Service",
      description: "Read-only access for analytics and reporting",
      key: "sk_analytics_xyz789012345",
      prefix: "sk_analytics_",
      scopes: ["read"],
      status: "active",
      createdBy: "analytics@example.com",
      createdAt: "2024-01-10T00:00:00Z",
      lastUsed: "2024-01-15T12:00:00Z",
      usageCount: 2847,
      rateLimit: 100,
    },
    {
      id: "key_4",
      name: "Legacy System",
      description: "Deprecated API key for old system integration",
      key: "sk_legacy_oldkey123456",
      prefix: "sk_legacy_",
      scopes: ["read"],
      status: "revoked",
      createdBy: "admin@example.com",
      createdAt: "2023-06-01T00:00:00Z",
      lastUsed: "2024-01-01T00:00:00Z",
      usageCount: 45123,
      rateLimit: 200,
    },
    {
      id: "key_5",
      name: "Testing Environment",
      description: "API key for development and testing purposes",
      key: "sk_test_testing123456789",
      prefix: "sk_test_",
      scopes: ["read", "write"],
      status: "expired",
      createdBy: "dev@example.com",
      createdAt: "2023-12-01T00:00:00Z",
      expiresAt: "2024-01-01T00:00:00Z",
      lastUsed: "2023-12-30T15:30:00Z",
      usageCount: 156,
      rateLimit: 50,
    },
  ]);

  const [newApiKey, setNewApiKey] = useState({
    name: "",
    description: "",
    scopes: [] as string[],
    expiresAt: "",
    rateLimit: 100,
  });

  const availableScopes = [
    { id: "read", name: "Read", description: "Read access to resources" },
    { id: "write", name: "Write", description: "Create and update resources" },
    { id: "delete", name: "Delete", description: "Delete resources" },
    { id: "admin", name: "Admin", description: "Administrative access" },
  ];

  const filteredKeys = apiKeys.filter((key) => {
    const matchesSearch = key.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         key.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         key.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || key.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "revoked":
        return <Badge className="bg-red-100 text-red-800">Revoked</Badge>;
      case "expired":
        return <Badge className="bg-gray-100 text-gray-800">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const generateApiKey = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'sk_prod_';
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleCreateApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const generatedKeyValue = generateApiKey();
      setGeneratedKey(generatedKeyValue);
      
      // API call would go here
      toast({
        title: "API Key created successfully",
        description: `${newApiKey.name} API key has been generated.`,
      });
      
      // Don't close modal immediately, show the generated key first
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create API key. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: "API Key copied",
      description: "The API key has been copied to your clipboard.",
    });
  };

  const handleRevokeKey = async (keyId: string, keyName: string) => {
    try {
      // API call would go here
      toast({
        title: "API Key revoked",
        description: `${keyName} has been revoked and is no longer valid.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to revoke API key.",
        variant: "destructive",
      });
    }
  };

  const toggleScope = (scope: string) => {
    const updatedScopes = newApiKey.scopes.includes(scope)
      ? newApiKey.scopes.filter(s => s !== scope)
      : [...newApiKey.scopes, scope];
    
    setNewApiKey({ ...newApiKey, scopes: updatedScopes });
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.substring(0, 8) + '••••••••' + key.substring(key.length - 4);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setGeneratedKey(null);
    setNewApiKey({ name: "", description: "", scopes: [], expiresAt: "", rateLimit: 100 });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Key className="w-8 h-8 mr-3" />
            API Key Management
          </h1>
          <p className="text-gray-600 mt-1">Generate and manage API keys for secure access</p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Generate API Key
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Generate New API Key</DialogTitle>
              <DialogDescription>
                Create a new API key with specific scopes and permissions.
              </DialogDescription>
            </DialogHeader>
            
            {generatedKey ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Shield className="w-5 h-5 text-green-600 mr-2" />
                    <h4 className="font-medium text-green-800">API Key Generated Successfully</h4>
                  </div>
                  <p className="text-sm text-green-700 mb-4">
                    Your API key has been generated. Copy it now as you won't be able to see it again.
                  </p>
                  
                  <div className="space-y-2">
                    <Label>API Key</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={generatedKey}
                        readOnly
                        className="font-mono text-sm bg-white"
                      />
                      <Button
                        onClick={() => handleCopyKey(generatedKey)}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button onClick={closeCreateModal}>
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateApiKey} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="keyName">API Key Name</Label>
                  <Input
                    id="keyName"
                    value={newApiKey.name}
                    onChange={(e) => setNewApiKey({ ...newApiKey, name: e.target.value })}
                    placeholder="e.g., Production API"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="keyDescription">Description</Label>
                  <Textarea
                    id="keyDescription"
                    value={newApiKey.description}
                    onChange={(e) => setNewApiKey({ ...newApiKey, description: e.target.value })}
                    placeholder="Describe what this API key will be used for..."
                    rows={2}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Scopes & Permissions</Label>
                  <div className="space-y-2">
                    {availableScopes.map((scope) => (
                      <div key={scope.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <input
                          id={scope.id}
                          type="checkbox"
                          checked={newApiKey.scopes.includes(scope.id)}
                          onChange={() => toggleScope(scope.id)}
                          className="mt-1 rounded border-gray-300"
                        />
                        <div className="flex-1">
                          <Label htmlFor={scope.id} className="font-medium">
                            {scope.name}
                          </Label>
                          <p className="text-sm text-gray-600">{scope.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiresAt">Expires At (Optional)</Label>
                    <Input
                      id="expiresAt"
                      type="date"
                      value={newApiKey.expiresAt}
                      onChange={(e) => setNewApiKey({ ...newApiKey, expiresAt: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rateLimit">Rate Limit (requests/hour)</Label>
                    <Input
                      id="rateLimit"
                      type="number"
                      value={newApiKey.rateLimit}
                      onChange={(e) => setNewApiKey({ ...newApiKey, rateLimit: parseInt(e.target.value) })}
                      min="1"
                      max="10000"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button type="button" variant="outline" onClick={closeCreateModal}>
                    Cancel
                  </Button>
                  <Button type="submit">Generate API Key</Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search API keys..."
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
                <SelectItem value="revoked">Revoked</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Keys</p>
                <p className="text-2xl font-bold">{filteredKeys.length}</p>
              </div>
              <Key className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {filteredKeys.filter(key => key.status === 'active').length}
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
                <p className="text-sm text-gray-600">Revoked</p>
                <p className="text-2xl font-bold text-red-600">
                  {filteredKeys.filter(key => key.status === 'revoked').length}
                </p>
              </div>
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Usage</p>
                <p className="text-2xl font-bold text-purple-600">
                  {filteredKeys.reduce((sum, key) => sum + key.usageCount, 0).toLocaleString()}
                </p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Keys Table */}
      <Card>
        <CardHeader>
          <CardTitle>API Keys ({filteredKeys.length})</CardTitle>
          <CardDescription>
            Manage your API keys and their access permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Scopes</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKeys.map((apiKey) => (
                <TableRow key={apiKey.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{apiKey.name}</div>
                      <div className="text-sm text-gray-500">{apiKey.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                        {showKeyValue === apiKey.id ? apiKey.key : maskApiKey(apiKey.key)}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowKeyValue(showKeyValue === apiKey.id ? null : apiKey.id)}
                      >
                        {showKeyValue === apiKey.id ? (
                          <EyeOff className="h-3 w-3" />
                        ) : (
                          <Eye className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyKey(apiKey.key)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {apiKey.scopes.map((scope) => (
                        <Badge key={scope} variant="secondary" className="text-xs">
                          {scope}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(apiKey.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{apiKey.usageCount.toLocaleString()} requests</div>
                      <div className="text-xs text-gray-500">
                        Limit: {apiKey.rateLimit}/hour
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(apiKey.createdAt).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">by {apiKey.createdBy}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuItem onClick={() => setSelectedKey(apiKey)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCopyKey(apiKey.key)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Key
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {apiKey.status === 'active' && (
                          <DropdownMenuItem 
                            onClick={() => handleRevokeKey(apiKey.id, apiKey.name)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Revoke Key
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Key Detail Modal */}
      <Dialog open={!!selectedKey} onOpenChange={() => setSelectedKey(null)}>
        <DialogContent className="bg-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Key className="w-5 h-5 mr-2" />
              API Key Details
            </DialogTitle>
            <DialogDescription>
              Detailed information about this API key
            </DialogDescription>
          </DialogHeader>
          
          {selectedKey && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Name</Label>
                  <p className="text-sm">{selectedKey.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedKey.status)}</div>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-600">Description</Label>
                <p className="text-sm">{selectedKey.description}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-600">API Key</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <code className="text-sm bg-gray-100 px-3 py-2 rounded font-mono flex-1">
                    {selectedKey.key}
                  </code>
                  <Button
                    onClick={() => handleCopyKey(selectedKey.key)}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Created By</Label>
                  <p className="text-sm">{selectedKey.createdBy}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Created At</Label>
                  <p className="text-sm">{new Date(selectedKey.createdAt).toLocaleString()}</p>
                </div>
              </div>
              
              {selectedKey.expiresAt && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Expires At</Label>
                    <p className="text-sm">{new Date(selectedKey.expiresAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Last Used</Label>
                    <p className="text-sm">
                      {selectedKey.lastUsed 
                        ? new Date(selectedKey.lastUsed).toLocaleString()
                        : 'Never'
                      }
                    </p>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Usage Count</Label>
                  <p className="text-sm">{selectedKey.usageCount.toLocaleString()} requests</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Rate Limit</Label>
                  <p className="text-sm">{selectedKey.rateLimit} requests/hour</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-600">Scopes</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedKey.scopes.map((scope) => (
                    <Badge key={scope} variant="secondary">
                      {scope}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                {selectedKey.status === 'active' && (
                  <Button
                    onClick={() => handleRevokeKey(selectedKey.id, selectedKey.name)}
                    variant="destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Revoke Key
                  </Button>
                )}
                <Button variant="outline" onClick={() => setSelectedKey(null)}>
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

export default ApiKeyManagement;
