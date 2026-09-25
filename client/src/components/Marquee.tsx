import React, { useEffect, useRef } from 'react';
import { projectsData } from '../data/projects';
import { metaCladsCaseStudy } from '../data/clientWork';

export const Marquee: React.FC = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const scrollOffset = useRef(0);
  const animFrame = useRef<number | null>(null);

  // Combine real portfolio visuals
  const row1Items = [
    {
      title: projectsData[0].name,
      category: projectsData[0].category,
      image: projectsData[0].visual,
      tech: projectsData[0].technologies.slice(0, 3).join(' • '),
    },
    {
      title: metaCladsCaseStudy.clientName + ' — ' + metaCladsCaseStudy.projectType,
      category: metaCladsCaseStudy.classification,
      image: metaCladsCaseStudy.gallery[0].image,
      tech: 'REACT • TAILWIND • ARCHITECTURE',
    },
    {
      title: projectsData[1].name,
      category: projectsData[1].category,
      image: projectsData[1].visual,
      tech: projectsData[1].technologies.slice(0, 3).join(' • '),
    },
    {
      title: projectsData[2].name,
      category: projectsData[2].category,
      image: projectsData[2].visual,
      tech: projectsData[2].technologies.slice(0, 3).join(' • '),
    },
  ];

  const row2Items = [
    {
      title: projectsData[3].name,
      category: projectsData[3].category,
      image: projectsData[3].visual,
      tech: projectsData[3].technologies.slice(0, 3).join(' • '),
    },
    {
      title: metaCladsCaseStudy.gallery[1].title,
      category: 'FAÇADE SYSTEMS',
      image: metaCladsCaseStudy.gallery[1].image,
      tech: 'CLIENT WORK • PRODUCTION',
    },
    {
      title: projectsData[4].name,
      category: projectsData[4].category,
      image: projectsData[4].visual,
      tech: projectsData[4].technologies.slice(0, 3).join(' • '),
    },
    {
      title: projectsData[5].name,
      category: projectsData[5].category,
      image: projectsData[5].visual,
      tech: projectsData[5].technologies.slice(0, 3).join(' • '),
    },
  ];

  useEffect(() => {
    let currentY = window.scrollY;

    const handleScroll = () => {
      currentY = window.scrollY;
    };

    const updateMarquee = () => {
      // Passive scroll offset interpolation
      scrollOffset.current += (currentY - scrollOffset.current) * 0.08;

      if (row1Ref.current) {
        // Row 1 shifts right as page scrolls down
        const shiftX = (scrollOffset.current * 0.35) % 1200;
        row1Ref.current.style.transform = `translate3d(${shiftX}px, 0, 0)`;
      }

      if (row2Ref.current) {
        // Row 2 shifts left as page scrolls down
        const shiftX = -(scrollOffset.current * 0.35) % 1200;
        row2Ref.current.style.transform = `translate3d(${shiftX}px, 0, 0)`;
      }

      animFrame.current = requestAnimationFrame(updateMarquee);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    animFrame.current = requestAnimationFrame(updateMarquee);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return (
    <div className="relative w-full py-12 overflow-hidden border-y border-white/5 bg-black/40 backdrop-blur-sm select-none">
      {/* Edge gradient masks for seamless fade out */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      {/* Row 1: Moves right */}
      <div className="flex mb-6 overflow-visible">
        <div
          ref={row1Ref}
          className="flex gap-6 will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          {/* Double items for seamless loop */}
          {[...row1Items, ...row1Items, ...row1Items].map((item, index) => (
            <div
              key={`row1-${index}`}
              className="relative flex-shrink-0 w-72 sm:w-88 h-44 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 group"
              data-cursor="view"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-85"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  {item.category}
                </span>
                <h4 className="text-sm font-display font-medium text-white truncate">
                  {item.title}
                </h4>
                <span className="text-[10px] font-mono text-neutral-500 mt-1">{item.tech}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Moves left */}
      <div className="flex overflow-visible">
        <div
          ref={row2Ref}
          className="flex gap-6 will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          {[...row2Items, ...row2Items, ...row2Items].map((item, index) => (
            <div
              key={`row2-${index}`}
              className="relative flex-shrink-0 w-72 sm:w-88 h-44 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 group"
              data-cursor="view"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-85"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  {item.category}
                </span>
                <h4 className="text-sm font-display font-medium text-white truncate">
                  {item.title}
                </h4>
                <span className="text-[10px] font-mono text-neutral-500 mt-1">{item.tech}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
