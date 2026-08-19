import React from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../data';
import { Project, PageType } from '../types';

interface HighlightsSectionProps {
  onSelectProject: (project: Project) => void;
  onNavigate: (page: PageType) => void;
}

export const HighlightsSection: React.FC<HighlightsSectionProps> = ({
  onSelectProject,
  onNavigate,
}) => {
  // Homepage features exactly 2 of the 9 projects
  const featuredProjects = PROJECTS.slice(0, 2);

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
    <section id="projects" className="relative w-full bg-[var(--bg-primary)] text-[var(--text-primary)] py-14 sm:py-24 md:py-36 border-t border-[var(--border-color)] transition-colors duration-300">
      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-12 global-mobile-container">
        {/* Header Row with Staggered Typography Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-8 sm:mb-12 md:mb-16">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            style={{ willChange: 'transform, opacity' }}
            className="md:w-1/2"
          >
            <h2 className="font-headline font-bold text-[var(--text-primary)] text-[clamp(1.35rem,4.5vw,2rem)] md:text-[clamp(2.8rem,6vw,5.2rem)] leading-[1.05] md:leading-[0.92] tracking-[-0.03em]">
              Selected projects.
            </h2>
          </motion.div>

          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            style={{ willChange: 'transform, opacity' }}
            className="md:w-1/2 flex flex-col md:items-end gap-3 sm:gap-4"
          >
            <p className="text-[var(--text-muted)] text-[13px] sm:text-[15px] md:text-[16px] leading-[1.55] md:text-right max-w-md">
              Custom websites and lead systems built for premier real estate firms across the US.
            </p>
            
            {/* View All Projects CTA */}
            <motion.button
              whileHover={{ x: 4, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
              whileTap={{ scale: 0.95, transition: { type: 'spring', stiffness: 400 } }}
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-1.5 text-[12.5px] sm:text-[14px] md:text-[15px] font-semibold text-[var(--text-primary)] hover:text-[var(--cta-bg)] group transition-colors cursor-pointer py-1"
            >
              <span>View All Projects</span>
              <motion.span
                whileHover={{ x: 6, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </div>

        {/* Featured 2 Projects Grid (Sequential wave entrance with staggerChildren) */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8"
        >
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.01, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
              whileTap={{ scale: 0.97, transition: { type: 'spring', stiffness: 400 } }}
              style={{
                willChange: 'transform, opacity',
              }}
              onClick={() => onSelectProject(project)}
              className="group project-card card-container relative flex flex-col justify-between bg-[var(--surface-card)] rounded-[18px] sm:rounded-[20px] p-5 sm:p-7 border border-[var(--border-color)] hover:border-[var(--text-muted)]/40 shadow-sm cursor-pointer overflow-hidden text-left"
            >
              {/* Photo Container with Smooth 1.0 -> 1.05 Zoom */}
              <div className="w-full aspect-[16/10] bg-[var(--bg-primary)] rounded-[12px] sm:rounded-[14px] overflow-hidden mb-4 sm:mb-6 relative border border-[var(--border-color)]">
                <motion.img
                  src={project.heroImage}
                  alt={project.name}
                  whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
                  whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 400 } }}
                  className="w-full h-full object-cover filter contrast-[1.06] card-image project-image scale-100 will-change-transform"
                  loading="lazy"
                />
                
                {/* Subtle Linear Dark Gradient Scrim on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-50 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

                {/* City Tag Badge */}
                <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/90 card-label-font font-sans font-medium text-[11px] tracking-[0.08em] uppercase">
                  {project.city}
                </div>

                {/* Hover Label (Fade + Slide): View Project Pill */}
                <div className="card-hover-element hover-pill absolute bottom-2.5 left-2.5 sm:bottom-3.5 sm:left-3.5 pointer-events-none">
                  <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/95 dark:bg-black/90 text-black dark:text-white backdrop-blur-md card-label-font font-sans font-medium text-[11px] tracking-[0.08em] uppercase shadow-lg border border-white/20">
                    View Project ↗
                  </span>
                </div>
              </div>

              {/* Card Footer Row */}
              <div className="flex items-end justify-between gap-3 sm:gap-4 pt-1">
                <div className="min-w-0 flex-1">
                  <h3 className="font-headline font-bold text-[var(--text-primary)] text-[18px] sm:text-[22px] md:text-[26px] leading-tight tracking-[-0.02em] group-hover:opacity-90 transition-opacity truncate">
                    {project.name}
                  </h3>
                  <p className="font-body text-[12px] sm:text-[14px] text-[var(--text-muted)] mt-1 truncate">
                    {project.city}
                  </p>
                </div>

                {/* Bottom-Right Arrow Icon translates translateX(6px) on hover */}
                <div className="card-arrow-circle w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-primary)] shrink-0 group-hover:bg-[var(--cta-bg)] group-hover:text-[var(--cta-text)] group-hover:border-[var(--cta-bg)] shadow-sm">
                  <span className="text-xs sm:text-base font-mono card-arrow arrow-icon block">
                    →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile / Tablet Bottom Link */}
        <div className="mt-8 text-center md:hidden">
          <motion.button
            whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
            whileTap={{ scale: 0.95, transition: { type: 'spring', stiffness: 400 } }}
            onClick={() => onNavigate('projects')}
            className="w-full py-3 rounded-full bg-[var(--surface-card)] border border-[var(--border-color)] text-[var(--text-primary)] font-semibold text-[13px] hover:bg-[var(--bg-primary)] transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span>View All 9 Projects</span>
            <motion.span
              whileHover={{ x: 6, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
            >
              →
            </motion.span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};


