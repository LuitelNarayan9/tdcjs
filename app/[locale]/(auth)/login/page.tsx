/**
 * Login Page
 * Professional login page with email/password and Google OAuth
 * 
 * Next.js 16.1.4 - Server Component
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { LoginForm } from './_components/login-form';
import { SocialLogin } from '@/components/features/auth/social-login';

export const metadata: Metadata = {
    title: 'Sign In - Tumin Dhanbari Chandra Jyoti Sanstha',
    description: 'Sign in to your account to access the village community portal.',
};

interface LoginPageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function LoginPage({ params, searchParams }: LoginPageProps) {
    const { locale } = await params;
    const { callbackUrl } = await searchParams;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Logo & Header */}
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-6">
                        <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Sign in to access the Tumin Dhanbari community portal
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="p-8">
                        <LoginForm locale={locale} callbackUrl={callbackUrl} />

                        {/* Social Login */}
                        <div className="mt-6">
                            <SocialLogin locale={locale} mode="login" callbackUrl={callbackUrl} />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-slate-50 dark:bg-slate-700/50 px-8 py-4 border-t border-slate-200 dark:border-slate-700">
                        <div className="text-center space-y-3">
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Don't have an account?{' '}
                                <Link
                                    href={`/${locale}/register`}
                                    className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition"
                                >
                                    Create one now
                                </Link>
                            </p>
                            <Link
                                href={`/${locale}/`}
                                className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 transition"
                            >
                                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to home
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-6 text-slate-400 dark:text-slate-500">
                    <div className="flex items-center gap-2">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span className="text-xs">Secure</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-xs">Trusted</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-xs">Community</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
