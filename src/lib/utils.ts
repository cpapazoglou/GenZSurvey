/**
 * Scroll-based section visibility controller
 * Manages opacity transitions between sections based on viewport position
 */

import { SiteData } from '@/types/content';

interface ParallaxSection {
  main: string;
  previous?: string;
  next?: string;
}

/**
 * Load parallax sections from content data
 * @param contentData - The content data object
 * @returns Array of parallax sections from content.json
 */
function loadParallaxSections(contentData: SiteData): ParallaxSection[] {
  // Filter sections that have animation: "parallax"
  const parallaxSections = contentData.sections
    .filter(section => section.animation === 'parallax')
    .map(section => ({
      main: `[data-section="${section.id}"]`,
      // previous and next will be found dynamically if not specified
    }));
  
  return parallaxSections || [];
}

/**
 * Throttle function to limit the rate at which a function can fire
 * @param func - The function to throttle
 * @param limit - The number of milliseconds to limit
 * @returns The throttled function
 */
function throttle<T extends (...args: unknown[]) => void>(
  func: T, 
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return function(this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Find the previous and next data-section elements relative to a given element
 * @param currentElement - The element to find siblings for
 * @returns Object with previousSection and nextSection elements
 */
function findAdjacentSections(currentElement: HTMLElement): {
  previousSection: HTMLElement | null;
  nextSection: HTMLElement | null;
} {
  if (!currentElement) return { previousSection: null, nextSection: null };
  
  // Get all elements with data-section attribute
  const allSections = document.querySelectorAll('[data-section]');
  const sectionsArray = Array.from(allSections) as HTMLElement[];
  
  // Find the index of the current element
  const currentIndex = sectionsArray.findIndex(section => section === currentElement);
  
  if (currentIndex === -1) return { previousSection: null, nextSection: null };
  
  return {
    previousSection: currentIndex > 0 ? sectionsArray[currentIndex - 1] : null,
    nextSection: currentIndex < sectionsArray.length - 1 ? sectionsArray[currentIndex + 1] : null
  };
}

/**
 * Animate a single parallax section based on scroll position
 * @param mainElement - The main section element
 * @param previousElement - The previous section element (optional)
 * @param nextElement - The next section element (optional)
 * @param viewportHeight - Current viewport height
 */
function animateParallaxSection(
  mainElement: HTMLElement,
  previousElement: HTMLElement | null,
  nextElement: HTMLElement | null,
  viewportHeight: number
): void {
  if (!mainElement) return;
  
  // If previous or next elements are not provided, find them dynamically
  let actualPreviousElement = previousElement;
  let actualNextElement = nextElement;
  
  if (!actualPreviousElement || !actualNextElement) {
    const { previousSection, nextSection } = findAdjacentSections(mainElement);
    actualPreviousElement = actualPreviousElement || previousSection;
    actualNextElement = actualNextElement || nextSection;
  }
  
  if (!actualPreviousElement) {
    // No previous element - keep main element visible
    mainElement.style.opacity = '1';
    mainElement.style.visibility = 'visible';
    return;
  }
  
  const previousRect = actualPreviousElement.getBoundingClientRect();
  const isPreviousOutOfView = previousRect.bottom <= 0;
  
  if (!isPreviousOutOfView) {
    // Previous element still in view - hide main element
    mainElement.style.opacity = '0';
    mainElement.style.visibility = 'hidden';
  } else {
    // Main element is at least partially in viewport
    if (actualNextElement) {
      const nextRect = actualNextElement.getBoundingClientRect();
      const nextTop = nextRect.top;
      let mainOpacity;
      
      if (nextTop >= viewportHeight) {
        // Next element hasn't entered viewport yet - full opacity
        mainOpacity = 1;
      } else {
        // Next element is entering or in viewport
        const halfViewport = viewportHeight / 2;
        const nextCoverage = Math.max(0, viewportHeight - nextTop);
        
        if (nextCoverage >= halfViewport) {
          // Next element covers half or more of viewport - opacity 0
          mainOpacity = 0;
        } else {
          // Next element covers less than half - fade from 1 to 0
          const coverageRatio = nextCoverage / halfViewport;
          mainOpacity = 1 - coverageRatio;
        }
      }

      mainElement.style.opacity = mainOpacity.toString();
      mainElement.style.visibility = mainOpacity > 0 ? 'visible' : 'hidden';
    } else {
      // No next element found - keep main element visible
      mainElement.style.opacity = '1';
      mainElement.style.visibility = 'visible';
    }
  }
}

/**
 * Initialize all section visibility controllers
 * Call this function when the page loads
 * @param contentData - The content data object containing sections
 * @returns Cleanup function
 */
export function initAllSectionVisibility(contentData: SiteData): { cleanup: () => void } {
  // Load parallax sections from content data
  const parallaxSections = loadParallaxSections(contentData);
  
  // Single controller for all parallax sections
  const visibilityController = throttle(() => {
    const viewportHeight = window.innerHeight;
    
    // Process each parallax section
    parallaxSections.forEach(section => {
      const mainElement = document.querySelector(section.main) as HTMLElement;
      const previousElement = section.previous ? document.querySelector(section.previous) as HTMLElement : null;
      const nextElement = section.next ? document.querySelector(section.next) as HTMLElement : null;
      
      if (mainElement) {
        animateParallaxSection(mainElement, previousElement, nextElement, viewportHeight);
      }
    });
  }, 16);
  
  // Initialize scroll listener
  window.addEventListener('scroll', visibilityController);
  visibilityController(); // Run once on init
  
  // Return cleanup function
  return {
    cleanup: () => {
      window.removeEventListener('scroll', visibilityController);
    }
  };
}
