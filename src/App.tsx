
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth Context
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Auth Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import TwoFactorSetupPage from "./pages/auth/TwoFactorSetupPage";
import AccessDeniedPage from "./pages/auth/AccessDeniedPage";

// User Pages
import UserDashboard from "./pages/user/UserDashboard";
import ProfileSettings from "./pages/user/ProfileSettings";

// Admin Pages
import AdminLayout from "./components/layout/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import UserManagement from "./pages/admin/UserManagement";
import RoleManagement from "./pages/admin/RoleManagement";
import PolicyEditor from "./pages/admin/PolicyEditor";
import AuditLogs from "./pages/admin/AuditLogs";
import SessionManagement from "./pages/admin/SessionManagement";
import ApiKeyManagement from "./pages/admin/ApiKeyManagement";

// Protected Resource Pages
import ProjectsPage from "./pages/resources/ProjectsPage";
import BillingPage from "./pages/resources/BillingPage";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<HomePage />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/2fa-setup" element={<TwoFactorSetupPage />} />
            <Route path="/access-denied" element={<AccessDeniedPage />} />
            
            {/* User Routes */}
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/profile" element={<ProfileSettings />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route 
                path="users" 
                element={
                  <ProtectedRoute requiredPermissions={["read:users"]}>
                    <UserManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="roles" 
                element={
                  <ProtectedRoute requiredPermissions={["read:roles"]}>
                    <RoleManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="policies" 
                element={
                  <ProtectedRoute requiredPermissions={["read:policies"]}>
                    <PolicyEditor />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="projects" 
                element={
                  <ProtectedRoute requiredPermissions={["read:projects"]}>
                    <ProjectsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="audit-logs" 
                element={
                  <ProtectedRoute requiredPermissions={["read:audit-logs"]}>
                    <AuditLogs />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="sessions" 
                element={
                  <ProtectedRoute requiredPermissions={["read:sessions"]}>
                    <SessionManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="api-keys" 
                element={
                  <ProtectedRoute requiredPermissions={["read:api-keys"]}>
                    <ApiKeyManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="billing" 
                element={
                  <ProtectedRoute requiredPermissions={["read:billing", "manage:billing"]}>
                    <BillingPage />
                  </ProtectedRoute>
                } 
              />
            </Route>
            
            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
