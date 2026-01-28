'use client';

/**
 * OAuth Callback Page
 * Handles OAuth provider callbacks (Google, etc.)
 * Syncs OAuth users with database
 * 
 * Next.js 16.1.4 - Client Component
 */

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSignIn, useSignUp, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { syncOAuthUser } from '@/actions/auth/oauth-sync';

interface OAuthCallbackPageProps {
    params: Promise<{ locale: string }>;
}

export default function OAuthCallbackPage({ params }: OAuthCallbackPageProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { signIn, isLoaded: signInLoaded } = useSignIn();
    const { signUp, isLoaded: signUpLoaded } = useSignUp();
    const { user, isLoaded: userLoaded, isSignedIn } = useUser();
    const [locale, setLocale] = useState<string>('en');
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(true);
    const [status, setStatus] = useState<string>('Initializing...');

    // Unwrap params
    useEffect(() => {
        params.then(({ locale }) => setLocale(locale));
    }, [params]);

    // Handle OAuth callback
    useEffect(() => {
        if (!signInLoaded || !signUpLoaded) {
            setStatus('Loading authentication...');
            return;
        }

        const handleOAuthCallback = async () => {
            try {
                setStatus('Processing OAuth response...');

                // Check for error in URL
                const errorParam = searchParams.get('error');
                const errorDescription = searchParams.get('error_description');

                if (errorParam) {
                    throw new Error(errorDescription || `OAuth error: ${errorParam}`);
                }

                // Clerk automatically handles the OAuth callback
                // We just need to wait for the user to be authenticated
                setStatus('Verifying session...');

                // Wait for user to be loaded
                if (!userLoaded) {
                    return; // Will retry when userLoaded changes
                }

                if (isSignedIn && user) {
                    setStatus('Syncing user data...');

                    // Sync user with our database
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
                    } catch (syncError) {
                        console.error('Failed to sync OAuth user:', syncError);
                        // Don't fail the auth flow if sync fails
                    }

                    // Redirect to dashboard or callback URL
                    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
                    setStatus('Redirecting...');
                    router.push(`/${locale}${callbackUrl}`);
                } else {
                    // Not signed in yet, wait a bit
                    setTimeout(() => {
                        if (!isSignedIn) {
                            setError('Authentication incomplete. Please try again.');
                            setIsProcessing(false);
                        }
                    }, 3000);
                }
            } catch (err) {
                console.error('OAuth callback error:', err);
                setError(err instanceof Error ? err.message : 'Failed to complete authentication');
                setIsProcessing(false);
            }
        };

        handleOAuthCallback();
    }, [signInLoaded, signUpLoaded, userLoaded, isSignedIn, user, searchParams, router, locale]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
                <div className="max-w-md w-full">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
                            <svg className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            Authentication Error
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8">
                            {error}
                        </p>
                        <div className="space-y-3">
                            <Link
                                href={`/${locale}/login`}
                                className="block w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                            >
                                Try Again
                            </Link>
                            <Link
                                href={`/${locale}/`}
                                className="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                            >
                                Go Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
            <div className="max-w-md w-full">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
                    <div className="mb-6">
                        <div className="relative inline-block">
                            <svg className="animate-spin h-16 w-16 text-blue-600" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Completing Sign In
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                        Please wait while we complete your authentication...
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                        {status}
                    </p>
                </div>
            </div>
        </div>
    );
}
