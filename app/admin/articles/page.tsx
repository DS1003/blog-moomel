'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
    FileText,
    Eye,
    Edit3,
    Trash2,
    Search,
    Filter,
    MoreHorizontal,
    Plus,
    ChevronLeft,
    ChevronRight,
    Globe,
    FileEdit,
    CheckCircle2,
    Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DeleteModal from '@/app/_components/admin/DeleteModal';

interface Article {
    id: string;
    title: string;
    author: { name: string };
    createdAt: string;
    published: boolean;
    views: number;
    slug: string;
    category?: { name: string };
}

function ArticlesPageContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('searchQuery') || '';

    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [filter, setFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    // Delete Modal State
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch('/api/articles');
                const data = await res.json();
                setArticles(data);
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, []);

    // Extract unique categories for filter
    const categories = Array.from(new Set(articles.map(a => a.category?.name).filter(Boolean))) as string[];

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (article.author?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (article.category?.name || '').toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = filter === 'all' ||
            (filter === 'published' && article.published) ||
            (filter === 'draft' && !article.published);
        const matchesCategory = categoryFilter === 'all' || article.category?.name === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const openDeleteModal = (id: string) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/articles/${deleteId}`, { method: 'DELETE' });
            if (res.ok) {
                setArticles(prev => prev.filter(a => a.id !== deleteId));
                setDeleteId(null);
            } else {
                alert('Erreur lors de la suppression');
            }
        } catch (error) {
            console.error(error);
            alert('Erreur serveur');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
        >
            <DeleteModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                loading={isDeleting}
                title="Supprimer l'article ?"
                description="Cette action effacera définitivement l'article et ses médias associés."
            />

            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-2">Articles</h1>
                    <p className="text-neutral-500 font-medium">Gérez vos publications et contenus éditoriaux.</p>
                </div>
                <Link
                    href="/admin/articles/new"
                    className="flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-2xl hover:bg-neutral-800 transition-all text-sm font-bold shadow-lg shadow-neutral-900/10 active:scale-95"
                >
                    <Plus size={18} strokeWidth={3} />
                    <span>Créer un article</span>
                </Link>
            </div>

            {/* Toolbar Card */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-neutral-100 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <input
                            type="text"
                            placeholder="Rechercher par titre..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-6 py-3 rounded-2xl border border-neutral-100 bg-neutral-50 focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-50 transition-all outline-none text-sm font-medium"
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                        {['all', 'published', 'draft'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${filter === f
                                    ? 'bg-neutral-900 text-white shadow-lg'
                                    : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600'
                                    }`}
                            >
                                {f === 'all' ? 'Tous' : f === 'published' ? 'Publiés' : 'Brouillons'}
                            </button>
                        ))}
                        <div className="w-px h-10 bg-neutral-100 mx-2 hidden md:block"></div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all text-xs font-black uppercase tracking-widest whitespace-nowrap ${showFilters ? 'bg-primary-50 text-primary-600 border border-primary-100' : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100'
                                }`}
                        >
                            <Filter size={14} />
                            Filtres
                        </button>
                    </div>
                </div>

                {/* Expanded Filters */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 border-t border-neutral-50 flex gap-4 overflow-x-auto pb-2">
                                <span className="text-xs font-bold text-neutral-400 self-center">Par catégorie:</span>
                                <button
                                    onClick={() => setCategoryFilter('all')}
                                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide border transition-all whitespace-nowrap ${categoryFilter === 'all'
                                        ? 'bg-neutral-900 text-white border-neutral-900'
                                        : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300'
                                        }`}
                                >
                                    Toutes
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategoryFilter(cat)}
                                        className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide border transition-all whitespace-nowrap ${categoryFilter === cat
                                            ? 'bg-neutral-900 text-white border-neutral-900'
                                            : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Articles Table Card */}
            <motion.div variants={itemVariants} className="bg-white rounded-[3rem] shadow-sm border border-neutral-100 overflow-hidden">
                <div className="w-full">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-32 gap-4">
                            <div className="w-12 h-12 border-4 border-primary-50 border-t-primary-500 rounded-full animate-spin"></div>
                            <p className="text-xs font-black text-neutral-300 uppercase tracking-[0.2em] animate-pulse">Récupération des articles...</p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop/Tablet Table View */}
                            <table className="w-full hidden md:table">
                                <thead>
                                    <tr className="bg-neutral-50/50 text-left">
                                        <th className="px-6 lg:px-8 py-5 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Article</th>
                                        <th className="px-4 lg:px-6 py-5 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">État</th>
                                        <th className="hidden lg:table-cell px-6 py-5 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Catégorie</th>
                                        <th className="hidden xl:table-cell px-6 py-5 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Auteur</th>
                                        <th className="hidden 2xl:table-cell px-6 py-5 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Vues</th>
                                        <th className="px-6 lg:px-8 py-5 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-50">
                                    <AnimatePresence mode="popLayout">
                                        {filteredArticles.map((article) => (
                                            <motion.tr
                                                key={article.id}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="group hover:bg-neutral-50/70 transition-all cursor-pointer"
                                            >
                                                <td className="px-6 lg:px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-neutral-100 flex-shrink-0 flex items-center justify-center text-neutral-400 group-hover:bg-white group-hover:shadow-sm group-hover:text-primary-600 transition-all">
                                                            <FileText size={20} />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-bold text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-1">{article.title}</p>
                                                            <div className="flex items-center gap-2 mt-0.5">
                                                                <span className="text-[10px] text-neutral-400 font-medium whitespace-nowrap">
                                                                    {new Date(article.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                                                </span>
                                                                {/* Mobile/Tablet Category Fallback */}
                                                                <span className="lg:hidden text-[10px] text-neutral-300">•</span>
                                                                <span className="lg:hidden text-[10px] font-bold text-neutral-400 truncate max-w-[100px]">
                                                                    {article.category?.name || 'Non classé'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 lg:px-6 py-6 whitespace-nowrap">
                                                    <span className={`px-3 py-1 inline-flex items-center gap-1.5 text-[9px] font-black rounded-lg uppercase tracking-wider border transition-all ${article.published
                                                        ? 'bg-green-50 text-green-600 border-green-100'
                                                        : 'bg-yellow-50 text-yellow-600 border-yellow-100'
                                                        }`}>
                                                        {article.published ? <CheckCircle2 size={10} /> : <FileEdit size={10} />}
                                                        {article.published ? 'Publié' : 'Brouillon'}
                                                    </span>
                                                </td>
                                                <td className="hidden lg:table-cell px-6 py-6 whitespace-nowrap">
                                                    {article.category ? (
                                                        <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-lg text-[10px] font-bold border border-primary-100 uppercase tracking-wider">
                                                            {article.category.name}
                                                        </span>
                                                    ) : (
                                                        <span className="text-[10px] font-bold text-neutral-300 italic">Non classé</span>
                                                    )}
                                                </td>
                                                <td className="hidden xl:table-cell px-6 py-6 whitespace-nowrap">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-100 border border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-neutral-600">
                                                            {article.author.name[0]}
                                                        </div>
                                                        <span className="text-xs font-bold text-neutral-500">{article.author.name}</span>
                                                    </div>
                                                </td>
                                                <td className="hidden 2xl:table-cell px-6 py-6 whitespace-nowrap">
                                                    <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-600 bg-neutral-100/50 w-fit px-2 py-1 rounded-lg">
                                                        <Eye size={12} className="text-neutral-400" />
                                                        {article.views || 0}
                                                    </div>
                                                </td>
                                                <td className="px-6 lg:px-8 py-6 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={`/admin/articles/edit/${article.id}`}
                                                            className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-neutral-50 rounded-xl transition-all"
                                                            title="Modifier"
                                                        >
                                                            <Edit3 size={18} />
                                                        </Link>
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                openDeleteModal(article.id);
                                                            }}
                                                            className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                                            title="Supprimer"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                        <Link
                                                            href={`/articles/${article.slug}`}
                                                            target="_blank"
                                                            className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-all opacity-50 hover:opacity-100"
                                                            title="Voir"
                                                        >
                                                            <Globe size={18} />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>

                            {/* Mobile Card Layout */}
                            <div className="md:hidden flex flex-col divide-y divide-neutral-100">
                                <AnimatePresence mode="popLayout">
                                    {filteredArticles.map((article) => (
                                        <motion.div
                                            key={article.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="p-5 space-y-4 hover:bg-neutral-50/50 transition-colors"
                                        >
                                            {/* Header: Category & Status */}
                                            <div className="flex items-center justify-between">
                                                {article.category ? (
                                                    <span className="px-2.5 py-1 bg-primary-50 text-primary-700 rounded-md text-[9px] font-black uppercase tracking-widest border border-primary-100/50">
                                                        {article.category.name}
                                                    </span>
                                                ) : (
                                                    <span className="text-[9px] font-black text-neutral-300 uppercase tracking-widest">Non classé</span>
                                                )}

                                                <span className={`flex items-center gap-1 text-[9px] font-black uppercase tracking-widest ${article.published ? 'text-green-600' : 'text-yellow-600'
                                                    }`}>
                                                    {article.published ? <CheckCircle2 size={10} /> : <FileEdit size={10} />}
                                                    {article.published ? 'Publié' : 'Brouillon'}
                                                </span>
                                            </div>

                                            {/* Content: Title & Info */}
                                            <div>
                                                <h3 className="text-base font-bold text-neutral-900 leading-snug mb-2 line-clamp-2">
                                                    {article.title}
                                                </h3>
                                                <div className="flex items-center gap-3 text-xs text-neutral-400">
                                                    <span className="flex items-center gap-1.5 font-medium">
                                                        <Clock size={12} />
                                                        {new Date(article.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                                    </span>
                                                    <span className="w-1 h-1 rounded-full bg-neutral-200"></span>
                                                    <span className="font-medium">{article.author.name}</span>
                                                </div>
                                            </div>

                                            {/* Footer: Actions */}
                                            <div className="flex items-center gap-2 pt-2">
                                                <Link
                                                    href={`/admin/articles/edit/${article.id}`}
                                                    className="flex-1 py-2.5 bg-neutral-900 text-white rounded-xl flex items-center justify-center gap-2 text-xs font-bold shadow-lg shadow-neutral-900/10 active:scale-95 transition-transform"
                                                >
                                                    <Edit3 size={14} />
                                                    Modifier
                                                </Link>
                                                <button
                                                    onClick={() => openDeleteModal(article.id)}
                                                    className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                <Link
                                                    href={`/articles/${article.slug}`}
                                                    target="_blank"
                                                    className="w-10 h-10 rounded-xl bg-neutral-50 text-neutral-400 flex items-center justify-center hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
                                                >
                                                    <Globe size={16} />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {filteredArticles.length === 0 && !isLoading && (
                                <div className="py-20 text-center">
                                    <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4 grayscale opacity-50">
                                        <FileText size={24} className="text-neutral-400" />
                                    </div>
                                    <p className="text-sm font-bold text-neutral-400">Aucun article trouvé</p>
                                    <p className="text-xs text-neutral-300 mt-1">Essayez de modifier vos filtres</p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Pagination Card Footer */}
                <div className="p-8 border-t border-neutral-50 flex flex-col sm:flex-row items-center justify-between gap-6 bg-neutral-50/30">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                        {filteredArticles.length} sur {articles.length} articles trouvés
                    </span>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-5 py-2.5 border border-neutral-100 rounded-xl text-xs font-bold text-neutral-400 disabled:opacity-30 bg-white" disabled>
                            <ChevronLeft size={16} />
                            Précédent
                        </button>
                        <div className="flex gap-1">
                            <button className="w-10 h-10 rounded-xl bg-neutral-900 text-white text-xs font-bold shadow-lg">1</button>
                            <button className="w-10 h-10 rounded-xl bg-white border border-neutral-100 text-neutral-400 text-xs font-bold hover:bg-neutral-50">2</button>
                        </div>
                        <button className="flex items-center gap-2 px-5 py-2.5 border border-neutral-100 rounded-xl text-xs font-bold text-neutral-400 hover:bg-white hover:text-neutral-900 transition-all bg-white">
                            Suivant
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function ArticlesPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <ArticlesPageContent />
        </Suspense>
    );
}
