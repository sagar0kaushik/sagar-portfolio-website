import React from 'react';
import { MetaCladsCaseStudy } from './MetaCladsCaseStudy';

export const ClientWork: React.FC = () => {
  return (
    <section
      id="client-work"
      className="relative py-28 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#080808]/80 border-y border-white/10 overflow-hidden"
    >
      {/* Visual differentiation background glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-blue-700/[0.04] rounded-full blur-[170px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-blue-400 uppercase">
            <span>05</span>
            <span className="w-8 h-[1px] bg-blue-500/40" />
            <span>COMMERCIAL &bull; FREELANCE COMMISSION</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-light text-white tracking-tight uppercase">
            CLIENT <span className="text-neutral-500 font-extralight">WORK</span>
          </h2>
          <p className="text-sm font-mono text-neutral-400 max-w-xl">
            SELECTED FREELANCE WORK // PRODUCTION WEB ENGINEERING FOR ENTERPRISE &amp; COMMERCIAL BRANDS
          </p>
        </div>

        {/* Featured Case Study: MetaClads */}
        <MetaCladsCaseStudy />
      </div>
    </section>
  );
};
