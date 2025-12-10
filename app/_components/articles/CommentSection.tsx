'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Button from '@/app/_components/ui/Button';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Comment {
    id: string;
    content: string;
    createdAt: string;
    author: {
        id: string;
        name: string;
        image: string;
        role: string;
    };
    replies?: Comment[];
}

export default function CommentSection({ articleId }: { articleId: string }) {
    const { data: session } = useSession();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [replyTo, setReplyTo] = useState<string | null>(null);
    const [replyContent, setReplyContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchComments();
    }, [articleId]);

    const fetchComments = async () => {
        try {
            const res = await fetch(`/api/comments?articleId=${articleId}`);
            if (res.ok) {
                setComments(await res.json());
            }
        } catch (error) {
            console.error('Erreur chargement commentaires:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent, parentId?: string) => {
        e.preventDefault();
        if (!session) return;

        const content = parentId ? replyContent : newComment;
        if (!content.trim()) return;

        setIsLoading(true);
        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content,
                    articleId,
                    parentId
                }),
            });

            if (res.ok) {
                setNewComment('');
                setReplyContent('');
                setReplyTo(null);
                fetchComments(); // Recharger les commentaires
            }
        } catch (error) {
            console.error('Erreur envoi commentaire:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const CommentItem = ({ comment, isReply = false }: { comment: Comment, isReply?: boolean }) => (
        <div className={`flex space-x-4 ${isReply ? 'ml-12 mt-4' : 'mt-6'}`}>
            <div className="flex-shrink-0">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                        src={comment.author.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author.name}`}
                        alt={comment.author.name}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
            <div className="flex-grow">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-100">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <span className="font-bold text-neutral-800 mr-2">{comment.author.name}</span>
                            {comment.author.role === 'ADMIN' && (
                                <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">
                                    Admin
                                </span>
                            )}
                        </div>
                        <span className="text-xs text-neutral-500">
                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: fr })}
                        </span>
                    </div>
                    <p className="text-neutral-700 text-sm">{comment.content}</p>

                    {!isReply && session && (
                        <button
                            onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                            className="text-xs text-primary-600 font-medium mt-2 hover:underline"
                        >
                            Répondre
                        </button>
                    )}
                </div>

                {/* Formulaire de réponse */}
                {replyTo === comment.id && (
                    <form onSubmit={(e) => handleSubmit(e, comment.id)} className="mt-4 ml-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                placeholder="Votre réponse..."
                                className="flex-grow rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm px-3 py-2 border"
                                autoFocus
                            />
                            <Button type="submit" size="sm" disabled={isLoading}>
                                Envoyer
                            </Button>
                        </div>
                    </form>
                )}

                {/* Réponses imbriquées */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="space-y-4">
                        {comment.replies.map(reply => (
                            <CommentItem key={reply.id} comment={reply} isReply={true} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="mt-12">
            <h3 className="text-2xl font-bold text-neutral-800 mb-8">
                Commentaires ({comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0)})
            </h3>

            {/* Formulaire principal */}
            {session ? (
                <form onSubmit={(e) => handleSubmit(e)} className="mb-10">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                <Image
                                    src={session.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.name}`}
                                    alt={session.user.name || 'User'}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Partagez votre avis..."
                                rows={3}
                                className="w-full rounded-lg border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3 border resize-none"
                            />
                            <div className="mt-2 flex justify-end">
                                <Button type="submit" disabled={isLoading || !newComment.trim()}>
                                    {isLoading ? 'Envoi...' : 'Publier'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="bg-neutral-50 p-6 rounded-lg text-center mb-10 border border-neutral-200">
                    <p className="text-neutral-600 mb-4">Connectez-vous pour participer à la discussion et gagner des XP !</p>
                    <Button href="/auth/signin" variant="outline">
                        Se connecter
                    </Button>
                </div>
            )}

            {/* Liste des commentaires */}
            <div className="space-y-8">
                {comments.map(comment => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}
                {comments.length === 0 && (
                    <p className="text-center text-neutral-500 italic">Soyez le premier à commenter !</p>
                )}
            </div>
        </div>
    );
}
