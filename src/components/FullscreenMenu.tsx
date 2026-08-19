import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageType } from '../types';

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageType) => void;
}

interface MenuItem {
  id: string;
  label: string;
  action: () => void;
  delay: number;
  className: string;
}

export const FullscreenMenu: React.FC<FullscreenMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when fullscreen menu is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const menuItems: MenuItem[] = [
    {
      id: 'home',
      label: 'Home Page',
      delay: 0.1,
      className: 'menu-link-1',
      action: () => {
        onNavigate('home');
        onClose();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 'process',
      label: 'How We Work',
      delay: 0.2,
      className: 'menu-link-2',
      action: () => {
        onNavigate('process');
        onClose();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 'projects',
      label: 'Projects & Portfolio',
      delay: 0.3,
      className: 'menu-link-3',
      action: () => {
        onNavigate('projects');
        onClose();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 'pricing',
      label: 'Pricing & Retainer',
      delay: 0.4,
      className: 'menu-link-4',
      action: () => {
        onNavigate('home');
        onClose();
        setTimeout(() => {
          document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      },
    },
    {
      id: 'contact',
      label: 'Contact & Consultation',
      delay: 0.5,
      className: 'menu-link-5',
      action: () => {
        onClose();
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      },
    },
  ];

  const linkVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 220,
        damping: 30,
        delay: (index + 1) * 0.05,
      },
    }),
    exit: (index: number) => ({
      opacity: 0,
      y: 30,
      transition: {
        type: 'spring',
        stiffness: 220,
        damping: 30,
        delay: (4 - index) * 0.04,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="fullscreen-menu-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { type: 'spring', stiffness: 200, damping: 30, delay: 0.35 },
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 30, duration: 0.3 }}
          style={{
            willChange: 'transform, opacity, backdrop-filter',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }}
          onClick={onClose}
          className="fixed inset-0 z-[999] w-screen h-screen overflow-hidden flex flex-col justify-center"
          aria-modal="true"
          role="dialog"
          aria-label="Navigation Menu"
        >
          {/* Close Button (✕) */}
          <motion.button
            key="menu-close-btn"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.85,
              transition: { type: 'spring', stiffness: 200, damping: 30, delay: 0.3 },
            }}
            whileHover={{ scale: 1.08, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
            whileTap={{ scale: 0.92, transition: { type: 'spring', stiffness: 400 } }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 35,
              delay: 0.15,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close menu"
            className="magnetic-btn absolute top-4 right-4 md:top-8 md:right-8 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/40 text-white hover:bg-white hover:text-black transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center cursor-pointer z-50 group focus:outline-none select-none shadow-lg"
          >
            <span className="text-[15px] sm:text-[18px] md:text-[20px] leading-none font-normal group-hover:rotate-90 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] font-body">
              ✕
            </span>
          </motion.button>

          {/* Menu Links Container: Left-aligned, Vertically Centered */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-12 flex flex-col justify-center"
            style={{ paddingLeft: 'clamp(20px, 4vw, 64px)' }}
          >
            <nav className="flex flex-col gap-1.5 sm:gap-3 md:gap-4 items-start">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  custom={index}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ x: 10, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
                  whileTap={{ scale: 0.95, transition: { type: 'spring', stiffness: 400 } }}
                  onClick={(e) => {
                    e.preventDefault();
                    item.action();
                  }}
                  className="menu-nav-link group relative block text-left cursor-pointer focus:outline-none py-1 select-none w-auto"
                >
                  <span
                    style={{
                      fontWeight: 600,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.15,
                    }}
                    className="font-headline font-semibold text-[clamp(1.3rem,4.2vw,1.8rem)] sm:text-[clamp(1.8rem,5vw,2.5rem)] md:text-[clamp(2.8rem,5.5vw,5.5rem)] text-white group-hover:text-white/60 transition-colors duration-300 ease-out inline-block"
                  >
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
