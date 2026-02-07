"use client";
import { motion } from "framer-motion";

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full h-1 bg-obsidian-light rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-orange"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          boxShadow: "0 0 10px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.2)",
        }}
      />
    </div>
  );
}
