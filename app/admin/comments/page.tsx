'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/app/_components/ui/ScrollReveal';

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
    reports: any[];
}

export default function CommentsPage() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <div className="min-h-screen pb-20 bg-[#F9F7F2]">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal animation="fade-up">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif font-medium text-neutral-900 mb-2">Commentaires</h1>
                            <p className="text-neutral-500">Modérez les échanges et maintenez un espace bienveillant.</p>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal animation="slide-up" delay={0.2}>
                    <div className="bg-white rounded-[2rem] shadow-sm border border-neutral-100 overflow-hidden">
                        {/* Toolbar */}
                        <div className="p-6 border-b border-neutral-100 flex gap-4 overflow-x-auto">
                            <button className="px-4 py-2 rounded-full bg-neutral-900 text-white text-sm font-medium">Tous</button>
                            <button className="px-4 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium transition-colors border border-red-100">Signalés (0)</button>
                            <button className="px-4 py-2 rounded-full bg-neutral-50 text-neutral-600 hover:bg-neutral-100 text-sm font-medium transition-colors">Masqués</button>
                        </div>

                        <div className="overflow-x-auto">
                            {isLoading ? (
                                <div className="flex items-center justify-center py-20">
                                    <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                <div className="divide-y divide-neutral-50">
                                    {comments.length === 0 ? (
                                        <div className="p-12 text-center text-neutral-400">Aucun commentaire pour le moment.</div>
                                    ) : (
                                        comments.map((comment) => (
                                            <div key={comment.id} className="p-6 hover:bg-neutral-50/50 transition-colors group">
                                                <div className="flex gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-neutral-100 flex-shrink-0 relative overflow-hidden">
                                                        {comment.author.image ? (
                                                            <Image src={comment.author.image} alt={comment.author.name} fill className="object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-neutral-400 font-bold">{comment.author.name[0]}</div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start mb-1">
                                                            <div>
                                                                <span className="font-bold text-sm text-neutral-900 mr-2">{comment.author.name}</span>
                                                                <span className="text-xs text-neutral-400">sur <span className="font-medium text-neutral-600">{comment.article.title}</span></span>
                                                            </div>
                                                            <span className="text-xs text-neutral-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                                        </div>

                                                        <p className="text-neutral-700 text-sm leading-relaxed mb-3 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                                                            {comment.content}
                                                        </p>

                                                        <div className="flex items-center gap-4 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button className="text-neutral-400 hover:text-primary-600 flex items-center gap-1">
                                                                <span>↩️</span> Répondre
                                                            </button>
                                                            <button className="text-neutral-400 hover:text-yellow-600 flex items-center gap-1">
                                                                <span>👁️</span> {comment.hidden ? 'Afficher' : 'Masquer'}
                                                            </button>
                                                            <button className="text-neutral-400 hover:text-red-600 flex items-center gap-1">
                                                                <span>🗑️</span> Supprimer
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}
