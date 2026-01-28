/**
 * Verify Email Page
 * With Clerk, email verification is handled by Clerk's flows
 * This page shows information about email verification status
 * 
 * Next.js 16.1.4 - Page with async params
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Verify Email | TDCJS',
    description: 'Verify your email address',
};

interface VerifyEmailPageProps {
    params: Promise<{ locale: string }>;
}

export default async function VerifyEmailPage({ params }: VerifyEmailPageProps) {
    const { locale } = await params;
    const { userId } = await auth();
    const user = await currentUser();

    // If user is logged in and has verified email, redirect to dashboard
    if (userId && user) {
        const primaryEmail = user.emailAddresses.find(
            (email) => email.id === user.primaryEmailAddressId
        );

        if (primaryEmail?.verification?.status === 'verified') {
            redirect(`/${locale}/dashboard`);
        }
    }

    // If not logged in, suggest logging in
    if (!userId) {
        return (
            <div className="text-center space-y-4">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Verify Your Email
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Please sign in to verify your email address. Check your inbox for a verification link from our authentication provider.
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

    // User is logged in but email not verified - Clerk handles verification emails
    return (
        <div className="text-center space-y-4">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                <svg className="h-8 w-8 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Check Your Email
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
                We&apos;ve sent a verification link to your email address. Please click the link to verify your account.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
                Didn&apos;t receive the email? Check your spam folder or try signing in again to resend.
            </p>
            <div className="pt-4 space-y-2">
                <Link
                    href={`/${locale}/login`}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Return to Login
                </Link>
            </div>
        </div>
    );
}
