import React from 'react';
import { motion } from 'motion/react';
import { PageType, ModalType } from '../types';
import { GetGoLiveEmblem, GetGoLiveHeaderLogo } from './GetGoLiveLogo';

interface FooterSectionProps {
  onNavigate: (page: PageType) => void;
  onOpenModal: (modal: ModalType) => void;
  selectedPlan?: string;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onNavigate,
  onOpenModal,
}) => {
  return (
    <footer id="contact" className="relative w-full bg-[var(--bg-primary)] pt-12 sm:pt-18 md:pt-24 pb-8 sm:pb-12 border-t border-[var(--border-color)] overflow-hidden select-none transition-colors duration-300">
      <div className="w-full max-w-[680px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* TOP BRAND & CTA HEADER */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          {/* Logo Emblem + Wordmark */}
          <div className="flex items-center gap-2 mb-3">
            <GetGoLiveEmblem size={22} className="text-[var(--text-primary)]" />
            <GetGoLiveHeaderLogo className="text-[18px] sm:text-[20px]" />
          </div>

          {/* Subtitles & Main Prompt */}
          <p className="text-[var(--text-muted)] text-[12px] sm:text-[13px] font-normal mb-1 tracking-tight">
            Let's build something great.
          </p>
          <h2 className="font-headline font-bold text-[var(--text-primary)] text-[17px] sm:text-[22px] md:text-[24px] tracking-tight mb-4">
            Have a project in mind? Let's talk.
          </h2>

          {/* Solid High-Contrast Pill "Get in touch" Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onOpenModal('contact')}
            style={{
              backgroundColor: 'var(--text-primary)',
              color: 'var(--bg-primary)',
            }}
            className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-medium text-[11.5px] sm:text-[13px] cursor-pointer transition-all hover:opacity-90 active:scale-95 shadow-sm"
            aria-label="Get in touch"
          >
            Get in touch
          </motion.button>
        </div>

        {/* 2-COLUMN NAVIGATION & CONNECT LISTS (No container box) */}
        <div className="w-full grid grid-cols-2 gap-6 sm:gap-10 text-left pt-2 pb-8 sm:pb-10 border-b border-[var(--border-color)]">
          
          {/* Column 1: Navigation */}
          <div className="space-y-2">
            <h3 className="text-[11px] sm:text-[12px] font-medium text-[var(--text-muted)] tracking-wider uppercase">
              Navigation
            </h3>
            <ul className="space-y-1.5 text-[11.5px] sm:text-[13px] text-[var(--text-primary)] font-normal">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:opacity-70 transition-opacity cursor-pointer text-left py-0.5"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="hover:opacity-70 transition-opacity cursor-pointer text-left py-0.5"
                >
                  Selected Projects
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('process')}
                  className="hover:opacity-70 transition-opacity cursor-pointer text-left py-0.5"
                >
                  How We Work
                </button>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:opacity-70 transition-opacity cursor-pointer block py-0.5"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Connect */}
          <div className="space-y-2">
            <h3 className="text-[11px] sm:text-[12px] font-medium text-[var(--text-muted)] tracking-wider uppercase">
              Connect
            </h3>
            <ul className="space-y-1.5 text-[11.5px] sm:text-[13px] text-[var(--text-primary)] font-normal">
              <li>
                <a
                  href="mailto:founder@getgolive.io"
                  className="hover:opacity-70 transition-opacity cursor-pointer block py-0.5 break-all sm:break-normal"
                >
                  founder@getgolive.io
                </a>
              </li>
              <li>
                <a
                  href="tel:+18324630576"
                  className="hover:opacity-70 transition-opacity cursor-pointer block py-0.5"
                >
                  +1 (832) 463-0576
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/getgolive"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-70 transition-opacity cursor-pointer block py-0.5"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/getgolive"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-70 transition-opacity cursor-pointer block py-0.5"
                >
                  Instagram
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('contact')}
                  className="hover:opacity-70 transition-opacity cursor-pointer text-left py-0.5"
                >
                  Schedule a Call
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & LEGAL NOTICE */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-3 text-[10.5px] sm:text-[11.5px] text-[var(--text-muted)] text-center font-normal">
          <span>© 2026 GetGoLive Inc.</span>
          <button
            type="button"
            onClick={() => onOpenModal('contact')}
            className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            Legal notice
          </button>
        </div>

      </div>
    </footer>
  );
};
