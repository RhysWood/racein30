export const trackVote = async (raceId, voteType) => {
  try {
    const analyticsData = {
      raceId,
      voteType,
      timestamp: new Date(),
      metadata: {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        userAgent: window.navigator.userAgent,
        language: window.navigator.language,
        platform: window.navigator.platform,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        referrer: document.referrer,
        deviceType: /mobile/i.test(window.navigator.userAgent) ? 'mobile' : 'desktop',
        timeOnPage: Math.round((Date.now() - window.performance.timing.navigationStart) / 1000),
        performanceMetrics: {
            pageLoadTime: window.performance.timing.loadEventEnd - window.performance.timing.navigationStart,
            domInteractive: window.performance.timing.domInteractive - window.performance.timing.navigationStart,
            firstContentfulPaint: performance.getEntriesByType('paint')[0]?.startTime
          },
          connection: {
            type: navigator.connection?.effectiveType || 'unknown',
            downlink: navigator.connection?.downlink
          }
      }
    };

    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(analyticsData)
    });
  } catch (error) {
    console.error('Analytics error:', error);
  }
};
