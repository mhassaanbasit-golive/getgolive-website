import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, index = 0 }) => {
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
      className="group project-card relative w-full aspect-[16/9] md:aspect-[16/10] rounded-[16px] overflow-hidden cursor-pointer shadow-md text-left border-0 bg-transparent"
    >
      {/* Full-bleed Photo */}
      <motion.img
        src={project.heroImage}
        alt={project.name}
        whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
        whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 400 } }}
        className="w-full h-full object-cover filter contrast-[1.06] card-image project-image scale-100 will-change-transform"
        loading="lazy"
      />
      
      {/* Subtle linear dark gradient overlay at bottom of the image */}
      <div 
        className="absolute inset-0 pointer-events-none z-10" 
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 60%)',
        }}
      />

      {/* Project Title placed directly on top of gradient overlay at bottom-left */}
      <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 pointer-events-none z-20">
        <h3 className="font-headline font-bold text-white text-[18px] sm:text-[22px] md:text-[24px] leading-tight tracking-[-0.02em] drop-shadow-md truncate">
          {project.name}
        </h3>
      </div>
    </motion.div>
  );
};


