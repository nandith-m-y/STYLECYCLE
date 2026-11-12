import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { useWardrobe } from "../context/WardrobeContext";
import { useListings } from "../context/ListingContext";
import { MeasurementForm } from "../components/fitmatch/MeasurementForm";
import { 
  User, 
  MapPin, 
  Ruler, 
  Heart, 
  ShoppingBag, 
  Layers, 
  ArrowLeftRight, 
  Check, 
  Plus 
} from "lucide-react";

export const ProfilePage = () => {
  const { user, updateProfile, updateMeasurements } = useAuth();
  const { wishlist } = useWishlist();
  const { wardrobe } = useWardrobe();
  const { activeListings } = useListings();

  const [activeTab, setActiveTab] = useState("info"); // info, addresses, measurements, activity
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || ""
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Profile Banner */}
      <div className="bg-white border border-border p-6 sm:p-8 rounded-sm shadow-subtle flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
          alt={user?.name}
          className="w-24 h-24 rounded-full object-cover border-2 border-primary"
        />
        <div className="text-center sm:text-left space-y-1 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-dark">{user?.name}</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-soft text-primary self-center sm:self-auto border border-primary/20">
              Verified Circular Member
            </span>
          </div>
          <p className="text-xs text-dark-muted">{user?.email} &bull; Member since {user?.memberSince || "2025"}</p>
          <p className="text-xs text-dark/80 italic max-w-xl pt-1">"{user?.bio}"</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border gap-6 text-xs font-bold uppercase tracking-wider overflow-x-auto">
        {[
          { id: "info", label: "Personal Details", icon: User },
          { id: "measurements", label: "Measurement Profile", icon: Ruler },
          { id: "addresses", label: "Saved Addresses", icon: MapPin },
          { id: "activity", label: "Wardrobe & Activity Hub", icon: Layers }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 flex items-center gap-1.5 transition-colors flex-shrink-0 ${
                activeTab === tab.id
                  ? "border-b-2 border-primary text-primary"
                  : "text-dark-muted hover:text-dark"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Personal Details */}
      {activeTab === "info" && (
        <form onSubmit={handleProfileSave} className="bg-white border border-border p-6 rounded-sm shadow-subtle space-y-6 max-w-2xl">
          <h2 className="font-serif text-lg font-bold text-dark pb-2 border-b border-border">
            Edit Personal Profile
          </h2>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold uppercase tracking-wider text-dark">Full Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full p-2.5 bg-secondary border border-border rounded-sm font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold uppercase tracking-wider text-dark">Email Address</label>
              <input
                type="email"
                disabled
                value={profileForm.email}
                className="w-full p-2.5 bg-secondary/50 border border-border rounded-sm text-dark-muted cursor-not-allowed"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold uppercase tracking-wider text-dark">Phone Number</label>
              <input
                type="tel"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full p-2.5 bg-secondary border border-border rounded-sm font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold uppercase tracking-wider text-dark">Bio & Circular Philosophy</label>
              <textarea
                rows={3}
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                className="w-full p-2.5 bg-secondary border border-border rounded-sm leading-relaxed"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-xs text-dark-muted">Updates take effect immediately across all devices.</span>
            <button
              type="submit"
              className="luxury-btn luxury-btn-primary px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              {savedSuccess ? <><Check className="w-4 h-4" /> Changes Saved</> : "Save Profile"}
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Measurements Profile */}
      {activeTab === "measurements" && (
        <div className="max-w-4xl space-y-4">
          <MeasurementForm
            measurements={user?.measurements || {}}
            onChange={(m) => updateMeasurements(m)}
            onSave={(m) => updateMeasurements(m)}
          />
        </div>
      )}

      {/* Tab 3: Saved Addresses */}
      {activeTab === "addresses" && (
        <div className="space-y-4 max-w-3xl">
          <div className="flex justify-between items-center pb-2 border-b border-border">
            <h2 className="font-serif text-lg font-bold text-dark">Saved Delivery Addresses</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user?.addresses?.map((addr) => (
              <div key={addr.id} className="p-4 bg-white border border-border rounded-sm shadow-subtle space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-dark text-sm">{addr.title}</span>
                  {addr.isDefault && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-soft text-primary">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-dark font-medium">{addr.name}</p>
                <p className="text-dark-muted leading-relaxed">{addr.street}, {addr.city}, {addr.state} - {addr.pincode}</p>
                <p className="text-dark-muted">Phone: {addr.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Activity Hub */}
      {activeTab === "activity" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/wardrobe" className="p-6 bg-white border border-border rounded-sm shadow-subtle hover:shadow-card transition-all space-y-2 block">
            <div className="w-10 h-10 rounded-full bg-primary-soft text-primary flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-dark">Digital Wardrobe</h3>
            <p className="text-xs text-dark-muted">{wardrobe.length} items cataloged and ready for outfit generation.</p>
          </Link>

          <Link to="/my-listings" className="p-6 bg-white border border-border rounded-sm shadow-subtle hover:shadow-card transition-all space-y-2 block">
            <div className="w-10 h-10 rounded-full bg-accent/30 text-dark flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-dark">My Listings</h3>
            <p className="text-xs text-dark-muted">{activeListings.length} active marketplace listings.</p>
          </Link>

          <Link to="/exchange/manage" className="p-6 bg-white border border-border rounded-sm shadow-subtle hover:shadow-card transition-all space-y-2 block">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-dark">Exchange Proposals</h3>
            <p className="text-xs text-dark-muted">Inspect incoming offers and trade clothes directly.</p>
          </Link>
        </div>
      )}

    </div>
  );
};
