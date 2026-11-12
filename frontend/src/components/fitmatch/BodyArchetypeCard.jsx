import React from "react";
import { Sparkles, Compass, ShieldCheck, ArrowRight, UserCheck } from "lucide-react";

export const BodyArchetypeCard = ({ archetypeData, measurements, preferredFit }) => {
  if (!archetypeData) return null;

  const { archetype, description, chestWaistRatio, hipWaistRatio, silhouetteTips } = archetypeData;

  return (
    <div className="bg-white border border-border p-6 rounded-sm shadow-subtle space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary-soft text-primary rounded text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            AI Somatic Classification
          </div>
          <h3 className="font-serif text-2xl font-bold text-dark">
            {archetype}
          </h3>
          <p className="text-xs text-dark-muted mt-1 max-w-xl leading-relaxed">
            {description}
          </p>
        </div>

        {/* Biometric Ratio Badges */}
        <div className="flex items-center gap-3">
          <div className="bg-secondary p-3 rounded-sm border border-border text-center min-w-[90px]">
            <span className="block font-mono text-lg font-bold text-primary">
              {chestWaistRatio}x
            </span>
            <span className="text-[10px] font-semibold uppercase text-dark-muted tracking-wider">
              Chest : Waist
            </span>
          </div>
          <div className="bg-secondary p-3 rounded-sm border border-border text-center min-w-[90px]">
            <span className="block font-mono text-lg font-bold text-primary">
              {hipWaistRatio}x
            </span>
            <span className="text-[10px] font-semibold uppercase text-dark-muted tracking-wider">
              Hip : Waist
            </span>
          </div>
        </div>
      </div>

      {/* Anatomical Anchor Tension Metrics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-dark flex items-center gap-2">
            <Compass className="w-4 h-4 text-primary" />
            Zone Tension Tolerances ({preferredFit || "Regular"} Profile)
          </h4>
          <span className="text-[11px] text-dark-muted font-mono">Dynamic Stretch Compensated</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Upper Torso */}
          <div className="p-3 bg-secondary/50 rounded-sm border border-border space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-dark">Upper Torso / Bust</span>
              <span className="text-emerald-700 font-bold font-mono">96% Optimal</span>
            </div>
            <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full w-[96%] rounded-full" />
            </div>
            <p className="text-[10px] text-dark-muted">Zero button pulling; full chest articulation.</p>
          </div>

          {/* Waist Ease */}
          <div className="p-3 bg-secondary/50 rounded-sm border border-border space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-dark">Midriff / Waist Ease</span>
              <span className="text-emerald-700 font-bold font-mono">92% Balanced</span>
            </div>
            <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full w-[92%] rounded-full" />
            </div>
            <p className="text-[10px] text-dark-muted">~2.5 cm seated ease tolerance accounted for.</p>
          </div>

          {/* Hip & Seat */}
          <div className="p-3 bg-secondary/50 rounded-sm border border-border space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-dark">Pelvic / Seat Span</span>
              <span className="text-emerald-700 font-bold font-mono">95% Natural</span>
            </div>
            <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full w-[95%] rounded-full" />
            </div>
            <p className="text-[10px] text-dark-muted">No seam strain across back rise.</p>
          </div>
        </div>
      </div>

      {/* Architectural Tailoring Guidelines */}
      <div className="bg-[#FAF8F5] border border-border p-4 rounded-sm space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-dark flex items-center gap-1.5">
          <UserCheck className="w-4 h-4 text-primary" />
          AI Tailoring Guidelines for {archetype}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {silhouetteTips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-dark-muted">
              <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
