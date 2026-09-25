import { useState, useEffect } from 'react';

export interface PerformanceMode {
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
  maxParticles: number;
  useHeavyBlur: boolean;
  useShadows: boolean;
  animationDamping: number;
}

export function useDevicePerformance(): PerformanceMode {
  const [mode, setMode] = useState<PerformanceMode>(() => {
    if (typeof window === 'undefined') {
      return {
        isLowEnd: false,
        prefersReducedMotion: false,
        maxParticles: 50,
        useHeavyBlur: true,
        useShadows: true,
        animationDamping: 1,
      };
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cores = navigator.hardwareConcurrency || 4;
    // Check device memory if supported
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 8;
    const isLow = cores <= 2 || memory <= 2;

    return {
      isLowEnd: isLow,
      prefersReducedMotion: reducedMotion,
      maxParticles: reducedMotion ? 0 : isLow ? 15 : 45,
      useHeavyBlur: !isLow && !reducedMotion,
      useShadows: !isLow,
      animationDamping: reducedMotion ? 0 : isLow ? 0.6 : 1,
    };
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setMode((prev) => ({
        ...prev,
        prefersReducedMotion: e.matches,
        maxParticles: e.matches ? 0 : prev.isLowEnd ? 15 : 45,
        useHeavyBlur: !prev.isLowEnd && !e.matches,
      }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return mode;
}
