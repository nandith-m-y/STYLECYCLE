import React from "react";
import { Link } from "react-router-dom";
import { useWardrobe } from "../context/WardrobeContext";
import { useCart } from "../context/CartContext";
import { getCompleteYourWardrobeProducts, getRecommendedForYourStyle } from "../services/recommendationService";
import { ProductCard } from "../components/common/ProductCard";
import { Sparkles, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export const SmartShoppingPage = () => {
  const { wardrobe } = useWardrobe();
  const { addToCart } = useCart();

  const gapRecommendations = getCompleteYourWardrobeProducts(wardrobe);
  const styleRecommendations = getRecommendedForYourStyle("Minimalist", "unisex");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header Banner */}
      <div className="bg-[#EFECE4] border border-border p-8 sm:p-12 rounded-sm shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-xs font-semibold uppercase tracking-widest text-primary border border-border">
            <Sparkles className="w-3.5 h-3.5 text-accent-dark" />
            Gap Analysis Engine
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-dark">
            Smart Shopping
          </h1>
          <p className="text-xs sm:text-sm text-dark-muted leading-relaxed">
            Stop buying redundant duplicates. We analyze your digital wardrobe to identify missing foundational silhouettes and match you with verified circular marketplace pieces.
          </p>
        </div>

        <div className="p-4 bg-white rounded border border-border text-xs space-y-1 max-w-xs flex-shrink-0">
          <span className="font-bold text-primary block">Wardrobe Status:</span>
          <span>{wardrobe.length} cataloged pieces analyzed across tops, bottoms, outerwear & accessories.</span>
        </div>
      </div>

      {/* =========================================================
          SECTION 1: COMPLETE YOUR WARDROBE (GAP ANALYSIS)
         ========================================================= */}
      <section className="space-y-6">
        <div className="border-b border-border pb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Foundational Gaps</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-dark mt-1">
            Complete Your Wardrobe
          </h2>
          <p className="text-xs text-dark-muted mt-1">
            Complementary pieces that unlock dozens of new outfit combinations from what you already own.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gapRecommendations.map((prod) => (
            <div key={prod.id} className="bg-white border border-border rounded-sm overflow-hidden shadow-subtle flex flex-col justify-between">
              <div>
                {/* Product Image */}
                <Link to={`/product/${prod.id}`} className="block relative aspect-fashion bg-secondary">
                  <img
                    src={prod.images ? prod.images[0] : prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-dark/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    Missing: {prod.gapCategory}
                  </div>
                </Link>

                {/* Details */}
                <div className="p-4 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-primary">{prod.brand}</span>
                    <h3 className="font-semibold text-sm text-dark truncate">{prod.name}</h3>
                    <p className="text-xs font-bold text-dark mt-1">₹{prod.price.toLocaleString("en-IN")}</p>
                  </div>

                  {/* Recommendation Reason */}
                  <div className="bg-primary-soft/50 border border-primary/20 p-2.5 rounded text-[11px] text-dark leading-relaxed">
                    <strong>Why You Need This:</strong> {prod.recommendationReason}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 pt-0 flex gap-2">
                <Link
                  to={`/product/${prod.id}`}
                  className="flex-1 px-3 py-2 border border-border text-xs font-semibold text-dark text-center rounded-sm hover:bg-secondary"
                >
                  View Details
                </Link>
                <button
                  onClick={() => addToCart(prod, prod.size || "M", 1)}
                  className="flex-1 luxury-btn luxury-btn-primary py-2 text-xs font-bold uppercase rounded-sm flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          SECTION 2: RECOMMENDED FOR YOUR STYLE
         ========================================================= */}
      <section className="space-y-6 pt-6 border-t border-border">
        <div className="border-b border-border pb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Aesthetic Alignment</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-dark mt-1">
            Recommended For Your Style
          </h2>
          <p className="text-xs text-dark-muted mt-1">
            Pieces curated to align with your minimalist Scandinavian aesthetic and neutral color palette.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {styleRecommendations.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

    </div>
  );
};
