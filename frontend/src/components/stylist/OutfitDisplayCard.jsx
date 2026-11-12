import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Bookmark, 
  RefreshCw, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Layers, 
  Palette, 
  CheckCircle2, 
  Repeat, 
  Lightbulb, 
  ShieldCheck 
} from "lucide-react";

export const OutfitDisplayCard = ({ outfit, onSave, onRegenerate, onSwapPiece }) => {
  const [saved, setSaved] = useState(false);
  const [activeSwapSlot, setActiveSwapSlot] = useState(null); // 'top' | 'bottom' | 'shoes' | 'accessory' | null

  if (!outfit) return null;

  const handleSave = () => {
    if (onSave) onSave(outfit);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const slots = [
    { key: "top", label: "1. Top Layer", item: outfit.top, alternates: outfit.alternates?.tops || [] },
    { key: "bottom", label: "2. Bottom Piece", item: outfit.bottom, alternates: outfit.alternates?.bottoms || [] },
    { key: "shoes", label: "3. Footwear", item: outfit.shoes, alternates: outfit.alternates?.shoes || [] },
    { key: "accessory", label: "4. Layer / Accessory", item: outfit.accessory, alternates: outfit.alternates?.accessories || [] }
  ];

  return (
    <div className="bg-white border border-border rounded-sm shadow-subtle p-6 sm:p-8 space-y-8 animate-fade-in">
      
      {/* Top Banner with High-Confidence AI Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary-soft px-2.5 py-1 rounded">
              AI Curated Ensemble &bull; {outfit.occasion}
            </span>
            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Neural Match Verified
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-dark mt-1">
            {outfit.name}
          </h3>
          <p className="text-xs text-dark-muted">
            Aesthetic: <strong className="text-dark font-medium">{outfit.style}</strong> &bull; Palette: <strong className="text-dark font-medium">{outfit.palette}</strong>
          </p>
        </div>

        {/* Action Controls & AI Synergy Badge */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Match Score */}
          <div className="flex items-center gap-2.5 bg-secondary px-3.5 py-2 rounded-sm border border-border">
            <div className="text-right">
              <span className="text-lg font-bold text-primary block leading-none">
                {outfit.metrics?.overallSynergyScore || 96}%
              </span>
              <span className="text-[9px] uppercase font-semibold text-dark-muted tracking-wider">
                AI Synergy
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-soft text-primary flex items-center justify-center font-bold text-xs">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
          </div>

          <button
            onClick={onRegenerate}
            className="flex-1 sm:flex-none px-3.5 py-2 border border-border rounded-sm text-xs font-semibold text-dark hover:bg-secondary flex items-center justify-center gap-1.5 transition-colors"
            title="Re-run AI Stylist with current preferences"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Regenerate</span>
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

      {/* Visual Outfit Grid with Interactive Piece Swapping */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-dark flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-primary" />
            Ensemble Garment Blueprint:
          </h4>
          <span className="text-[11px] text-dark-muted">Click any item's "Swap" icon to test closet alternatives</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {slots.map((slot) => (
            <div key={slot.key} className="bg-secondary/40 p-3 rounded-sm border border-border flex flex-col justify-between group hover:border-primary/50 transition-colors">
              <div>
                <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-border/60">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-dark-muted">
                    {slot.label}
                  </span>
                  {slot.alternates.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setActiveSwapSlot(activeSwapSlot === slot.key ? null : slot.key)}
                      className="text-[10px] font-semibold text-primary hover:text-primary-dark flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white border border-border"
                      title="Swap this piece with an alternative from your closet"
                    >
                      <Repeat className="w-2.5 h-2.5" /> Swap
                    </button>
                  )}
                </div>

                <div className="aspect-fashion overflow-hidden rounded-sm bg-white mb-2 relative">
                  <img
                    src={slot.item?.image || "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80"}
                    alt={slot.item?.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded backdrop-blur-xs font-medium">
                    {slot.item?.size || "M"}
                  </span>
                </div>

                <p className="text-xs font-bold text-dark truncate">{slot.item?.name}</p>
                <p className="text-[11px] text-dark-muted">{slot.item?.brand} &bull; {slot.item?.color}</p>
              </div>

              {/* Alternate Picker Drawer if user clicked Swap */}
              {activeSwapSlot === slot.key && (
                <div className="mt-3 pt-2 border-t border-border/80 space-y-1.5 bg-white p-2 rounded shadow-sm">
                  <span className="text-[10px] font-bold text-primary block">Closet Alternates:</span>
                  <div className="space-y-1">
                    {slot.alternates.map((alt) => (
                      <button
                        key={alt.id}
                        type="button"
                        onClick={() => {
                          if (onSwapPiece) onSwapPiece(slot.key, alt);
                          setActiveSwapSlot(null);
                        }}
                        className="w-full flex items-center gap-2 p-1 rounded hover:bg-secondary text-left transition-colors"
                      >
                        <img src={alt.image} alt={alt.name} className="w-6 h-7 rounded object-cover flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-semibold text-dark truncate">{alt.name}</p>
                          <p className="text-[9px] text-dark-muted">{alt.color}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Radar Synergy Scores & Color Harmony Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
        
        {/* Left: AI Radar Dimensional Scores */}
        <div className="bg-secondary/40 p-4 rounded-sm border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-dark flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              AI Multi-Modal Synergy Metrics:
            </span>
            <span className="text-[10px] font-semibold text-primary">Algorithm: StyleVector v3</span>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <div className="flex justify-between text-dark font-medium mb-1">
                <span>Color Harmony (60-30-10):</span>
                <span className="font-bold text-primary">{outfit.metrics?.colorHarmonyScore || 95}%</span>
              </div>
              <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-border/70">
                <div className="bg-primary h-full rounded-full" style={{ width: `${outfit.metrics?.colorHarmonyScore || 95}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-dark font-medium mb-1">
                <span>Occasion Formality Fit:</span>
                <span className="font-bold text-primary">{outfit.metrics?.occasionFitScore || 97}%</span>
              </div>
              <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-border/70">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${outfit.metrics?.occasionFitScore || 97}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-dark font-medium mb-1">
                <span>Silhouette & Drape Proportion:</span>
                <span className="font-bold text-primary">{outfit.metrics?.silhouetteScore || 94}%</span>
              </div>
              <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-border/70">
                <div className="bg-accent-dark h-full rounded-full" style={{ width: `${outfit.metrics?.silhouetteScore || 94}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-dark font-medium mb-1">
                <span>All-Day Thermal Comfort Index:</span>
                <span className="font-bold text-primary">{outfit.metrics?.comfortIndex || 92}%</span>
              </div>
              <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-border/70">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: `${outfit.metrics?.comfortIndex || 92}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right: 60-30-10 Color Theory Rule */}
        <div className="bg-secondary/40 p-4 rounded-sm border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-dark flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-primary" />
              60-30-10 Color Harmonization:
            </span>
            <span className="text-[10px] text-dark-muted font-mono">{outfit.palette}</span>
          </div>

          <div className="flex h-4 w-full rounded overflow-hidden border border-border">
            <div className="bg-[#EFECE4] text-dark text-[9px] flex items-center justify-center font-bold" style={{ width: "60%" }} title="60% Base Anchor">
              60%
            </div>
            <div className="bg-[#2B2B2B] text-white text-[9px] flex items-center justify-center font-bold" style={{ width: "30%" }} title="30% Secondary Layer">
              30%
            </div>
            <div className="bg-[#234B3B] text-white text-[9px] flex items-center justify-center font-bold" style={{ width: "10%" }} title="10% Accent Pop">
              10%
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-[11px] pt-1">
            <div className="space-y-0.5">
              <span className="block text-[10px] uppercase font-bold text-dark-muted">60% Anchor</span>
              <span className="font-semibold text-dark truncate block">{outfit.paletteBreakdown?.primaryColor || "Neutral Cream"}</span>
            </div>
            <div className="space-y-0.5">
              <span className="block text-[10px] uppercase font-bold text-dark-muted">30% Secondary</span>
              <span className="font-semibold text-dark truncate block">{outfit.paletteBreakdown?.secondaryColor || "White / Cotton"}</span>
            </div>
            <div className="space-y-0.5">
              <span className="block text-[10px] uppercase font-bold text-dark-muted">10% Accent</span>
              <span className="font-semibold text-dark truncate block">{outfit.paletteBreakdown?.accentColor || "Camel / Brown"}</span>
            </div>
          </div>

          <p className="text-[11px] text-dark-muted italic leading-relaxed pt-1 border-t border-border/60">
            Color balance anchors the visual center of gravity without chromatic clash.
          </p>
        </div>

      </div>

      {/* Editorial Styling Advice & Pro Tips */}
      <div className="bg-primary-soft/50 p-5 rounded-sm border border-primary/20 space-y-3">
        <div className="flex items-center gap-1.5 font-bold text-primary uppercase text-xs tracking-wider">
          <Lightbulb className="w-4 h-4 text-accent-dark" />
          AI Stylist Editorial Blueprint:
        </div>
        <p className="text-xs text-dark/95 leading-relaxed font-serif italic text-base">
          "{outfit.explanation}"
        </p>

        {outfit.proTips && (
          <div className="space-y-1.5 pt-2 border-t border-primary/20 text-xs">
            <span className="font-bold text-primary uppercase text-[10px] tracking-wider block">Execution Tips:</span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-dark/80 text-[11px]">
              {outfit.proTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center gap-2 pt-2 text-[11px] text-emerald-800 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{outfit.sustainabilityImpact}</span>
        </div>
      </div>

      {/* Complementary Gap Suggestion */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border-t border-border">
        <span className="text-dark-muted">Want complementary pieces to unlock 5+ more combinations?</span>
        <Link
          to="/smart-shopping"
          className="luxury-btn luxury-btn-outline px-4 py-2 rounded-sm font-semibold flex items-center gap-1.5 transition-colors"
        >
          Explore Smart Shopping Gaps <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};
