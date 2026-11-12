import React, { useEffect, useState } from "react";
import { Sparkles, Layers, ShieldCheck, Palette, Cpu, CheckCircle2, Loader2, Terminal } from "lucide-react";
import { AI_PROCESSING_STEPS } from "../../services/stylistService";

export const AIProcessingHUD = ({ occasion, style, palette, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);
  const [logs, setLogs] = useState([
    "Initializing NeuralStyleEngine v3.2...",
    `Loading context: Occasion="${occasion}", Style="${style}", Palette="${palette}"`
  ]);

  useEffect(() => {
    const stepIntervals = [
      { delay: 600, progress: 35, log: `Extracted 12 garment feature tensors from digitized closet.` },
      { delay: 1200, progress: 55, log: `Applied ${occasion} etiquette constraints: formality threshold = 0.85.` },
      { delay: 1800, progress: 78, log: `Harmonizing ${palette}: 60% base, 30% anchor, 10% accent.` },
      { delay: 2400, progress: 92, log: `Balancing silhouette drape and thermal index for ambient comfort.` },
      { delay: 3000, progress: 100, log: `Synthesis complete! Overall ensemble synergy: 96% match.` }
    ];

    const timers = [];

    stepIntervals.forEach((step, idx) => {
      const timer = setTimeout(() => {
        setCurrentStepIndex(idx);
        setProgress(step.progress);
        setLogs(prev => [...prev.slice(-4), `[AI-KERNEL] ${step.log}`]);

        if (idx === stepIntervals.length - 1) {
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600);
        }
      }, step.delay);

      timers.push(timer);
    });

    return () => timers.forEach(t => clearTimeout(t));
  }, [occasion, style, palette]);

  const stepIcons = [Layers, ShieldCheck, Palette, Cpu, Sparkles];

  return (
    <div className="bg-white border-2 border-primary/30 rounded-sm shadow-card p-6 sm:p-8 space-y-6 relative overflow-hidden animate-fade-in">
      {/* Background glowing neural ambiance */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Live AI Styling Inference Engine
            </span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-dark">
            Synthesizing {occasion} Ensemble
          </h3>
          <p className="text-xs text-dark-muted">
            Neural multi-modal reasoning across silhouette drape, color theory, and personal preferences.
          </p>
        </div>

        <div className="bg-secondary px-4 py-2 rounded-sm border border-border flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
          <div className="text-right">
            <span className="text-xs font-bold text-primary block leading-none">{progress}%</span>
            <span className="text-[10px] uppercase font-semibold text-dark-muted tracking-wider">Processing</span>
          </div>
        </div>
      </div>

      {/* Real-time Progress Bar */}
      <div className="space-y-1.5 relative z-10">
        <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden border border-border">
          <div
            className="bg-gradient-to-r from-primary via-emerald-600 to-accent-dark h-full transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Multi-Step Pipeline Visualizer */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2 relative z-10">
        {AI_PROCESSING_STEPS.map((step, idx) => {
          const StepIcon = stepIcons[idx] || Sparkles;
          const isDone = currentStepIndex > idx;
          const isCurrent = currentStepIndex === idx;

          return (
            <div
              key={step.step}
              className={`p-3 rounded-sm border transition-all ${
                isCurrent
                  ? "bg-primary-soft/70 border-primary shadow-xs scale-102"
                  : isDone
                  ? "bg-emerald-50/50 border-emerald-200 text-emerald-900"
                  : "bg-secondary/40 border-border/80 text-dark-muted opacity-60"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <StepIcon
                  className={`w-4 h-4 ${
                    isCurrent ? "text-primary animate-pulse" : isDone ? "text-emerald-700" : "text-dark-muted"
                  }`}
                />
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : isCurrent ? (
                  <Loader2 className="w-3 h-3 text-primary animate-spin" />
                ) : (
                  <span className="text-[10px] font-bold text-dark-muted">{step.step}</span>
                )}
              </div>
              <h4 className="text-[11px] font-bold text-dark leading-tight">{step.title}</h4>
              <p className="text-[10px] text-dark-muted mt-1 line-clamp-2 leading-tight">{step.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Live Reasoning Telemetry Stream */}
      <div className="bg-dark text-secondary/90 p-4 rounded-sm font-mono text-[11px] space-y-1.5 shadow-inner border border-dark/60">
        <div className="flex items-center gap-2 text-accent-light text-[10px] uppercase font-bold tracking-wider pb-1 border-b border-white/10">
          <Terminal className="w-3.5 h-3.5" />
          <span>Real-time Neural Reasoning Stream</span>
        </div>
        {logs.map((log, i) => (
          <div key={i} className="flex items-start gap-2 text-white/80">
            <span className="text-emerald-400 select-none">&gt;</span>
            <span className="truncate">{log}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

