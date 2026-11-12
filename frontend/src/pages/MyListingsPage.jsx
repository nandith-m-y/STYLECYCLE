import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useListings } from "../context/ListingContext";
import { ConditionBadge, ExchangeBadge } from "../components/common/Badge";
import { EmptyState } from "../components/common/EmptyState";
import { Layers, Eye, Trash2, Edit3, Plus, Heart } from "lucide-react";

export const MyListingsPage = () => {
  const { listings, activeListings, draftListings, soldListings, deleteListing } = useListings();
  const [activeTab, setActiveTab] = useState("Active"); // Active, Draft, Sold

  const currentList = activeTab === "Active" ? activeListings : activeTab === "Draft" ? draftListings : soldListings;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Seller Studio</span>
          <h1 className="font-serif text-3xl font-bold text-dark mt-1">My Garment Listings</h1>
          <p className="text-xs text-dark-muted mt-1">Manage active listings, draft proposals and historical sales.</p>
        </div>

        <Link
          to="/sell"
          className="luxury-btn luxury-btn-primary px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          List New Item
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border gap-6 text-xs font-bold uppercase tracking-wider">
        {[
          { id: "Active", label: `Active Listings (${activeListings.length})` },
          { id: "Draft", label: `Drafts (${draftListings.length})` },
          { id: "Sold", label: `Sold History (${soldListings.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-primary text-primary"
                : "text-dark-muted hover:text-dark"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Listing Cards */}
      {currentList.length === 0 ? (
        <EmptyState
          icon={Layers}
          title={`No ${activeTab} Listings`}
          description={`You do not have any items in the ${activeTab.toLowerCase()} state.`}
          actionText="Create Listing"
          actionLink="/sell"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentList.map((item) => (
            <div key={item.id} className="bg-white border border-border rounded-sm overflow-hidden shadow-subtle p-4 flex flex-col justify-between space-y-4">
              <div className="flex gap-4">
                <div className="w-24 h-32 rounded bg-secondary overflow-hidden flex-shrink-0">
                  <img
                    src={item.images ? item.images[0] : item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-primary">{item.brand}</span>
                    <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded border border-border">Size {item.size}</span>
                  </div>
                  <h3 className="text-xs font-bold text-dark truncate">{item.name}</h3>
                  <p className="text-xs font-bold text-dark">₹{item.price?.toLocaleString("en-IN")}</p>
                  
                  <div className="flex flex-wrap gap-1 pt-1">
                    <ConditionBadge condition={item.condition} />
                  </div>
                </div>
              </div>

              {/* Metrics & Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-border/70 text-xs">
                <div className="flex items-center gap-3 text-dark-muted text-[11px]">
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {item.viewsCount || 0}</span>
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {item.likesCount || 0}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => deleteListing(item.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                    title="Delete Listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <Link
                    to={`/product/${item.id}`}
                    className="px-3 py-1 bg-secondary hover:bg-border text-dark text-xs font-semibold rounded"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
