
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User, Key, Settings } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: User,
      title: "User Management",
      description: "Comprehensive user administration and role assignment",
      color: "text-blue-500"
    },
    {
      icon: Key,
      title: "Access Control", 
      description: "Fine-grained permissions and policy management",
      color: "text-green-500"
    },
    {
      icon: Shield,
      title: "Security Audit",
      description: "Complete activity logging and compliance reporting",
      color: "text-purple-500"
    },
    {
      icon: Settings,
      title: "API Management",
      description: "Secure API key generation and access control",
      color: "text-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Enterprise IAM Console
                </h1>
                <p className="text-gray-600 text-sm">Identity & Access Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                className="border-gray-300 hover:bg-gray-50"
              >
                User Login
              </Button>
              <Button
                onClick={() => navigate('/admin')}
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                Admin Console
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <Shield className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Enterprise IAM Console
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Professional Identity and Access Management system with enterprise-grade 
            security and comprehensive user administration.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-200 border-0 bg-white/60 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="mx-auto w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-6">
            <Button
              onClick={() => navigate('/login')}
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-lg font-medium"
            >
              User Login
            </Button>
            <Button
              onClick={() => navigate('/admin')}
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg font-medium border-gray-300 hover:bg-gray-50"
            >
              Admin Console
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8">
            <p className="text-gray-600">
              New user?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-blue-600 hover:text-blue-500 font-medium underline"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold">Enterprise IAM Console</span>
            </div>
            <div className="text-gray-400">
              © 2024 Enterprise IAM Console. Professional Identity & Access Management Platform.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
