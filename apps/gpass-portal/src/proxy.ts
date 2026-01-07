import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { AppConfig } from './app-config';
import { TOKEN_COOKIE_NAME } from './constant/common';

const basePath = AppConfig.BASE_PATH;

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  const isBasePathRoute = pathname.startsWith(basePath);

  if (!token && isBasePathRoute) {
    const loginUrl = new URL(`${basePath}/login`, request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token && isBasePathRoute) {
    return NextResponse.redirect(new URL(`${basePath}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
