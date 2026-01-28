'use client';

/**
 * Auth Guard Component
 * Protects UI elements that require authentication
 * 
 * Next.js 16.1.4 - Client Component
 */

import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';

interface AuthGuardProps {
    children: ReactNode;
    fallback?: ReactNode;
    redirectTo?: string;
    loadingComponent?: ReactNode;
}

/**
 * Auth Guard - Only shows children if user is authenticated
 * 
 * @param children - Content to show when authenticated
 * @param fallback - Content to show when not authenticated (instead of redirect)
 * @param redirectTo - URL to redirect to when not authenticated
 * @param loadingComponent - Content to show while checking auth
 */
export function AuthGuard({
    children,
    fallback,
    redirectTo = '/login',
    loadingComponent,
}: AuthGuardProps) {
    const { isLoaded, isSignedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !isSignedIn && !fallback) {
            router.push(redirectTo);
        }
    }, [isLoaded, isSignedIn, fallback, redirectTo, router]);

    // Still loading
    if (!isLoaded) {
        if (loadingComponent) {
            return <>{loadingComponent}</>;
        }
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
        );
    }

    // Not signed in
    if (!isSignedIn) {
        if (fallback) {
            return <>{fallback}</>;
        }
        return null;
    }

    // Signed in
    return <>{children}</>;
}

/**
 * Inverse Auth Guard - Only shows children if user is NOT authenticated
 * Useful for login/register pages
 */
interface GuestGuardProps {
    children: ReactNode;
    redirectTo?: string;
}

export function GuestGuard({ children, redirectTo = '/dashboard' }: GuestGuardProps) {
    const { isLoaded, isSignedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            router.push(redirectTo);
        }
    }, [isLoaded, isSignedIn, redirectTo, router]);

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
        );
    }

    if (isSignedIn) {
        return null;
    }

    return <>{children}</>;
}

/**
 * Verified User Guard - Requires email verification
 */
interface VerifiedGuardProps {
    children: ReactNode;
    fallback?: ReactNode;
    redirectTo?: string;
}

export function VerifiedGuard({ children, fallback, redirectTo }: VerifiedGuardProps) {
    const { isLoaded, isSignedIn, user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && isSignedIn && !user?.emailAddresses?.[0]?.verification?.status) {
            if (redirectTo) {
                router.push(redirectTo);
            }
        }
    }, [isLoaded, isSignedIn, user, redirectTo, router]);

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
        );
    }

    const isVerified = user?.emailAddresses?.[0]?.verification?.status === 'verified';

    if (!isSignedIn || !isVerified) {
        if (fallback) {
            return <>{fallback}</>;
        }
        return null;
    }

    return <>{children}</>;
}
