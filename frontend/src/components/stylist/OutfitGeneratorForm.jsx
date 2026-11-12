import React from "react";
import { OCCASIONS, STYLES, COLOR_PALETTES, WEATHER_CONDITIONS } from "../../services/stylistService";
import { Sparkles, SunMedium, CloudSun, Thermometer, Cpu, Layers } from "lucide-react";

export const OutfitGeneratorForm = ({
  selectedOccasion,
  onChangeOccasion,
  selectedStyle,
  onChangeStyle,
  selectedPalette,
  onChangePalette,
  selectedWeather = "mild",
  onChangeWeather,
  onGenerate,
  isLoading,
  wardrobeCount = 12
}) => {
  return (
    <div className="bg-white border border-border p-6 rounded-sm shadow-subtle space-y-6">
      
      {/* Title & Telemetry Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary-soft text-primary flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-dark">AI Style Preferences</h3>
            <p className="text-[11px] text-dark-muted">Configure styling parameters for the neural synthesizer</p>
          </div>
        </div>

        <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary-soft px-2 py-1 rounded flex items-center gap-1 border border-primary/20">
          <Layers className="w-3 h-3" /> {wardrobeCount} Items
        </span>
      </div>

      {/* Target Occasion */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-dark">
          Target Occasion:
        </label>
        <div className="flex flex-wrap gap-1.5">
          {OCCASIONS.map((occ) => (
            <button
              key={occ}
              type="button"
              onClick={() => onChangeOccasion(occ)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all ${
                selectedOccasion === occ
                  ? "bg-primary text-white shadow-xs"
                  : "bg-secondary text-dark hover:bg-border/80"
              }`}
            >
              {occ}
            </button>
          ))}
        </div>
      </div>

      {/* Aesthetic Vibe */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-dark">
          Aesthetic Vibe:
        </label>
        <div className="flex flex-wrap gap-1.5">
          {STYLES.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => onChangeStyle(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all ${
                selectedStyle === st
                  ? "bg-primary text-white shadow-xs"
                  : "bg-secondary text-dark hover:bg-border/80"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Ambient Weather / Thermal Context */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-dark flex items-center justify-between">
          <span>Weather & Temperature Context:</span>
          <Thermometer className="w-3.5 h-3.5 text-primary" />
        </label>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          {[
            { id: "warm", label: "Warm (26°C)", icon: SunMedium },
            { id: "mild", label: "Mild (20°C)", icon: CloudSun },
            { id: "chilly", label: "Chilly (14°C)", icon: Thermometer }
          ].map((w) => {
            const Icon = w.icon;
            const isSelected = selectedWeather === w.id;
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => onChangeWeather && onChangeWeather(w.id)}
                className={`p-2 rounded-sm border text-left transition-all flex flex-col items-center justify-center text-center gap-1 ${
                  isSelected
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-secondary border-border text-dark hover:bg-border/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold leading-none">{w.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Mood Palette */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-dark">
          Color Theory Palette:
        </label>
        <select
          value={selectedPalette}
          onChange={(e) => onChangePalette(e.target.value)}
          className="w-full text-xs p-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary font-medium text-dark"
        >
          {COLOR_PALETTES.map((pal) => (
            <option key={pal} value={pal}>{pal}</option>
          ))}
        </select>
      </div>

      {/* Generate Button with Live AI Indication */}
      <button
        type="button"
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full luxury-btn luxury-btn-primary py-3.5 rounded-sm text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 relative overflow-hidden group cursor-pointer disabled:opacity-50"
      >
        <Sparkles className="w-4 h-4 text-accent animate-pulse" />
        {isLoading ? "Synthesizing Ensemble..." : "Generate with Live AI"}
      </button>

      {/* Methodology Disclaimer */}
      <div className="p-3 bg-secondary rounded text-[11px] text-dark-muted leading-relaxed border border-border/60">
        <strong className="text-dark font-medium block">Multi-Modal Intelligence:</strong>
        Our neural engine cross-references color harmony tensors, etiquette thresholds, and fabric thermal weights for a customized silhouette.
      </div>

    </div>
  );
};
