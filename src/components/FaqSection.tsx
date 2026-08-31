import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    if (openIdx !== null && openIdx !== idx) {
      // Collapse currently active FAQ first
      setOpenIdx(null);
      // Brief, seamless 250ms cascade before expanding the next FAQ
      setTimeout(() => {
        setOpenIdx(idx);
      }, 250);
    } else {
      setOpenIdx(openIdx === idx ? null : idx);
    }
  };

  // Split FAQs into 2 columns for desktop
  const half = Math.ceil(FAQS.length / 2);
  const col1 = FAQS.slice(0, half);
  const col2 = FAQS.slice(half);

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
    <section id="faq" className="relative w-full bg-[var(--bg-primary)] text-[var(--text-primary)] py-14 sm:py-28 md:py-40 border-t border-[var(--border-color)] transition-colors duration-300">
      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-12 global-mobile-container">
        
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mb-8 sm:mb-16 md:mb-24"
        >
          <h2 className="font-headline font-bold text-[var(--text-primary)] text-[clamp(1.35rem,4.5vw,2rem)] md:text-[clamp(2.8rem,6.5vw,5.5rem)] leading-[1.05] md:leading-[0.9] tracking-[-0.03em]">
            Frequently asked questions.
          </h2>
        </motion.div>

        {/* 2-Column Accordion */}
        <motion.div
          layout="position"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-6 lg:gap-8 items-start"
        >
          {/* Column 1 */}
          <div className="space-y-3 sm:space-y-4">
            {col1.map((faq, idx) => {
              const globalIdx = idx;
              const isOpen = openIdx === globalIdx;
              return (
                <motion.div
                  layout="position"
                  key={globalIdx}
                  variants={cardVariants}
                  className="card glass-card rounded-[14px] sm:rounded-[20px] overflow-hidden"
                >
                  <motion.button
                    whileTap={{ scale: 0.99, transition: { type: 'spring', stiffness: 400 } }}
                    onClick={() => toggleFaq(globalIdx)}
                    className="w-full p-4 sm:p-6 text-left flex justify-between items-center gap-3 sm:gap-4 cursor-pointer group"
                  >
                    <span className="font-headline font-semibold text-[13.5px] sm:text-[17px] text-[var(--text-primary)] leading-snug group-hover:text-[var(--text-primary)]">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[var(--text-primary)] text-lg sm:text-xl font-mono shrink-0 ml-2 block"
                    >
                      +
                    </motion.span>
                  </motion.button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-[var(--text-muted)] text-[12.5px] sm:text-[14px] leading-relaxed border-t border-[var(--border-color)] pt-3 sm:pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Column 2 */}
          <div className="space-y-3 sm:space-y-4">
            {col2.map((faq, idx) => {
              const globalIdx = idx + half;
              const isOpen = openIdx === globalIdx;
              return (
                <motion.div
                  layout="position"
                  key={globalIdx}
                  variants={cardVariants}
                  className="card glass-card rounded-[14px] sm:rounded-[20px] overflow-hidden"
                >
                  <motion.button
                    whileTap={{ scale: 0.99, transition: { type: 'spring', stiffness: 400 } }}
                    onClick={() => toggleFaq(globalIdx)}
                    className="w-full p-4 sm:p-6 text-left flex justify-between items-center gap-3 sm:gap-4 cursor-pointer group"
                  >
                    <span className="font-headline font-semibold text-[13.5px] sm:text-[17px] text-[var(--text-primary)] leading-snug group-hover:text-[var(--text-primary)]">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[var(--text-primary)] text-lg sm:text-xl font-mono shrink-0 ml-2 block"
                    >
                      +
                    </motion.span>
                  </motion.button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-[var(--text-muted)] text-[12.5px] sm:text-[14px] leading-relaxed border-t border-[var(--border-color)] pt-3 sm:pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
