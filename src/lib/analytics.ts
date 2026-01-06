import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel
const MIXPANEL_TOKEN = '1aa4299359bfd7b57a31eff981984d91';

if (typeof window !== 'undefined') {
  try {
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: false, // Disable debug mode to reduce console noise
      track_pageview: true,
      persistence: 'localStorage',
      ignore_dnt: true, // Ignore Do Not Track
    });
  } catch (error) {
    // Silently fail if Mixpanel can't be initialized
    console.warn('Mixpanel initialization failed:', error);
  }
}

// Helper to get user IP address
async function getUserIP(): Promise<string | null> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Failed to get user IP:', error);
    return null;
  }
}

// Helper to get session ID
function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

// Analytics functions
export const analytics = {
  // Track page view
  async trackPageView(pageName: string, properties?: Record<string, any>) {
    if (typeof window === 'undefined') return;

    try {
      const userIP = await getUserIP();
      const sessionId = getOrCreateSessionId();

      const eventProperties = {
        page_name: pageName,
        page_url: window.location.href,
        page_path: window.location.pathname,
        referrer: document.referrer,
        user_ip: userIP,
        session_id: sessionId,
        timestamp: new Date().toISOString(),
        ...properties,
      };

      mixpanel.track('Page View', eventProperties);

      // Also track to Meta Pixel if available
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'PageView', eventProperties);
      }
    } catch (error) {
      // Silently fail - analytics should not break the app
      console.debug('Analytics tracking failed:', error);
    }
  },

  // Track document view
  async trackDocumentView(documentData: {
    documentName: string;
    documentId: string;
    documentCategory?: string;
    price?: number;
  }) {
    if (typeof window === 'undefined') return;

    try {
      const userIP = await getUserIP();
      const sessionId = getOrCreateSessionId();

      const eventProperties = {
        document_name: documentData.documentName,
        document_id: documentData.documentId,
        document_category: documentData.documentCategory,
        price: documentData.price,
        page_url: window.location.href,
        user_ip: userIP,
        session_id: sessionId,
        timestamp: new Date().toISOString(),
      };

      mixpanel.track('Document Viewed', eventProperties);

      // Meta Pixel - ViewContent event
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'ViewContent', {
          content_name: documentData.documentName,
          content_category: documentData.documentCategory,
          content_ids: [documentData.documentId],
          content_type: 'product',
          value: documentData.price,
          currency: 'INR',
        });
      }
    } catch (error) {
      // Silently fail - analytics should not break the app
      console.debug('Analytics tracking failed:', error);
    }
  },

  // Track form redirect (when user clicks "Get Draft" button)
  async trackFormRedirect(documentData: {
    documentName: string;
    documentId: string;
    documentCategory?: string;
    price: number;
    formUrl: string;
  }) {
    if (typeof window === 'undefined') return;

    try {
      const userIP = await getUserIP();
      const sessionId = getOrCreateSessionId();

      const eventProperties = {
        document_name: documentData.documentName,
        document_id: documentData.documentId,
        document_category: documentData.documentCategory,
        price: documentData.price,
        form_url: documentData.formUrl,
        source_url: window.location.href,
        user_ip: userIP,
        session_id: sessionId,
        timestamp: new Date().toISOString(),
      };

      mixpanel.track('Form Redirect', eventProperties);

      // Meta Pixel - InitiateCheckout event
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'InitiateCheckout', {
          content_name: documentData.documentName,
          content_category: documentData.documentCategory,
          content_ids: [documentData.documentId],
          content_type: 'product',
          value: documentData.price,
          currency: 'INR',
        });
      }
    } catch (error) {
      // Silently fail - analytics should not break the app
      console.debug('Analytics tracking failed:', error);
    }
  },

  // Track search
  async trackSearch(searchQuery: string, resultsCount: number) {
    if (typeof window === 'undefined') return;

    try {
      const userIP = await getUserIP();
      const sessionId = getOrCreateSessionId();

      const eventProperties = {
        search_query: searchQuery,
        results_count: resultsCount,
        page_url: window.location.href,
        user_ip: userIP,
        session_id: sessionId,
        timestamp: new Date().toISOString(),
      };

      mixpanel.track('Search', eventProperties);

      // Meta Pixel - Search event
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Search', {
          search_string: searchQuery,
        });
      }
    } catch (error) {
      // Silently fail - analytics should not break the app
      console.debug('Analytics tracking failed:', error);
    }
  },

  // Track category view
  async trackCategoryView(categoryName: string, documentCount: number) {
    if (typeof window === 'undefined') return;

    try {
      const userIP = await getUserIP();
      const sessionId = getOrCreateSessionId();

      const eventProperties = {
        category_name: categoryName,
        document_count: documentCount,
        page_url: window.location.href,
        user_ip: userIP,
        session_id: sessionId,
        timestamp: new Date().toISOString(),
      };

      mixpanel.track('Category Viewed', eventProperties);

      // Meta Pixel
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'ViewContent', {
          content_name: categoryName,
          content_type: 'category',
        });
      }
    } catch (error) {
      // Silently fail - analytics should not break the app
      console.debug('Analytics tracking failed:', error);
    }
  },

  // Identify user (optional - for logged in users)
  identifyUser(userId: string, traits?: Record<string, any>) {
    if (typeof window === 'undefined') return;

    try {
      mixpanel.identify(userId);
      if (traits) {
        mixpanel.people.set(traits);
      }
    } catch (error) {
      console.debug('Analytics user identification failed:', error);
    }
  },

  // Set user properties
  setUserProperties(properties: Record<string, any>) {
    if (typeof window === 'undefined') return;

    try {
      mixpanel.people.set(properties);
    } catch (error) {
      console.debug('Analytics user properties update failed:', error);
    }
  },
};
