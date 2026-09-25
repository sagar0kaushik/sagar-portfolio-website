import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  FileCode2,
  Atom,
  Server,
  Database,
  Cpu,
  Terminal,
  Palette,
  Sparkles,
  Layout,
  Zap,
  KeyRound,
  HardDrive,
  Binary,
  Flame,
  GitBranch,
  Cloud,
  Send,
  Globe,
  Layers,
} from 'lucide-react';
import { SkillItem } from '../data/skills';

interface SkillCardProps {
  skill: SkillItem;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Map icon name string to Lucide icon component
  const getIcon = (name: string) => {
    switch (name) {
      case 'Atom': return <Atom className="w-5 h-5 text-blue-400" />;
      case 'FileCode2': return <FileCode2 className="w-5 h-5 text-blue-300" />;
      case 'Code': return <Code className="w-5 h-5 text-yellow-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-cyan-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-orange-400" />;
      case 'Server': return <Server className="w-5 h-5 text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-teal-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-indigo-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'KeyRound': return <KeyRound className="w-5 h-5 text-rose-400" />;
      case 'Database': return <Database className="w-5 h-5 text-emerald-400" />;
      case 'HardDrive': return <HardDrive className="w-5 h-5 text-sky-400" />;
      case 'Binary': return <Binary className="w-5 h-5 text-violet-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-orange-500" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-red-400" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-amber-300" />;
      case 'Send': return <Send className="w-5 h-5 text-orange-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-blue-400" />;
      default: return <Layers className="w-5 h-5 text-neutral-300" />;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setRotateX(-normY * 7); // subtle ±7 deg tilt
    setRotateY(normX * 7);
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
    <div style={{ perspective: 1200 }} className="h-full">
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1.0,
        }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 22,
          mass: 0.25,
        }}
        className={`group relative h-full p-5 rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-md flex flex-col justify-between ${
          isHovered
            ? 'bg-white/[0.08] border-white/30 shadow-glass-md'
            : 'bg-white/[0.03] border-white/10 shadow-glass-sm'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
        data-cursor="pointer"
      >
        {/* Dynamic Glass Glare following cursor */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-70 transition-opacity"
            style={{
              background: `radial-gradient(circle 180px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.12), transparent 70%)`,
            }}
          />
        )}

        <div className="relative z-10 space-y-3">
          {/* Top row: Icon + Category tag */}
          <div className="flex items-center justify-between">
            <motion.div
              animate={{
                y: isHovered ? -2 : 0,
                scale: isHovered ? 1.08 : 1.0,
              }}
              transition={{ duration: 0.2 }}
              className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:border-white/25 group-hover:bg-white/[0.10] transition-colors"
            >
              {getIcon(skill.iconName)}
            </motion.div>

            <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5">
              {skill.category}
            </span>
          </div>

          {/* Skill Title & Level */}
          <div>
            <h4 className="text-base font-display font-medium text-white group-hover:text-blue-100 transition-colors">
              {skill.name}
            </h4>
            <span className="text-[11px] font-mono text-neutral-400">
              {skill.level}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            {skill.description}
          </p>
        </div>

        {/* Bottom subtle indicator line */}
        <div className="relative z-10 pt-3 mt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-400">
          <span>ACTIVE STACK</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400/80 group-hover:scale-125 transition-transform" />
        </div>
      </motion.div>
    </div>
  );
};
