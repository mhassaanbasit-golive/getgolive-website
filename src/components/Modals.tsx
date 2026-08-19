import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ModalType, PageType, CaseStudy, ServiceDetail, Project } from '../types';

interface ModalsProps {
  activeModal: ModalType;
  onClose: () => void;
  onNavigate: (page: PageType) => void;
  selectedCaseStudy: CaseStudy | null;
  selectedService: ServiceDetail | null;
  selectedProject?: Project | null;
  selectedPlanName?: string;
}

export const Modals: React.FC<ModalsProps> = ({
  activeModal,
  onClose,
  onNavigate,
  selectedCaseStudy,
  selectedService,
  selectedProject,
  selectedPlanName,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [conceptSubmitted, setConceptSubmitted] = useState(false);

  if (!activeModal || activeModal === 'menu') return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-[4px] cursor-pointer"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          className={`relative z-10 w-full ${
            activeModal === 'project-detail' ? 'max-w-3xl p-4 sm:p-8 md:p-10' : 'max-w-2xl p-4 sm:p-8 md:p-10'
          } card glass-card rounded-[18px] sm:rounded-[24px] text-[var(--text-primary)] shadow-2xl overflow-y-auto max-h-[88vh]`}
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.08, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
            whileTap={{ scale: 0.92, transition: { type: 'spring', stiffness: 400 } }}
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-6 sm:right-6 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center justify-center text-xs sm:text-sm font-mono cursor-pointer z-20"
            aria-label="Close modal"
          >
            ✕
          </motion.button>

          {/* 1. PROJECT DETAIL MODAL */}
          {activeModal === 'project-detail' && selectedProject && (
            <div>
              {/* Project Title & City */}
              <h3 className="font-headline font-bold text-[var(--text-primary)] text-lg sm:text-3xl md:text-4xl tracking-[-0.02em] leading-tight mb-0.5 sm:mb-1">
                {selectedProject.name}
              </h3>
              <p className="text-[var(--text-muted)] text-[12px] sm:text-[15px] font-medium mb-4 sm:mb-6">
                {selectedProject.city}
              </p>

              {/* Large Hero Image */}
              <div className="w-full aspect-[16/9] rounded-[12px] sm:rounded-[16px] overflow-hidden mb-4 sm:mb-6 relative bg-[var(--bg-primary)] border border-[var(--border-color)] shadow-inner">
                <img
                  src={selectedProject.heroImage}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover filter contrast-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white card-label-font font-sans font-medium text-[11px] tracking-[0.08em] uppercase">
                  {selectedProject.name} • {selectedProject.city}
                </div>
              </div>

              {/* Editorial Description (Exact text, clean, simple, natural English) */}
              <div className="mb-4 sm:mb-6 bg-[var(--bg-primary)] p-3.5 sm:p-6 rounded-[12px] sm:rounded-[16px] border border-[var(--border-color)]">
                <p className="text-[var(--text-primary)] text-[12.5px] sm:text-[16px] leading-[1.55]">
                  {selectedProject.description}
                </p>
              </div>

              {/* Clear Visual Slot for Mockup Images Replacement Tomorrow */}
              <div className="mb-5 sm:mb-8 p-3.5 sm:p-5 rounded-[12px] sm:rounded-[16px] border-2 border-dashed border-[var(--border-color)] bg-[var(--surface-card)] text-center relative">
                <div className="flex items-center justify-center gap-1.5 mb-1.5 sm:mb-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--cta-bg)] animate-pulse" />
                  <span className="card-label-font font-sans font-medium text-[11px] tracking-[0.08em] uppercase text-[var(--text-primary)]">
                    Visual Mockup Slot
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
                  Design canvas pre-configured for high-resolution desktop & mobile mockups. Replaceable directly via asset upload.
                </p>
              </div>

              {/* Two Pill Buttons: "View Live Site" & "View Redesign" */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
                <motion.a
                  href={selectedProject.liveSiteUrl}
                  onClick={(e) => e.preventDefault()}
                  whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
                  whileTap={{ scale: 0.97, transition: { type: 'spring', stiffness: 400 } }}
                  className="magnetic-btn w-full sm:w-1/2 py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--text-primary)] text-[var(--text-primary)] font-semibold text-[12.5px] sm:text-[14px] transition-colors text-center flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer shadow-sm"
                >
                  <span>View Live Site</span>
                  <span className="font-mono text-xs">↗</span>
                </motion.a>

                <motion.a
                  href={selectedProject.redesignUrl}
                  onClick={(e) => e.preventDefault()}
                  whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
                  whileTap={{ scale: 0.97, transition: { type: 'spring', stiffness: 400 } }}
                  className="magnetic-btn w-full sm:w-1/2 py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-full bg-[var(--cta-bg)] text-[var(--cta-text)] font-semibold text-[12.5px] sm:text-[14px] hover:opacity-90 transition-opacity text-center flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer shadow-md"
                >
                  <span>View Redesign</span>
                  <span className="font-mono text-xs">↗</span>
                </motion.a>
              </div>
            </div>
          )}

          {/* 2. FREE CONCEPT REQUEST MODAL */}
          {activeModal === 'concept' && (
            <div>
              <h3 className="font-headline font-bold text-[var(--text-primary)] text-xl sm:text-3xl mb-2 sm:mb-4">
                See Your Business, Rebuilt.
              </h3>
              <p className="text-[var(--text-muted)] text-[12.5px] sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                Send us your current website or company name. Within 72 hours, we build a live, clickable preview of what your new site could look like. No obligation, no payment, just something real to look at.
              </p>

              {conceptSubmitted ? (
                <div className="text-center py-6 sm:py-8 bg-[var(--bg-primary)] rounded-xl sm:rounded-2xl border border-[var(--border-color)]">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--cta-bg)] text-[var(--cta-text)] font-bold flex items-center justify-center mx-auto mb-2 sm:mb-3 text-sm sm:text-base">
                    ✓
                  </div>
                  <h4 className="font-headline font-bold text-[var(--text-primary)] text-base sm:text-xl mb-1">
                    Concept Request Registered
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[var(--text-muted)]">
                    Our team is reviewing your details and preparing your preview link.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setConceptSubmitted(true);
                  }}
                  className="space-y-3 sm:space-y-4"
                >
                  <div>
                    <label htmlFor="concept-company" className="block card-label-font font-sans font-medium text-[11px] tracking-[0.08em] uppercase text-[var(--text-muted)] mb-1">Company / Website URL</label>
                    <input
                      id="concept-company"
                      type="text"
                      required
                      placeholder="e.g. bellview-realty.com"
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg sm:rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] text-[13px] sm:text-sm focus:outline-none focus:border-[var(--text-primary)] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="concept-email" className="block card-label-font font-sans font-medium text-[11px] tracking-[0.08em] uppercase text-[var(--text-muted)] mb-1">Your Email</label>
                    <input
                      id="concept-email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg sm:rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] text-[13px] sm:text-sm focus:outline-none focus:border-[var(--text-primary)] transition-colors"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
                    whileTap={{ scale: 0.97, transition: { type: 'spring', stiffness: 400 } }}
                    className="w-full bg-[var(--cta-bg)] text-[var(--cta-text)] font-semibold text-[13px] sm:text-sm py-2.5 sm:py-3.5 rounded-full hover:opacity-90 transition-opacity cursor-pointer mt-1 sm:mt-2 shadow-md"
                  >
                    Reveal My Concept →
                  </motion.button>
                </form>
              )}
            </div>
          )}

          {/* 3. CONTACT / GET IN TOUCH MODAL */}
          {activeModal === 'contact' && (
            <div>
              <h3 className="font-headline font-bold text-[var(--text-primary)] text-xl sm:text-3xl mb-1.5 sm:mb-2">
                Get In Touch
              </h3>
              {selectedPlanName && (
                <span className="inline-block bg-[var(--cta-bg)] text-[var(--cta-text)] card-label-font font-sans font-medium text-[11px] tracking-[0.08em] uppercase px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full mb-3 sm:mb-4">
                  Selected Plan: {selectedPlanName}
                </span>
              )}

              {formSubmitted ? (
                <div className="text-center py-6 sm:py-8 bg-[var(--bg-primary)] rounded-xl sm:rounded-2xl border border-[var(--border-color)]">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--cta-bg)] text-[var(--cta-text)] font-bold flex items-center justify-center mx-auto mb-2 sm:mb-3 text-sm sm:text-base">
                    ✓
                  </div>
                  <h4 className="font-headline font-bold text-[var(--text-primary)] text-base sm:text-xl mb-1">
                    Thank You
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[var(--text-muted)]">
                    We will be in touch shortly to coordinate your consultation.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-3 sm:space-y-4"
                >
                  <div>
                    <label htmlFor="modal-name" className="block card-label-font font-sans font-medium text-[11px] tracking-[0.08em] uppercase text-[var(--text-muted)] mb-1">Full Name</label>
                    <input
                      id="modal-name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg sm:rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] text-[13px] sm:text-sm focus:outline-none focus:border-[var(--text-primary)] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-email" className="block card-label-font font-sans font-medium text-[11px] tracking-[0.08em] uppercase text-[var(--text-muted)] mb-1">Email Address</label>
                    <input
                      id="modal-email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg sm:rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] text-[13px] sm:text-sm focus:outline-none focus:border-[var(--text-primary)] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-notes" className="block card-label-font font-sans font-medium text-[11px] tracking-[0.08em] uppercase text-[var(--text-muted)] mb-1">Notes / Scope (Optional)</label>
                    <textarea
                      id="modal-notes"
                      rows={3}
                      placeholder="Tell us briefly about your current offline presence..."
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg sm:rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] text-[13px] sm:text-sm focus:outline-none focus:border-[var(--text-primary)] transition-colors"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
                    whileTap={{ scale: 0.97, transition: { type: 'spring', stiffness: 400 } }}
                    className="w-full bg-[var(--cta-bg)] text-[var(--cta-text)] font-semibold text-[13px] sm:text-sm py-2.5 sm:py-3.5 rounded-full hover:opacity-90 transition-opacity cursor-pointer mt-1 sm:mt-2 shadow-md"
                  >
                    Send Direct Inquiry →
                  </motion.button>
                </form>
              )}
            </div>
          )}

          {/* 4. CASE STUDY DETAIL MODAL */}
          {activeModal === 'case-study' && selectedCaseStudy && (
            <div>
              <h3 className="font-headline font-bold text-[var(--text-primary)] text-xl sm:text-3xl mb-1">
                {selectedCaseStudy.title}
              </h3>
              <p className="text-[var(--text-muted)] text-[12px] sm:text-sm mb-4 sm:mb-6">
                {selectedCaseStudy.subtitle} ({selectedCaseStudy.year})
              </p>

              <div className="w-full aspect-video rounded-xl overflow-hidden mb-4 sm:mb-6 border border-[var(--border-color)]">
                <img
                  src={selectedCaseStudy.heroImage}
                  alt={selectedCaseStudy.title}
                  className="w-full h-full object-cover filter grayscale contrast-125"
                />
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6 bg-[var(--bg-primary)] p-3 sm:p-4 rounded-xl border border-[var(--border-color)]">
                {selectedCaseStudy.metrics.map((m, idx) => (
                  <div key={idx} className="text-center">
                    <span className="font-headline font-bold text-[var(--text-primary)] text-base sm:text-xl block">{m.value}</span>
                    <span className="card-label-font font-sans font-medium text-[11px] tracking-[0.08em] uppercase text-[var(--text-muted)]">{m.label}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 sm:space-y-4 text-[12px] sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4 sm:mb-6">
                <div>
                  <span className="text-[var(--text-primary)] font-semibold block mb-0.5 sm:mb-1">The Challenge:</span>
                  <p>{selectedCaseStudy.challenge}</p>
                </div>
                <div>
                  <span className="text-[var(--text-primary)] font-semibold block mb-0.5 sm:mb-1">The Transformation:</span>
                  <p>{selectedCaseStudy.solution}</p>
                </div>
                <div>
                  <span className="text-[var(--text-primary)] font-semibold block mb-0.5 sm:mb-1">The Result:</span>
                  <p>{selectedCaseStudy.result}</p>
                </div>
              </div>

              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
                whileTap={{ scale: 0.97, transition: { type: 'spring', stiffness: 400 } }}
                className="w-full bg-[var(--cta-bg)] text-[var(--cta-text)] font-semibold text-[12.5px] sm:text-sm py-2.5 sm:py-3 rounded-full hover:opacity-90 transition-opacity cursor-pointer shadow-md"
              >
                Close Case Study
              </motion.button>
            </div>
          )}

          {/* 5. SERVICE DETAIL MODAL */}
          {activeModal === 'service' && selectedService && (
            <div>
              <h3 className="font-headline font-bold text-[var(--text-primary)] text-xl sm:text-3xl mb-3 sm:mb-4">
                {selectedService.title}
              </h3>

              <p className="text-[var(--text-muted)] text-[13px] sm:text-base leading-relaxed mb-4 sm:mb-6">
                {selectedService.description}
              </p>

              <div className="bg-[var(--bg-primary)] p-3.5 sm:p-5 rounded-xl border border-[var(--border-color)] mb-4 sm:mb-6">
                <span className="card-label-font font-sans font-medium text-[11px] tracking-[0.08em] uppercase text-[var(--text-muted)] block mb-2 sm:mb-3">What is included</span>
                <div className="space-y-1.5 sm:space-y-2">
                  {selectedService.deliverables.map((d, idx) => (
                    <div key={idx} className="text-[12px] sm:text-[13.5px] text-[var(--text-primary)] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-primary)]" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
                whileTap={{ scale: 0.97, transition: { type: 'spring', stiffness: 400 } }}
                className="w-full bg-[var(--cta-bg)] text-[var(--cta-text)] font-semibold text-[12.5px] sm:text-sm py-2.5 sm:py-3.5 rounded-full hover:opacity-90 transition-opacity cursor-pointer shadow-md"
              >
                {selectedService.buttonText || `Inquire for ${selectedService.title} →`}
              </motion.button>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
