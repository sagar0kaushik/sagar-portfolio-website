import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { Code2, Cpu, Globe, GraduationCap, Award, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  const bioWords = [
    'I', 'am', 'a', 'passionate', 'Full-Stack', 'Developer', 'and', 'Creative',
    'Technologist', 'focused', 'on', 'building', 'scalable', 'industrial-grade',
    'web', 'applications,', 'high-performance', 'APIs,', 'and', 'immersive',
    'digital', 'experiences.', 'Currently', 'completing', 'my', 'B.Tech', 'in',
    'Computer', 'Science', 'at', 'GEC', 'Bharatpur,', 'I', 'bridge', 'the',
    'gap', 'between', 'complex', 'backend', 'systems', 'and', 'refined,',
    'production-ready', 'user', 'interfaces.',
  ];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-neutral-400 uppercase">
            <span>01</span>
            <span className="w-8 h-[1px] bg-neutral-600" />
            <span>BACKGROUND // IDENTITY</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-light text-white tracking-tight uppercase">
            ABOUT <span className="text-neutral-500 font-extralight">ME</span>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Animated Bio & Core Philosophy (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <GlassCard intensity={2} className="p-8 sm:p-10 space-y-6">
              {/* Word-by-word opacity progression reveal */}
              <div className="text-lg sm:text-xl md:text-2xl font-light text-neutral-200 leading-relaxed flex flex-wrap gap-x-2 gap-y-1">
                {bioWords.map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0.2, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.3, delay: index * 0.015 }}
                    className={
                      word.includes('Full-Stack') || word.includes('Creative') || word.includes('scalable')
                        ? 'text-white font-medium'
                        : 'text-neutral-300'
                    }
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-light border-t border-white/10 pt-6">
                With practical industry experience from my software engineering internship at
                <strong className="text-neutral-200 font-normal"> Uddharana Tech</strong> and
                real-world freelance client delivery for architectural systems like
                <strong className="text-neutral-200 font-normal"> MetaClads</strong>,
                I treat every line of code as an intersection of disciplined architecture,
                bulletproof security, and intuitive design.
              </p>

              {/* Engineering Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div className="space-y-1">
                  <span className="font-mono text-xs text-neutral-400 block uppercase">EDUCATION</span>
                  <p className="text-sm text-white font-medium">B.Tech in CSE</p>
                  <span className="text-xs text-neutral-400 font-mono">GEC Bharatpur (CGPA 7.8)</span>
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-xs text-neutral-400 block uppercase">CORE FOCUS</span>
                  <p className="text-sm text-white font-medium">MERN & Python</p>
                  <span className="text-xs text-neutral-400 font-mono">FastAPI & React</span>
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-xs text-neutral-400 block uppercase">LEADERSHIP</span>
                  <p className="text-sm text-white font-medium">Club Coordinator</p>
                  <span className="text-xs text-neutral-400 font-mono">50+ Mentees</span>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Floating Glass Metrics & Highlights (5 Cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <GlassCard intensity={1} className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center flex-shrink-0 text-blue-400">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-display font-medium text-white">Full-Stack Architecture</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  End-to-end full-lifecycle development across Node.js/Express, Python/FastAPI, MongoDB, and React.
                </p>
              </div>
            </GlassCard>

            <GlassCard intensity={1} className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0 text-cyan-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-display font-medium text-white">Creative Technology</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  Crafting fluid micro-interactions, responsive 3D elements, pointer tracking, and glassmorphic interfaces.
                </p>
              </div>
            </GlassCard>

            <GlassCard intensity={1} className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center flex-shrink-0 text-emerald-400">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-display font-medium text-white">Client & Industry Proven</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  Shipped production freelance work for commercial clients and delivered core enterprise features during internships.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};
