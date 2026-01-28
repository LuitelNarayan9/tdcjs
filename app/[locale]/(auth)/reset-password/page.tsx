/**
 * Reset Password Page
 * Enter code and new password
 * 
 * Next.js 16.1.4 - Page with async params
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { ResetPasswordForm } from './_components/reset-password-form';

export const metadata: Metadata = {
    title: 'Reset Password | TDCJS',
    description: 'Set a new password for your TDCJS account',
};

interface ResetPasswordPageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ email?: string }>;
}

export default async function ResetPasswordPage({ params, searchParams }: ResetPasswordPageProps) {
    const { locale } = await params;
    const { email } = await searchParams;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                    Reset Password
                </h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Enter the code from your email and choose a new password
                </p>
            </div>

            {/* Form Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8">
                <ResetPasswordForm locale={locale} email={email} />

                {/* Back to Login */}
                <div className="mt-6 text-center text-sm">
                    <p className="text-slate-600 dark:text-slate-400">
                        Remember your password?{' '}
                        <Link
                            href={`/${locale}/login`}
                            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
