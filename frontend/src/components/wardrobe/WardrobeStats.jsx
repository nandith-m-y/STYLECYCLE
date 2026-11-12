import React from "react";
import { Sparkles, Layers, RefreshCw, Award } from "lucide-react";

export const WardrobeStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-5 border border-border rounded-sm shadow-subtle">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-soft flex items-center justify-center text-primary flex-shrink-0">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <span className="block text-xl font-bold text-dark">{stats.total}</span>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-dark-muted">Cataloged Garments</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 flex-shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <span className="block text-xl font-bold text-dark">{stats.favorites}</span>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-dark-muted">Signature Pieces</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 flex-shrink-0">
          <RefreshCw className="w-5 h-5" />
        </div>
        <div>
          <span className="block text-xl font-bold text-dark">{stats.totalWears}</span>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-dark-muted">Total Rotations</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800 flex-shrink-0">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <span className="block text-xl font-bold text-emerald-800">{stats.sustainabilityScore}%</span>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-dark-muted">Utilization Index</span>
        </div>
      </div>
    </div>
  );
};
