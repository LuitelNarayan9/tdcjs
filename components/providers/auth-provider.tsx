'use client';

/**
 * Clerk Auth Provider
 * Provides authentication context and OAuth session management
 * 
 * Next.js 16.1.4 - Client Component
 */

import { useEffect, useCallback } from 'react';
import { useAuth, useUser, useClerk, SignedIn, SignedOut } from '@clerk/nextjs';
import { syncOAuthUser } from '@/actions/auth/oauth-sync';

// Re-export Clerk hooks for convenience
export { useAuth, useUser, useClerk, SignedIn, SignedOut };

/**
 * Custom hook to get current user status
 */
export function useAuthStatus() {
    const { isLoaded, isSignedIn, userId } = useAuth();
    const { user } = useUser();

    return {
        isLoaded,
        isSignedIn,
        userId,
        user,
        isVerified: user?.emailAddresses?.[0]?.verification?.status === 'verified',
    };
}

/**
 * Hook to sync OAuth user with database after login
 * Should be called in a component that mounts after successful authentication
 */
export function useOAuthSync() {
    const { isSignedIn, user } = useUser();

    const syncUser = useCallback(async () => {
        if (!isSignedIn || !user) return;

        // Check if user has OAuth provider (Google, etc.)
        const hasOAuthProvider = user.externalAccounts && user.externalAccounts.length > 0;

        if (hasOAuthProvider) {
            try {
                const primaryEmail = user.emailAddresses?.[0]?.emailAddress;
                const firstName = user.firstName;
                const lastName = user.lastName;
                const username = user.username;
                const imageUrl = user.imageUrl;

                if (primaryEmail) {
                    await syncOAuthUser({
                        email: primaryEmail,
                        firstName,
                        lastName,
                        username,
                        imageUrl,
                    });
                }
            } catch (error) {
                console.error('Failed to sync OAuth user:', error);
            }
        }
    }, [isSignedIn, user]);

    useEffect(() => {
        syncUser();
    }, [syncUser]);

    return { syncUser };
}

/**
 * Hook to check if user authenticated via OAuth
 */
export function useOAuthStatus() {
    const { user } = useUser();

    const getOAuthProvider = useCallback(() => {
        if (!user?.externalAccounts || user.externalAccounts.length === 0) {
            return null;
        }

        const provider = user.externalAccounts[0].provider;
        return provider; // 'google', 'facebook', etc.
    }, [user]);

    const isOAuthUser = useCallback(() => {
        return !!getOAuthProvider();
    }, [getOAuthProvider]);

    return {
        isOAuthUser: isOAuthUser(),
        oauthProvider: getOAuthProvider(),
    };
}

/**
 * Hook to get user role from metadata
 */
export function useUserRole() {
    const { user } = useUser();

    return {
        role: (user?.publicMetadata?.role as string) || 'USER',
        isAdmin: user?.publicMetadata?.role === 'ADMIN',
        isModerator: user?.publicMetadata?.role === 'MODERATOR',
    };
}

/**
 * Auth Provider Component
 * Wraps children with auth context and handles OAuth sync
 */
interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    // Sync OAuth users when they log in
    useOAuthSync();

    return <>{children}</>;
}
