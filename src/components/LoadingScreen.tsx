import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  const circumference = 2 * Math.PI * 45;

  return (
    <AnimatePresence>
      {progress <= 100 && (
        <motion.div
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <svg width="120" height="120" className="transform -rotate-90">
              <circle
                cx="60" cy="60" r="45"
                fill="none"
                stroke="rgba(155,109,255,0.15)"
                strokeWidth="2"
              />
              <circle
                cx="60" cy="60" r="45"
                fill="none"
                stroke="var(--purple-bright)"
                strokeWidth="2"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (progress / 100) * circumference}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.1s linear" }}
              />
            </svg>
            <span
              className="absolute inset-0 flex items-center justify-center font-display text-2xl font-extrabold"
              style={{ color: "var(--white)" }}
            >
              AP
            </span>
          </motion.div>
          <p className="mono-label mt-8 typing-cursor">
            initializing_portfolio.exe
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
