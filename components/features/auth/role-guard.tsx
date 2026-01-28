'use client';

/**
 * Role Guard Component
 * Protects UI elements based on user role
 * 
 * Next.js 16.1.4 - Client Component
 */

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';

type Role = 'USER' | 'MODERATOR' | 'ADMIN' | 'SUPER_ADMIN';

interface RoleGuardProps {
    children: ReactNode;
    allowedRoles: Role[];
    fallback?: ReactNode;
    redirectTo?: string;
    loadingComponent?: ReactNode;
}

/**
 * Role Guard - Only shows children if user has required role
 * 
 * @param children - Content to show when authorized
 * @param allowedRoles - Array of roles that can access
 * @param fallback - Content to show when unauthorized
 * @param redirectTo - URL to redirect to when unauthorized
 * @param loadingComponent - Content to show while checking role
 */
export function RoleGuard({
    children,
    allowedRoles,
    fallback,
    redirectTo = '/unauthorized',
    loadingComponent,
}: RoleGuardProps) {
    const { isLoaded, isSignedIn, userId } = useAuth();
    const router = useRouter();
    const [userRole, setUserRole] = useState<Role | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUserRole() {
            if (!isLoaded || !isSignedIn || !userId) {
                setIsLoading(false);
                return;
            }

            try {
                // Fetch user role from our database
                const response = await fetch('/api/users/me/role');
                if (response.ok) {
                    const data = await response.json();
                    setUserRole(data.role as Role);
                }
            } catch (error) {
                console.error('Error fetching user role:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUserRole();
    }, [isLoaded, isSignedIn, userId]);

    // Still loading
    if (!isLoaded || isLoading) {
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
        router.push('/login');
        return null;
    }

    // Check role
    const hasAccess = userRole && allowedRoles.includes(userRole);

    if (!hasAccess) {
        if (fallback) {
            return <>{fallback}</>;
        }
        router.push(redirectTo);
        return null;
    }

    return <>{children}</>;
}

/**
 * Admin Guard - Shortcut for admin-only content
 */
interface AdminGuardProps {
    children: ReactNode;
    fallback?: ReactNode;
    redirectTo?: string;
}

export function AdminGuard({ children, fallback, redirectTo = '/unauthorized' }: AdminGuardProps) {
    return (
        <RoleGuard
            allowedRoles={['ADMIN', 'SUPER_ADMIN']}
            fallback={fallback}
            redirectTo={redirectTo}
        >
            {children}
        </RoleGuard>
    );
}

/**
 * Moderator Guard - For moderators and above
 */
export function ModeratorGuard({ children, fallback, redirectTo = '/unauthorized' }: AdminGuardProps) {
    return (
        <RoleGuard
            allowedRoles={['MODERATOR', 'ADMIN', 'SUPER_ADMIN']}
            fallback={fallback}
            redirectTo={redirectTo}
        >
            {children}
        </RoleGuard>
    );
}

/**
 * Hook to get current user's role
 */
export function useUserRole() {
    const { isLoaded, isSignedIn, userId } = useAuth();
    const [role, setRole] = useState<Role | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchRole() {
            if (!isLoaded || !isSignedIn || !userId) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/users/me/role');
                if (response.ok) {
                    const data = await response.json();
                    setRole(data.role as Role);
                }
            } catch (error) {
                console.error('Error fetching user role:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchRole();
    }, [isLoaded, isSignedIn, userId]);

    return {
        role,
        isLoading: !isLoaded || isLoading,
        isAdmin: role === 'ADMIN' || role === 'SUPER_ADMIN',
        isModerator: role === 'MODERATOR' || role === 'ADMIN' || role === 'SUPER_ADMIN',
        isSuperAdmin: role === 'SUPER_ADMIN',
    };
}
