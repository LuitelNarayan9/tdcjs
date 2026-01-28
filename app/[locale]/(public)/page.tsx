/**
 * Landing Page (Home)
 * Public route - accessible without authentication
 * 
 * Next.js 16.1.4 - Server Component with Suspense
 */

import { Suspense } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

// Metadata for SEO
export const metadata: Metadata = {
    title: 'Tumin Dhanbari Chandra Jyoti Sanstha - Village Community Portal',
    description: 'Welcome to Tumin Dhanbari Chandra Jyoti Sanstha. Connect with your village community, explore family trees, join forums, and stay updated with the latest news.',
    keywords: ['Tumin Dhanbari', 'village community', 'Sikkim', 'Gangtok', 'community portal'],
    openGraph: {
        title: 'Tumin Dhanbari Chandra Jyoti Sanstha',
        description: 'Village Community Portal - Connect, Share, and Grow Together',
        type: 'website',
    },
};

/**
 * Landing Page Component
 * Uses Suspense boundaries for progressive loading
 */
export default function LandingPage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section - Critical, load immediately */}
            <Suspense fallback={<HeroSkeleton />}>
                <HeroSection />
            </Suspense>

            {/* About Section - Load after hero */}
            <Suspense fallback={<SectionSkeleton height="h-96" />}>
                <AboutSection />
            </Suspense>

            {/* Stats Section */}
            <Suspense fallback={<StatsSkeleton />}>
                <StatsSection />
            </Suspense>

            {/* Features Section */}
            <Suspense fallback={<SectionSkeleton height="h-96" />}>
                <FeaturesSection />
            </Suspense>

            {/* News Highlights - May have data fetching */}
            <Suspense fallback={<NewsSkeleton />}>
                <NewsHighlights />
            </Suspense>

            {/* Events Preview */}
            <Suspense fallback={<SectionSkeleton height="h-64" />}>
                <EventsPreview />
            </Suspense>

            {/* Testimonials */}
            <Suspense fallback={<SectionSkeleton height="h-96" />}>
                <Testimonials />
            </Suspense>

            {/* Call to Action */}
            <Suspense fallback={<SectionSkeleton height="h-64" />}>
                <CTASection />
            </Suspense>
        </main>
    );
}

// ============================================
// SECTION COMPONENTS (PLACEHOLDERS FOR PHASE 3)
// ============================================

function HeroSection() {
    return (
        <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-blue-600 to-green-600 text-white">
            <div className="text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Tumin Dhanbari Chandra Jyoti Sanstha
                </h1>
                <p className="text-xl md:text-2xl mb-8">
                    Connecting Our Village Community
                </p>
                <div className="flex gap-4 justify-center">
                    <Link
                        href="/register"
                        className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                        Join Community
                    </Link>
                    <Link
                        href="/news"
                        className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
                    >
                        Latest News
                    </Link>
                </div>
            </div>
        </section>
    );
}

function AboutSection() {
    return (
        <section className="py-16 px-4 max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">About Our Village</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Tumin Dhanbari is a beautiful village in Gangtok District, Sikkim.
                    Our Sanstha works to preserve our heritage and connect our community.
                </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
                <StatCard number="500+" label="Families" />
                <StatCard number="2000+" label="Population" />
                <StatCard number="25+" label="Years of Service" />
                <StatCard number="1000+" label="Active Members" />
            </div>
        </section>
    );
}

function StatCard({ number, label }: { number: string; label: string }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md text-center border border-slate-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">{number}</div>
            <div className="text-slate-600">{label}</div>
        </div>
    );
}

