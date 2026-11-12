import React, { useState } from "react";
import { useWardrobe } from "../context/WardrobeContext";
import { WardrobeItemCard } from "../components/wardrobe/WardrobeItemCard";
import { WardrobeUploadModal } from "../components/wardrobe/WardrobeUploadModal";
import { WardrobeStats } from "../components/wardrobe/WardrobeStats";
import { EmptyState } from "../components/common/EmptyState";
import { Plus, Search, Filter, Layers, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const WardrobePage = () => {
  const { wardrobe, addItem, deleteItem, toggleFavorite, outfits, wardrobeStats } = useWardrobe();

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filterFavorites, setFilterFavorites] = useState(false);

  // Filtered wardrobe
  const filteredItems = wardrobe.filter((item) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = item.name.toLowerCase().includes(q) ||
                    item.brand.toLowerCase().includes(q) ||
                    item.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (selectedCategory !== "all" && item.category !== selectedCategory) {
      return false;
    }
    if (filterFavorites && !item.isFavorite) {
      return false;
    }
    return true;
  });

  const categories = [
    "all", "Tops", "T-shirts", "Shirts", "Jeans", "Trousers", 
    "Dresses", "Jackets", "Shoes", "Accessories"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Wardrobe Management</span>
          <h1 className="font-serif text-3xl font-bold text-dark mt-1">My Digital Wardrobe</h1>
          <p className="text-xs text-dark-muted mt-1">Catalog, track rotations and effortlessly curate outfits from pieces you own.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/stylist"
            className="luxury-btn luxury-btn-accent px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Style An Outfit
          </Link>

          <button
            onClick={() => setUploadModalOpen(true)}
            className="luxury-btn luxury-btn-primary px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Garment
          </button>
        </div>
      </div>

      {/* Wardrobe Utilization Statistics */}
      <WardrobeStats stats={wardrobeStats} />

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-sm border border-border shadow-subtle">
        
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search wardrobe by name, brand, or color..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary"
          />
          <Search className="w-4 h-4 text-dark-muted absolute left-3 top-2.5" />
        </div>

        {/* Categories & Favorites Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterFavorites(!filterFavorites)}
            className={`px-3 py-1.5 rounded-sm text-xs font-semibold flex items-center gap-1 transition-colors ${
              filterFavorites
                ? "bg-amber-100 text-amber-900 border border-amber-300"
                : "bg-secondary text-dark hover:bg-border border border-border"
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${filterFavorites ? "fill-amber-600 text-amber-600" : ""}`} />
            Favorites Only
          </button>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs p-2 bg-secondary border border-border rounded-sm font-medium"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Wardrobe Items Grid */}
      {filteredItems.length === 0 ? (
        <EmptyState
          icon={Layers}
          title="No Garments Found"
          description="Try clearing your search query or upload a new garment to begin digitizing your closet."
          actionText="Add a Garment"
          onAction={() => setUploadModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <WardrobeItemCard
              key={item.id}
              item={item}
              onToggleFavorite={toggleFavorite}
              onDelete={deleteItem}
            />
          ))}
        </div>
      )}

      {/* Upload Garment Modal */}
      <WardrobeUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUpload={addItem}
      />

    </div>
  );
};
