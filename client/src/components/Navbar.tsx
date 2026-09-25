import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { isScrolled } = useScrollProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'PROCESS', href: '#process' },
    { label: 'PROJECTS', href: '#work' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'D.O.T', href: '#client-work' },
    { label: 'TALK', href: '#contact' },
  ];

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onNavigate?.(targetId);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 flex justify-center transition-all duration-500 ease-out px-4 sm:px-6 md:px-8 ${
          isScrolled
            ? 'translate-y-0 opacity-100 pt-3 pb-3 pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none pt-0 pb-0'
        }`}
      >
        <nav
          className="w-full max-w-7xl flex items-center justify-between px-5 py-2.5 bg-black/70 backdrop-blur-heavy border border-white/20 shadow-glass-md rounded-full transition-all duration-300"
        >
          {/* Left: Brand Monogram SK */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick('#hero', e)}
            className="group flex items-center gap-2 text-white outline-none focus-visible:ring-1 focus-visible:ring-white rounded-md"
            data-cursor="pointer"
            aria-label="Sagar Kaushik Home"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-display font-bold text-xs tracking-wider transition-transform duration-300 group-hover:scale-105 group-hover:border-white/40">
              SK
            </div>
            <span className="hidden sm:inline font-mono text-xs tracking-widest text-neutral-300 group-hover:text-white uppercase transition-colors">
              SAGAR KAUSHIK
            </span>
          </a>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(link.href, e)}
                className="relative text-xs font-mono tracking-widest text-neutral-400 hover:text-white transition-colors duration-200 py-1"
                data-cursor="pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: Actions / Social Links */}
          <div className="hidden md:flex items-center gap-3">
            <MagneticButton
              href="/resume.pdf"
              download="Sagar_Kaushik_Resume.pdf"
              target="_blank"
              variant="glass"
              size="sm"
              cursorLabel="pointer"
              ariaLabel="Download Resume"
              className="!py-1.5 !px-3 !text-[11px] gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-neutral-300" />
              <span>RESUME</span>
            </MagneticButton>

            <a
              href="https://github.com/sagar0kaushik"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.12] border border-white/10 hover:border-white/30 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-200"
              data-cursor="pointer"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://www.linkedin.com/in/sagar-kaushik-21a833298"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.12] border border-white/10 hover:border-white/30 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-200"
              data-cursor="pointer"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Floating Glass Panel Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-20 inset-x-4 z-50 p-6 rounded-3xl bg-neutral-950/95 backdrop-blur-heavy border border-white/15 shadow-glass-lg md:hidden"
          >
            <div className="flex flex-col gap-4">
              <div className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase pb-2 border-b border-white/10">
                NAVIGATION
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(link.href, e)}
                  className="text-base font-display tracking-wider text-neutral-200 hover:text-white flex items-center justify-between py-2 border-b border-white/5"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500" />
                </a>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="/resume.pdf"
                  download="Sagar_Kaushik_Resume.pdf"
                  target="_blank"
                  className="w-full py-3 rounded-full bg-white text-black font-medium text-xs tracking-wider uppercase text-center flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  DOWNLOAD RESUME
                </a>

                <div className="flex gap-2">
                  <a
                    href="https://github.com/sagar0kaushik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-full bg-white/10 border border-white/15 text-white text-xs tracking-wider uppercase flex items-center justify-center gap-2"
                  >
                    <GithubIcon className="w-4 h-4" /> GITHUB
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sagar-kaushik-21a833298"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-full bg-white/10 border border-white/15 text-white text-xs tracking-wider uppercase flex items-center justify-center gap-2"
                  >
                    <LinkedinIcon className="w-4 h-4" /> LINKEDIN
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
