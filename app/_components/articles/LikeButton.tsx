'use client';

import React, { useState } from 'react';

interface LikeButtonProps {
    articleId: string;
    initialLikes: number;
    isLiked?: boolean;
}

export default function LikeButton({ articleId, initialLikes, isLiked = false }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(isLiked);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleLike = async () => {
        // Optimistic update
        const newLikedState = !liked;
        setLiked(newLikedState);
        setLikes(prev => newLikedState ? prev + 1 : prev - 1);

        if (newLikedState) {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 1000);
        }

        try {
            const res = await fetch(`/api/articles/${articleId}/like`, {
                method: 'POST',
            });

            if (res.status === 401) {
                // Not authorized: redirect to login
                window.location.href = '/auth/signin';
                return;
            }

            if (!res.ok) {
                // Revert if error
                setLiked(!newLikedState);
                setLikes(prev => !newLikedState ? prev + 1 : prev - 1);
            }
        } catch (error) {
            console.error('Error liking article:', error);
            // Revert if error
            setLiked(!newLikedState);
            setLikes(prev => !newLikedState ? prev + 1 : prev - 1);
        }
    };

    return (
        <button
            onClick={handleLike}
            className={`
        relative flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300
        ${liked
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md transform scale-105'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }
      `}
        >
            <div className="relative">
                <svg
                    className={`w-5 h-5 ${liked ? 'fill-current' : 'fill-none stroke-current'}`}
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>

                {/* Floating hearts animation */}
                {isAnimating && (
                    <>
                        <span className="absolute -top-8 -left-2 text-accent-500 animate-float opacity-0 text-lg">❤️</span>
                        <span className="absolute -top-6 left-4 text-primary-500 animate-float opacity-0 text-sm" style={{ animationDelay: '0.2s' }}>❤️</span>
                        <span className="absolute -top-8 right-0 text-accent-400 animate-float opacity-0 text-xs" style={{ animationDelay: '0.4s' }}>❤️</span>
                    </>
                )}
            </div>

            <span className="font-medium">{likes}</span>

            {/* XP Popup */}
            {isAnimating && (
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full animate-bounce shadow-sm">
                    +5 XP
                </div>
            )}
        </button>
    );
}
