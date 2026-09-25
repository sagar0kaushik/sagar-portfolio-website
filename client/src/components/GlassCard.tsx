import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 1 | 2 | 3;
  enableTilt?: boolean;
  tiltMaxAngle?: number;
  dataCursor?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  intensity = 1,
  enableTilt = true,
  tiltMaxAngle = 6,
  dataCursor,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setRotateX(-normY * tiltMaxAngle);
    setRotateY(normX * tiltMaxAngle);
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

  // Glass levels according to color system
  const bgStyles = {
    1: 'bg-white/[0.03] border-white/10 hover:border-white/20',
    2: 'bg-white/[0.05] border-white/[0.12] hover:border-white/25',
    3: 'bg-white/[0.08] border-white/15 hover:border-white/30',
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative"
    >
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={onClick}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.01 : 1.0,
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          mass: 0.3,
        }}
        data-cursor={dataCursor}
        className={`relative overflow-hidden rounded-2xl border backdrop-blur-md transition-shadow duration-300 shadow-glass-sm hover:shadow-glass-md ${bgStyles[intensity]} ${className}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Dynamic glass reflection/glare following pointer */}
        {isHovered && enableTilt && (
          <div
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 opacity-60"
            style={{
              background: `radial-gradient(circle 240px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.08), transparent 70%)`,
            }}
          />
        )}

        {/* Ambient top edge highlight for true glass depth */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        <div className="relative z-20 h-full">{children}</div>
      </motion.div>
    </div>
  );
};
