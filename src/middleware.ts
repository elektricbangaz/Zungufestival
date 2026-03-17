import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isInvestorRoute = createRouteMatcher(['/deck(.*)']);
const isPartnerRoute = createRouteMatcher(['/partner(.*)']);

export default clerkMiddleware(async (auth, req) => {
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
