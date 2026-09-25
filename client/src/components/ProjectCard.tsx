import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { ProjectItem } from '../data/projects';
import { MagneticButton } from './MagneticButton';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  total: number;
  scaleProgress?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  total,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    // Subtle 3D tilt
    setRotateX(-normY * 5);
    setRotateY(normX * 5);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handlePointerLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      style={{
        perspective: 1200,
        top: `calc(100px + ${index * 32}px)`,
      }}
      className="sticky w-full mb-12"
    >
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.01 : 1.0,
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 22,
          mass: 0.3,
        }}
        className="relative rounded-3xl border border-white/15 bg-neutral-950/85 backdrop-blur-heavy shadow-glass-lg overflow-hidden transition-all duration-300"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Dynamic glass reflection */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-20 opacity-40 transition-opacity"
            style={{
              background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.15), transparent 70%)`,
            }}
          />
        )}

        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 md:p-10 items-center">
          {/* Left Column: Project Info & Meta (6 Cols) */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between h-full">
            <div className="space-y-4">
              {/* Number + Category Badge */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-light text-neutral-500">
                  {project.number}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[11px] tracking-widest text-neutral-300 uppercase">
                  {project.category}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-medium text-white tracking-tight">
                  {project.name}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-1">
                  {project.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                {project.description}
              </p>

              {/* Metrics pills if present */}
              {project.metrics && (
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5"
                    >
                      <span className="block font-mono text-[10px] text-neutral-500 uppercase">
                        {m.label}
                      </span>
                      <span className="block font-mono text-xs text-white font-medium">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Technologies */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links: GitHub & Live Demo */}
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/10">
              {project.liveUrl && (
                <MagneticButton
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="md"
                  cursorLabel="pointer"
                  className="gap-2 shadow-sm"
                >
                  <span>LIVE DEMO</span>
                  <ExternalLink className="w-3.5 h-3.5 text-black" />
                </MagneticButton>
              )}

              <MagneticButton
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="glass"
                size="md"
                cursorLabel="pointer"
                className="gap-2"
              >
                <GithubIcon className="w-3.5 h-3.5 text-neutral-300" />
                <span>GITHUB REPO</span>
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Visual Container with Depth Layer (6 Cols) */}
          <div
            className="lg:col-span-6 relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 group"
            data-cursor="view"
          >
            {/* Parallax Image at different depth */}
            <motion.img
              src={project.visual}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{
                transform: `translate3d(${rotateY * 1.5}px, ${-rotateX * 1.5}px, 0)`,
              }}
              loading="lazy"
            />

            {/* Image Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-black/20 pointer-events-none" />

            {/* Corner Interactive Tag */}
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-[11px] font-mono text-white">
              <span>EXPLORE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
