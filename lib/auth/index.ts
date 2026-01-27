/**
 * NextAuth.js v5 Configuration
 * Main auth configuration file
 */

import NextAuth from 'next-auth';
import { authConfig } from './config';

/**
 * NextAuth handler and utilities
 * 
 * @example
 * // In server components
 * import { auth } from '@/lib/auth';
 * const session = await auth();
 * 
 * @example
 * // In API routes
 * import { handlers } from '@/lib/auth';
 * export const { GET, POST } = handlers;
 */
export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
