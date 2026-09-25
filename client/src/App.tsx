import React, { useState, Suspense, lazy } from 'react';
import { Loader } from './components/Loader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { ClientWork } from './components/ClientWork';
import { Process } from './components/Process';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useLenisSmoothScroll } from './hooks/useLenisSmoothScroll';

// Dynamic code splitting for Three.js 3D cosmos background
const Background3D = lazy(() =>
  import('./components/Background3D').then((m) => ({ default: m.Background3D }))
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useLenisSmoothScroll();

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] digital-grid-bg selection:bg-blue-500/30 selection:text-white">
      {/* 01. Cinematic Minimal Loading Screen */}
      <Loader onLoadingComplete={() => setIsLoading(false)} />

      {/* Desktop Fluid Custom Cursor */}
      <CustomCursor />

      {/* Three.js / React Three Fiber Subtle 3D Cosmos Background with lazy chunk loading */}
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>

      {/* 02. Floating Glassmorphic Sticky Navbar */}
      <Navbar />

      {/* Main Website Experience */}
      <main className="relative z-10 w-full flex flex-col">
        {/* 03. Hero Section with Interactive Character & Clamp Typography */}
        <Hero />

        {/* 04. Dual-Row Scroll-Driven Project Marquee */}
        <Marquee />

        {/* 05. About Me with Word-Reveal Animation & Verified Background */}
        <About />

        {/* 06. Tech Stack with 3D Tilt Skill Cards & Category Filter */}
        <Skills />

        {/* 07. Experience with Progressively Illuminating Vertical Timeline */}
        <Experience />

        {/* 08. Selected Work with Sticky Stacking 3D Project Cards */}
        <Projects />

        {/* 09. Client / Freelance Work — MetaClads Architectural Showcase & Case Study */}
        <ClientWork />

        {/* 10. Development Process (How I Build: 01 to 05) */}
        <Process />

        {/* 12. Contact (Let's Build Something & Final Character Scene) */}
        <Contact />
      </main>

      {/* 13. Minimal Footer */}
      <Footer />
    </div>
  );
}
