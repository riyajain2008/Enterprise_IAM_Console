
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle } from "lucide-react";

interface AccessDeniedModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: string;
  currentRole: string;
}

const AccessDeniedModal: React.FC<AccessDeniedModalProps> = ({
  isOpen,
  onClose,
  action,
  currentRole
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Access Denied
            </DialogTitle>
          </div>
          <DialogDescription className="text-gray-600">
            You don't have permission to perform this action
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Action:</strong> {action}
              <br />
              <strong>Current Role:</strong> {currentRole}
            </AlertDescription>
          </Alert>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Why am I seeing this?</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Your current role doesn't have the required permissions</li>
              <li>• You may need to switch to a different role</li>
              <li>• Contact your administrator for additional access</li>
            </ul>
          </div>

          <div className="flex justify-end">
            <Button onClick={onClose} className="w-full sm:w-auto">
              I Understand
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccessDeniedModal;
