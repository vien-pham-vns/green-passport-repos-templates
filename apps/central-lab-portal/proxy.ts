import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TOKEN_COOKIE_NAME } from "./lib/constants";

const basePath = "/central-lab";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === `${basePath}/login`;
  const isProtectedRoute = pathname.startsWith(basePath) && !isLoginPage;

  // Redirect unauthenticated users to login
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL(`${basePath}/login`, request.url));
  }

  // Redirect authenticated users away from login page
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL(basePath, request.url));
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
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
