/**
 * Registration Page
 * Professional registration page with email/password and Google OAuth
 * 
 * Next.js 16.1.4 - Server Component
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { RegisterForm } from './_components/register-form';
import { SocialLogin } from '@/components/features/auth/social-login';

export const metadata: Metadata = {
    title: 'Create Account - Tumin Dhanbari Chandra Jyoti Sanstha',
    description: 'Create an account to join the village community portal.',
};

interface RegisterPageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function RegisterPage({ params, searchParams }: RegisterPageProps) {
    const { locale } = await params;
    const { callbackUrl } = await searchParams;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-900/20 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Logo & Header */}
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg mb-6">
                        <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        Create Account
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Join the Tumin Dhanbari community today
                    </p>
                </div>

                {/* Registration Card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="p-8">
                        <RegisterForm locale={locale} />

                        {/* Social Login */}
                        <div className="mt-6">
                            <SocialLogin locale={locale} mode="register" callbackUrl={callbackUrl} />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-slate-50 dark:bg-slate-700/50 px-8 py-4 border-t border-slate-200 dark:border-slate-700">
                        <div className="text-center space-y-3">
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Already have an account?{' '}
                                <Link
                                    href={`/${locale}/login`}
                                    className="font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 transition"
                                >
                                    Sign in
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

                {/* Benefits */}
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                        <svg className="h-8 w-8 text-emerald-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Connect with Community</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                        <svg className="h-8 w-8 text-emerald-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Join Discussions</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                        <svg className="h-8 w-8 text-emerald-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.447-.894L15 7m0 13V7" />
                        </svg>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Explore Heritage</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
