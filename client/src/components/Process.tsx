import React from 'react';
import { GlassCard } from './GlassCard';
import { Search, Compass, Code2, Network, Rocket } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'UNDERSTAND',
      subtitle: 'DISCOVERY & ARCHITECTURE',
      description: 'Analyze system requirements, target personas, constraints, and business goals to chart the optimal technical path.',
      icon: <Search className="w-5 h-5 text-blue-400" />,
    },
    {
      number: '02',
      title: 'DESIGN',
      subtitle: 'UI/UX & INTERACTION DESIGN',
      description: 'Craft high-fidelity visual direction, responsive grid layouts, 3D interaction concepts, and ergonomic motion systems.',
      icon: <Compass className="w-5 h-5 text-cyan-400" />,
    },
    {
      number: '03',
      title: 'DEVELOP',
      subtitle: 'FRONTEND & INTERACTIVITY',
      description: 'Construct performant, scalable, and responsive component hierarchies using React, TypeScript, and modern styling.',
      icon: <Code2 className="w-5 h-5 text-white" />,
    },
    {
      number: '04',
      title: 'INTEGRATE',
      subtitle: 'BACKEND & DATA PIPELINES',
      description: 'Engineer resilient RESTful APIs, asynchronous worker pipelines, JWT security boundaries, and database models.',
      icon: <Network className="w-5 h-5 text-emerald-400" />,
    },
    {
      number: '05',
      title: 'DEPLOY',
      subtitle: 'OPTIMIZATION & CLOUD LAUNCH',
      description: 'Audit Core Web Vitals, optimize asset delivery, configure CI/CD pipelines, and deploy with high availability.',
      icon: <Rocket className="w-5 h-5 text-amber-400" />,
    },
  ];

  return (
    <section id="process" className="relative py-28 px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-neutral-400 uppercase">
            <span>06</span>
            <span className="w-8 h-[1px] bg-neutral-600" />
            <span>METHODOLOGY // WORKFLOW</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-light text-white tracking-tight uppercase">
            HOW I <span className="text-neutral-500 font-extralight">BUILD</span>
          </h2>
        </div>

        {/* 5 Process Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {steps.map((step) => (
            <GlassCard
              key={step.number}
              intensity={1}
              className="p-6 sm:p-7 flex flex-col justify-between space-y-6 group hover:border-white/25 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xl text-neutral-500 group-hover:text-blue-400 transition-colors">
                    {step.number}
                  </span>
                  <div className="p-2 rounded-xl bg-white/[0.05] border border-white/10 group-hover:bg-white/[0.1] transition-colors">
                    {step.icon}
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg font-display font-medium text-white tracking-wide">
                    {step.title}
                  </h4>
                  <span className="block font-mono text-[10px] tracking-wider text-neutral-500 uppercase">
                    {step.subtitle}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                <span>PHASE {step.number}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400/80 group-hover:scale-125 transition-transform" />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
