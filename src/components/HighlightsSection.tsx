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
  // Set the homepage grid to display these 3 projects in this exact order:
  // 1. "Byrne Company"
  // 2. "Scott Carlson"
  // 3. "Rer Solutions"
  const featuredProjects = [
    PROJECTS.find(p => p.id === 'byrne-company'),
    PROJECTS.find(p => p.id === 'scott-carlson'),
    PROJECTS.find(p => p.id === 'rer-solutions'),
  ].filter((p): p is Project => !!p);

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
    <section id="projects" className="relative w-full bg-[var(--bg-primary)] text-[var(--text-primary)] py-14 sm:py-24 md:py-36 border-t border-[var(--border-color)] transition-colors duration-300 md:px-6">
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
              whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 400 } }}
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-1.5 text-[12.5px] sm:text-[14px] md:text-[15px] font-semibold text-[var(--text-primary)] hover:text-[var(--cta-bg)] group transition-colors cursor-pointer py-1"
            >
              <span>View All Projects</span>
              <motion.span>
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </div>

        {/* Featured 3 Projects Grid (Sequential wave entrance with staggerChildren) */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileTap={{ scale: 0.99, transition: { type: 'spring', stiffness: 400 } }}
              style={{
                willChange: 'transform, opacity',
                borderRadius: '24px',
              }}
              onClick={() => {
                if (project.id === 'hunter-real-estate-group') {
                  onNavigate('hunter-project');
                } else if (project.id === 'byrne-company') {
                  onNavigate('byrne-company');
                } else if (project.id === 'rer-solutions') {
                  onNavigate('rer-solutions');
                } else if (project.id === 'scott-carlson') {
                  onNavigate('scott-carlson');
                } else {
                  onSelectProject(project);
                }
              }}
              className="group project-card card-container relative w-full aspect-[16/9] md:aspect-[16/10] rounded-[24px] overflow-hidden cursor-pointer shadow-sm text-left border-0 bg-transparent"
            >
              {/* Photo as entire card (full-bleed) */}
              <motion.img
                src={project.heroImage}
                alt={project.name}
                whileTap={{ scale: 0.99, transition: { type: 'spring', stiffness: 400 } }}
                className="w-full h-full object-cover filter contrast-[1.06] card-image project-image scale-100 will-change-transform"
                loading="lazy"
              />
              
              {/* Subtle linear dark gradient overlay at bottom of the image */}
              <div 
                className="absolute inset-0 pointer-events-none z-10" 
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)',
                }}
              />

              {/* Project Title placed directly on top of gradient overlay at bottom-left */}
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7 pointer-events-none z-20">
                <h3 className="font-headline font-bold text-white text-[20px] md:text-[28px] leading-tight tracking-[-0.02em] drop-shadow-md truncate">
                  {project.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile / Tablet Bottom Link */}
        <div className="mt-8 text-center md:hidden">
          <motion.button
            whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 400 } }}
            onClick={() => onNavigate('projects')}
            className="w-full py-3 rounded-full bg-[var(--surface-card)] border border-[var(--border-color)] text-[var(--text-primary)] font-semibold text-[13px] hover:bg-[var(--bg-primary)] transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span>View All Projects</span>
            <motion.span>
              →
            </motion.span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};


