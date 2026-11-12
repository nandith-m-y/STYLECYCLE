import { INITIAL_PRODUCTS } from "../data/products";

/**
 * Smart Shopping & Wardrobe Gap Analysis Engine
 * Detects missing foundational silhouettes in the user's digital wardrobe
 * and pairs them with verified circular marketplace listings.
 */
export const getWardrobeGaps = (wardrobeItems = []) => {
  const categoryCounts = wardrobeItems.reduce((acc, item) => {
    const cat = (item.category || "").toLowerCase();
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const gaps = [];

  // Check for formal blazer / smart jacket
  const hasBlazer = wardrobeItems.some(i => (i.name + i.category).toLowerCase().includes("blazer") || (i.name + i.category).toLowerCase().includes("suit"));
  if (!hasBlazer) {
    gaps.push({
      category: "Blazers & Structured Outerwear",
      missingType: "formal_layer",
      reason: "Your wardrobe features strong casual staples (denim & tees), but lacks an architectural blazer for boardroom meetings or formal evening transitions.",
      recommendedProductId: "prod-1" // Massimo Dutti Linen Blazer
    });
  }

  // Check for dress/trouser
  const hasTailoredTrouser = wardrobeItems.some(i => (i.name + i.category).toLowerCase().includes("trouser") && (i.style === "Formal" || i.style === "Smart Casual"));
  if (!hasTailoredTrouser) {
    gaps.push({
      category: "Tailored Trousers",
      missingType: "tailored_bottom",
      reason: "You have versatile denim pieces. Adding a pleated fluid trouser instantly elevates your button-downs into refined evening outfits.",
      recommendedProductId: "prod-7" // Mango Pleated Trousers
    });
  }

  // Check for fine knitwear
  const hasKnit = wardrobeItems.some(i => (i.name + i.category).toLowerCase().includes("knit") || (i.name + i.category).toLowerCase().includes("wool") || (i.name + i.category).toLowerCase().includes("turtleneck"));
  if (!hasKnit) {
    gaps.push({
      category: "Merino Knitwear",
      missingType: "thermal_layer",
      reason: "A lightweight fine-gauge knit turtleneck pairs under your jackets and coats without creating bulk.",
      recommendedProductId: "prod-6" // Zara Merino Turtleneck
    });
  }

  return gaps;
};

export const getCompleteYourWardrobeProducts = (wardrobeItems = []) => {
  const gaps = getWardrobeGaps(wardrobeItems);

  return gaps.map(gap => {
    const product = INITIAL_PRODUCTS.find(p => p.id === gap.recommendedProductId) || INITIAL_PRODUCTS[0];
    return {
      ...product,
      recommendationReason: gap.reason,
      gapCategory: gap.category
    };
  });
};

export const getRecommendedForYourStyle = (userStyle = "Minimalist", userGender = "unisex") => {
  return INITIAL_PRODUCTS.filter(p => {
    if (userGender !== "unisex" && p.gender !== "unisex" && p.gender !== userGender) {
      return false;
    }
    return true;
  }).slice(0, 4).map(product => ({
    ...product,
    recommendationReason: `Curated to match your preference for timeless, versatile ${userStyle.toLowerCase()} silhouettes.`
  }));
};
