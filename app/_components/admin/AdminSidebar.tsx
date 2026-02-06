'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
    LayoutDashboard,
    TrendingUp,
    FileText,
    MessageSquare,
    Users,
    Award,
    FolderTree,
    Image as ImageIcon,
    Settings,
    LogOut,
    ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminSidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const pathname = usePathname();

    const links = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
        { name: 'Articles', href: '/admin/articles', icon: FileText },
        { name: 'Commentaires', href: '/admin/comments', icon: MessageSquare },
        { name: 'Utilisatrices', href: '/admin/users', icon: Users },
        { name: 'Badges & XP', href: '/admin/badges', icon: Award },
        { name: 'Catégories', href: '/admin/categories', icon: FolderTree },
        { name: 'Médias', href: '/admin/media', icon: ImageIcon },
        { name: 'Paramètres', href: '/admin/settings', icon: Settings },
    ];

    const SidebarContent = () => (
        <>
            {/* Logo Section */}
            <div className="p-8 pb-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white font-bold font-serif shadow-lg shadow-neutral-900/10 group-hover:rotate-6 transition-transform">
                        M
                    </div>
                    <div>
                        <span className="font-serif font-bold text-lg text-neutral-900 block leading-none mb-1">Admin Pro</span>
                        <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Moomel CMS</span>
                    </div>
                </Link>
                {/* Mobile Close Button */}
                <button
                    onClick={onClose}
                    className="lg:hidden p-2 rounded-xl hover:bg-neutral-100 text-neutral-500"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-6">
                <p className="px-4 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] mb-4">Gestion</p>
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose} // Auto-close on mobile click
                            className={`flex items-center gap-3 px-4 py-3.5 text-sm font-bold rounded-2xl transition-all duration-300 group relative ${isActive
                                ? 'bg-neutral-900 text-white shadow-xl shadow-neutral-900/10'
                                : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                                }`}
                        >
                            <Icon size={18} className={`${isActive ? 'text-primary-300' : 'text-neutral-400 group-hover:text-neutral-900'} transition-colors`} />
                            {link.name}

                            {isActive && (
                                <motion.div
                                    layoutId="active-pill-admin"
                                    className="absolute left-[-1rem] w-1.5 h-6 bg-primary-500 rounded-r-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Section */}
            <div className="p-6 space-y-2 border-t border-neutral-50">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 w-full text-xs font-bold text-neutral-500 rounded-xl hover:bg-neutral-50 transition-all group"
                >
                    <ExternalLink size={16} className="group-hover:text-neutral-900" />
                    Voir le site
                </Link>

                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center gap-3 px-4 py-3 w-full text-xs font-bold text-red-500 rounded-xl hover:bg-red-50/50 transition-all group"
                >
                    <LogOut size={16} className="text-red-400 group-hover:text-red-600" />
                    Déconnexion
                </button>

                <div className="mt-4 pt-4 px-4">
                    <div className="p-3 bg-primary-50/50 rounded-2xl border border-primary-100/50">
                        <p className="text-[10px] text-primary-700 font-bold mb-1">Besoin d'aide ?</p>
                        <p className="text-[9px] text-primary-600/80 leading-relaxed">Accédez à notre centre de support pour les admins.</p>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="w-64 bg-white border-r border-neutral-100 flex-shrink-0 fixed h-full z-30 hidden lg:flex flex-col">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            <div className={`fixed inset-0 z-50 lg:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={onClose}
                />

                {/* Drawer */}
                <div className={`absolute top-0 left-0 w-80 h-full bg-white shadow-2xl transition-transform duration-300 transform flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <SidebarContent />
                </div>
            </div>
        </>
    );
}
