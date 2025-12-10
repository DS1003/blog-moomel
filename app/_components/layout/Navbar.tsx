'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Button from '../ui/Button';

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
        ? 'bg-white/80 backdrop-blur-xl shadow-sm py-3'
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
                <div className="relative w-10 h-10 lg:w-12 lg:h-12 overflow-hidden rounded-full border border-neutral-100 bg-white">
                  <Image
                    src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1765297757/Logo_512_vwh0kd.png"
                    alt="Trésor Moomel Logo"
                    fill
                    className="object-contain p-1 group-hover:scale-110 transition-transform duration-500"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl lg:text-2xl font-serif font-bold text-neutral-900 leading-none group-hover:text-primary-600 transition-colors">
                    Trésor Moomel
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-neutral-500 font-medium ml-0.5">
                    Marketplace & Blog
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {['Accueil', 'Articles', 'Catégories', 'À Propos'].map((item) => {
                const href = item === 'Accueil' ? '/' : `/${item.toLowerCase().replace(' ', '-').replace('à-propos', 'about').replace('é', 'e')}`;
                return (
                  <Link
                    key={item}
                    href={href}
                    className="text-neutral-600 hover:text-neutral-900 font-medium text-sm tracking-wide transition-all relative group py-2"
                  >
                    {item}
                    <span className="absolute bottom-0 left-1/2 w-0 h-px bg-neutral-900 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                  </Link>
                )
              })}
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-6">
              {session?.user?.role === 'ADMIN' && (
                <Link href="/admin" className="text-xs font-bold text-primary-600 border border-primary-200 px-3 py-1 rounded-full hover:bg-primary-50 transition-colors uppercase tracking-wider">
                  Admin
                </Link>
              )}

              {session ? (
                <div className="flex items-center gap-4 pl-4 border-l border-neutral-200">
                  <div className="text-right hidden xl:block">
                    <p className="text-sm font-bold text-neutral-900 leading-none">{session.user.name}</p>
                    <p className="text-xs text-neutral-500">Membre</p>
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
                    {/* Dropdown for user (could be expanded) */}
                    <button
                      onClick={() => signOut()}
                      className="absolute top-12 right-0 w-32 bg-white shadow-xl rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 text-left"
                    >
                      <span className="block px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg">Déconnexion</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/auth/signin" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                    Connexion
                  </Link>
                  <Link href="/auth/register" className="btn-primary py-2.5 px-6 text-sm shadow-lg shadow-primary-500/20">
                    Rejoindre
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-neutral-800"
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
      <div className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transition-all duration-500 lg:hidden flex flex-col justify-center items-center space-y-8 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <nav className="flex flex-col items-center gap-6 text-center">
          {['Accueil', 'Articles', 'Catégories', 'À Propos', 'Contact'].map((item) => (
            <Link
              key={item}
              href={item === 'Accueil' ? '/' : `/${item.toLowerCase().replace(' ', '-').replace('à-propos', 'about').replace('é', 'e')}`}
              className="text-3xl font-serif text-neutral-900 hover:text-primary-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </Link>
          ))}

          <div className="w-12 h-1 bg-primary-100 rounded-full my-4"></div>

          {session ? (
            <button
              onClick={() => { signOut(); setIsMenuOpen(false); }}
              className="text-lg font-medium text-red-500"
            >
              Se déconnecter
            </button>
          ) : (
            <div className="flex flex-col gap-4 mt-4">
              <Link href="/auth/signin" className="text-lg font-medium text-neutral-600" onClick={() => setIsMenuOpen(false)}>
                Connexion
              </Link>
              <Link href="/auth/register" className="btn-primary text-lg px-8 py-3" onClick={() => setIsMenuOpen(false)}>
                Rejoindre le cercle
              </Link>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}