'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'glass shadow-lg backdrop-blur-md'
        : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-3 group"
            >
              <div className="relative w-10 h-10 lg:w-12 lg:h-12">
                <Image
                  src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1765297757/Logo_512_vwh0kd.png"
                  alt="Trésor Moomel Logo"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
              <span className="text-xl lg:text-2xl font-bold text-gradient group-hover:scale-105 transition-transform">
                Trésor Moomel
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-neutral-700 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105 relative group"
            >
              Accueil
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              href="/articles"
              className="text-neutral-700 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105 relative group"
            >
              Articles
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {session?.user?.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="text-neutral-700 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105 relative group"
              >
                Admin
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}

            {/* User Menu */}
            {session ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {session.user.name?.[0] || 'U'}
                    </span>
                  </div>
                  <span className="text-neutral-700 font-medium">
                    {session.user.name || 'Utilisateur'}
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="btn-secondary text-sm"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="btn-primary text-sm"
              >
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors focus-ring"
              aria-label="Menu"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute h-0.5 w-6 bg-neutral-700 transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : '-translate-y-1'
                  }`}></span>
                <span className={`absolute h-0.5 w-6 bg-neutral-700 transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                <span className={`absolute h-0.5 w-6 bg-neutral-700 transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-1'
                  }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className="py-4 space-y-4 border-t border-neutral-200/50">
            <Link
              href="/"
              className="block text-neutral-700 hover:text-primary-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>

            <Link
              href="/articles"
              className="block text-neutral-700 hover:text-primary-600 font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Articles
            </Link>

            {session?.user?.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="block text-neutral-700 hover:text-primary-600 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}

            {session ? (
              <div className="space-y-4 pt-4 border-t border-neutral-200/50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {session.user.name?.[0] || 'U'}
                    </span>
                  </div>
                  <span className="text-neutral-700 font-medium">
                    {session.user.name || 'Utilisateur'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full btn-secondary text-sm"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="block w-full text-center btn-primary text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}