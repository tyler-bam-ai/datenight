"use client";
import { motion } from "framer-motion";
import NeonButton from "../ui/NeonButton";
import ProgressBar from "../ui/ProgressBar";
import DataStream from "../ui/DataStream";

const steps = [
  {
    icon: "🤝",
    title: "Your Digital Double",
    desc: "I am your AI dating Avatar. My job is to mix and mingle with other AIs until I find someone you're going to love.",
  },
  {
    icon: "❤️",
    title: "The Deep Dive",
    desc: "I need to ask you a bunch of questions to get to the heart of your, well... heart.",
  },
  {
    icon: "⏳",
    title: "Always On",
    desc: "I'll date around the clock. While you sleep or work, I'm vetting compatibility scores.",
  },
];

export default function Screen2Handover({ onNext }: { onNext: () => void }) {
  return (
    <div className="relative min-h-full flex flex-col p-6 overflow-hidden">
      <DataStream count={12} />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-neon-purple/8 blur-[100px] pointer-events-none" />

      {/* Progress */}
      <div className="relative z-10 pt-2">
        <ProgressBar progress={15} />
      </div>

      {/* Avatar Visual */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative z-10 flex justify-center mt-8 mb-6"
      >
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-purple/20 to-neon-orange/20 flex items-center justify-center border border-neon-purple/30">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-purple to-neon-purple-dim flex items-center justify-center animate-heartbeat">
              <span className="text-2xl">🤖</span>
            </div>
          </div>
          {/* Pulse rings */}
          <div className="absolute inset-0 rounded-full border border-neon-purple/20 animate-pulse-ring" />
          <div className="absolute inset-0 rounded-full border border-neon-purple/10 animate-pulse-ring" style={{ animationDelay: "1s" }} />
        </div>
      </motion.div>

      {/* Dialogue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 chat-bubble-ai p-4 mb-6"
      >
        <p className="text-sm text-text-secondary leading-relaxed">
          &ldquo;I can help you, but you have to help me. The more I know about what matters
          most to you, the better I&rsquo;ll be at finding that diamond in the rough&mdash;the
          proverbial needle in the haystack.&rdquo;
        </p>
      </motion.div>

      {/* Steps */}
      <div className="relative z-10 space-y-3 flex-1">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.2 }}
            className="flex gap-3 items-start p-3 rounded-xl bg-surface/50 border border-white/5"
          >
            <span className="text-xl mt-0.5">{step.icon}</span>
            <div>
              <h3 className="text-sm font-semibold text-text-primary">{step.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed mt-0.5">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hand-off note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 text-center text-xs text-text-muted mt-4 mb-4"
      >
        After I find a match, it&rsquo;s back to you. You&rsquo;ll chat and decide if it&rsquo;s time to meet IRL.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="relative z-10 pb-4"
      >
        <NeonButton onClick={onNext}>
          Well, let&rsquo;s get started shall we?
        </NeonButton>
        <p className="text-center text-text-muted/60 text-[10px] mt-2">Don&rsquo;t hold back. I&rsquo;m all ears.</p>
      </motion.div>
    </div>
  );
}
