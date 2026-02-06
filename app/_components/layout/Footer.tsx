'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/app/_components/providers/LanguageProvider';
import { useSettings } from '@/app/_components/providers/SettingsProvider';

export default function Footer() {
  const settings = useSettings();
  const { t } = useLanguage();
  const pathname = usePathname();

  const menuLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.articles, href: '/articles' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.contact, href: '/contact' }
  ];

  // Don't show public footer on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="relative bg-neutral-950 text-white overflow-hidden pt-16 md:pt-20 pb-8 md:pb-10">
      {/* Organic Background Elements (Dark Mode Version) */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary-900/20 rounded-full blur-[80px] md:blur-[100px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-accent-900/10 rounded-full blur-[80px] md:blur-[100px] opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-8 mb-12 md:mb-16 text-center md:text-left">

          {/* Brand Section (4 Cols) */}
          <div className="md:col-span-5 space-y-6 md:space-y-8">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-500 group-hover:rotate-12">
                <Image
                  src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1765297757/Logo_512_vwh0kd.png"
                  alt="Moomel Logo"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <span className="text-2xl md:text-3xl font-serif text-white tracking-tight group-hover:text-primary-200 transition-colors">
                {settings.site_name}
              </span>
            </Link>
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-sm font-light mx-auto md:mx-0">
              {t.footer.desc}
            </p>

            <div className="flex justify-center md:justify-start gap-4 pt-2">
              {[
                { label: 'Twitter', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
                { label: 'Instagram', path: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.369-.315-.49-.753-.49-1.243 0-.49.121-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.369.315.49.753.49 1.243 0 .49-.121.928-.49 1.243-.369.315-.807.49-1.297.49z' },
                { label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-primary-600 hover:border-primary-500 hover:scale-110 active:scale-95 transition-all duration-300"
                  aria-label={social.label}
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Quick Links (3 Cols) */}
          <div className="md:col-span-3">
            <h3 className="text-xl md:text-2xl font-serif text-white mb-6 md:mb-8">{t.footer.navigation}</h3>
            <ul className="space-y-3 md:space-y-4">
              {[
                { label: t.nav.home, href: '/' },
                { label: t.nav.articles, href: '/articles' },
                { label: t.nav.about, href: '/about' },
                { label: t.nav.contact, href: '/contact' }
              ].map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="group flex items-center justify-center md:justify-start text-neutral-400 hover:text-primary-200 transition-colors duration-300">
                    <span className="w-0 h-px bg-primary-400 mr-0 transition-all duration-300 group-hover:w-4 group-hover:mr-3 opacity-0 group-hover:opacity-100 hidden md:inline-block"></span>
                    <span className="text-base md:text-lg font-light">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal (3 Cols) */}
          <div className="md:col-span-3">
            <h3 className="text-xl md:text-2xl font-serif text-white mb-6 md:mb-8">{t.footer.legal}</h3>
            <ul className="space-y-3 md:space-y-4">
              {[
                { label: t.footer.privacy, href: '/privacy' },
                { label: t.footer.terms, href: '/terms' },
                { label: t.footer.cookies, href: '/cookies' },
                { label: t.footer.mentions, href: '/mentions-legales' }
              ].map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="group flex items-center justify-center md:justify-start text-neutral-400 hover:text-primary-200 transition-colors duration-300">
                    <span className="w-0 h-px bg-primary-400 mr-0 transition-all duration-300 group-hover:w-4 group-hover:mr-3 opacity-0 group-hover:opacity-100 hidden md:inline-block"></span>
                    <span className="text-base md:text-lg font-light">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-12 md:mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-neutral-500 font-light text-center">
          <p className="mb-4 md:mb-0">
            © {new Date().getFullYear()} {settings.site_name}. {t.footer.rights}
          </p>
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Sénégal 🇸🇳</span>
            <span className="w-1 h-1 rounded-full bg-neutral-700"></span>
            <span className="flex items-center gap-2 hover:text-white transition-colors whitespace-nowrap">
              {t.footer.made_with} <span className="text-red-500 animate-pulse">❤️</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
