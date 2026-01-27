/**
 * NextAuth.js v5 Configuration
 * Main config combining all auth options
 */

import type { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/db';
import { providers } from './providers';
import { callbacks } from './callbacks';

/**
 * Auth configuration
 * 
 * Combines:
 * - Prisma adapter for database sessions
 * - Custom providers (credentials)
 * - Session and JWT callbacks
 * - Page customization
 */
export const authConfig: NextAuthConfig = {
  // Use Prisma adapter for database sessions
  // Note: Cast to any to work around version mismatch between @auth/prisma-adapter and next-auth
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(prisma) as any,
  
  // Use JWT strategy for sessions (works better with Edge)
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  
  // Auth providers
  providers,
  
  // Callbacks for session, JWT, etc.
  callbacks,
  
  // Custom pages
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/onboarding',
  },
  
  // Events
  events: {
    async signIn({ user, isNewUser }) {
      // Log successful sign-in
      console.log(`User signed in: ${user.email}, new user: ${isNewUser}`);
    },
    async signOut(message) {
      // Log sign-out
      if ('token' in message) {
        console.log(`User signed out: ${message.token?.email}`);
      }
    },
  },
  
  // Enable debug in development
  debug: process.env.NODE_ENV === 'development',
  
  // Trust host header for proxy setups
  trustHost: true,
  
  // Secret for JWT encryption
  secret: process.env.AUTH_SECRET,
};

export default authConfig;
