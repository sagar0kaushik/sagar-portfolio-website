import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export type CharacterPose = 'center' | 'left' | 'right' | 'up' | 'down';

export interface InteractiveCharacterProps {
  className?: string;
  variant?: 'hero' | 'contact' | 'mini';
  isHeroActive?: boolean;
}

const POSE_IMAGES: Record<CharacterPose, string> = {
  center: '/assets/char-center.png',
  left: '/assets/char-left.png',
  right: '/assets/char-right.png',
  up: '/assets/char-up.png',
  down: '/assets/char-down.png',
};

export const InteractiveCharacter: React.FC<InteractiveCharacterProps> = ({
  className = '',
  variant = 'hero',
  isHeroActive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePose, setActivePose] = useState<CharacterPose>('center');
  const [isHovered, setIsHovered] = useState(false);

  // Persistent reference to current pose for hysteresis logic
  const currentPoseRef = useRef<CharacterPose>('center');
  currentPoseRef.current = activePose;

  // Ultra-smooth physical spring damping for video-like continuous 3D head pivot
  const headRotateX = useSpring(0, { stiffness: 100, damping: 20, mass: 0.6 });
  const headRotateY = useSpring(0, { stiffness: 100, damping: 20, mass: 0.6 });
  const headRotateZ = useSpring(0, { stiffness: 100, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (!isHeroActive) {
      setActivePose('center');
      headRotateX.set(0);
      headRotateY.set(0);
      headRotateZ.set(0);
      return;
    }

    let rafId: number | null = null;
    let pendingEvent: PointerEvent | MouseEvent | null = null;

    const processPointer = () => {
      if (!pendingEvent || !containerRef.current) return;
      const e = pendingEvent;

      const rect = containerRef.current.getBoundingClientRect();
      // Precise head center landmark (neck pivot point at 50% width, 22% height)
      const headX = rect.left + rect.width * 0.5;
      const headY = rect.top + rect.height * 0.22;

      const dx = e.clientX - headX;
      const dy = e.clientY - headY;
      const dist = Math.hypot(dx, dy);

      // Deadzone threshold: within 80px, face forward
      if (dist < 80) {
        if (currentPoseRef.current !== 'center') {
          setActivePose('center');
        }
        headRotateX.set(0);
        headRotateY.set(0);
        headRotateZ.set(0);
        rafId = null;
        return;
      }

      // Smooth continuous 3D rotation (always active at 60fps for video fluidity)
      const maxDistanceX = window.innerWidth * 0.45;
      const maxDistanceY = window.innerHeight * 0.45;
      const normX = Math.max(-1, Math.min(1, dx / maxDistanceX));
      const normY = Math.max(-1, Math.min(1, dy / maxDistanceY));

      headRotateY.set(normX * 5.0); // Look left / right
      headRotateX.set(-normY * 3.5); // Look up / down
      headRotateZ.set(normX * 1.2); // Subtle organic roll

      // Calculate angle in degrees: 0° = right, 90° = down, -90° = up, ±180° = left
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      const cur = currentPoseRef.current;

      // Hysteresis buffers (prevents frame jitter at boundaries)
      let nextPose: CharacterPose = cur;

      if (cur === 'right') {
        if (angle > 52 && angle < 128) nextPose = 'down';
        else if (angle < -52 && angle > -128) nextPose = 'up';
        else if (angle >= 135 || angle <= -135) nextPose = 'left';
      } else if (cur === 'left') {
        if (angle > 52 && angle < 128) nextPose = 'down';
        else if (angle < -52 && angle > -128) nextPose = 'up';
        else if (angle >= -35 && angle <= 35) nextPose = 'right';
      } else if (cur === 'up') {
        if (angle >= -35 && angle <= 35) nextPose = 'right';
        else if (angle >= 145 || angle <= -145) nextPose = 'left';
        else if (angle > 35 && angle < 145) nextPose = 'down';
      } else if (cur === 'down') {
        if (angle >= -35 && angle <= 35) nextPose = 'right';
        else if (angle >= 145 || angle <= -145) nextPose = 'left';
        else if (angle < -35 && angle > -145) nextPose = 'up';
      } else {
        // From center
        if (angle >= -42 && angle <= 42) nextPose = 'right';
        else if (angle >= 138 || angle <= -138) nextPose = 'left';
        else if (angle > -138 && angle < -42) nextPose = 'up';
        else if (angle > 42 && angle < 138) nextPose = 'down';
      }

      if (nextPose !== cur) {
        setActivePose(nextPose);
      }

      rafId = null;
    };

    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      pendingEvent = e;
      if (!rafId) {
        rafId = requestAnimationFrame(processPointer);
      }
    };

    const handleMouseLeave = () => {
      setActivePose('center');
      headRotateX.set(0);
      headRotateY.set(0);
      headRotateZ.set(0);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isHeroActive, headRotateX, headRotateY, headRotateZ]);

  const sizeStyles = {
    hero: 'w-[290px] sm:w-[350px] md:w-[410px] lg:w-[450px] xl:w-[490px] aspect-[682/1024] max-h-[85vh]',
    contact: 'w-[200px] sm:w-[240px] md:w-[280px] aspect-[682/1024]',
    mini: 'w-[120px] sm:w-[150px] aspect-[682/1024]',
  };

  const directionalPoses: CharacterPose[] = ['left', 'right', 'up', 'down'];

  return (
    <div
      ref={containerRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className={`relative flex items-center justify-center select-none pointer-events-auto ${sizeStyles[variant]} ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* 1. Dark Studio Ground Pedestal Shadow */}
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-8 rounded-[100%] bg-black/90 blur-xl pointer-events-none transition-opacity duration-300"
        style={{
          boxShadow: '0 10px 40px 10px rgba(0, 0, 0, 0.95)',
        }}
      />

      {/* 2. Soft Studio Backlight Halo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[90%] rounded-full bg-gradient-to-b from-white/[0.04] via-blue-500/[0.02] to-transparent blur-3xl pointer-events-none" />

      {/* 3. Character Container: Body is strictly stable, head tilts from neck pivot */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center pointer-events-auto"
        style={{
          rotateX: headRotateX,
          rotateY: headRotateY,
          rotateZ: headRotateZ,
          transformOrigin: '50% 24%', // Pivots at the neck/head so feet stay 100% planted on the floor
          transformStyle: 'preserve-3d',
        }}
      >
        {/* BASE LAYER: Center pose is ALWAYS fully opaque at z-0.
            This ensures zero brightness dip, zero transparency bleed, and video-like solidity */}
        <img
          src={POSE_IMAGES.center}
          alt="Sagar Kaushik — Neutral pose"
          draggable={false}
          loading="eager"
          className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] z-0 pointer-events-none"
        />

        {/* DIRECTIONAL OVERLAYS: Fade in smoothly on top with 280ms cubic-bezier transition */}
        {directionalPoses.map((pose) => {
          const isActive = activePose === pose;
          return (
            <img
              key={pose}
              src={POSE_IMAGES[pose]}
              alt={`Sagar Kaushik — ${pose} pose`}
              draggable={false}
              loading="eager"
              className={`absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] pointer-events-none z-10 transition-opacity duration-[280ms] ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
                willChange: 'opacity',
              }}
            />
          );
        })}
      </motion.div>

      {/* 5. Subtle Studio Floor Reflection */}
      <div
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-3/4 h-24 overflow-hidden pointer-events-none opacity-20 blur-sm scale-y-[-0.35]"
        style={{
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 80%)',
        }}
      >
        <img
          src={POSE_IMAGES[activePose]}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain filter brightness-50"
        />
      </div>
    </div>
  );
};
