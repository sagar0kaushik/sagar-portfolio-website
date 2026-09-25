import React from 'react';
import { motion } from 'framer-motion';

interface OrbitalRingProps {
  className?: string;
  isHovered?: boolean;
}

export const OrbitalRing: React.FC<OrbitalRingProps> = ({ className = '', isHovered = false }) => {
  // Define positions and depths for the 5 iconic pearl beads matching reference
  const pearls = [
    { id: 1, cx: 480, cy: 195, r: 6.5, glow: '12px', delay: 0, opacity: 0.95 },   // Top-Right shoulder
    { id: 2, cx: 550, cy: 300, r: 7.5, glow: '16px', delay: 0.8, opacity: 1 },    // Mid-Right waist
    { id: 3, cx: 125, cy: 375, r: 8, glow: '18px', delay: 1.6, opacity: 0.9 },     // Mid-Left hip
    { id: 4, cx: 555, cy: 490, r: 6.5, glow: '14px', delay: 2.4, opacity: 0.85 },  // Lower-Right knee
    { id: 5, cx: 440, cy: 450, r: 5.5, glow: '12px', delay: 3.2, opacity: 0.9 },   // Inner lower-right
  ];

  return (
    <div
      className={`absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible z-10 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 682 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[140%] h-[120%] -top-[10%] -left-[20%] absolute transition-transform duration-700 ease-out"
        style={{
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.08))',
        }}
      >
        <defs>
          {/* Subtle metallic wire gradient */}
          <linearGradient id="orbitalWireGrad" x1="100" y1="200" x2="600" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <stop offset="25%" stopColor="#E2E8F0" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#CBD5E1" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
          </linearGradient>

          {/* Pearl bead radial sphere gradient */}
          <radialGradient id="pearlSphere" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#F1F5F9" />
            <stop offset="75%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </radialGradient>

          {/* Pearl glow filter */}
          <filter id="pearlGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer 3D orbital curve wrapping around the character */}
        <motion.path
          d="M 125,375 C 100,290 260,160 480,195 C 600,215 620,380 550,490 C 490,580 200,560 140,430 C 130,410 120,390 125,375 Z"
          stroke="url(#orbitalWireGrad)"
          strokeWidth="1.25"
          strokeDasharray="4 2"
          className="opacity-70"
          animate={{
            strokeDashoffset: [0, -60],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Secondary inner glowing continuous ribbon */}
        <path
          d="M 125,375 C 100,290 260,160 480,195 C 600,215 620,380 550,490 C 490,580 200,560 140,430"
          stroke="url(#orbitalWireGrad)"
          strokeWidth="1.5"
          className="opacity-85"
        />

        {/* 5 Glowing Pearl Nodes */}
        {pearls.map((pearl) => (
          <g key={pearl.id} className="transition-transform duration-500">
            {/* Ambient pearl halo glow */}
            <circle
              cx={pearl.cx}
              cy={pearl.cy}
              r={pearl.r * 2.2}
              fill="rgba(255, 255, 255, 0.18)"
              filter="url(#pearlGlow)"
              className="animate-pulse"
              style={{
                animationDuration: `${3 + pearl.id}s`,
              }}
            />

            {/* Specular core pearl sphere */}
            <circle
              cx={pearl.cx}
              cy={pearl.cy}
              r={pearl.r}
              fill="url(#pearlSphere)"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="0.75"
              style={{
                filter: `drop-shadow(0 0 ${pearl.glow} rgba(255, 255, 255, 0.9))`,
                opacity: pearl.opacity,
              }}
            />

            {/* Tiny pure-white highlight speck */}
            <circle
              cx={pearl.cx - pearl.r * 0.3}
              cy={pearl.cy - pearl.r * 0.3}
              r={pearl.r * 0.28}
              fill="#FFFFFF"
              opacity="0.9"
            />
          </g>
        ))}
      </svg>
    </div>
  );
};
