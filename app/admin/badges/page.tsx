'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
    Award,
    Zap,
    Star,
    Trophy,
    Plus,
    Search,
    Edit3,
    Trash2,
    CheckCircle2,
    Users,
    TrendingUp,
    ShieldCheck,
    Loader2,
    Save,
    X,
    Crown,
    Medal,
    Shield,
    Heart,
    Target,
    Flag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Icon mapping for dynamic rendering
const ICON_MAP: Record<string, any> = {
    Award, Zap, Star, Trophy, Crown, Medal, Shield, Heart, Target, Flag
};

interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    rarity: string; // Common, Rare, Epic, Legendary
    color: string;
    xpRequired: number;
    users: number;
}

interface XPConfig {
    [key: string]: number;
}

function BadgesPageContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('searchQuery') || '';

    const [badges, setBadges] = useState<Badge[]>([]);
    const [xpConfig, setXpConfig] = useState<XPConfig>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState(initialQuery);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBadge, setEditingBadge] = useState<Badge | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        icon: 'Award',
        rarity: 'Common',
        color: 'text-amber-500 bg-amber-50',
        xpRequired: 0
    });

    // XP Config State
    const [isUpdatingXP, setIsUpdatingXP] = useState(false);
    const [xpForm, setXpForm] = useState<XPConfig>({
        COMMENT: 10,
        ARTICLE_READ: 2,
        RARE_BADGE: 500
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [badgesRes, xpRes] = await Promise.all([
                fetch('/api/badges'),
                fetch('/api/xp-config')
            ]);

            if (badgesRes.ok) {
                const badgesData = await badgesRes.json();
                setBadges(badgesData);
            }

            if (xpRes.ok) {
                const xpData = await xpRes.json();
                setXpConfig(xpData);
                setXpForm(prev => ({ ...prev, ...xpData }));
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (badge?: Badge) => {
        if (badge) {
            setEditingBadge(badge);
            setFormData({
                name: badge.name,
                description: badge.description,
                icon: badge.icon,
                rarity: badge.rarity,
                color: badge.color,
                xpRequired: badge.xpRequired
            });
        } else {
            setEditingBadge(null);
            setFormData({
                name: '',
                description: '',
                icon: 'Award',
                rarity: 'Common',
                color: 'text-amber-500 bg-amber-50',
                xpRequired: 0
            });
        }
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Voulez-vous vraiment supprimer ce badge ?")) return;
        try {
            const res = await fetch(`/api/badges/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setBadges(prev => prev.filter(b => b.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveBadge = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const url = editingBadge ? `/api/badges/${editingBadge.id}` : '/api/badges';
            const method = editingBadge ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const savedBadge = await res.json();
                if (editingBadge) {
                    setBadges(prev => prev.map(b => b.id === savedBadge.id ? { ...savedBadge, users: b.users } : b));
                } else {
                    setBadges(prev => [savedBadge, ...prev]);
                }
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSaveXP = async () => {
        setIsUpdatingXP(true);
        try {
            const res = await fetch('/api/xp-config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(xpForm)
            });

            if (res.ok) {
                setXpConfig(xpForm);
                alert("Configuration XP sauvegardée !");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsUpdatingXP(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-10"
        >
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-2">Badges & XP</h1>
                    <p className="text-neutral-500 font-medium">Récompensez l'engagement et fidélisez votre communauté.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-2xl hover:bg-neutral-800 transition-all text-sm font-bold shadow-lg shadow-neutral-900/10 active:scale-95"
                >
                    <Plus size={18} strokeWidth={3} />
                    <span>Créer un badge</span>
                </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Badges Actifs", value: badges.length, icon: Award, color: "bg-blue-50 text-blue-500" },
                    { label: "Total Détentrices", value: badges.reduce((acc, b) => acc + (b.users || 0), 0), icon: Users, color: "bg-purple-50 text-purple-500" },
                    // Mocking this one for now as we don't have global logs yet
                    { label: "XP Distribués (Est.)", value: "125k", icon: Zap, color: "bg-amber-50 text-amber-500" },
                ].map((stat, i) => (
                    <motion.div key={i} variants={itemVariants} className="bg-white p-6 rounded-[2.5rem] border border-neutral-100 shadow-sm flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-0.5">{stat.label}</p>
                            <p className="text-2xl font-serif font-black text-neutral-900">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Badges List */}
                <motion.div variants={itemVariants} className="lg:col-span-8 bg-white rounded-[3rem] shadow-sm border border-neutral-100 overflow-hidden">
                    <div className="p-8 border-b border-neutral-50 flex justify-between items-center bg-neutral-50/30">
                        <h2 className="text-xl font-serif font-bold text-neutral-900">Collection de Badges</h2>
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Rechercher..."
                                className="pl-9 pr-4 py-2 bg-white border border-neutral-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                            />
                        </div>
                    </div>

                    <div className="divide-y divide-neutral-50 min-h-[300px]">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full py-20">
                                <Loader2 className="animate-spin text-neutral-400" size={32} />
                            </div>
                        ) : badges.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mb-4">
                                    <Award className="text-neutral-300" size={32} />
                                </div>
                                <p className="text-neutral-500 font-medium">Aucun badge créé pour le moment.</p>
                            </div>
                        ) : (
                            badges
                                .filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.description.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map((badge) => {
                                    const IconComp = ICON_MAP[badge.icon] || Award;
                                    return (
                                        <div key={badge.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 hover:bg-neutral-50/50 transition-all group">
                                            <div className="flex items-center gap-5">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform ${badge.color} flex-shrink-0`}>
                                                    <IconComp size={28} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-neutral-900 flex flex-wrap items-center gap-2">
                                                        {badge.name}
                                                        <span className="px-2 py-0.5 bg-neutral-100 text-[8px] font-black uppercase tracking-tighter text-neutral-400 rounded">
                                                            {badge.rarity}
                                                        </span>
                                                    </h3>
                                                    <p className="text-xs text-neutral-500 mt-0.5">{badge.description}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between w-full sm:w-auto sm:gap-8 pl-[4.75rem] sm:pl-0">
                                                <div className="text-right block">
                                                    <p className="text-xs font-black text-neutral-900 uppercase tracking-widest flex items-center gap-1 sm:justify-end">
                                                        <Users size={12} className="text-neutral-400" />
                                                        {badge.users || 0}
                                                    </p>
                                                    <p className="text-[10px] text-neutral-400 font-bold uppercase hidden sm:block">Détentrices</p>
                                                </div>
                                                <div className="flex gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all">
                                                    <button onClick={() => handleOpenModal(badge)} className="p-2.5 text-neutral-400 hover:text-primary-600 hover:bg-white hover:shadow-sm rounded-xl transition-all">
                                                        <Edit3 size={18} />
                                                    </button>
                                                    <button onClick={() => handleDelete(badge.id)} className="p-2.5 text-neutral-400 hover:text-red-500 hover:bg-white hover:shadow-sm rounded-xl transition-all">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                        )}
                    </div>
                </motion.div>

                {/* Leveling System Configuration */}
                <motion.div variants={itemVariants} className="lg:col-span-4 space-y-8">
                    <div className="bg-neutral-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-neutral-900/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-[50px] group-hover:bg-primary-500/20 transition-all"></div>
                        <ShieldCheck className="text-primary-400 mb-6" size={32} />
                        <h2 className="text-2xl font-serif font-bold mb-2">Config XP</h2>
                        <p className="text-neutral-400 text-sm mb-8">Définissez les multiplicateurs de récompenses globales.</p>

                        <div className="space-y-6">
                            {[
                                { key: 'COMMENT', label: 'Commentaire' },
                                { key: 'ARTICLE_READ', label: 'Article Lu' },
                                { key: 'RARE_BADGE', label: 'Badge Rare' },
                            ].map((row, i) => (
                                <div key={i} className="flex justify-between items-center py-3 border-b border-white/5">
                                    <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest">{row.label}</span>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center bg-white/10 rounded-lg px-2">
                                            <span className="text-primary-400 font-bold mr-1">+</span>
                                            <input
                                                type="number"
                                                value={xpForm[row.key] || 0}
                                                onChange={(e) => setXpForm({ ...xpForm, [row.key]: parseInt(e.target.value) || 0 })}
                                                className="w-12 bg-transparent text-white font-bold focus:outline-none text-right appearance-none"
                                            />
                                        </div>
                                        <span className="text-xs text-neutral-500 font-bold">XP</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleSaveXP}
                            disabled={isUpdatingXP}
                            className="w-full mt-10 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex justify-center items-center gap-2"
                        >
                            {isUpdatingXP && <Loader2 className="animate-spin" size={14} />}
                            Appliquer les changements
                        </button>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 border border-neutral-100 shadow-sm">
                        <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-green-500" />
                            Validation auto.
                        </h3>
                        <p className="text-xs text-neutral-500 leading-relaxed mb-6">Les badges sont automatiquement attribués après vérification du moteur Moomel.</p>
                        <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                            <p className="text-[10px] font-black text-green-700 uppercase tracking-widest leading-loose">Statut du moteur: OPÉRATIONNEL</p>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Create/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-white rounded-[2.5rem] p-8 w-full max-w-lg shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-6 relative z-10">
                                {editingBadge ? 'Modifier le badge' : 'Créer un nouveau badge'}
                            </h3>

                            <form onSubmit={handleSaveBadge} className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Nom du Badge</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl font-medium focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                                            placeholder="ex: Pionnière"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Description</label>
                                        <textarea
                                            required
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl font-medium focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                                            rows={2}
                                            placeholder="ex: Attribué aux 100 premiers membres..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">XP Requis / Bonus</label>
                                            <input
                                                type="number"
                                                value={formData.xpRequired}
                                                onChange={(e) => setFormData({ ...formData, xpRequired: parseInt(e.target.value) || 0 })}
                                                className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl font-bold focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Rareté</label>
                                            <select
                                                value={formData.rarity}
                                                onChange={(e) => setFormData({ ...formData, rarity: e.target.value })}
                                                className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl font-medium focus:ring-2 focus:ring-primary-500/20 focus:outline-none appearance-none"
                                            >
                                                <option value="Common">Commune</option>
                                                <option value="Rare">Rare</option>
                                                <option value="Epic">Épique</option>
                                                <option value="Legendary">Légendaire</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Icône</label>
                                        <div className="flex flex-wrap gap-2 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                                            {Object.keys(ICON_MAP).map((iconName) => {
                                                const Icon = ICON_MAP[iconName];
                                                const isSelected = formData.icon === iconName;
                                                return (
                                                    <button
                                                        key={iconName}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, icon: iconName })}
                                                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isSelected ? 'bg-neutral-900 text-white shadow-lg' : 'bg-white text-neutral-400 hover:bg-neutral-200'}`}
                                                    >
                                                        <Icon size={18} />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Couleur (Classes Tailwind)</label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {[
                                                'text-amber-500 bg-amber-50',
                                                'text-blue-500 bg-blue-50',
                                                'text-purple-500 bg-purple-50',
                                                'text-rose-500 bg-rose-50',
                                                'text-emerald-500 bg-emerald-50',
                                                'text-cyan-500 bg-cyan-50',
                                                'text-indigo-500 bg-indigo-50',
                                                'text-slate-500 bg-slate-50'
                                            ].map((colorClass) => (
                                                <button
                                                    key={colorClass}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, color: colorClass })}
                                                    className={`h-10 rounded-xl border-2 transition-all ${formData.color === colorClass ? 'border-neutral-900 shadow-md transform scale-105' : 'border-transparent hover:scale-105'}`}
                                                >
                                                    <div className={`w-full h-full rounded-lg ${colorClass} flex items-center justify-center`}>
                                                        <div className="w-2 h-2 rounded-full bg-current opacity-50"></div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-4 text-xs font-bold text-neutral-500 hover:bg-neutral-50 rounded-2xl transition-colors"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-[2] py-4 bg-neutral-900 text-white text-xs font-bold rounded-2xl hover:bg-neutral-800 transition-shadow shadow-lg shadow-neutral-900/10 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                                        {editingBadge ? 'Enregistrer' : 'Créer'}
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

export default function BadgesPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <BadgesPageContent />
        </Suspense>
    );
}
