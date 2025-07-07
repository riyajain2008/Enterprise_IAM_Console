
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Database, 
  Settings, 
  Upload, 
  Plus, 
  Edit, 
  Delete,
  Shield,
  LogOut,
  Route,
  Globe,
  Server
} from "lucide-react";
import { Role, getStoredRole, clearStoredRole, hasPermission } from "@/utils/permissions";
import { toast } from "@/hooks/use-toast";
import AccessDeniedModal from "@/components/AccessDeniedModal";
import ResourceCard from "@/components/ResourceCard";

const ResourcesPage = () => {
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const [deniedAction, setDeniedAction] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = getStoredRole();
    if (!role) {
      navigate('/role-assumption');
      return;
    }
    setActiveRole(role);
  }, [navigate]);

  const handleUnauthorizedAction = (action: string) => {
    setDeniedAction(action);
    setShowAccessDenied(true);
  };

  const handleLogout = () => {
    clearStoredRole();
    navigate('/login');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const handleSwitchRole = () => {
    navigate('/role-assumption');
  };

  if (!activeRole) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Cloud Console</h1>
                <p className="text-sm text-gray-600">Manage your cloud resources</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Role:</span>
                <Badge variant="outline">{activeRole.name}</Badge>
              </div>
              <Button variant="outline" onClick={handleSwitchRole}>
                Switch Role
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cloud Resources</h2>
          <p className="text-gray-600">Manage and monitor your cloud infrastructure</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* S3 Buckets */}
          <ResourceCard
            title="S3 Buckets"
            description="Object storage for your applications"
            icon={<Cloud className="w-8 h-8 text-blue-600" />}
            actions={[
              {
                label: "Create Bucket",
                action: () => hasPermission(activeRole, 's3', 'create') 
                  ? toast({ title: "Creating bucket..." })
                  : handleUnauthorizedAction("create S3 bucket"),
                variant: "default",
                icon: <Plus className="w-4 h-4" />,
                enabled: hasPermission(activeRole, 's3', 'create')
              },
              {
                label: "Upload File",
                action: () => hasPermission(activeRole, 's3', 'upload')
                  ? toast({ title: "Uploading file..." })
                  : handleUnauthorizedAction("upload to S3"),
                variant: "outline",
                icon: <Upload className="w-4 h-4" />,
                enabled: hasPermission(activeRole, 's3', 'upload')
              },
              {
                label: "Delete Files",
                action: () => hasPermission(activeRole, 's3', 'delete')
                  ? toast({ title: "Deleting files..." })
                  : handleUnauthorizedAction("delete S3 files"),
                variant: "destructive",
                icon: <Delete className="w-4 h-4" />,
                enabled: hasPermission(activeRole, 's3', 'delete')
              }
            ]}
            stats={[
              { label: "Buckets", value: "12" },
              { label: "Objects", value: "1.2K" }
            ]}
          />

          {/* DynamoDB */}
          <ResourceCard
            title="DynamoDB"
            description="NoSQL database service"
            icon={<Database className="w-8 h-8 text-green-600" />}
            actions={[
              {
                label: "Create Table",
                action: () => hasPermission(activeRole, 'dynamodb', 'create')
                  ? toast({ title: "Creating table..." })
                  : handleUnauthorizedAction("create DynamoDB table"),
                variant: "default",
                icon: <Plus className="w-4 h-4" />,
                enabled: hasPermission(activeRole, 'dynamodb', 'create')
              },
              {
                label: "Insert Data",
                action: () => hasPermission(activeRole, 'dynamodb', 'update')
                  ? toast({ title: "Inserting data..." })
                  : handleUnauthorizedAction("insert data into DynamoDB"),
                variant: "outline",
                icon: <Edit className="w-4 h-4" />,
                enabled: hasPermission(activeRole, 'dynamodb', 'update')
              },
              {
                label: "Delete Table",
                action: () => hasPermission(activeRole, 'dynamodb', 'delete')
                  ? toast({ title: "Deleting table..." })
                  : handleUnauthorizedAction("delete DynamoDB table"),
                variant: "destructive",
                icon: <Delete className="w-4 h-4" />,
                enabled: hasPermission(activeRole, 'dynamodb', 'delete')
              }
            ]}
            stats={[
              { label: "Tables", value: "8" },
              { label: "Items", value: "45K" }
            ]}
          />

          {/* Lambda */}
          <ResourceCard
            title="Lambda"
            description="Serverless compute service"
            icon={<Settings className="w-8 h-8 text-orange-600" />}
            actions={[
              {
                label: "Deploy Function",
                action: () => hasPermission(activeRole, 'lambda', 'deploy')
                  ? toast({ title: "Deploying function..." })
                  : handleUnauthorizedAction("deploy Lambda function"),
                variant: "default",
                icon: <Upload className="w-4 h-4" />,
                enabled: hasPermission(activeRole, 'lambda', 'deploy')
              },
              {
                label: "View Logs",
                action: () => hasPermission(activeRole, 'lambda', 'logs')
                  ? toast({ title: "Opening logs..." })
                  : handleUnauthorizedAction("view Lambda logs"),
                variant: "outline",
                icon: <Edit className="w-4 h-4" />,
                enabled: hasPermission(activeRole, 'lambda', 'logs')
              },
              {
                label: "Delete Function",
                action: () => hasPermission(activeRole, 'lambda', 'delete')
                  ? toast({ title: "Deleting function..." })
                  : handleUnauthorizedAction("delete Lambda function"),
                variant: "destructive",
                icon: <Delete className="w-4 h-4" />,
                enabled: hasPermission(activeRole, 'lambda', 'delete')
              }
            ]}
            stats={[
              { label: "Functions", value: "24" },
              { label: "Invocations", value: "1.8M" }
            ]}
          />

          {/* API Gateway */}
          <ResourceCard
            title="API Gateway"
            description="Create and manage APIs"
            icon={<Route className="w-8 h-8 text-purple-600" />}
            actions={[
              {
                label: "Create API",
                action: () => hasPermission(activeRole, 'apigateway', 'create')
                  ? toast({ title: "Creating API..." })
                  : handleUnauthorizedAction("create API Gateway"),
                variant: "default",
                icon: <Plus className="w-4 h-4" />,
                enabled: hasPermission(activeRole, 'apigateway', 'create')
              },
              {
                label: "Update Routes",
                action: () => hasPermission(activeRole, 'apigateway', 'update')
                  ? toast({ title: "Updating routes..." })
                  : handleUnauthorizedAction("update API routes"),
                variant: "outline",
                icon: <Edit className="w-4 h-4" />,
                enabled: hasPermission(activeRole, 'apigateway', 'update')
              },
              {
                label: "Delete API",
                action: () => hasPermission(activeRole, 'apigateway', 'delete')
                  ? toast({ title: "Deleting API..." })
                  : handleUnauthorizedAction("delete API"),
                variant: "destructive",
                icon: <Delete className="w-4 h-4" />,
                enabled: hasPermission(activeRole, 'apigateway', 'delete')
              }
            ]}
            stats={[
              { label: "APIs", value: "6" },
              { label: "Requests", value: "850K" }
            ]}
          />

          {/* CloudFront */}
          <ResourceCard
            title="CloudFront"
            description="Content delivery network"
            icon={<Globe className="w-8 h-8 text-indigo-600" />}
            actions={[
              {
                label: "Create Distribution",
                action: () => hasPermission(activeRole, 'cloudfront', 'create')
                  ? toast({ title: "Creating distribution..." })
                  : handleUnauthorizedAction("create CloudFront distribution"),
                variant: "default",
                icon: <Plus className="w-4 h-4" />,
                enabled: hasPermission(activeRole, 'cloudfront', 'create')
              },
              {
                label: "Invalidate Cache",
                action: () => hasPermission(activeRole, 'cloudfront', 'invalidate')
                  ? toast({ title: "Invalidating cache..." })
                  : handleUnauthorizedAction("invalidate CloudFront cache"),
                variant: "outline",
                icon: <Edit className="w-4 h-4" />,
                enabled: hasPermission(activeRole, 'cloudfront', 'invalidate')
              },
              {
                label: "Delete Distribution",
                action: () => hasPermission(activeRole, 'cloudfront', 'delete')
                  ? toast({ title: "Deleting distribution..." })
                  : handleUnauthorizedAction("delete CloudFront distribution"),
                variant: "destructive",
                icon: <Delete className="w-4 h-4" />,
                enabled: hasPermission(activeRole, 'cloudfront', 'delete')
              }
            ]}
            stats={[
              { label: "Distributions", value: "4" },
              { label: "Edge Locations", value: "216" }
            ]}
          />

          {/* Route 53 */}
          <ResourceCard
            title="Route 53"
            description="DNS web service"
            icon={<Server className="w-8 h-8 text-teal-600" />}
            actions={[
              {
                label: "Create Hosted Zone",
                action: () => hasPermission(activeRole, 'route53', 'create')
                  ? toast({ title: "Creating hosted zone..." })
                  : handleUnauthorizedAction("create Route 53 hosted zone"),
                variant: "default",
                icon: <Plus className="w-4 h-4" />,
                enabled: hasPermission(activeRole, 'route53', 'create')
              },
              {
                label: "Edit DNS Records",
                action: () => hasPermission(activeRole, 'route53', 'update')
                  ? toast({ title: "Editing DNS records..." })
                  : handleUnauthorizedAction("edit DNS records"),
                variant: "outline",
                icon: <Edit className="w-4 h-4" />,
                enabled: hasPermission(activeRole, 'route53', 'update')
              },
              {
                label: "Delete Zone",
                action: () => hasPermission(activeRole, 'route53', 'delete')
                  ? toast({ title: "Deleting hosted zone..." })
                  : handleUnauthorizedAction("delete hosted zone"),
                variant: "destructive",
                icon: <Delete className="w-4 h-4" />,
                enabled: hasPermission(activeRole, 'route53', 'delete')
              }
            ]}
            stats={[
              { label: "Hosted Zones", value: "3" },
              { label: "DNS Queries", value: "2.1M" }
            ]}
          />
        </div>
      </main>

      <AccessDeniedModal
        isOpen={showAccessDenied}
        onClose={() => setShowAccessDenied(false)}
        action={deniedAction}
        currentRole={activeRole.name}
      />
    </div>
  );
};

export default ResourcesPage;
