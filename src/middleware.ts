import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const adminSession = cookies.get('adminSession');

  const isLoginPage = nextUrl.pathname === '/';
  const isProtectedRoute = ['/notice', '/studyroom'].includes(nextUrl.pathname);

  if (isLoginPage && adminSession) {
    return NextResponse.redirect(new URL('/notice', nextUrl));
  }

  if (!adminSession && isProtectedRoute) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
