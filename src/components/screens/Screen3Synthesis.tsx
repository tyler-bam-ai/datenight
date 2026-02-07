"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NeonButton from "../ui/NeonButton";
import ProgressBar from "../ui/ProgressBar";

export default function Screen3Synthesis({ onNext }: { onNext: () => void }) {
  const [scanning, setScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<"free" | "paid">("free");

  useEffect(() => {
    if (!scanning) return;
    const interval = setInterval(() => {
      setScanProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setScanning(false);
          }, 500);
          return 100;
        }
        return p + 2;
      });
    }, 60);
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
            {/* HUD frame */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-text-secondary mb-8 text-center"
            >
              Look into the lens. Let&rsquo;s build your digital double.
            </motion.p>

            {/* Scan Ring */}
            <div className="relative w-56 h-56 mb-8">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-neon-purple/20" />
              {/* Scanning ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="112"
                  cy="112"
                  r="108"
                  fill="none"
                  stroke="url(#scanGrad)"
                  strokeWidth="3"
                  strokeDasharray={`${(scanProgress / 100) * 679} 679`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="scanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Inner face placeholder */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-obsidian-light to-surface flex items-center justify-center overflow-hidden">
                <div className="text-6xl animate-float-slow">👤</div>
                {/* Scan line */}
                <div
                  className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-scan-line"
                />
              </div>
              {/* Corner markers */}
              {[0, 90, 180, 270].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-4 h-4 border-neon-purple/50"
                  style={{
                    transform: `rotate(${deg}deg)`,
                    top: deg < 180 ? -2 : "auto",
                    bottom: deg >= 180 ? -2 : "auto",
                    left: deg === 0 || deg === 180 ? -2 : "auto",
                    right: deg === 90 || deg === 270 ? -2 : "auto",
                    borderTopWidth: deg < 180 ? 2 : 0,
                    borderLeftWidth: deg === 0 || deg === 180 ? 2 : 0,
                    borderRightWidth: deg === 90 || deg === 270 ? 2 : 0,
                    borderBottomWidth: deg >= 180 ? 2 : 0,
                  }}
                />
              ))}
            </div>

            {/* Progress text */}
            <div className="text-center space-y-2">
              <p className="text-xs text-text-muted font-mono">
                MAPPING EXPRESSIONS... {scanProgress}%
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-xs text-neon-purple/80 italic"
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
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-neon-purple to-neon-orange p-0.5">
                  <div className="w-full h-full rounded-full bg-obsidian flex items-center justify-center">
                    <span className="text-4xl">✨</span>
                  </div>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-neon-green flex items-center justify-center text-sm"
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

            {/* CTA */}
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
