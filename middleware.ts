/**
 * NextAuth.js Middleware
 * Protects routes and handles auth redirects
 */

import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

/**
 * Middleware configuration
 * 
 * This middleware runs on specified routes to:
 * 1. Check authentication status
 * 2. Redirect unauthenticated users to login
 * 3. Redirect authenticated users away from auth pages
 */
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  
  // Define route patterns
  const isApiRoute = nextUrl.pathname.startsWith('/api');
  const isAuthRoute = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
  ].some(route => nextUrl.pathname.startsWith(route));
  
  const isProtectedRoute = [
    '/dashboard',
    '/profile',
    '/settings',
    '/forum/new',
    '/admin',
  ].some(route => nextUrl.pathname.startsWith(route));
  
  const isAdminRoute = nextUrl.pathname.startsWith('/admin');
  
  // Skip API routes (handled by API route middleware)
  if (isApiRoute) {
    return NextResponse.next();
  }
  
  // Redirect logged-in users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }
  
  // Redirect unauthenticated users to login for protected routes
  if (isProtectedRoute && !isLoggedIn) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }
  
  // Check admin access
  if (isAdminRoute && isLoggedIn) {
    const userRole = req.auth?.user?.role;
    const adminRoles = ['SUPER_ADMIN', 'ADMIN'];
    
    if (!userRole || !adminRoles.includes(userRole)) {
      return NextResponse.redirect(new URL('/unauthorized', nextUrl));
    }
  }
  
  return NextResponse.next();
});

/**
 * Matcher configuration
 * Specify which routes should run this middleware
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
