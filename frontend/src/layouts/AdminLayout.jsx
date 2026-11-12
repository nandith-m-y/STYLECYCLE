import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  ShieldCheck, 
  Package, 
  Users, 
  ArrowLeftRight, 
  Layers, 
  ArrowLeft,
  ShoppingBag
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const AdminLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: "Overview & Analytics", path: "/admin", icon: BarChart3 },
    { name: "Product Moderation", path: "/admin#moderation", icon: Package },
    { name: "Orders Ledger", path: "/admin#orders", icon: ShoppingBag },
    { name: "Exchange Operations", path: "/admin#exchanges", icon: ArrowLeftRight },
    { name: "User Directory", path: "/admin#users", icon: Users },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F3F2EE] text-dark">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-primary text-secondary flex flex-col justify-between p-6 shadow-md">
        <div className="space-y-6">
          {/* Logo */}
          <div className="border-b border-primary-light pb-4">
            <Link to="/" className="block">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">STYLECYCLE</span>
              <span className="block text-[10px] uppercase tracking-widest text-accent font-sans mt-0.5">
                Admin Console
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-xs font-semibold tracking-wide transition-colors ${
                    isActive ? "bg-primary-dark text-white" : "text-secondary/80 hover:bg-primary-light hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 text-accent" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Return to Marketplace & Admin Info */}
        <div className="pt-6 border-t border-primary-light space-y-3">
          <div className="flex items-center gap-2 text-xs">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span className="text-secondary/90 font-medium truncate">{user?.name || "Administrator"}</span>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-accent hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Return to Marketplace
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-white border-b border-border px-8 py-4 flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-dark">Executive Platform Analytics</h2>
          <div className="flex items-center gap-3 text-xs text-dark-muted">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Circular Engine
          </div>
        </header>

        <main className="p-6 md:p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
