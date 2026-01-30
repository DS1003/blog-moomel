'use client';

import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import {
    Search,
    Bell,
    User,
    Settings,
    LogOut,
    ChevronDown,
    Check,
    Clock,
    Plus,
    UserPlus,
    MessageSquare,
    Heart,
    Zap,
    Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface AdminHeaderProps {
    onOpenSidebar?: () => void;
}

export default function AdminHeader({ onOpenSidebar }: AdminHeaderProps) {
    const { data: session } = useSession();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const notificationRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    // Mock Notifications
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'user',
            title: 'Nouvelle inscription',
            desc: 'Mariama D. vient de rejoindre Moomel.',
            time: 'Il y a 2 min',
            isRead: false,
            icon: <UserPlus size={16} className="text-blue-500" />
        },
        {
            id: 2,
            type: 'comment',
            title: 'Nouveau commentaire',
            desc: 'Sur l\'article "Les vertus du Karité"',
            time: 'Il y a 15 min',
            isRead: false,
            icon: <MessageSquare size={16} className="text-purple-500" />
        },
        {
            id: 3,
            type: 'like',
            title: 'Nouveau coup de cœur',
            desc: '32 personnes ont aimé votre dernier post.',
            time: 'Il y a 1h',
            isRead: true,
            icon: <Heart size={16} className="text-pink-500" />
        }
    ]);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    // Close dropdowns on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    return (
        <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-neutral-100/50 flex items-center justify-between px-6 md:px-10 sticky top-0 z-40">
            {/* Mobile Menu Toggle */}
            <button
                onClick={onOpenSidebar}
                className="lg:hidden mr-4 p-2 text-neutral-500 hover:bg-neutral-100 rounded-xl"
            >
                <Menu size={24} />
            </button>

            {/* Left: Search Bar */}
            <div className="flex-1 max-w-xl hidden md:block">
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors">
                        <Search size={18} strokeWidth={2.5} />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher un article, une utilisatrice..."
                        className="w-full pl-12 pr-6 py-3 rounded-2xl border border-neutral-200/60 bg-neutral-50/50 focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-500/5 transition-all text-sm outline-none font-medium"
                    />
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3 md:gap-5 ml-auto">

                {/* Quick Add Button */}
                <Link
                    href="/admin/articles/new"
                    className="hidden lg:flex items-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded-2xl hover:bg-neutral-800 active:scale-95 transition-all shadow-lg shadow-neutral-900/10 text-sm font-bold"
                >
                    <Plus size={18} strokeWidth={3} />
                    <span>Nouvel Article</span>
                </Link>

                <div className="h-8 w-px bg-neutral-100 mx-1 hidden sm:block"></div>

                {/* Notifications Dropdown */}
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={() => {
                            setIsNotificationOpen(!isNotificationOpen);
                            setIsProfileOpen(false);
                        }}
                        className={`relative p-2.5 rounded-xl transition-all ${isNotificationOpen ? 'bg-primary-50 text-primary-600' : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'}`}
                    >
                        <Bell size={22} strokeWidth={2} />
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 w-4 h-4 bg-primary-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    <AnimatePresence>
                        {isNotificationOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute top-14 right-0 w-[350px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-neutral-100 overflow-hidden"
                            >
                                <div className="p-5 border-b border-neutral-50 flex items-center justify-between bg-neutral-50/30">
                                    <h3 className="font-serif font-bold text-neutral-900">Notifications</h3>
                                    <button
                                        onClick={markAllRead}
                                        className="text-[11px] font-bold text-primary-600 hover:text-primary-700 uppercase tracking-widest"
                                    >
                                        Tout marquer lu
                                    </button>
                                </div>
                                <div className="max-h-[400px] overflow-y-auto">
                                    {notifications.length > 0 ? (
                                        notifications.map((notif) => (
                                            <div
                                                key={notif.id}
                                                className={`p-4 flex gap-4 hover:bg-neutral-50 transition-colors cursor-pointer relative ${!notif.isRead ? 'bg-primary-50/20' : ''}`}
                                            >
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notif.isRead ? 'bg-neutral-100' : 'bg-white shadow-sm ring-1 ring-primary-100'}`}>
                                                    {notif.icon}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm leading-tight mb-1 ${!notif.isRead ? 'font-bold text-neutral-900' : 'text-neutral-700'}`}>
                                                        {notif.title}
                                                    </p>
                                                    <p className="text-xs text-neutral-500 line-clamp-1 mb-1">{notif.desc}</p>
                                                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-medium">
                                                        <Clock size={10} />
                                                        {notif.time}
                                                    </div>
                                                </div>
                                                {!notif.isRead && (
                                                    <div className="w-2 h-2 rounded-full bg-primary-500 absolute top-5 right-5"></div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-10 text-center">
                                            <p className="text-neutral-400 text-sm">Aucune notification</p>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 border-t border-neutral-50 text-center">
                                    <Link href="/admin/notifications" className="text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors">
                                        Voir toutes les activités
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => {
                            setIsProfileOpen(!isProfileOpen);
                            setIsNotificationOpen(false);
                        }}
                        className={`group flex items-center gap-2 md:gap-3 p-1 rounded-2xl transition-all ${isProfileOpen ? 'bg-neutral-100' : 'hover:bg-neutral-50'}`}
                    >
                        <div className="w-10 h-10 rounded-[14px] bg-neutral-100 border-2 border-white shadow-sm overflow-hidden relative ring-1 ring-neutral-200/50">
                            {session?.user?.image ? (
                                <Image src={session.user.image} alt="Admin" fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-white text-primary-700 font-bold text-sm">
                                    {session?.user?.name?.[0] || 'A'}
                                </div>
                            )}
                        </div>
                        <div className="hidden sm:block text-left pr-2">
                            <p className="text-[13px] font-bold text-neutral-900 leading-none mb-1">
                                {session?.user?.name?.split(' ')[0]}
                            </p>
                            <div className="flex items-center gap-1">
                                <span className="text-[10px] text-neutral-500 uppercase font-black tracking-tighter opacity-60">Admin</span>
                                <ChevronDown size={14} className={`text-neutral-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </div>
                        </div>
                    </button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute top-14 right-0 w-[240px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-neutral-100 overflow-hidden p-2"
                            >
                                <div className="px-4 py-3 border-b border-neutral-50 mb-1">
                                    <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-0.5">Connecté en tant que</p>
                                    <p className="text-sm font-bold text-neutral-900 truncate">{session?.user?.email}</p>
                                </div>

                                <Link
                                    href="/profil"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-xl transition-all group"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    <User size={18} className="text-neutral-400 group-hover:text-primary-500" />
                                    <span>Mon Profil</span>
                                </Link>

                                <Link
                                    href="/admin/settings"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-xl transition-all group"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    <Settings size={18} className="text-neutral-400 group-hover:text-primary-500" />
                                    <span>Paramètres</span>
                                </Link>

                                <div className="my-1 border-t border-neutral-50"></div>

                                <button
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all group"
                                >
                                    <LogOut size={18} className="text-red-400 group-hover:text-red-600" />
                                    <span>Déconnexion</span>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </header>
    );
}
