import React from 'react';
import { motion } from 'motion/react';
import { ModalType } from '../types';
import { ProcessSection } from './ProcessSection';
import { FaqSection } from './FaqSection';

interface ProcessPageProps {
  onOpenModal: (modal: ModalType) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onOpenModal }) => {
  const headerVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 150, damping: 35 },
    },
  };

  return (
    <div className="w-full min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-20 sm:pt-28 md:pt-36 pb-12 transition-colors duration-300">
      {/* Hero Header */}
      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-12 global-mobile-container mb-8 sm:mb-12">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          style={{ willChange: 'transform, opacity' }}
          className="max-w-4xl"
        >
          <h1 className="font-headline font-bold text-[var(--text-primary)] text-[clamp(1.35rem,4.5vw,2.2rem)] md:text-[clamp(2.8rem,7vw,6rem)] leading-[1.05] md:leading-[0.9] tracking-[-0.03em] mb-3 sm:mb-6">
            How we transform outdated sites.
          </h1>
          <p className="text-[var(--text-muted)] text-[12.5px] sm:text-[16px] md:text-[18px] leading-[1.55] max-w-2xl">
            A simple, transparent 3-step process designed to give real estate firms across the US a high-performing website in 7 days.
          </p>
        </motion.div>
      </div>

      {/* Process Section */}
      <ProcessSection />

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
};

