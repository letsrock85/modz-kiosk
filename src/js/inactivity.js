// ==================== INACTIVITY TIMER ====================
// Shows Screen Saver after 3 minutes of inactivity
// Hides Screen Saver on any touch/interaction

// Time in milliseconds (3 minutes = 180000ms)
const INACTIVITY_TIMEOUT = 5000;//= 3 * 60 * 1000;

let inactivityTimer = null;

// Reset the inactivity timer
function resetInactivityTimer() {
  // Clear existing timer
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
  }
  
  // Hide screen saver if it's showing (user interacted)
  if (window.ScreenSaver && ScreenSaver.isShowing()) {
    // Don't hide here - let screensaver handle its own clicks
    // Just reset timer for next inactivity
  }
  
  // Set new timer to show screen saver
  inactivityTimer = setTimeout(() => {
    showScreenSaver();
  }, INACTIVITY_TIMEOUT);
  
  // Debug: Log reset (remove in production)
  console.log('[Inactivity] Timer reset');
}

// Show screen saver
function showScreenSaver() {
  if (window.ScreenSaver) {
    ScreenSaver.show();
    console.log('[Inactivity] Screen saver triggered');
  } else {
    // Fallback if ScreenSaver not loaded
    console.warn('[Inactivity] ScreenSaver not available, going home');
    goToHome();
  }
}

// Fallback: go to home page
function goToHome() {
  // Check if we're already on home page
  if (window.location.pathname.endsWith('index.html') || 
      window.location.pathname === '/' ||
      window.location.pathname.endsWith('/')) {
    // Already home, just reload to reset state
    console.log('[Inactivity] Already on home, resetting...');
    window.location.reload();
  } else {
    // Navigate to home
    console.log('[Inactivity] Navigating to home...');
    window.location.href = 'index.html';
  }
}

// Initialize timer on page load
document.addEventListener('DOMContentLoaded', () => {
  resetInactivityTimer();
  
  // Reset timer on any user interaction
  const events = ['touchstart', 'touchmove', 'click', 'scroll', 'keydown'];
  events.forEach(event => {
    document.addEventListener(event, (e) => {
      // If screensaver is showing and user touches background, it handles itself
      // Otherwise just reset timer
      if (!window.ScreenSaver || !ScreenSaver.isShowing()) {
        resetInactivityTimer();
      }
    }, { passive: true });
  });
  
  console.log('[Inactivity] Initialized with', INACTIVITY_TIMEOUT / 1000, 'second timeout');
});

// For testing: expose functions
window.testScreenSaver = () => {
  console.log('[Test] Triggering screen saver...');
  showScreenSaver();
};

window.setTestTimeout = (seconds) => {
  console.log(`[Test] Setting timeout to ${seconds} seconds`);
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(showScreenSaver, seconds * 1000);
};

window.resetInactivityTimer = resetInactivityTimer;
