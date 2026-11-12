import { BRAND_SIZE_CHARTS, FIT_PREFERENCES } from "../data/sizeCharts";

/**
 * FitMatch Size Recommendation Engine (Phase 1: Deterministic Brand Size Matching)
 * Evaluates individual anatomical dimensions against brand-specific dimensional grading curves.
 */
export const calculateFitRecommendation = ({
  measurements,
  brand = "Zara",
  category = "tops",
  preferredFit = "Regular"
}) => {
  const brandData = BRAND_SIZE_CHARTS[brand] || BRAND_SIZE_CHARTS["Zara"];
  const chart = brandData[category] || brandData.tops;
  const fitPref = FIT_PREFERENCES.find(f => f.id === preferredFit) || FIT_PREFERENCES[1];

  // Adjust key target measurement based on fit preference offset
  const targetChest = (Number(measurements.chest) || 90) + fitPref.offset;
  const targetWaist = (Number(measurements.waist) || 75) + fitPref.offset;
  const targetHip   = (Number(measurements.hip) || 95) + fitPref.offset;

  const scoredSizes = chart.map((entry) => {
    let diff = 0;
    let comparisons = [];

    if (category === "tops") {
      const [cMin, cMax] = entry.chest;
      const cMid = (cMin + cMax) / 2;
      const cDiff = Math.abs(targetChest - cMid);
      diff += cDiff * 1.5;

      comparisons.push({
        metric: "Chest / Bust",
        userValue: measurements.chest,
        range: `${cMin}-${cMax} cm`,
        status: targetChest >= cMin && targetChest <= cMax ? "Optimal" : targetChest < cMin ? "Roomy" : "Snug"
      });

      if (entry.shoulder && measurements.shoulder) {
        const [sMin, sMax] = entry.shoulder;
        comparisons.push({
          metric: "Shoulder Span",
          userValue: measurements.shoulder,
          range: `${sMin}-${sMax} cm`,
          status: measurements.shoulder >= sMin && measurements.shoulder <= sMax ? "Optimal" : "Slight variation"
        });
      }
    } else {
      // Bottoms (Waist & Hip)
      const [wMin, wMax] = entry.waist;
      const wMid = (wMin + wMax) / 2;
      const wDiff = Math.abs(targetWaist - wMid);
      diff += wDiff * 1.5;

      comparisons.push({
        metric: "Natural Waist",
        userValue: measurements.waist,
        range: `${wMin}-${wMax} cm`,
        status: targetWaist >= wMin && targetWaist <= wMax ? "Optimal" : targetWaist < wMin ? "Loose" : "Tight"
      });

      if (entry.hip && measurements.hip) {
        const [hMin, hMax] = entry.hip;
        comparisons.push({
          metric: "Hip Seat",
          userValue: measurements.hip,
          range: `${hMin}-${hMax} cm`,
          status: targetHip >= hMin && targetHip <= hMax ? "Optimal" : "Slight variation"
        });
      }
    }

    // Normalized match score (0 - 100)
    const matchScore = Math.max(50, Math.min(99, Math.round(100 - diff * 2.8)));

    return {
      size: entry.size,
      matchScore,
      comparisons,
      rawDiff: diff
    };
  });

  // Sort by smallest dimensional difference
  scoredSizes.sort((a, b) => b.matchScore - a.matchScore);

  const bestMatch = scoredSizes[0];
  const alternativeMatch = scoredSizes[1];

  let explanation = `Based on your ${category === "tops" ? `chest measurement (${measurements.chest} cm)` : `waist measurement (${measurements.waist} cm)`} and your preferred ${preferredFit} fit, Size ${bestMatch.size} aligns closest with ${brand}'s silhouette standards.`;
  
  if (preferredFit === "Oversized" || preferredFit === "Relaxed") {
    explanation += ` Extra ease has been calculated into the recommendation to achieve your relaxed styling preference.`;
  }

  return {
    recommendedSize: bestMatch.size,
    confidenceScore: bestMatch.matchScore,
    alternativeSize: alternativeMatch ? alternativeMatch.size : null,
    alternativeScore: alternativeMatch ? alternativeMatch.matchScore : null,
    comparisons: bestMatch.comparisons,
    explanation,
    allScores: scoredSizes
  };
};
