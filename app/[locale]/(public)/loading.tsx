/**
 * Public Routes Loading State
 * Shown while page content is loading
 * 
 * Next.js 16.1.4 - Loading UI
 */

export default function PublicLoading() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Skeleton */}
            <header className="h-16 bg-white border-b border-slate-200 animate-pulse">
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                    <div className="h-8 w-32 bg-slate-200 rounded" />
                    <div className="hidden md:flex gap-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-4 w-20 bg-slate-200 rounded" />
                        ))}
                    </div>
                    <div className="h-8 w-8 bg-slate-200 rounded-full" />
                </div>
            </header>

            {/* Main Content Skeleton */}
            <main>
                {/* Hero Skeleton */}
                <section className="h-[600px] bg-slate-200 animate-pulse">
                    <div className="h-full flex items-center justify-center">
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

                {/* Content Sections Skeleton */}
                <section className="py-16 px-4 max-w-6xl mx-auto">
                    <div className="h-8 w-64 bg-slate-200 rounded mx-auto mb-8" />
                    <div className="grid md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-32 bg-slate-200 rounded" />
                        ))}
                    </div>
                </section>

                <section className="py-16 bg-slate-50">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="h-8 w-48 bg-slate-200 rounded mx-auto mb-8" />
                        <div className="grid md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-64 bg-slate-200 rounded" />
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer Skeleton */}
            <footer className="h-64 bg-slate-100 animate-pulse">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="grid md:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="space-y-4">
                                <div className="h-6 w-32 bg-slate-200 rounded" />
                                <div className="h-4 w-full bg-slate-200 rounded" />
                                <div className="h-4 w-3/4 bg-slate-200 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}
