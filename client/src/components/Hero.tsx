import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';
import { InteractiveCharacter } from './InteractiveCharacter';

interface HeroProps {
  onViewWorkClick?: () => void;
  onContactClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewWorkClick }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0.35);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;
      const progress = Math.min(1, Math.max(0.1, scrollY / height));
      setScrollProgress(0.25 + progress * 0.65);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatIDoItems = [
    'Web Development',
    'UI/UX Design',
    'Creative Direction',
    '3D & Animation',
    'Problem Solving',
  ];

  const techPills = ['MERN', 'PYTHON', 'FASTAPI', 'TAILWIND'];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-6 sm:pt-8 lg:pt-10 pb-6 px-6 sm:px-10 md:px-14 lg:px-16 overflow-hidden bg-[#070707]"
    >
      {/* Background radial atmosphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-gradient-to-b from-white/[0.03] via-blue-500/[0.015] to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* ========================================================
          TOP HEADER BAR (Matches reference media_1790321322327.png)
          ======================================================== */}
      <div className="w-full flex flex-col sm:flex-row sm:items-start justify-between z-20 gap-6">
        {/* Top-Left: Name & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2 max-w-xs"
        >
          <div className="font-mono text-xs sm:text-sm font-semibold tracking-[0.25em] text-white uppercase leading-tight">
            SAGAR<br />KAUSHIK
          </div>
          <div className="w-5 h-[1.5px] bg-neutral-600" />
          <p className="font-mono text-[11px] sm:text-xs text-neutral-400 font-normal leading-relaxed">
            A developer crafting clean, scalable and meaningful digital experiences.
          </p>
        </motion.div>

        {/* Top-Right: Minimalist Nav Links */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:flex items-center gap-7 lg:gap-9 text-xs font-mono tracking-[0.2em] text-neutral-400 uppercase"
        >
          <button
            onClick={() => handleScrollTo('about')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            ABOUT
          </button>
          <button
            onClick={() => handleScrollTo('process')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            PROCESS
          </button>
          <button
            onClick={() => handleScrollTo('work')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            PROJECTS
          </button>
          <button
            onClick={() => handleScrollTo('skills')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            SKILLS
          </button>
          <button
            onClick={() => handleScrollTo('client-work')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            D.O.T
          </button>
          <button
            onClick={() => handleScrollTo('contact')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            TALK
          </button>
          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-pulse" />
        </motion.nav>
      </div>

      {/* ========================================================
          MAIN HERO BODY (Center Character + Left Copy + Right List)
          ======================================================== */}
      <div className="relative w-full my-auto py-3 sm:py-5 lg:py-2 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-0 z-20">
        
        {/* --- LEFT COLUMN: Typography & Actions (5 Cols on LG) --- */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-4 xl:col-span-4 flex flex-col justify-center space-y-6 sm:space-y-7 z-20"
        >
          {/* Index Counter */}
          <div className="font-mono text-xs sm:text-sm tracking-[0.2em] text-neutral-400 flex items-center gap-3">
            <span>01</span>
            <span className="inline-block w-8 sm:w-12 h-[1.5px] bg-neutral-400" />
          </div>

          {/* Large Hero Title matching reference media_1790332392743.png */}
          <div className="space-y-1 sm:space-y-1.5">
            <h1 className="leading-[0.92] select-none tracking-tight">
              <span className="block font-sans font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] text-white tracking-[-0.01em] uppercase">
                I BUILD
              </span>
              {/* Pixelated DIGITAL Font matching reference */}
              <span className="block font-pixel font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.9rem] xl:text-[4.4rem] text-white tracking-[0.05em] uppercase my-1 sm:my-1.5 leading-[0.95]">
                DIGITAL
              </span>
              <span className="block font-sans font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] text-white tracking-[-0.01em] uppercase">
                EXPERIENCES
              </span>
            </h1>
          </div>

          {/* Subtitle Description on two lines matching reference */}
          <p className="font-mono text-xs sm:text-sm md:text-[13px] text-neutral-400 font-normal leading-relaxed max-w-md">
            Turning complex problems into simple,<br className="hidden sm:inline" /> beautiful and functional products.
          </p>

          {/* Action Button: [ ▶  VIEW MY WORK  ↗ ] */}
          <div className="pt-2">
            <button
              onClick={() => {
                onViewWorkClick?.();
                handleScrollTo('work');
              }}
              data-cursor="pointer"
              className="group relative inline-flex items-center justify-between gap-4 px-5 sm:px-6 py-3.5 bg-black/40 hover:bg-white/[0.06] border border-white/20 hover:border-white/50 backdrop-blur-md rounded-none transition-all duration-300 text-white font-mono text-xs tracking-[0.2em] uppercase min-w-[210px] sm:min-w-[240px] shadow-[0_0_20px_rgba(0,0,0,0.6)] cursor-pointer"
            >
              <Play className="w-3 h-3 fill-white text-white transition-transform group-hover:scale-110" />
              <span className="font-medium text-neutral-200 group-hover:text-white">VIEW MY WORK</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5 pt-3">
            <a
              href="https://github.com/sagar0kaushik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors duration-200 p-1"
              aria-label="GitHub Profile"
              data-cursor="pointer"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/sagar0kaushik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors duration-200 p-1"
              aria-label="LinkedIn Profile"
              data-cursor="pointer"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com/sagar0kaushik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors duration-200 p-1"
              aria-label="Twitter Profile"
              data-cursor="pointer"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* --- CENTER COLUMN: Stable Interactive Character (5 Cols on LG) --- */}
        <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center relative w-full my-6 lg:my-0">
          <InteractiveCharacter
            variant="hero"
            isHeroActive={true}
          />
        </div>

        {/* --- RIGHT COLUMN: WHAT I DO List (3 Cols on LG) --- */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="hidden lg:flex lg:col-span-3 xl:col-span-3 flex-col items-start justify-center space-y-4 pl-4 xl:pl-8 z-20"
        >
          <div className="space-y-2">
            <div className="font-mono text-xs tracking-[0.25em] text-white uppercase font-medium">
              WHAT I DO
            </div>
            <div className="w-5 h-[1.5px] bg-neutral-600" />
          </div>

          <ul className="space-y-3 pt-1">
            {whatIDoItems.map((item) => (
              <li
                key={item}
                className="font-mono text-xs xl:text-sm text-neutral-300 font-normal hover:text-white transition-colors cursor-default select-none"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* ========================================================
          BOTTOM BAR & FAR-RIGHT SCROLL TRACK INDICATOR
          ======================================================== */}
      <div className="w-full flex flex-col sm:flex-row items-end sm:items-center justify-between z-20 pt-4 gap-4">
        {/* Mobile "What I Do" Quick Pills */}
        <div className="flex lg:hidden flex-wrap gap-2 text-[11px] font-mono text-neutral-400">
          {whatIDoItems.slice(0, 3).map((item) => (
            <span key={item} className="px-2.5 py-1 bg-white/[0.03] border border-white/10 rounded-sm">
              {item}
            </span>
          ))}
        </div>

        {/* Bottom Right: Tech Pills [ MERN ] [ PYTHON ] [ FASTAPI ] [ TAILWIND ] • */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="ml-auto flex items-center gap-2 sm:gap-2.5 text-[10px] sm:text-xs font-mono tracking-widest text-neutral-400"
        >
          {techPills.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-black/40 border border-white/10 text-neutral-300 hover:border-white/30 transition-colors uppercase"
            >
              {tech}
            </span>
          ))}
          <span className="w-1.5 h-1.5 rounded-full bg-white ml-1 shadow-[0_0_8px_#ffffff]" />
        </motion.div>
      </div>

      {/* ========================================================
          FAR-RIGHT SCROLL TO EXPLORE TRACK
          ======================================================== */}
      <div
        className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4 select-none pointer-events-none"
        aria-hidden="true"
      >
        {/* Track Line with dynamic dot */}
        <div className="relative w-[1px] h-32 bg-white/15">
          <motion.div
            className="absolute -left-[3.5px] w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff]"
            style={{
              top: `${scrollProgress * 100}%`,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          />
        </div>

        {/* Vertical Text */}
        <div className="font-mono text-[9px] tracking-[0.25em] text-neutral-400 uppercase text-center leading-tight flex flex-col gap-1">
          <span>SCROLL</span>
          <span>TO EXPLORE</span>
        </div>
      </div>
    </section>
  );
};
