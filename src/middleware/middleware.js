import { NextResponse } from 'next/server';
import { rateLimiter } from './middleware/rateLimit';

export async function middleware(request) {
  // Only apply rate limiting to vote endpoint
  if (request.nextUrl.pathname === '/api/vote') {
    try {
      await rateLimiter.throttle(request, NextResponse);
      return NextResponse.next();
    } catch {
      return new NextResponse(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/api/vote',
};
