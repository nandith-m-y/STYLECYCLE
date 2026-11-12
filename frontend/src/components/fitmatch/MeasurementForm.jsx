import React, { useState } from "react";
import { FIT_PREFERENCES } from "../../data/sizeCharts";
import { Ruler, Info, Check } from "lucide-react";

export const MeasurementForm = ({ measurements, onChange, onSave }) => {
  const [unit, setUnit] = useState("cm"); // cm or inches
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Conversion helper
  const toDisplay = (val) => {
    if (!val) return "";
    return unit === "inches" ? (val / 2.54).toFixed(1) : Math.round(val);
  };

  const fromDisplay = (val) => {
    const num = parseFloat(val) || 0;
    return unit === "inches" ? Math.round(num * 2.54) : num;
  };

  const handleInputChange = (field, displayVal) => {
    onChange({
      ...measurements,
      [field]: fromDisplay(displayVal)
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (onSave) onSave(measurements);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="bg-white border border-border p-6 rounded-sm shadow-subtle space-y-6">
      {/* Title & Unit Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <h3 className="font-serif text-lg font-medium text-dark flex items-center gap-2">
            <Ruler className="w-5 h-5 text-primary" />
            Anatomical Measurement Profile
          </h3>
          <p className="text-xs text-dark-muted">Saved to your profile for automatic size matching across all brands.</p>
        </div>

        {/* Unit Toggle */}
        <div className="inline-flex rounded-sm p-0.5 bg-secondary border border-border">
          <button
            type="button"
            onClick={() => setUnit("cm")}
            className={`px-3 py-1 text-xs font-semibold rounded-sm transition-colors ${
              unit === "cm" ? "bg-primary text-white" : "text-dark-muted hover:text-dark"
            }`}
          >
            Centimeters (cm)
          </button>
          <button
            type="button"
            onClick={() => setUnit("inches")}
            className={`px-3 py-1 text-xs font-semibold rounded-sm transition-colors ${
              unit === "inches" ? "bg-primary text-white" : "text-dark-muted hover:text-dark"
            }`}
          >
            Inches (in)
          </button>
        </div>
      </div>

      {/* Numerical Inputs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        
        {/* Height */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-dark">
            Height ({unit}):
          </label>
          <input
            type="number"
            value={toDisplay(measurements.height)}
            onChange={(e) => handleInputChange("height", e.target.value)}
            className="w-full text-xs p-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary font-medium"
            placeholder={unit === "cm" ? "170" : "67"}
          />
        </div>

        {/* Chest */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-dark">
            Chest / Bust ({unit}):
          </label>
          <input
            type="number"
            value={toDisplay(measurements.chest)}
            onChange={(e) => handleInputChange("chest", e.target.value)}
            className="w-full text-xs p-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary font-medium"
            placeholder={unit === "cm" ? "92" : "36"}
          />
        </div>

        {/* Waist */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-dark">
            Natural Waist ({unit}):
          </label>
          <input
            type="number"
            value={toDisplay(measurements.waist)}
            onChange={(e) => handleInputChange("waist", e.target.value)}
            className="w-full text-xs p-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary font-medium"
            placeholder={unit === "cm" ? "76" : "30"}
          />
        </div>

        {/* Hip */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-dark">
            Hip Span ({unit}):
          </label>
          <input
            type="number"
            value={toDisplay(measurements.hip)}
            onChange={(e) => handleInputChange("hip", e.target.value)}
            className="w-full text-xs p-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary font-medium"
            placeholder={unit === "cm" ? "96" : "38"}
          />
        </div>

        {/* Shoulder */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-dark">
            Shoulder Width ({unit}):
          </label>
          <input
            type="number"
            value={toDisplay(measurements.shoulder)}
            onChange={(e) => handleInputChange("shoulder", e.target.value)}
            className="w-full text-xs p-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary font-medium"
            placeholder={unit === "cm" ? "43" : "17"}
          />
        </div>

        {/* Sleeve */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-dark">
            Sleeve Length ({unit}):
          </label>
          <input
            type="number"
            value={toDisplay(measurements.sleeve)}
            onChange={(e) => handleInputChange("sleeve", e.target.value)}
            className="w-full text-xs p-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary font-medium"
            placeholder={unit === "cm" ? "62" : "24"}
          />
        </div>

        {/* Inseam */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-dark">
            Leg Inseam ({unit}):
          </label>
          <input
            type="number"
            value={toDisplay(measurements.inseam)}
            onChange={(e) => handleInputChange("inseam", e.target.value)}
            className="w-full text-xs p-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary font-medium"
            placeholder={unit === "cm" ? "80" : "31"}
          />
        </div>
      </div>

      {/* Preferred Fitting Section */}
      <div className="space-y-3 pt-3 border-t border-border">
        <label className="block text-xs font-semibold uppercase tracking-wider text-dark">
          Preferred Silhouette & Ease:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FIT_PREFERENCES.map((pref) => {
            const isSelected = measurements.preferredFit === pref.id;
            return (
              <div
                key={pref.id}
                onClick={() => onChange({ ...measurements, preferredFit: pref.id })}
                className={`p-3 rounded border cursor-pointer transition-all ${
                  isSelected
                    ? "border-primary bg-primary-soft text-primary shadow-xs"
                    : "border-border hover:border-dark-muted bg-white text-dark"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">{pref.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                </div>
                <p className="text-[11px] text-dark-muted leading-tight">{pref.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-1.5 text-xs text-dark-muted">
          <Info className="w-4 h-4 text-primary" />
          <span>Transparent rule-based matching against real brand grade rules.</span>
        </div>
        <button
          type="submit"
          className="luxury-btn luxury-btn-primary px-6 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold flex items-center gap-2"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4" />
              Saved to Profile
            </>
          ) : (
            "Save Measurements"
          )}
        </button>
      </div>
    </form>
  );
};
