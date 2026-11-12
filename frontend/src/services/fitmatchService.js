import { BRAND_SIZE_CHARTS, FIT_PREFERENCES } from "../data/sizeCharts.js";

export const FABRIC_TYPES = [
  { id: "rigid_cotton", label: "100% Rigid Denim / Cotton", stretchFactor: 0.98, shrinkageRisk: "Medium", desc: "Structured, non-stretch fabric; requires exact measurements" },
  { id: "stretch_blend", label: "Elastane Stretch Blend (98/2)", stretchFactor: 1.04, shrinkageRisk: "Low", desc: "Dynamic comfort stretch; conforms to body contours" },
  { id: "linen", label: "100% Pure Woven Linen", stretchFactor: 0.96, shrinkageRisk: "High", desc: "Relaxed fluid drape; account for 3% post-wash shrinkage" },
  { id: "wool_knit", label: "Merino Wool / Knitwear", stretchFactor: 1.08, shrinkageRisk: "Low", desc: "Highly elastic tensile drape; forgiving across sizing boundaries" }
];

export const AI_FIT_SCAN_STEPS = [
  {
    step: 1,
    title: "Anatomical Coordinate Mapping",
    desc: "Extracting 7-point biometric measurements (Height, Chest, Waist, Hips, Inseam)..."
  },
  {
    step: 2,
    title: "Somatic Silhouette Classification",
    desc: "Calculating chest-to-waist and shoulder-to-hip ratios to identify structural body archetype..."
  },
  {
    step: 3,
    title: "Multi-Brand Grading Emulation",
    desc: "Projecting dimensional curves across Zara, Levi's, Massimo Dutti, H&M & Uniqlo standards..."
  },
  {
    step: 4,
    title: "Tensile Recovery & Shrinkage Modeling",
    desc: "Simulating fabric behavior, dynamic stretch tension and post-wash dimensional variance..."
  },
  {
    step: 5,
    title: "Zero-Return Fit Synthesis",
    desc: "Synthesizing cross-brand size matrix, comfort tolerances and individualized fit notes..."
  }
];

/**
 * AI Body Archetype Classifier
 * Evaluates anatomical ratios to classify body silhouette.
 */
export const classifyBodyArchetype = (measurements) => {
  const chest = Number(measurements.chest) || 90;
  const waist = Number(measurements.waist) || 75;
  const hip = Number(measurements.hip) || 95;
  const shoulder = Number(measurements.shoulder) || 42;

  const chestWaistRatio = chest / waist;
  const hipWaistRatio = hip / waist;
  const shoulderHipRatio = shoulder / (hip * 0.45);

  let archetype = "Athletic V-Taper";
  let description = "Prominent shoulder span tapering into a defined waist. Requires tops with shoulder room without excess torso billowing.";
  let silhouetteTips = [
    "Opt for tailored or slim-fit shirts to accentuate natural torso taper.",
    "Look for stretch-infused trousers or pleated fronts for optimal quad ease.",
    "Avoid boxy unstructured tees that conceal your natural waist definition."
  ];

  if (Math.abs(chest - hip) <= 4 && waist / chest < 0.8) {
    archetype = "Balanced Hourglass";
    description = "Proportionate chest and hip dimensions anchored by a well-defined natural waistline.";
    silhouetteTips = [
      "Fitted garments that hug the waist prevent an unflattering boxy look.",
      "High-rise trousers and belted coats enhance natural vertical symmetry.",
      "Wrap styles and structured lapels flatter your balanced proportions."
    ];
  } else if (Math.abs(chest - waist) < 12 && Math.abs(waist - hip) < 10) {
    archetype = "Architectural Column";
    description = "Uniform, streamlined vertical proportions with subtle contour transitions from chest to hip.";
    silhouetteTips = [
      "Layering with jackets and overcoats adds tactile dimension and depth.",
      "Pleated trousers and double-breasted blazers create flattering visual width.",
      "Belted mid-layers define a focal center point effortlessly."
    ];
  } else if (hip > chest + 6) {
    archetype = "A-Frame / Triangle";
    description = "Wider hip span relative to upper torso, creating a grounded, classic aesthetic.";
    silhouetteTips = [
      "Structured shoulder pads and wide lapels balance upper torso presence.",
      "Straight-leg or relaxed-fit pants create a clean continuous vertical drape.",
      "Lighter colored tops paired with dark trousers balance visual weight."
    ];
  }

  return {
    archetype,
    description,
    chestWaistRatio: chestWaistRatio.toFixed(2),
    hipWaistRatio: hipWaistRatio.toFixed(2),
    silhouetteTips
  };
};

