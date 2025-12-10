'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Home, Newspaper, Search, User } from 'lucide-react';

export default function MobileTabBar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Hide on scroll down, show on scroll up
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // Don't show on admin pages or auth pages
    if (pathname?.startsWith('/admin') || pathname?.startsWith('/auth')) return null;

    const tabs = [
        { name: 'Accueil', href: '/', id: 'home', icon: Home },
        { name: 'Articles', href: '/articles', id: 'articles', icon: Newspaper },
        { name: 'Explorer', href: '/categories', id: 'explore', icon: Search },
        { name: 'Profil', href: session ? '/profil' : '/auth/signin', id: 'profile', icon: User },
    ];

    return (
        <div className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-all duration-500 ease-in-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            {/* Glassmorphism Effect */}
            <div className="bg-white/80 backdrop-blur-xl border-t border-white/50 px-6 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] shadow-[0_-10px_30px_rgba(0,0,0,0.03)] ring-1 ring-black/5">
                <div className="flex justify-between items-end relative">
                    {tabs.map((tab) => {
                        const isActive = pathname === tab.href || (tab.href !== '/' && pathname?.startsWith(tab.href));
                        const Icon = tab.icon;

                        return (
                            <Link key={tab.id} href={tab.href} className="flex-1 group flex flex-col items-center gap-1.5 touch-manipulation">
                                <div className={`relative p-2 rounded-2xl transition-all duration-500 ease-out ${isActive ? 'bg-primary-50 text-primary-600 -translate-y-2 shadow-sm' : 'text-neutral-400 active:scale-95'}`}>
                                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                                    {isActive && (
                                        <span className="absolute -top-1 -right-0.5 flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500 ring-2 ring-white"></span>
                                        </span>
                                    )}
                                </div>
                                <span className={`text-[10px] font-bold tracking-wide transition-all duration-300 ${isActive ? 'text-primary-800 translate-y-[-4px] opacity-100' : 'text-neutral-400 opacity-80'}`}>
                                    {tab.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
