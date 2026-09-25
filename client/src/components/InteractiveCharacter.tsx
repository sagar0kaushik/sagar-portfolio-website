import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

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

const VIDEO_SRC_WEBM = '/assets/character-track.webm';
const VIDEO_SRC_MP4 = '/assets/character-track.mp4';

// Organic spring configuration for 3D neck/head pivot (zero body translation)
const SPRING_CONFIG = { stiffness: 100, damping: 20, mass: 0.6 };

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Shortest-path angle/timeline interpolation on a cyclic [0, 1) duration.
 * Ensures wrapping around 0% and 100% is seamless without full-circle spins.
 */
function lerpWrapped(current: number, target: number, factor: number): number {
  let delta = target - current;
  delta = delta - Math.round(delta);
  let next = current + delta * factor;
  return ((next % 1) + 1) % 1;
}

export const InteractiveCharacter: React.FC<InteractiveCharacterProps> = ({
  className = '',
  variant = 'hero',
  isHeroActive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activePose, setActivePose] = useState<CharacterPose>('center');
  const [videoReady, setVideoReady] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  // Persistent reference to current pose for image hysteresis logic
  const currentPoseRef = useRef<CharacterPose>('center');
  currentPoseRef.current = activePose;

  // Ultra-smooth physical spring motion values for continuous 3D head pivot
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawRotateZ = useMotionValue(0);
  const headRotateX = useSpring(rawRotateX, SPRING_CONFIG);
  const headRotateY = useSpring(rawRotateY, SPRING_CONFIG);
  const headRotateZ = useSpring(rawRotateZ, SPRING_CONFIG);

  // High-frequency pointer coordinates in viewport space
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  // Video scrub time tracker (normalized 0-1 fraction) with seeking state lock
  const scrubRef = useRef({ current: 0, target: 0, lastSeekTimestamp: 0 });
  const isSeekingRef = useRef(false);
  const lastTimestampRef = useRef<number>(performance.now());

  // Listen to window pointer movements
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
      pointerRef.current.active = true;
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  // Main 60-144fps requestAnimationFrame loop: drives 3D spatial springs and video scrub
  useEffect(() => {
    if (!isHeroActive) {
      rawRotateX.set(0);
      rawRotateY.set(0);
      rawRotateZ.set(0);
      setActivePose('center');
      return;
    }

    let rafId: number;

    const tick = (now: number) => {
      // Calculate true delta time in seconds, clamped to protect against tab suspension
      const dt = clamp((now - lastTimestampRef.current) / 1000, 0.001, 0.1);
      lastTimestampRef.current = now;

      const container = containerRef.current;
      const video = videoRef.current;

      if (container) {
        const rect = container.getBoundingClientRect();
        // Neck/head pivot landmark: 50% width, 22% height (stable feet planted on floor)
        const pivotX = rect.left + rect.width * 0.5;
        const pivotY = rect.top + rect.height * 0.22;

        const { x, y, active } = pointerRef.current;
        const dx = x - pivotX;
        const dy = y - pivotY;
        const distance = Math.hypot(dx, dy);

        const isNeutral = !active || distance < 80;

        // --- 1. Continuous 3D Head Tilt (Framer Motion Springs) ---
        if (isNeutral) {
          rawRotateX.set(0);
          rawRotateY.set(0);
          rawRotateZ.set(0);
        } else {
          const maxTrack = 480;
          const intensity = clamp((distance - 80) / (maxTrack - 80), 0, 1);
          const normalizedX = clamp(dx / maxTrack, -1, 1);
          const normalizedY = clamp(dy / maxTrack, -1, 1);

          rawRotateY.set(normalizedX * 10 * intensity); // Head turn left/right
          rawRotateX.set(-normalizedY * 10 * intensity); // Head tilt up/down
          rawRotateZ.set(normalizedX * 4 * intensity * 0.5); // Subtle organic roll
        }

        // --- 2. Fallback PNG Pose Hysteresis (Instant 60fps fallback when video not ready) ---
        if (!videoReady) {
          if (isNeutral) {
            if (currentPoseRef.current !== 'center') {
              setActivePose('center');
            }
          } else {
            const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
            const cur = currentPoseRef.current;
            let nextPose: CharacterPose = cur;

            if (cur === 'left') {
              if (angle > -75 && angle < 75) nextPose = 'right';
              else if (angle < -75 && angle > -105) nextPose = 'up';
              else if (angle > 75 && angle < 105) nextPose = 'down';
            } else if (cur === 'right') {
              if (angle > 105 || angle < -105) nextPose = 'left';
              else if (angle < -75 && angle > -105) nextPose = 'up';
              else if (angle > 75 && angle < 105) nextPose = 'down';
            } else if (cur === 'up') {
              if (angle >= -35 && angle <= 35) nextPose = 'right';
              else if (angle >= 145 || angle <= -145) nextPose = 'left';
              else if (angle > 35 && angle < 145) nextPose = 'down';
            } else if (cur === 'down') {
              if (angle >= -35 && angle <= 35) nextPose = 'right';
              else if (angle >= 145 || angle <= -145) nextPose = 'left';
              else if (angle < -35 && angle > -145) nextPose = 'up';
            } else {
              if (angle >= -42 && angle <= 42) nextPose = 'right';
              else if (angle >= 138 || angle <= -138) nextPose = 'left';
              else if (angle > -138 && angle < -42) nextPose = 'up';
              else if (angle > 42 && angle < 138) nextPose = 'down';
            }

            if (nextPose !== cur) {
              setActivePose(nextPose);
            }
          }
        }

        // --- 3. Buttery Smooth Video Scrub Engine ---
        if (video && videoReady && videoDuration > 0) {
          if (isNeutral) {
            scrubRef.current.target = 0; // Return smoothly to neutral forward frame
          } else {
            const angleRad = Math.atan2(dy, dx);
            const angleDeg = (angleRad * 180) / Math.PI;
            const normalizedAngle = ((angleDeg % 360) + 360) % 360;
            scrubRef.current.target = normalizedAngle / 360;
          }

          // Frame-rate independent exponential decay smoothing (decay = 14s⁻¹)
          // Produces buttery smooth interpolation across 60Hz, 120Hz, and 144Hz monitors
          const smoothingFactor = 1 - Math.exp(-14 * dt);
          scrubRef.current.current = lerpWrapped(
            scrubRef.current.current,
            scrubRef.current.target,
            smoothingFactor
          );

          const desiredTime = scrubRef.current.current * videoDuration;
          const timeDiff = Math.abs(desiredTime - video.currentTime);

          // Non-blocking hardware decoder seek with fallback timeout
          const isSeekTimedOut = now - scrubRef.current.lastSeekTimestamp > 60;
          if (timeDiff > 0.016 && (!isSeekingRef.current || isSeekTimedOut)) {
            isSeekingRef.current = true;
            scrubRef.current.lastSeekTimestamp = now;

            // Use fastSeek for hardware-accelerated instant scrub when supported
            if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
              (video as any).fastSeek(desiredTime);
            } else {
              video.currentTime = desiredTime;
            }
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isHeroActive, videoReady, videoDuration, rawRotateX, rawRotateY, rawRotateZ]);

  // Video lifecycle handlers
  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setVideoDuration(video.duration || 0);
    video.pause();
    video.currentTime = 0;
  }, []);

  const handleCanPlay = useCallback(() => {
    setVideoReady(true);
  }, []);

  const handleVideoError = useCallback(() => {
    // Seamless fallback to 5-directional PNG character
    setVideoReady(false);
  }, []);

  const handleSeeked = useCallback(() => {
    isSeekingRef.current = false;
  }, []);

  const sizeStyles = {
    hero: 'w-[290px] sm:w-[350px] md:w-[410px] lg:w-[450px] xl:w-[490px] aspect-[682/1024] max-h-[85vh]',
    contact: 'w-[200px] sm:w-[240px] md:w-[280px] aspect-[682/1024]',
    mini: 'w-[120px] sm:w-[150px] aspect-[682/1024]',
  };

  const directionalPoses: CharacterPose[] = ['left', 'right', 'up', 'down'];

  return (
    <div
      ref={containerRef}
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

      {/* 3. Character Container: Body strictly stable on floor, head pivots from neck */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center pointer-events-auto"
        style={{
          rotateX: headRotateX,
          rotateY: headRotateY,
          rotateZ: headRotateZ,
          transformOrigin: '50% 24%', // Pivots at the neck/head so feet stay 100% planted
          transformStyle: 'preserve-3d',
        }}
      >
        {/* --- LAYER A: Interactive Video Scrub (Active when video is loaded) --- */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          autoPlay={false}
          loop={false}
          controls={false}
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={handleCanPlay}
          onSeeked={handleSeeked}
          onError={handleVideoError}
          className={`absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] z-20 pointer-events-none transition-opacity duration-500 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={VIDEO_SRC_WEBM} type="video/webm" />
          <source src={VIDEO_SRC_MP4} type="video/mp4" />
        </video>

        {/* --- LAYER B: High-Res Base Layer (Center pose is ALWAYS fully opaque at z-0) --- */}
        <img
          src={POSE_IMAGES.center}
          alt="Sagar Kaushik — Neutral pose"
          draggable={false}
          loading="eager"
          className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] z-0 pointer-events-none"
        />

        {/* --- LAYER C: Directional Image Overlays (Active when video is not present) --- */}
        {!videoReady &&
          directionalPoses.map((pose) => {
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

      {/* 4. Subtle Studio Floor Reflection */}
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

export default InteractiveCharacter;
