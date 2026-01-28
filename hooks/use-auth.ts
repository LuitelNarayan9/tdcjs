'use client';

/**
 * Auth hooks for client-side authentication with Clerk
 */

import { useUser, useClerk, useAuth as useClerkAuth } from '@clerk/nextjs';
import { useCallback, useMemo, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Extended auth hook with helper functions for Clerk
 * 
 * @example
 * const { user, isLoading, isAuthenticated, logout } = useAuth();
 */
export function useAuth() {
  const { user, isLoaded: isUserLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const { userId } = useClerkAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  
  const isLoading = !isUserLoaded;
  const isAuthenticated = isSignedIn ?? false;
  
  // Fetch role from our database
  useEffect(() => {
    if (userId) {
      fetch('/api/users/me/role')
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data?.role) {
            setUserRole(data.role);
          }
        })
        .catch(() => {
          // Silent fail - role not critical for most operations
        });
    }
  }, [userId]);
  
  /**
   * Sign out
   */
  const logout = useCallback(async (callbackUrl?: string) => {
    await signOut({
      redirectUrl: callbackUrl || '/login',
    });
  }, [signOut]);
  
  /**
   * Check if user has a specific role
   */
  const hasRole = useCallback(
    (role: string) => {
      if (!userRole) return false;
      
      const roleHierarchy: Record<string, number> = {
        SUPER_ADMIN: 100,
        ADMIN: 80,
        MODERATOR: 60,
        EDITOR: 40,
        MEMBER: 20,
        USER: 10,
      };
      
      return (roleHierarchy[userRole] || 0) >= (roleHierarchy[role] || 0);
    },
    [userRole]
  );
  
  /**
   * Check if user is admin
   */
  const isAdmin = useMemo(() => hasRole('ADMIN'), [hasRole]);
  
  /**
   * Check if user is moderator or above
   */
  const isModerator = useMemo(() => hasRole('MODERATOR'), [hasRole]);
  
  return {
    // User data
    user: user ? {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress ?? null,
      name: user.fullName ?? user.firstName ?? null,
      image: user.imageUrl,
      role: userRole,
    } : null,
    clerkUser: user,
    
    // Loading states
    isLoading,
    isAuthenticated,
    
    // Actions
    logout,
    
    // Role checks
    userRole,
    hasRole,
    isAdmin,
    isModerator,
  };
}

/**
 * Hook to require authentication
 * Redirects to login if not authenticated
 * 
 * @example
 * // In a protected component
 * const { user } = useRequireAuth();
 * // Will redirect to login if not authenticated
 */
export function useRequireAuth(redirectUrl: string = '/login') {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const callbackUrl = encodeURIComponent(window.location.pathname);
      router.push(`${redirectUrl}?redirect_url=${callbackUrl}`);
    }
  }, [isLoading, isAuthenticated, redirectUrl, router]);
  
  return { user, isLoading, isAuthenticated };
}

/**
 * Hook to require specific role
 * Redirects if user doesn't have required role
 * 
 * @example
 * const { user } = useRequireRole('ADMIN');
 * // Will redirect if not admin
 */
export function useRequireRole(
  role: string,
  redirectUrl: string = '/unauthorized'
) {
  const { user, isLoading, hasRole } = useAuth();
  const router = useRouter();
  
  const hasRequiredRole = hasRole(role);
  
  useEffect(() => {
    if (!isLoading && user && !hasRequiredRole) {
      router.push(redirectUrl);
    }
  }, [isLoading, user, hasRequiredRole, redirectUrl, router]);
  
  return { user, isLoading, hasRole: hasRequiredRole };
}

export default useAuth;
