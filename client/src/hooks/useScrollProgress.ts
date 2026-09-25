import { useState, useEffect } from 'react';

export interface ScrollProgressState {
  progress: number;
  scrollY: number;
  direction: 'up' | 'down' | 'none';
  isScrolled: boolean;
}

export function useScrollProgress() {
  const [scrollState, setScrollState] = useState<ScrollProgressState>({
    progress: 0,
    scrollY: 0,
    direction: 'none',
    isScrolled: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? Math.min(1, Math.max(0, currentScrollY / totalScroll)) : 0;
      const direction = currentScrollY > lastScrollY ? 'down' : currentScrollY < lastScrollY ? 'up' : 'none';

      setScrollState({
        progress,
        scrollY: currentScrollY,
        direction,
        isScrolled: currentScrollY > 40,
      });

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollState;
}
