import React, { useRef, useEffect } from 'react';

/**
 * =========================================================================
 * HERO CHARACTER COMPONENT
 * Authentic 3D Sagar Character Bust with 360° conjugate binocular eye tracking.
 * - 100% static head, hair, neck, hoodie, and shoulders (zero body wobble)
 * - Natural 360° eye gaze tracking cursor position
 * - Frame-rate independent exponential smoothing (60-144 FPS)
 * - Auto-centering when cursor leaves viewport
 * =========================================================================
 */

export const HERO_CHAR_CONFIG = {
  // Eye travel limits in 1024x947 SVG coordinate space
  EYE_MAX_X: 6.0,
  EYE_MAX_Y: 3.8,
  EYE_SMOOTHING: 16.0, // Responsive, organic exponential decay speed
  VIEWPORT_LEAVE_DELAY: 400, // ms to hold gaze before returning to neutral center
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export const HeroCharacter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftIrisRef = useRef<SVGGElement>(null);
  const rightIrisRef = useRef<SVGGElement>(null);

  // High-frequency pointer tracking (viewport coordinates)
  const pointerRef = useRef({
    x: 0,
    y: 0,
    insideWindow: false,
    leaveTime: 0,
    isTouch: false,
  });

  // Animation state
  const stateRef = useRef({
    eyeX: 0,
    eyeY: 0,
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

      let targetNormX = 0;
      let targetNormY = 0;

      const isCursorActive =
        pointer.insideWindow &&
        !pointer.isTouch &&
        container;

      if (isCursorActive && container) {
        const rect = container.getBoundingClientRect();
        // Exact eye position in container: centered at 50.9% width, 44.2% height
        const eyeAnchorX = rect.left + rect.width * 0.509;
        const eyeAnchorY = rect.top + rect.height * 0.442;

        const dx = pointer.x - eyeAnchorX;
        const dy = pointer.y - eyeAnchorY;

        const maxDistX = Math.max(window.innerWidth * 0.45, 300);
        const maxDistY = Math.max(window.innerHeight * 0.42, 250);

        let normX = clamp(dx / maxDistX, -1, 1);
        let normY = clamp(dy / maxDistY, -1, 1);

        // Elliptical boundary constraint so irises stay strictly within sockets
        const distNorm = Math.hypot(normX, normY);
        if (distNorm > 1.0) {
          normX /= distNorm;
          normY /= distNorm;
        }

        targetNormX = normX;
        targetNormY = normY;
      } else if (!pointer.insideWindow && pointer.leaveTime > 0) {
        const timeSinceLeave = now - pointer.leaveTime;
        if (timeSinceLeave < HERO_CHAR_CONFIG.VIEWPORT_LEAVE_DELAY) {
          targetNormX = state.eyeX / HERO_CHAR_CONFIG.EYE_MAX_X;
          targetNormY = state.eyeY / HERO_CHAR_CONFIG.EYE_MAX_Y;
        } else {
          targetNormX = 0;
          targetNormY = 0;
        }
      }

      const targetEyeX = targetNormX * HERO_CHAR_CONFIG.EYE_MAX_X;
      const targetEyeY = targetNormY * HERO_CHAR_CONFIG.EYE_MAX_Y;

      const eyeFactor = 1 - Math.exp(-HERO_CHAR_CONFIG.EYE_SMOOTHING * dt);
      state.eyeX += (targetEyeX - state.eyeX) * eyeFactor;
      state.eyeY += (targetEyeY - state.eyeY) * eyeFactor;

      // Direct DOM updates for maximum performance
      if (leftIrisRef.current && rightIrisRef.current) {
        const transformStr = `translate(${state.eyeX.toFixed(2)}, ${state.eyeY.toFixed(2)})`;
        leftIrisRef.current.setAttribute('transform', transformStr);
        rightIrisRef.current.setAttribute('transform', transformStr);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-end justify-center select-none pointer-events-none"
    >
      <svg
        viewBox="0 0 1024 947"
        className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        preserveAspectRatio="xMidYMax meet"
      >
        {/* Layer 1: Base Character with Sclera & Golden Glow */}
        <image
          href="/assets/character/sagar-bust-base.png"
          x="0"
          y="0"
          width="1024"
          height="947"
        />

        {/* Layer 2: Moving Irises with conjugate 360° tracking */}
        <g ref={leftIrisRef}>
          <image
            href="/assets/character/sagar-iris-left.png"
            x="427"
            y="395"
            width="52"
            height="52"
          />
        </g>
        <g ref={rightIrisRef}>
          <image
            href="/assets/character/sagar-iris-right.png"
            x="564"
            y="391"
            width="52"
            height="52"
          />
        </g>

        {/* Layer 3: Eyelids & Eyelash Rim Overlay */}
        <image
          href="/assets/character/sagar-eyelids-overlay.png"
          x="0"
          y="0"
          width="1024"
          height="947"
        />
      </svg>
    </div>
  );
};
