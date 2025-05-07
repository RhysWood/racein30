import { trackVote } from '../analytics';

describe('trackVote', () => {
  let originalResolvedOptions;
  let timingMock;

  beforeEach(() => {
    jest.useFakeTimers();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );

    originalResolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions;
    Intl.DateTimeFormat.prototype.resolvedOptions = jest.fn(() => ({
      timeZone: 'America/New_York',
    }));

    const now = Date.now();

    Object.defineProperty(global.navigator, 'userAgent', {
      value: 'test-agent',
      configurable: true,
    });
    Object.defineProperty(global.navigator, 'language', {
      value: 'en-US',
      configurable: true,
    });
    Object.defineProperty(global.navigator, 'platform', {
      value: 'MacIntel',
      configurable: true,
    });
    global.navigator.connection = {
      effectiveType: '4g',
      downlink: 10,
    };

    Object.defineProperty(global, 'screen', {
      value: { width: 1440, height: 900 },
      configurable: true,
    });

    Object.defineProperty(global.document, 'referrer', {
      value: 'https://example.com',
      configurable: true,
    });

    // --- FIXED TIMING MOCK ---
    timingMock = {
      navigationStart: now - 5000,
      loadEventEnd: now,
      domInteractive: now - 4000, // 1000ms after navigationStart
    };

    const perfMock = {
      timing: timingMock,
      getEntriesByType: jest.fn(() => []),
    };
    Object.defineProperty(window, 'performance', {
      value: perfMock,
      configurable: true,
    });
    Object.defineProperty(global, 'performance', {
      value: perfMock,
      configurable: true,
    });
    // ------------------------
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
    Intl.DateTimeFormat.prototype.resolvedOptions = originalResolvedOptions;
  });

  it('sends vote analytics with correct payload', async () => {
    const raceId = 'abc123';
    const voteType = 'upvote';

    const beforeCall = Date.now();
    await trackVote(raceId, voteType);
    const afterCall = Date.now();

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const [url, options] = global.fetch.mock.calls[0];
    expect(url).toBe('/api/analytics');

    const payload = JSON.parse(options.body);

    expect(payload.raceId).toBe(raceId);
    expect(payload.voteType).toBe(voteType);
    expect(new Date(payload.timestamp).getTime()).toBeGreaterThanOrEqual(beforeCall);
    expect(new Date(payload.timestamp).getTime()).toBeLessThanOrEqual(afterCall);

    expect(payload.metadata.timezone).toBe('America/New_York');
    expect(payload.metadata.userAgent).toBe('test-agent');
    expect(payload.metadata.language).toBe('en-US');
    expect(payload.metadata.platform).toBe('MacIntel');
    expect(payload.metadata.screenSize).toBe('1440x900');
    expect(payload.metadata.referrer).toBe('https://example.com');
    expect(payload.metadata.deviceType).toBe('desktop');
    expect(payload.metadata.timeOnPage).toBeGreaterThanOrEqual(0);

    expect(payload.metadata.performanceMetrics).toEqual({
      pageLoadTime: 5000,
      domInteractive: 1000,
      firstContentfulPaint: 0,
    });

    expect(payload.metadata.connection).toEqual({
      type: '4g',
      downlink: 10,
    });
  });
});
