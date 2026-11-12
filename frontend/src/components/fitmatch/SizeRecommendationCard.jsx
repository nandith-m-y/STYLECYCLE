import React from "react";
import { CheckCircle2, AlertCircle, Sparkles, Layers, ShieldCheck } from "lucide-react";
import { FABRIC_TYPES } from "../../services/fitmatchService";

export const SizeRecommendationCard = ({ recommendation, selectedBrand, category, fabricId }) => {
  if (!recommendation) return null;

  const activeFabric = FABRIC_TYPES.find(f => f.id === fabricId) || FABRIC_TYPES[1];

  return (
    <div className="bg-white border border-border p-6 rounded-sm shadow-subtle space-y-6">
      {/* Top Banner with Recommended Size */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary-soft px-2.5 py-1 rounded">
              FitMatch Intelligence
            </span>
            <span className="text-[10px] font-mono text-dark-muted bg-secondary px-2 py-0.5 rounded border border-border">
              {activeFabric.label}
            </span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-dark mt-2">
            Recommended: Size {recommendation.recommendedSize}
          </h3>
          <p className="text-xs text-dark-muted mt-0.5">
            Calibrated specifically for {selectedBrand} ({category === "tops" ? "Tops & Outerwear" : "Pants & Denim"})
          </p>
        </div>

        {/* Confidence Badge */}
        <div className="flex items-center gap-3 bg-secondary px-4 py-2.5 rounded-sm border border-border flex-shrink-0">
          <div className="text-right">
            <span className="block text-lg font-bold text-primary font-mono">
              {recommendation.confidenceScore}%
            </span>
            <span className="text-[10px] uppercase font-semibold text-dark-muted tracking-wider">
              Match Accuracy
            </span>
          </div>
          <CheckCircle2 className="w-8 h-8 text-primary stroke-[1.5]" />
        </div>
      </div>

      {/* Transparent Explanation Box */}
      <div className="bg-primary-soft/50 border border-primary/20 p-4 rounded text-xs text-dark leading-relaxed space-y-2">
        <div className="font-bold text-primary uppercase text-[11px] tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          AI Fit Rationale
        </div>
        <p>{recommendation.explanation}</p>
        {recommendation.alternativeSize && (
          <p className="text-dark-muted pt-1 border-t border-primary/10">
            <strong>Alternative Sizing:</strong> Size <strong>{recommendation.alternativeSize}</strong> ({recommendation.alternativeScore}% match) yields a more casual, relaxed drape without slipping.
          </p>
        )}
      </div>

      {/* Measurement Comparison Breakdown Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-dark">
            Dimensional Grading Breakdown
          </h4>
          <span className="text-[11px] text-dark-muted">Brand Standard Tolerance</span>
        </div>
        <div className="border border-border rounded-sm overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-secondary text-dark-muted border-b border-border">
              <tr>
                <th className="p-3 font-semibold">Anatomical Metric</th>
                <th className="p-3 font-semibold">Your Measurement</th>
                <th className="p-3 font-semibold">{selectedBrand} Spec ({recommendation.recommendedSize})</th>
                <th className="p-3 font-semibold">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recommendation.comparisons?.map((comp, idx) => (
                <tr key={idx} className="hover:bg-secondary/40">
                  <td className="p-3 font-medium text-dark">{comp.metric}</td>
                  <td className="p-3 text-dark font-bold font-mono">{comp.userValue} cm</td>
                  <td className="p-3 text-dark-muted">{comp.range}</td>
                  <td className="p-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                      comp.status === "Optimal" 
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
                        : "bg-amber-50 text-amber-800 border border-amber-200"
                    }`}>
                      {comp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
