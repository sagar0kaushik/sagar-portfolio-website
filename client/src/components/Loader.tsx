import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onLoadingComplete?: () => void;
  characterSrc?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  onLoadingComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Preload all 5 character directional images for instant eye/head tracking
    const poses = [
      '/assets/char-center.png',
      '/assets/char-left.png',
      '/assets/char-right.png',
      '/assets/char-up.png',
      '/assets/char-down.png',
    ];
    poses.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            onLoadingComplete?.();
          }, 350);
          return 100;
        }
        // Swift, smooth ramp up: loads within ~1.2s to never keep user waiting
        const increment = Math.floor(Math.random() * 14) + 8;
        return Math.min(100, prev + increment);
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="cinematic-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-[#F5F5F5] select-none"
        >
          {/* Subtle ambient background glow */}
          <div className="absolute w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Monogram / Tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs tracking-[0.3em] font-mono text-neutral-500 uppercase mb-4"
            >
              PORTFOLIO // 2026
            </motion.div>

            {/* Main Name */}
            <motion.h1
              initial={{ opacity: 0, letterSpacing: '0.15em' }}
              animate={{ opacity: 1, letterSpacing: '0.25em' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-3xl md:text-5xl font-display font-light uppercase text-neutral-100 tracking-[0.25em]"
            >
              SAGAR KAUSHIK
            </motion.h1>

            {/* Subtitle Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 text-xs font-mono tracking-[0.2em] text-neutral-400 uppercase"
            >
              INITIALIZING EXPERIENCE
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-64 md:w-80 h-[2px] bg-white/10 rounded-full mt-8 overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-neutral-400 via-blue-400 to-white"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>

            {/* Percentage Indicator */}
            <div className="mt-3 font-mono text-[11px] text-neutral-500 tracking-wider">
              {progress.toString().padStart(3, '0')}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
