import React, { useState, useMemo, useRef } from "react";
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
  runAIBiometricScanBackend,
  FABRIC_TYPES 
} from "../services/fitmatchService";
import { Ruler, Sparkles, Check, Info, Cpu, Layers, RefreshCw, CheckCircle2 } from "lucide-react";

export const FitMatchPage = () => {
  const { user, updateMeasurements } = useAuth();
  const scannerRef = useRef(null);

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
  const [backendScanData, setBackendScanData] = useState(null);

  const handleSave = async (updated) => {
    setMeasurements(updated);
    if (updateMeasurements) {
      await updateMeasurements(updated);
    }
  };

  const handleTriggerScan = async () => {
    setIsScanning(true);
    
    // Smoothly scroll to the live AI HUD container so the user immediately observes the neural telemetry
    setTimeout(() => {
      if (scannerRef.current) {
        scannerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 180, behavior: "smooth" });
      }
    }, 50);

    try {
      // Execute Python FastAPI AI Biometric Engine in background
      const result = await runAIBiometricScanBackend({
        measurements,
        brand: selectedBrand,
        category: selectedCategory,
        preferredFit: measurements.preferredFit || "Regular",
        fabricId: selectedFabricId
      });

      if (result) {
        setBackendScanData(result);
      }
    } catch (err) {
      console.error("[FitMatch] Error executing AI scan:", err);
    }
  };

  const handleScanComplete = () => {
    setIsScanning(false);
    setScanCompletedAtLeastOnce(true);
  };

  // Derive body archetype (prefer backend data when available)
  const archetypeData = useMemo(() => {
    if (backendScanData?.archetype) {
      return backendScanData.archetype;
    }
    return classifyBodyArchetype(measurements);
  }, [backendScanData, measurements]);

  // Derive single brand recommendation (prefer backend data when available)
  const recommendation = useMemo(() => {
    if (backendScanData?.recommendation) {
      return backendScanData.recommendation;
    }
    return calculateFitRecommendation({
      measurements,
      brand: selectedBrand,
      category: selectedCategory,
      preferredFit: measurements.preferredFit || "Regular",
      fabricId: selectedFabricId
    });
  }, [backendScanData, measurements, selectedBrand, selectedCategory, selectedFabricId]);

  // Derive multi-brand matrix (prefer backend data when available)
  const brandMatrix = useMemo(() => {
    if (backendScanData?.matrix) {
      return backendScanData.matrix;
    }
    return simulateMultiBrandMatrix(
      measurements,
      selectedCategory,
      measurements.preferredFit || "Regular"
    );
  }, [backendScanData, measurements, selectedCategory]);

  const activeFabricObj = FABRIC_TYPES.find(f => f.id === selectedFabricId) || FABRIC_TYPES[1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-[#EFECE4] border border-border p-8 sm:p-10 rounded-sm shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-xs font-semibold uppercase tracking-widest text-primary border border-border">
            <Cpu className="w-3.5 h-3.5" />
            AI Biometric Sizing Engine (FastAPI Backend)
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-dark">
            FitMatch Studio
          </h1>
          <p className="text-xs sm:text-sm text-dark-muted leading-relaxed">
            Eliminate sizing guesswork and reduce carbon-intensive returns. FitMatch maps your 7-point biometric coordinates, classifies your somatic silhouette archetype, and simulates fabric stretch across major retail fashion houses using our background AI models.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <button
            onClick={handleTriggerScan}
            disabled={isScanning}
            className={`luxury-btn px-5 py-3 rounded-sm text-xs uppercase tracking-wider font-semibold flex items-center gap-2 border shadow-sm transition-all ${
              isScanning
                ? "bg-[#111813] text-emerald-400/60 border-emerald-500/30 cursor-wait"
                : "bg-[#1b261e] text-emerald-300 hover:bg-[#111813] hover:text-emerald-200 border-emerald-600/40"
            }`}
          >
            <Sparkles className={`w-4 h-4 text-emerald-400 ${isScanning ? "animate-spin" : ""}`} />
            <span>{isScanning ? "Processing in AI Backend..." : "Run AI Biometric Scan"}</span>
          </button>
        </div>
      </div>

      {/* Live AI Processing HUD Anchor */}
      <div ref={scannerRef}>
        {isScanning && (
          <AIFitScannerHUD
            isScanning={isScanning}
            onComplete={handleScanComplete}
            measurements={measurements}
            fabricName={activeFabricObj.label}
          />
        )}
      </div>

      {/* Backend Scan Confirmation Toast */}
      {scanCompletedAtLeastOnce && !isScanning && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-sm text-xs text-emerald-900 flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>AI Biometric Scan Synchronized:</strong> 7-point anatomical tensors and multi-brand grading curves synthesized successfully.
            </span>
          </div>
          <button
            onClick={handleTriggerScan}
            className="text-[11px] font-semibold text-emerald-800 underline hover:text-emerald-950 flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            Re-run Scan
          </button>
        </div>
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
            isScanning={isScanning}
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
