import React from "react";
import { CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

export const SizeRecommendationCard = ({ recommendation, selectedBrand, category }) => {
  if (!recommendation) return null;

  return (
    <div className="bg-white border border-border p-6 rounded-sm shadow-subtle space-y-6">
      {/* Top Banner with Recommended Size */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary-soft px-2.5 py-1 rounded">
            FitMatch Intelligence
          </span>
          <h3 className="font-serif text-2xl font-bold text-dark mt-2">
            Recommended: Size {recommendation.recommendedSize}
          </h3>
          <p className="text-xs text-dark-muted mt-0.5">
            Optimal fit score for {selectedBrand} ({category})
          </p>
        </div>

        {/* Confidence Badge */}
        <div className="flex items-center gap-3 bg-secondary px-4 py-2.5 rounded-sm border border-border">
          <div className="text-right">
            <span className="block text-lg font-bold text-primary">
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
      <div className="bg-primary-soft/50 border border-primary/20 p-4 rounded text-xs text-dark leading-relaxed space-y-1">
        <div className="font-bold text-primary uppercase text-[11px] tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Why This Size?
        </div>
        <p>{recommendation.explanation}</p>
        {recommendation.alternativeSize && (
          <p className="text-dark-muted pt-1">
            <strong>Alternative:</strong> Choose <strong>Size {recommendation.alternativeSize}</strong> ({recommendation.alternativeScore}% match) if you prefer a roomier drape.
          </p>
        )}
      </div>

      {/* Measurement Comparison Breakdown Table */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-dark">
          Dimensional Grading Breakdown
        </h4>
        <div className="border border-border rounded-sm overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-secondary text-dark-muted border-b border-border">
              <tr>
                <th className="p-3 font-semibold">Anatomical Metric</th>
                <th className="p-3 font-semibold">Your Measurement</th>
                <th className="p-3 font-semibold">Brand Standard ({recommendation.recommendedSize})</th>
                <th className="p-3 font-semibold">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recommendation.comparisons?.map((comp, idx) => (
                <tr key={idx} className="hover:bg-secondary/40">
                  <td className="p-3 font-medium text-dark">{comp.metric}</td>
                  <td className="p-3 text-dark font-bold">{comp.userValue} cm</td>
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
