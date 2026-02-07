"use client";
import { motion } from "framer-motion";
import NeonButton from "../ui/NeonButton";
import DataStream from "../ui/DataStream";

export default function Screen1RealityCheck({ onNext }: { onNext: () => void }) {
  return (
    <div className="relative min-h-full flex flex-col justify-between p-6 overflow-hidden">
      <DataStream count={20} />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-neon-purple/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-60 h-60 rounded-full bg-neon-orange/8 blur-[80px] pointer-events-none" />

      {/* Top section */}
      <div className="relative z-10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-black tracking-tight mb-1">
            <span className="glow-purple">d</span>
            <span className="text-text-primary">A</span>
            <span className="glow-purple">te</span>
            <span className="text-text-primary"> </span>
            <span className="glow-orange">n</span>
            <span className="text-text-primary">I</span>
            <span className="glow-orange">ght</span>
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-0.5 w-24 mx-auto mt-3 bg-gradient-to-r from-neon-purple to-neon-orange rounded-full"
          />
        </motion.div>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-center space-y-6"
        >
          <div className="space-y-2">
            <p className="text-4xl font-extrabold gradient-cyber-text leading-tight">
              10 Million
            </p>
            <p className="text-lg text-text-secondary font-light">
              Potential Matches
            </p>
          </div>

          <div className="flex items-center gap-4 justify-center">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-neon-purple/30" />
            <span className="text-text-muted text-sm font-medium">ONLY</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-neon-orange/30" />
          </div>

          <div className="space-y-2">
            <p className="text-4xl font-extrabold gradient-cyber-text leading-tight">
              52 Weekends
            </p>
            <p className="text-lg text-text-secondary font-light">
              A Year
            </p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-text-muted text-sm leading-relaxed max-w-xs mx-auto pt-4"
          >
            The odds are against you finding the one.
            <br />
            <span className="text-text-secondary font-medium">Stop scrolling. Start dating.</span>
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="relative z-10 space-y-3 pb-4"
      >
        <NeonButton onClick={onNext} variant="purple" size="lg">
          Let the AI Take the Reins
        </NeonButton>
        <button className="w-full text-center text-text-muted text-xs hover:text-text-secondary transition-colors py-2">
          Already a member? <span className="text-neon-purple">Log in</span>
        </button>
        <p className="text-center text-text-muted/50 text-[10px]">
          Your privacy is our priority; your romantic success is our mission.
        </p>
      </motion.div>
    </div>
  );
}
