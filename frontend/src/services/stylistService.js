import { INITIAL_WARDROBE } from "../data/wardrobe";

export const OCCASIONS = [
  "Casual", "Office", "College", "Party", "Wedding", "Travel", "Formal"
];

export const STYLES = [
  "Minimalist", "Smart Casual", "Streetwear", "Casual", "Formal", "Traditional"
];

export const COLOR_PALETTES = [
  "Earth & Sand Tones", "Monochrome Minimalist", "Classic Navy & White", "Vibrant Statement", "Autumn Harvest"
];

/**
 * AI Personal Stylist Outfit Generator (Phase 1: Curated Heuristic Engine)
 * Generates cohesive ensembles from user wardrobe items based on selected occasion, aesthetic, and color mood.
 */
export const generateOutfitRecommendation = ({
  wardrobeItems = [],
  occasion = "Casual",
  style = "Minimalist",
  palette = "Monochrome Minimalist",
  gender = "unisex"
}) => {
  const pool = wardrobeItems.length >= 3 ? wardrobeItems : INITIAL_WARDROBE;

  // Segment by garment role
  const tops = pool.filter(item => item.type === "top" || item.category.toLowerCase().includes("shirt") || item.category.toLowerCase().includes("tee") || item.category.toLowerCase().includes("top"));
  const bottoms = pool.filter(item => item.type === "bottom" || item.category.toLowerCase().includes("jean") || item.category.toLowerCase().includes("trouser"));
  const shoes = pool.filter(item => item.type === "shoes" || item.category.toLowerCase().includes("shoe") || item.category.toLowerCase().includes("sneaker"));
  const accessories = pool.filter(item => item.type === "accessories" || item.type === "outerwear" || item.category.toLowerCase().includes("bag") || item.category.toLowerCase().includes("jacket"));

  // Select matching items based on occasion and style score
  const scoreItem = (item) => {
    let score = 0;
    if (item.occasion === occasion) score += 4;
    if (item.style === style) score += 3;
    if (item.isFavorite) score += 1;
    return score + Math.random(); // Add slight variation for "Regenerate" capability
  };

  const selectedTop = [...tops].sort((a, b) => scoreItem(b) - scoreItem(a))[0] || pool[0];
  const selectedBottom = [...bottoms].sort((a, b) => scoreItem(b) - scoreItem(a))[0] || pool[2] || pool[0];
  const selectedShoes = [...shoes].sort((a, b) => scoreItem(b) - scoreItem(a))[0] || pool[5] || pool[0];
  const selectedAccessory = [...accessories].sort((a, b) => scoreItem(b) - scoreItem(a))[0] || pool[1] || pool[7];

  // Styling rationale tailored to combination
  const rationales = {
    Office: `Pairing a crisp structured ${selectedTop.name} with tailored ${selectedBottom.name} establishes an understated executive presence, while ${selectedShoes.name} offers polished mobility throughout your workday.`,
    College: `An effortlessly balanced ensemble. The relaxed drape of the ${selectedTop.name} layered with durable ${selectedBottom.name} provides campus-ready comfort with an elevated streetwear sensibility.`,
    Party: `Sharp contrasts define this evening silhouette. The textural depth between the ${selectedTop.name} and ${selectedBottom.name} creates an arresting focal point under ambient lighting.`,
    Casual: `Understated everyday luxury. Combining ${selectedTop.name} with ${selectedBottom.name} creates an easy, breathable weekend aesthetic that feels intentional yet relaxed.`,
    Travel: `Prioritizing fluid mobility without compromising on aesthetic finish. Breathable fibers and versatile pairing allow for seamless transit-to-dinner transitions.`
  };

  const explanation = rationales[occasion] || `A clean ${style.toLowerCase()} arrangement balancing proportion and tone for ${occasion.toLowerCase()} settings.`;

  return {
    id: `generated-${Date.now()}`,
    name: `${occasion} ${style} Ensemble`,
    occasion,
    style,
    top: selectedTop,
    bottom: selectedBottom,
    shoes: selectedShoes,
    accessory: selectedAccessory,
    explanation,
    colorHarmony: "Balanced complementary tones with anchor neutrals",
    sustainabilityImpact: "100% existing wardrobe utilization (0 new resources consumed)"
  };
};
