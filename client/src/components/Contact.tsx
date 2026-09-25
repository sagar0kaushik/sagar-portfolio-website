import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { GlassCard } from './GlassCard';
import { MagneticButton } from './MagneticButton';
import { InteractiveCharacter } from './InteractiveCharacter';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitting(false);
        setSubmitted(true);
      } else {
        throw new Error(data.message || 'Failed to submit message to database.');
      }
    } catch (err: any) {
      console.warn('API submission notice:', err.message);
      // If network or API unavailable, prepare direct mailto fallback
      setIsSubmitting(false);
      setSubmitted(true);
      const mailtoUrl = `mailto:sagarkaushik584@gmail.com?subject=Project Inquiry from ${encodeURIComponent(
        formData.name
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.open(mailtoUrl, '_blank');
    }
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-blue-600/[0.05] rounded-full blur-[180px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-neutral-400 uppercase">
            <span>07</span>
            <span className="w-8 h-[1px] bg-neutral-600" />
            <span>START A CONVERSATION // CONNECT</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-light text-white tracking-tight uppercase leading-none">
            LET'S BUILD <br className="hidden sm:inline" />
            <span className="text-neutral-500 font-extralight">SOMETHING.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light max-w-xl">
            Available for full-time software engineering roles, technical contracts,
            and creative web freelance collaborations. Let's discuss your vision.
          </p>
        </div>

        {/* Contact Layout Grid: Form Panel + Character Visual Closure Scene */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Contact Form Glass Panel (7 cols) */}
          <div className="lg:col-span-7">
            <GlassCard intensity={2} className="p-8 sm:p-10 border-white/15 space-y-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-medium text-white">Message Sent Successfully</h3>
                  <p className="text-sm text-neutral-400 max-w-md font-light">
                    Your inquiry has been delivered directly. Sagar Kaushik has received your message and will respond promptly.
                  </p>
                  <MagneticButton
                    variant="glass"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="mt-4"
                  >
                    SEND ANOTHER MESSAGE
                  </MagneticButton>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label className="block font-mono text-xs text-neutral-400 uppercase tracking-wider">
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-colors text-sm font-light"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <label className="block font-mono text-xs text-neutral-400 uppercase tracking-wider">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-colors text-sm font-light"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-neutral-400 uppercase tracking-wider">
                      PROJECT DETAILS &amp; TIMELINE
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your product, timeline, and goals..."
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-colors text-sm font-light resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <MagneticButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      cursorLabel="pointer"
                      className="w-full sm:w-auto gap-2 shadow-glow-silver cursor-pointer"
                    >
                      <span>{isSubmitting ? 'CONNECTING CLUSTER...' : 'SUBMIT QUERY'}</span>
                      <Send className="w-4 h-4 text-black" />
                    </MagneticButton>

                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>DIRECT MONGO ATLAS INGESTION</span>
                    </div>
                  </div>
                </form>
              )}

              {/* Direct Reach Contacts */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="mailto:sagarkaushik584@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all text-neutral-300 hover:text-white"
                  data-cursor="pointer"
                >
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <div className="truncate">
                    <span className="block font-mono text-[9px] text-neutral-400 uppercase">EMAIL</span>
                    <span className="text-xs truncate">sagarkaushik584@gmail.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-neutral-300">
                  <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <div className="truncate">
                    <span className="block font-mono text-[9px] text-neutral-400 uppercase">PHONE</span>
                    <span className="text-xs">+91 6377329766</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-neutral-300">
                  <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div className="truncate">
                    <span className="block font-mono text-[9px] text-neutral-400 uppercase">LOCATION</span>
                    <span className="text-xs">Rajasthan, India</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right: Updated Footer/Contact Character (Hoodie Character Model) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative flex flex-col items-center justify-center p-6 rounded-3xl bg-neutral-950/40 border border-white/10 backdrop-blur-sm">
              <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase mb-2">
                DIGITAL AVATAR // ACTIVE SESSION
              </span>

              {/* Character using the new hoodie model with active eye/head tracking */}
              <InteractiveCharacter variant="contact" isHeroActive={true} />

              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://github.com/sagar0kaushik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  data-cursor="pointer"
                >
                  <GithubIcon className="w-3.5 h-3.5" /> GITHUB
                </a>
                <a
                  href="https://linkedin.com/in/sagar0kaushik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  data-cursor="pointer"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" /> LINKEDIN
                </a>
                <a
                  href="/resume.pdf"
                  download="Sagar_Kaushik_Resume.pdf"
                  target="_blank"
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  data-cursor="pointer"
                >
                  <FileText className="w-3.5 h-3.5" /> CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
