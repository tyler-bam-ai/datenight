"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NeonButton from "../ui/NeonButton";
import ProgressBar from "../ui/ProgressBar";

const scanStages = [
  "Detecting facial structure...",
  "Mapping expression patterns...",
  "Calibrating smile recognition...",
  "Encoding emotional signatures...",
  "Building avatar profile...",
];

export default function Screen3Synthesis({ onNext }: { onNext: () => void }) {
  const [scanning, setScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<"free" | "paid">("free");

  const scanStage = Math.min(Math.floor(scanProgress / 20), scanStages.length - 1);

  useEffect(() => {
    if (!scanning) return;
    const interval = setInterval(() => {
      setScanProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setScanning(false), 500);
          return 100;
        }
        return p + 1.5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [scanning]);

  return (
    <div className="relative min-h-full flex flex-col p-6 overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/5 via-transparent to-neon-cyan/5 pointer-events-none" />

      {/* Progress */}
      <div className="relative z-10 pt-2">
        <ProgressBar progress={30} />
      </div>

      <AnimatePresence mode="wait">
        {scanning ? (
          <motion.div
            key="scan"
            exit={{ opacity: 0 }}
            className="relative z-10 flex-1 flex flex-col items-center justify-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-text-secondary mb-8 text-center"
            >
              Look into the lens. Let&rsquo;s build your digital double.
            </motion.p>

            {/* Scan Ring with HUD */}
            <div className="relative w-60 h-60 mb-6">
              {/* Rotating outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-dashed border-neon-purple/15"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              {/* Static middle ring */}
              <div className="absolute inset-2 rounded-full border border-neon-cyan/20" />
              {/* Scanning ring progress */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="120"
                  cy="120"
                  r="116"
                  fill="none"
                  stroke="url(#scanGrad)"
                  strokeWidth="3"
                  strokeDasharray={`${(scanProgress / 100) * 729} 729`}
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 6px #a855f7)" }}
                />
                <defs>
                  <linearGradient id="scanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Inner face area */}
              <div className="absolute inset-5 rounded-full bg-gradient-to-br from-obsidian-light to-surface flex items-center justify-center overflow-hidden">
                {/* Face mesh visualization */}
                <svg viewBox="0 0 100 100" className="w-24 h-24 opacity-60">
                  <motion.ellipse cx="50" cy="42" rx="30" ry="38" fill="none" stroke="#a855f7" strokeWidth="0.8"
                    initial={{ pathLength: 0 }} animate={{ pathLength: scanProgress / 100 }} />
                  <motion.circle cx="38" cy="36" r="4" fill="none" stroke="#06b6d4" strokeWidth="0.8"
                    initial={{ opacity: 0 }} animate={{ opacity: scanProgress > 20 ? 1 : 0 }} />
                  <motion.circle cx="62" cy="36" r="4" fill="none" stroke="#06b6d4" strokeWidth="0.8"
                    initial={{ opacity: 0 }} animate={{ opacity: scanProgress > 25 ? 1 : 0 }} />
                  <motion.path d="M 42 52 Q 50 60 58 52" fill="none" stroke="#f97316" strokeWidth="0.8"
                    initial={{ opacity: 0 }} animate={{ opacity: scanProgress > 40 ? 1 : 0 }} />
                  <motion.ellipse cx="50" cy="46" rx="8" ry="4" fill="none" stroke="#a855f7" strokeWidth="0.5"
                    initial={{ opacity: 0 }} animate={{ opacity: scanProgress > 50 ? 0.5 : 0 }} />
                  {/* Feature point dots */}
                  {[[35,28],[65,28],[50,44],[42,56],[58,56],[30,42],[70,42],[50,62]].map(([x,y], i) => (
                    <motion.circle key={i} cx={x} cy={y} r="1.5" fill="#a855f7"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: scanProgress > 30 + i * 5 ? 0.8 : 0, scale: scanProgress > 30 + i * 5 ? 1 : 0 }}
                    />
                  ))}
                </svg>
                {/* Scan line */}
                <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/80 to-transparent animate-scan-line" style={{ filter: "drop-shadow(0 0 4px #06b6d4)" }} />
              </div>
              {/* HUD corner brackets */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-neon-purple/40 rounded-tl" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-neon-purple/40 rounded-tr" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-neon-purple/40 rounded-bl" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-neon-purple/40 rounded-br" />
              {/* HUD data readouts */}
              <motion.div
                className="absolute -right-2 top-1/4 text-[8px] font-mono text-neon-cyan/50 text-right"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p>X: 0.{Math.floor(scanProgress * 3.7)}</p>
                <p>Y: 0.{Math.floor(scanProgress * 2.1)}</p>
                <p>Z: 0.{Math.floor(scanProgress * 1.8)}</p>
              </motion.div>
            </div>

            {/* Status readout */}
            <div className="text-center space-y-2 w-full max-w-xs">
              <div className="flex items-center justify-between text-[10px] font-mono text-text-muted px-2">
                <span>SYNTHESIS</span>
                <span className="text-neon-purple">{scanProgress.toFixed(0)}%</span>
              </div>
              <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={scanStage}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-[10px] text-neon-cyan/60 font-mono"
                >
                  {scanStages[scanStage]}
                </motion.p>
              </AnimatePresence>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-xs text-neon-purple/70 italic mt-2"
              >
                &ldquo;Hold still... I need to know how you smile so I can tell when they make you do it.&rdquo;
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 flex-1 flex flex-col"
          >
            {/* Avatar created */}
            <div className="flex justify-center mt-8 mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="relative"
              >
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-neon-purple to-neon-orange p-0.5"
                  style={{ boxShadow: "0 0 30px rgba(168, 85, 247, 0.3), 0 0 60px rgba(249, 115, 22, 0.15)" }}>
                  <div className="w-full h-full rounded-full bg-obsidian flex items-center justify-center">
                    <motion.span
                      className="text-4xl"
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      ✨
                    </motion.span>
                  </div>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-neon-green flex items-center justify-center text-sm shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                >
                  ✓
                </motion.div>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center text-sm text-text-secondary mb-8"
            >
              Your Avatar is ready. How much ground should she cover?
            </motion.p>

            {/* Plan Selection */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setSelectedPlan("free")}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  selectedPlan === "free"
                    ? "border-neon-purple/60 bg-neon-purple/10"
                    : "border-white/10 bg-surface/50"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-text-primary">Standard Shift</span>
                  <span className="text-xs text-neon-green font-bold">FREE</span>
                </div>
                <p className="text-xs text-text-muted">50 Deep Scans per day. Battery recharges overnight.</p>
              </button>

              <button
                onClick={() => setSelectedPlan("paid")}
                className={`w-full p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                  selectedPlan === "paid"
                    ? "border-neon-orange/60 bg-neon-orange/10"
                    : "border-white/10 bg-surface/50"
                }`}
              >
                {selectedPlan !== "paid" && (
                  <div className="absolute inset-0 animate-shimmer pointer-events-none" />
                )}
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-text-primary">Overtime Mode</span>
                  <span className="text-xs text-neon-orange font-bold">$19.99/mo</span>
                </div>
                <p className="text-xs text-text-muted">Unlimited 24/7 scanning + priority placement. She never sleeps.</p>
              </button>
            </div>

            <div className="mt-auto pb-4">
              <NeonButton onClick={onNext}>
                Finalize Avatar
              </NeonButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
