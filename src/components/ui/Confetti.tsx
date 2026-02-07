"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

const COLORS = ["#a855f7", "#f97316", "#ec4899", "#06b6d4", "#10b981", "#fbbf24"];

export default function Confetti({ count = 30 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        color: COLORS[Math.floor(seededRandom(i) * COLORS.length)],
        x: seededRandom(i + 10) * 100,
        delay: seededRandom(i + 20) * 0.8,
        duration: 1.5 + seededRandom(i + 30) * 2,
        size: 4 + seededRandom(i + 40) * 6,
        rotation: seededRandom(i + 50) * 360,
        shape: seededRandom(i + 60) > 0.5 ? "circle" : "rect",
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: -10,
            width: p.size,
            height: p.shape === "rect" ? p.size * 1.5 : p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: [0, 800],
            opacity: [1, 1, 0],
            rotate: [0, p.rotation],
            x: [0, (seededRandom(p.id + 70) - 0.5) * 100],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}
