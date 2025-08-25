import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const response = NextResponse.next();

  if (pathname.startsWith('/middleware/ab-testing')) {
    console.log('A/B Test');
    let abTestGroup = request.cookies.get('ab-test-group')?.value;

    if (!abTestGroup) {
      abTestGroup = Math.random() < 0.5 ? 'A' : 'B';
      response.cookies.set('ab-test-group', abTestGroup, { path: '/', maxAge: 10 }); // Set for 10 seconds
    }
  } else if (pathname.startsWith('/middleware/log')) {
    console.log('Request Log');
  }

  return response;
}

export const config = {
  matcher: [
    '/middleware/ab-testing',
    '/middleware/log',
  ],
};
