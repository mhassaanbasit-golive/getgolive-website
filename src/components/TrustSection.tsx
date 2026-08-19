import React from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data';

export const TrustSection: React.FC = () => {
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 150, damping: 35 },
    },
  };

  // Two identical sets of the same testimonial cards in sequence to create seamless infinite loop
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="relative w-full bg-[var(--bg-primary)] text-[var(--text-primary)] py-14 sm:py-24 md:py-36 border-t border-[var(--border-color)] overflow-hidden transition-colors duration-300">
      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-12 global-mobile-container mb-8 sm:mb-12">
        {/* Header row with headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-8">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            style={{ willChange: 'transform, opacity' }}
          >
            <h2 className="font-headline font-bold text-[var(--text-primary)] text-[clamp(1.35rem,4.5vw,2rem)] md:text-[clamp(3rem,6vw,5rem)] leading-[1.05] md:leading-[0.9] tracking-[-0.03em]">
              A partner you can trust.
            </h2>
          </motion.div>
        </div>
      </div>

      {/* 1. Outer Parent Container: overflow: hidden; position: relative; width: 100%; */}
      <div className="testimonial-marquee-outer relative w-full overflow-hidden py-2 select-none">
        {/* Soft edge gradient fades */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

        {/* 2. Inner sliding wrapper: display: flex; flex-wrap: nowrap; gap: 24px; width: max-content; */}
        <div className="testimonial-marquee-wrapper flex flex-row flex-nowrap gap-6 w-max">
          {duplicatedTestimonials.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="trust-card testimonial-card card w-[290px] sm:w-[380px] md:w-[420px] shrink-0 rounded-[18px] sm:rounded-[24px] p-5 sm:p-7 md:p-8 flex flex-col justify-between select-none"
            >
              {/* Quote text */}
              <p className="font-headline font-medium text-[var(--text-primary)] text-[13.5px] sm:text-[16px] md:text-[17px] leading-[1.45] tracking-tight mb-5 sm:mb-8">
                "{item.quote}"
              </p>

              {/* Author Footer */}
              <div className="flex items-center gap-3 sm:gap-3.5 pt-3 border-t border-[var(--border-color)]/60">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] text-[10px] sm:text-[11px] font-mono font-bold uppercase shrink-0">
                  {item.avatarInitials || item.author.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <span className="block font-semibold text-[var(--text-primary)] text-[12.5px] sm:text-[14px] truncate">
                    {item.author}
                  </span>
                  <span className="block text-[var(--text-muted)] text-[11px] sm:text-[12px] truncate">
                    {item.role}, {item.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
