"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NeonButton from "../ui/NeonButton";
import ProgressBar from "../ui/ProgressBar";

interface Message {
  id: number;
  sender: "ai" | "system" | "prompt";
  text: string;
  delay: number;
}

const chatMessages: Message[] = [
  {
    id: 1,
    sender: "ai",
    text: "Okay, I've done my part. You two are a 94% match on 'Life Alignment' and you both have a weird obsession with 1970s brutalist architecture.",
    delay: 0,
  },
  {
    id: 2,
    sender: "ai",
    text: "Sloane, meet your match. [User], meet the person who's going to challenge your playlist. I'll step back now—don't make me look bad!",
    delay: 1.5,
  },
  {
    id: 3,
    sender: "system",
    text: "Your AI Avatar has left the chat. It's just you two now.",
    delay: 3,
  },
];

const promptOptions = [
  "My AI tells me you have a 'hot take' on the best pizza in the city. Defend your position.",
  "So, our digital doubles spent 3 hours talking for us. Want to see if we can last 3 minutes without them?",
];

export default function Screen7WarmIntro({ onNext }: { onNext: () => void }) {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [showPrompts, setShowPrompts] = useState(false);
  const [userSent, setUserSent] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [showBridge, setShowBridge] = useState(false);

  useEffect(() => {
    const timers = chatMessages.map((msg, i) =>
      setTimeout(() => setVisibleMessages(i + 1), msg.delay * 1000)
    );
    const promptTimer = setTimeout(() => setShowPrompts(true), 4500);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(promptTimer);
    };
  }, []);

  const handleSendPrompt = (prompt: string) => {
    setSelectedPrompt(prompt);
    setUserSent(true);
    setShowPrompts(false);
    setTimeout(() => setShowBridge(true), 2000);
  };

  return (
    <div className="relative min-h-full flex flex-col overflow-hidden">
      {/* Progress */}
      <div className="relative z-10 px-6 pt-8">
        <ProgressBar progress={80} />
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 mt-4 mb-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-text-primary">You & Sloane</h2>
            <p className="text-[10px] text-neon-green font-mono tracking-wider">VIBE CONFIRMED BY AI AVATARS</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-orange/30 to-neon-pink/30 flex items-center justify-center border border-neon-orange/20">
            <span className="text-lg">👤</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Chat area */}
      <div className="relative z-10 flex-1 px-6 py-4 overflow-y-auto space-y-3">
        <AnimatePresence>
          {chatMessages.slice(0, visibleMessages).map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {msg.sender === "ai" && (
                <div className="flex gap-2 items-start">
                  <div className="w-7 h-7 rounded-full bg-neon-purple/20 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-xs">🤖</span>
                  </div>
                  <div className="chat-bubble-ai px-3.5 py-2.5 max-w-[85%]">
                    <p className="text-sm text-text-secondary leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              )}
              {msg.sender === "system" && (
                <div className="flex justify-center">
                  <p className="text-[10px] text-text-muted/50 bg-surface/30 px-3 py-1 rounded-full">
                    {msg.text}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* User sent message */}
        {userSent && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end"
          >
            <div className="chat-bubble-user px-3.5 py-2.5 max-w-[85%]">
              <p className="text-sm text-text-secondary leading-relaxed">{selectedPrompt}</p>
            </div>
          </motion.div>
        )}

        {/* Typing indicator from match */}
        {userSent && !showBridge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2 items-start"
          >
            <div className="w-7 h-7 rounded-full bg-neon-orange/20 flex items-center justify-center shrink-0">
              <span className="text-xs">👤</span>
            </div>
            <div className="chat-bubble-ai px-4 py-3 border-neon-orange/20">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-neon-orange/60"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Sloane's response */}
        {showBridge && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2 items-start"
          >
            <div className="w-7 h-7 rounded-full bg-neon-orange/20 flex items-center justify-center shrink-0 mt-1">
              <span className="text-xs">👤</span>
            </div>
            <div className="chat-bubble-ai px-3.5 py-2.5 max-w-[85%] border-neon-orange/20">
              <p className="text-sm text-text-secondary leading-relaxed">
                Okay I&rsquo;m impressed, your AI has good taste 😏 But the real question is... can you keep up IRL?
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Prompt options / Bridge card */}
      <div className="relative z-10 px-6 pb-6">
        <AnimatePresence mode="wait">
          {showPrompts && !userSent && (
            <motion.div
              key="prompts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-2"
            >
              <p className="text-[10px] text-text-muted text-center mb-2">Conversation Starters</p>
              {promptOptions.map((prompt, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  onClick={() => handleSendPrompt(prompt)}
                  className="w-full text-left p-3 rounded-xl bg-surface/70 border border-neon-orange/10 hover:border-neon-orange/30 transition-all"
                >
                  <p className="text-xs text-text-secondary leading-relaxed">&ldquo;{prompt}&rdquo;</p>
                </motion.button>
              ))}
            </motion.div>
          )}

          {showBridge && (
            <motion.div
              key="bridge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-gradient-to-r from-neon-purple/10 to-neon-orange/10 border border-neon-purple/20"
            >
              <p className="text-xs text-text-secondary text-center mb-3">
                The vibes are checking out. Ready to take this off the screen?
              </p>
              <div className="flex gap-2">
                <NeonButton onClick={() => {}} variant="outline" size="sm">
                  Not Yet
                </NeonButton>
                <NeonButton onClick={onNext} variant="orange" size="sm">
                  Let&rsquo;s Meet
                </NeonButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
