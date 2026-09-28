import React, { useRef, useEffect } from 'react';

/**
 * =========================================================================
 * CHARACTER PROP ARCHITECTURE
 * Clean separation of concerns:
 * 1. Static Character Body (Layer 1) - Authentic master character, zero motion
 * 2. Moving Eye Region (Layer 2 & 3) - SVG irises & eyelashes rim overlay
 * 3. Eye Blink System (Layer 4)     - Natural eyelid blink transition
 * 4. Cursor Tracking System          - 360° conjugate binocular tracking, 0% head/neck/body
 * 5. Ground Contact Shadow           - Separate soft gray blurred ellipse under shoes
 * =========================================================================
 */

export const PROP_CONFIG = {
  // Eye Movement Travel Limits in 603x1024 coordinate space
  // Horizontal: ±16% of eye socket (~5.5px)
  // Vertical:   ±14% of eye socket (~3.6px)
  EYE_MAX_X: 5.5,
  EYE_MAX_Y: 3.6,
  EYE_SMOOTHING: 16.0,       // Exponential decay speed (s⁻¹) for responsive, organic movement

  // Gaze Holding & Idle Return
  VIEWPORT_LEAVE_DELAY: 450, // ms to hold gaze before returning to neutral center

  // Natural Blinking Schedule
  BLINK_MIN_INTERVAL: 3000,  // ms (3.0s)
  BLINK_MAX_INTERVAL: 6500,  // ms (6.5s)
  BLINK_DURATION: 140,       // ms (standard natural blink)
  DOUBLE_BLINK_CHANCE: 0.15, // 15% probability of natural double-blink

  // Ground Contact Shadow (100% Static CSS)
  GROUND_SHADOW_WIDTH: 0.72, // 72% of character width
  GROUND_SHADOW_HEIGHT: 16,  // px
  GROUND_SHADOW_OPACITY: 0.24,
  GROUND_SHADOW_BLUR: 26,    // px
};

