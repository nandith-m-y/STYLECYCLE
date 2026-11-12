import React, { useState } from "react";
import { useWardrobe } from "../context/WardrobeContext";
import { generateOutfitRecommendation } from "../services/stylistService";
import { OutfitGeneratorForm } from "../components/stylist/OutfitGeneratorForm";
import { OutfitDisplayCard } from "../components/stylist/OutfitDisplayCard";
import { AIProcessingHUD } from "../components/stylist/AIProcessingHUD";
import { Sparkles, Bookmark, ArrowRight, Layers, Cpu, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export const AIStylistPage = () => {
  const { wardrobe, outfits, saveOutfit } = useWardrobe();

  const [occasion, setOccasion] = useState("Party");
  const [style, setStyle] = useState("Smart Casual");
  const [palette, setPalette] = useState("Earth & Sand Tones");
  const [weather, setWeather] = useState("mild");
  const [isGenerating, setIsGenerating] = useState(false);

  const [currentOutfit, setCurrentOutfit] = useState(() =>
    generateOutfitRecommendation({
      wardrobeItems: wardrobe,
      occasion: "Party",
      style: "Smart Casual",
      palette: "Earth & Sand Tones",
      weather: "mild"
    })
  );

  const handleStartGeneration = () => {
    setIsGenerating(true);
  };

  const handleAIProcessingComplete = () => {
    const generated = generateOutfitRecommendation({
      wardrobeItems: wardrobe,
      occasion,
      style,
      palette,
      weather
    });
    setCurrentOutfit(generated);
    setIsGenerating(false);
  };

  // Interactive Live Piece Swapper
  const handleSwapPiece = (slotKey, newPiece) => {
    setCurrentOutfit(prev => {
      const updated = {
        ...prev,
        [slotKey]: newPiece,
        id: `ai-ensemble-${Date.now()}`
      };
      // Recalculate match metrics
      updated.metrics = {
        ...prev.metrics,
        overallSynergyScore: Math.min(99, Math.max(90, (prev.metrics?.overallSynergyScore || 95) + (Math.random() > 0.5 ? 1 : -1)))
      };
      return updated;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-[#EFECE4] border border-border p-8 sm:p-12 rounded-sm shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-xs font-semibold uppercase tracking-widest text-primary border border-border">
            <Sparkles className="w-3.5 h-3.5 text-accent-dark animate-pulse" />
            Neural Multi-Modal Styling Intelligence
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-dark leading-tight">
            AI Personal Stylist Studio
          </h1>
          <p className="text-xs sm:text-sm text-dark/80 leading-relaxed max-w-xl">
            Live neural outfit synthesis combining garments from your digitized closet. Our AI algorithm evaluates 60-30-10 color theory, occasion etiquette, and silhouette tension in real-time.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative z-10">
          <Link
            to="/wardrobe"
            className="luxury-btn luxury-btn-outline px-5 py-3 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 bg-white"
          >
            <Layers className="w-4 h-4" /> Manage Closet ({wardrobe.length})
          </Link>
          <Link
            to="/smart-shopping"
            className="luxury-btn luxury-btn-primary px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 flex-shrink-0"
          >
            Complete Wardrobe <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main Grid: Form Left, Generated Display / Live HUD Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Generator Controls */}
        <div className="lg:col-span-1">
          <OutfitGeneratorForm
            selectedOccasion={occasion}
            onChangeOccasion={setOccasion}
            selectedStyle={style}
            onChangeStyle={setStyle}
            selectedPalette={palette}
            onChangePalette={setPalette}
            selectedWeather={weather}
            onChangeWeather={setWeather}
            onGenerate={handleStartGeneration}
            isLoading={isGenerating}
            wardrobeCount={wardrobe.length}
          />
        </div>

        {/* Display Card OR Live AI Processing HUD */}
        <div className="lg:col-span-2 space-y-8">
          {isGenerating ? (
            <AIProcessingHUD
              occasion={occasion}
              style={style}
              palette={palette}
              onComplete={handleAIProcessingComplete}
            />
          ) : (
            <OutfitDisplayCard
              outfit={currentOutfit}
              onSave={saveOutfit}
              onRegenerate={handleStartGeneration}
              onSwapPiece={handleSwapPiece}
            />
          )}

          {/* Saved Outfits Showcase */}
          {outfits.length > 0 && (
            <div className="bg-white border border-border p-6 rounded-sm shadow-subtle space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-primary" />
                  <h3 className="font-serif text-lg font-bold text-dark">Saved Wardrobe Ensembles</h3>
                </div>
                <span className="text-xs text-dark-muted font-semibold">{outfits.length} Outfits Saved</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {outfits.map((saved) => (
                  <div key={saved.id} className="p-4 bg-secondary rounded border border-border space-y-3 hover:border-primary/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-dark truncate">{saved.name}</span>
                      <span className="text-[10px] uppercase font-bold text-primary bg-primary-soft px-2 py-0.5 rounded">
                        {saved.occasion}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {[saved.top, saved.bottom, saved.shoes, saved.accessory].map((piece, i) => (
                        <div key={i} className="w-14 h-18 rounded bg-white overflow-hidden border border-border flex-shrink-0">
                          {piece && <img src={piece.image} alt={piece.name} className="w-full h-full object-cover" />}
                        </div>
                      ))}
                    </div>

                    <p className="text-[11px] text-dark-muted line-clamp-2 italic">
                      "{saved.explanation}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
