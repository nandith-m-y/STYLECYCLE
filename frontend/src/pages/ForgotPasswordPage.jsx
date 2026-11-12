import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="font-serif text-3xl font-bold text-dark">Password Recovery</h1>
        <p className="text-xs text-dark-muted">Enter your registered email to receive a password reset link.</p>
      </div>

      <div className="bg-white border border-border p-8 rounded-sm shadow-card space-y-6">
        {sent ? (
          <div className="text-center space-y-3 py-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-dark">Recovery Link Dispatched</h3>
            <p className="text-xs text-dark-muted">
              We've sent reset instructions to <strong>{email}</strong>. For demo purposes, you can jump directly to the reset interface:
            </p>
            <div className="pt-2">
              <Link to="/reset-password" className="luxury-btn luxury-btn-primary px-5 py-2 text-xs uppercase font-bold rounded-sm">
                Reset Password Now
              </Link>
            </div>
          </div>
        ) : (
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

            <button
              type="submit"
              className="w-full luxury-btn luxury-btn-primary py-3 rounded-sm text-xs font-bold uppercase tracking-widest"
            >
              Send Reset Link
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-border">
          <Link to="/login" className="text-xs text-dark-muted hover:text-primary flex items-center justify-center gap-1 font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
