
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, Key, Activity, ArrowRight, CheckCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Redirect to admin console or user dashboard based on role
      navigate('/admin');
    }
  }, [navigate]);

  const features = [
    {
      icon: Users,
      title: "User Management",
      description: "Comprehensive user account management with role-based access control",
    },
    {
      icon: Shield,
      title: "Advanced Security",
      description: "Multi-factor authentication, session management, and security monitoring",
    },
    {
      icon: Key,
      title: "API Key Management",
      description: "Generate, manage, and monitor API keys with granular permissions",
    },
    {
      icon: Activity,
      title: "Audit & Compliance",
      description: "Complete audit trails and compliance reporting for enterprise needs",
    },
  ];

  const capabilities = [
    "Enterprise-grade authentication and authorization",
    "Role-based access control (RBAC) with custom policies",
    "Multi-factor authentication (MFA) support",
    "Real-time session monitoring and management",
    "Comprehensive audit logging and reporting",
    "API key management with rate limiting",
    "Advanced security analytics and threat detection",
    "SSO integration ready (SAML, OAuth, OpenID Connect)",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  IAM Console
                </h1>
                <p className="text-gray-600">Identity & Access Management Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                className="border-gray-300 hover:bg-gray-50"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Enterprise-Grade
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Identity & Access Management
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Secure your applications with comprehensive user management, advanced authentication, 
            and fine-grained access control policies designed for modern enterprises.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => navigate('/signup')}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => navigate('/login')}
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg border-gray-300 hover:bg-gray-50"
            >
              View Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Comprehensive IAM Platform
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need to manage identities, secure access, and maintain compliance
            in one powerful platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-200 border-0 bg-white/60 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Capabilities Section */}
      <div className="bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Built for Enterprise Security
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Our IAM platform provides enterprise-grade security features with the flexibility 
                to adapt to your organization's unique requirements.
              </p>
              <div className="space-y-3">
                {capabilities.map((capability, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Ready to Get Started?</h3>
              <p className="text-blue-100 mb-6">
                Join thousands of organizations that trust our IAM platform to secure 
                their applications and protect their users.
              </p>
              <div className="space-y-4">
                <Button
                  onClick={() => navigate('/signup')}
                  className="w-full bg-white text-blue-600 hover:bg-gray-100"
                >
                  Create Free Account
                </Button>
                <Button
                  onClick={() => navigate('/login')}
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white/10"
                >
                  Sign In to Console
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold">IAM Console</span>
            </div>
            <div className="text-gray-400">
              © 2024 IAM Console. Enterprise Identity & Access Management Platform.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
