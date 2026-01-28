/**
 * Clerk Authentication Utilities
 * Server-side auth helpers for TDCJS
 */

import { auth, currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

/**
 * Get current authenticated user from Clerk
 * Returns null if not authenticated
 */
export async function getAuth() {
  return auth();
}

/**
 * Get current user with full profile from Clerk
 */
export async function getCurrentUser() {
  return currentUser();
}

/**
 * Get current user from database (synced via webhook)
 * This returns the full user record with all relations
 */
export async function getCurrentDbUser() {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }
  
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  
  return user;
}

/**
 * Check if current user has required role
 */
export async function hasRole(requiredRoles: string[]): Promise<boolean> {
  const user = await getCurrentDbUser();
  
  if (!user) {
    return false;
  }
  
  return requiredRoles.includes(user.role);
}

/**
 * Check if current user is admin
 */
export async function isAdmin(): Promise<boolean> {
  return hasRole(['ADMIN', 'SUPER_ADMIN']);
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth() {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Authentication required');
  }
  
  return userId;
}

// Re-export password utilities (still useful for custom flows)
export { hashPassword, verifyPassword, checkPasswordStrength } from './password';

// Re-export token utilities (useful for custom verification flows)
export { 
  createVerificationToken, 
  verifyToken,
  createPasswordResetToken,
} from './tokens';
