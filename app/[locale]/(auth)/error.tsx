'use client';

/**
 * Auth Routes Error Boundary
 * Handles errors in authentication pages (login, register, etc.)
 * 
 * Next.js 16.1.4 - Error Boundary Component
 */

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorBoundaryProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function AuthErrorBoundary({ error, reset }: ErrorBoundaryProps) {
    useEffect(() => {
        // Log error to monitoring service
        console.error('Auth route error:', error);
    }, [error]);

    return (
        <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center max-w-md px-4">
                {/* Error Icon */}
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                    <svg
                        className="h-6 w-6 text-red-600 dark:text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                </div>

                {/* Error Message */}
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Authentication Error
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    We encountered an error during authentication. Please try again.
                </p>

                {error.digest && (
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
                        Error ID: {error.digest}
                    </p>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                    <button
                        onClick={reset}
                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        Try Again
                    </button>

                    <Link
                        href="/"
                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
