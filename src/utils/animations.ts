/**
 * Modern Vanilla JS & CSS Animation Controller
 * Implements:
 * 1. IntersectionObserver scroll entrance system with spring-like bezier curves
 * 2. Mouse-tracking spotlight cards with --mouse-x / --mouse-y CSS variables
 * 3. Magnetic buttons with elastic snap-back (cubic-bezier(0.34, 1.56, 0.64, 1))
 * 4. Big text parallax on scroll for "GETGOLIVE" wordmarks
 */

export function initAnimationSystem(): () => void {
  const cleanups: Array<() => void> = [];

  // ============================================================================
  // 1. INTERSECTION OBSERVER FOR SCROLL ENTRANCES
  // ============================================================================
  const setupIntersectionObserver = () => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const observeElements = () => {
      const selectors = [
        '.reveal-on-scroll',
        '.reveal-card',
        '.section-title',
        '.card-container',
        '.project-card',
        '.service-card',
        '.pricing-card',
        '.trust-card',
        '.form-card',
        '.faq-item',
        '.process-step-card',
      ];

      const elements = document.querySelectorAll(selectors.join(', '));
      elements.forEach((el) => {
        // Check if already in viewport
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('visible');
        } else {
          revealObserver.observe(el);
        }
      });
    };

    // Run initially and after DOM settles
    observeElements();
    const timeoutId = setTimeout(observeElements, 200);

    cleanups.push(() => {
      clearTimeout(timeoutId);
      revealObserver.disconnect();
    });
  };

  // ============================================================================
  // 2. MOUSE-TRACKING SPOTLIGHT CARDS
  // ============================================================================
  const setupSpotlightCards = () => {
    const cardSelectors = [
      '.card',
      '.spotlight-card',
      '.project-card',
      '.service-card',
      '.pricing-card',
      '.trust-card',
      '.form-card',
      '.card-container',
      '.hover-lift',
    ];

    const cards = document.querySelectorAll<HTMLElement>(cardSelectors.join(', '));
    const cardListeners: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    cards.forEach((card) => {
      // Skip dynamic expanding cards to completely prevent layout-thrashing getBoundingClientRect calls during height transitions
      if (
        card.classList.contains('service-card') ||
        card.classList.contains('process-step-card') ||
        card.closest('#faq') ||
        card.closest('#services-section') ||
        card.closest('#process-section')
      ) {
        return;
      }

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      };

      const handleMouseLeave = () => {
        card.style.setProperty('--mouse-x', `-999px`);
        card.style.setProperty('--mouse-y', `-999px`);
      };

      card.addEventListener('mousemove', handleMouseMove, { passive: true });
      card.addEventListener('mouseleave', handleMouseLeave, { passive: true });

      cardListeners.push({ el: card, move: handleMouseMove, leave: handleMouseLeave });
    });

    cleanups.push(() => {
      cardListeners.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      });
    });
  };

  // ============================================================================
  // 3. MAGNETIC BUTTONS (Header, CTAs, Modals, Assistant)
  // ============================================================================
  const setupMagneticButtons = () => {
    const buttonSelectors = [
      '.magnetic-btn',
      'button.magnetic',
      'a.magnetic',
      '.btn-magnetic',
      'nav button',
      'nav a',
      '.chat-pill-trigger',
      '.modal-cta-btn',
    ];

    const buttons = document.querySelectorAll<HTMLElement>(buttonSelectors.join(', '));
    const buttonListeners: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    buttons.forEach((btn) => {
      let isHovered = false;

      const handleMouseMove = (e: MouseEvent) => {
        isHovered = true;
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        // Max 15px distance pull with smooth spring dampening
        const maxDist = 15;
        const pullFactor = 0.35;
        const moveX = Math.max(-maxDist, Math.min(maxDist, deltaX * pullFactor));
        const moveY = Math.max(-maxDist, Math.min(maxDist, deltaY * pullFactor));

        btn.style.transition = 'transform 0.15s cubic-bezier(0.22, 1, 0.36, 1)';
        btn.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      };

      const handleMouseLeave = () => {
        if (!isHovered) return;
        isHovered = false;
        // Buttery-smooth deceleration snap back using cubic-bezier(0.22, 1, 0.36, 1)
        btn.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
        btn.style.transform = 'translate3d(0px, 0px, 0)';
      };

      btn.addEventListener('mousemove', handleMouseMove, { passive: true });
      btn.addEventListener('mouseleave', handleMouseLeave, { passive: true });

      buttonListeners.push({ el: btn, move: handleMouseMove, leave: handleMouseLeave });
    });

    cleanups.push(() => {
      buttonListeners.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      });
    });
  };

  // ============================================================================
  // 4. BIG TEXT PARALLAX ("GETGOLIVE" BACKGROUND WORDMARKS)
  // ============================================================================
  const setupBigTextParallax = () => {
    const wordmarks = document.querySelectorAll<HTMLElement>('.parallax-wordmark, .giant-wordmark-container');
    if (!wordmarks.length) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);

          wordmarks.forEach((el) => {
            const rect = el.getBoundingClientRect();
            // Parallax factor: moves slightly slower than scroll speed
            const relativeOffset = (rect.top - window.innerHeight / 2) * 0.12;
            el.style.transform = `translate3d(0, ${relativeOffset}px, 0)`;
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial trigger

    cleanups.push(() => {
      window.removeEventListener('scroll', onScroll);
    });
  };

  // Run all systems
  setupIntersectionObserver();
  setupSpotlightCards();
  setupMagneticButtons();
  setupBigTextParallax();

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}
