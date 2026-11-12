import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShieldCheck, RefreshCw, Sparkles, Heart } from "lucide-react";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please provide a valid email address.");
      return;
    }

    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-primary-dark text-secondary/90 border-t border-primary/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-white/10 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <RefreshCw className="w-6 h-6 text-accent flex-shrink-0" />
            <div>
              <h5 className="font-medium text-white text-sm">Circular Exchange</h5>
              <p className="text-xs text-secondary/70">Direct wardrobe-to-wardrobe trades</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <ShieldCheck className="w-6 h-6 text-accent flex-shrink-0" />
            <div>
              <h5 className="font-medium text-white text-sm">Condition Verified</h5>
              <p className="text-xs text-secondary/70">Standardized 4-tier condition grading</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Sparkles className="w-6 h-6 text-accent flex-shrink-0" />
            <div>
              <h5 className="font-medium text-white text-sm">Intelligent FitMatch</h5>
              <p className="text-xs text-secondary/70">Zero-guesswork brand sizing</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Heart className="w-6 h-6 text-accent flex-shrink-0" />
            <div>
              <h5 className="font-medium text-white text-sm">Sustainable Impact</h5>
              <p className="text-xs text-secondary/70">Reduces textile landfill waste</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/images/stylecycle-logo.png"
                alt="STYLECYCLE Logo"
                className="w-10 h-10 rounded-full object-cover shadow-sm border border-white/20 group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
                  STYLECYCLE
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-accent/80 font-sans font-medium mt-1">
                  Revive &bull; Rewear &bull; Restyle
                </span>
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-secondary/70 max-w-sm">
              Your Closet. Your Style. Your Cycle. A next-generation fashion marketplace uniting circular commerce with personal digital wardrobe intelligence, brand-accurate fit algorithms, and personalized outfit curation.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h6 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                Subscribe to Curated Circular Drops
              </h6>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded border border-emerald-800">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to the StyleCycle circle! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-1.5">
                  <div className="flex items-center">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      className="w-full px-3.5 py-2 text-xs bg-white/10 text-white placeholder-secondary/50 border border-white/20 rounded-l-sm focus:outline-none focus:border-accent"
                    />
                    <button
                      type="submit"
                      className="luxury-btn bg-accent text-dark hover:bg-accent-light px-4 py-2 rounded-r-sm text-xs font-semibold"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  {error && <p className="text-[11px] text-rose-400">{error}</p>}
                </form>
              )}
            </div>
          </div>

          {/* Column: Marketplace */}
          <div className="space-y-3">
            <h6 className="text-xs font-semibold uppercase tracking-widest text-accent">Marketplace</h6>
            <ul className="space-y-2 text-xs text-secondary/75">
              <li><Link to="/marketplace" className="hover:text-white transition-colors">Explore All Pieces</Link></li>
              <li><Link to="/marketplace?category=tops-shirts" className="hover:text-white transition-colors">Tops & Shirts</Link></li>
              <li><Link to="/marketplace?category=jeans-trousers" className="hover:text-white transition-colors">Denim & Trousers</Link></li>
              <li><Link to="/marketplace?category=dresses-ethnic" className="hover:text-white transition-colors">Dresses & Ethnic</Link></li>
              <li><Link to="/marketplace?category=shoes" className="hover:text-white transition-colors">Shoes & Sneakers</Link></li>
              <li><Link to="/sell" className="hover:text-white transition-colors">List Your Clothes</Link></li>
              <li><Link to="/exchange" className="hover:text-white transition-colors">Direct Clothes Swap</Link></li>
            </ul>
          </div>

          {/* Column: Platform Tech */}
          <div className="space-y-3">
            <h6 className="text-xs font-semibold uppercase tracking-widest text-accent">Styling & Fit</h6>
            <ul className="space-y-2 text-xs text-secondary/75">
              <li><Link to="/fitmatch" className="hover:text-white transition-colors">FitMatch Size Engine</Link></li>
              <li><Link to="/wardrobe" className="hover:text-white transition-colors">Digital Wardrobe Studio</Link></li>
              <li><Link to="/stylist" className="hover:text-white transition-colors">AI Personal Stylist</Link></li>
              <li><Link to="/smart-shopping" className="hover:text-white transition-colors">Complete Your Wardrobe</Link></li>
              <li><Link to="/my-listings" className="hover:text-white transition-colors">Seller Dashboard</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Marketplace Analytics</Link></li>
            </ul>
          </div>

          {/* Column: Help & Policies */}
          <div className="space-y-3">
            <h6 className="text-xs font-semibold uppercase tracking-widest text-accent">Customer Care</h6>
            <ul className="space-y-2 text-xs text-secondary/75">
              <li><Link to="/support/about" className="hover:text-white transition-colors">About STYLECYCLE</Link></li>
              <li><Link to="/support/contact" className="hover:text-white transition-colors">Contact & Support</Link></li>
              <li><Link to="/support/faqs" className="hover:text-white transition-colors">FAQs & Knowledge Base</Link></li>
              <li><Link to="/support/shipping" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/support/returns" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/support/exchange-policy" className="hover:text-white transition-colors">Exchange Policy</Link></li>
              <li><Link to="/support/privacy" className="hover:text-white transition-colors">Privacy & Terms</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-secondary/60 gap-4">
          <p>© {new Date().getFullYear()} STYLECYCLE Platform. All rights reserved. Designed for circular longevity.</p>
          <div className="flex items-center space-x-6">
            <Link to="/support/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/support/terms" className="hover:text-white">Terms of Service</Link>
            <Link to="/admin" className="text-accent hover:underline">Admin Console</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
