import { useState, useEffect, useRef } from 'react';

export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
  isInsideHero: boolean;
}

export function useMousePosition(heroRef?: React.RefObject<HTMLElement | null>) {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    isInsideHero: false,
  });

  const posRef = useRef<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    isInsideHero: false,
  });

  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;
      const innerW = window.innerWidth || 1;
      const innerH = window.innerHeight || 1;

      let isInside = true;
      if (heroRef?.current) {
        const rect = heroRef.current.getBoundingClientRect();
        isInside =
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom;
      }

      posRef.current = {
        x: clientX,
        y: clientY,
        normalizedX: (clientX / innerW) * 2 - 1,
        normalizedY: (clientY / innerH) * 2 - 1,
        isInsideHero: isInside,
      };

      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(() => {
          setPosition(posRef.current);
          frameRef.current = null;
        });
      }
    };

    const handlePointerLeave = () => {
      posRef.current = {
        ...posRef.current,
        isInsideHero: false,
      };
      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(() => {
          setPosition(posRef.current);
          frameRef.current = null;
        });
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [heroRef]);

  return { position, posRef };
}
