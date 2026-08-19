import React from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../data';
import { Project, PageType } from '../types';
import { ProjectCard } from './ProjectCard';

interface ProjectsPageProps {
  onSelectProject: (project: Project) => void;
  onNavigate: (page: PageType) => void;
  onOpenModal: (modal: 'contact' | 'concept') => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onSelectProject,
  onNavigate,
  onOpenModal,
}) => {
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

  return (
    <div className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen pt-20 pb-16 sm:pt-28 sm:pb-28 md:pt-36 md:pb-36 transition-colors duration-300">
      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Navigation Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-[var(--border-color)]">
          <motion.button
            whileHover={{ x: -4, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
            whileTap={{ scale: 0.95, transition: { type: 'spring', stiffness: 400 } }}
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 font-sans font-medium text-[13px] sm:text-[14px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer group"
          >
            <span>←</span>
            <span>Back to home</span>
          </motion.button>
        </div>

        {/* Hero Section of Projects Page */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-8 mb-8 sm:mb-16 md:mb-20">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            style={{ willChange: 'transform, opacity' }}
            className="lg:w-2/3"
          >
            <h1 className="font-headline font-bold text-[clamp(1.35rem,4.5vw,2rem)] md:text-[clamp(2.8rem,6vw,5.5rem)] leading-[1.05] md:leading-[0.92] tracking-[-0.03em] text-[var(--text-primary)]">
              All projects.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 35, delay: 0.1 }}
            style={{ willChange: 'transform, opacity' }}
            className="lg:w-1/3 lg:text-right"
          >
            <p className="text-[var(--text-muted)] text-[12.5px] sm:text-[15px] md:text-[16px] leading-[1.55]">
              A selection of custom websites, MLS showcases, and lead systems built for real estate firms.
            </p>
          </motion.div>
        </div>

        {/* 9 Projects Grid: 3-column (desktop), 2-column (tablet), 1-column (mobile) */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 md:gap-8"
        >
          {PROJECTS.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
              index={idx}
            />
          ))}
        </motion.div>

        {/* Bottom CTA Banner for Portfolio Page */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{ willChange: 'transform, opacity' }}
          className="card spotlight-card mt-12 sm:mt-20 md:mt-28 p-5 sm:p-8 md:p-12 rounded-[18px] sm:rounded-[24px] bg-[var(--surface-card)] border border-[var(--border-color)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 shadow-xl"
        >
          <div className="max-w-xl">
            <h2 className="font-headline font-bold text-lg sm:text-2xl md:text-3xl text-[var(--text-primary)] mb-1.5 sm:mb-2">
              Ready to modernize your firm's website?
            </h2>
            <p className="text-[var(--text-muted)] text-[12.5px] sm:text-[15px]">
              We deliver your complete redesign in 7 guaranteed days with zero downtime.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full md:w-auto">
            <motion.button
              whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
              whileTap={{ scale: 0.95, transition: { type: 'spring', stiffness: 400 } }}
              onClick={() => onOpenModal('concept')}
              className="magnetic-btn w-full sm:w-auto px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--text-primary)] text-[var(--text-primary)] font-semibold text-[12.5px] sm:text-[14px] cursor-pointer whitespace-nowrap shadow-sm"
            >
              Get Free Concept
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
              whileTap={{ scale: 0.95, transition: { type: 'spring', stiffness: 400 } }}
              onClick={() => onOpenModal('contact')}
              className="magnetic-btn w-full sm:w-auto px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full bg-[var(--cta-bg)] text-[var(--cta-text)] font-semibold text-[12.5px] sm:text-[14px] cursor-pointer whitespace-nowrap shadow-md"
            >
              Contact Us →
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
