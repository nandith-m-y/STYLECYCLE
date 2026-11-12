import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * SECURITY DEFENSE-IN-DEPTH NOTICE:
 * This component guards administrator interfaces, rejecting unauthenticated or non-admin visitors.
 *
 * IMPORTANT LIMITATION:
 * Client-side route guards are UI presentation controls only. In Phase 2, every administrative
 * endpoint under `/api/v1/admin/*` must enforce cryptographic server-side role verification
 * (`require_admin_role` dependency) regardless of frontend route state.
 */
export const AdminRoute = ({ redirectPath = "/" }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6 bg-secondary">
        <div className="max-w-md w-full bg-white border border-rose-200 rounded-sm p-8 shadow-card text-center space-y-4">
          <div className="w-14 h-14 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-dark">Access Denied</h2>
          <p className="text-xs text-dark-muted leading-relaxed">
            Administrative privileges are required to access this portal. Your current session does not possess authorized administrator credentials.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/login"
              className="luxury-btn luxury-btn-primary py-2.5 px-4 text-xs font-semibold rounded-sm uppercase tracking-wider"
            >
              Sign In with Authorized Account
            </Link>
            <Link
              to={redirectPath}
              className="text-xs text-primary font-semibold hover:underline"
            >
              Return to Marketplace Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

