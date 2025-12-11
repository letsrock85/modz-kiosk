// Inactivity Timer - Returns to home after 10 minutes of inactivity
// Time in milliseconds (10 minutes = 600000ms)
const INACTIVITY_TIMEOUT = 10 * 60 * 1000;

let inactivityTimer = null;

function resetInactivityTimer() {
  // Clear existing timer
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
  }
  
  // Set new timer
  inactivityTimer = setTimeout(() => {
    goToHome();
  }, INACTIVITY_TIMEOUT);
  
  // Debug: Log reset (remove in production)
  console.log('Inactivity timer reset');
}

function goToHome() {
  // Check if we're already on home page
  if (window.location.pathname.endsWith('index.html') || 
      window.location.pathname === '/' ||
      window.location.pathname.endsWith('/')) {
    // Already home, just reload to reset state
    console.log('Already on home, resetting...');
    window.location.reload();
  } else {
    // Navigate to home
    console.log('Navigating to home due to inactivity...');
    window.location.href = 'index.html';
  }
}

// Initialize timer on page load
document.addEventListener('DOMContentLoaded', () => {
  resetInactivityTimer();
  
  // Reset timer on any user interaction
  const events = ['touchstart', 'touchmove', 'click', 'scroll', 'keydown'];
  events.forEach(event => {
    document.addEventListener(event, resetInactivityTimer, { passive: true });
  });
});

// For testing: expose function to manually trigger timeout
window.testInactivityReset = () => {
  console.log('Testing inactivity reset...');
  goToHome();
};

// For testing: set shorter timeout
window.setTestTimeout = (seconds) => {
  console.log(`Setting test timeout to ${seconds} seconds`);
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(goToHome, seconds * 1000);
};

