import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isInvestorRoute = createRouteMatcher(['/deck(.*)']);
const isPartnerRoute = createRouteMatcher(['/partner(.*)']);
const isProtectedRoute = createRouteMatcher(['/deck(.*)', '/partner(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // ── GUEST TOKEN BYPASS ──────────────────────────────────────────
  // Cookie already set — let them through without Clerk
  const guestCookie = req.cookies.get('zungu_guest')?.value;
  if (guestCookie === '1' && isProtectedRoute(req)) {
    return NextResponse.next();
  }

  // ?access=TOKEN in URL — set cookie and redirect to clean URL
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
  // ── END BYPASS ──────────────────────────────────────────────────

  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as Record<string, unknown>)?.role as string | undefined;

  if (isInvestorRoute(req)) {
    if (!userId) return NextResponse.redirect(new URL('/sign-in?role=investor', req.url));
    if (role !== 'investor') return NextResponse.redirect(new URL('/sign-in?role=investor', req.url));
  }
  if (isPartnerRoute(req)) {
    if (!userId) return NextResponse.redirect(new URL('/sign-in?role=partner', req.url));
    if (role !== 'partner') return NextResponse.redirect(new URL('/sign-in?role=partner', req.url));
  }
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
