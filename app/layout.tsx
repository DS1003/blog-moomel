import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import NextAuthSessionProvider from './_components/providers/SessionProvider';
import Navbar from './_components/layout/Navbar';
import Footer from './_components/layout/Footer';
import ScrollToTop from './_components/ui/ScrollToTop';
import MobileTabBar from './_components/layout/MobileTabBar';
import { LanguageProvider } from './_components/providers/LanguageProvider';
import { SettingsProvider } from './_components/providers/SettingsProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

import { getSettings } from '@/lib/settings';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteName = settings.site_name || 'Trésor Moomel';
  const description = settings.site_description || 'Découvrez des produits authentiques et une beauté consciente.';

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: description,
    keywords: ['cosmétique naturelle', 'beauté authentique', 'soins bio', 'sénégal', 'éthique', 'responsable', 'moomel'],
    authors: [{ name: 'Moomel Team' }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
    openGraph: {
      title: siteName,
      description: description,
      url: '/',
      siteName: siteName,
      images: [
        {
          url: '/images/senegalese-modern-traditional.png',
          width: 1024,
          height: 1024,
          alt: siteName,
        },
      ],
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description: description,
      images: ['/images/senegalese-modern-traditional.png'],
    },
    robots: {
      index: settings.search_indexing !== 'false',
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSettings();
  const primaryColor = settings.primary_color || '#B88636';

  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
          :root {
            --primary-500: ${primaryColor};
            --primary-600: ${primaryColor}dd;
            --primary-400: ${primaryColor}aa;
          }
        `}} />
      </head>
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
        <NextAuthSessionProvider>
          <SettingsProvider settings={settings}>
            <LanguageProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
                <ScrollToTop />
                <MobileTabBar />
              </div>
            </LanguageProvider>
          </SettingsProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}