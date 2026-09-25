import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  variant?: 'primary' | 'secondary' | 'glass' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  cursorLabel?: 'pointer' | 'view' | 'interact';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  target,
  rel,
  download,
  variant = 'glass',
  size = 'md',
  cursorLabel = 'pointer',
  disabled = false,
  type = 'button',
  ariaLabel,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Maximum magnetic movement: 6-8px as required
    const maxDelta = 8;
    const deltaX = Math.max(-maxDelta, Math.min(maxDelta, (clientX - centerX) * 0.25));
    const deltaY = Math.max(-maxDelta, Math.min(maxDelta, (clientY - centerY) * 0.25));

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-colors select-none outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs tracking-wider uppercase rounded-full gap-2',
    md: 'px-6 py-3 text-sm tracking-wider uppercase rounded-full gap-2.5',
    lg: 'px-8 py-4 text-sm md:text-base tracking-widest uppercase rounded-full gap-3',
  };

  const variantStyles = {
    primary:
      'bg-white text-black hover:bg-neutral-200 shadow-glass-md hover:shadow-glow-silver border border-white/80',
    secondary:
      'bg-neutral-900 text-white hover:bg-neutral-800 border border-white/20 shadow-glass-sm',
    glass:
      'bg-white/[0.05] text-[#F5F5F5] hover:bg-white/[0.10] border border-white/15 hover:border-white/30 backdrop-blur-md shadow-glass-sm hover:shadow-glass-md',
    outline:
      'bg-transparent text-neutral-300 hover:text-white border border-white/20 hover:border-white/50 hover:bg-white/[0.04]',
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 15, mass: 0.2 }}
      className="inline-block"
      data-cursor={cursorLabel}
    >
      {href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          download={download}
          className={combinedStyles}
          onClick={onClick}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={combinedStyles}
          aria-label={ariaLabel}
        >
          {children}
        </button>
      )}
    </motion.div>
  );

  return content;
};
