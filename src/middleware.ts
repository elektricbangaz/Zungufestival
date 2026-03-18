import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const INVESTOR_PATHS = ['/deck'];
const PARTNER_PATHS = ['/partner'];

function matchesPath(pathname: string, paths: string[]) {
  return paths.some(p => pathname === p || pathname.startsWith(p + '/'));
}

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  const isInvestor = matchesPath(pathname, INVESTOR_PATHS);
  const isPartner = matchesPath(pathname, PARTNER_PATHS);

  if (!isInvestor && !isPartner) return NextResponse.next();

  // ── GUEST COOKIE BYPASS ──────────────────────────────────────────
  if (req.cookies.get('zungu_guest')?.value === '1') {
    return NextResponse.next();
  }

  // ── GUEST TOKEN IN URL ───────────────────────────────────────────
  const token = searchParams.get('access');
  if (token && token === process.env.GUEST_ACCESS_TOKEN) {
    const cleanUrl = new URL(pathname, req.url);
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

  // No valid session or token → send to sign-in
  const role = isInvestor ? 'investor' : 'partner';
  return NextResponse.redirect(new URL(`/sign-in?role=${role}`, req.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
