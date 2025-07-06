
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft, Home } from "lucide-react";

const AccessDeniedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 px-4">
      <Card className="w-full max-w-md text-center shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Access Denied
          </CardTitle>
          <CardDescription className="text-gray-600">
            You don't have permission to access this resource
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              This could be because:
            </p>
            <ul className="text-sm text-gray-600 space-y-1 text-left">
              <li>• Your account doesn't have the required permissions</li>
              <li>• Your session has expired</li>
              <li>• The resource has been moved or removed</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Button>
            
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              If you believe this is an error, please contact your administrator
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessDeniedPage;