function StatsSection() {
    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Community Statistics</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
                        <div className="text-slate-600">Forum Discussions</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
                        <div className="text-slate-600">Blog Posts</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
                        <div className="text-slate-600">Family Tree Members</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeaturesSection() {
    const features = [
        { title: 'Community Forum', description: 'Join discussions with fellow villagers', icon: '💬' },
        { title: 'Family Tree', description: 'Explore and contribute to our heritage', icon: '🌳' },
        { title: 'News & Updates', description: 'Stay informed about village events', icon: '📰' },
        { title: 'Cultural Heritage', description: 'Discover our rich traditions', icon: '🏛️' },
    ];

    return (
        <section className="py-16 px-4 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Our Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature) => (
                    <div key={feature.title} className="bg-white p-6 rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition">
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                        <p className="text-slate-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

async function NewsHighlights() {
    // This would fetch data in a real implementation
    // const news = await getLatestNews(3);

    const news = [
        { id: 1, title: 'Annual Village Festival Announced', date: '2026-01-25', category: 'Events' },
        { id: 2, title: 'New Community Center Opening', date: '2026-01-20', category: 'Development' },
        { id: 3, title: 'Scholarship Applications Open', date: '2026-01-15', category: 'Education' },
    ];

    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900">Latest News</h2>
                    <Link href="/news" className="text-blue-600 hover:underline">View All →</Link>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {news.map((item) => (
                        <article key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
                            <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100" />
                            <div className="p-6">
                                <span className="text-sm text-blue-600 font-medium">{item.category}</span>
                                <h3 className="text-lg font-semibold text-slate-900 mt-2 mb-2">{item.title}</h3>
                                <time className="text-sm text-slate-500">{item.date}</time>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function EventsPreview() {
    return (
        <section className="py-16 px-4 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">Upcoming Events</h2>
            <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Annual Community Gathering</h3>
                <p className="text-lg mb-4">Join us for our annual village celebration</p>
                <p className="text-sm opacity-90">March 15, 2026 • Village Community Center</p>
            </div>
        </section>
    );
}

function Testimonials() {
    const testimonials = [
        { name: 'Ram Prasad Sharma', role: 'Village Elder', quote: 'The Sanstha has brought our community closer than ever before.' },
        { name: 'Sita Devi', role: 'Member', quote: 'I love being able to connect with relatives through the family tree feature.' },
        { name: 'Hari Kumar', role: 'Youth Member', quote: 'The forum helps us discuss important issues affecting our village.' },
    ];

    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Community Voices</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                            <p className="text-slate-600 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                            <div className="font-semibold text-slate-900">{t.name}</div>
                            <div className="text-sm text-slate-500">{t.role}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CTASection() {
    return (
        <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Join Our Community Today</h2>
                <p className="text-lg text-slate-600 mb-8">
                    Become a member to access exclusive features and connect with your village.
                </p>
                <Link
                    href="/register"
                    className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Get Started
                </Link>
            </div>
        </section>
    );
}

// ============================================
// LOADING SKELETONS
// ============================================

function HeroSkeleton() {
    return (
        <section className="relative h-[600px] bg-slate-200 animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="h-12 w-96 bg-slate-300 rounded mx-auto" />
                    <div className="h-6 w-64 bg-slate-300 rounded mx-auto" />
                    <div className="flex gap-4 justify-center pt-4">
                        <div className="h-12 w-32 bg-slate-300 rounded" />
                        <div className="h-12 w-32 bg-slate-300 rounded" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function SectionSkeleton({ height = "h-96" }: { height?: string }) {
    return (
        <section className={`${height} bg-slate-100 animate-pulse`} />
    );
}

function StatsSkeleton() {
    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="h-8 w-64 bg-slate-200 rounded mx-auto mb-12" />
                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="text-center space-y-2">
                            <div className="h-10 w-20 bg-slate-200 rounded mx-auto" />
                            <div className="h-4 w-32 bg-slate-200 rounded mx-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function NewsSkeleton() {
    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <div className="h-8 w-48 bg-slate-200 rounded" />
                    <div className="h-4 w-20 bg-slate-200 rounded" />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="h-48 bg-slate-200" />
                            <div className="p-6 space-y-2">
                                <div className="h-4 w-20 bg-slate-200 rounded" />
                                <div className="h-6 w-full bg-slate-200 rounded" />
                                <div className="h-4 w-24 bg-slate-200 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
