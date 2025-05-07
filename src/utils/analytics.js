export const trackVote = async (raceId, voteType) => {
  try {
    const getScreenSize = () => {
      if (typeof window !== 'undefined' && window.screen) {
        return `${window.screen.width}x${window.screen.height}`;
      }
      return 'test'; // Fallback if not running in a browser environment
    };

    const analyticsData = {
      raceId,
      voteType,
      timestamp: new Date(),
      metadata: {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'test',
        language: typeof window !== 'undefined' ? window.navigator.language : 'test',
        platform: typeof window !== 'undefined' ? window.navigator.platform : 'test',
        screenSize: getScreenSize(),
        referrer: typeof document !== 'undefined' ? document.referrer : 'test',
        deviceType: typeof window !== 'undefined' && /mobile/i.test(window.navigator.userAgent) ? 'mobile' : 'desktop',
        timeOnPage: typeof window !== 'undefined' && window.performance && window.performance.timing
          ? Math.round((Date.now() - window.performance.timing.navigationStart) / 1000)
          : 0,
        performanceMetrics: {
          pageLoadTime: typeof window !== 'undefined' && window.performance && window.performance.timing
            ? window.performance.timing.loadEventEnd - window.performance.timing.navigationStart
            : 0,
          domInteractive: typeof window !== 'undefined' && window.performance && window.performance.timing
            ? window.performance.timing.domInteractive - window.performance.timing.navigationStart
            : 0,
          firstContentfulPaint: typeof performance !== 'undefined' && performance.getEntriesByType('paint')[0]
            ? performance.getEntriesByType('paint')[0]?.startTime
            : 0,
        },
        connection: {
          type: typeof navigator !== 'undefined' && navigator.connection ? navigator.connection?.effectiveType || 'unknown' : 'unknown',
          downlink: typeof navigator !== 'undefined' && navigator.connection ? navigator.connection?.downlink : 0,
        },
      },
    };

    // Helper to get the correct analytics endpoint URL
    const getAnalyticsUrl = () => {
      if (typeof window === 'undefined') {
        // Server-side: must use absolute URL
        const base =
          process.env.NEXT_PUBLIC_SITE_URL ||
          (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
          'http://localhost:3000';
        return `${base}/api/analytics`;
      }
      // Client-side: relative URL is fine
      return '/api/analytics';
    };

    if (typeof fetch !== 'undefined') {
      await fetch(getAnalyticsUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(analyticsData),
      });
    } else {
      console.warn('fetch is not available');
    }
  } catch (error) {
    console.error('Analytics error:', error);
  }
};
