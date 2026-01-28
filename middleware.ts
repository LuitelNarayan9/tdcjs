/**
 * Clerk Middleware
 * Protects routes and handles auth redirects
 * 
 * Next.js 16.1.4 with Clerk
 */

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes (accessible without authentication)
const isPublicRoute = createRouteMatcher([
  '/',
  '/en',
  '/ne',
  '/:locale/login(.*)',
  '/:locale/register(.*)',
  '/:locale/forgot-password(.*)',
  '/:locale/reset-password(.*)',
  '/:locale/verify-email(.*)',
  '/:locale/news(.*)',
  '/:locale/contact(.*)',
  '/:locale/about-village(.*)',
  '/api/webhooks/(.*)',
]);

// Define protected routes
const isProtectedRoute = createRouteMatcher([
  '/:locale/dashboard(.*)',
  '/:locale/profile(.*)',
  '/:locale/settings(.*)',
  '/:locale/forum(.*)',
  '/:locale/blogs(.*)',
  '/:locale/family-tree(.*)',
  '/:locale/about-sanstha(.*)',
]);

// Define admin routes
const isAdminRoute = createRouteMatcher([
  '/:locale/admin(.*)',
  '/:locale/(admin)(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const { nextUrl } = req;
  
  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }
  
  // Protect routes that require authentication
  if (isProtectedRoute(req) && !userId) {
    const locale = nextUrl.pathname.split('/')[1] || 'en';
    const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(
      new URL(`/${locale}/login?redirect_url=${callbackUrl}`, nextUrl)
    );
  }
  
  // Check admin access
  if (isAdminRoute(req)) {
    if (!userId) {
      const locale = nextUrl.pathname.split('/')[1] || 'en';
      return NextResponse.redirect(new URL(`/${locale}/login`, nextUrl));
    }
    
    // Check role from session claims (set via Clerk dashboard or webhook)
    const userRole = sessionClaims?.metadata?.role as string | undefined;
    const adminRoles = ['SUPER_ADMIN', 'ADMIN'];
    
    if (!userRole || !adminRoles.includes(userRole)) {
      const locale = nextUrl.pathname.split('/')[1] || 'en';
      return NextResponse.redirect(new URL(`/${locale}/unauthorized`, nextUrl));
    }
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
