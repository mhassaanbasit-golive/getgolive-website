import React from 'react';
import { motion } from 'motion/react';
import { ModalType } from '../types';

interface IsometricMockupSectionProps {
  onOpenModal: (modal: ModalType) => void;
}

export const IsometricMockupSection: React.FC<IsometricMockupSectionProps> = ({ onOpenModal }) => {
  // Stable, elegant layout parameters
  const imageScale = 1.0;
  const imageY = 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 0, filter: 'blur(0px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 0, filter: 'blur(0px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.1 },
    },
  };

  return (
    <section id="mockup" className="relative w-full bg-[var(--bg-primary)] text-[var(--text-primary)] py-16 sm:py-28 md:py-44 px-5 sm:px-8 md:px-12 global-mobile-container overflow-hidden border-t border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-[1800px] mx-auto relative flex flex-col lg:flex-row items-center justify-between gap-10 sm:gap-16 lg:gap-20">
        
        {/* Sleek, Dark Grey Editorial Canvas Container */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ willChange: 'transform, opacity, filter', perspective: 1400 }}
          className="w-full lg:w-[58%]"
        >
          <motion.div
            whileTap={{ scale: 0.99, transition: { type: 'spring', stiffness: 350 } }}
            className="rounded-card card spotlight-card hover-lift w-full mx-auto rounded-[20px] sm:rounded-[28px] bg-[var(--surface-card)] border border-[var(--border-color)] overflow-hidden shadow-2xl group relative"
          >
            <div className="relative aspect-[4/3] md:aspect-[16/10] bg-[var(--bg-primary)] overflow-hidden rounded-[18px] sm:rounded-[24px]">
              <motion.img
                src="https://res.cloudinary.com/cyfb9slf/image/upload/v1788043208/see-before-you-commit-image.png"
                alt="Editorial Architectural Canvas"
                className="w-full h-full object-cover opacity-95 card-image will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-card)] via-transparent to-transparent opacity-80 pointer-events-none" />
              <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>

        {/* Text Section with Ultra-Luxury Staggered Reveal */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ willChange: 'transform, opacity, filter' }}
          className="w-full lg:w-[38%] flex flex-col items-start"
        >
          <h2 className="font-headline font-bold text-[var(--text-primary)] text-[clamp(1.5rem,4.5vw,2.2rem)] md:text-[clamp(2.4rem,4.2vw,4.8rem)] leading-[1.05] md:leading-[0.95] tracking-[-0.03em] mb-4 sm:mb-6">
            See a concept before you commit.
          </h2>
          <p className="text-[var(--text-muted)] text-[14px] sm:text-[16px] leading-[1.6] mb-6 sm:mb-10 max-w-lg">
            We build a working preview of your site before you spend anything. Click through it, share it with your team, and decide from there.
          </p>
          <motion.button
            whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 350 } }}
            onClick={() => onOpenModal('concept')}
            className="magnetic-btn bg-[var(--cta-bg)] text-[var(--cta-text)] font-semibold text-[14px] sm:text-[16px] px-6 py-3 sm:px-9 sm:py-4 rounded-full cursor-pointer shadow-xl flex items-center gap-3 group"
          >
            <span>Request a concept</span>
            <motion.span>
              →
            </motion.span>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

