'use client';

/**
 * Auth hooks for client-side authentication
 */

import { useSession, signIn, signOut } from 'next-auth/react';
import { useCallback, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Extended session hook with helper functions
 * 
 * @example
 * const { user, isLoading, isAuthenticated, login, logout } = useAuth();
 */
export function useAuth() {
  const { data: session, status, update } = useSession();
  
  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';
  const user = session?.user ?? null;
  const userRole = user?.role;
  
  /**
   * Sign in with credentials
   */
  const login = useCallback(
    async (credentials: { email: string; password: string }, callbackUrl?: string) => {
      try {
        const result = await signIn('credentials', {
          ...credentials,
          redirect: false,
          callbackUrl: callbackUrl || '/dashboard',
        });
        
        if (result?.error) {
          return {
            success: false,
            error: result.error,
          };
        }
        
        return {
          success: true,
          callbackUrl: result?.url,
        };
      } catch {
        return {
          success: false,
          error: 'An unexpected error occurred',
        };
      }
    },
    []
  );
  
  /**
   * Sign out
   */
  const logout = useCallback(async (callbackUrl?: string) => {
    await signOut({
      redirect: true,
      callbackUrl: callbackUrl || '/login',
    });
  }, []);
  
  /**
   * Update session data
   */
  const updateSession = useCallback(
    async (data: Partial<{ name: string; username: string; image: string }>) => {
      await update(data);
    },
    [update]
  );
  
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
    // Session data
    session,
    user,
    status,
    
    // Loading states
    isLoading,
    isAuthenticated,
    
    // Actions
    login,
    logout,
    updateSession,
    
    // Role checks
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
      router.push(`${redirectUrl}?callbackUrl=${callbackUrl}`);
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
