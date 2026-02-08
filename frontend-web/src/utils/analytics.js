// Google Analytics / LogRocket Integration

export const initAnalytics = () => {
  // Google Analytics
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: window.location.hash
    });
  }
  
  // LogRocket
  if (typeof window !== 'undefined' && typeof LogRocket !== 'undefined') {
    LogRocket.init('app-id');
  }

  console.log('Analytics initialized');
};

export const trackEvent = (category, action, label) => {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }

  console.log(`Event tracked: ${category} - ${action} - ${label}`);
};

export const trackPageView = (path) => {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path
    });
  }

  console.log(`Page view tracked: ${path}`);
};
