'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import ProfileCard from '@/app/_components/user/ProfileCard';
import ArticleList from '@/app/_components/articles/ArticleList';
import ScrollReveal from '@/app/_components/ui/ScrollReveal';

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
        slug: "revolution-cosmetique-gamifiee-2025",
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
        <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[#F9F7F2]">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal animation="fade-up">
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif text-neutral-900 mb-2">Mon Espace</h1>
                        <p className="text-neutral-500">Suivez votre parcours et retrouvez vos inspirations.</p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-6">
                            <ScrollReveal animation="slide-right" delay={0.1}>
                                <ProfileCard user={user} className="bg-white rounded-[2rem] shadow-sm border border-neutral-100" />
                            </ScrollReveal>

                            {/* Stats Summary */}
                            <ScrollReveal animation="slide-right" delay={0.2}>
                                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-neutral-100">
                                    <h3 className="font-serif text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-sm">📊</span>
                                        Statistiques
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-xl">
                                            <span className="text-sm text-neutral-600 font-medium">Articles lus</span>
                                            <span className="font-bold text-primary-600 bg-white px-3 py-1 rounded-full shadow-sm">12</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-xl">
                                            <span className="text-sm text-neutral-600 font-medium">Commentaires</span>
                                            <span className="font-bold text-primary-600 bg-white px-3 py-1 rounded-full shadow-sm">5</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-xl">
                                            <span className="text-sm text-neutral-600 font-medium">Likes donnés</span>
                                            <span className="font-bold text-primary-600 bg-white px-3 py-1 rounded-full shadow-sm">24</span>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Welcome Banner */}
                        <ScrollReveal animation="fade-up" delay={0.3}>
                            <div className="relative overflow-hidden rounded-[2rem] bg-neutral-900 text-white p-8 md:p-12 shadow-xl">
                                {/* Abstract Shapes Background */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-500/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3"></div>

                                <div className="relative z-10">
                                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest mb-4">
                                        Niveau {user.level}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-serif mb-4">
                                        Ravi de vous revoir, <span className="text-primary-300 italic">{user.name}</span> !
                                    </h2>
                                    <p className="text-neutral-300 max-w-lg text-lg font-light leading-relaxed">
                                        Vous êtes à <strong className="text-white font-medium">750 XP</strong> du niveau suivant.
                                        Continuez à interagir pour débloquer le badge "Expert Beauté".
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Tabs (Simplified modern look) */}
                        <ScrollReveal animation="fade-up" delay={0.4}>
                            <div className="flex space-x-2 md:space-x-8 overflow-x-auto pb-2 scrollbar-hide">
                                <button className="px-6 py-3 rounded-full bg-neutral-900 text-white font-medium text-sm whitespace-nowrap shadow-md transition-transform hover:scale-105">
                                    Articles sauvegardés
                                </button>
                                <button className="px-6 py-3 rounded-full bg-white text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 font-medium text-sm whitespace-nowrap border border-neutral-200 transition-all">
                                    Mon activité
                                </button>
                                <button className="px-6 py-3 rounded-full bg-white text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 font-medium text-sm whitespace-nowrap border border-neutral-200 transition-all">
                                    Paramètres
                                </button>
                            </div>
                        </ScrollReveal>

                        {/* Bookmarked Articles */}
                        <ScrollReveal animation="fade-up" delay={0.5}>
                            <div>
                                <h2 className="text-2xl font-serif text-neutral-900 mb-6 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-primary-400 rounded-full"></span>
                                    Articles sauvegardés
                                </h2>
                                <ArticleList articles={bookmarkedArticles} />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </div>
    );
}
