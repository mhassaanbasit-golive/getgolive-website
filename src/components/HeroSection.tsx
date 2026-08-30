import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const HeroSection: React.FC = () => {
  const [typedText, setTypedText] = useState<string>('');

  /* TEXT CYCLE ANIMATION */
  useEffect(() => {
    const texts = [
      "We Make Websites.",
      "Websites that book leads.",
      "Websites that answer queries while you are away.",
      "Websites that match your reputation.",
      "Exclusively for Real Estate Firms."
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    function typeEffect() {
      const currentText = texts[textIndex];
      let typeSpeed = 100;

      if (isDeleting) {
        charIndex--;
        setTypedText(currentText.substring(0, charIndex));
        typeSpeed = 50;
      } else {
        charIndex++;
        setTypedText(currentText.substring(0, charIndex));
        typeSpeed = 100;
      }

      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
      }

      timeoutId = setTimeout(typeEffect, typeSpeed);
    }

    timeoutId = setTimeout(typeEffect, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden flex flex-col justify-between pt-28 md:pt-32 pb-12 select-none transition-colors duration-300">
      {/* Subtle soft white-to-black radial gradient originating from bottom-left corner */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(150,150,150,0.12)_0%,_transparent_65%)] pointer-events-none" />

      {/* Main Animated Headline (Center) */}
      <div className="hero-container relative z-10 w-full px-4 sm:px-6 md:px-12 my-auto global-mobile-container text-center py-6 sm:py-12 md:py-20">
        <div className="max-w-[1400px] mx-auto flex justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 35 }}
            style={{ willChange: 'transform, opacity' }}
            className="w-full text-center"
          >
            <h1
              id="hero-animated-text"
              className="font-headline font-normal text-[var(--text-primary)] text-[clamp(1.4rem,5vw,2.25rem)] md:text-[clamp(3rem,7vw,6rem)] leading-[1.08] md:leading-[1] tracking-[-0.02em] inline-block text-center max-w-5xl mx-auto"
            >
              <span>{typedText}</span>
              <span className="inline-block font-light text-[var(--text-primary)] animate-pulse ml-1">|</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Middle Spacer for Spatial Balance */}
      <div className="flex-1 min-h-[60px] sm:min-h-[120px] md:min-h-[220px]" />

      {/* Bottom Row Labels */}
      <div className="relative z-20 w-full px-5 sm:px-8 md:px-12 mb-6 sm:mb-8 global-mobile-container">
        <div className="max-w-[1800px] mx-auto flex justify-end items-end text-[var(--text-muted)] text-[12px] sm:text-[14px] leading-[1.6]">
          {/* Bottom Right Scroll Cue */}
          <motion.a
            href="#mockup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 35, delay: 0.25 }}
            whileHover={{ y: 3, transition: { type: "spring", stiffness: 300, damping: 30 } }}
            style={{ willChange: 'transform, opacity' }}
            className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer group"
          >
            <span>Scroll to explore</span>
            <span className="text-[11px] sm:text-[12px] group-hover:translate-y-1 transition-transform duration-300">↓</span>
          </motion.a>
        </div>
      </div>

      {/* The Giant Background Wordmark (Perfectly Centered & Scaled Vector) */}
      <div className="giant-wordmark-container parallax-wordmark absolute bottom-0 inset-x-0 w-full h-[20vh] sm:h-[30vh] md:h-[40vh] overflow-hidden pointer-events-none flex items-end justify-center z-0 px-2 sm:px-6 opacity-40">
        <svg
          viewBox="0 0 1000 150"
          className="w-full h-auto max-w-full block select-none pointer-events-none filter drop-shadow-2xl mx-auto"
          preserveAspectRatio="xMidYBottom meet"
        >
          <defs>
            <linearGradient id="wordmark-grad-hero" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--wordmark-start)" stopOpacity="0.95" />
              <stop offset="55%" stopColor="var(--wordmark-mid)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--wordmark-end)" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <text
            x="500"
            y="125"
            textAnchor="middle"
            style={{
              fontSize: '145px',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              fill: 'url(#wordmark-grad-hero)',
              fontFamily: "'Inter Tight', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
            }}
          >
            GETGOLIVE
          </text>
        </svg>
      </div>
    </section>
  );
};
