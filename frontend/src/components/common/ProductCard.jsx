import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, ArrowLeftRight } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { ConditionBadge, ExchangeBadge } from "./Badge";

export const ProductCard = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.size || "M", 1);
  };

  return (
    <div className="group relative bg-white border border-border rounded-sm overflow-hidden hover:shadow-card transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-fashion overflow-hidden bg-secondary">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images ? product.images[0] : (product.image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80")}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            isWishlisted
              ? "bg-white text-rose-600 shadow-sm"
              : "bg-white/80 text-dark-muted hover:text-rose-600 hover:bg-white"
          }`}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-600" : ""}`} />
        </button>

        {/* Top-Left Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <ConditionBadge condition={product.condition} />
          {product.isExchangeable && <ExchangeBadge />}
        </div>

        {/* Quick Add Overlay on Hover */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
          <button
            onClick={handleQuickAdd}
            className="flex-1 bg-white text-dark text-xs font-semibold py-2 px-3 rounded-sm shadow-sm hover:bg-secondary flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Quick Add
          </button>
          <Link
            to={`/product/${product.id}`}
            className="bg-primary text-white text-xs font-semibold py-2 px-3 rounded-sm hover:bg-primary-dark transition-colors flex items-center justify-center"
          >
            View
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Brand & Size */}
          <div className="flex items-center justify-between text-xs text-dark-muted mb-1">
            <span className="font-semibold uppercase tracking-wider text-primary">{product.brand}</span>
            <span className="px-1.5 py-0.5 bg-secondary rounded text-[11px] font-medium border border-border">Size {product.size}</span>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="block">
            <h4 className="text-sm font-medium text-dark line-clamp-1 hover:text-primary transition-colors">
              {product.name}
            </h4>
          </Link>

          {/* Pricing - Level aligned with clean Indian Rupee format */}
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <span className="text-base font-bold text-dark leading-none">₹{product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice && (
              <span className="text-xs text-dark-muted line-through leading-none">₹{product.originalPrice.toLocaleString("en-IN")}</span>
            )}
            {product.discount > 0 && (
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded leading-none border border-emerald-200/60">
                {product.discount}% off
              </span>
            )}
          </div>
        </div>

        {/* Seller Info */}
        {product.seller && (
          <div className="mt-3 pt-3 border-t border-border/70 flex items-center justify-between text-xs text-dark-muted">
            <div className="flex items-center gap-1.5">
              <img
                src={product.seller.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                alt={product.seller.name}
                className="w-4 h-4 rounded-full object-cover"
              />
              <span className="truncate max-w-[110px]">{product.seller.name}</span>
            </div>
            {product.seller.rating && (
              <span className="flex items-center text-amber-600 font-medium">
                ★ {product.seller.rating}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
