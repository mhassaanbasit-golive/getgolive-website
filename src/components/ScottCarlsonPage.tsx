import React from 'react';
import { motion } from 'motion/react';
import { ModalType, PageType } from '../types';

const scottHeroImg = 'https://res.cloudinary.com/cyfb9slf/image/upload/v1788039436/scott-carlson-case-study-image.png';
const scottMobileImg = 'https://res.cloudinary.com/cyfb9slf/image/upload/v1788039432/scott-carlson-mobile-mockup.png';
const scottBotImg = 'https://res.cloudinary.com/cyfb9slf/image/upload/v1788039433/scott-carlson-bot-image.png';

interface ScottCarlsonPageProps {
  onNavigate: (page: PageType) => void;
  onOpenModal: (modal: ModalType) => void;
  previousPage?: PageType;
}

export const ScottCarlsonPage: React.FC<ScottCarlsonPageProps> = ({ onNavigate, onOpenModal, previousPage = 'home' }) => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-24 sm:pt-32 pb-32 px-6 sm:px-10 md:px-16">
      <div className="max-w-[900px] mx-auto space-y-24 sm:space-y-32">
        
        {/* Back navigation */}
        <div>
          <motion.button
            whileHover={{ x: -4, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigate(previousPage)}
            className="inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <span>← Back to Portfolio</span>
          </motion.button>
        </div>

        {/* SECTION 1: THE HERO */}
        <section className="space-y-8">
          <h1 className="font-headline font-bold text-[clamp(2.5rem,6vw,4.5rem)] tracking-[-0.03em] leading-[1.05]">
            Scott Carlson
          </h1>

          <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[24px] overflow-hidden">
            <img
              src={scottHeroImg}
              alt="Scott Carlson Hero"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-[17px] sm:text-[21px] text-[var(--text-muted)] font-normal leading-[1.6] max-w-3xl">
            Licensed luxury real estate broker with over 40 years of experience (since 1985). Specializing in architecturally significant properties in Lakewood and Old East Dallas. Filmmaker with 40+ short films and author of a weekly cultural email blog reaching 12,000+ global subscribers.
          </p>
        </section>

        {/* SECTION 2: THE TRANSFORMATION */}
        <section className="space-y-8 pt-8 border-t border-[var(--border-color)]">
          <div className="space-y-4 max-w-3xl">
            <h2 className="font-headline font-bold text-[28px] sm:text-[36px] tracking-[-0.02em]">
              The Results
            </h2>
            <p className="text-[16px] sm:text-[20px] text-[var(--text-muted)] font-normal leading-[1.6]">
              We replaced their old site. It loads fast, works on phones, and looks professional.
            </p>
          </div>

          <div className="space-y-6 pt-4 max-w-2xl">
            <div className="flex items-start">
              <p className="text-[17px] sm:text-[20px] font-medium text-[var(--text-primary)] leading-[1.5]">
                Loads in under one second.
              </p>
            </div>
            <div className="flex items-start">
              <p className="text-[17px] sm:text-[20px] font-medium text-[var(--text-primary)] leading-[1.5]">
                Looks great on mobile.
              </p>
            </div>
            <div className="flex items-start">
              <p className="text-[17px] sm:text-[20px] font-medium text-[var(--text-primary)] leading-[1.5]">
                Easy for clients to find.
              </p>
            </div>
          </div>

          {/* Framed Phone Mockup Image */}
          <div className="flex justify-center my-[60px]">
            <div className="w-full max-w-[320px] bg-[var(--surface-card)] rounded-[28px] p-4 border border-[var(--border-color)] shadow-2xl">
              <div className="w-full aspect-[9/16] rounded-[20px] overflow-hidden bg-black">
                <img
                  src={scottMobileImg}
                  alt="Scott Carlson Mobile Mockup"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE AI ASSISTANT */}
        <section className="space-y-8 pt-8 border-t border-[var(--border-color)]">
          <div className="space-y-4 max-w-3xl">
            <h2 className="font-headline font-bold text-[28px] sm:text-[36px] tracking-[-0.02em]">
              The AI Assistant
            </h2>
            <p className="text-[16px] sm:text-[20px] text-[var(--text-muted)] font-normal leading-[1.6]">
              They also got a custom AI assistant trained on their exact listings.
            </p>
          </div>

          {/* AI Chatbot Image (Uncropped / Natural Aspect Ratio) */}
          <div className="w-full max-w-[800px] mx-auto my-6 rounded-[24px] overflow-hidden bg-[var(--surface-card)] border border-[var(--border-color)] p-2 sm:p-4 shadow-xl">
            <img
              src={scottBotImg}
              alt="Scott Carlson Bot Interface"
              className="w-full h-auto object-contain rounded-[16px]"
            />
          </div>

          <div className="space-y-6 pt-4 max-w-2xl">
            <div className="flex items-start">
              <p className="text-[17px] sm:text-[20px] font-medium text-[var(--text-primary)] leading-[1.5]">
                Answers questions 24 hours a day.
              </p>
            </div>
            <div className="flex items-start">
              <p className="text-[17px] sm:text-[20px] font-medium text-[var(--text-primary)] leading-[1.5]">
                Qualifies buyers instantly.
              </p>
            </div>
            <div className="flex items-start">
              <p className="text-[17px] sm:text-[20px] font-medium text-[var(--text-primary)] leading-[1.5]">
                Uses their exact property data.
              </p>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA BUTTON */}
        <div className="pt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 250, damping: 25 } }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onOpenModal('concept')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-black font-semibold text-[16px] px-10 py-5 rounded-full shadow-xl cursor-pointer group hover:bg-neutral-100 transition-colors"
          >
            <span>Request a concept like this</span>
            <motion.span
              whileHover={{ x: 6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              →
            </motion.span>
          </motion.button>
        </div>

      </div>
    </div>
  );
};
