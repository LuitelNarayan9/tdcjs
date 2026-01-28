/**
 * Permissions Helper
 * Role-based access control utilities for TDCJS
 */

import { prisma } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

// Role hierarchy (higher = more permissions)
export const ROLE_HIERARCHY = {
  SUPER_ADMIN: 100,
  ADMIN: 80,
  MODERATOR: 60,
  USER: 40,
} as const;

export type Role = keyof typeof ROLE_HIERARCHY;

// Permission definitions
export const PERMISSIONS = {
  // User Management
  'users:view': ['ADMIN', 'SUPER_ADMIN'],
  'users:create': ['ADMIN', 'SUPER_ADMIN'],
  'users:edit': ['ADMIN', 'SUPER_ADMIN'],
  'users:delete': ['SUPER_ADMIN'],
  'users:ban': ['ADMIN', 'SUPER_ADMIN'],
  
  // Forum Permissions
  'forum:view': ['USER', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'],
  'forum:create': ['USER', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'],
  'forum:edit-own': ['USER', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'],
  'forum:edit-any': ['MODERATOR', 'ADMIN', 'SUPER_ADMIN'],
  'forum:delete-own': ['USER', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'],
  'forum:delete-any': ['MODERATOR', 'ADMIN', 'SUPER_ADMIN'],
  'forum:pin': ['MODERATOR', 'ADMIN', 'SUPER_ADMIN'],
  'forum:lock': ['MODERATOR', 'ADMIN', 'SUPER_ADMIN'],
  
  // Blog Permissions
  'blog:view': ['USER', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'],
  'blog:create': ['ADMIN', 'SUPER_ADMIN'],
  'blog:edit': ['ADMIN', 'SUPER_ADMIN'],
  'blog:delete': ['ADMIN', 'SUPER_ADMIN'],
  'blog:comment': ['USER', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'],
  
  // News Permissions
  'news:create': ['ADMIN', 'SUPER_ADMIN'],
  'news:edit': ['ADMIN', 'SUPER_ADMIN'],
  'news:delete': ['ADMIN', 'SUPER_ADMIN'],
  
  // Family Tree Permissions
  'family-tree:view': ['USER', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'],
  'family-tree:edit-own': ['USER', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'],
  'family-tree:edit-any': ['ADMIN', 'SUPER_ADMIN'],
  
  // Admin Dashboard
  'admin:access': ['ADMIN', 'SUPER_ADMIN'],
  'admin:settings': ['SUPER_ADMIN'],
  
  // Reports
  'reports:view': ['MODERATOR', 'ADMIN', 'SUPER_ADMIN'],
  'reports:manage': ['ADMIN', 'SUPER_ADMIN'],
} as const;

export type Permission = keyof typeof PERMISSIONS;

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: Role | string, permission: Permission): boolean {
  const allowedRoles = PERMISSIONS[permission];
  if (!allowedRoles) return false;
  return (allowedRoles as readonly string[]).includes(role);
}

/**
 * Check if role1 has higher or equal authority than role2
 */
export function hasHigherRole(role1: Role | string, role2: Role | string): boolean {
  const level1 = ROLE_HIERARCHY[role1 as Role] || 0;
  const level2 = ROLE_HIERARCHY[role2 as Role] || 0;
  return level1 >= level2;
}

/**
 * Get current user's role from database
 */
export async function getCurrentUserRole(): Promise<Role | null> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return null;
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    
    return (user?.role as Role) || null;
  } catch {
    return null;
  }
}

/**
 * Check if current user has specific permission
 */
export async function checkPermission(permission: Permission): Promise<boolean> {
  const role = await getCurrentUserRole();
  if (!role) return false;
  return hasPermission(role, permission);
}

/**
 * Check if current user has any of the specified roles
 */
export async function checkRoles(allowedRoles: Role[]): Promise<boolean> {
  const role = await getCurrentUserRole();
  if (!role) return false;
  return allowedRoles.includes(role);
}

/**
 * Check if current user is admin (ADMIN or SUPER_ADMIN)
 */
export async function isAdmin(): Promise<boolean> {
  return checkRoles(['ADMIN', 'SUPER_ADMIN']);
}

/**
 * Check if current user is moderator or higher
 */
export async function isModerator(): Promise<boolean> {
  return checkRoles(['MODERATOR', 'ADMIN', 'SUPER_ADMIN']);
}

/**
 * Guard function - throws error if permission check fails
 */
export async function requirePermission(permission: Permission): Promise<void> {
  const hasAccess = await checkPermission(permission);
  if (!hasAccess) {
    throw new Error(`Access denied: Missing permission '${permission}'`);
  }
}

/**
 * Guard function - throws error if role check fails
 */
export async function requireRole(allowedRoles: Role[]): Promise<void> {
  const hasAccess = await checkRoles(allowedRoles);
  if (!hasAccess) {
    throw new Error(`Access denied: Requires one of roles [${allowedRoles.join(', ')}]`);
  }
}
