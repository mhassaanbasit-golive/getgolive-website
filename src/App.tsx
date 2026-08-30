/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { PageType, ModalType, CaseStudy, ServiceDetail, Project } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IsometricMockupSection } from './components/IsometricMockupSection';
import { HighlightsSection } from './components/HighlightsSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { TrustSection } from './components/TrustSection';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { FooterSection } from './components/FooterSection';
import { ProcessPage } from './components/ProcessPage';
import { ProjectsPage } from './components/ProjectsPage';
import { HunterRealEstatePage } from './components/HunterRealEstatePage';
import { ByrneCompanyPage } from './components/ByrneCompanyPage';
import { ScottCarlsonPage } from './components/ScottCarlsonPage';
import { RerSolutionsPage } from './components/RerSolutionsPage';
import { Modals } from './components/Modals';
import { FullscreenMenu } from './components/FullscreenMenu';
import { AIChatAssistant } from './components/AIChatAssistant';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [previousPage, setPreviousPage] = useState<PageType>('home');
  const scrollPositions = useRef<Record<string, number>>({});
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [selectedPlanName, setSelectedPlanName] = useState<string>('');

  // Route Change Loading State
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  
  // Theme State: Default Light mode
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Lenis Smooth Scroll Integration (The Definition of Premium Framer Sites)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleNavigate = (page: PageType) => {
    if (page === currentPage) return;
    setIsRouteChanging(true);

    // Save the exact scroll position of the page we are currently leaving
    scrollPositions.current[currentPage] = window.scrollY;

    // Track list-to-detail page transitions so we can go back to either 'home' or 'projects'
    if (currentPage === 'home' || currentPage === 'projects') {
      setPreviousPage(currentPage);
    }

    // Immediately snap to 0 to prevent ugly content flicker during transitioning state
    window.scrollTo({ top: 0, behavior: 'instant' });

    setTimeout(() => {
      setCurrentPage(page);
      setIsRouteChanging(false);

      // Restore scroll position after a tiny timeout to allow DOM/Lenis to settle
      setTimeout(() => {
        const savedScroll = scrollPositions.current[page];
        if (savedScroll !== undefined && savedScroll > 50) {
          window.scrollTo({ top: savedScroll, behavior: 'smooth' });
        } else if (page === 'home' && ['hunter-project', 'byrne-company', 'rer-solutions', 'scott-carlson'].includes(currentPage)) {
          // If returning back home from a detail page and no saved scroll is high enough,
          // scroll directly to the #projects section so the user lands on target!
          const projectsSection = document.getElementById('projects');
          if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }, 120);
    }, 800);
  };

  const handleOpenModal = (modal: ModalType) => {
    setActiveModal(modal);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleSelectCaseStudy = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setActiveModal('case-study');
  };

  const handleSelectProject = (project: Project) => {
    if (project.id === 'hunter-real-estate-group') {
      handleNavigate('hunter-project');
      return;
    }
    if (project.id === 'byrne-company') {
      handleNavigate('byrne-company');
      return;
    }
    if (project.id === 'rer-solutions') {
      handleNavigate('rer-solutions');
      return;
    }
    if (project.id === 'scott-carlson') {
      handleNavigate('scott-carlson');
      return;
    }
    setSelectedProject(project);
    setActiveModal('project-detail');
  };

  const handleSelectService = (service: ServiceDetail) => {
    setSelectedService(service);
    setActiveModal('service');
  };

  const handleSelectPlan = (planName: string) => {
    setSelectedPlanName(planName);
    setActiveModal('contact');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-body selection:bg-white selection:text-black antialiased relative transition-colors duration-300">
      
      {/* B. The 3-Dot Loading Animation (Between Pages) */}
      <AnimatePresence>
        {isRouteChanging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-[#000000] flex items-center justify-center select-none"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 0.3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-[8px] h-[8px] bg-white rounded-full"
              />
              <motion.div
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 0.3, delay: 0.15, repeat: Infinity, ease: 'easeInOut' }}
                className="w-[8px] h-[8px] bg-white rounded-full"
              />
              <motion.div
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 0.3, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-[8px] h-[8px] bg-white rounded-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenModal={handleOpenModal}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="w-full">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Section 1: Hero */}
              <HeroSection />

              {/* Section 2: Isometric Mockup & Concept */}
              <IsometricMockupSection onOpenModal={handleOpenModal} />

              {/* Section 3: Services & Approach */}
              <div id="services-section">
                <ServicesSection
                  onSelectService={handleSelectService}
                  onOpenModal={handleOpenModal}
                />
              </div>

              {/* Section 4: Highlights / Featured Projects */}
              <HighlightsSection
                onSelectProject={handleSelectProject}
                onNavigate={handleNavigate}
              />

              {/* Section 5: The 3-Step Process */}
              <ProcessSection />

              {/* Section 6: Pricing Plans */}
              <PricingSection
                onSelectPlan={handleSelectPlan}
                onOpenModal={handleOpenModal}
              />

              {/* Section 7: Trust & Testimonials */}
              <TrustSection />

              {/* Section 8: FAQ Section */}
              <FaqSection />

              {/* Section 9: Footer & Contact */}
              <FooterSection
                onNavigate={handleNavigate}
                onOpenModal={handleOpenModal}
                selectedPlan={selectedPlanName}
              />
            </motion.div>
          )}

          {currentPage === 'process' && (
            <motion.div
              key="process"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Page 2: Process / How We Work */}
              <ProcessPage onOpenModal={handleOpenModal} />

              {/* Shared Footer & Contact */}
              <FooterSection
                onNavigate={handleNavigate}
                onOpenModal={handleOpenModal}
                selectedPlan={selectedPlanName}
              />
            </motion.div>
          )}

          {currentPage === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Page 3: Projects / Portfolio */}
              <ProjectsPage
                onSelectProject={handleSelectProject}
                onNavigate={handleNavigate}
                onOpenModal={handleOpenModal}
              />

              {/* Shared Footer & Contact */}
              <FooterSection
                onNavigate={handleNavigate}
                onOpenModal={handleOpenModal}
                selectedPlan={selectedPlanName}
              />
            </motion.div>
          )}

          {currentPage === 'hunter-project' && (
            <motion.div
              key="hunter-project"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <HunterRealEstatePage
                onNavigate={handleNavigate}
                onOpenModal={handleOpenModal}
                previousPage={previousPage}
              />
              <FooterSection
                onNavigate={handleNavigate}
                onOpenModal={handleOpenModal}
                selectedPlan={selectedPlanName}
              />
            </motion.div>
          )}

          {currentPage === 'byrne-company' && (
            <motion.div
              key="byrne-company"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <ByrneCompanyPage
                onNavigate={handleNavigate}
                onOpenModal={handleOpenModal}
                previousPage={previousPage}
              />
              <FooterSection
                onNavigate={handleNavigate}
                onOpenModal={handleOpenModal}
                selectedPlan={selectedPlanName}
              />
            </motion.div>
          )}

          {currentPage === 'rer-solutions' && (
            <motion.div
              key="rer-solutions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <RerSolutionsPage
                onNavigate={handleNavigate}
                onOpenModal={handleOpenModal}
                previousPage={previousPage}
              />
              <FooterSection
                onNavigate={handleNavigate}
                onOpenModal={handleOpenModal}
                selectedPlan={selectedPlanName}
              />
            </motion.div>
          )}

          {currentPage === 'scott-carlson' && (
            <motion.div
              key="scott-carlson"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <ScottCarlsonPage
                onNavigate={handleNavigate}
                onOpenModal={handleOpenModal}
                previousPage={previousPage}
              />
              <FooterSection
                onNavigate={handleNavigate}
                onOpenModal={handleOpenModal}
                selectedPlan={selectedPlanName}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Cinematic Fullscreen Navigation Menu */}
      <FullscreenMenu
        isOpen={activeModal === 'menu'}
        onClose={handleCloseModal}
        onNavigate={handleNavigate}
      />

      {/* Interactive Modals Container */}
      <Modals
        activeModal={activeModal}
        onClose={handleCloseModal}
        onNavigate={handleNavigate}
        selectedCaseStudy={selectedCaseStudy}
        selectedProject={selectedProject}
        selectedService={selectedService}
        selectedPlanName={selectedPlanName}
      />
      {/* AI Chat Assistant Widget */}
      <AIChatAssistant />
    </div>
  );
}
