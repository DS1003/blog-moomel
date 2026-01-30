'use client';

import React, { useState, useEffect } from 'react';
import {
    FolderTree,
    Plus,
    Search,
    Edit,
    Trash,
    Box,
    X,
    Loader2,
    Save,
    Sparkles,
    Droplets,
    Sun,
    Wind,
    Layers,
    Heart,
    Star,
    Zap,
    Leaf,
    Flower2,
    Palette
} from 'lucide-react';

interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    color?: string;
    _count?: { articles: number };
}

const ICON_MAP: Record<string, any> = {
    Droplets, Sun, Wind, Sparkles, Box, Layers, Heart, Star, Zap, Leaf, Flower2, Palette
};

const COLORS = [
    'text-blue-500 bg-blue-50',
    'text-amber-500 bg-amber-50',
    'text-emerald-500 bg-emerald-50',
    'text-rose-500 bg-rose-50',
    'text-purple-500 bg-purple-50',
    'text-cyan-500 bg-cyan-50',
    'text-orange-500 bg-orange-50',
    'text-neutral-500 bg-neutral-50'
];

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        icon: 'Box',
        color: 'text-emerald-500 bg-emerald-50'
    });

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/categories');
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleOpenModal = (category?: Category) => {
        if (category) {
            setEditingCategory(category);
            setFormData({
                name: category.name || '',
                description: category.description || '',
                icon: category.icon || 'Box',
                color: category.color || 'text-emerald-500 bg-emerald-50'
            });
        } else {
            setEditingCategory(null);
            setFormData({
                name: '',
                description: '',
                icon: 'Box',
                color: 'text-emerald-500 bg-emerald-50'
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const url = editingCategory ? `/api/categories/${editingCategory.id}` : '/api/categories';
            const method = editingCategory ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setIsModalOpen(false);
                fetchCategories();
            } else {
                const err = await res.json();
                alert(err.error || "Erreur serveur");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Voulez-vous vraiment supprimer cette catégorie ?")) return;
        try {
            const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchCategories();
            } else {
                const err = await res.json();
                alert(err.error || "Erreur de suppression");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const filteredCategories = (categories || []).filter(c => {
        const name = (c.name || '').toLowerCase();
        const description = (c.description || '').toLowerCase();
        const query = (searchQuery || '').toLowerCase();
        return name.includes(query) || description.includes(query);
    });

    return (
        <div className="p-8 space-y-10 min-h-screen bg-neutral-50/30">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-2">Catégories</h1>
                    <p className="text-neutral-500 font-medium">Structurez votre univers éditorial Moomel.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-white border border-neutral-100 rounded-2xl p-1 shadow-sm mr-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-neutral-900 text-white' : 'text-neutral-400 hover:text-neutral-600'}`}
                        >
                            <Box size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-2.5 rounded-xl transition-all ${viewMode === 'table' ? 'bg-neutral-900 text-white' : 'text-neutral-400 hover:text-neutral-600'}`}
                        >
                            <FolderTree size={18} />
                        </button>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-neutral-900 text-white px-6 py-4 rounded-2xl hover:bg-neutral-800 transition-all text-sm font-bold shadow-lg"
                    >
                        <Plus size={20} strokeWidth={3} />
                        <span>Nouvelle Catégorie</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main List */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Rechercher une catégorie..."
                            className="w-full pl-14 pr-6 py-4 bg-white border border-neutral-100 rounded-[2rem] text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary-500/5 transition-all shadow-sm"
                        />
                    </div>

                    {isLoading ? (
                        <div className="py-20 text-center">
                            <Loader2 className="animate-spin mx-auto mb-4 text-neutral-300" size={48} />
                            <p className="text-neutral-400 font-medium">Chargement des données...</p>
                        </div>
                    ) : filteredCategories.length === 0 ? (
                        <div className="py-20 text-center bg-white border-2 border-dashed border-neutral-100 rounded-[3rem]">
                            <p className="text-neutral-500 font-medium">Aucune catégorie trouvée.</p>
                            <p className="text-xs text-neutral-400 mt-2">Le total est de {categories.length}, vérifiez votre filtre.</p>
                        </div>
                    ) : viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {filteredCategories.map((cat) => {
                                const Icon = ICON_MAP[cat.icon || 'Box'] || Box;
                                return (
                                    <div
                                        key={cat.id}
                                        className="bg-white p-6 rounded-[2.5rem] border border-neutral-100 shadow-sm hover:shadow-md transition-all group relative"
                                    >
                                        <div className="flex items-start gap-5">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${cat.color || 'text-neutral-500 bg-neutral-100'} shadow-inner flex-shrink-0`}>
                                                <Icon size={28} />
                                            </div>
                                            <div className="pt-1 flex-1 min-w-0">
                                                <h3 className="font-serif font-black text-lg text-neutral-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight truncate">{cat.name}</h3>
                                                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-0.5">/{cat.slug}</p>
                                            </div>
                                        </div>

                                        <p className="mt-4 text-xs text-neutral-500 leading-relaxed line-clamp-2 h-8">
                                            {cat.description || "Aucune description prévue."}
                                        </p>

                                        <div className="mt-8 flex items-center justify-between border-t pt-6">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl font-black text-neutral-900">{cat._count?.articles || 0}</span>
                                                <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">Articles</span>
                                            </div>
                                            <div className="flex gap-1">
                                                <button onClick={() => handleOpenModal(cat)} className="p-2.5 text-neutral-400 hover:text-primary-600 hover:bg-neutral-50 rounded-xl transition-all">
                                                    <Edit size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(cat.id)} className="p-2.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                                    <Trash size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-neutral-50/50">
                                        <th className="px-8 py-5 text-[10px] font-black text-neutral-300 uppercase tracking-widest">Catégorie</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-neutral-300 uppercase tracking-widest hidden md:table-cell">Slug</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-neutral-300 uppercase tracking-widest">Articles</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-neutral-300 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-50">
                                    {filteredCategories.map((cat) => {
                                        const Icon = ICON_MAP[cat.icon || 'Box'] || Box;
                                        return (
                                            <tr key={cat.id} className="group hover:bg-neutral-50/50 transition-colors">
                                                <td className="px-8 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.color || 'text-neutral-500 bg-neutral-100'} shadow-inner`}>
                                                            <Icon size={18} />
                                                        </div>
                                                        <span className="font-bold text-neutral-900">{cat.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 hidden md:table-cell">
                                                    <span className="text-xs font-medium text-neutral-400">/{cat.slug}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-black text-neutral-900">{cat._count?.articles || 0}</span>
                                                </td>
                                                <td className="px-8 py-4 text-right">
                                                    <div className="flex justify-end gap-1">
                                                        <button onClick={() => handleOpenModal(cat)} className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-neutral-50 rounded-lg transition-all">
                                                            <Edit size={16} />
                                                        </button>
                                                        <button onClick={() => handleDelete(cat.id)} className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                                            <Trash size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-neutral-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
                        <FolderTree className="text-primary-400 mb-6" size={40} />
                        <h2 className="text-2xl font-serif font-bold mb-4">Taxonomie</h2>
                        <p className="text-neutral-400 text-sm leading-relaxed mb-10">
                            Structurez votre contenu pour un meilleur référencement et une navigation fluide.
                        </p>
                        <div className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-[2rem]">
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em]">Total en base</span>
                            <span className="text-4xl font-black text-primary-400">{categories.length}</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-[3rem] p-8 border border-neutral-100 shadow-sm">
                        <h3 className="text-sm font-bold text-neutral-900 mb-4 flex items-center gap-2 uppercase tracking-widest">
                            <Sparkles size={16} className="text-primary-500" />
                            Conseil Admin
                        </h3>
                        <p className="text-xs text-neutral-500 leading-relaxed italic border-l-2 border-primary-200 pl-4">
                            "Privilégiez des catégories courtes et explicites."
                        </p>
                    </div>
                </div>
            </div>

            {/* Simple Modal overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-neutral-900">
                            <X size={24} />
                        </button>

                        <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-8">
                            {editingCategory ? 'Modifier' : 'Nouveau'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-3">Nom</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl font-bold outline-none focus:border-primary-500 transition-all font-serif text-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-3">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-sm outline-none focus:border-primary-500 transition-all min-h-[100px]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Icône</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {Object.keys(ICON_MAP).slice(0, 8).map((iconName) => {
                                            const Icon = ICON_MAP[iconName];
                                            return (
                                                <button
                                                    key={iconName}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, icon: iconName })}
                                                    className={`h-10 rounded-xl flex items-center justify-center transition-all ${formData.icon === iconName ? 'bg-neutral-900 text-white shadow-lg' : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100'}`}
                                                >
                                                    <Icon size={18} />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Couleur</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {COLORS.slice(0, 8).map((colorClass) => (
                                            <button
                                                key={colorClass}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, color: colorClass })}
                                                className={`h-10 rounded-xl border-2 transition-all ${formData.color === colorClass ? 'border-neutral-900' : 'border-transparent'}`}
                                            >
                                                <div className={`w-full h-full rounded-lg ${colorClass}`}></div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-xs font-black uppercase text-neutral-400 hover:text-neutral-900">
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-[2] py-4 bg-neutral-900 text-white text-xs font-black uppercase rounded-2xl hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-neutral-900/20"
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                    {editingCategory ? 'Enregistrer' : 'Créer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
