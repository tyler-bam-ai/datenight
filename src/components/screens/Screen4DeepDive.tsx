"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NeonButton from "../ui/NeonButton";
import ProgressBar from "../ui/ProgressBar";

interface Question {
  id: number;
  category: string;
  prompt: string;
  type: "choice" | "slider" | "grid";
  options?: string[];
  gridOptions?: { label: string; emoji: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    category: "Social Energy",
    prompt: "It's 11:00 PM on a Friday. We just left the main event. What's the move?",
    type: "choice",
    options: ["After-party, let's go!", "Quiet late-night slice", "Uber me home, I'm done"],
  },
  {
    id: 2,
    category: "Social Energy",
    prompt: "In a room full of strangers, where do you gravitate?",
    type: "choice",
    options: ["Center stage, holding court", "Corner booth, deep in conversation", "By the exit, planning my escape"],
  },
  {
    id: 3,
    category: "Intellectual Wiring",
    prompt: "What's the last rabbit hole you spent 3 hours on just because you were curious?",
    type: "choice",
    options: ["True crime deep dive", "Wikipedia spiral", "YouTube algorithm hole", "Reddit rabbit hole"],
  },
  {
    id: 4,
    category: "Emotional Wiring",
    prompt: "When you're stressed, what do you actually need?",
    type: "choice",
    options: ["Give me 'The Plan' to fix it", "Just sit on the couch and be annoyed with me", "Leave me alone for 3 hours"],
  },
  {
    id: 5,
    category: "The Unfiltered Truth",
    prompt: "Be honest—I'm an AI, I won't judge. What are you really looking for?",
    type: "choice",
    options: ["The one I take home to my parents", "The spontaneous road trip person", "Someone who's both, somehow"],
  },
  {
    id: 6,
    category: "Vibe Check",
    prompt: "Pick three images that feel like your perfect 9:00 PM.",
    type: "grid",
    gridOptions: [
      { label: "Dive Bar", emoji: "🍻" },
      { label: "Quiet Library", emoji: "📚" },
      { label: "Packed Concert", emoji: "🎸" },
      { label: "Late Night Hike", emoji: "🏔️" },
      { label: "Rooftop Lounge", emoji: "🌃" },
      { label: "Home Cooking", emoji: "🍳" },
    ],
  },
];

const aiReactions = [
  "Interesting... I'm already filtering out about 40,000 people who wouldn't get that.",
  "Oof, I felt that one. Finding a match who respects that boundary now.",
  "Now we're getting somewhere. Your avatar is taking shape.",
];

export default function Screen4DeepDive({ onNext }: { onNext: () => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [showReaction, setShowReaction] = useState(false);
  const [selectedGrid, setSelectedGrid] = useState<string[]>([]);

  const q = questions[currentQ];
  const isLast = currentQ === questions.length - 1;
  const progress = 30 + (currentQ / questions.length) * 25;

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [q.id]: answer });
    advanceQuestion();
  };

  const handleGridSelect = (label: string) => {
    setSelectedGrid((prev) => {
      if (prev.includes(label)) return prev.filter((l) => l !== label);
      if (prev.length >= 3) return prev;
      return [...prev, label];
    });
  };

  const advanceQuestion = () => {
    if ((currentQ + 1) % 3 === 0 && currentQ > 0) {
      setShowReaction(true);
      setTimeout(() => {
        setShowReaction(false);
        if (isLast) {
          onNext();
        } else {
          setCurrentQ((c) => c + 1);
        }
      }, 2500);
    } else if (isLast) {
      onNext();
    } else {
      setCurrentQ((c) => c + 1);
    }
  };

  return (
    <div className="relative min-h-full flex flex-col p-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      {/* Progress */}
      <div className="relative z-10 pt-2">
        <ProgressBar progress={progress} />
      </div>

      {/* Phase header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 mt-6 mb-2"
      >
        <p className="text-[10px] font-mono text-neon-purple/70 tracking-widest uppercase">
          Phase 2: The Deep Dive
        </p>
      </motion.div>

      {/* Avatar */}
      <div className="relative z-10 flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-purple-dim flex items-center justify-center shrink-0">
          <span className="text-lg">🤖</span>
        </div>
        <div className="chat-bubble-ai px-4 py-2.5">
          <p className="text-[10px] text-neon-purple/60 mb-0.5 font-medium">{q.category}</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-text-secondary leading-relaxed"
            >
              &ldquo;{q.prompt}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Question content */}
      <AnimatePresence mode="wait">
        {showReaction ? (
          <motion.div
            key="reaction"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex-1 flex items-center justify-center"
          >
            <div className="chat-bubble-ai p-5 max-w-xs">
              <p className="text-sm text-neon-purple italic text-center">
                &ldquo;{aiReactions[Math.floor(currentQ / 3) % aiReactions.length]}&rdquo;
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`q-${q.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 flex-1"
          >
            {q.type === "choice" && (
              <div className="space-y-3">
                {q.options?.map((option, i) => (
                  <motion.button
                    key={option}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleAnswer(option)}
                    className="w-full text-left p-4 rounded-xl bg-surface/70 border border-white/5 hover:border-neon-purple/40 hover:bg-neon-purple/5 transition-all"
                  >
                    <p className="text-sm text-text-primary">{option}</p>
                  </motion.button>
                ))}
              </div>
            )}

            {q.type === "grid" && (
              <div>
                <p className="text-xs text-text-muted mb-3">Select up to 3</p>
                <div className="grid grid-cols-3 gap-3">
                  {q.gridOptions?.map((opt, i) => (
                    <motion.button
                      key={opt.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleGridSelect(opt.label)}
                      className={`vibe-card p-4 flex flex-col items-center gap-2 ${
                        selectedGrid.includes(opt.label) ? "selected" : ""
                      }`}
                    >
                      <span className="text-2xl">{opt.emoji}</span>
                      <span className="text-[10px] text-text-muted">{opt.label}</span>
                    </motion.button>
                  ))}
                </div>
                {selectedGrid.length === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    <NeonButton onClick={() => { setAnswers({ ...answers, [q.id]: selectedGrid }); advanceQuestion(); }} size="md">
                      That&rsquo;s the truth
                    </NeonButton>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question counter */}
      <div className="relative z-10 pb-4 pt-4">
        <div className="flex justify-center gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i < currentQ ? "w-4 bg-neon-purple" : i === currentQ ? "w-6 bg-neon-orange" : "w-2 bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
