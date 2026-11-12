import React, { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { MeasurementForm } from "../components/fitmatch/MeasurementForm";
import { SizeRecommendationCard } from "../components/fitmatch/SizeRecommendationCard";
import { AIFitScannerHUD } from "../components/fitmatch/AIFitScannerHUD";
import { BodyArchetypeCard } from "../components/fitmatch/BodyArchetypeCard";
import { MultiBrandFitMatrix } from "../components/fitmatch/MultiBrandFitMatrix";
import { 
  calculateFitRecommendation, 
  classifyBodyArchetype, 
  simulateMultiBrandMatrix,
  FABRIC_TYPES 
} from "../services/fitmatchService";
import { Ruler, Sparkles, Check, Info, Cpu, Layers, RefreshCw } from "lucide-react";

export const FitMatchPage = () => {
  const { user, updateMeasurements } = useAuth();

  const [measurements, setMeasurements] = useState(
    user?.measurements || {
      height: 172,
      chest: 94,
      waist: 76,
      hip: 98,
      shoulder: 43,
      sleeve: 62,
      inseam: 80,
      preferredFit: "Regular"
    }
  );

  const [selectedBrand, setSelectedBrand] = useState("Zara");
  const [selectedCategory, setSelectedCategory] = useState("tops"); // tops or bottoms
  const [selectedFabricId, setSelectedFabricId] = useState("stretch_blend");
  const [isScanning, setIsScanning] = useState(false);
  const [scanCompletedAtLeastOnce, setScanCompletedAtLeastOnce] = useState(false);

  const handleSave = async (updated) => {
    setMeasurements(updated);
    if (updateMeasurements) {
      await updateMeasurements(updated);
    }
  };

  const handleTriggerScan = () => {
    setIsScanning(true);
  };

  const handleScanComplete = () => {
    setIsScanning(false);
    setScanCompletedAtLeastOnce(true);
  };

  // Compute body archetype
  const archetypeData = useMemo(() => {
    return classifyBodyArchetype(measurements);
  }, [measurements]);

  // Compute single brand recommendation
  const recommendation = useMemo(() => {
    return calculateFitRecommendation({
      measurements,
      brand: selectedBrand,
      category: selectedCategory,
      preferredFit: measurements.preferredFit || "Regular",
      fabricId: selectedFabricId
    });
  }, [measurements, selectedBrand, selectedCategory, selectedFabricId]);

  // Compute multi-brand comparison matrix
  const brandMatrix = useMemo(() => {
    return simulateMultiBrandMatrix(
      measurements,
      selectedCategory,
      measurements.preferredFit || "Regular"
    );
  }, [measurements, selectedCategory]);

  const activeFabricObj = FABRIC_TYPES.find(f => f.id === selectedFabricId) || FABRIC_TYPES[1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-[#EFECE4] border border-border p-8 sm:p-10 rounded-sm shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-xs font-semibold uppercase tracking-widest text-primary border border-border">
            <Cpu className="w-3.5 h-3.5" />
            AI Biometric Sizing Engine
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-dark">
            FitMatch Studio
          </h1>
          <p className="text-xs sm:text-sm text-dark-muted leading-relaxed">
            Eliminate sizing guesswork and reduce carbon-intensive returns. FitMatch maps your 7-point biometric coordinates, classifies your somatic silhouette archetype, and simulates fabric stretch across major retail fashion houses.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <button
            onClick={handleTriggerScan}
            disabled={isScanning}
            className="luxury-btn px-5 py-3 rounded-sm text-xs uppercase tracking-wider font-semibold flex items-center gap-2 bg-[#1b261e] text-emerald-300 hover:bg-[#111813] border border-emerald-600/40 shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{isScanning ? "Scanning Biometrics..." : "Run AI Biometric Scan"}</span>
          </button>
        </div>
      </div>

      {/* Live AI Processing HUD */}
      {isScanning && (
        <AIFitScannerHUD
          isScanning={isScanning}
          onComplete={handleScanComplete}
          measurements={measurements}
          fabricName={activeFabricObj.label}
        />
      )}

      {/* Simulator Brand & Category Controls */}
      <div className="bg-white border border-border p-5 rounded-sm shadow-subtle flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-dark">Simulate Sizing For:</span>
          
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
                Pants / Denim
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-dark-muted">Active Brand Focus:</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="text-xs p-2 bg-secondary border border-border rounded-sm font-semibold text-dark"
            >
              {["Zara", "Levi's", "Massimo Dutti", "H&M", "Uniqlo"].map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-dark-muted">
          <span>Active Silhouette: <strong className="text-primary">{measurements.preferredFit || "Regular"}</strong></span>
          <span className="hidden sm:inline">•</span>
          <span>Fabric: <strong className="text-dark">{activeFabricObj.label}</strong></span>
        </div>
      </div>

      {/* AI Somatic Classification Card */}
      <BodyArchetypeCard
        archetypeData={archetypeData}
        measurements={measurements}
        preferredFit={measurements.preferredFit}
      />

      {/* Multi-Brand Sizing Comparison Matrix */}
      <MultiBrandFitMatrix
        matrix={brandMatrix}
        activeBrand={selectedBrand}
        onSelectBrand={(brand) => setSelectedBrand(brand)}
        category={selectedCategory}
      />

      {/* Two Column Layout: Measurement Profile Form + Live Recommendation Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Measurement Form */}
        <div>
          <MeasurementForm
            measurements={measurements}
            onChange={setMeasurements}
            onSave={handleSave}
            onTriggerScan={handleTriggerScan}
            selectedFabricId={selectedFabricId}
            onSelectFabric={setSelectedFabricId}
          />
        </div>

        {/* Right: Detailed Live Recommendation */}
        <div>
          <SizeRecommendationCard
            recommendation={recommendation}
            selectedBrand={selectedBrand}
            category={selectedCategory}
            fabricId={selectedFabricId}
          />
        </div>
      </div>

    </div>
  );
};
