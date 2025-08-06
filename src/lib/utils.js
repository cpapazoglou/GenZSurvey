/**
 * Scroll-based section visibility controller
 * Manages opacity transitions between sections based on viewport position
 */

/**
 * Load parallax sections from content data
 * @param {Object} contentData - The content data object
 * @returns {Array} Array of parallax sections from content.json
 */
function loadParallaxSections(contentData) {
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
 * @param {Function} func - The function to throttle
 * @param {number} limit - The number of milliseconds to limit
 * @returns {Function} The throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Find the previous and next data-section elements relative to a given element
 * @param {HTMLElement} currentElement - The element to find siblings for
 * @returns {Object} Object with previousSection and nextSection elements
 */
function findAdjacentSections(currentElement) {
  if (!currentElement) return { previousSection: null, nextSection: null };
  
  // Get all elements with data-section attribute
  const allSections = document.querySelectorAll('[data-section]');
  const sectionsArray = Array.from(allSections);
  
  // Find the index of the current element
  const currentIndex = sectionsArray.findIndex(section => section === currentElement);
  
  if (currentIndex === -1) return { previousSection: null, nextSection: null };
  
  return {
    previousSection: currentIndex > 0 ? sectionsArray[currentIndex - 1] : null,
    nextSection: currentIndex < sectionsArray.length - 1 ? sectionsArray[currentIndex + 1] : null
  };
}

/**
 * Manipulate opacity and visibility of a main element based on previous and next elements
 * @param {HTMLElement} mainElement - The element to animate
 * @param {HTMLElement} previousElement - The element that triggers the animation when it goes out of view
 * @param {HTMLElement} nextElement - The element that causes the main element to fade out
 * @param {number} viewportHeight - Current viewport height
 */
function animateParallaxSection(mainElement, previousElement, nextElement, viewportHeight) {
  if (!mainElement) return;
  
  // If previous or next elements are not provided, find them dynamically
  if (!previousElement || !nextElement) {
    const { previousSection, nextSection } = findAdjacentSections(mainElement);
    previousElement = previousElement || previousSection;
    nextElement = nextElement || nextSection;
  }
  
  if (!previousElement) {
    // No previous element - keep main element visible
    mainElement.style.opacity = '1';
    mainElement.style.visibility = 'visible';
    return;
  }
  
  const previousRect = previousElement.getBoundingClientRect();
  const isPreviousOutOfView = previousRect.bottom <= 0;
  
  if (!isPreviousOutOfView) {
    // Previous element still in view - hide main element
    mainElement.style.opacity = '0';
    mainElement.style.visibility = 'hidden';
    console.log(`${mainElement.dataset.section} hidden: ${previousElement.dataset.section || 'previous element'} still in view`);
  } else {
    // Previous element is out of view - calculate opacity based on next element position
    if (nextElement) {
      const nextRect = nextElement.getBoundingClientRect();
      const nextTop = nextRect.top;
      let mainOpacity;
      
      if (nextTop >= viewportHeight) {
        // Next element hasn't entered viewport yet - full opacity
        mainOpacity = 1;
        console.log(`${nextElement.dataset.section || 'next element'} not yet in view - ${mainElement.dataset.section} fully visible`);
      } else {
        // Next element is entering or in viewport
        const halfViewport = viewportHeight / 2;
        const nextCoverage = Math.max(0, viewportHeight - nextTop);
        
        if (nextCoverage >= halfViewport) {
          // Next element covers half or more of viewport - opacity 0
          mainOpacity = 0;
          console.log(`${nextElement.dataset.section || 'next element'} covers half+ of viewport - ${mainElement.dataset.section} hidden`);
        } else {
          // Next element covers less than half - fade from 1 to 0
          const coverageRatio = nextCoverage / halfViewport;
          mainOpacity = 1 - coverageRatio;
          console.log(`${nextElement.dataset.section || 'next element'} covers ${(coverageRatio * 100).toFixed(1)}% of viewport - ${mainElement.dataset.section} opacity ${mainOpacity.toFixed(3)}`);
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
 * @param {Object} contentData - The content data object containing sections
 */
export function initAllSectionVisibility(contentData) {
  // Load parallax sections from content data
  const ParallaxSections = loadParallaxSections(contentData);
  
  // Single controller for all parallax sections
  const visibilityController = throttle(() => {
    const viewportHeight = window.innerHeight;
    
    // Process each parallax section
    ParallaxSections.forEach(section => {
      const mainElement = document.querySelector(section.main);
      const previousElement = section.previous ? document.querySelector(section.previous) : null;
      const nextElement = section.next ? document.querySelector(section.next) : null;
      
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
