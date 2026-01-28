'use client';

/**
 * Forgot Password Form Component with Clerk
 * Custom UI for requesting password reset
 * 
 * Next.js 16.1.4 - Client Component
 */

import { useState, useTransition } from 'react';
import { useSignIn } from '@clerk/nextjs';
import Link from 'next/link';

interface ForgotPasswordFormProps {
    locale: string;
}

export function ForgotPasswordForm({ locale }: ForgotPasswordFormProps) {
    const { signIn } = useSignIn();
    const [isPending, startTransition] = useTransition();

    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email) {
            setError('Please enter your email address');
            return;
        }

        if (!signIn) {
            setError('Authentication service unavailable');
            return;
        }

        startTransition(async () => {
            try {
                // Request password reset via Clerk
                await signIn.create({
                    strategy: 'reset_password_email_code',
                    identifier: email.toLowerCase(),
                });

                setSuccess(true);
            } catch (err) {
                console.error('Forgot password error:', err);
                if (err instanceof Error) {
                    if (err.message.includes('not found') || err.message.includes('identifier')) {
                        // Don't reveal if email exists for security
                        setSuccess(true);
                    } else {
                        setError(err.message || 'Failed to send reset email');
                    }
                } else {
                    setError('Failed to send reset email. Please try again.');
                }
            }
        });
    };

    if (success) {
        return (
            <div className="text-center py-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                    <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                    Check Your Email
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    If an account exists for <strong>{email}</strong>, we&apos;ve sent a password reset code.
                </p>
                <Link
                    href={`/${locale}/reset-password?email=${encodeURIComponent(email)}`}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                    Enter Reset Code
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
                <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-600 dark:text-red-400">
                    {error}
                </div>
            )}

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    placeholder="Enter your email"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {isPending ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                    </span>
                ) : (
                    'Send Reset Link'
                )}
            </button>
        </form>
    );
}
