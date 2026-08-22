import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ModalType } from '../types';

interface IsometricMockupSectionProps {
  onOpenModal: (modal: ModalType) => void;
}

export const IsometricMockupSection: React.FC<IsometricMockupSectionProps> = ({ onOpenModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scroll-linked scale and vertical pan for 3D luxury depth
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.0, 0.95]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const containerRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -6]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 90, damping: 28, mass: 1.1 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 45, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 90, damping: 28, mass: 1.1, delay: 0.15 },
    },
  };

  return (
    <section ref={containerRef} id="mockup" className="relative w-full bg-[var(--bg-primary)] text-[var(--text-primary)] py-16 sm:py-28 md:py-44 px-5 sm:px-8 md:px-12 global-mobile-container overflow-hidden border-t border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-[1800px] mx-auto relative flex flex-col lg:flex-row items-center justify-between gap-10 sm:gap-16 lg:gap-20">
        
        {/* Sleek, Dark Grey Editorial Canvas Container with 3D Perspective */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ willChange: 'transform, opacity, filter', perspective: 1400, rotateX: containerRotateX }}
          className="w-full lg:w-[58%]"
        >
          <motion.div
            whileHover={{ y: -8, scale: 1.015, transition: { type: 'spring', stiffness: 220, damping: 25 } }}
            whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 350 } }}
            className="rounded-card card spotlight-card hover-lift w-full mx-auto rounded-[20px] sm:rounded-[28px] bg-[var(--surface-card)] border border-[var(--border-color)] overflow-hidden shadow-2xl group relative"
          >
            <div className="relative aspect-[4/3] md:aspect-[16/10] bg-[var(--bg-primary)] overflow-hidden rounded-[18px] sm:rounded-[24px]">
              <motion.img
                style={{ scale: imageScale, y: imageY, willChange: 'transform' }}
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                alt="Editorial Architectural Canvas"
                whileHover={{ scale: 1.04, transition: { type: 'spring', stiffness: 220, damping: 25 } }}
                className="w-full h-full object-cover filter grayscale contrast-125 opacity-85 card-image will-change-transform"
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
            whileHover={{ scale: 1.04, transition: { type: 'spring', stiffness: 250, damping: 25 } }}
            whileTap={{ scale: 0.96, transition: { type: 'spring', stiffness: 350 } }}
            onClick={() => onOpenModal('concept')}
            className="magnetic-btn bg-[var(--cta-bg)] text-[var(--cta-text)] font-semibold text-[14px] sm:text-[16px] px-6 py-3 sm:px-9 sm:py-4 rounded-full cursor-pointer shadow-xl flex items-center gap-3 group"
          >
            <span>Request a concept</span>
            <motion.span
              whileHover={{ x: 6, transition: { type: 'spring', stiffness: 250, damping: 25 } }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

