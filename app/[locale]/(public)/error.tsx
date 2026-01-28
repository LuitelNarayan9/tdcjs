'use client';

/**
 * Public Routes Error Boundary
 * Handles errors in public pages (landing, news, contact, about)
 * 
 * Next.js 16.1.4 - Error Boundary Component
 */

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorBoundaryProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function PublicErrorBoundary({ error, reset }: ErrorBoundaryProps) {
    useEffect(() => {
        // Log error to monitoring service
        console.error('Public route error:', error);
    }, [error]);

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                {/* Error Icon */}
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
                    <svg
                        className="h-8 w-8 text-red-600 dark:text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                {/* Error Message */}
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    Something went wrong
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                    We apologize for the inconvenience. An error occurred while loading this page.
                </p>
                {error.digest && (
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">
                        Error ID: {error.digest}
                    </p>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        <svg
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        Try Again
                    </button>

                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-base font-medium rounded-lg text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        <svg
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