export interface CharacterPropProps {
  className?: string;
  variant?: 'hero' | 'contact' | 'mini';
  isTrackingActive?: boolean;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export const CharacterProp: React.FC<CharacterPropProps> = ({
  className = '',
  variant = 'hero',
  isTrackingActive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<SVGGElement>(null);
  const rightPupilRef = useRef<SVGGElement>(null);
  const eyelidsRef = useRef<HTMLImageElement>(null);

  // High-frequency pointer tracking (viewport coordinates)
  const pointerRef = useRef({
    x: 0,
    y: 0,
    insideWindow: false,
    leaveTime: 0,
    isTouch: false,
  });

  // Physics animation state
  const stateRef = useRef({
    eyeX: 0,
    eyeY: 0,
    // Blink controller
    isBlinking: false,
    blinkStartTime: 0,
    blinkDuration: PROP_CONFIG.BLINK_DURATION,
    nextBlinkTime: performance.now() + 3200,
    isDoubleBlinkPending: false,
    doubleBlinkTime: 0,
  });

  // Track pointer across window
  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    pointerRef.current.isTouch = isCoarse;

    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      if (pointerRef.current.isTouch && (e as PointerEvent).pointerType === 'touch') {
        return;
      }
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
      pointerRef.current.insideWindow = true;
    };

    const handlePointerLeave = () => {
      pointerRef.current.insideWindow = false;
      pointerRef.current.leaveTime = performance.now();
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

  // 60-144 FPS Animation Loop via requestAnimationFrame
  useEffect(() => {
    let rafId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = clamp((now - lastTime) / 1000, 0.001, 0.1);
      lastTime = now;

      const container = containerRef.current;
      const state = stateRef.current;
      const pointer = pointerRef.current;

      // ---------------------------------------------------------------
      // 1. BLINK CONTROLLER (Natural randomized intervals)
      // ---------------------------------------------------------------
      if (!state.isBlinking && now >= state.nextBlinkTime) {
        state.isBlinking = true;
        state.blinkStartTime = now;
        state.blinkDuration = PROP_CONFIG.BLINK_DURATION;

        const nextInterval =
          PROP_CONFIG.BLINK_MIN_INTERVAL +
          Math.random() * (PROP_CONFIG.BLINK_MAX_INTERVAL - PROP_CONFIG.BLINK_MIN_INTERVAL);

        if (Math.random() < PROP_CONFIG.DOUBLE_BLINK_CHANCE) {
          state.isDoubleBlinkPending = true;
          state.doubleBlinkTime = now + PROP_CONFIG.BLINK_DURATION + 130;
        } else {
          state.nextBlinkTime = now + nextInterval;
        }
      }

      if (!state.isBlinking && state.isDoubleBlinkPending && now >= state.doubleBlinkTime) {
        state.isBlinking = true;
        state.blinkStartTime = now;
        state.blinkDuration = PROP_CONFIG.BLINK_DURATION * 0.85;
        state.isDoubleBlinkPending = false;
        state.nextBlinkTime =
          now +
          PROP_CONFIG.BLINK_MIN_INTERVAL +
          Math.random() * (PROP_CONFIG.BLINK_MAX_INTERVAL - PROP_CONFIG.BLINK_MIN_INTERVAL);
      }

      let blinkOpacity = 0;
      if (state.isBlinking) {
        const elapsed = now - state.blinkStartTime;
        const progress = elapsed / state.blinkDuration;
        if (progress >= 1.0) {
          state.isBlinking = false;
          blinkOpacity = 0;
        } else {
          blinkOpacity = Math.sin(progress * Math.PI);
        }
      }

      if (eyelidsRef.current) {
        eyelidsRef.current.style.opacity = blinkOpacity.toFixed(3);
      }

      // ---------------------------------------------------------------
      // 2. 360° DIRECTIONAL EYE TRACKING
      // Full 360° range: UP, DOWN, LEFT, RIGHT, and all diagonals
      // Zero head, neck, body, or foot movement
      // ---------------------------------------------------------------
      let targetNormX = 0;
      let targetNormY = 0;

      const isCursorActive =
        isTrackingActive &&
        pointer.insideWindow &&
        !pointer.isTouch &&
        container;

      if (isCursorActive && container) {
        const rect = container.getBoundingClientRect();
        // Exact eye height anchor: center of eyes is at 50% width, 17% height
        const faceX = rect.left + rect.width * 0.5;
        const faceY = rect.top + rect.height * 0.17;

        const dx = pointer.x - faceX;
        const dy = pointer.y - faceY;

        // Balanced horizontal and vertical normalization spans
        const maxDistX = Math.max(window.innerWidth * 0.45, 300);
        const maxDistY = Math.max(window.innerHeight * 0.40, 250);

        let normX = clamp(dx / maxDistX, -1, 1);
        let normY = clamp(dy / maxDistY, -1, 1);

        // Tablet scale reduction (responsive requirement 19)
        if (window.innerWidth < 1024 && window.innerWidth >= 768) {
          normX *= 0.85;
          normY *= 0.85;
        }

        // Elliptical boundary constraint so irises stay strictly within sockets
        const distNorm = Math.hypot(normX, normY);
        if (distNorm > 1.0) {
          normX /= distNorm;
          normY /= distNorm;
        }

        targetNormX = normX;
        targetNormY = normY;
      } else if (!pointer.insideWindow && pointer.leaveTime > 0) {
        // Hold gaze briefly when cursor leaves window, then smoothly return to neutral
        const timeSinceLeave = now - pointer.leaveTime;
        if (timeSinceLeave < PROP_CONFIG.VIEWPORT_LEAVE_DELAY) {
          targetNormX = state.eyeX / PROP_CONFIG.EYE_MAX_X;
          targetNormY = state.eyeY / PROP_CONFIG.EYE_MAX_Y;
        } else {
          targetNormX = 0;
          targetNormY = 0;
        }
      }

      // Smooth target interpolation
      const targetEyeX = targetNormX * PROP_CONFIG.EYE_MAX_X;
      const targetEyeY = targetNormY * PROP_CONFIG.EYE_MAX_Y;

      const eyeFactor = 1 - Math.exp(-PROP_CONFIG.EYE_SMOOTHING * dt);
      state.eyeX += (targetEyeX - state.eyeX) * eyeFactor;
      state.eyeY += (targetEyeY - state.eyeY) * eyeFactor;

      // Direct DOM updates for 60-144 FPS performance without React re-renders
      if (leftPupilRef.current && rightPupilRef.current) {
        const eyeTransform = `translate(${state.eyeX.toFixed(2)}, ${state.eyeY.toFixed(2)})`;
        leftPupilRef.current.setAttribute('transform', eyeTransform);
        rightPupilRef.current.setAttribute('transform', eyeTransform);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isTrackingActive]);

  // Proportional sizing matching exact 603/1024 aspect ratio
  const sizeStyles = {
    hero: 'w-[280px] sm:w-[330px] md:w-[380px] lg:w-[410px] xl:w-[450px] aspect-[603/1024] max-h-[82vh]',
    contact: 'w-[200px] sm:w-[240px] md:w-[280px] aspect-[603/1024]',
    mini: 'w-[120px] sm:w-[150px] aspect-[603/1024]',
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none pointer-events-auto ${sizeStyles[variant]} ${className}`}
    >
      {/* ========================================================
          1. GROUND CONTACT SHADOW (Separate Pure CSS, 100% Static)
          - Pinned directly beneath shoes
          - Soft gray diffused ellipse with zero bounding box
          - Never moves, slides, or scales with cursor
          ======================================================== */}
      <div
        className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-[100%] pointer-events-none"
        style={{
          width: `${PROP_CONFIG.GROUND_SHADOW_WIDTH * 100}%`,
          height: `${PROP_CONFIG.GROUND_SHADOW_HEIGHT}px`,
          backgroundColor: `rgba(20, 20, 20, ${PROP_CONFIG.GROUND_SHADOW_OPACITY})`,
          filter: `blur(${PROP_CONFIG.GROUND_SHADOW_BLUR}px)`,
          boxShadow: `0 4px 24px 6px rgba(0, 0, 0, ${PROP_CONFIG.GROUND_SHADOW_OPACITY * 1.1})`,
        }}
        aria-hidden="true"
      />

      {/* ========================================================
          2. LAYER 1: STATIC BASE CHARACTER WITH SCLERA
          - Authentic character from original image
          - Defringed alpha edges, zero black background, zero halos
          - Seamless 3D sclera in eye sockets
          - 100% static: head, neck, body, and feet never move
          ======================================================== */}
      <img
        src="/assets/character/character-static-base.png"
        alt="Sagar Kaushik — Interactive Character Prop"
        draggable={false}
        loading="eager"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-10"
      />

      {/* ========================================================
          3. LAYER 2: INTERACTIVE MOVING IRISES (PUPILS)
          - Extracted directly from original character image
          - Conjugate binocular tracking in full 360° range
          - Smooth SVG coordinate space 603x1024
          ======================================================== */}
      <svg
        viewBox="0 0 603 1024"
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-20 overflow-visible"
        aria-hidden="true"
      >
        {/* Left Iris (Viewer's Left, Character's Right Eye) */}
        <g ref={leftPupilRef} transform="translate(0, 0)">
          <image
            href="/assets/character/iris-left.png"
            x="248.1"
            y="155.9"
            width="36"
            height="36"
          />
        </g>

        {/* Right Iris (Viewer's Right, Character's Left Eye) */}
        <g ref={rightPupilRef} transform="translate(0, 0)">
          <image
            href="/assets/character/iris-right.png"
            x="320.0"
            y="157.0"
            width="36"
            height="36"
          />
        </g>
      </svg>

      {/* ========================================================
          4. LAYER 3: EYELASHES & EYELID RIM OVERLAY (100% Static)
          - Authentic eyelashes, socket framing, and eyelid creases
          - Precise cutouts allow moving irises to naturally slide
            under upper eyelashes when looking up or sideways
          - 100% transparent border with zero black box
          ======================================================== */}
      <img
        src="/assets/character/eyelids-rim-overlay.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        loading="eager"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-30"
      />

      {/* ========================================================
          5. LAYER 4: NATURAL BLINK OVERLAY
          - Closed eyelid skin sampled directly from character face
          - Seamless coverage of eye opening with natural closed lash line
          - Opacity modulated via requestAnimationFrame loop
          ======================================================== */}
      <img
        ref={eyelidsRef}
        src="/assets/character/eyelids-blink.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-40 opacity-0"
        style={{ willChange: 'opacity' }}
      />
    </div>
  );
};

export default CharacterProp;
