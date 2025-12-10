'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import ScrollReveal from '@/app/_components/ui/ScrollReveal';

interface Article {
    id: string;
    title: string;
    author: { name: string };
    createdAt: string;
    published: boolean;
    views: number;
}

export default function ArticlesPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <div className="min-h-screen pb-20 bg-[#F9F7F2]">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal animation="fade-up">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif font-medium text-neutral-900 mb-2">Articles</h1>
                            <p className="text-neutral-500">Gérez, éditez et publiez vos contenus.</p>
                        </div>
                        <Link
                            href="/admin/articles/new"
                            className="btn-primary flex items-center gap-2 group shadow-xl shadow-primary-500/20"
                        >
                            <span>+ Créer un article</span>
                        </Link>
                    </div>
                </ScrollReveal>

                <ScrollReveal animation="slide-up" delay={0.2}>
                    <div className="bg-white rounded-[2rem] shadow-sm border border-neutral-100 overflow-hidden">
                        {/* Toolbar / Filters (Mockup) */}
                        <div className="p-6 border-b border-neutral-100 flex gap-4 overflow-x-auto">
                            <button className="px-4 py-2 rounded-full bg-neutral-900 text-white text-sm font-medium">Tous</button>
                            <button className="px-4 py-2 rounded-full bg-neutral-50 text-neutral-600 hover:bg-neutral-100 text-sm font-medium transition-colors">Publiés</button>
                            <button className="px-4 py-2 rounded-full bg-neutral-50 text-neutral-600 hover:bg-neutral-100 text-sm font-medium transition-colors">Brouillons</button>
                            <button className="px-4 py-2 rounded-full bg-neutral-50 text-neutral-600 hover:bg-neutral-100 text-sm font-medium transition-colors">Archivés</button>
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
                                            <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest pl-8">Titre</th>
                                            <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Statut</th>
                                            <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Auteur</th>
                                            <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Vues</th>
                                            <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Date</th>
                                            <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest text-right pr-8">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-50">
                                        {articles.map((article) => (
                                            <tr key={article.id} className="group hover:bg-neutral-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="pl-2">
                                                        <p className="text-sm font-medium text-neutral-900 group-hover:text-primary-700 transition-colors font-serif">{article.title}</p>
                                                        <p className="text-xs text-neutral-400 mt-1">/articles/{article.id}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 inline-flex text-xs font-bold rounded-full uppercase tracking-wide ${article.published
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        {article.published ? 'Publié' : 'Brouillon'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-700">
                                                            {article.author.name[0]}
                                                        </div>
                                                        <span className="text-sm text-neutral-600">{article.author.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-medium text-neutral-600">{article.views || 0}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-neutral-500">{new Date(article.createdAt).toLocaleDateString()}</span>
                                                </td>
                                                <td className="px-6 py-4 text-right pr-8">
                                                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Link href={`/admin/articles/${article.id}/edit`} className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="Modifier">
                                                            ✏️
                                                        </Link>
                                                        <button className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
                                                            🗑️
                                                        </button>
                                                        <Link href={`/articles/${article.id}`} target="_blank" className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors" title="Voir">
                                                            👁️
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        {/* Pagination (Mockup) */}
                        <div className="p-6 border-t border-neutral-100 flex items-center justify-between">
                            <span className="text-sm text-neutral-500">Affichage de 1 à {articles.length} sur {articles.length} résultats</span>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 border border-neutral-200 rounded-lg text-sm text-neutral-600 disabled:opacity-50" disabled>Précédent</button>
                                <button className="px-4 py-2 border border-neutral-200 rounded-lg text-sm text-neutral-600 disabled:opacity-50" disabled>Suivant</button>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}
