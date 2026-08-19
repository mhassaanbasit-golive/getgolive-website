import React from 'react';
import { motion } from 'motion/react';
import { ModalType } from '../types';

interface IsometricMockupSectionProps {
  onOpenModal: (modal: ModalType) => void;
}

export const IsometricMockupSection: React.FC<IsometricMockupSectionProps> = ({ onOpenModal }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 150, damping: 35 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 150, damping: 35, delay: 0.1 },
    },
  };

  return (
    <section id="mockup" className="relative w-full bg-[var(--bg-primary)] text-[var(--text-primary)] py-14 sm:py-20 md:py-40 px-5 sm:px-8 md:px-12 global-mobile-container overflow-hidden border-t border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-[1800px] mx-auto relative flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-12">
        
        {/* Sleek, Dark Grey Editorial Canvas Container */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{ willChange: 'transform, opacity' }}
          className="w-full lg:w-[58%]"
        >
          <motion.div
            whileHover={{ y: -6, scale: 1.01, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
            whileTap={{ scale: 0.97, transition: { type: 'spring', stiffness: 400 } }}
            className="rounded-card card spotlight-card hover-lift w-full mx-auto rounded-[18px] sm:rounded-[24px] bg-[var(--surface-card)] border border-[var(--border-color)] overflow-hidden shadow-2xl group relative"
          >
            <div className="relative aspect-[4/3] md:aspect-[16/10] bg-[var(--bg-primary)] overflow-hidden rounded-[16px] sm:rounded-[20px]">
              <motion.img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                alt="Editorial Architectural Canvas"
                whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
                whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 400 } }}
                className="w-full h-full object-cover filter grayscale contrast-125 scale-100 opacity-80 card-image will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-card)] via-transparent to-transparent opacity-80" />
            </div>
          </motion.div>
        </motion.div>

        {/* Text Section */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{ willChange: 'transform, opacity' }}
          className="w-full lg:w-[38%] flex flex-col items-start"
        >
          <h2 className="font-headline font-bold text-[var(--text-primary)] text-[clamp(1.35rem,4.5vw,2rem)] md:text-[clamp(2.2rem,4vw,4.5rem)] leading-[1.05] md:leading-[0.95] tracking-[-0.03em] mb-3 sm:mb-6">
            See a concept before you commit.
          </h2>
          <p className="text-[var(--text-muted)] text-[13px] sm:text-[15px] leading-[1.55] mb-5 sm:mb-8 max-w-md">
            We build a working preview of your site before you spend anything. Click through it, share it with your team, and decide from there.
          </p>
          <motion.button
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
            whileTap={{ scale: 0.95, transition: { type: 'spring', stiffness: 400 } }}
            onClick={() => onOpenModal('concept')}
            className="magnetic-btn bg-[var(--cta-bg)] text-[var(--cta-text)] font-semibold text-[13px] sm:text-[15px] md:text-[16px] px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-full cursor-pointer shadow-xl flex items-center gap-2 group"
          >
            <span>Request a concept</span>
            <motion.span
              whileHover={{ x: 6, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

