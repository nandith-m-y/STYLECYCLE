import React from "react";
import { Star, Trash2, Edit2 } from "lucide-react";

export const WardrobeItemCard = ({ item, onToggleFavorite, onDelete, onEdit }) => {
  return (
    <div className="group bg-white border border-border rounded-sm overflow-hidden hover:shadow-card transition-all duration-300 flex flex-col justify-between">
      <div className="relative aspect-fashion bg-secondary overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(item.id)}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all ${
            item.isFavorite
              ? "bg-white text-amber-500 shadow-sm"
              : "bg-white/80 text-dark-muted hover:text-amber-500"
          }`}
          title={item.isFavorite ? "Unfavorite" : "Favorite"}
        >
          <Star className={`w-3.5 h-3.5 ${item.isFavorite ? "fill-amber-500" : ""}`} />
        </button>

        {/* Category Pill */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-dark/70 text-white backdrop-blur-xs">
            {item.category}
          </span>
        </div>

        {/* Hover Delete Action */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <button
            onClick={() => onDelete(item.id)}
            className="p-1.5 rounded-full bg-white/90 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors shadow-sm"
            title="Delete from Wardrobe"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="p-3 text-xs space-y-1">
        <div className="flex items-center justify-between text-dark-muted text-[11px]">
          <span className="font-semibold text-primary uppercase">{item.brand}</span>
          <span>Size {item.size}</span>
        </div>
        <h4 className="font-medium text-dark truncate" title={item.name}>{item.name}</h4>
        
        <div className="flex items-center justify-between pt-1 text-[11px] text-dark-muted border-t border-border/60">
          <span>{item.color}</span>
          <span className="text-emerald-800 font-medium">Worn {item.wearCount || 0} times</span>
        </div>
      </div>
    </div>
  );
};
