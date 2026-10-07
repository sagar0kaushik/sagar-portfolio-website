import React, { useEffect, useState, useRef } from 'react';
import { useResponsive } from '../hooks/useResponsive';
import { useDevicePerformance } from '../hooks/useDevicePerformance';

/**
 * CustomCursor:
 * Desktop fluid cursor featuring:
 * - Crisp central tracking dot
 * - Trailing spring physics glass ring follower
 * - Smoothly blooms into a high-end glassy circle with text in the middle
 *   when hovering interactive items, buttons, links, projects, and cards
 */
export const CustomCursor: React.FC = () => {
  const { isDesktop, hasTouch } = useResponsive();
  const { prefersReducedMotion } = useDevicePerformance();

  const [cursorType, setCursorType] = useState<'default' | 'badge'>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  const ringRef = useRef<HTMLDivElement>(null);

  const mouseX = useRef(-100);
  const mouseY = useRef(-100);
  const ringX = useRef(-100);
  const ringY = useRef(-100);
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    // Only active on desktop pointer devices
    if (!isDesktop || hasTouch || prefersReducedMotion) {
      return;
    }

    const onPointerMove = (e: PointerEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Check explicit data-cursor or data-cursor-text
      const cursorTarget = target.closest('[data-cursor], [data-cursor-text]');
      if (cursorTarget) {
        const customText = cursorTarget.getAttribute('data-cursor-text');
        if (customText) {
          setCursorText(customText.toUpperCase());
          setCursorType('badge');
          return;
        }

        const type = cursorTarget.getAttribute('data-cursor');
        if (type === 'view') {
          setCursorText('VIEW');
          setCursorType('badge');
          return;
        } else if (type === 'interact') {
          setCursorText('INTERACT');
          setCursorType('badge');
          return;
        } else if (type === 'pointer') {
          const text = cursorTarget.textContent?.trim() || '';
          if (text.includes('WORK') || text.includes('PROJECT')) {
            setCursorText('VIEW');
          } else if (text.includes('RESUME')) {
            setCursorText('RESUME');
          } else {
            setCursorText('EXPLORE');
          }
          setCursorType('badge');
          return;
        }
      }

      // 2. Check project cards or work links
      if (
        target.closest('[data-project]') ||
        target.closest('#work a') ||
        target.closest('#work button') ||
        target.closest('#client-work a')
      ) {
        setCursorText('VIEW');
        setCursorType('badge');
        return;
      }

      // 3. Check general buttons and links
      const btn = target.closest('button, a, [role="button"]');
      if (btn) {
        const text = btn.textContent?.trim() || '';
        if (text.includes('VIEW') || text.includes('WORK')) {
          setCursorText('VIEW');
        } else if (text.includes('RESUME')) {
          setCursorText('RESUME');
        } else if (text.length > 0 && text.length <= 8) {
          setCursorText(text.toUpperCase());
        } else {
          setCursorText('CLICK');
        }
        setCursorType('badge');
        return;
      }

      // 4. Default state
      setCursorType('default');
      setCursorText('');
    };

    const onPointerLeave = () => setIsVisible(false);
    const onPointerEnter = () => setIsVisible(true);

    // Spring physics render loop
    const lerp = 0.16;
    const render = () => {
      ringX.current += (mouseX.current - ringX.current) * lerp;
      ringY.current += (mouseY.current - ringY.current) * lerp;

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

  const isBadge = cursorType === 'badge' && cursorText.length > 0;

  return (
    <>
      {/* Trailing follower: blooms into glassy circle with text in middle */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-out select-none ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isBadge
            ? 'w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/40 bg-white/10 backdrop-blur-md shadow-[0_0_24px_rgba(255,255,255,0.18)]'
            : 'w-8 h-8 rounded-full border border-white/25 bg-white/[0.02] backdrop-blur-[1px]'
        }`}
      >
        {isBadge && (
          <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-white uppercase font-semibold text-center px-1 drop-shadow-sm">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};
