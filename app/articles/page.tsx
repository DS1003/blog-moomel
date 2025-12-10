import React from 'react';
import { prisma } from "@/lib/prisma";
import ArticleList from '@/app/_components/articles/ArticleList';

export default async function ArticlesPage() {
    const articles = await prisma.article.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            author: true,
            images: true,
        },
    });
    return (
        <div className="min-h-screen bg-neutral-50 pb-20">
            {/* Header / Hero for Articles */}
            <div className="relative bg-primary-900 text-white pt-32 pb-24 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-600 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium tracking-wide mb-4 animate-fade-in">
                        Blog & Conseils
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 animate-slide-up">
                        Explorez l'Univers Moomel
                    </h1>
                    <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        Votre source d'inspiration pour une beauté consciente, naturelle et innovante.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <input
                            type="text"
                            placeholder="Rechercher une astuce, un produit, un ingrédient..."
                            className="w-full px-8 py-5 rounded-full border-none bg-white text-neutral-900 placeholder-neutral-400 focus:ring-4 focus:ring-primary-500/30 outline-none shadow-2xl text-lg"
                        />
                        <button className="absolute right-3 top-2.5 bg-primary-600 text-white p-2.5 rounded-full hover:bg-primary-700 transition-colors shadow-lg">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                {/* Category Filters (Visual) */}
                <div className="flex overflow-x-auto pb-4 gap-3 md:gap-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 justify-start md:justify-center mb-12">
                    <button className="whitespace-nowrap px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base rounded-full bg-neutral-900 text-white font-medium shadow-lg scale-105 flex-shrink-0">
                        Tous les articles
                    </button>
                    {['Soins Visage', 'Cheveux', 'Corps', 'Bien-être', 'Analyses', 'Tutoriels'].map((cat) => (
                        <button key={cat} className="whitespace-nowrap px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base rounded-full bg-white text-neutral-600 font-medium shadow-sm hover:shadow-md hover:text-primary-600 transition-all border border-neutral-100 flex-shrink-0">
                            {cat}
                        </button>
                    ))}
                </div>

                <ArticleList articles={articles} />
            </div>
        </div>
    );
}
