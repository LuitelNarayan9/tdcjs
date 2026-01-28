/**
 * Admin Layout
 * Layout for admin routes with role-based access control
 * Provides admin navigation and guards
 * 
 * Next.js 16.1.4 - Layout with async params and role checking
 */

import { Suspense } from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db';

interface AdminLayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

/**
 * Loading fallback for admin layout
 */
function AdminLayoutLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
                <p className="text-slate-600 dark:text-slate-400">Loading admin panel...</p>
            </div>
        </div>
    );
}

/**
 * Check if user has admin access
 */
async function checkAdminAccess(userId: string): Promise<boolean> {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true },
        });

        const adminRoles = ['ADMIN', 'SUPER_ADMIN'];
        return user ? adminRoles.includes(user.role) : false;
    } catch (error) {
        console.error('Error checking admin access:', error);
        return false;
    }
}

/**
 * Admin Header component
 */
function AdminHeader({ locale }: { locale: string }) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-red-200 dark:border-red-900 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href={`/${locale}/admin`}
                    className="flex items-center gap-2 text-xl font-bold text-red-600 dark:text-red-500 hover:opacity-80 transition-opacity"
                >
                    <span className="text-2xl">⚙️</span>
                    <span>Admin Panel</span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        href={`/${locale}/admin`}
                        className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href={`/${locale}/admin/users`}
                        className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                        Users
                    </Link>
                    <Link
                        href={`/${locale}/admin/forum`}
                        className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                        Forum
                    </Link>
                    <Link
                        href={`/${locale}/admin/blogs`}
                        className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                        Blogs
                    </Link>
                </nav>

                {/* Back to Site */}
                <div className="flex items-center gap-4">
                    <Link
                        href={`/${locale}/dashboard`}
                        className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                        ← Back to Site
                    </Link>
                </div>
            </div>
        </header>
    );
}

/**
 * Admin Sidebar component
 */
function AdminSidebar({ locale }: { locale: string }) {
    const navSections = [
        {
            title: 'Overview',
            items: [
                { href: `/${locale}/admin`, label: 'Dashboard', icon: '📊' },
                { href: `/${locale}/admin/analytics`, label: 'Analytics', icon: '📈' },
            ],
        },
        {
            title: 'Content Management',
            items: [
                { href: `/${locale}/admin/users`, label: 'Users', icon: '👥' },
                { href: `/${locale}/admin/forum`, label: 'Forum', icon: '💬' },
                { href: `/${locale}/admin/blogs`, label: 'Blogs', icon: '📝' },
                { href: `/${locale}/admin/news`, label: 'News', icon: '📰' },
                { href: `/${locale}/admin/events`, label: 'Events', icon: '📅' },
            ],
        },
        {
            title: 'Features',
            items: [
                { href: `/${locale}/admin/family-tree`, label: 'Family Tree', icon: '🌳' },
                { href: `/${locale}/admin/gallery`, label: 'Gallery', icon: '🖼️' },
                { href: `/${locale}/admin/documents`, label: 'Documents', icon: '📄' },
                { href: `/${locale}/admin/donations`, label: 'Donations', icon: '💰' },
                { href: `/${locale}/admin/videos`, label: 'Videos', icon: '🎥' },
            ],
        },
        {
            title: 'Settings',
            items: [
                { href: `/${locale}/admin/executive-members`, label: 'Executive Members', icon: '🏛️' },
                { href: `/${locale}/admin/contact`, label: 'Contact Inquiries', icon: '📧' },
                { href: `/${locale}/admin/gamification`, label: 'Gamification', icon: '🎮' },
                { href: `/${locale}/admin/settings`, label: 'Settings', icon: '⚙️' },
            ],
        },
    ];

    return (
        <aside className="hidden lg:block w-72 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 min-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="p-4 space-y-6">
                {navSections.map((section) => (
                    <div key={section.title}>
                        <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            {section.title}
                        </h3>
                        <div className="space-y-1">
                            {section.items.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900 rounded-lg transition-colors"
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    );
}

export default async function AdminLayout({
    children,
    params,
}: AdminLayoutProps) {
    const { locale } = await params;

    // Check authentication
    const { userId } = await auth();
    if (!userId) {
        redirect(`/${locale}/login?redirect_url=/${locale}/admin`);
    }

    // Check admin role
    const isAdmin = await checkAdminAccess(userId);
    if (!isAdmin) {
        redirect(`/${locale}/unauthorized`);
    }

    return (
        <Suspense fallback={<AdminLayoutLoading />}>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <AdminHeader locale={locale} />

                <div className="flex">
                    <AdminSidebar locale={locale} />

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
