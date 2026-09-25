import React from 'react';
import { motion } from 'framer-motion';
import { characterConfig } from '../config/character';

interface CharacterParallaxProps {
  children: React.ReactNode;
  parallaxX: number; // 10-20px max
  parallaxY: number;
  rotateX: number;   // ±3 deg max
  rotateY: number;   // ±5 deg max
  isHovered: boolean;
  className?: string;
}

export const CharacterParallax: React.FC<CharacterParallaxProps> = ({
  children,
  parallaxX,
  parallaxY,
  rotateX,
  rotateY,
  isHovered,
  className = '',
}) => {
  return (
    <motion.div
      className={`relative select-none ${className}`}
      style={{ perspective: 1000 }}
      animate={{
        x: parallaxX,
        y: parallaxY,
        rotateX: rotateX,
        rotateY: rotateY,
        scale: isHovered ? characterConfig.hoverScale : 1.0,
      }}
      transition={{
        type: 'spring',
        stiffness: 140,
        damping: 20,
        mass: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
};
