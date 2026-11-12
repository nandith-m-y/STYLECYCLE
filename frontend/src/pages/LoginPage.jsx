import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export const LoginPage = () => {
  const { login, loginDemoAdmin, loginDemoUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("tara.style@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (role) => {
    setLoading(true);
    setError("");
    try {
      if (role === "admin") {
        await loginDemoAdmin();
        navigate("/admin");
      } else {
        await loginDemoUser();
        navigate("/profile");
      }
    } catch (err) {
      setError("Failed to sign in demo account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2 flex flex-col items-center">
        <Link to="/" className="inline-block group mb-1">
          <img
            src="/images/stylecycle-logo.png"
            alt="STYLECYCLE Logo"
            className="w-16 h-16 rounded-full object-cover shadow-sm border border-primary/20 group-hover:scale-105 transition-transform"
          />
        </Link>
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Member Portal</span>
        <h1 className="font-serif text-3xl font-bold text-dark">Welcome Back</h1>
        <p className="text-xs text-dark-muted">Sign in to access your wardrobe, listings, and style recommendations.</p>
      </div>

      <div className="bg-white border border-border p-8 rounded-sm shadow-card space-y-6">
        
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold uppercase tracking-wider text-dark">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary font-medium"
              />
              <Mail className="w-4 h-4 text-dark-muted absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="font-semibold uppercase tracking-wider text-dark">Password</label>
              <Link to="/forgot-password" className="text-primary hover:underline font-semibold">Forgot?</Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary font-medium"
              />
              <Lock className="w-4 h-4 text-dark-muted absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full luxury-btn luxury-btn-primary py-3 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 mt-2"
          >
            {loading ? "Authenticating..." : "Sign In"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Login Buttons */}
        <div className="pt-4 border-t border-border space-y-2">
          <div className="text-center">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-dark-muted">
              One-Click Demonstration Roles
            </span>
            <span className="block text-[10px] text-dark-muted/80">
              (Phase 1 Mock Authentication — Not Production Auth)
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleQuickDemo("user")}
              className="py-2 px-3 bg-secondary hover:bg-border text-dark text-xs font-semibold rounded-sm border border-border transition-colors"
            >
              Demo User (Tara)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo("admin")}
              className="py-2 px-3 bg-primary-soft hover:bg-primary-soft/80 text-primary text-xs font-semibold rounded-sm border border-primary/20 transition-colors"
            >
              Demo Admin Console
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-dark-muted pt-2 border-t border-border">
          Don't have an account yet?{" "}
          <Link to="/register" className="text-primary font-bold hover:underline">
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
};
