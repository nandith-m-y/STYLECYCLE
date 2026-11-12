import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, CheckCircle2 } from "lucide-react";

export const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSuccess(true);
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="font-serif text-3xl font-bold text-dark">Set New Password</h1>
        <p className="text-xs text-dark-muted">Choose a secure password to protect your account.</p>
      </div>

      <div className="bg-white border border-border p-8 rounded-sm shadow-card space-y-6">
        {success ? (
          <div className="text-center space-y-3 py-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-dark">Password Updated!</h3>
            <p className="text-xs text-dark-muted">Redirecting to sign in...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {error && <div className="p-2.5 bg-rose-50 text-rose-700 rounded">{error}</div>}

            <div className="space-y-1">
              <label className="font-semibold uppercase tracking-wider text-dark">New Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary"
                />
                <Lock className="w-4 h-4 text-dark-muted absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold uppercase tracking-wider text-dark">Confirm New Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary"
                />
                <Lock className="w-4 h-4 text-dark-muted absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full luxury-btn luxury-btn-primary py-3 rounded-sm text-xs font-bold uppercase tracking-widest"
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
