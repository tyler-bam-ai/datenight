"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NeonButton from "../ui/NeonButton";
import ProgressBar from "../ui/ProgressBar";
import Confetti from "../ui/Confetti";

const punctualityOptions = ["Early", "On-Time", "Fashionably Late", "No-Show"];
const conversationOptions = ["Great Listener", "Shared the Mic", "Talked Over Me"];
const safetyOptions = ["Respectful", "Perfect Gentleman/Lady", "A Bit Much"];

export default function Screen9Debrief({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState<"spill" | "tag" | "done">("spill");
  const [vibeScore, setVibeScore] = useState(7);
  const [truthToggle, setTruthToggle] = useState(true);
  const [punctuality, setPunctuality] = useState("");
  const [conversation, setConversation] = useState("");
  const [safety, setSafety] = useState("");

  return (
    <div className="relative min-h-full flex flex-col p-6 overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-neon-purple/6 blur-[100px] pointer-events-none" />

      {/* Progress */}
      <div className="relative z-10 pt-2">
        <ProgressBar progress={95} />
      </div>

      <AnimatePresence mode="wait">
        {phase === "spill" && (
          <motion.div
            key="spill"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex-1 flex flex-col mt-6"
          >
            {/* Avatar waiting */}
            <div className="flex items-start gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-purple-dim flex items-center justify-center shrink-0">
                <span className="text-lg">🤖</span>
              </div>
              <div className="chat-bubble-ai p-4">
                <p className="text-sm text-text-secondary leading-relaxed">
                  &ldquo;You&rsquo;re back! I&rsquo;ve been dying to know... was I right? Tell me everything. The more honest you are, the smarter I get.&rdquo;
                </p>
              </div>
            </div>

            {/* Vibe Check slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs text-text-muted">IRL Chemistry vs Digital Score</p>
                <span className="text-sm font-bold text-neon-purple">{vibeScore}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={vibeScore}
                onChange={(e) => setVibeScore(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #a855f7 ${(vibeScore - 1) * 11.1}%, rgba(255,255,255,0.1) ${(vibeScore - 1) * 11.1}%)`,
                }}
              />
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-text-muted">Meh</span>
                <span className="text-[10px] text-text-muted">Sparks flew</span>
              </div>
            </div>

            {/* Truth Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-surface/50 border border-white/5 mb-6">
              <div>
                <p className="text-sm text-text-primary font-medium">Were they who they said they were?</p>
                <p className="text-[10px] text-text-muted mt-0.5">Photos, Personality, Energy</p>
              </div>
              <button
                onClick={() => setTruthToggle(!truthToggle)}
                className={`w-12 h-6 rounded-full transition-all relative ${
                  truthToggle ? "bg-neon-green" : "bg-red-500/50"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${
                    truthToggle ? "left-6" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Memory bank */}
            <div className="mb-6">
              <p className="text-xs text-text-muted mb-2">Notes to Self (AI will remember)</p>
              <textarea
                placeholder="e.g., 'I realized I actually don't like quiet bars as much as I thought...'"
                className="w-full h-20 p-3 rounded-xl bg-surface/50 border border-white/5 text-xs text-text-secondary placeholder-text-muted/40 resize-none focus:outline-none focus:border-neon-purple/30"
              />
            </div>

            <div className="mt-auto pb-4">
              <NeonButton onClick={() => setPhase("tag")} variant="purple">
                Keep Going...
              </NeonButton>
            </div>
          </motion.div>
        )}

        {phase === "tag" && (
          <motion.div
            key="tag"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex-1 flex flex-col mt-6"
          >
            <div className="flex items-start gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-purple-dim flex items-center justify-center shrink-0">
                <span className="text-lg">🤖</span>
              </div>
              <div className="chat-bubble-ai p-3">
                <p className="text-xs text-text-secondary leading-relaxed">
                  &ldquo;Now let&rsquo;s update Sloane&rsquo;s Avatar reputation. This stays invisible to humans—only other AIs see it.&rdquo;
                </p>
              </div>
            </div>

            {/* Punctuality */}
            <div className="mb-5">
              <p className="text-xs font-medium text-text-secondary mb-2">Punctuality</p>
              <div className="flex flex-wrap gap-2">
                {punctualityOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setPunctuality(opt)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                      punctuality === opt
                        ? "bg-neon-purple/20 border-neon-purple/50 text-neon-purple border"
                        : "bg-surface/50 border border-white/5 text-text-muted hover:border-white/20"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Conversation */}
            <div className="mb-5">
              <p className="text-xs font-medium text-text-secondary mb-2">Conversation Flow</p>
              <div className="flex flex-wrap gap-2">
                {conversationOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setConversation(opt)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                      conversation === opt
                        ? "bg-neon-orange/20 border-neon-orange/50 text-neon-orange border"
                        : "bg-surface/50 border border-white/5 text-text-muted hover:border-white/20"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Safety */}
            <div className="mb-6">
              <p className="text-xs font-medium text-text-secondary mb-2">The &ldquo;Safety&rdquo; Badge</p>
              <div className="flex flex-wrap gap-2">
                {safetyOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSafety(opt)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                      safety === opt
                        ? "bg-neon-green/20 border-neon-green/50 text-neon-green border"
                        : "bg-surface/50 border border-white/5 text-text-muted hover:border-white/20"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto pb-4">
              <NeonButton onClick={() => setPhase("done")} variant="purple">
                Submit Debrief
              </NeonButton>
            </div>
          </motion.div>
        )}

        {phase === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 flex-1 flex flex-col items-center justify-center text-center"
          >
            <Confetti count={40} />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-purple to-neon-orange flex items-center justify-center mb-6"
              style={{ boxShadow: "0 0 40px rgba(168, 85, 247, 0.3), 0 0 80px rgba(249, 115, 22, 0.2)" }}
            >
              <span className="text-4xl">✨</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3 mb-8"
            >
              <h2 className="text-xl font-bold gradient-cyber-text">Avatar Updated</h2>
              <div className="chat-bubble-ai p-4 mx-auto max-w-xs">
                <p className="text-xs text-text-secondary leading-relaxed">
                  &ldquo;Understood. I&rsquo;ve tagged Sloane&rsquo;s Avatar. Future AIs will know they&rsquo;re a &lsquo;Legendary Listener&rsquo; but &lsquo;Chronically 10 minutes late.&rsquo; I&rsquo;ll factor that into your future vetting.&rdquo;
                </p>
              </div>
            </motion.div>

            {/* Reputation Preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-full max-w-xs space-y-2 mb-8"
            >
              <p className="text-[10px] font-mono text-text-muted uppercase tracking-wider text-center">Your Reputation</p>
              {[
                { label: "Reliability", grade: "A+", color: "text-neon-green" },
                { label: "Vibe Accuracy", grade: "B+", color: "text-neon-orange" },
                { label: "Safety Score", grade: "100%", color: "text-neon-purple" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="flex justify-between items-center p-3 rounded-xl bg-surface/50 border border-white/5"
                >
                  <span className="text-xs text-text-secondary">{stat.label}</span>
                  <span className={`text-sm font-bold ${stat.color}`}>{stat.grade}</span>
                </motion.div>
              ))}
            </motion.div>

            <NeonButton onClick={onNext} variant="purple">
              Back to Home
            </NeonButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
