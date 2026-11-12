import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Phone, Lock, ArrowRight } from "lucide-react";

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!agreeTerms) {
      setError("Please accept the circular fashion terms and privacy policy.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    try {
      await register(form);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2 flex flex-col items-center">
        <Link to="/" className="inline-block group mb-1">
          <img
            src="/images/stylecycle-logo.png"
            alt="STYLECYCLE Logo"
            className="w-16 h-16 rounded-full object-cover shadow-sm border border-primary/20 group-hover:scale-105 transition-transform"
          />
        </Link>
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Join the Movement</span>
        <h1 className="font-serif text-3xl font-bold text-dark">Create Your Account</h1>
        <p className="text-xs text-dark-muted">Start buying, selling, and circular swapping with personal styling intelligence.</p>
      </div>

      <div className="bg-white border border-border p-8 rounded-sm shadow-card space-y-6">
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold uppercase tracking-wider text-dark">Full Name *</label>
            <div className="relative">
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="Tara Deshmukh"
                className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary font-medium"
              />
              <User className="w-4 h-4 text-dark-muted absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold uppercase tracking-wider text-dark">Email Address *</label>
            <div className="relative">
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="tara@example.com"
                className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary font-medium"
              />
              <Mail className="w-4 h-4 text-dark-muted absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold uppercase tracking-wider text-dark">Phone Number</label>
            <div className="relative">
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98200 45678"
                className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary font-medium"
              />
              <Phone className="w-4 h-4 text-dark-muted absolute left-3 top-3" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold uppercase tracking-wider text-dark">Password *</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary"
                />
                <Lock className="w-4 h-4 text-dark-muted absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold uppercase tracking-wider text-dark">Confirm Password *</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary"
                />
                <Lock className="w-4 h-4 text-dark-muted absolute left-3 top-3" />
              </div>
            </div>
          </div>

          <label className="flex items-start gap-2 pt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 accent-primary"
            />
            <span className="text-[11px] text-dark-muted">
              I agree to the STYLECYCLE Circular Guidelines, Terms of Service, and Privacy Policy.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full luxury-btn luxury-btn-primary py-3 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 mt-2"
          >
            {loading ? "Registering..." : "Create Account"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-dark-muted pt-2 border-t border-border">
          Already a member?{" "}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
