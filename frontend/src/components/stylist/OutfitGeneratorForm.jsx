import React from "react";
import { OCCASIONS, STYLES, COLOR_PALETTES } from "../../services/stylistService";
import { Sparkles } from "lucide-react";

export const OutfitGeneratorForm = ({
  selectedOccasion,
  onChangeOccasion,
  selectedStyle,
  onChangeStyle,
  selectedPalette,
  onChangePalette,
  onGenerate,
  isLoading
}) => {
  return (
    <div className="bg-white border border-border p-6 rounded-sm shadow-subtle space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-border">
        <Sparkles className="w-5 h-5 text-accent-dark" />
        <h3 className="font-serif text-lg font-medium text-dark">Style Preferences</h3>
      </div>

      {/* Occasion Selection */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-dark">
          Target Occasion:
        </label>
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map((occ) => (
            <button
              key={occ}
              type="button"
              onClick={() => onChangeOccasion(occ)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors ${
                selectedOccasion === occ
                  ? "bg-primary text-white"
                  : "bg-secondary text-dark hover:bg-border"
              }`}
            >
              {occ}
            </button>
          ))}
        </div>
      </div>

      {/* Aesthetic Style */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-dark">
          Aesthetic Vibe:
        </label>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => onChangeStyle(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors ${
                selectedStyle === st
                  ? "bg-primary text-white"
                  : "bg-secondary text-dark hover:bg-border"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Palette */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-dark">
          Color Mood:
        </label>
        <select
          value={selectedPalette}
          onChange={(e) => onChangePalette(e.target.value)}
          className="w-full text-xs p-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary font-medium"
        >
          {COLOR_PALETTES.map((pal) => (
            <option key={pal} value={pal}>{pal}</option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full luxury-btn luxury-btn-primary py-3 rounded-sm text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4 text-accent" />
        {isLoading ? "Curating Ensemble..." : "Generate AI Outfit"}
      </button>
    </div>
  );
};
