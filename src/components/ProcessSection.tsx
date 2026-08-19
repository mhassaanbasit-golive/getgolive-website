import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROCESS_STEPS } from '../data';

export const ProcessSection: React.FC = () => {
  const [openStepNumber, setOpenStepNumber] = useState<string | null>(null);

  const toggleStep = (stepNumber: string) => {
    setOpenStepNumber((prev) => (prev === stepNumber ? null : stepNumber));
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 150, damping: 35 },
    },
  };

  return (
    <section id="process-section" className="relative w-full bg-[var(--bg-primary)] text-[var(--text-primary)] py-14 sm:py-28 md:py-40 border-t border-[var(--border-color)] transition-colors duration-300">
      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-12 global-mobile-container">
        {/* Header with Typography Reveal */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{ willChange: 'transform, opacity' }}
          className="mb-8 sm:mb-14 md:mb-20"
        >
          <h2 className="font-headline font-bold text-[var(--text-primary)] text-[clamp(1.35rem,4.5vw,2rem)] md:text-[clamp(2.8rem,6.5vw,5.5rem)] leading-[1.05] md:leading-[0.9] tracking-[-0.03em]">
            How we transform outdated sites.
          </h2>
        </motion.div>

        {/* 3 Step Process Accordion Cards (Sequential wave entrance) */}
        <motion.div
          layout
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 stagger-grid items-start"
        >
          {PROCESS_STEPS.map((step) => {
            const isOpen = openStepNumber === step.stepNumber;

            return (
              <motion.div
                key={step.stepNumber}
                layout
                variants={cardVariants}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
                whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 400 } }}
                style={{ willChange: 'transform, opacity' }}
                onClick={() => toggleStep(step.stepNumber)}
                className="reveal-card card spotlight-card hover-lift bg-[var(--surface-card)] rounded-[18px] sm:rounded-[24px] p-5 sm:p-8 md:p-10 border border-[var(--border-color)] hover:border-[var(--text-muted)]/40 flex flex-col justify-between shadow-md text-left group cursor-pointer select-none"
              >
                {/* Card Title Row with Rotating Dropdown Chevron */}
                <div className="flex items-center justify-between gap-3 sm:gap-4">
                  <h3 className="font-headline font-bold text-[var(--text-primary)] card-title text-[18px] sm:text-[22px] md:text-[26px] leading-[1.2] tracking-[-0.02em] group-hover:opacity-90 transition-opacity">
                    {step.title}
                  </h3>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] shrink-0 group-hover:border-[var(--text-primary)]/40 bg-[var(--surface-card)] shadow-xs transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </motion.div>
                </div>

                {/* Collapsible Content Area */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 40 }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans font-normal text-[var(--text-muted)] text-[13px] sm:text-[15px] leading-[1.55] pt-3 sm:pt-4">
                        {step.description}
                      </p>
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

