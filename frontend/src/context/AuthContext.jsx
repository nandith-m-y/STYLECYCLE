import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

/**
 * SECURITY ARCHITECTURE NOTICE:
 * Client-side authentication and role checks in this context provide defense-in-depth
 * and UI/UX routing control only. In Phase 2, real authorization boundaries must be
 * enforced by the FastAPI backend using cryptographically signed HttpOnly JWT cookies.
 */

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  const login = async (credentials) => {
    const loggedUser = await authService.login(credentials);
    setUser(loggedUser);
    return loggedUser;
  };

  const loginDemoAdmin = async () => {
    const adminUser = await authService.loginDemoAdmin();
    setUser(adminUser);
    return adminUser;
  };

  const loginDemoUser = async () => {
    const demoUser = await authService.loginDemoUser();
    setUser(demoUser);
    return demoUser;
  };

  const register = async (userData) => {
    const newUser = await authService.register(userData);
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateProfile = async (data) => {
    const updated = await authService.updateProfile(data);
    setUser(updated);
    return updated;
  };

  const updateMeasurements = async (measurements) => {
    const updated = await authService.updateProfile({ measurements });
    setUser(updated);
    return updated;
  };

  // Only the dedicated explicit demo admin user receives admin UI access
  const isAdmin = !!user && user.role === "admin" && user.isMockDemoAdmin === true;

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isAdmin,
      login,
      loginDemoAdmin,
      loginDemoUser,
      register,
      logout,
      updateProfile,
      updateMeasurements
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
