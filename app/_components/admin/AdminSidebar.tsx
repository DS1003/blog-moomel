'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function AdminSidebar() {
    const pathname = usePathname();

    const links = [
        { name: 'Dashboard', href: '/admin', icon: '📊' },
        { name: 'Articles', href: '/admin/articles', icon: '📝' },
        { name: 'Commentaires', href: '/admin/comments', icon: '💬' },
        { name: 'Utilisatrices', href: '/admin/users', icon: '👥' },
        { name: 'Badges & XP', href: '/admin/badges', icon: '🎖️' },
        { name: 'Catégories', href: '/admin/categories', icon: '🗂️' },
        { name: 'Médias', href: '/admin/media', icon: '🖼️' },
        { name: 'Paramètres', href: '/admin/settings', icon: '⚙️' },
    ];

    return (
        <aside className="w-64 bg-white border-r border-neutral-100 flex-shrink-0 fixed h-full z-30 hidden lg:flex flex-col">
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold font-serif">
                    M
                </div>
                <span className="font-serif font-bold text-lg text-neutral-900">Admin Pro</span>
            </div>

            <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-4">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-primary-50 text-primary-900 shadow-sm'
                                    : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                                }`}
                        >
                            <span className="text-xl">{link.icon}</span>
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-neutral-100">
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                >
                    <span className="text-xl">🚪</span>
                    Déconnexion
                </button>
            </div>
        </aside>
    );
}
