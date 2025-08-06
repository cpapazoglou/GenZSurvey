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
    const educationSalaryParadoxSection = document.querySelector('[data-section="education-salary-paradox"]');
    const employmentNumbersSection = document.querySelector('[data-section="employment-numbers"]');
    const expectationsSection = document.querySelector('[data-section="expectations-section"]');
    const strategicResilienceSection = document.querySelector('[data-section="strategic-resilience"]');
    const livingAtHomeSection = document.querySelector('[data-section="living-at-home-section"]');
    const emigrationQuotesSection = document.querySelector('[data-section="emigration-quotes"]');
    const fastFuriousSection = document.querySelector('[data-section="fast-furious-section"]');
    
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
    
    // --- EDUCATION-SALARY-PARADOX SECTION LOGIC ---
    if (educationSalaryParadoxSection) {
      // Find the section that comes before education-salary-paradox to determine when to show it
      // Based on the content structure, it should be visible after employment-numbers is out of view
      const employmentNumbersRect = employmentNumbersSection ? employmentNumbersSection.getBoundingClientRect() : null;
      const isEmploymentNumbersOutOfView = employmentNumbersRect ? employmentNumbersRect.bottom <= 0 : true;
      
      if (!isEmploymentNumbersOutOfView && employmentNumbersSection) {
        // Employment-numbers still in view - hide education-salary-paradox
        educationSalaryParadoxSection.style.opacity = '0';
        educationSalaryParadoxSection.style.visibility = 'hidden';
        educationSalaryParadoxSection.style.transition = 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out';
        console.log('Education-salary-paradox hidden: employment-numbers still in view');
      } else {
        // Employment-numbers is out of view - calculate opacity based on expectations section position
        if (expectationsSection) {
          const expectationsRect = expectationsSection.getBoundingClientRect();
          const expectationsTop = expectationsRect.top;
          let educationSalaryParadoxOpacity;
          
          if (expectationsTop >= viewportHeight) {
            // Expectations section hasn't entered viewport yet - full opacity
            educationSalaryParadoxOpacity = 1;
            console.log('Expectations not yet in view - education-salary-paradox fully visible');
          } else {
            // Expectations section is entering or in viewport
            // Use a larger fade zone for slower fade (full viewport instead of half)
            const fullViewport = viewportHeight;
            const expectationsCoverage = Math.max(0, viewportHeight - expectationsTop);
            
            if (expectationsCoverage >= fullViewport) {
              // Expectations covers full viewport - opacity 0
              educationSalaryParadoxOpacity = 0;
              console.log('Expectations covers full viewport - education-salary-paradox hidden');
            } else {
              // Expectations covers less than full viewport - fade from 1 to 0 slowly
              const coverageRatio = expectationsCoverage / fullViewport;
              educationSalaryParadoxOpacity = 1 - coverageRatio;
              console.log(`Expectations covers ${(coverageRatio * 100).toFixed(1)}% of viewport - education-salary-paradox opacity ${educationSalaryParadoxOpacity.toFixed(3)}`);
            }
          }
          
          educationSalaryParadoxSection.style.opacity = educationSalaryParadoxOpacity.toString();
          educationSalaryParadoxSection.style.visibility = educationSalaryParadoxOpacity > 0 ? 'visible' : 'hidden';
          educationSalaryParadoxSection.style.transition = 'opacity 0.3s ease-out, visibility 0.3s ease-out'; // Slower transition
        } else {
          // No expectations section found - keep education-salary-paradox visible
          educationSalaryParadoxSection.style.opacity = '1';
          educationSalaryParadoxSection.style.visibility = 'visible';
          educationSalaryParadoxSection.style.transition = 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out';
        }
      }
    }
    
    // --- STRATEGIC-RESILIENCE SECTION LOGIC ---
    if (strategicResilienceSection) {
      // Strategic-resilience should be visible after expectations-section is out of view
      const expectationsRect = expectationsSection ? expectationsSection.getBoundingClientRect() : null;
      const isExpectationsOutOfView = expectationsRect ? expectationsRect.bottom <= 0 : true;
      
      if (!isExpectationsOutOfView && expectationsSection) {
        // Expectations still in view - hide strategic-resilience
        strategicResilienceSection.style.opacity = '0';
        strategicResilienceSection.style.visibility = 'hidden';
        strategicResilienceSection.style.transition = 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out';
        console.log('Strategic-resilience hidden: expectations still in view');
      } else {
        // Expectations is out of view - calculate opacity based on living-at-home section position
        if (livingAtHomeSection) {
          const livingAtHomeRect = livingAtHomeSection.getBoundingClientRect();
          const livingAtHomeTop = livingAtHomeRect.top;
          let strategicResilienceOpacity;
          
          if (livingAtHomeTop >= viewportHeight) {
            // Living-at-home section hasn't entered viewport yet - full opacity
            strategicResilienceOpacity = 1;
            console.log('Living-at-home not yet in view - strategic-resilience fully visible');
          } else {
            // Living-at-home section is entering or in viewport
            // Use a larger fade zone for slower fade (full viewport instead of half)
            const fullViewport = viewportHeight;
            const livingAtHomeCoverage = Math.max(0, viewportHeight - livingAtHomeTop);
            
            if (livingAtHomeCoverage >= fullViewport) {
              // Living-at-home covers full viewport - opacity 0
              strategicResilienceOpacity = 0;
              console.log('Living-at-home covers full viewport - strategic-resilience hidden');
            } else {
              // Living-at-home covers less than full viewport - fade from 1 to 0 slowly
              const coverageRatio = livingAtHomeCoverage / fullViewport;
              strategicResilienceOpacity = 1 - coverageRatio;
              console.log(`Living-at-home covers ${(coverageRatio * 100).toFixed(1)}% of viewport - strategic-resilience opacity ${strategicResilienceOpacity.toFixed(3)}`);
            }
          }
          
          strategicResilienceSection.style.opacity = strategicResilienceOpacity.toString();
          strategicResilienceSection.style.visibility = strategicResilienceOpacity > 0 ? 'visible' : 'hidden';
          strategicResilienceSection.style.transition = 'opacity 0.3s ease-out, visibility 0.3s ease-out'; // Slower transition
        } else {
          // No living-at-home section found - keep strategic-resilience visible
          strategicResilienceSection.style.opacity = '1';
          strategicResilienceSection.style.visibility = 'visible';
          strategicResilienceSection.style.transition = 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out';
        }
      }
    }
    
    // --- EMIGRATION-QUOTES SECTION LOGIC ---
    if (emigrationQuotesSection) {
      // Emigration-quotes should be visible after living-at-home-section is out of view
      const livingAtHomeRect = livingAtHomeSection ? livingAtHomeSection.getBoundingClientRect() : null;
      const isLivingAtHomeOutOfView = livingAtHomeRect ? livingAtHomeRect.bottom <= 0 : true;
      
      if (!isLivingAtHomeOutOfView && livingAtHomeSection) {
        // Living-at-home still in view - hide emigration-quotes
        emigrationQuotesSection.style.opacity = '0';
        emigrationQuotesSection.style.visibility = 'hidden';
        emigrationQuotesSection.style.transition = 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out';
        console.log('Emigration-quotes hidden: living-at-home still in view');
      } else {
        // Living-at-home is out of view - calculate opacity based on fast-furious section position
        if (fastFuriousSection) {
          const fastFuriousRect = fastFuriousSection.getBoundingClientRect();
          const fastFuriousTop = fastFuriousRect.top;
          let emigrationQuotesOpacity;
          
          if (fastFuriousTop >= viewportHeight) {
            // Fast-furious section hasn't entered viewport yet - full opacity
            emigrationQuotesOpacity = 1;
            console.log('Fast-furious not yet in view - emigration-quotes fully visible');
          } else {
            // Fast-furious section is entering or in viewport
            // Use a larger fade zone for slower fade (full viewport instead of half)
            const fullViewport = viewportHeight;
            const fastFuriousCoverage = Math.max(0, viewportHeight - fastFuriousTop);
            
            if (fastFuriousCoverage >= fullViewport) {
              // Fast-furious covers full viewport - opacity 0
              emigrationQuotesOpacity = 0;
              console.log('Fast-furious covers full viewport - emigration-quotes hidden');
            } else {
              // Fast-furious covers less than full viewport - fade from 1 to 0 slowly
              const coverageRatio = fastFuriousCoverage / fullViewport;
              emigrationQuotesOpacity = 1 - coverageRatio;
              console.log(`Fast-furious covers ${(coverageRatio * 100).toFixed(1)}% of viewport - emigration-quotes opacity ${emigrationQuotesOpacity.toFixed(3)}`);
            }
          }
          
          emigrationQuotesSection.style.opacity = emigrationQuotesOpacity.toString();
          emigrationQuotesSection.style.visibility = emigrationQuotesOpacity > 0 ? 'visible' : 'hidden';
          emigrationQuotesSection.style.transition = 'opacity 0.3s ease-out, visibility 0.3s ease-out'; // Slower transition
        } else {
          // No fast-furious section found - keep emigration-quotes visible
          emigrationQuotesSection.style.opacity = '1';
          emigrationQuotesSection.style.visibility = 'visible';
          emigrationQuotesSection.style.transition = 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out';
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
