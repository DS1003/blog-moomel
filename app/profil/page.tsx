'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import ProfileCard from '@/app/_components/user/ProfileCard';
import ArticleList from '@/app/_components/articles/ArticleList';

// Mock user data if session is missing or for demo
const mockUser = {
    name: "Sophie Martin",
    image: null,
    level: 5,
    xp: 4250,
    badges: [
        { id: "1", name: "Bienvenue", icon: "👋", description: "A rejoint la communauté" },
        { id: "2", name: "Lectrice Assidue", icon: "📚", description: "A lu 10 articles" },
        { id: "3", name: "Première Réaction", icon: "❤️", description: "A liké un article" },
    ]
};

const bookmarkedArticles = [
    {
        id: "1",
        title: "La révolution de la cosmétique gamifiée en 2025",
        excerpt: "Découvrez comment la gamification transforme l'expérience beauté...",
        author: { name: "Dr. Sarah Martin" },
        createdAt: "2024-12-15T10:00:00Z",
        images: [
            { url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop" }
        ]
    }
];

export default function ProfilePage() {
    const { data: session, status } = useSession();

    // In a real app, we would check session and redirect if not authenticated
    // For this demo, we'll show the mock user if not logged in, or use session data

    const user = session?.user ? {
        name: session.user.name || "Utilisateur",
        image: session.user.image,
        level: 1, // Fetch from DB in real app
        xp: 0,    // Fetch from DB in real app
        badges: [] // Fetch from DB in real app
    } : mockUser;

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-neutral-50/50">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <ProfileCard user={user} />

                            {/* Stats Summary */}
                            <div className="mt-6 card p-6">
                                <h3 className="font-bold text-neutral-800 mb-4">Statistiques</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-neutral-600">Articles lus</span>
                                        <span className="font-bold text-primary-600">12</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-neutral-600">Commentaires</span>
                                        <span className="font-bold text-primary-600">5</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-neutral-600">Likes donnés</span>
                                        <span className="font-bold text-primary-600">24</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Welcome Banner */}
                        <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                            <div className="relative z-10">
                                <h1 className="text-3xl font-bold mb-2">Bonjour, {user.name} !</h1>
                                <p className="opacity-90">
                                    Vous êtes à <span className="font-bold">750 XP</span> du niveau suivant.
                                    Continuez à interagir pour débloquer le badge "Expert Beauté".
                                </p>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        </div>

                        {/* Tabs (Simplified) */}
                        <div className="border-b border-neutral-200">
                            <nav className="-mb-px flex space-x-8">
                                <button className="border-b-2 border-primary-500 py-4 px-1 text-primary-600 font-medium">
                                    Articles sauvegardés
                                </button>
                                <button className="border-b-2 border-transparent py-4 px-1 text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 font-medium">
                                    Mon activité
                                </button>
                                <button className="border-b-2 border-transparent py-4 px-1 text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 font-medium">
                                    Paramètres
                                </button>
                            </nav>
                        </div>

                        {/* Bookmarked Articles */}
                        <div>
                            <h2 className="text-xl font-bold text-neutral-800 mb-6">Articles sauvegardés</h2>
                            <ArticleList articles={bookmarkedArticles} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
