/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
import { HunterProjectPage } from './components/HunterProjectPage';
import { Modals } from './components/Modals';
import { FullscreenMenu } from './components/FullscreenMenu';
import { AIChatAssistant } from './components/AIChatAssistant';
import { initScrollReveal } from './utils/scrollReveal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [selectedPlanName, setSelectedPlanName] = useState<string>('');
  
  // Theme State: Default Light mode as requested in Phase 1
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

  // Apple-Style Animations: Scroll tracking for Parallax & Global Scroll Reveal
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const cleanupReveal = initScrollReveal();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cleanupReveal();
    };
  }, [currentPage]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HunterProjectPage
                onNavigate={handleNavigate}
                onOpenModal={handleOpenModal}
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
