
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Key, Activity, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminOverview = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Users",
      value: "1,247",
      change: "+12%",
      changeType: "increase" as const,
      icon: Users,
      color: "blue",
    },
    {
      title: "Active Sessions",
      value: "342",
      change: "+5%",
      changeType: "increase" as const,
      icon: Activity,
      color: "green",
    },
    {
      title: "API Keys",
      value: "89",
      change: "-2%",
      changeType: "decrease" as const,
      icon: Key,
      color: "purple",
    },
    {
      title: "Failed Logins",
      value: "23",
      change: "-15%",
      changeType: "decrease" as const,
      icon: AlertTriangle,
      color: "red",
    },
  ];

  const recentActivity = [
    {
      id: "1",
      action: "User Created",
      user: "john.smith@example.com",
      timestamp: "2 minutes ago",
      status: "success",
    },
    {
      id: "2",
      action: "Role Updated",
      user: "Admin: alice.johnson",
      timestamp: "5 minutes ago",
      status: "success",
    },
    {
      id: "3",
      action: "Failed Login",
      user: "suspicious.user@example.com",
      timestamp: "12 minutes ago",
      status: "warning",
    },
    {
      id: "4",
      action: "API Key Generated",
      user: "api-service-prod",
      timestamp: "1 hour ago",
      status: "success",
    },
    {
      id: "5",
      action: "Permission Denied",
      user: "guest.user@example.com",
      timestamp: "2 hours ago",
      status: "error",
    },
  ];

  const quickActions = [
    {
      title: "Create User",
      description: "Add a new user to the system",
      action: () => navigate("/admin/users"),
      color: "blue",
    },
    {
      title: "Manage Roles",
      description: "Configure user roles and permissions",
      action: () => navigate("/admin/roles"),
      color: "purple",
    },
    {
      title: "View Audit Logs",
      description: "Review system activity and security events",
      action: () => navigate("/admin/audit-logs"),
      color: "green",
    },
    {
      title: "Generate API Key",
      description: "Create new API keys for services",
      action: () => navigate("/admin/api-keys"),
      color: "orange",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Overview</h1>
        <p className="text-gray-600">Monitor your IAM system at a glance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className={`w-4 h-4 mr-1 ${
                      stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest system events and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(activity.status)}
                    <div>
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.user}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{activity.timestamp}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button 
                variant="outline" 
                onClick={() => navigate("/admin/audit-logs")}
              >
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  onClick={action.action}
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm cursor-pointer transition-all duration-200"
                >
                  <h4 className="font-medium text-gray-900 mb-1">{action.title}</h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            System Health
          </CardTitle>
          <CardDescription>Current system status and security metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900">Authentication</h4>
              <p className="text-sm text-gray-600 mt-1">All systems operational</p>
              <Badge variant="default" className="mt-2 bg-green-100 text-green-800">Healthy</Badge>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900">Authorization</h4>
              <p className="text-sm text-gray-600 mt-1">Policy engine running</p>
              <Badge variant="default" className="mt-2 bg-blue-100 text-blue-800">Active</Badge>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Key className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900">API Gateway</h4>
              <p className="text-sm text-gray-600 mt-1">Processing requests</p>
              <Badge variant="default" className="mt-2 bg-purple-100 text-purple-800">Online</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
