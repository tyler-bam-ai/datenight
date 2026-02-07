"use client";
import { motion } from "framer-motion";
import NeonButton from "../ui/NeonButton";
import RingProgress from "../ui/RingProgress";
import ProgressBar from "../ui/ProgressBar";

const kpis = [
  { label: "Aesthetic Sync", value: 88, color: "#a855f7", sublabel: "Exactly your type" },
  { label: "Height Precision", value: 100, color: "#10b981", sublabel: "No platform shoes needed" },
  { label: "Life Alignment", value: 94, color: "#f97316", sublabel: "Sunday morning energy" },
  { label: "Vibe Consistency", value: 91, color: "#06b6d4", sublabel: "4/5 unpopular opinions" },
  { label: "Intellectual Spark", value: 89, color: "#ec4899", sublabel: "Same Wikipedia holes" },
  { label: "Schedule Sync", value: 98, color: "#a855f7", sublabel: "Thursday 7PM works" },
];

export default function Screen6MatchDashboard({ onNext }: { onNext: () => void }) {
  return (
    <div className="relative min-h-full flex flex-col p-6 overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-neon-purple/8 blur-[100px] pointer-events-none" />

      {/* Progress */}
      <div className="relative z-10 pt-2">
        <ProgressBar progress={70} />
      </div>

      {/* AI verdict speech bubble */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 chat-bubble-ai p-3 mt-4 mb-4"
      >
        <p className="text-xs text-text-secondary leading-relaxed">
          &ldquo;I&rsquo;ve been busy. I sifted through the noise and found <span className="text-neon-purple font-semibold">The One</span> (or at least, the one for this Friday). Here&rsquo;s why I&rsquo;m obsessed with this match:&rdquo;
        </p>
      </motion.div>

      {/* Hero Profile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 flex items-center gap-4 p-4 rounded-2xl bg-surface/60 border border-white/5 mb-4"
      >
        {/* Avatar placeholder */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-orange/30 to-neon-pink/30 flex items-center justify-center shrink-0 border border-neon-orange/20">
          <span className="text-3xl">👤</span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-text-primary">Sloane, 28</h2>
          <p className="text-xs text-neon-purple/80 italic leading-snug mt-0.5">
            A 90s House enthusiast who also thinks cilantro tastes like soap. Sound familiar?
          </p>
        </div>
      </motion.div>

      {/* Deal-breakers badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 flex justify-center mb-4"
      >
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/20">
          <span className="text-xs">✅</span>
          <span className="text-xs text-neon-green font-medium">Deal-Breakers: 0 Detected</span>
        </div>
      </motion.div>

      {/* KPI Ring Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 grid grid-cols-3 gap-4 mb-4"
      >
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.1 }}
          >
            <RingProgress
              value={kpi.value}
              size={76}
              strokeWidth={5}
              color={kpi.color}
              label={kpi.label}
              sublabel={kpi.sublabel}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* AI Inside Scoop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 p-3 rounded-xl bg-neon-purple/5 border border-neon-purple/10 mb-4"
      >
        <p className="text-[10px] text-neon-purple/60 font-mono uppercase tracking-wider mb-1">Why I Picked Them</p>
        <p className="text-xs text-text-muted leading-relaxed">
          &ldquo;I spent 45 minutes debating with Sloane&rsquo;s AI. While their profile looks &lsquo;cool,&rsquo; their AI admitted they prefer dive bars to nightclubs&mdash;just like you. Not a match on paper; a match in the real moments.&rdquo;
        </p>
      </motion.div>

      {/* The Vault Paywall */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="relative z-10 p-3 rounded-xl bg-gradient-to-r from-neon-orange/5 to-yellow-500/5 border border-neon-orange/15 mb-4"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-sm">🏆</span>
          <p className="text-[10px] text-neon-orange font-bold uppercase tracking-wider">The Vault</p>
        </div>
        <p className="text-[10px] text-text-muted leading-relaxed mb-2">
          I found 300 more matches in <span className="text-neon-orange">The Vault</span>&mdash;fully vetted for safety &amp; status (ID, Background, Credit checked). Want me to open the door?
        </p>
        <button className="text-[10px] text-neon-orange/80 font-semibold hover:text-neon-orange transition-colors">
          Get Vault Access &mdash; $29.99/mo &rarr;
        </button>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="relative z-10 space-y-2 pb-4"
      >
        <NeonButton onClick={onNext} variant="purple">
          Let&rsquo;s Chat
        </NeonButton>
        <NeonButton onClick={() => {}} variant="outline" size="sm">
          View Itinerary
        </NeonButton>
      </motion.div>
    </div>
  );
}
