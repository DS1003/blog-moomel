'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
    MessageSquare,
    MoreHorizontal,
    Reply,
    EyeOff,
    Eye,
    Trash2,
    AlertCircle,
    CheckCircle2,
    Clock,
    Search,
    BookOpen,
    Grid,
    List
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Comment {
    id: string;
    content: string;
    createdAt: string;
    hidden: boolean;
    author: {
        name: string;
        image: string | null;
        email: string;
    };
    article: {
        title: string;
        slug: string;
    };
    articleId: string;
    reports: any[];
}

function CommentsPageContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('searchTerm') || '';

    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Reply State
    const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
    const [replyContent, setReplyContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch('/api/comments');
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchComments();
    }, []);

    const filteredComments = comments.filter(c => {
        const matchesSearch = c.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.article.title.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        if (filter === 'reported') return c.reports && c.reports.length > 0;
        if (filter === 'hidden') return c.hidden;
        return true;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) return;
        try {
            const res = await fetch(`/api/comments/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setComments(prev => prev.filter(c => c.id !== id));
            } else {
                alert("Erreur lors de la suppression");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggleHidden = async (comment: Comment) => {
        try {
            const res = await fetch(`/api/comments/${comment.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ hidden: !comment.hidden })
            });
            if (res.ok) {
                const updated = await res.json();
                setComments(prev => prev.map(c => c.id === comment.id ? { ...c, hidden: updated.hidden } : c));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyingTo || !replyContent.trim()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: replyContent,
                    articleId: replyingTo.articleId,
                    parentId: replyingTo.id
                })
            });

            if (res.ok) {
                setReplyContent('');
                setReplyingTo(null);
                alert("Réponse envoyée !");
            } else {
                alert("Erreur lors de l'envoi");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
        >
            {/* Page Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-2">Commentaires</h1>
                <p className="text-neutral-500 font-medium">Modérez les échanges et veillez à la bienveillance de la communauté.</p>
            </div>

            {/* Toolbar Card */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-neutral-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar w-full md:w-auto">
                    {[
                        { id: 'all', label: 'Tous', count: comments.length },
                        { id: 'reported', label: 'Signalés', count: 0, color: 'text-red-500 bg-red-50' },
                        { id: 'hidden', label: 'Masqués', count: comments.filter(c => c.hidden).length }
                    ].map((btn) => (
                        <button
                            key={btn.id}
                            onClick={() => setFilter(btn.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${filter === btn.id
                                ? 'bg-neutral-900 text-white shadow-lg'
                                : `bg-neutral-50 text-neutral-400 hover:bg-neutral-100`
                                }`}
                        >
                            {btn.label}
                            <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${filter === btn.id ? 'bg-white/20' : 'bg-neutral-200 text-neutral-500'}`}>
                                {btn.count}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Filtrer les commentaires..."
                            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-neutral-100 bg-neutral-50 focus:bg-white focus:border-primary-300 transition-all outline-none text-xs font-medium"
                        />
                    </div>
                    <div className="flex bg-neutral-50 p-1.5 rounded-xl border border-neutral-100">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-400 hover:bg-white/50'}`}
                        >
                            <Grid size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-400 hover:bg-white/50'}`}
                        >
                            <List size={16} />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Comments List */}
            <div className="space-y-4">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white rounded-[3rem] border border-neutral-100">
                        <div className="w-10 h-10 border-4 border-neutral-50 border-t-primary-500 rounded-full animate-spin"></div>
                        <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest animate-pulse">Chargement des messages...</p>
                    </div>
                ) : filteredComments.length === 0 ? (
                    <div className="bg-white rounded-[3rem] p-20 text-center border border-neutral-100">
                        <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MessageSquare size={24} className="text-neutral-200" />
                        </div>
                        <p className="text-sm font-bold text-neutral-300 uppercase tracking-widest">Aucun commentaire trouvé</p>
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {viewMode === 'grid' ? (
                            filteredComments.map((comment) => (
                                <motion.div
                                    key={comment.id}
                                    layout
                                    variants={itemVariants}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    className={`bg-white rounded-[2.5rem] p-6 shadow-sm border transition-all hover:shadow-xl hover:shadow-neutral-200/40 group ${comment.reports && comment.reports.length > 0 ? 'border-red-100' : 'border-neutral-100'
                                        }`}
                                >
                                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                        {/* Author Avatar/Info */}
                                        <div className="flex items-center gap-4 sm:block">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-neutral-100 relative overflow-hidden border-2 border-white shadow-sm ring-1 ring-neutral-100">
                                                    {comment.author.image ? (
                                                        <Image src={comment.author.image} alt={comment.author.name} fill className="object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-neutral-400 font-black text-lg bg-gradient-to-br from-neutral-50 to-neutral-100">
                                                            {comment.author.name[0]}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {/* Mobile only author name */}
                                            <div className="sm:hidden">
                                                <h3 className="font-bold text-neutral-900 text-sm">{comment.author.name}</h3>
                                                <div className="flex items-center gap-2 text-[10px] text-neutral-300 font-black uppercase tracking-[0.2em] whitespace-nowrap">
                                                    <Clock size={10} className="opacity-50" />
                                                    {new Date(comment.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="flex-1 min-w-0">
                                            <div className="hidden sm:flex justify-between items-start mb-4">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-bold text-neutral-900">{comment.author.name}</h3>
                                                        {comment.hidden && (
                                                            <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-[8px] font-black text-neutral-400 uppercase tracking-widest border border-neutral-200">
                                                                Masqué
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                                                        <BookOpen size={10} className="text-primary-500/50" />
                                                        Sur <span className="text-neutral-600 truncate max-w-[200px]">{comment.article.title}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] text-neutral-300 font-black uppercase tracking-[0.2em] whitespace-nowrap">
                                                    <Clock size={12} className="opacity-50" />
                                                    {new Date(comment.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>

                                            {/* Mobile Article Ref */}
                                            <div className="sm:hidden mb-3 flex items-center gap-2 text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                                                <BookOpen size={10} className="text-primary-500/50" />
                                                Sur <span className="text-neutral-600 truncate max-w-[200px]">{comment.article.title}</span>
                                            </div>

                                            <p className="text-neutral-700 text-sm leading-relaxed mb-6 font-medium bg-neutral-50/50 p-5 rounded-2xl border border-neutral-50 group-hover:bg-white group-hover:shadow-inner group-hover:border-neutral-100 transition-all">
                                                {comment.content}
                                            </p>

                                            {/* Actions */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 sm:gap-4">
                                                    <button
                                                        onClick={() => setReplyingTo(comment)}
                                                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-primary-600 transition-colors p-2 sm:p-0 bg-neutral-50 sm:bg-transparent rounded-lg sm:rounded-none"
                                                    >
                                                        <Reply size={14} />
                                                        <span className="hidden sm:inline">Répondre</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleToggleHidden(comment)}
                                                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-orange-500 transition-colors p-2 sm:p-0 bg-neutral-50 sm:bg-transparent rounded-lg sm:rounded-none"
                                                    >
                                                        {comment.hidden ? <Eye size={14} /> : <EyeOff size={14} />}
                                                        <span className="hidden sm:inline">{comment.hidden ? 'Afficher' : 'Masquer'}</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(comment.id)}
                                                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors p-2 sm:p-0 bg-red-50 sm:bg-transparent rounded-lg sm:rounded-none"
                                                    >
                                                        <Trash2 size={14} />
                                                        <span className="hidden sm:inline">Supprimer</span>
                                                    </button>
                                                </div>

                                                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-300 hover:bg-neutral-50 hover:text-neutral-600 transition-all">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            // Table View
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white rounded-[2.5rem] shadow-sm border border-neutral-100 overflow-hidden"
                            >
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-neutral-50/50 text-left border-b border-neutral-100">
                                                <th className="pl-8 py-5 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Auteur</th>
                                                <th className="px-6 py-5 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] w-[40%]">Commentaire</th>
                                                <th className="px-6 py-5 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Article</th>
                                                <th className="px-6 py-5 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] text-center">Date</th>
                                                <th className="pr-8 py-5 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-50">
                                            {filteredComments.map((comment) => (
                                                <tr key={comment.id} className={`group hover:bg-neutral-50/50 transition-all ${comment.hidden ? 'opacity-60 bg-neutral-50/20' : ''}`}>
                                                    <td className="pl-8 py-5 align-top">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg bg-neutral-100 relative overflow-hidden flex-shrink-0">
                                                                {comment.author.image ? (
                                                                    <Image src={comment.author.image} alt={comment.author.name} fill className="object-cover" />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-neutral-400 font-black text-xs">
                                                                        {comment.author.name[0]}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-sm font-bold text-neutral-900 truncate">{comment.author.name}</p>
                                                                <p className="text-[10px] text-neutral-400 truncate">{comment.author.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 align-top">
                                                        <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">{comment.content}</p>
                                                        {comment.hidden && <span className="inline-block mt-1 px-1.5 py-0.5 bg-neutral-100 text-[8px] font-bold text-neutral-400 rounded border border-neutral-200 uppercase tracking-wider">Masqué</span>}
                                                    </td>
                                                    <td className="px-6 py-5 align-top">
                                                        <div className="flex items-center gap-2 max-w-[200px]">
                                                            <BookOpen size={12} className="text-neutral-300 flex-shrink-0" />
                                                            <span className="text-xs font-medium text-neutral-500 truncate">{comment.article.title}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 align-top text-center">
                                                        <span className="text-[10px] font-bold text-neutral-400 whitespace-nowrap">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                                    </td>
                                                    <td className="pr-8 py-5 align-top text-right">
                                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                            <button
                                                                onClick={() => setReplyingTo(comment)}
                                                                className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-white rounded-lg transition-all" title="Répondre"
                                                            >
                                                                <Reply size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleToggleHidden(comment)}
                                                                className="p-2 text-neutral-400 hover:text-orange-500 hover:bg-white rounded-lg transition-all" title={comment.hidden ? "Afficher" : "Masquer"}
                                                            >
                                                                {comment.hidden ? <Eye size={16} /> : <EyeOff size={16} />}
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(comment.id)}
                                                                className="p-2 text-neutral-400 hover:text-red-500 hover:bg-white rounded-lg transition-all" title="Supprimer"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>

            {/* Reply Modal */}
            <AnimatePresence>
                {replyingTo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
                        onClick={() => setReplyingTo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-white rounded-[2rem] p-6 w-full max-w-lg shadow-2xl"
                        >
                            <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                <Reply className="text-primary-500" size={20} />
                                Répondre à {replyingTo.author.name}
                            </h3>
                            <div className="bg-neutral-50 p-4 rounded-xl mb-4 border border-neutral-100">
                                <p className="text-xs text-neutral-500 italic line-clamp-3">"{replyingTo.content}"</p>
                            </div>
                            <form onSubmit={handleReply}>
                                <textarea
                                    autoFocus
                                    value={replyContent}
                                    onChange={e => setReplyContent(e.target.value)}
                                    placeholder="Votre réponse..."
                                    className="w-full h-32 p-4 bg-neutral-50 border border-neutral-100 rounded-xl focus:bg-white focus:border-primary-300 outline-none resize-none text-sm transition-all mb-4"
                                />
                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setReplyingTo(null)}
                                        className="px-4 py-2 text-xs font-bold text-neutral-500 hover:bg-neutral-100 rounded-xl transition-colors"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!replyContent.trim() || isSubmitting}
                                        className="px-6 py-2 bg-neutral-900 text-white text-xs font-bold rounded-xl hover:bg-neutral-800 disabled:opacity-50 transition-colors"
                                    >
                                        {isSubmitting ? 'Envoi...' : 'Envoyer la réponse'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Minimalist Load More */}
            {!isLoading && filteredComments.length > 0 && (
                <div className="text-center pt-4">
                    <button className="px-8 py-3 bg-white border border-neutral-100 rounded-2xl text-[10px] font-black text-neutral-400 uppercase tracking-widest hover:border-neutral-200 hover:text-neutral-600 hover:shadow-lg transition-all active:scale-95">
                        Charger plus de commentaires
                    </button>
                </div>
            )}
        </motion.div>
    );
}

export default function CommentsPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <CommentsPageContent />
        </Suspense>
    );
}
