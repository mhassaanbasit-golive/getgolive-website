import React from 'react';
import { motion } from 'motion/react';
import { PRICING_PLANS } from '../data';
import { ModalType } from '../types';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
  onOpenModal: (modal: ModalType) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan, onOpenModal }) => {
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
    <section id="pricing" className="relative w-full bg-[var(--bg-primary)] text-[var(--text-primary)] py-14 sm:py-28 md:py-40 border-t border-[var(--border-color)] overflow-hidden transition-colors duration-300">
      {/* Grayscale vignette (soft radial glow) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(150,150,150,0.08)_0%,_transparent_60%)] pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-12 global-mobile-container relative z-10">
        
        {/* Left-aligned Headline with Staggered Reveal */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{ willChange: 'transform, opacity' }}
          className="mb-8 sm:mb-14 md:mb-18"
        >
          <h2 className="font-headline font-bold text-[var(--text-primary)] text-[clamp(1.35rem,4.5vw,2rem)] md:text-[clamp(3.2rem,7vw,6rem)] leading-[1.05] md:leading-[0.9] tracking-[-0.03em] mb-2 sm:mb-4">
            Choose your plan.
          </h2>
          <p className="text-[var(--text-muted)] text-[12.5px] sm:text-[15px] md:text-[16px] max-w-2xl leading-[1.55]">
            Every tier gets real design work and a site that's finished, not a starting point you pay more to complete later.
          </p>
        </motion.div>

        {/* Card Grid: 3 cards (Sequential wave entrance) */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col md:grid md:grid-cols-3 gap-5 sm:gap-[40px] md:gap-8 stagger-grid"
        >
          {PRICING_PLANS.map((plan) => (
            <motion.div
              key={plan.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.01, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
              whileTap={{ scale: 0.97, transition: { type: 'spring', stiffness: 400 } }}
              style={{ willChange: 'transform, opacity' }}
              className={`pricing-card reveal-card card-container bg-[var(--surface-card)] rounded-[18px] sm:rounded-[24px] p-5 sm:p-8 md:p-10 border ${
                plan.popular ? 'border-[var(--text-primary)] is-popular' : 'border-[var(--border-color)]'
              } relative flex flex-col justify-between hover:border-[var(--text-muted)]/40 shadow-md text-left group`}
            >
              <div>
                {/* Header Row with Title and optional Popular tag */}
                <div className="flex items-center justify-between mb-4 sm:mb-8">
                  <h3 className="font-headline font-bold text-[var(--text-primary)] text-[18px] sm:text-[24px]">
                    {plan.name}
                  </h3>
                  {plan.popular && (
                    <span className="bg-[var(--cta-bg)] text-[var(--cta-text)] card-label-font font-sans font-medium text-[11px] tracking-[0.08em] uppercase px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-2.5 sm:space-y-3.5 mb-6 sm:mb-10 border-t border-[var(--border-color)] pt-4 sm:pt-6">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 sm:gap-3">
                      <span className="text-[var(--text-primary)] font-bold text-xs mt-0.5 sm:mt-1">―</span>
                      <p className="text-[var(--text-muted)] text-[12.5px] sm:text-[14px] leading-relaxed">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary CTA (Request quote) */}
              <motion.button
                whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
                whileTap={{ scale: 0.95, transition: { type: 'spring', stiffness: 400 } }}
                onClick={() => {
                  onSelectPlan(plan.name);
                  onOpenModal('contact');
                }}
                className={`magnetic-btn w-full py-2.5 sm:py-3.5 md:py-4 rounded-full text-[13px] sm:text-[14px] md:text-[15px] font-semibold cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 group shadow-sm ${
                  plan.popular
                    ? 'bg-[var(--cta-bg)] text-[var(--cta-text)] shadow-md'
                    : 'bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--surface-card)] border border-[var(--border-color)]'
                }`}
              >
                <span>Request a quote</span>
                <motion.span
                  whileHover={{ x: 6, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

