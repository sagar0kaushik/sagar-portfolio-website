import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experienceData } from '../data/experience';
import { GlassCard } from './GlassCard';
import { Briefcase, GraduationCap, Users, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'WORK':
        return <Briefcase className="w-4 h-4 text-blue-400" />;
      case 'LEADERSHIP':
        return <Users className="w-4 h-4 text-emerald-400" />;
      case 'EDUCATION':
        return <GraduationCap className="w-4 h-4 text-cyan-400" />;
      default:
        return <Briefcase className="w-4 h-4 text-white" />;
    }
  };

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-28 px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      <div className="w-full max-w-5xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-neutral-400 uppercase">
            <span>03</span>
            <span className="w-8 h-[1px] bg-neutral-600" />
            <span>TRAJECTORY // TIMELINE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-light text-white tracking-tight uppercase">
            WORK &amp; <span className="text-neutral-500 font-extralight">EXPERIENCE</span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 md:pl-12">
          {/* Vertical Track Base */}
          <div className="absolute left-2 sm:left-4 top-4 bottom-4 w-[2px] bg-white/10" />

          {/* Progressively Illuminating Timeline Bar */}
          <motion.div
            className="absolute left-2 sm:left-4 top-4 w-[2px] bg-gradient-to-b from-blue-400 via-cyan-400 to-white shadow-[0_0_12px_rgba(96,165,250,0.8)] origin-top"
            style={{ height: lineHeight }}
          />

          {/* Timeline Cards */}
          <div className="space-y-12">
            {experienceData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30, rotateY: 5 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Glowing Node on Timeline Track */}
                <div className="absolute -left-6 sm:-left-10 md:-left-12 top-6 -translate-x-1/2 w-7 h-7 rounded-full bg-[#050505] border-2 border-white/20 flex items-center justify-center z-10 shadow-glass-sm group-hover:border-blue-400 transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.9)]" />
                </div>

                <GlassCard intensity={2} className="p-6 sm:p-8 space-y-5">
                  {/* Top Bar: Role & Year Pill */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-white/[0.05] border border-white/10">
                          {getTypeIcon(item.type)}
                        </span>
                        <h3 className="text-lg sm:text-xl font-display font-medium text-white">
                          {item.role}
                        </h3>
                      </div>
                      <p className="text-sm text-neutral-300 font-light flex items-center gap-3">
                        <span className="font-normal text-white">{item.company}</span>
                        <span className="text-neutral-600">&bull;</span>
                        <span className="flex items-center gap-1 text-xs text-neutral-400">
                          <MapPin className="w-3 h-3" /> {item.location}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-neutral-300 w-fit">
                      <Calendar className="w-3 h-3 text-neutral-400" />
                      <span>{item.year}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-300 font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bullet Achievements */}
                  {item.achievements.length > 0 && (
                    <div className="space-y-2 pt-2">
                      {item.achievements.map((ach, achIdx) => (
                        <div key={achIdx} className="flex items-start gap-2.5 text-xs text-neutral-300 font-light leading-normal">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technologies tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/5">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono text-neutral-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
