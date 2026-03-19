import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isInvestorRoute = createRouteMatcher(['/deck(.*)']);
const isPartnerRoute = createRouteMatcher(['/partner(.*)']);
const isProtectedRoute = createRouteMatcher(['/deck(.*)', '/partner(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // ── GUEST COOKIE BYPASS ──────────────────────────────────────────
  if (req.cookies.get('zungu_guest')?.value === '1' && isProtectedRoute(req)) {
    return NextResponse.next();
  }

  // ── GUEST TOKEN IN URL ───────────────────────────────────────────
  const token = req.nextUrl.searchParams.get('access');
  if (token && token === process.env.GUEST_ACCESS_TOKEN && isProtectedRoute(req)) {
    const cleanUrl = new URL(req.nextUrl.pathname, req.url);
    const res = NextResponse.redirect(cleanUrl);
    res.cookies.set('zungu_guest', '1', {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    return res;
  }
  // ── END BYPASS ───────────────────────────────────────────────────

  // Clerk session — userId only, no role metadata required
  const { userId } = await auth();

  if (isInvestorRoute(req) && !userId) {
    return NextResponse.redirect(new URL('/sign-in?role=investor', req.url));
  }
  if (isPartnerRoute(req) && !userId) {
    return NextResponse.redirect(new URL('/sign-in?role=partner', req.url));
  }
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
