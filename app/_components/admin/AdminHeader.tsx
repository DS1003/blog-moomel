'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function AdminHeader() {
    const { data: session } = useSession();

    return (
        <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-neutral-100 flex items-center justify-between px-8 sticky top-0 z-20">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Rechercher partout..."
                        className="w-full pl-10 pr-4 py-2 rounded-full border border-neutral-200 bg-neutral-50 focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-50 transition-all text-sm outline-none"
                    />
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                        🔍
                    </span>
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-6 ml-6">
                {/* Notifications */}
                <button className="relative p-2 text-neutral-400 hover:text-neutral-600 transition-colors">
                    <span className="text-xl">🔔</span>
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="h-8 w-px bg-neutral-100"></div>

                {/* Admin Profile */}
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-neutral-900">{session?.user?.name}</p>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Admin</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200 overflow-hidden relative">
                        {session?.user?.image ? (
                            <Image src={session.user.image} alt="Admin" fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-400 font-bold">
                                {session?.user?.name?.[0]}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
