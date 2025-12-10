'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/app/_components/ui/ScrollReveal';

interface User {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: 'USER' | 'ADMIN' | 'MODERATOR';
    isActive: boolean;
    createdAt: string;
    level: number;
    xp: number;
    _count: {
        comments: number;
        articles: number;
    };
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/users');
                if (res.ok) {
                    const data = await res.json();
                    setUsers(data);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen pb-20 bg-[#F9F7F2]">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal animation="fade-up">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif font-medium text-neutral-900 mb-2">Utilisatrices</h1>
                            <p className="text-neutral-500">Gérez votre communauté et les niveaux d'accès.</p>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={0.2}>
                    <div className="bg-white rounded-[2rem] shadow-sm border border-neutral-100 overflow-hidden">
                        {/* Toolbar */}
                        <div className="p-6 border-b border-neutral-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                            <div className="relative w-full max-w-md">
                                <input
                                    type="text"
                                    placeholder="Rechercher une utilisatrice..."
                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:border-primary-300 transition-all outline-none text-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">🔍</span>
                            </div>

                            <div className="flex gap-2">
                                <button className="px-4 py-2 type-xs font-medium text-neutral-600 bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors border border-neutral-200">
                                    Filtres
                                </button>
                                <button className="px-4 py-2 type-xs font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors shadow-lg shadow-neutral-900/10">
                                    Exporter
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            {isLoading ? (
                                <div className="flex items-center justify-center py-20">
                                    <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-neutral-50 text-left">
                                            <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest pl-8">Utilisatrice</th>
                                            <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Rôle</th>
                                            <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Niveau & XP</th>
                                            <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Activité</th>
                                            <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Statut</th>
                                            <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest text-right pr-8">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-50">
                                        {filteredUsers.map((user) => (
                                            <tr key={user.id} className="group hover:bg-neutral-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3 pl-2">
                                                        <div className="w-10 h-10 rounded-full bg-neutral-100 relative overflow-hidden flex-shrink-0">
                                                            {user.image ? (
                                                                <Image src={user.image} alt={user.name} fill className="object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-neutral-400 font-bold">
                                                                    {user.name?.[0]?.toUpperCase()}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-neutral-900">{user.name}</p>
                                                            <p className="text-xs text-neutral-400">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 inline-flex text-xs font-bold rounded-lg uppercase tracking-wide border ${user.role === 'ADMIN'
                                                        ? 'bg-purple-50 text-purple-700 border-purple-100'
                                                        : user.role === 'MODERATOR'
                                                            ? 'bg-blue-50 text-blue-700 border-blue-100'
                                                            : 'bg-neutral-50 text-neutral-500 border-neutral-100'
                                                        }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-neutral-700">Lvl {user.level}</span>
                                                        <span className="text-xs text-neutral-400">{user.xp} XP</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-4 text-xs text-neutral-500">
                                                        <span title="Commentaires">💬 {user._count.comments}</span>
                                                        {user._count.articles > 0 && <span title="Articles">📝 {user._count.articles}</span>}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`w-2 h-2 rounded-full inline-block mr-2 ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                    <span className="text-sm text-neutral-600">{user.isActive ? 'Actif' : 'Bloqué'}</span>
                                                </td>
                                                <td className="px-6 py-4 text-right pr-8">
                                                    <button className="text-neutral-400 hover:text-neutral-900 font-bold">•••</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        <div className="p-6 border-t border-neutral-100 flex items-center justify-center">
                            <p className="text-xs text-neutral-400">Affichage des 50 dernières inscriptions</p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}
