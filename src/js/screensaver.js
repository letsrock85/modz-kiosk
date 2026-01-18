// ==================== SCREEN SAVER MODULE ====================
// Shows carousel of 4 brand slides after inactivity
// Auto-advances slides, stops on user interaction
// Click slide → go to catalog, click background → go home

const ScreenSaver = (function() {
  // Configuration
  const CONFIG = {
    autoplayDelay: 8000,        // 8 seconds between slides (comfortable viewing)
    autoplayResumeDelay: 30000, // 30 seconds to resume autoplay after user stops interacting
    slides: [
      { id: 'modz', image: 'assets/screensaver/screensaver_slide_1.jpg', catalog: 'modz' },
      { id: 'battery', image: 'assets/screensaver/screensaver_slide_2.jpg', catalog: 'modz-battery' },
      { id: 'motorcode', image: 'assets/screensaver/screensaver_slide_3.jpg', catalog: 'motorcode' },
      { id: 'ekt', image: 'assets/screensaver/screensaver_slide_4.jpg', catalog: 'ekt' }
    ]
  };

  let overlay = null;
  let swiper = null;
  let isActive = false;
  let autoplayStopped = false;

  // Create the overlay HTML structure
  function createOverlay() {
    if (overlay) return; // Already created

    overlay = document.createElement('div');
    overlay.className = 'screensaver-overlay';
    overlay.id = 'screensaverOverlay';

    overlay.innerHTML = `
      <div class="screensaver-container">
        <!-- Background click area -->
        <div class="screensaver-bg-click" id="screensaverBgClick"></div>
        
        <!-- Title -->
        <div class="screensaver-title">Tap to view more</div>
        
        <!-- Swiper carousel -->
        <div class="screensaver-swiper">
          <div class="swiper" id="screensaverSwiper">
            <div class="swiper-wrapper">
              ${CONFIG.slides.map(slide => `
                <div class="swiper-slide" data-catalog="${slide.catalog}">
                  <div class="screensaver-slide-card">
                    <img src="${slide.image}" alt="${slide.id}" 
                         onerror="this.style.background='#d9d9d9'; this.alt='${slide.id}';">
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        
        <!-- Navigation arrows (outside swiper, below slides) -->
        <div class="screensaver-nav-arrow prev" id="screensaverPrev">◀</div>
        <div class="screensaver-nav-arrow next" id="screensaverNext">▶</div>
        
        <!-- Pagination dots -->
        <div class="screensaver-pagination" id="screensaverPagination">
          ${CONFIG.slides.map((_, i) => `
            <div class="screensaver-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>
          `).join('')}
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    initSwiper();
    bindEvents();
    
    console.log('[ScreenSaver] Overlay created');
  }

  // Initialize Swiper for carousel
  function initSwiper() {
    swiper = new Swiper('#screensaverSwiper', {
      loop: false,  // No loop - we handle wrap manually
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 400,
      // Touch settings
      touchRatio: 1,
      simulateTouch: true,
      shortSwipes: true,
      longSwipes: true,
      threshold: 10,
      // No built-in pagination/navigation - we use custom
      pagination: false,
      navigation: false
    });

    // Update dots on slide change
    swiper.on('slideChange', updatePagination);
    swiper.on('slideChangeTransitionEnd', updatePagination);
    
    // Stop autoplay on user touch, start resume timer
    swiper.on('touchStart', () => {
      stopAutoplay();
    });
    
    // Start custom autoplay
    startAutoplayTimer();
  }
  
  // Custom autoplay timer (loops from last to first)
  let autoplayTimer = null;
  let autoplayResumeTimer = null;
  
  function startAutoplayTimer() {
    stopAutoplayTimer();
    autoplayTimer = setInterval(() => {
      if (swiper && isActive && !autoplayStopped) {
        if (swiper.activeIndex >= CONFIG.slides.length - 1) {
          // At last slide, go back to first
          swiper.slideTo(0);
        } else {
          swiper.slideNext();
        }
      }
    }, CONFIG.autoplayDelay);
  }
  
  function stopAutoplayTimer() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }
  
  // Start timer to resume autoplay after inactivity
  function startAutoplayResumeTimer() {
    stopAutoplayResumeTimer();
    autoplayResumeTimer = setTimeout(() => {
      if (isActive && autoplayStopped) {
        autoplayStopped = false;
        startAutoplayTimer();
        console.log('[ScreenSaver] Autoplay resumed after 30s inactivity');
      }
    }, CONFIG.autoplayResumeDelay);
  }
  
  function stopAutoplayResumeTimer() {
    if (autoplayResumeTimer) {
      clearTimeout(autoplayResumeTimer);
      autoplayResumeTimer = null;
    }
  }

  // Update pagination dots
  function updatePagination() {
    if (!swiper) return;
    
    const dots = document.querySelectorAll('#screensaverPagination .screensaver-dot');
    const realIndex = swiper.realIndex;
    
    console.log('[ScreenSaver] Updating pagination, realIndex:', realIndex, 'dots found:', dots.length);
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === realIndex);
    });
  }

  // Bind event listeners
  function bindEvents() {
    // Background/overlay click → go home (if not clicking on interactive elements)
    overlay.addEventListener('click', (e) => {
      // Only trigger if clicking directly on overlay or container (not on slides/arrows/dots)
      if (e.target === overlay || 
          e.target.classList.contains('screensaver-container') ||
          e.target.classList.contains('screensaver-title') ||
          e.target.classList.contains('screensaver-swiper')) {
        console.log('[ScreenSaver] Background clicked, going home');
        goHome();
      }
    });

    // Arrow navigation
    document.getElementById('screensaverPrev').addEventListener('click', (e) => {
      e.stopPropagation();
      swiper.slidePrev();
      stopAutoplay();
    });
    
    document.getElementById('screensaverNext').addEventListener('click', (e) => {
      e.stopPropagation();
      swiper.slideNext();
      stopAutoplay();
    });

    // Dot navigation
    document.querySelectorAll('.screensaver-dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(dot.dataset.index);
        swiper.slideToLoop(index);
        stopAutoplay();
      });
    });

    // Slide click → go to catalog (use event delegation for loop duplicates)
    const swiperEl = document.getElementById('screensaverSwiper');
    swiperEl.addEventListener('click', (e) => {
      // Find the slide element
      const slide = e.target.closest('.swiper-slide');
      if (slide) {
        e.stopPropagation();
        const catalog = slide.dataset.catalog;
        console.log('[ScreenSaver] Slide clicked, catalog:', catalog);
        if (catalog) {
          goToCatalog(catalog);
        }
      }
    });
  }

  // Stop autoplay and start resume timer
  function stopAutoplay() {
    if (!autoplayStopped) {
      autoplayStopped = true;
      console.log('[ScreenSaver] Autoplay stopped (user interaction)');
    }
    // Always restart the resume timer on interaction
    startAutoplayResumeTimer();
  }

  // Navigate to catalog with fade-out animation
  function goToCatalog(catalog) {
    console.log('[ScreenSaver] Going to catalog:', catalog);
    fadeOutAndNavigate(`viewer.html?catalog=${catalog}`);
  }

  // Go to home with fade-out animation
  function goHome() {
    console.log('[ScreenSaver] Going home');
    fadeOutAndNavigate('index.html');
  }
  
  // Navigate immediately, fade happens naturally during page load
  function fadeOutAndNavigate(url) {
    // Start fade-out animation
    if (overlay) {
      overlay.classList.add('fade-out');
      overlay.classList.remove('active');
    }
    
    isActive = false;
    stopAutoplayTimer();
    stopAutoplayResumeTimer();
    
    // Navigate immediately - new page will load while fade plays
    window.location.href = url;
  }

  // Show screen saver with fade-in animation
  function show() {
    if (isActive) return;
    
    createOverlay(); // Create if not exists
    
    // First show (display: flex), then trigger reflow, then fade in
    overlay.style.display = 'flex';
    overlay.offsetHeight; // Force reflow
    overlay.classList.add('active');
    overlay.classList.remove('fade-out');
    
    isActive = true;
    autoplayStopped = false;
    
    // Reset to first slide and restart autoplay
    if (swiper) {
      swiper.slideTo(0, 0);
    }
    startAutoplayTimer();
    updatePagination();
    
    console.log('[ScreenSaver] Shown with fade-in');
  }

  // Hide screen saver (instant, no animation)
  function hide() {
    if (!isActive || !overlay) return;
    
    overlay.classList.remove('active');
    overlay.classList.remove('fade-out');
    overlay.style.display = 'none';
    isActive = false;
    
    stopAutoplayTimer();
    stopAutoplayResumeTimer();
    
    console.log('[ScreenSaver] Hidden');
  }

  // Check if active
  function isShowing() {
    return isActive;
  }

  // Public API
  return {
    show,
    hide,
    isShowing,
    goHome,
    goToCatalog
  };
})();

// Export for global access
window.ScreenSaver = ScreenSaver;

