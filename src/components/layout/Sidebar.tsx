
import { NavLink, useLocation } from "react-router-dom";
import { Shield, Users, Key, FileText, Activity, Settings, Eye, BarChart3, FolderOpen, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const navigation = [
  { name: "Overview", href: "/admin", icon: BarChart3, permissions: [] },
  { name: "Users", href: "/admin/users", icon: Users, permissions: ["read:users"] },
  { name: "Roles", href: "/admin/roles", icon: Shield, permissions: ["read:roles"] },
  { name: "Policies", href: "/admin/policies", icon: FileText, permissions: ["read:policies"] },
  { name: "Projects", href: "/admin/projects", icon: FolderOpen, permissions: ["read:projects"] },
  { name: "Audit Logs", href: "/admin/audit-logs", icon: Activity, permissions: ["read:audit-logs"] },
  { name: "Sessions", href: "/admin/sessions", icon: Eye, permissions: ["read:sessions"] },
  { name: "API Keys", href: "/admin/api-keys", icon: Key, permissions: ["read:api-keys"] },
  { name: "Billing", href: "/admin/billing", icon: CreditCard, permissions: ["read:billing"] },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const { hasAnyPermission } = useAuth();

  // Filter navigation items based on user permissions
  const visibleNavigation = navigation.filter(item => 
    item.permissions.length === 0 || hasAnyPermission(item.permissions)
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-semibold text-gray-900">IAM Console</span>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {visibleNavigation.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href === "/admin" && location.pathname === "/admin");
              
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  end={item.href === "/admin"}
                >
                  <item.icon
                    className={cn(
                      "mr-3 flex-shrink-0 h-5 w-5 transition-colors",
                      isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"
                    )}
                  />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-semibold text-gray-900">IAM Console</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {visibleNavigation.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href === "/admin" && location.pathname === "/admin");
              
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  end={item.href === "/admin"}
                >
                  <item.icon
                    className={cn(
                      "mr-3 flex-shrink-0 h-5 w-5 transition-colors",
                      isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"
                    )}
                  />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
