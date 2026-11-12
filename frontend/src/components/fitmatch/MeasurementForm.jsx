import React, { useState } from "react";
import { FIT_PREFERENCES } from "../../data/sizeCharts";
import { FABRIC_TYPES } from "../../services/fitmatchService";
import { Ruler, Info, Check, Sparkles, Cpu, Layers, Activity } from "lucide-react";

export const MeasurementForm = ({ 
  measurements, 
  onChange, 
  onSave, 
  onTriggerScan, 
  selectedFabricId, 
  onSelectFabric,
  isScanning = false 
}) => {
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
            Anatomical Biometric Profile
          </h3>
          <p className="text-xs text-dark-muted">Saved to your profile for zero-return intelligent size matching.</p>
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
          Target Silhouette Ease:
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

      {/* Fabric Tensile Selection */}
      <div className="space-y-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wider text-dark flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-primary" />
            Fabric Elasticity & Tensile Behavior:
          </label>
          <span className="text-[10px] text-dark-muted">Affects garment ease & shrinkage</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {FABRIC_TYPES.map((fab) => {
            const isSelected = (selectedFabricId || "stretch_blend") === fab.id;
            return (
              <div
                key={fab.id}
                onClick={() => onSelectFabric && onSelectFabric(fab.id)}
                className={`p-2.5 rounded border cursor-pointer transition-all ${
                  isSelected
                    ? "border-primary bg-primary-soft text-primary ring-1 ring-primary/40"
                    : "border-border hover:border-dark-muted bg-white text-dark"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold line-clamp-1">{fab.label}</span>
                  {isSelected && <Check className="w-3 h-3 text-primary flex-shrink-0" />}
                </div>
                <p className="text-[10px] text-dark-muted mt-0.5 line-clamp-2">{fab.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Scan Indicator Banner (if currently scanning) */}
      {isScanning && (
        <div className="p-3 bg-[#111813] border border-emerald-500/50 rounded-sm text-xs text-emerald-300 flex items-center gap-3 animate-pulse">
          <Activity className="w-4 h-4 text-emerald-400 animate-spin" />
          <div className="flex-1">
            <span className="font-bold block text-white text-[11px] uppercase tracking-wider">
              AI Biometric Scan Running in Backend Engine
            </span>
            <span className="text-[10px] text-emerald-400/90">
              FastAPI server is synthesizing anatomical coordinates and generating brand grading curves...
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons: Save & Trigger Live AI Scan */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-border">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (onTriggerScan) onTriggerScan();
          }}
          disabled={isScanning}
          className={`w-full sm:w-auto luxury-btn px-6 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 border transition-all shadow-sm ${
            isScanning
              ? "bg-[#111813] text-emerald-400/70 border-emerald-500/30 cursor-wait"
              : "bg-[#1b261e] text-emerald-300 hover:bg-[#111813] hover:text-emerald-200 border-emerald-600/40"
          }`}
        >
          <Cpu className={`w-4 h-4 text-emerald-400 ${isScanning ? "animate-spin" : ""}`} />
          <span>{isScanning ? "Scanning Biometrics in Backend..." : "Run Live AI Biometric Scan"}</span>
        </button>

        <button
          type="submit"
          disabled={isScanning}
          className="w-full sm:w-auto luxury-btn luxury-btn-primary px-6 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
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
