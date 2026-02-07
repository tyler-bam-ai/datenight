"use client";
import { motion } from "framer-motion";

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "purple" | "orange" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function NeonButton({
  children,
  onClick,
  variant = "purple",
  size = "md",
  fullWidth = true,
  disabled = false,
}: NeonButtonProps) {
  const baseClasses = "relative font-semibold tracking-wide uppercase rounded-2xl transition-all duration-300 overflow-hidden";

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3.5 text-sm",
    lg: "px-8 py-4.5 text-base",
  };

  const variantClasses = {
    purple:
      "bg-gradient-to-r from-neon-purple to-neon-purple-dim text-white box-glow-purple hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]",
    orange:
      "bg-gradient-to-r from-neon-orange to-neon-orange-dim text-white box-glow-orange hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]",
    outline:
      "bg-transparent border border-neon-purple/40 text-neon-purple hover:bg-neon-purple/10 hover:border-neon-purple/70",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${fullWidth ? "w-full" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={disabled ? undefined : onClick}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
