import React from "react";
import { Layers, ArrowRight, CheckCircle2, Globe, Sparkles } from "lucide-react";

export const MultiBrandFitMatrix = ({ matrix, activeBrand, onSelectBrand, category }) => {
  if (!matrix || matrix.length === 0) return null;

  return (
    <div className="bg-white border border-border p-6 rounded-sm shadow-subtle space-y-6">
      {/* Title & Explainer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary text-dark rounded text-[11px] font-bold uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5 text-primary" />
            Cross-Brand Matrix
          </div>
          <h3 className="font-serif text-xl font-bold text-dark">
            Simultaneous Multi-Brand Size Projection
          </h3>
          <p className="text-xs text-dark-muted mt-0.5">
            Different fashion houses use distinct sizing patterns. Here is your predicted sizing across top retail brands for {category === "tops" ? "tops & jackets" : "bottoms & jeans"}.
          </p>
        </div>
        <span className="text-[11px] font-mono text-dark-muted self-start sm:self-auto bg-secondary px-3 py-1 rounded border border-border">
          5 Brands Synthesized
        </span>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {matrix.map((item) => {
          const isSelected = activeBrand.toLowerCase() === item.brand.toLowerCase();

          return (
            <div
              key={item.brand}
              onClick={() => onSelectBrand && onSelectBrand(item.brand)}
              className={`p-4 rounded-sm border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? "bg-primary-soft/60 border-primary ring-1 ring-primary shadow-sm"
                  : "bg-white border-border hover:border-dark-muted hover:bg-secondary/40"
              }`}
            >
              <div>
                {/* Brand Header & Country */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-dark font-sans tracking-wide">
                    {item.brand}
                  </span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-secondary text-dark-muted rounded border border-border">
                    {item.country}
                  </span>
                </div>

                {/* Recommended Size Display */}
                <div className="my-3 py-2 px-3 bg-white/80 rounded border border-border/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-dark-muted block">
                      Recommended
                    </span>
                    <span className="text-xl font-serif font-bold text-primary">
                      Size {item.size}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-emerald-700 block">
                      {item.confidenceScore}%
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-dark-muted">
                      Match
                    </span>
                  </div>
                </div>

                {/* Cut Nuance */}
                <p className="text-[11px] text-dark-muted leading-relaxed line-clamp-3 mb-3">
                  {item.cutNuance}
                </p>
              </div>

              {/* Bottom selection state */}
              <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px]">
                {item.alternativeSize ? (
                  <span className="text-[10px] text-dark-muted">
                    Alt: Size {item.alternativeSize}
                  </span>
                ) : <span />}
                
                <span className={`font-semibold flex items-center gap-1 ${
                  isSelected ? "text-primary" : "text-dark-muted group-hover:text-dark"
                }`}>
                  {isSelected ? "Active" : "Inspect"}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

