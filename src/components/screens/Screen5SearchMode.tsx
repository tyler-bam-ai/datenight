"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "../ui/ProgressBar";

interface TickerEntry {
  time: string;
  text: string;
  status?: "scanning" | "incompatible" | "potential" | "mingle";
}

const tickerData: TickerEntry[] = [
  { time: "21:04", text: "Analyzing 4,200 profiles in your 10-mile radius...", status: "scanning" },
  { time: "21:05", text: "Filtered 1,200 candidates (No 90s House music fans—next).", status: "incompatible" },
  { time: "21:06", text: "Interfacing with Avatar #3341... Status: Low Compatibility.", status: "incompatible" },
  { time: "21:07", text: "Interfacing with Avatar #8829... Status: Incompatible Temperament.", status: "incompatible" },
  { time: "21:08", text: "Found a night owl who also hates small talk... interesting.", status: "potential" },
  { time: "21:09", text: "Cross-referencing dealbreaker matrix... Clean slate.", status: "scanning" },
  { time: "21:10", text: "Interfacing with Avatar #1042... Status: High Energy Match!", status: "potential" },
  { time: "21:11", text: "Calculating Itinerary compatibility... Thursday 7PM works.", status: "scanning" },
  { time: "21:12", text: "Pinging the 'Sushi & Jazz' candidate... Mingle in progress.", status: "mingle" },
  { time: "21:14", text: "Deep vibe check initiated. Testing humor alignment...", status: "scanning" },
  { time: "21:16", text: "Match confidence rising: 88%... 91%... 94%.", status: "potential" },
  { time: "21:18", text: "I think I found someone. Verifying final compatibility...", status: "mingle" },
];

export default function Screen5SearchMode({ onNext }: { onNext: () => void }) {
  const [visibleEntries, setVisibleEntries] = useState<number>(0);
  const [matchFound, setMatchFound] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleEntries((prev) => {
        if (prev >= tickerData.length) {
          clearInterval(interval);
          setTimeout(() => setMatchFound(true), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const statusColor = (status?: string) => {
    switch (status) {
      case "scanning": return "text-neon-cyan";
      case "incompatible": return "text-red-400/70";
      case "potential": return "text-neon-green";
      case "mingle": return "text-neon-orange";
      default: return "text-text-muted";
    }
  };

  return (
    <div className="relative min-h-full flex flex-col p-6 overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-neon-purple/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full bg-neon-orange/5 blur-[80px] pointer-events-none" />

      {/* Progress */}
      <div className="relative z-10 pt-2">
        <ProgressBar progress={55} />
      </div>

      {/* Avatar working */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 flex flex-col items-center mt-8 mb-6"
      >
        <div className="relative mb-4">
          {/* Signal waves */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-neon-purple/20"
              animate={{
                scale: [1, 2 + i * 0.5],
                opacity: [0.4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeOut",
              }}
            />
          ))}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-purple/20 to-neon-orange/20 border border-neon-purple/30 flex items-center justify-center">
            <motion.span
              className="text-3xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🤖
            </motion.span>
          </div>
        </div>
        <p className="text-xs text-text-muted font-mono tracking-wider uppercase">
          {matchFound ? "Match Found" : "Searching..."}
        </p>
      </motion.div>

      {/* Live Ticker */}
      <div className="relative z-10 flex-1 bg-obsidian-light/50 rounded-2xl border border-white/5 overflow-hidden">
        <div className="px-4 py-2.5 border-b border-white/5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Live Activity Feed</span>
        </div>

        <div className="p-3 space-y-2 overflow-y-auto max-h-[360px]">
          <AnimatePresence>
            {tickerData.slice(0, visibleEntries).map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                className="flex gap-2 py-1.5 border-b border-white/3 last:border-0"
              >
                <span className="text-[10px] font-mono text-text-muted/60 shrink-0 mt-0.5">[{entry.time}]</span>
                <span className={`text-xs leading-relaxed ${statusColor(entry.status)}`}>
                  {entry.text}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>

          {visibleEntries < tickerData.length && (
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center gap-2 py-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
              <span className="text-[10px] text-text-muted font-mono">Processing...</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <AnimatePresence>
        {matchFound ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 mt-4 pb-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onNext}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-neon-purple to-neon-orange text-white font-bold text-sm tracking-wide uppercase animate-heartbeat cursor-pointer"
              style={{ boxShadow: "0 0 30px rgba(168, 85, 247, 0.4), 0 0 60px rgba(249, 115, 22, 0.2)" }}
            >
              🎉 See Your Match
            </motion.button>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 text-center text-xs text-text-muted/60 mt-4 pb-4"
          >
            Don&rsquo;t call me, I&rsquo;ll call you. Go live your life.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
