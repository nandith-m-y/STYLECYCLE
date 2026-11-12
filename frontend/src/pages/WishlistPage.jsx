import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { ProductCard } from "../components/common/ProductCard";
import { EmptyState } from "../components/common/EmptyState";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";

export const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <EmptyState
          icon={Heart}
          title="Your Wishlist is Empty"
          description="Save pieces you love to track price drops, size updates, or circulate them into your wardrobe."
          actionText="Discover Pieces"
          actionLink="/marketplace"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Saved Garments</span>
          <h1 className="font-serif text-3xl font-bold text-dark mt-1">My Wishlist</h1>
          <p className="text-xs text-dark-muted mt-1">{wishlist.length} curated pieces saved for later</p>
        </div>

        <Link
          to="/marketplace"
          className="text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-dark flex items-center gap-1"
        >
          Explore More Pieces <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
};
