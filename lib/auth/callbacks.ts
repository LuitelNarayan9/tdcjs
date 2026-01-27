/**
 * NextAuth.js v5 Callbacks
 * Custom callbacks for session and JWT handling
 */

import type { NextAuthConfig } from 'next-auth';

type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR' | 'EDITOR' | 'MEMBER' | 'USER';

/**
 * Auth callbacks
 * 
 * These callbacks customize the behavior of NextAuth:
 * - jwt: Customize JWT token contents
 * - session: Customize session object
 * - signIn: Control who can sign in
 * - redirect: Customize redirect behavior
 */
export const callbacks: NextAuthConfig['callbacks'] = {
  /**
   * JWT callback
   * Called whenever a JWT is created or updated
   * Add custom data to the token here
   */
  async jwt({ token, user, trigger, session }) {
    // Initial sign in - add user data to token
    if (user) {
      token.id = user.id as string;
      token.role = (user as { role?: UserRole }).role || 'USER';
      token.username = (user as { username?: string }).username || null;
      token.emailVerified = user.emailVerified || null;
    }
    
    // Handle session updates (e.g., after profile update)
    if (trigger === 'update' && session) {
      // Merge updated session data into token
      if (session.name) token.name = session.name;
      if (session.username) token.username = session.username;
      if (session.image) token.picture = session.image;
    }
    
    return token;
  },
  
  /**
   * Session callback
   * Called whenever a session is checked
   * Add custom data to the session here
   */
  async session({ session, token }) {
    if (token && session.user) {
      session.user.id = token.id as string;
      session.user.role = token.role as UserRole;
      session.user.username = token.username as string | null;
      session.user.emailVerified = token.emailVerified as Date | null;
    }
    
    return session;
  },
  
  /**
   * Sign in callback
   * Control whether a user is allowed to sign in
   */
  async signIn({ account }) {
    // Allow OAuth sign in without email verification
    if (account?.provider !== 'credentials') {
      return true;
    }
    
    // For credentials, check if email is verified (optional)
    // You can enable this to require email verification
    // const existingUser = await prisma.user.findUnique({
    //   where: { id: user.id },
    //   select: { emailVerified: true },
    // });
    // 
    // if (!existingUser?.emailVerified) {
    //   return '/auth/verify-email';
    // }
    
    return true;
  },
  
  /**
   * Redirect callback
   * Customize where users are redirected after sign in/out
   */
  async redirect({ url, baseUrl }) {
    // Allow relative URLs
    if (url.startsWith('/')) {
      return `${baseUrl}${url}`;
    }
    
    // Allow URLs on the same origin
    if (new URL(url).origin === baseUrl) {
      return url;
    }
    
    // Default to home page
    return baseUrl;
  },
  
  /**
   * Authorized callback (for middleware)
   * Check if user is authorized to access a route
   */
  authorized({ auth, request }) {
    const isLoggedIn = !!auth?.user;
    const { pathname } = request.nextUrl;
    
    // Public routes that don't require authentication
    const publicRoutes = [
      '/login',
      '/register',
      '/forgot-password',
      '/reset-password',
      '/auth/error',
      '/auth/verify-request',
    ];
    
    // Check if current path is public
    const isPublicRoute = publicRoutes.some(route => 
      pathname.startsWith(route) || pathname === '/'
    );
    
    // Allow public routes
    if (isPublicRoute) {
      return true;
    }
    
    // Require auth for protected routes
    return isLoggedIn;
  },
};

export default callbacks;
