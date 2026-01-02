import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import NextAuthSessionProvider from './_components/providers/SessionProvider';
import Navbar from './_components/layout/Navbar';
import Footer from './_components/layout/Footer';
import ScrollToTop from './_components/ui/ScrollToTop';
import MobileTabBar from './_components/layout/MobileTabBar';
import { LanguageProvider } from './_components/providers/LanguageProvider';

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

export const metadata: Metadata = {
  title: 'Moomel | Beauté Naturelle et Authentique',
  description: 'Moomel est la référence pour les cosmétiques naturels et durables. Découvrez des produits authentiques, éthiques et une communauté engagée pour une beauté plus consciente.',
  keywords: ['cosmétique naturelle', 'beauté authentique', 'soins bio', 'sénégal', 'éthique', 'responsable', 'moomel'],
  authors: [{ name: 'Moomel Team' }],
  creator: 'Moomel',
  publisher: 'Moomel',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Moomel | Beauté Naturelle et Authentique',
    description: 'Offrez à votre peau la beauté qu\'elle mérite. Des produits cosmétiques naturels, authentiques et responsables.',
    url: '/',
    siteName: 'Moomel',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moomel | Beauté Naturelle et Authentique',
    description: 'Une beauté naturelle, authentique et éthique.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
        <NextAuthSessionProvider>
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
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}