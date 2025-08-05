/**
 * Scroll-based section visibility controller
 * Manages opacity transitions between sections based on viewport position
 */

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
 * Initialize all section visibility controllers
 * Call this function when the page loads
 */
export function initAllSectionVisibility() {
  // Single controller for quotes and demographics sections
  const visibilityController = throttle(() => {
    const heroSection = document.querySelector('[data-section="hero"] h2');
    const researchSection = document.querySelector('[data-section="research"]');
    const quotesSection = document.querySelector('[data-section="quotes"]');
    const demographicsSection = document.querySelector('[data-section="demographics"]');
    const additionalQuotesSection = document.querySelector('[data-section="additional-quotes"]');
    
    if (!heroSection || !quotesSection || !researchSection) return;
    
    const heroRect = heroSection.getBoundingClientRect();
    const researchRect = researchSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    const isHeroOutOfView = heroRect.bottom <= 0;
    const isResearchOutOfView = researchRect.bottom <= 0;
    
    // --- QUOTES SECTION LOGIC ---
    if (!isHeroOutOfView) {
      // Hero still in view - hide quotes
      quotesSection.style.opacity = '0';
      quotesSection.style.visibility = 'hidden';
      quotesSection.style.transition = 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out';
      console.log('Quotes hidden: hero still in view');
    } else {
      // Hero is out of view - calculate opacity based on research section position
      const researchTop = researchRect.top;
      let quotesOpacity;
      
      if (researchTop >= viewportHeight) {
        // Research section hasn't entered viewport yet - full opacity
        quotesOpacity = 1;
        console.log('Research not yet in view - quotes fully visible');
      } else {
        // Research section is entering or in viewport
        const halfViewport = viewportHeight / 2;
        const researchCoverage = Math.max(0, viewportHeight - researchTop);
        
        if (researchCoverage >= halfViewport) {
          // Research covers half or more of viewport - opacity 0
          quotesOpacity = 0;
          console.log('Research covers half+ of viewport - quotes hidden');
        } else {
          // Research covers less than half - fade from 1 to 0
          const coverageRatio = researchCoverage / halfViewport;
          quotesOpacity = 1 - coverageRatio;
          console.log(`Research covers ${(coverageRatio * 50).toFixed(1)}% of viewport - quotes opacity ${quotesOpacity.toFixed(3)}`);
        }
      }
      
      quotesSection.style.opacity = quotesOpacity.toString();
      quotesSection.style.visibility = quotesOpacity > 0 ? 'visible' : 'hidden';
      quotesSection.style.transition = 'opacity 0.1s linear, visibility 0.1s linear';
    }
    
    // --- DEMOGRAPHICS SECTION LOGIC ---
    if (demographicsSection) {
      if (!isResearchOutOfView) {
        // Research still in view - hide demographics
        demographicsSection.style.opacity = '0';
        demographicsSection.style.visibility = 'hidden';
        demographicsSection.style.transition = 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out';
        console.log('Demographics hidden: research still in view');
      } else {
        // Research is out of view - calculate opacity based on additional-quotes section position
        if (additionalQuotesSection) {
          const additionalQuotesRect = additionalQuotesSection.getBoundingClientRect();
          const additionalQuotesTop = additionalQuotesRect.top;
          let demographicsOpacity;
          
          if (additionalQuotesTop >= viewportHeight) {
            // Additional-quotes section hasn't entered viewport yet - full opacity
            demographicsOpacity = 1;
            console.log('Additional-quotes not yet in view - demographics fully visible');
          } else {
            // Additional-quotes section is entering or in viewport
            // Use a larger fade zone for slower fade (full viewport instead of half)
            const fullViewport = viewportHeight;
            const additionalQuotesCoverage = Math.max(0, viewportHeight - additionalQuotesTop);
            
            if (additionalQuotesCoverage >= fullViewport) {
              // Additional-quotes covers full viewport - opacity 0
              demographicsOpacity = 0;
              console.log('Additional-quotes covers full viewport - demographics hidden');
            } else {
              // Additional-quotes covers less than full viewport - fade from 1 to 0 slowly
              const coverageRatio = additionalQuotesCoverage / fullViewport;
              demographicsOpacity = 1 - coverageRatio;
              console.log(`Additional-quotes covers ${(coverageRatio * 100).toFixed(1)}% of viewport - demographics opacity ${demographicsOpacity.toFixed(3)}`);
            }
          }
          
          demographicsSection.style.opacity = demographicsOpacity.toString();
          demographicsSection.style.visibility = demographicsOpacity > 0 ? 'visible' : 'hidden';
          demographicsSection.style.transition = 'opacity 0.3s ease-out, visibility 0.3s ease-out'; // Slower transition
        } else {
          // No additional-quotes section found - keep demographics visible
          demographicsSection.style.opacity = '1';
          demographicsSection.style.visibility = 'visible';
          demographicsSection.style.transition = 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out';
        }
      }
    }
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
