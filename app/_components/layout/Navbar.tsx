'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/app/_components/providers/LanguageProvider';
import LanguageSwitcher from '@/app/_components/ui/LanguageSwitcher';

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  // Pages where the hero section is dark/image-heavy, requiring white text initially
  const isDarkHeroPage = pathname === '/about' || pathname?.startsWith('/articles');

  // Determine if we should use dark text (scrolled OR not on a dark hero page)
  const useDarkText = isScrolled || !isDarkHeroPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: t.nav.home, key: 'Accueil' },
    { label: t.nav.articles, key: 'Articles' },
    { label: t.nav.categories, key: 'Catégories' },
    { label: t.nav.about, key: 'À Propos' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
        ? 'bg-white/90 backdrop-blur-xl shadow-sm py-3'
        : 'bg-transparent py-6'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center gap-3 group"
              >
                <div className="relative w-10 h-10 lg:w-12 lg:h-12 overflow-hidden rounded-full border border-neutral-100 bg-white shadow-sm">
                  <Image
                    src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1765297757/Logo_512_vwh0kd.png"
                    alt="Moomel Logo"
                    fill
                    className="object-contain p-1 group-hover:scale-110 transition-transform duration-500"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className={`text-xl lg:text-2xl font-serif font-bold leading-none transition-colors ${useDarkText ? 'text-neutral-900 group-hover:text-primary-600' : 'text-white group-hover:text-primary-200'
                    }`}>
                    Moomel
                  </span>
                  <span className={`text-[0.65rem] uppercase tracking-[0.2em] font-medium ml-0.5 transition-colors ${useDarkText ? 'text-neutral-500' : 'text-white/80'
                    }`}>
                    Blog
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => {
                const href = item.key === 'Accueil' ? '/' : `/${item.key.toLowerCase().replace(' ', '-').replace('à-propos', 'about').replace('é', 'e')}`;
                const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href));

                return (
                  <Link
                    key={item.key}
                    href={href}
                    className={`font-medium text-sm tracking-wide transition-all relative group py-2 ${isActive
                      ? (useDarkText ? 'text-primary-800 font-bold' : 'text-white font-bold')
                      : (useDarkText ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/90 hover:text-white')
                      }`}
                  >
                    {item.label}
                    <span className={`absolute bottom-0 left-1/2 h-px transition-all duration-300 transform -translate-x-1/2 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      } ${useDarkText ? 'bg-primary-600' : 'bg-white'
                      }`}></span>
                  </Link>
                )
              })}
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-6">
              <LanguageSwitcher variant={useDarkText ? 'dark' : 'light'} />

              {session?.user?.role === 'ADMIN' && (
                <Link href="/admin" className={`text-xs font-bold px-3 py-1 rounded-full border transition-colors uppercase tracking-wider ${useDarkText
                  ? 'text-primary-600 border-primary-200 hover:bg-primary-50'
                  : 'text-primary-200 border-primary-400/50 hover:bg-white/10'
                  }`}>
                  {t.nav.admin}
                </Link>
              )}

              {session ? (
                <div className={`flex items-center gap-4 pl-4 border-l ${useDarkText ? 'border-neutral-200' : 'border-white/20'
                  }`}>
                  <div className="text-right hidden xl:block">
                    <p className={`text-sm font-bold leading-none transition-colors ${useDarkText ? 'text-neutral-900' : 'text-white'
                      }`}>{session.user.name}</p>
                    <p className={`text-xs transition-colors ${useDarkText ? 'text-neutral-500' : 'text-white/70'
                      }`}>{t.nav.member}</p>
                  </div>
                  <div className="relative group cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-neutral-100 border-2 border-white shadow-sm overflow-hidden">
                      {session.user.image ? (
                        <Image src={session.user.image} alt="User" fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-700 font-bold">
                          {session.user.name?.[0] || 'U'}
                        </div>
                      )}
                    </div>
                    {/* Dropdown for user */}
                    <div className="absolute top-12 right-0 w-40 bg-white shadow-xl rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 text-left border border-neutral-100">
                      <Link href="/profil" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-lg mb-1 font-medium">
                        {t.nav.profile}
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg font-medium"
                      >
                        {t.nav.logout}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/auth/signin" className={`text-sm font-medium transition-colors ${useDarkText ? 'text-neutral-600 hover:text-neutral-900' : 'text-white hover:text-white/80'
                    }`}>
                    {t.nav.login}
                  </Link>
                  <Link href="/auth/register" className="btn-primary py-2.5 px-6 text-sm shadow-lg shadow-primary-500/20">
                    {t.nav.join}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-4">
              <LanguageSwitcher variant={useDarkText ? 'dark' : 'light'} />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 transition-colors ${useDarkText ? 'text-neutral-800' : 'text-white'}`}
                aria-label="Menu"
              >
                <div className="w-8 flex flex-col items-end gap-1.5">
                  <span className={`h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'w-8 rotate-45 translate-y-2' : 'w-8'}`}></span>
                  <span className={`h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-6'}`}></span>
                  <span className={`h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'w-8 -rotate-45 -translate-y-2' : 'w-4'}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transition-all duration-500 lg:hidden flex flex-col justify-center items-center space-y-8 ${isMenuOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}>
        <nav className="flex flex-col items-center gap-6 text-center">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              href={item.key === 'Accueil' ? '/' : `/${item.key.toLowerCase().replace(' ', '-').replace('à-propos', 'about').replace('é', 'e')}`}
              className="text-3xl font-serif text-neutral-900 hover:text-primary-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-3xl font-serif text-neutral-900 hover:text-primary-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {t.nav.contact}
          </Link>

          <div className="w-12 h-1 bg-primary-100 rounded-full my-4"></div>

          {session ? (
            <div className="flex flex-col gap-4 items-center">
              <div className="flex items-center gap-3 bg-neutral-100 px-4 py-2 rounded-full">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  {session.user.image ? (
                    <Image src={session.user.image} alt={session.user.name || "User"} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs">
                      {session.user.name?.[0] || 'U'}
                    </div>
                  )}
                </div>
                <span className="font-medium text-neutral-900">{session.user.name}</span>
              </div>
              <Link
                href="/profil"
                className="text-xl font-medium text-neutral-800 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.profile}
              </Link>
              <button
                onClick={() => { signOut(); setIsMenuOpen(false); }}
                className="text-lg font-medium text-red-500 hover:text-red-600"
              >
                {t.nav.logout}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 mt-4">
              <Link href="/auth/signin" className="text-lg font-medium text-neutral-600" onClick={() => setIsMenuOpen(false)}>
                {t.nav.login}
              </Link>
              <Link href="/auth/register" className="btn-primary text-lg px-8 py-3" onClick={() => setIsMenuOpen(false)}>
                {t.nav.join}
              </Link>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}