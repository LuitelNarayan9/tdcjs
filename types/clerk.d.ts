/**
 * Clerk Authentication Type Definitions
 * Custom type definitions for Clerk integration
 */

import type { User as ClerkUser } from '@clerk/nextjs/server';

// User roles matching Prisma schema
export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR' | 'USER';

// User status matching Prisma schema  
export type UserStatus = 'ACTIVE' | 'PENDING' | 'SUSPENDED' | 'BANNED' | 'INACTIVE';

/**
 * Extended user metadata stored in Clerk
 */
export interface ClerkUserMetadata {
  role?: UserRole;
  status?: UserStatus;
}

/**
 * Session claims from Clerk
 */
export interface ClerkSessionClaims {
  metadata?: ClerkUserMetadata;
}

/**
 * Database user type (from Prisma)
 */
export interface DatabaseUser {
  id: string;
  email: string;
  name: string;
  username: string | null;
  role: UserRole;
  status: UserStatus;
  emailVerified: Date | null;
  profileImage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Auth result type for server actions
 */
export interface AuthResult {
  success: boolean;
  message: string;
  redirectTo?: string;
}

/**
 * Extended Clerk user with metadata
 */
export type ExtendedClerkUser = ClerkUser & {
  publicMetadata: ClerkUserMetadata;
};
