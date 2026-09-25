import React from 'react';
import { projectsData } from '../data/projects';
import { ProjectCard } from './ProjectCard';

export const Projects: React.FC = () => {
  return (
    <section id="work" className="relative py-28 px-4 sm:px-6 md:px-12 lg:px-16">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-neutral-400 uppercase">
              <span>04</span>
              <span className="w-8 h-[1px] bg-neutral-600" />
              <span>ENGINEERED PRODUCTS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-light text-white tracking-tight uppercase">
              SELECTED <span className="text-neutral-500 font-extralight">WORK</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-neutral-400 max-w-xs md:text-right">
            Curated selection of full-stack platforms, cloud architectures, and vector AI engines.
          </p>
        </div>

        {/* Sticky Stacking Project Cards Container */}
        <div className="relative pt-6">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={projectsData.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
