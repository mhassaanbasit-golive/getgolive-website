import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Menu } from 'lucide-react';
import { PageType, ModalType } from '../types';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenModal: (modal: ModalType) => void;
  darkLogo?: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenModal,
  theme,
  toggleTheme,
}) => {
  const [scrolled, setScrolled] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'nav-scrolled py-3 sm:py-3.5' : 'bg-transparent py-4 sm:py-5 md:py-6'
      }`}
    >
      <div className="grid grid-cols-3 items-center w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        {/* Left Column: Logo (Always GetGoLive text everywhere) */}
        <div className="flex items-center justify-start min-w-0">
          <motion.button
            whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400 } }}
            onClick={() => onNavigate('home')}
            className="flex items-center cursor-pointer group focus:outline-none select-none shrink-0"
            aria-label="GetGoLive Home"
          >
            <span className="font-bold font-headline text-[17px] sm:text-[19px] md:text-[20px] tracking-tight whitespace-nowrap text-[var(--text-primary)] group-hover:opacity-80 transition-opacity">
              GetGoLive
            </span>
          </motion.button>
        </div>

        {/* Center Column: Floating Glass Nav Pill (Always Perfectly Centered & Aligned) */}
        <div className="flex items-center justify-center">
          <div className="h-[34px] sm:h-[38px] md:h-[40px] bg-[var(--nav-bg)] backdrop-blur-[14px] border border-[var(--border-color)] px-3 sm:px-4 rounded-full flex items-center justify-center gap-2 sm:gap-3 shadow-md shrink-0 transition-all duration-300">
            {/* Left Side: [ Menu ] */}
            <motion.button
              whileHover={{ scale: 1.04, transition: { type: "spring", stiffness: 300, damping: 30 } }}
              whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 400 } }}
              onClick={() => onOpenModal('menu')}
              className="magnetic-btn inline-flex items-center justify-center gap-1.5 sm:gap-2 text-[12px] sm:text-[13px] md:text-[14px] font-medium text-[var(--text-primary)] cursor-pointer group leading-none select-none py-1"
              aria-label="Open navigation menu"
            >
              <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--text-primary)] shrink-0" />
              <span className="tracking-tight font-medium">Menu</span>
            </motion.button>

            {/* Micro vertical divider */}
            <div className="w-[1px] h-3.5 sm:h-4 bg-[var(--border-color)] opacity-70 shrink-0" />

            {/* Right Side: Circular Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              whileTap={{ scale: 0.9, transition: { type: "spring", stiffness: 400 } }}
              onClick={toggleTheme}
              className="magnetic-btn w-[22px] h-[22px] sm:w-[24px] sm:h-[24px] rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center cursor-pointer overflow-hidden shrink-0 shadow-sm"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <motion.div
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="flex items-center justify-center"
              >
                {theme === 'light' ? (
                  <Sun className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[var(--text-primary)]" />
                ) : (
                  <Moon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[var(--text-primary)]" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Right Column: Solid CTA Pill Button */}
        <div className="flex items-center justify-end min-w-0">
          <motion.button
            whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 30 } }}
            whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 400 } }}
            onClick={() => onOpenModal('contact')}
            className="magnetic-btn h-[34px] sm:h-[38px] md:h-[40px] bg-[var(--cta-bg)] text-[var(--cta-text)] font-semibold text-[12px] sm:text-[13px] md:text-[14px] px-3.5 sm:px-5 md:px-6 rounded-full cursor-pointer shadow-md flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap leading-none"
          >
            <span className="hidden sm:inline text-xs font-bold">+</span>
            <span className="hidden sm:inline">Get in touch</span>
            <span className="sm:hidden">Contact</span>
          </motion.button>
        </div>
      </div>
    </nav>
  );
};
