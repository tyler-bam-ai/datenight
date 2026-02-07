"use client";
import { useState, useCallback } from "react";
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

const screenVariants = {
  enter: { opacity: 0, x: 60, filter: "blur(4px)" },
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, x: -60, filter: "blur(4px)" },
};

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState(0);

  const goToScreen = useCallback((screen: number) => {
    setCurrentScreen(screen);
  }, []);

  const next = useCallback(() => {
    setCurrentScreen((s) => Math.min(s + 1, 8));
  }, []);

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
      {/* Screen navigation dots (desktop) */}
      <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-2 z-50">
        {Array.from({ length: 9 }, (_, i) => (
          <button
            key={i}
            onClick={() => goToScreen(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === currentScreen
                ? "bg-neon-purple scale-125 shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                : "bg-white/15 hover:bg-white/30"
            }`}
            title={`Screen ${i + 1}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentScreen}
          variants={screenVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
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
