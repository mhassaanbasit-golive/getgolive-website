/**
 * Global Scroll Reveal & Animation Controller
 * Integrates IntersectionObserver, Spotlight mouse-tracking, Magnetic buttons, and Parallax.
 */

import { initAnimationSystem } from './animations';

export function initScrollReveal(): () => void {
  return initAnimationSystem();
}
