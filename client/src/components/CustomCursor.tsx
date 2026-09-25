import React, { useEffect, useState, useRef } from 'react';
import { useResponsive } from '../hooks/useResponsive';
import { useDevicePerformance } from '../hooks/useDevicePerformance';

export const CustomCursor: React.FC = () => {
  const { isDesktop, hasTouch } = useResponsive();
  const { prefersReducedMotion } = useDevicePerformance();

  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view' | 'interact'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouseX = useRef(-100);
  const mouseY = useRef(-100);
  const ringX = useRef(-100);
  const ringY = useRef(-100);
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    // Disable completely on mobile, tablet, touch devices, or if reduced motion is preferred
    if (!isDesktop || hasTouch || prefersReducedMotion) {
      return;
    }

    const onPointerMove = (e: PointerEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]');
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor');
        if (type === 'view') setCursorType('view');
        else if (type === 'interact') setCursorType('interact');
        else if (type === 'pointer') setCursorType('pointer');
        else setCursorType('pointer');
      } else if (
        target.closest('button') ||
        target.closest('a') ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.getAttribute('role') === 'button'
      ) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const onPointerLeave = () => {
      setIsVisible(false);
    };

    const onPointerEnter = () => {
      setIsVisible(true);
    };

    // Smooth physics loop for ring follower
    const render = () => {
      const lerp = 0.18;
      ringX.current += (mouseX.current - ringX.current) * lerp;
      ringY.current += (mouseY.current - ringY.current) * lerp;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX.current}px, ${mouseY.current}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX.current}px, ${ringY.current}px, 0)`;
      }

      animFrame.current = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('pointerenter', onPointerEnter);

    animFrame.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('pointerenter', onPointerEnter);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [isDesktop, hasTouch, prefersReducedMotion, isVisible]);

  if (!isDesktop || hasTouch || prefersReducedMotion) {
    return null;
  }

  const isTextBadge = cursorType === 'view' || cursorType === 'interact';

  return (
    <>
      {/* Central crisp dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isTextBadge ? 'opacity-0' : 'bg-white'}`}
      />

      {/* Trailing interactive ring / capsule */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          cursorType === 'default'
            ? 'w-8 h-8 rounded-full border border-white/25 bg-white/[0.02]'
            : cursorType === 'pointer'
            ? 'w-12 h-12 rounded-full border border-white/40 bg-white/[0.08] backdrop-blur-[2px]'
            : cursorType === 'view'
            ? 'w-16 h-16 rounded-full border border-white/40 bg-white/10 backdrop-blur-md shadow-glow-silver'
            : 'w-20 h-20 rounded-full border border-blue-400/50 bg-blue-500/10 backdrop-blur-md shadow-glow-subtle'
        }`}
      >
        {cursorType === 'view' && (
          <span className="text-[10px] font-mono tracking-widest text-white uppercase font-medium">
            VIEW
          </span>
        )}
        {cursorType === 'interact' && (
          <span className="text-[9px] font-mono tracking-widest text-blue-200 uppercase font-semibold">
            INTERACT
          </span>
        )}
      </div>
    </>
  );
};
