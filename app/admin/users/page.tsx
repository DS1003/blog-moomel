'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
    Users,
    ShieldCheck,
    ShieldAlert,
    Zap,
    MessageSquare,
    FileText,
    MoreHorizontal,
    Search,
    Filter,
    Download,
    Mail,
    Calendar,
    CheckCircle2,
    XCircle,
    BadgeCheck,
    ChevronLeft,
    ChevronRight,
    Edit,
    Trash2,
    Ban,
    Lock,
    Unlock,
    X,
    Save,
    Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

function UsersPageContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('searchTerm') || '';

    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [filterRole, setFilterRole] = useState('all');

    // Editing State
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [actionMenuOpenId, setActionMenuOpenId] = useState<string | null>(null);

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

    const filteredUsers = users.filter(user => {
        const matchesSearch = (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const handleDelete = async (id: string) => {
        if (!confirm("ATTENTION: Cette action est irréversible. Supprimer cet utilisateur ?")) return;
        try {
            const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setUsers(prev => prev.filter(u => u.id !== id));
            } else {
                alert("Erreur lors de la suppression.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateStatus = async (user: User) => {
        try {
            const newStatus = !user.isActive;
            const res = await fetch(`/api/users/${user.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: newStatus })
            });
            if (res.ok) {
                const updated = await res.json();
                setUsers(prev => prev.map(u => u.id === user.id ? { ...u, isActive: updated.isActive } : u));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateRole = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingUser) return;
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/users/${editingUser.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: editingUser.role })
            });
            if (res.ok) {
                const updated = await res.json();
                setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, role: updated.role } : u));
                setEditingUser(null);
            } else {
                alert("Erreur lors de la modification.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
        >
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-2">Utilisatrices</h1>
                    <p className="text-neutral-500 font-medium">Gérez la communauté, les rôles et l'engagement des membres.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white text-neutral-700 px-5 py-2.5 rounded-2xl border border-neutral-200 hover:bg-neutral-50 transition-all text-sm font-bold shadow-sm">
                        <Download size={16} />
                        <span>Exporter CSV</span>
                    </button>
                    <button className="flex items-center gap-2 bg-neutral-900 text-white px-6 py-2.5 rounded-2xl hover:bg-neutral-800 transition-all text-sm font-bold shadow-lg shadow-neutral-900/10">
                        <Users size={16} />
                        <span>Gérer les accès</span>
                    </button>
                </div>
            </div>

            {/* Toolbar Card */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-neutral-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    <input
                        type="text"
                        placeholder="Nom, email ou ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-6 py-3 rounded-2xl border border-neutral-100 bg-neutral-50 focus:bg-white focus:border-primary-300 transition-all outline-none text-sm font-medium"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
                    {['all', 'ADMIN', 'MODERATOR', 'USER'].map((role) => (
                        <button
                            key={role}
                            onClick={() => setFilterRole(role)}
                            className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap ${filterRole === role
                                ? 'bg-neutral-900 text-white'
                                : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100'
                                }`}
                        >
                            {role === 'all' ? 'Toutes' : role === 'ADMIN' ? 'Admins' : role === 'MODERATOR' ? 'Modos' : 'Membres'}
                        </button>
                    ))}
                    <div className="w-px h-10 bg-neutral-100 mx-2 hidden md:block"></div>
                    <button className="p-2.5 bg-neutral-50 rounded-xl text-neutral-400 hover:text-neutral-900 transition-all">
                        <Filter size={18} />
                    </button>
                </div>
            </motion.div>

            {/* Users Table Card */}
            <motion.div variants={itemVariants} className="bg-white rounded-[3rem] shadow-sm border border-neutral-100 overflow-hidden">
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="p-32 text-center">
                            <div className="w-12 h-12 border-4 border-neutral-50 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">Mise à jour de la liste...</p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table */}
                            <table className="w-full hidden md:table">
                                <thead>
                                    <tr className="bg-neutral-50/50 text-left">
                                        <th className="px-8 py-5 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] w-[350px]">Identité Membre</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Rôle & Sécurité</th>
                                        <th className="hidden lg:table-cell px-6 py-5 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Engagement (Lvl)</th>
                                        <th className="hidden xl:table-cell px-6 py-5 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Activité</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Statut</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-50">
                                    <AnimatePresence mode="popLayout">
                                        {filteredUsers.map((user) => (
                                            <motion.tr
                                                key={user.id}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="group hover:bg-neutral-50/70 transition-all cursor-pointer"
                                            >
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-[18px] bg-neutral-100 relative overflow-hidden border-2 border-white shadow-sm ring-1 ring-neutral-100 group-hover:scale-105 transition-transform">
                                                            {user.image ? (
                                                                <Image src={user.image} alt={user.name} fill className="object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-neutral-400 font-black text-lg bg-gradient-to-br from-neutral-50 to-neutral-100">
                                                                    {user.name?.[0]?.toUpperCase()}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="text-sm font-bold text-neutral-900 group-hover:text-primary-600 transition-colors truncate max-w-[150px]">{user.name}</span>
                                                                {user.role === 'ADMIN' && <BadgeCheck size={14} className="text-primary-500" />}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-medium">
                                                                <Mail size={10} />
                                                                <span className="truncate max-w-[150px]">{user.email}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6 font-bold uppercase tracking-widest">
                                                    <div className="flex items-center gap-2">
                                                        {user.role === 'ADMIN' ? (
                                                            <span className="flex items-center gap-1.5 px-3 py-1 bg-primary-50 text-primary-600 rounded-lg text-[9px] border border-primary-100">
                                                                <ShieldCheck size={10} />
                                                                {user.role}
                                                            </span>
                                                        ) : user.role === 'MODERATOR' ? (
                                                            <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[9px] border border-blue-100">
                                                                <ShieldAlert size={10} />
                                                                {user.role}
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center gap-1.5 px-3 py-1 bg-neutral-100 text-neutral-500 rounded-lg text-[9px]">
                                                                {user.role}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="hidden lg:table-cell px-6 py-6">
                                                    <div className="space-y-1.5">
                                                        <div className="flex justify-between items-center w-24">
                                                            <span className="text-[10px] font-black text-neutral-900">Lvl {user.level}</span>
                                                            <span className="text-[9px] text-neutral-400 font-bold uppercase">{user.xp} XP</span>
                                                        </div>
                                                        <div className="w-24 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${(user.xp % 1000) / 10}%` }}
                                                                className="h-full bg-primary-500"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="hidden xl:table-cell px-6 py-6">
                                                    <div className="flex gap-3 text-neutral-400">
                                                        <div className="flex flex-col items-center">
                                                            <span className="text-[11px] font-black text-neutral-700">{user._count.comments}</span>
                                                            <MessageSquare size={12} strokeWidth={2.5} />
                                                        </div>
                                                        <div className="w-px h-6 bg-neutral-100 mt-2"></div>
                                                        <div className="flex flex-col items-center">
                                                            <span className="text-[11px] font-black text-neutral-700">{user._count.articles}</span>
                                                            <FileText size={12} strokeWidth={2.5} />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <span className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest ${user.isActive ? 'text-green-600' : 'text-red-500'}`}>
                                                        {user.isActive ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                                        {user.isActive ? 'Actif' : 'Block'}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                                        <button
                                                            onClick={() => setEditingUser(user)}
                                                            className="p-2.5 bg-neutral-50 text-neutral-400 hover:text-primary-600 hover:bg-white hover:shadow-sm rounded-xl transition-all"
                                                            title="Modifier le rôle"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleUpdateStatus(user)}
                                                            className={`p-2.5 bg-neutral-50 hover:bg-white hover:shadow-sm rounded-xl transition-all ${user.isActive ? 'text-neutral-400 hover:text-orange-500' : 'text-orange-500 bg-orange-50'}`}
                                                            title={user.isActive ? "Bloquer" : "Débloquer"}
                                                        >
                                                            {user.isActive ? <Lock size={16} /> : <Unlock size={16} />}
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(user.id)}
                                                            className="p-2.5 bg-neutral-50 text-neutral-400 hover:text-red-500 hover:bg-white hover:shadow-sm rounded-xl transition-all"
                                                            title="Supprimer"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>

                            {/* Mobile Card Layout */}
                            <div className="md:hidden flex flex-col divide-y divide-neutral-100">
                                {filteredUsers.map((user) => (
                                    <div key={user.id} className="p-5 flex gap-4 items-start">
                                        <div className="w-12 h-12 rounded-[18px] bg-neutral-100 relative overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                                            {user.image ? (
                                                <Image src={user.image} alt={user.name} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-neutral-400 font-black text-lg bg-gradient-to-br from-neutral-50 to-neutral-100">
                                                    {user.name?.[0]?.toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <div>
                                                    <h3 className="text-sm font-bold text-neutral-900 truncate">{user.name}</h3>
                                                    <p className="text-[10px] text-neutral-400 font-medium truncate">{user.email}</p>
                                                </div>
                                                <button className="text-neutral-300 hover:text-neutral-900">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {user.role === 'ADMIN' ? (
                                                    <span className="flex items-center gap-1 px-2 py-1 bg-primary-50 text-primary-600 rounded-md text-[9px] font-black border border-primary-100 uppercase tracking-wider">
                                                        <ShieldCheck size={10} /> {user.role}
                                                    </span>
                                                ) : user.role === 'MODERATOR' ? (
                                                    <span className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-[9px] font-black border border-blue-100 uppercase tracking-wider">
                                                        <ShieldAlert size={10} /> {user.role}
                                                    </span>
                                                ) : <span className="px-2 py-1 bg-neutral-100 text-neutral-500 rounded-md text-[9px] font-black uppercase tracking-wider">{user.role}</span>}

                                                <span className={`flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-wider ${user.isActive ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-500 border border-red-100'}`}>
                                                    {user.isActive ? 'Actif' : 'Bloqué'}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-neutral-50">
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] font-black text-neutral-300 uppercase tracking-wider">Niveau</span>
                                                    <span className="text-xs font-bold text-neutral-900">Lvl {user.level}</span>
                                                </div>
                                                <div className="w-px h-6 bg-neutral-100"></div>
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] font-black text-neutral-300 uppercase tracking-wider">Articles</span>
                                                    <span className="text-xs font-bold text-neutral-900">{user._count.articles}</span>
                                                </div>
                                                <div className="w-px h-6 bg-neutral-100"></div>
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] font-black text-neutral-300 uppercase tracking-wider">Coms</span>
                                                    <span className="text-xs font-bold text-neutral-900">{user._count.comments}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Footer Insight */}
                <div className="p-8 bg-neutral-50/30 border-t border-neutral-50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
                        <Calendar size={14} />
                        Affichage basé sur les 500 dernières interactions membres.
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="text-[11px] font-black text-neutral-300 uppercase tracking-widest">Page 1 de 12</p>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-xl bg-white border border-neutral-100 flex items-center justify-center text-neutral-300 cursor-not-allowed">
                                <ChevronLeft size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-xl bg-white border border-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-neutral-900 hover:text-white transition-all shadow-sm">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Edit User Modal */}
            <AnimatePresence>
                {editingUser && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
                        onClick={() => setEditingUser(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full blur-[50px] -mr-16 -mt-16"></div>

                            <h3 className="text-xl font-bold text-neutral-900 mb-2 relative z-10">Modifier le Rôle</h3>
                            <p className="text-sm text-neutral-500 mb-6 relative z-10">De {editingUser.name}</p>

                            <form onSubmit={handleUpdateRole} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Niveau d'accès</label>
                                    <div className="grid gap-3">
                                        {[
                                            { val: 'USER', label: 'Membre Standard', icon: Users, desc: 'Accès basique au blog' },
                                            { val: 'MODERATOR', label: 'Modérateur', icon: ShieldAlert, desc: 'Peut gérer les commentaires' },
                                            { val: 'ADMIN', label: 'Administrateur', icon: ShieldCheck, desc: 'Accès total à la plateforme' }
                                        ].map((option) => (
                                            <label
                                                key={option.val}
                                                className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${editingUser.role === option.val
                                                    ? 'border-neutral-900 bg-neutral-50'
                                                    : 'border-neutral-100 hover:border-neutral-200'}`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="role"
                                                    value={option.val}
                                                    checked={editingUser.role === option.val}
                                                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                                                    className="sr-only"
                                                />
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${editingUser.role === option.val ? 'bg-neutral-900 text-white' : 'bg-white border border-neutral-100 text-neutral-400'}`}>
                                                    <option.icon size={18} />
                                                </div>
                                                <div>
                                                    <span className="block text-sm font-bold text-neutral-900">{option.label}</span>
                                                    <span className="text-[10px] text-neutral-400 font-medium">{option.desc}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setEditingUser(null)}
                                        className="flex-1 py-3 text-xs font-bold text-neutral-500 hover:bg-neutral-50 rounded-xl transition-colors"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-[2] py-3 bg-neutral-900 text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-shadow shadow-lg shadow-neutral-900/10 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                                        Enregistrer
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function UsersPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <UsersPageContent />
        </Suspense>
    );
}
