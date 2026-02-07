"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Screen1RealityCheck from "@/components/screens/Screen1RealityCheck";
import Screen2Handover from "@/components/screens/Screen2Handover";
import Screen3Synthesis from "@/components/screens/Screen3Synthesis";
import Screen4DeepDive from "@/components/screens/Screen4DeepDive";
import Screen5SearchMode from "@/components/screens/Screen5SearchMode";
import Screen6MatchDashboard from "@/components/screens/Screen6MatchDashboard";
import Screen7WarmIntro from "@/components/screens/Screen7WarmIntro";
import Screen8Dossier from "@/components/screens/Screen8Dossier";
import Screen9Debrief from "@/components/screens/Screen9Debrief";

const SCREEN_NAMES = [
  "The Reality Check",
  "The Handover",
  "The Synthesis",
  "The Deep Dive",
  "Search Mode",
  "The Reveal",
  "Warm Intro",
  "The Dossier",
  "Debrief",
];

const screenVariants = {
  enter: { opacity: 0, x: 80, scale: 0.96 },
  center: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -80, scale: 0.96 },
};

function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2400);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-obsidian"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Ambient glow */}
      <div className="absolute w-64 h-64 rounded-full bg-neon-purple/15 blur-[80px]" />
      <div className="absolute w-48 h-48 rounded-full bg-neon-orange/10 blur-[60px] translate-y-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.7, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center relative z-10"
      >
        <h1 className="text-5xl font-black tracking-tight mb-3">
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
          transition={{ delay: 0.5, duration: 0.6 }}
          className="h-0.5 w-20 mx-auto bg-gradient-to-r from-neon-purple to-neon-orange rounded-full"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-text-muted text-xs tracking-widest uppercase mt-4"
        >
          Less scrolling. More dressing up.
        </motion.p>
      </motion.div>

      {/* Loading dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-20 flex gap-1.5"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-neon-purple/60"
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [showSplash, setShowSplash] = useState(true);

  const goToScreen = useCallback((screen: number) => {
    setCurrentScreen(screen);
  }, []);

  const next = useCallback(() => {
    setCurrentScreen((s) => Math.min(s + 1, 8));
  }, []);

  const prev = useCallback(() => {
    setCurrentScreen((s) => Math.max(s - 1, 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  // Touch swipe gestures
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      // Only trigger if horizontal swipe is dominant and > 60px
      if (absDx > absDy && absDx > 60) {
        if (dx < 0) next();
        else prev();
      }
      touchStartRef.current = null;
    };
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [next, prev]);

  const screens = [
    <Screen1RealityCheck key="s1" onNext={next} />,
    <Screen2Handover key="s2" onNext={next} />,
    <Screen3Synthesis key="s3" onNext={next} />,
    <Screen4DeepDive key="s4" onNext={next} />,
    <Screen5SearchMode key="s5" onNext={next} />,
    <Screen6MatchDashboard key="s6" onNext={next} />,
    <Screen7WarmIntro key="s7" onNext={next} />,
    <Screen8Dossier key="s8" onNext={next} />,
    <Screen9Debrief key="s9" onNext={() => goToScreen(0)} />,
  ];

  return (
    <main className="phone-frame">
      {/* Splash */}
      <AnimatePresence>
        {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      </AnimatePresence>

      {/* Screen navigation dots (desktop) */}
      <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-3 z-50">
        {SCREEN_NAMES.map((name, i) => (
          <button
            key={i}
            onClick={() => goToScreen(i)}
            className="group flex items-center gap-2 cursor-pointer"
            title={name}
          >
            <span className={`text-[10px] opacity-0 group-hover:opacity-100 transition-opacity text-right whitespace-nowrap ${
              i === currentScreen ? "text-neon-purple" : "text-text-muted"
            }`}>
              {name}
            </span>
            <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === currentScreen
                ? "bg-neon-purple scale-125 shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                : i < currentScreen
                ? "bg-neon-purple/40"
                : "bg-white/15 group-hover:bg-white/30"
            }`} />
          </button>
        ))}
      </div>

      {/* Screen label */}
      {!showSplash && (
        <motion.div
          key={`label-${currentScreen}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-3 left-1/2 -translate-x-1/2 z-40"
        >
          <div className="screen-label">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-purple/60" />
            {currentScreen + 1}/{SCREEN_NAMES.length} {SCREEN_NAMES[currentScreen]}
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentScreen}
          variants={screenVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="min-h-full"
          style={{ minHeight: "inherit", maxHeight: "inherit", overflow: "auto" }}
        >
          {screens[currentScreen]}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
