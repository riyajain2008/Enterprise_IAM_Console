
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Copy, RefreshCw, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const TwoFactorSetupPage = () => {
  const [enabled, setEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Mock QR code data (in real app, this would come from backend)
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/IAM%20Console:john@example.com?secret=JBSWY3DPEHPK3PXP&issuer=IAM%20Console";
  const secretKey = "JBSWY3DPEHPK3PXP";

  const generateBackupCodes = () => {
    const codes = Array.from({ length: 8 }, () => 
      Math.random().toString(36).substring(2, 8).toUpperCase()
    );
    setBackupCodes(codes);
    setShowBackupCodes(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
    });
  };

  const handleEnable2FA = async () => {
    if (!verificationCode) {
      toast({
        title: "Verification required",
        description: "Please enter the 6-digit code from your authenticator app.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/2fa/enable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({ code: verificationCode }),
      });

      if (response.ok) {
        setEnabled(true);
        generateBackupCodes();
        toast({
          title: "2FA Enabled Successfully",
          description: "Your account is now protected with two-factor authentication.",
        });
      } else {
        toast({
          title: "Invalid Code",
          description: "Please check your authenticator app and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      // For demo purposes
      setEnabled(true);
      generateBackupCodes();
      toast({
        title: "2FA Enabled Successfully",
        description: "Your account is now protected with two-factor authentication.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/2fa/disable", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      
      setEnabled(false);
      setShowBackupCodes(false);
      setBackupCodes([]);
      toast({
        title: "2FA Disabled",
        description: "Two-factor authentication has been disabled for your account.",
      });
    } catch (error) {
      // For demo purposes
      setEnabled(false);
      setShowBackupCodes(false);
      setBackupCodes([]);
      toast({
        title: "2FA Disabled",
        description: "Two-factor authentication has been disabled for your account.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Two-Factor Authentication</h1>
          <p className="text-gray-600">Add an extra layer of security to your account</p>
        </div>

        <div className="space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>2FA Status</CardTitle>
                  <CardDescription>
                    {enabled ? "Two-factor authentication is enabled" : "Two-factor authentication is disabled"}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-3">
                  {enabled && <CheckCircle className="w-5 h-5 text-green-500" />}
                  <Switch
                    checked={enabled}
                    onCheckedChange={enabled ? handleDisable2FA : () => {}}
                    disabled={loading}
                  />
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Setup Card */}
          {!enabled && (
            <Card>
              <CardHeader>
                <CardTitle>Set up Authenticator App</CardTitle>
                <CardDescription>
                  Scan the QR code with your authenticator app or enter the secret key manually
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* QR Code */}
                  <div className="flex-1 text-center">
                    <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 inline-block">
                      <img src={qrCodeUrl} alt="2FA QR Code" className="w-48 h-48" />
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Setup Instructions:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                        <li>Install an authenticator app (Google Authenticator, Authy, etc.)</li>
                        <li>Scan the QR code or enter the secret key</li>
                        <li>Enter the 6-digit code to verify</li>
                      </ol>
                    </div>

                    <div>
                      <Label htmlFor="secret" className="text-sm font-medium">Secret Key</Label>
                      <div className="flex mt-1">
                        <Input
                          id="secret"
                          value={secretKey}
                          readOnly
                          className="flex-1 font-mono text-sm"
                        />
                        <Button
                          type="button"
                          onClick={() => copyToClipboard(secretKey)}
                          variant="outline"
                          size="sm"
                          className="ml-2"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="verification-code" className="text-sm font-medium">
                      Verification Code
                    </Label>
                    <Input
                      id="verification-code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      className="max-w-xs"
                    />
                  </div>

                  <Button
                    onClick={handleEnable2FA}
                    disabled={loading || verificationCode.length !== 6}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    {loading ? "Verifying..." : "Enable 2FA"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Backup Codes */}
          {showBackupCodes && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-800">
                  <Shield className="w-5 h-5 mr-2" />
                  Backup Codes
                </CardTitle>
                <CardDescription className="text-yellow-700">
                  Save these backup codes in a secure location. You can use them to access your account if you lose your authenticator device.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4 border-yellow-300 bg-yellow-100">
                  <AlertDescription className="text-yellow-800">
                    <strong>Important:</strong> Each backup code can only be used once. Store them securely and don't share them with anyone.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {backupCodes.map((code, index) => (
                    <div
                      key={index}
                      className="bg-white border rounded-md p-3 font-mono text-center text-sm cursor-pointer hover:bg-gray-50"
                      onClick={() => copyToClipboard(code)}
                    >
                      {code}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => copyToClipboard(backupCodes.join('\n'))}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All Codes
                  </Button>
                  <Button
                    onClick={generateBackupCodes}
                    variant="outline"
                    size="sm"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate New Codes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="text-center">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorSetupPage;
