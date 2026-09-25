import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2, ArrowRight, ShieldCheck, Layers, Eye } from 'lucide-react';
import { metaCladsCaseStudy } from '../data/clientWork';
import { GlassCard } from './GlassCard';
import { MagneticButton } from './MagneticButton';

export const MetaCladsCaseStudy: React.FC = () => {
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);

  return (
    <div className="w-full space-y-16">
      {/* Top Banner / Client Project Classification */}
      <GlassCard intensity={3} className="p-8 sm:p-12 border-white/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Hero Client Meta (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 font-mono text-[11px] tracking-widest uppercase">
                {metaCladsCaseStudy.classification}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-400 font-mono text-[11px] tracking-widest uppercase">
                {metaCladsCaseStudy.projectType}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight uppercase">
                {metaCladsCaseStudy.clientName}
              </h3>
              <p className="text-sm sm:text-base font-mono text-neutral-400">
                ROLE: <span className="text-white font-normal">{metaCladsCaseStudy.role}</span>
              </p>
            </div>

            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              {metaCladsCaseStudy.summary}
            </p>

            {/* Live Website Action Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <MagneticButton
                href={metaCladsCaseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                cursorLabel="pointer"
                className="gap-2 shadow-glow-silver"
              >
                <span>VIEW LIVE WEBSITE</span>
                <ExternalLink className="w-4 h-4 text-black" />
              </MagneticButton>

              <span className="text-xs font-mono text-neutral-500">
                OPENS HTTPS://METACLADS.COM/ IN NEW TAB
              </span>
            </div>
          </div>

          {/* Right Column: Key Contribution Breakdown (5 cols) */}
          <div className="lg:col-span-5 space-y-4 rounded-2xl bg-white/[0.02] border border-white/10 p-6">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-xs font-mono text-neutral-300 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>KEY DELIVERABLES &amp; CONTRIBUTIONS</span>
            </div>

            <div className="space-y-3">
              {metaCladsCaseStudy.contributions.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs text-neutral-300 font-light leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Technologies */}
            <div className="pt-3 border-t border-white/10">
              <span className="font-mono text-[10px] text-neutral-500 uppercase block mb-2">
                TECHNOLOGY STACK
              </span>
              <div className="flex flex-wrap gap-1.5">
                {metaCladsCaseStudy.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] text-neutral-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* METACLADS VISUAL GALLERY */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
              VISUAL SHOWCASE
            </span>
            <h4 className="text-2xl sm:text-3xl font-display font-light text-white">
              Architectural &amp; Façade Systems Gallery
            </h4>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            CLICK ANY ASSET TO EXPAND
          </span>
        </div>

        {/* Featured Big Visual Viewport */}
        <div
          className="relative w-full h-80 sm:h-96 md:h-[460px] rounded-3xl overflow-hidden border border-white/20 bg-neutral-950 group"
          data-cursor="view"
        >
          <motion.img
            key={selectedGalleryIdx}
            src={metaCladsCaseStudy.gallery[selectedGalleryIdx].image}
            alt={metaCladsCaseStudy.gallery[selectedGalleryIdx].title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 sm:p-10 flex flex-col justify-end">
            <span className="inline-block w-fit px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-mono text-[11px] text-blue-200 uppercase mb-2">
              {metaCladsCaseStudy.gallery[selectedGalleryIdx].tag}
            </span>
            <h3 className="text-xl sm:text-3xl font-display font-medium text-white">
              {metaCladsCaseStudy.gallery[selectedGalleryIdx].title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1 max-w-xl">
              {metaCladsCaseStudy.gallery[selectedGalleryIdx].subtitle}
            </p>
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {metaCladsCaseStudy.gallery.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedGalleryIdx(idx)}
              className={`relative h-24 sm:h-28 rounded-2xl overflow-hidden border transition-all text-left group ${
                selectedGalleryIdx === idx
                  ? 'border-blue-400 ring-2 ring-blue-400/30'
                  : 'border-white/10 hover:border-white/30 opacity-60 hover:opacity-100'
              }`}
              data-cursor="pointer"
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-end p-2">
                <span className="text-[10px] font-mono text-white truncate font-medium">
                  {item.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* METACLADS CASE STUDY STORY (CLIENT -> REQUIREMENTS -> DESIGN -> DEVELOPMENT -> RESPONSIVE -> DEPLOYMENT) */}
      <div className="space-y-8 pt-4">
        <div className="space-y-1">
          <span className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
            EXECUTION PIPELINE
          </span>
          <h4 className="text-2xl sm:text-3xl font-display font-light text-white">
            Client Delivery Lifecycle
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 relative">
          {metaCladsCaseStudy.processSteps.map((step, idx) => (
            <div
              key={step.number}
              className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-blue-400 font-semibold">
                    {step.number}
                  </span>
                  {idx < metaCladsCaseStudy.processSteps.length - 1 && (
                    <ArrowRight className="hidden xl:block w-3.5 h-3.5 text-neutral-600 -mr-2" />
                  )}
                </div>
                <h5 className="font-display font-medium text-xs text-white uppercase tracking-wider">
                  {step.stage}
                </h5>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                  {step.detail}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-neutral-600">
                <span>STAGE VERIFIED</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
