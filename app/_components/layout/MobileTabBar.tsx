'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Home, Newspaper, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MobileTabBar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Hide if scrolling down significantly
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
        <div className={`fixed bottom-0 left-0 right-0 z-[60] lg:hidden px-4 pb-4 transition-all duration-500 ease-in-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'}`}>
            <nav className="max-w-md mx-auto bg-neutral-900/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.3)] p-1.5 flex justify-between items-center relative gap-1">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href || (tab.href !== '/' && pathname?.startsWith(tab.href));
                    const Icon = tab.icon;

                    return (
                        <Link
                            key={tab.id}
                            href={tab.href}
                            className="flex-1 relative group flex flex-col items-center justify-center py-2.5 transition-all outline-none"
                        >
                            {/* Active pill background */}
                            {isActive && (
                                <motion.div
                                    layoutId="mobileTabPill"
                                    className="absolute inset-0 bg-white/10 rounded-[2rem] shadow-inner"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}

                            <div className="relative flex flex-col items-center">
                                <Icon
                                    size={18}
                                    className={`transition-all duration-300 ${isActive ? 'text-primary-400 scale-110' : 'text-neutral-400 group-active:scale-95'}`}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                                <span className={`text-[9px] font-bold mt-1 tracking-wider uppercase transition-all duration-300 ${isActive ? 'text-white translate-y-0.5' : 'text-neutral-500'}`}>
                                    {tab.name}
                                </span>

                                {/* Minimal dot indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="mobileTabDot"
                                        className="absolute -bottom-1.5 w-1 h-1 bg-primary-400 rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
