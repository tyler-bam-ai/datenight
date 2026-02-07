"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NeonButton from "../ui/NeonButton";
import ProgressBar from "../ui/ProgressBar";

export default function Screen8Dossier({ onNext }: { onNext: () => void }) {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="relative min-h-full flex flex-col p-6 overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-neon-orange/6 blur-[100px] pointer-events-none" />

      {/* Progress */}
      <div className="relative z-10 pt-2">
        <ProgressBar progress={90} />
      </div>

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="locked"
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 flex-1 flex flex-col items-center justify-center"
          >
            {/* Blurred document preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative w-full max-w-xs mb-8"
            >
              <div className="p-6 rounded-2xl bg-surface/60 border border-white/5 blur-sm">
                <div className="space-y-3">
                  <div className="h-3 w-3/4 rounded bg-white/10" />
                  <div className="h-3 w-full rounded bg-white/10" />
                  <div className="h-3 w-2/3 rounded bg-white/10" />
                  <div className="h-8 w-full rounded bg-neon-purple/10 mt-4" />
                  <div className="h-3 w-5/6 rounded bg-white/10" />
                  <div className="h-3 w-full rounded bg-white/10" />
                  <div className="h-8 w-full rounded bg-neon-orange/10 mt-4" />
                  <div className="h-3 w-4/5 rounded bg-white/10" />
                </div>
              </div>
              {/* CONFIDENTIAL stamp */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ rotate: -15, scale: 0 }}
                  animate={{ rotate: -15, scale: 1 }}
                  transition={{ type: "spring", bounce: 0.4, delay: 0.3 }}
                  className="px-6 py-2 border-2 border-red-500/60 rounded-lg"
                >
                  <span className="text-red-500/80 font-black text-xl tracking-widest">CONFIDENTIAL</span>
                </motion.div>
              </div>
            </motion.div>

            {/* AI whisper */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-start gap-3 mb-6 max-w-xs"
            >
              <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center shrink-0">
                <span className="text-sm">🤫</span>
              </div>
              <div className="chat-bubble-ai p-3">
                <p className="text-xs text-text-secondary leading-relaxed italic">
                  &ldquo;Wait... want the inside track? I spent hours chatting with Sloane&rsquo;s AI. I know exactly what makes them tick, what makes them bored, and the one topic that will make them fall for you.&rdquo;
                </p>
              </div>
            </motion.div>

            {/* Unlock button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="w-full max-w-xs"
            >
              <NeonButton onClick={() => setUnlocked(true)} variant="orange" size="lg">
                Unlock the Dossier — $9
              </NeonButton>
              <p className="text-center text-text-muted/50 text-[10px] mt-2">
                One-time access for this specific date only. Knowledge is power.
              </p>
              <button
                onClick={onNext}
                className="w-full text-center text-text-muted/40 text-[10px] mt-3 hover:text-text-muted transition-colors"
              >
                Skip — I&rsquo;ll wing it
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 flex-1 flex flex-col mt-6 overflow-y-auto"
          >
            <h2 className="text-lg font-bold gradient-cyber-text mb-1">The Dossier: Sloane</h2>
            <p className="text-[10px] text-text-muted font-mono uppercase tracking-wider mb-4">Personalized Mood Map</p>

            {/* Bullseye */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-xl bg-neon-green/5 border border-neon-green/15 mb-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <span>🎯</span>
                <h3 className="text-sm font-semibold text-neon-green">The Bullseye</h3>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wide">The &ldquo;Spark&rdquo; Topic</p>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    They&rsquo;re secretly obsessed with 70s horror movies. Mention &ldquo;The Texas Chain Saw Massacre&rdquo; and watch their eyes light up.
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wide">The Safe Zone</p>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    They love talking about their dog, but avoid their siblings. Stick to the Golden Retriever.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Minefield */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 rounded-xl bg-red-500/5 border border-red-500/15 mb-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <span>⚠️</span>
                <h3 className="text-sm font-semibold text-red-400">The Minefield</h3>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wide">The &ldquo;Instant Kill&rdquo;</p>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Do NOT mention crypto. Their last ex was a day-trader. Total vibe-killer.
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wide">Boredom Trigger</p>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    If you talk about &ldquo;Work-Life Balance&rdquo; for more than 5 minutes, they start looking for the exit.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Vibe Meter */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="p-4 rounded-xl bg-neon-cyan/5 border border-neon-cyan/15 mb-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span>🌡️</span>
                <h3 className="text-sm font-semibold text-neon-cyan">The Vibe Meter</h3>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wide">Energy Level</p>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Sloane starts the night at a 10, but crashes by 10 PM. Peak chemistry happens in the first 45 minutes—make your move early.
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wide">Physical Touch</p>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Reputation tags suggest a &ldquo;slow burn.&rdquo; Keep it to a polite arm touch until the end of the night.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <div className="pb-4 mt-auto">
              <NeonButton onClick={onNext} variant="purple">
                I&rsquo;m Ready — Let&rsquo;s Do This
              </NeonButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
