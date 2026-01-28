'use client';

/**
 * Admin Routes Error Boundary
 * Handles errors in admin pages with additional context
 * 
 * Next.js 16.1.4 - Error Boundary Component
 */

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorBoundaryProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function AdminErrorBoundary({ error, reset }: ErrorBoundaryProps) {
    useEffect(() => {
        // Log error to monitoring service
        console.error('Admin route error:', error);
    }, [error]);

    const isDevelopment = process.env.NODE_ENV === 'development';

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center max-w-lg">
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
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                </div>

                {/* Error Message */}
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    Admin Panel Error
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                    An error occurred in the admin panel. This has been logged and the team has been notified.
                </p>

                {/* Error Details (Development Only) */}
                {isDevelopment && (
                    <div className="mb-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-left overflow-auto">
                        <p className="text-xs font-mono text-red-600 dark:text-red-400 mb-2">
                            {error.message}
                        </p>
                        {error.stack && (
                            <pre className="text-xs font-mono text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                                {error.stack}
                            </pre>
                        )}
                    </div>
                )}

                {error.digest && (
                    <div className="mb-6 p-3 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Error ID: <span className="font-mono">{error.digest}</span>
                        </p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
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
                        href="/admin"
                        className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-base font-medium rounded-lg text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
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
                        Admin Dashboard
                    </Link>
                </div>

                {/* Additional Links */}
                <div className="mt-6 flex justify-center gap-4 text-sm">
                    <Link
                        href="/dashboard"
                        className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                    >
                        ← Back to Site
                    </Link>
                    <span className="text-slate-300 dark:text-slate-600">|</span>
                    <Link
                        href="/contact"
                        className="text-red-600 hover:text-red-500 dark:text-red-400"
                    >
                        Report Issue
                    </Link>
                </div>
            </div>
        </div>
    );
}
