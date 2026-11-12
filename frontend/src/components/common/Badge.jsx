import React from "react";

export const ConditionBadge = ({ condition }) => {
  const styles = {
    "Brand New": "bg-emerald-50 text-emerald-800 border-emerald-200",
    "Like New": "bg-teal-50 text-teal-800 border-teal-200",
    "Good": "bg-amber-50 text-amber-800 border-amber-200",
    "Fair": "bg-stone-100 text-stone-700 border-stone-200"
  };

  const currentStyle = styles[condition] || "bg-stone-100 text-stone-700 border-stone-200";

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${currentStyle}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70"></span>
      {condition}
    </span>
  );
};

export const ExchangeBadge = () => (
  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-accent/30 text-dark border border-accent/60">
    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
    Exchangeable
  </span>
);

export const SustainableBadge = ({ label = "Circular Verified" }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-soft text-primary border border-primary/20">
    <svg className="w-3 h-3 mr-1 text-primary" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
    {label}
  </span>
);
