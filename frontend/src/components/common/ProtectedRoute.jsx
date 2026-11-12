import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * SECURITY DEFENSE-IN-DEPTH NOTICE:
 * This component provides client-side route guard protection to prevent unauthenticated
 * users from accessing private customer interfaces.
 *
 * IMPORTANT LIMITATION:
 * Client-side route guards are a UI/UX defense-in-depth measure only and CANNOT replace
 * backend authorization. Authoritative access controls must be enforced on every API
 * request in the FastAPI backend using signed HttpOnly JWT cookies in Phase 2.
 */
export const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Save intended destination for post-login redirect
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

