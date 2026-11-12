import React, { useEffect, useState } from "react";
import { Cpu, Sparkles, CheckCircle2, Activity, ShieldCheck } from "lucide-react";
import { AI_FIT_SCAN_STEPS } from "../../services/fitmatchService";

export const AIFitScannerHUD = ({ isScanning, onComplete, measurements, fabricName }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!isScanning) {
      setProgress(0);
      setCurrentStepIdx(0);
      setLogs([]);
      return;
    }

    const telemetryLines = [
      `[ANATOMY-KERNEL] Mapping 7-point biometric coordinates: H=${measurements.height}cm, C=${measurements.chest}cm, W=${measurements.waist}cm, Hip=${measurements.hip}cm`,
      `[SILHOUETTE-NET] Computing torso-to-waist taper quotient: ${(measurements.chest / (measurements.waist || 1)).toFixed(2)}x`,
      `[FABRIC-SIM] Calibrating tensile elasticity for ${fabricName || "Elastane Stretch Blend"}...`,
      `[GRADING-MATRIX] Projecting dimensional allowances across European (Zara, Massimo Dutti), US (Levi's) & Asian (Uniqlo) standards`,
      `[SYNTHESIS-ENGINE] Zero-return sizing matrix generated with high confidence convergence.`
    ];

    setLogs([telemetryLines[0]]);

    const totalSteps = AI_FIT_SCAN_STEPS.length;
    const stepDuration = 550; // ms per step

    const interval = setInterval(() => {
      setCurrentStepIdx((prev) => {
        const next = prev + 1;
        if (next < totalSteps) {
          setLogs((l) => [...l, telemetryLines[next]]);
          setProgress(Math.round(((next + 1) / totalSteps) * 100));
          return next;
        } else {
          clearInterval(interval);
          setProgress(100);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 350);
          return prev;
        }
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isScanning, measurements, fabricName, onComplete]);

  if (!isScanning) return null;

  return (
    <div className="bg-[#111612] text-cream border border-[#2d3a30] rounded-sm p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all animate-fadeIn">
      {/* Background Matrix Grid Pattern & Laser Scan Glow */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#52b788 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      />
      
      {/* Animated Top Laser Scan Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" />

      {/* Header telemetry */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#2d3a30]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Cpu className="w-5 h-5 animate-spin" style={{ animationDuration: "3s" }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                FitMatch Neural Biometric Engine
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                LIVE COMPUTE
              </span>
            </div>
            <p className="text-xs text-[#95a898] mt-0.5 font-sans">
              Simulating multi-brand dimensional grading curves & fabric tensile relaxation
            </p>
          </div>
        </div>

        {/* Live Progress Indicator */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="font-mono text-2xl font-bold text-emerald-400">
              {progress}%
            </span>
            <span className="block text-[10px] font-mono text-[#95a898] uppercase">
              SCAN PROGRESS
            </span>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-emerald-500/30 border-t-emerald-400 flex items-center justify-center animate-spin">
            <Activity className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 my-6">
        <div className="w-full bg-[#1c241e] h-2 rounded-full overflow-hidden border border-[#2d3a30]">
          <div 
            className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-300 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 5-Step Pipeline Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-3">
        {AI_FIT_SCAN_STEPS.map((s, idx) => {
          const isDone = idx < currentStepIdx;
          const isCurrent = idx === currentStepIdx;

          return (
            <div
              key={s.step}
              className={`p-3.5 rounded-sm border transition-all duration-200 ${
                isCurrent
                  ? "bg-[#1c2620] border-emerald-500 shadow-lg shadow-emerald-950/40"
                  : isDone
                  ? "bg-[#151c17] border-emerald-800/40 opacity-90"
                  : "bg-[#131714] border-[#242e26] opacity-40"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] font-bold text-[#8ea593]">
                  0{s.step}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-[#3b4b3e]" />
                )}
              </div>
              <h4 className={`text-xs font-semibold leading-tight ${isCurrent ? "text-white" : "text-[#d1dbd3]"}`}>
                {s.title}
              </h4>
              <p className="text-[10px] text-[#86998b] mt-1 line-clamp-2 leading-relaxed">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Terminal Live Telemetry Log Feed */}
      <div className="relative z-10 mt-6 pt-5 border-t border-[#2d3a30] bg-[#0c0f0d] p-4 rounded-sm border font-mono text-[11px]">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#222b24] text-[#718676]">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            Neural Telemetry Feed
          </span>
          <span className="text-[10px] text-[#556959]">LATENCY: 12ms</span>
        </div>
        <div className="space-y-1.5 max-h-24 overflow-y-auto text-emerald-400/90 scrollbar-thin">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-2 animate-fadeIn">
              <span className="text-[#495b4e] select-none">&gt;</span>
              <span className={i === logs.length - 1 ? "text-emerald-300 font-semibold" : "text-[#9cb5a1]"}>
                {log}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
