import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define authentication and public routes
  const authRoutes = ['/login', '/register'];

  // Only these exact paths are public
  const isPublicRoute = pathname === '/' || pathname === '/login' || pathname === '/register';

  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.includes(pathname);

  // Get authentication status from cookies
  const firebaseToken = request.cookies.get('firebase-token');
  const isAuthenticated = !!firebaseToken?.value;


  // Redirect unauthenticated users away from all non-public routes
  if (!isPublicRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth routes to dashboard
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Explicitly list all protected routes
    '/dashboard/:path*',
    '/generate/:path*',
    '/execute/:path*',
    '/documentation/:path*',
    '/tunnels/:path*',
    '/cli/:path*',
    // Add any other routes you want to protect
  ],
};