/**
 * Single-Brand Fit Calculation
 */
export const calculateFitRecommendation = ({
  measurements,
  brand = "Zara",
  category = "tops",
  preferredFit = "Regular",
  fabricId = "stretch_blend"
}) => {
  const brandData = BRAND_SIZE_CHARTS[brand] || BRAND_SIZE_CHARTS["Zara"];
  const chart = brandData[category] || brandData.tops;
  const fitPref = FIT_PREFERENCES.find(f => f.id === preferredFit) || FIT_PREFERENCES[1];
  const fabric = FABRIC_TYPES.find(f => f.id === fabricId) || FABRIC_TYPES[1];

  // Adjust key target measurement based on fit preference offset and fabric stretch
  const stretchAdjustment = (1 - fabric.stretchFactor) * 10;
  const targetChest = (Number(measurements.chest) || 90) + fitPref.offset + stretchAdjustment;
  const targetWaist = (Number(measurements.waist) || 75) + fitPref.offset + stretchAdjustment;
  const targetHip   = (Number(measurements.hip) || 95) + fitPref.offset + stretchAdjustment;

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

    // Normalized match score (50 - 99)
    const matchScore = Math.max(55, Math.min(99, Math.round(100 - diff * 2.6)));

    return {
      size: entry.size,
      matchScore,
      comparisons,
      rawDiff: diff
    };
  });

  scoredSizes.sort((a, b) => b.matchScore - a.matchScore);

  const bestMatch = scoredSizes[0];
  const alternativeMatch = scoredSizes[1];

  let explanation = `Based on your ${category === "tops" ? `chest measurement (${measurements.chest} cm)` : `waist measurement (${measurements.waist} cm)`}, Size ${bestMatch.size} aligns closest with ${brand}'s silhouette standards.`;
  
  if (preferredFit === "Oversized" || preferredFit === "Relaxed") {
    explanation += ` Extra ease has been calculated into the recommendation to achieve your relaxed styling preference.`;
  }
  if (fabric.id === "rigid_cotton") {
    explanation += ` Accounted for non-stretch rigid denim weave.`;
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

/**
 * AI Multi-Brand Simultaneous Comparison Matrix
 */
export const simulateMultiBrandMatrix = (measurements, category = "tops", preferredFit = "Regular") => {
  const brands = [
    { name: "Zara", country: "Spain", cutNuance: "Slim European Cut (Runs true to slightly trim)" },
    { name: "Levi's", country: "USA", cutNuance: "Standard American Heritage (True to size, durable seat)" },
    { name: "Massimo Dutti", country: "Spain", cutNuance: "Tailored Luxury Fit (Sleek shoulder, trim waist)" },
    { name: "H&M", country: "Sweden", cutNuance: "Contemporary Regular (Moderate ease, standard grading)" },
    { name: "Uniqlo", country: "Japan", cutNuance: "Comfort Boxy Cut (Relaxed room through chest and hip)" }
  ];

  return brands.map(b => {
    const rec = calculateFitRecommendation({
      measurements,
      brand: b.name,
      category,
      preferredFit
    });

    return {
      brand: b.name,
      country: b.country,
      cutNuance: b.cutNuance,
      size: rec.recommendedSize,
      confidenceScore: rec.confidenceScore,
      alternativeSize: rec.alternativeSize
    };
  });
};
