/**
 * Forgot Password Page
 * Request password reset email
 * 
 * Next.js 16.1.4 - Page with async params
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { ForgotPasswordForm } from './_components/forgot-password-form';

export const metadata: Metadata = {
    title: 'Forgot Password | TDCJS',
    description: 'Reset your TDCJS password',
};

interface ForgotPasswordPageProps {
    params: Promise<{ locale: string }>;
}

export default async function ForgotPasswordPage({ params }: ForgotPasswordPageProps) {
    const { locale } = await params;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                    Forgot Password?
                </h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Enter your email and we&apos;ll send you a reset link
                </p>
            </div>

            {/* Form Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8">
                <ForgotPasswordForm locale={locale} />

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
