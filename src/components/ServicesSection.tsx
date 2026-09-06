import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { ServiceDetail, ModalType } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceDetail) => void;
  onOpenModal: (modal: ModalType) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedId !== null && expandedId !== id) {
      // Collapse currently active card first
      setExpandedId(null);
      // Brief, seamless 250ms cascade before expanding the next card
      setTimeout(() => {
        setExpandedId(id);
      }, 250);
    } else {
      setExpandedId((prev) => (prev === id ? null : id));
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 150, damping: 35 },
    },
  };

  const gridContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 150, damping: 35 },
    },
  };

  return (
    <section id="services-section" className="relative w-full bg-[var(--bg-primary)] text-[var(--text-primary)] py-14 sm:py-28 md:py-40 border-t border-[var(--border-color)] transition-colors duration-300">
      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-12 global-mobile-container">
        
        {/* Top Header Row with Typography Stagger */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-12 mb-8 sm:mb-16 md:mb-20">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            style={{ willChange: 'transform, opacity' }}
            className="lg:w-2/3"
          >
            <h2 className="font-headline font-bold text-[var(--text-primary)] text-[clamp(1.35rem,4.5vw,2rem)] md:text-[clamp(3.2rem,7vw,6rem)] leading-[1.05] md:leading-[0.9] tracking-[-0.03em] mb-2 sm:mb-4">
              Everything your business needs to look better and get more from its website.
            </h2>
            <p className="text-[var(--text-muted)] text-[12.5px] sm:text-[15px] md:text-[16px] max-w-2xl leading-[1.55]">
              We design and build websites, improve how they perform, and add the systems that help turn visitors into real leads.
            </p>
          </motion.div>

          {/* Tech Icons: Horizontal row */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            style={{ willChange: 'transform, opacity' }}
            className="flex items-center gap-3 sm:gap-4 md:gap-5"
          >
            {/* 1. Layout Symbol SVG */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-[var(--text-primary)]" title="Websites that fit your business">
              <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>

            {/* 2. Motion Symbol SVG */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-[var(--text-primary)]" title="A website that feels good to use">
              <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M10 8l6 4-6 4V8z" />
              </svg>
            </div>

            {/* 3. Lightning Bolt Symbol SVG */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-[var(--text-primary)]" title="Fast and easy to find">
              <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>

            {/* 4. Chat Bubble Symbol SVG */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-[var(--text-primary)]" title="A 24/7 AI assistant">
              <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>

            {/* 5. Funnel / Lead Symbol SVG */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-[var(--text-primary)]" title="Turn visitors into leads">
              <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* 6 Capability Dropdown Cards Grid: 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <motion.div
          layout="position"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 md:gap-8 stagger-grid items-start"
        >
          {SERVICES.map((service) => {
            const isExpanded = expandedId === service.id;

            return (
              <motion.div
                layout="position"
                key={service.id}
                variants={cardVariants}
                whileTap={{ scale: 0.99, transition: { type: 'spring', stiffness: 400 } }}
                onClick={() => toggleExpand(service.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpand(service.id);
                  }
                }}
                className="service-card card glass-card reveal-card card-container bg-[var(--surface-card)] rounded-[18px] sm:rounded-[24px] p-5 sm:p-7 md:p-8 shadow-md border border-[var(--border-color)] flex flex-col justify-between cursor-pointer group text-left relative overflow-hidden select-none"
              >
                {/* Heading Row with Rotating Dropdown Chevron */}
                <div className="flex items-center justify-between gap-3 sm:gap-4">
                  <h3 className="font-headline font-bold text-[var(--text-primary)] card-title text-[17px] sm:text-[20px] md:text-[22px] leading-[1.25] tracking-[-0.02em] group-hover:opacity-90 transition-opacity">
                    {service.cardTitle || service.title}
                  </h3>

                  {/* Dropdown Chevron Indicator */}
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] shrink-0 group-hover:border-[var(--text-primary)]/40 bg-[var(--surface-card)] shadow-xs transition-colors"
                    aria-hidden="true"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </motion.div>
                </div>

                {/* Dropdown Description Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="dropdown-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 sm:pt-4 border-t border-[var(--border-color)]/60 mt-3 sm:mt-4">
                        <p className="font-sans font-normal text-[var(--text-muted)] text-[13px] sm:text-[14px] leading-[1.6] mb-4">
                          {service.description}
                        </p>

                        <div className="flex justify-between items-center pt-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectService(service);
                            }}
                            className="card-label-font font-sans font-medium text-[11px] tracking-[0.08em] uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            Full specifications →
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectService(service);
                            }}
                            aria-label={`View specifications for ${service.title}`}
                            className="card-arrow-circle w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--cta-bg)] hover:text-[var(--cta-text)] hover:border-[var(--cta-bg)] shadow-sm transition-colors cursor-pointer"
                          >
                            <span className="text-xs sm:text-sm font-mono card-arrow arrow-icon block">
                              →
                            </span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};


