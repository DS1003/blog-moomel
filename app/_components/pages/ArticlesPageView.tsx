'use client';

import React from 'react';
import ArticleList from '@/app/_components/articles/ArticleList';
import { useLanguage } from '@/app/_components/providers/LanguageProvider';
import ScrollReveal from '@/app/_components/ui/ScrollReveal';

// Define strict types for props
type Article = {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    author: { name: string | null };
    createdAt: Date;
    images: { url: string }[];
};

export default function ArticlesPageView({ articles }: { articles: Article[] }) {
    const { t } = useLanguage();

    const filters = [
        t.articles_page.filter_face,
        t.articles_page.filter_hair,
        t.articles_page.filter_body,
        t.articles_page.filter_wellness,
        t.articles_page.filter_analysis,
        t.articles_page.filter_tutorials
    ];

    return (
        <div className="min-h-screen bg-neutral-50 pb-20">
            {/* Header / Hero for Articles */}
            <div className="relative bg-primary-900 text-white pt-24 sm:pt-32 pb-20 sm:pb-24 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-accent-600 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <ScrollReveal animation="fade-up">
                        <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium tracking-wide mb-4">
                            {t.articles_page.tag}
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-4 sm:mb-6 leading-tight">
                            {t.articles_page.title}
                        </h1>
                        <p className="text-lg sm:text-xl text-primary-100 max-w-2xl mx-auto mb-8 sm:mb-10 font-light px-4">
                            {t.articles_page.subtitle}
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-xl mx-auto relative px-4">
                            <input
                                type="text"
                                placeholder={t.articles_page.search_placeholder}
                                className="w-full px-6 sm:px-8 py-4 sm:py-5 rounded-full border-none bg-white text-neutral-900 placeholder-neutral-400 focus:ring-4 focus:ring-primary-500/30 outline-none shadow-2xl text-base sm:text-lg"
                            />
                            <button className="absolute right-6 sm:right-7 top-2 sm:top-2.5 bg-primary-600 text-white p-2 sm:p-2.5 rounded-full hover:bg-primary-700 transition-colors shadow-lg">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
                {/* Category Filters (Visual) */}
                <div className="flex overflow-x-auto pb-6 gap-2 md:gap-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 justify-start md:justify-center mb-10 md:mb-12">
                    <button className="whitespace-nowrap px-4 py-2 md:px-6 md:py-3 text-xs md:text-base rounded-full bg-neutral-900 text-white font-medium shadow-lg flex-shrink-0">
                        {t.articles_page.filter_all}
                    </button>
                    {filters.map((cat) => (
                        <button key={cat} className="whitespace-nowrap px-4 py-2 md:px-6 md:py-3 text-xs md:text-base rounded-full bg-white text-neutral-600 font-medium shadow-sm hover:shadow-md hover:text-primary-600 transition-all border border-neutral-100 flex-shrink-0">
                            {cat}
                        </button>
                    ))}
                </div>

                <ScrollReveal animation="fade-up" delay={0.2}>
                    <ArticleList articles={articles as any} />
                </ScrollReveal>
            </div>
        </div>
    );
}
