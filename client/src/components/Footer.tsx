import React from 'react';
import { ArrowUp, FileText, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full border-t border-white/10 bg-[#040404] py-16 px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto space-y-12">
        {/* Top Tier */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-display font-bold text-sm tracking-wider text-white">
              SK
            </div>
            <div>
              <h3 className="text-2xl font-display font-medium text-white tracking-wide">
                SAGAR KAUSHIK
              </h3>
              <p className="text-xs font-mono tracking-widest text-neutral-400 uppercase mt-1">
                FULL STACK DEVELOPER // CREATIVE TECHNOLOGIST
              </p>
            </div>
          </div>

          {/* Quick Section Nav Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono tracking-widest text-neutral-400">
            <a href="#about" className="hover:text-white transition-colors" data-cursor="pointer">
              ABOUT
            </a>
            <a href="#skills" className="hover:text-white transition-colors" data-cursor="pointer">
              SKILLS
            </a>
            <a href="#work" className="hover:text-white transition-colors" data-cursor="pointer">
              WORK
            </a>
            <a href="#client-work" className="hover:text-white transition-colors" data-cursor="pointer">
              CLIENT WORK
            </a>
            <a href="#experience" className="hover:text-white transition-colors" data-cursor="pointer">
              EXPERIENCE
            </a>
            <a href="#contact" className="hover:text-white transition-colors" data-cursor="pointer">
              CONTACT
            </a>
          </div>

          {/* Scroll to Top Trigger */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 p-3 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/30 text-xs font-mono text-neutral-300 hover:text-white transition-all w-fit"
            data-cursor="pointer"
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Tier: Socials & Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/sagar0kaushik"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1.5 transition-colors"
              data-cursor="pointer"
            >
              <GithubIcon className="w-3.5 h-3.5" /> GITHUB
            </a>
            <a
              href="https://www.linkedin.com/in/sagar-kaushik-21a833298"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1.5 transition-colors"
              data-cursor="pointer"
            >
              <LinkedinIcon className="w-3.5 h-3.5" /> LINKEDIN
            </a>
            <a
              href="/resume.pdf"
              download="Sagar_Kaushik_Resume.pdf"
              target="_blank"
              className="hover:text-white flex items-center gap-1.5 transition-colors"
              data-cursor="pointer"
            >
              <FileText className="w-3.5 h-3.5" /> RESUME
            </a>
            <a
              href="mailto:sagarkaushik584@gmail.com"
              className="hover:text-white flex items-center gap-1.5 transition-colors"
              data-cursor="pointer"
            >
              <Mail className="w-3.5 h-3.5" /> EMAIL
            </a>
          </div>

          <div>&copy; 2026 Sagar Kaushik. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};
