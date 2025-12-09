import React from 'react';
import ArticleList from '@/app/_components/articles/ArticleList';

// Demo data (replace with API call later)
const demoArticles = [
    {
        id: "1",
        title: "La révolution de la cosmétique gamifiée en 2025",
        excerpt: "Découvrez comment la gamification transforme l'expérience beauté et engage les utilisateurs dans leur routine cosmétique quotidienne.",
        author: { name: "Dr. Sarah Martin" },
        createdAt: "2024-12-15T10:00:00Z",
        images: [
            { url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop" }
        ]
    },
    {
        id: "2",
        title: "Les innovations technologiques dans le skincare",
        excerpt: "IA, réalité augmentée et capteurs connectés : comment la technologie révolutionne nos soins de la peau.",
        author: { name: "Marie Dubois" },
        createdAt: "2024-12-14T14:30:00Z",
        images: [
            { url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&h=600&fit=crop" }
        ]
    },
    {
        id: "3",
        title: "Gamification et engagement utilisateur",
        excerpt: "Comment les mécaniques de jeu augmentent l'adhérence aux routines beauté et améliorent les résultats.",
        author: { name: "Alexandre Chen" },
        createdAt: "2024-12-13T09:15:00Z",
        images: [
            { url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop" }
        ]
    },
    {
        id: "4",
        title: "L'avenir de la beauté personnalisée",
        excerpt: "Découvrez comment l'IA et les données personnelles créent des expériences beauté sur mesure.",
        author: { name: "Emma Rodriguez" },
        createdAt: "2024-12-12T16:45:00Z",
        images: [
            { url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop" }
        ]
    },
    {
        id: "5",
        title: "Les tendances cosmétiques pour 2025",
        excerpt: "Durabilité, technologie et personnalisation : les trois piliers de la cosmétique de demain.",
        author: { name: "Sophie Laurent" },
        createdAt: "2024-12-11T11:20:00Z",
        images: [
            { url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop" }
        ]
    },
    {
        id: "6",
        title: "Comment Moomel révolutionne l'expérience beauté",
        excerpt: "Plongez dans l'univers Moomel et découvrez notre approche unique de la cosmétique gamifiée.",
        author: { name: "L'équipe Moomel" },
        createdAt: "2024-12-10T13:00:00Z",
        images: [
            { url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&h=600&fit=crop" }
        ]
    }
];

export default function ArticlesPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 animate-slide-up">
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">
                        Tous nos articles
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
                        Explorez notre bibliothèque de contenus sur la beauté, la technologie et la gamification.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="Rechercher un article..."
                            className="w-full px-6 py-4 rounded-full border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none shadow-sm transition-all pl-12"
                        />
                        <svg
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <ArticleList articles={demoArticles} />
            </div>
        </div>
    );
}
