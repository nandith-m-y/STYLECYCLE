import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { MeasurementForm } from "../components/fitmatch/MeasurementForm";
import { SizeRecommendationCard } from "../components/fitmatch/SizeRecommendationCard";
import { calculateFitRecommendation } from "../services/fitmatchService";
import { BRANDS } from "../data/categories";
import { Ruler, Sparkles, Check, Info } from "lucide-react";

export const FitMatchPage = () => {
  const { user, updateMeasurements } = useAuth();

  const [measurements, setMeasurements] = useState(
    user?.measurements || {
      height: 168,
      chest: 90,
      waist: 72,
      hip: 95,
      shoulder: 41,
      sleeve: 60,
      inseam: 79,
      preferredFit: "Regular"
    }
  );

  const [selectedBrand, setSelectedBrand] = useState("Zara");
  const [selectedCategory, setSelectedCategory] = useState("tops"); // tops or bottoms

  const handleSave = async (updated) => {
    setMeasurements(updated);
    if (updateMeasurements) {
      await updateMeasurements(updated);
    }
  };

  const recommendation = calculateFitRecommendation({
    measurements,
    brand: selectedBrand,
    category: selectedCategory,
    preferredFit: measurements.preferredFit || "Regular"
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-[#EFECE4] border border-border p-8 sm:p-12 rounded-sm shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-xs font-semibold uppercase tracking-widest text-primary border border-border">
            <Ruler className="w-3.5 h-3.5" />
            Deterministic Size Intelligence
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-dark">
            FitMatch Studio
          </h1>
          <p className="text-xs sm:text-sm text-dark-muted leading-relaxed">
            Eliminate sizing guesswork and reduce carbon-intensive clothing returns. Configure your anatomical measurement profile below and test real-time fit compatibility against major brand sizing curves.
          </p>
        </div>

        <div className="p-4 bg-white rounded border border-border text-xs space-y-1 text-dark-muted max-w-xs flex-shrink-0">
          <span className="font-bold text-primary block">Phase 1 Methodology:</span>
          <span>Transparent rule-based sizing matrix matching user measurements against official European & US dimensional grading curves.</span>
        </div>
      </div>

      {/* Simulator Brand & Category Controls */}
      <div className="bg-white border border-border p-5 rounded-sm shadow-subtle flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-dark">Simulate Sizing For:</span>
          
          <div className="flex items-center gap-2">
            <label className="text-xs text-dark-muted">Brand:</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="text-xs p-2 bg-secondary border border-border rounded-sm font-semibold text-dark"
            >
              {["Zara", "Levi's", "H&M", "Massimo Dutti"].map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-dark-muted">Garment Class:</label>
            <div className="inline-flex rounded-sm bg-secondary p-0.5 border border-border">
              <button
                type="button"
                onClick={() => setSelectedCategory("tops")}
                className={`px-3 py-1 text-xs font-semibold rounded-sm transition-colors ${
                  selectedCategory === "tops" ? "bg-primary text-white" : "text-dark-muted hover:text-dark"
                }`}
              >
                Tops / Jackets
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("bottoms")}
                className={`px-3 py-1 text-xs font-semibold rounded-sm transition-colors ${
                  selectedCategory === "bottoms" ? "bg-primary text-white" : "text-dark-muted hover:text-dark"
                }`}
              >
                Pants / Jeans
              </button>
            </div>
          </div>
        </div>

        <div className="text-xs text-dark-muted">
          Active Silhouette: <strong className="text-primary">{measurements.preferredFit || "Regular"}</strong>
        </div>
      </div>

      {/* Two Column Layout: Measurement Profile Form + Live Recommendation Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left: Measurement Form */}
        <div>
          <MeasurementForm
            measurements={measurements}
            onChange={setMeasurements}
            onSave={handleSave}
          />
        </div>

        {/* Right: Live Size Recommendation */}
        <div>
          <SizeRecommendationCard
            recommendation={recommendation}
            selectedBrand={selectedBrand}
            category={selectedCategory}
          />
        </div>

      </div>

    </div>
  );
};
