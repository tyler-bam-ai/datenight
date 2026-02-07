"use client";
import { useMemo } from "react";

const ICONS = ["🍷", "🥾", "🎵", "💃", "🎭", "📚", "🎸", "🍕", "✈️", "🎬", "🏔️", "🎨", "🎯", "☕", "🌙"];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function DataStream({ count = 15 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        icon: ICONS[Math.floor(seededRandom(i + 1) * ICONS.length)],
        left: seededRandom(i + 10) * 100,
        delay: seededRandom(i + 20) * 4,
        duration: 3 + seededRandom(i + 30) * 4,
        size: 12 + seededRandom(i + 40) * 10,
      })),
    [count]
  );

  return (
    <div className="data-stream-bg">
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`,
          }}
        >
          {p.icon}
        </span>
      ))}
    </div>
  );
}
