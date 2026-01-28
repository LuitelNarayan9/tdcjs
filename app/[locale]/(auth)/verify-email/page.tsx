/**
 * Verify Email Page
 * Handles email verification from the verification link
 * 
 * Next.js 16.1.4 - Page with async params and searchParams
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { verifyEmail } from '@/actions/auth/verify-email';

export const metadata: Metadata = {
    title: 'Verify Email | TDCJS',
    description: 'Verify your email address',
};

interface VerifyEmailPageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{
        token?: string;
    }>;
}

export default async function VerifyEmailPage({ params, searchParams }: VerifyEmailPageProps) {
    const { locale } = await params;
    const { token } = await searchParams;

    // If no token, show error
    if (!token) {
        return (
            <div className="text-center space-y-4">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30">
                    <svg className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Invalid Link
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    The verification link is invalid or missing. Please check your email for the correct link.
                </p>
                <div className="pt-4">
                    <Link
                        href={`/${locale}/login`}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    // Verify the token
    const result = await verifyEmail(token);

    if (result.success) {
        return (
            <div className="text-center space-y-4">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30">
                    <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Email Verified!
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    {result.message}
                </p>
                <div className="pt-4">
                    <Link
                        href={`/${locale}/login`}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Sign In Now
                    </Link>
                </div>
            </div>
        );
    }

    // Error state
    return (
        <div className="text-center space-y-4">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30">
                <svg className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Verification Failed
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
                {result.message}
            </p>
            <div className="pt-4 space-y-2">
                <Link
                    href={`/${locale}/resend-verification`}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Request New Link
                </Link>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    or{' '}
                    <Link href={`/${locale}/login`} className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                        go to login
                    </Link>
                </p>
            </div>
        </div>
    );
}
