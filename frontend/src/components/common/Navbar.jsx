import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  Search, 
  Sparkles, 
  Layers, 
  ArrowLeftRight, 
  Ruler, 
  LogOut, 
  ShieldCheck, 
  ChevronDown 
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  // Track scroll position for backdrop styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const navLinkClasses = ({ isActive }) =>
    `text-xs uppercase tracking-widest font-medium transition-colors hover:text-primary ${
      isActive ? "text-primary font-bold border-b-2 border-primary pb-1" : "text-dark/80"
    }`;

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-secondary/90 backdrop-blur-sm border-b border-border/60"
    }`}>
      {/* Top Banner */}
      <div className="bg-primary text-secondary text-[11px] tracking-widest uppercase font-medium py-1.5 px-4 text-center">
        <span>Sustainable Circular Fashion • Free Shipping Above ₹2,999 • Try Intelligent FitMatch</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-dark hover:text-primary focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo with Uploaded Brand Graphic */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <img
                src="/images/stylecycle-logo.png"
                alt="STYLECYCLE Logo"
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover shadow-xs border border-primary/20 group-hover:scale-105 transition-transform duration-200"
              />
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-primary group-hover:text-primary-dark transition-colors leading-none">
                  STYLECYCLE
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-dark-muted font-sans font-medium mt-1">
                  Revive &bull; Rewear &bull; Restyle
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <NavLink to="/" className={navLinkClasses}>Home</NavLink>
            <NavLink to="/marketplace" className={navLinkClasses}>Marketplace</NavLink>
            <NavLink to="/marketplace?filter=buy" className={navLinkClasses}>Buy</NavLink>
            <NavLink to="/sell" className={navLinkClasses}>Sell</NavLink>
            <NavLink to="/exchange" className={navLinkClasses}>Exchange</NavLink>
            <NavLink to="/fitmatch" className={navLinkClasses}>
              <span className="inline-flex items-center gap-1">
                <Ruler className="w-3.5 h-3.5" />
                FitMatch
              </span>
            </NavLink>
            <NavLink to="/wardrobe" className={navLinkClasses}>
              <span className="inline-flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" />
                My Wardrobe
              </span>
            </NavLink>
            <NavLink to="/stylist" className={navLinkClasses}>
              <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-accent-dark" />
                AI Stylist
              </span>
            </NavLink>
          </nav>

          {/* Right Utilities (Search, Wishlist, Cart, Profile) */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Search Input (Desktop) */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search brands, styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-44 lg:w-56 pl-8 pr-3 py-1.5 text-xs bg-white border border-border rounded-full focus:outline-none focus:border-primary focus:w-64 transition-all duration-300"
              />
              <Search className="w-3.5 h-3.5 text-dark-muted absolute left-2.5" />
            </form>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 text-dark hover:text-primary transition-colors"
              title="My Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.7]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-rose-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="relative p-2 text-dark hover:text-primary transition-colors"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.7]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User / Profile Menu */}
            <div className="relative">
              {isAuthenticated ? (
                <div>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1 rounded-full border border-border hover:border-primary transition-colors focus:outline-none"
                  >
                    <img
                      src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                      alt={user?.name || "User"}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <ChevronDown className="w-3.5 h-3.5 text-dark-muted hidden sm:block mr-1" />
                  </button>

                  {/* Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-floating border border-border py-2 z-50 animate-fade-in">
                      <div className="px-4 py-2 border-b border-border/70">
                        <p className="text-xs font-semibold text-dark truncate">{user?.name}</p>
                        <p className="text-[11px] text-dark-muted truncate">{user?.email}</p>
                        {user?.role === "admin" && (
                          <span className="inline-block mt-1 px-1.5 py-0.5 bg-primary-soft text-primary text-[10px] font-bold rounded">
                            Administrator
                          </span>
                        )}
                      </div>

                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="flex items-center gap-2 px-4 py-2 text-xs text-dark hover:bg-secondary transition-colors"
                        >
                          <User className="w-3.5 h-3.5 text-dark-muted" />
                          Profile & Measurements
                        </Link>
                        <Link
                          to="/my-listings"
                          className="flex items-center gap-2 px-4 py-2 text-xs text-dark hover:bg-secondary transition-colors"
                        >
                          <Layers className="w-3.5 h-3.5 text-dark-muted" />
                          My Listings & Drafts
                        </Link>
                        <Link
                          to="/exchange/manage"
                          className="flex items-center gap-2 px-4 py-2 text-xs text-dark hover:bg-secondary transition-colors"
                        >
                          <ArrowLeftRight className="w-3.5 h-3.5 text-dark-muted" />
                          Exchange Requests
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center gap-2 px-4 py-2 text-xs text-dark hover:bg-secondary transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-dark-muted" />
                          Order History
                        </Link>

                        {/* Admin Link (Only visible if administrator) */}
                        {isAdmin && (
                          <Link
                            to="/admin"
                            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-emerald-800 hover:bg-emerald-50 transition-colors"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                            Admin Dashboard
                          </Link>
                        )}
                      </div>

                      <div className="border-t border-border/70 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setProfileDropdownOpen(false);
                            navigate("/");
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors text-left"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="text-xs font-semibold tracking-wider uppercase text-primary hover:text-primary-dark px-3 py-1.5"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="hidden sm:inline-flex luxury-btn luxury-btn-primary px-3.5 py-1.5 rounded-sm text-xs uppercase tracking-wider font-semibold"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-lg">
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <input
              type="text"
              placeholder="Search products, brands, or styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-secondary border border-border rounded-md focus:outline-none focus:border-primary"
            />
            <Search className="w-4 h-4 text-dark-muted absolute left-3 top-3" />
          </form>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link to="/" className="p-2 hover:bg-secondary rounded font-medium text-dark">Home</Link>
            <Link to="/marketplace" className="p-2 hover:bg-secondary rounded font-medium text-dark">Marketplace</Link>
            <Link to="/marketplace?filter=buy" className="p-2 hover:bg-secondary rounded font-medium text-dark">Buy</Link>
            <Link to="/sell" className="p-2 hover:bg-secondary rounded font-medium text-dark">Sell Clothes</Link>
            <Link to="/exchange" className="p-2 hover:bg-secondary rounded font-medium text-dark">Exchange</Link>
            <Link to="/fitmatch" className="p-2 hover:bg-secondary rounded font-medium text-dark flex items-center gap-1.5">
              <Ruler className="w-4 h-4 text-primary" /> FitMatch
            </Link>
            <Link to="/wardrobe" className="p-2 hover:bg-secondary rounded font-medium text-dark flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-primary" /> My Wardrobe
            </Link>
            <Link to="/stylist" className="p-2 hover:bg-secondary rounded font-medium text-emerald-800 flex items-center gap-1.5 font-semibold">
              <Sparkles className="w-4 h-4 text-accent-dark" /> AI Stylist
            </Link>
          </div>

          <div className="pt-3 border-t border-border/70 flex flex-col gap-2">
            <Link to="/smart-shopping" className="text-xs font-semibold text-primary uppercase tracking-wider py-1">
              ✨ Smart Shopping (Wardrobe Gap Recommendations)
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-xs font-semibold text-emerald-800 uppercase tracking-wider py-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
