/**
 * Locale Layout
 * Handles dynamic locale segment for internationalization
 * 
 * Next.js 16.1.4 - Layout with async params
 */

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

// Supported locales
const supportedLocales = ['en', 'ne'];

export default async function LocaleLayout({
    children,
    params,
}: LocaleLayoutProps) {
    const { locale } = await params;

    // Validate locale (fallback to 'en' if invalid)
    const validLocale = supportedLocales.includes(locale) ? locale : 'en';

    return (
        <div data-locale={validLocale} lang={validLocale}>
            {children}
        </div>
    );
}

/**
 * Generate static params for supported locales
 * This enables static generation for all locale paths
 */
export function generateStaticParams() {
    return supportedLocales.map((locale) => ({ locale }));
}
