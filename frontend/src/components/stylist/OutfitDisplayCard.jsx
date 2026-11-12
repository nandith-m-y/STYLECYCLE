import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, RefreshCw, Sparkles, ArrowRight, Check } from "lucide-react";

export const OutfitDisplayCard = ({ outfit, onSave, onRegenerate }) => {
  const [saved, setSaved] = useState(false);

  if (!outfit) return null;

  const handleSave = () => {
    if (onSave) onSave(outfit);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-white border border-border rounded-sm shadow-subtle p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary-soft px-2.5 py-1 rounded">
            Curated Ensemble &bull; {outfit.occasion}
          </span>
          <h3 className="font-serif text-2xl font-bold text-dark mt-2">{outfit.name}</h3>
          <p className="text-xs text-dark-muted mt-0.5">Aesthetic: {outfit.style}</p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onRegenerate}
            className="flex-1 sm:flex-none px-3.5 py-2 border border-border rounded-sm text-xs font-semibold text-dark hover:bg-secondary flex items-center justify-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Regenerate
          </button>
          <button
            onClick={handleSave}
            className="flex-1 sm:flex-none luxury-btn luxury-btn-primary px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5" /> Saved
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" /> Save Outfit
              </>
            )}
          </button>
        </div>
      </div>

      {/* Visual Outfit Grid (Top, Bottom, Shoes, Accessory) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Top */}
        <div className="bg-secondary/40 p-3 rounded border border-border space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-dark-muted block">1. Top Layer</span>
          <div className="aspect-fashion overflow-hidden rounded-sm bg-white">
            <img src={outfit.top?.image} alt={outfit.top?.name} className="w-full h-full object-cover" />
          </div>
          <p className="text-xs font-bold text-dark truncate">{outfit.top?.name}</p>
          <p className="text-[11px] text-dark-muted">{outfit.top?.brand} &bull; {outfit.top?.color}</p>
        </div>

        {/* Bottom */}
        <div className="bg-secondary/40 p-3 rounded border border-border space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-dark-muted block">2. Bottom Piece</span>
          <div className="aspect-fashion overflow-hidden rounded-sm bg-white">
            <img src={outfit.bottom?.image} alt={outfit.bottom?.name} className="w-full h-full object-cover" />
          </div>
          <p className="text-xs font-bold text-dark truncate">{outfit.bottom?.name}</p>
          <p className="text-[11px] text-dark-muted">{outfit.bottom?.brand} &bull; {outfit.bottom?.color}</p>
        </div>

        {/* Footwear */}
        <div className="bg-secondary/40 p-3 rounded border border-border space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-dark-muted block">3. Footwear</span>
          <div className="aspect-fashion overflow-hidden rounded-sm bg-white">
            <img src={outfit.shoes?.image} alt={outfit.shoes?.name} className="w-full h-full object-cover" />
          </div>
          <p className="text-xs font-bold text-dark truncate">{outfit.shoes?.name}</p>
          <p className="text-[11px] text-dark-muted">{outfit.shoes?.brand} &bull; {outfit.shoes?.color}</p>
        </div>

        {/* Accessory / Outerwear */}
        <div className="bg-secondary/40 p-3 rounded border border-border space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-dark-muted block">4. Accessory / Outerwear</span>
          <div className="aspect-fashion overflow-hidden rounded-sm bg-white">
            <img src={outfit.accessory?.image} alt={outfit.accessory?.name} className="w-full h-full object-cover" />
          </div>
          <p className="text-xs font-bold text-dark truncate">{outfit.accessory?.name}</p>
          <p className="text-[11px] text-dark-muted">{outfit.accessory?.brand} &bull; {outfit.accessory?.color}</p>
        </div>
      </div>

      {/* Editorial Styling Explanation */}
      <div className="bg-secondary p-4 rounded-sm border border-border text-xs leading-relaxed space-y-2">
        <div className="flex items-center gap-1.5 font-bold text-primary uppercase text-[11px] tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-accent-dark" />
          Stylist Rationale:
        </div>
        <p className="text-dark/90 italic">"{outfit.explanation}"</p>
        <div className="flex flex-wrap items-center gap-4 pt-2 text-[11px] text-dark-muted border-t border-border/60">
          <span><strong>Color Harmony:</strong> {outfit.colorHarmony}</span>
          <span className="text-emerald-800"><strong>Circularity:</strong> {outfit.sustainabilityImpact}</span>
        </div>
      </div>

      {/* Complementary Marketplace Suggestion Teaser */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-dark-muted">Looking to refine this outfit with curated circular pieces?</span>
        <Link
          to="/smart-shopping"
          className="text-primary hover:text-primary-dark font-semibold flex items-center gap-1 transition-colors"
        >
          View Recommended Additions <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
