"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NeonButton from "../ui/NeonButton";
import DataStream from "../ui/DataStream";

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration * 60);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [target, duration]);
  return <>{count.toLocaleString()}</>;
}

export default function Screen1RealityCheck({ onNext }: { onNext: () => void }) {
  return (
    <div className="relative min-h-full flex flex-col justify-between p-6 overflow-hidden">
      <DataStream count={20} />

      {/* Ambient glow - more dramatic */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-neon-purple/12 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-neon-orange/8 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-48 h-48 rounded-full bg-neon-pink/6 blur-[80px] pointer-events-none" />

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
            style={{ boxShadow: "0 0 10px rgba(168, 85, 247, 0.3)" }}
          />
        </motion.div>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-center space-y-5"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-1"
          >
            <p className="text-5xl font-black gradient-cyber-text leading-tight">
              <AnimatedCounter target={10} duration={1.5} /> Million
            </p>
            <p className="text-base text-text-secondary font-light tracking-wide">
              Potential Matches
            </p>
          </motion.div>

          <div className="flex items-center gap-4 justify-center">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="h-px flex-1 bg-gradient-to-r from-transparent to-neon-purple/40 origin-right"
            />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9, type: "spring" }}
              className="text-text-muted text-xs font-bold tracking-widest uppercase px-2"
            >
              Only
            </motion.span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="h-px flex-1 bg-gradient-to-l from-transparent to-neon-orange/40 origin-left"
            />
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-1"
          >
            <p className="text-5xl font-black gradient-cyber-text leading-tight">
              <AnimatedCounter target={52} duration={1.5} /> Weekends
            </p>
            <p className="text-base text-text-secondary font-light tracking-wide">
              A Year
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="pt-4 space-y-2"
          >
            <p className="text-text-muted text-sm leading-relaxed max-w-xs mx-auto">
              The odds are against you finding the one.
            </p>
            <p className="text-text-secondary font-semibold text-base">
              Stop scrolling. Start dating.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
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
