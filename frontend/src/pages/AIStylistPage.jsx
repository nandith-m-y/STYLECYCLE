import React, { useState } from "react";
import { useWardrobe } from "../context/WardrobeContext";
import { generateOutfitRecommendation } from "../services/stylistService";
import { OutfitGeneratorForm } from "../components/stylist/OutfitGeneratorForm";
import { OutfitDisplayCard } from "../components/stylist/OutfitDisplayCard";
import { Sparkles, Bookmark, ArrowRight, Layers } from "lucide-react";
import { Link } from "react-router-dom";

export const AIStylistPage = () => {
  const { wardrobe, outfits, saveOutfit } = useWardrobe();

  const [occasion, setOccasion] = useState("Casual");
  const [style, setStyle] = useState("Minimalist");
  const [palette, setPalette] = useState("Monochrome Minimalist");
  const [isGenerating, setIsGenerating] = useState(false);

  const [currentOutfit, setCurrentOutfit] = useState(() =>
    generateOutfitRecommendation({
      wardrobeItems: wardrobe,
      occasion: "Casual",
      style: "Minimalist",
      palette: "Monochrome Minimalist"
    })
  );

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateOutfitRecommendation({
        wardrobeItems: wardrobe,
        occasion,
        style,
        palette
      });
      setCurrentOutfit(generated);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-[#EFECE4] border border-border p-8 sm:p-12 rounded-sm shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-xs font-semibold uppercase tracking-widest text-primary border border-border">
            <Sparkles className="w-3.5 h-3.5 text-accent-dark" />
            Wardrobe Outfit Intelligence
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-dark">
            AI Personal Stylist
          </h1>
          <p className="text-xs sm:text-sm text-dark-muted leading-relaxed">
            Generate cohesive, context-aware outfits combining garments you already own. Maximize your closet rotation and explore fresh styling perspectives.
          </p>
        </div>

        <Link
          to="/smart-shopping"
          className="luxury-btn bg-primary text-white hover:bg-primary-dark px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center gap-2 flex-shrink-0"
        >
          Complete Your Wardrobe <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Main Grid: Form Left, Generated Display Right */}
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
            onGenerate={handleGenerate}
            isLoading={isGenerating}
          />
        </div>

        {/* Display Card */}
        <div className="lg:col-span-2 space-y-8">
          <OutfitDisplayCard
            outfit={currentOutfit}
            onSave={saveOutfit}
            onRegenerate={handleGenerate}
          />

          {/* Saved Outfits Showcase */}
          {outfits.length > 0 && (
            <div className="bg-white border border-border p-6 rounded-sm shadow-subtle space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Bookmark className="w-4 h-4 text-primary" />
                <h3 className="font-serif text-lg font-bold text-dark">Saved Wardrobe Ensembles</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {outfits.map((saved) => (
                  <div key={saved.id} className="p-4 bg-secondary rounded border border-border space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-dark truncate">{saved.name}</span>
                      <span className="text-[10px] uppercase font-bold text-primary bg-primary-soft px-2 py-0.5 rounded">
                        {saved.occasion}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {[saved.top, saved.bottom, saved.shoes].map((piece, i) => (
                        <div key={i} className="w-14 h-18 rounded bg-white overflow-hidden border border-border">
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
