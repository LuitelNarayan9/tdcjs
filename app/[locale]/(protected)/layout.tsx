/**
 * Protected Layout
 * Layout for authenticated routes (dashboard, profile, forum, etc.)
 * Provides navigation sidebar and header for authenticated users
 * 
 * Next.js 16.1.4 - Layout with async params and Suspense
 */

import { Suspense } from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

interface ProtectedLayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

/**
 * Loading fallback for protected layout
 */
function ProtectedLayoutLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
                <p className="text-slate-600 dark:text-slate-400">Loading...</p>
            </div>
        </div>
    );
}

/**
 * Header component for protected routes
 */
function ProtectedHeader({ locale }: { locale: string }) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href={`/${locale}/dashboard`}
                    className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white hover:opacity-80 transition-opacity"
                >
                    <span className="text-2xl">🏔️</span>
                    <span className="hidden sm:inline">TDCJS</span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        href={`/${locale}/dashboard`}
                        className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href={`/${locale}/forum`}
                        className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                        Forum
                    </Link>
                    <Link
                        href={`/${locale}/blogs`}
                        className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                        Blogs
                    </Link>
                    <Link
                        href={`/${locale}/family-tree`}
                        className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                        Family Tree
                    </Link>
                </nav>

                {/* User Menu Placeholder */}
                <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">U</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

/**
 * Sidebar component for protected routes
 */
function ProtectedSidebar({ locale }: { locale: string }) {
    const navItems = [
        { href: `/${locale}/dashboard`, label: 'Dashboard', icon: '📊' },
        { href: `/${locale}/profile`, label: 'Profile', icon: '👤' },
        { href: `/${locale}/forum`, label: 'Forum', icon: '💬' },
        { href: `/${locale}/blogs`, label: 'Blogs', icon: '📝' },
        { href: `/${locale}/family-tree`, label: 'Family Tree', icon: '🌳' },
        { href: `/${locale}/events`, label: 'Events', icon: '📅' },
        { href: `/${locale}/gallery`, label: 'Gallery', icon: '🖼️' },
        { href: `/${locale}/about-sanstha`, label: 'About Sanstha', icon: '🏛️' },
    ];

    return (
        <aside className="hidden lg:block w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 min-h-[calc(100vh-4rem)]">
            <nav className="p-4 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900 rounded-lg transition-colors"
                    >
                        <span className="text-lg">{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}

export default async function ProtectedLayout({
    children,
    params,
}: ProtectedLayoutProps) {
    const { locale } = await params;

    // Check authentication - redirect to login if not authenticated
    const { userId } = await auth();
    if (!userId) {
        redirect(`/${locale}/login`);
    }

    return (
        <Suspense fallback={<ProtectedLayoutLoading />}>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <ProtectedHeader locale={locale} />

                <div className="flex">
                    <ProtectedSidebar locale={locale} />

                    {/* Main Content */}
                    <main className="flex-1 p-4 sm:p-6 lg:p-8">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </Suspense>
    );
}
