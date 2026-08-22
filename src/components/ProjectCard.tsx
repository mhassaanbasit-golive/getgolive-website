import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, index = 0 }) => {
  const [imageError, setImageError] = useState(false);

  // Staggered wave entry: 0s, 0.1s, 0.2s, 0.3s
  const staggerDelay = (index % 4) * 0.1;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 35,
        delay: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -6, scale: 1.01, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
      whileTap={{ scale: 0.97, transition: { type: 'spring', stiffness: 400 } }}
      onClick={() => onSelect(project)}
      style={{
        willChange: 'transform, opacity',
      }}
      className="group project-card card spotlight-card card-container relative flex flex-col justify-between bg-[var(--surface-card)] rounded-[18px] sm:rounded-[20px] p-4 sm:p-6 border border-[var(--border-color)] hover:border-[var(--text-muted)]/40 shadow-sm cursor-pointer overflow-hidden text-left"
    >
      {/* Editorial Photo Container with Smooth 1.0 -> 1.05 Zoom */}
      <div
        className="w-full aspect-[16/10] rounded-[12px] sm:rounded-[14px] overflow-hidden mb-3.5 sm:mb-5 relative bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center"
        style={imageError ? { background: project.gradient || 'linear-gradient(135deg, #18181b 0%, #27272a 100%)' } : undefined}
      >
        {!imageError ? (
          <motion.img
            src={project.heroImage}
            alt={project.name}
            onError={() => setImageError(true)}
            whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
            whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 400 } }}
            className="w-full h-full object-cover filter contrast-[1.06] card-image project-image will-change-transform"
            loading="lazy"
          />
        ) : (
          <motion.div
            whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
            whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 400 } }}
            className="w-full h-full p-4 sm:p-6 flex flex-col justify-between card-image project-image will-change-transform"
          >
            <span className="card-label-font font-sans font-medium text-[11px] tracking-[0.08em] uppercase text-white/50">PROJECT FLAGSHIP</span>
            <span className="font-headline font-bold text-white text-base sm:text-xl tracking-tight leading-tight">{project.name}</span>
          </motion.div>
        )}
        
        {/* Subtle Dark Linear Gradient Scrim on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-50 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />



        {/* Hover Label (Fade + Slide): View Project Pill */}
        <div className="card-hover-element hover-pill absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 pointer-events-none">
          <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/95 dark:bg-black/90 text-black dark:text-white backdrop-blur-md card-label-font font-sans font-medium text-[11px] tracking-[0.08em] uppercase shadow-lg border border-white/20">
            View Project ↗
          </span>
        </div>
      </div>

      {/* Card Content & Footer */}
      <div className="flex items-end justify-between gap-3 sm:gap-4 pt-1">
        <div className="min-w-0 flex-1">
          <h3 className="font-headline font-bold text-[var(--text-primary)] text-[16px] sm:text-[20px] md:text-[22px] leading-tight tracking-[-0.02em] group-hover:opacity-90 transition-opacity truncate">
            {project.name}
          </h3>
        </div>

        {/* Bottom-Right Corner Arrow Icon translates translateX(6px) on hover */}
        <div className="card-arrow-circle w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-primary)] shrink-0 group-hover:bg-[var(--cta-bg)] group-hover:text-[var(--cta-text)] group-hover:border-[var(--cta-bg)] shadow-sm">
          <span className="text-xs sm:text-sm font-mono card-arrow arrow-icon block">
            →
          </span>
        </div>
      </div>
    </motion.div>
  );
};


