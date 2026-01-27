'use client';

/**
 * Auth Session Provider
 * Wraps the application with NextAuth session context
 */

import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

interface AuthProviderProps {
    children: React.ReactNode;
    session?: Session | null;
}

/**
 * Authentication provider component
 * 
 * Wrap your root layout with this provider to enable session access
 * throughout the application.
 * 
 * @example
 * // In app/layout.tsx
 * import { AuthProvider } from '@/components/providers/auth-provider';
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <AuthProvider>
 *           {children}
 *         </AuthProvider>
 *       </body>
 *     </html>
 *   );
 * }
 */
export function AuthProvider({ children, session }: AuthProviderProps) {
    return (
        <SessionProvider
            session={session}
            // Refetch session every 5 minutes
            refetchInterval={5 * 60}
            // Refetch when window gains focus
            refetchOnWindowFocus={true}
        >
            {children}
        </SessionProvider>
    );
}

export default AuthProvider;
