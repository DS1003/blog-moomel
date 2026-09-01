'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/app/_components/providers/LanguageProvider';

export default function CategoriesPage() {
    const { t } = useLanguage();

    const categories = [
        {
            slug: 'soins-visage',
            name: t.categories_page.categories['soins-visage'].name,
            description: t.categories_page.categories['soins-visage'].description,
            image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
            count: 12
        },
        {
            slug: 'corps-bain',
            name: t.categories_page.categories['corps-bain'].name,
            description: t.categories_page.categories['corps-bain'].description,
            image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop',
            count: 8
        },
        {
            slug: 'cheveux',
            name: t.categories_page.categories['cheveux'].name,
            description: t.categories_page.categories['cheveux'].description,
            image: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=800&auto=format&fit=crop',
            count: 15
        },
        {
            slug: 'sante-bien-etre',
            name: t.categories_page.categories['sante-bien-etre'].name,
            description: t.categories_page.categories['sante-bien-etre'].description,
            image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
            count: 6
        },
    ];

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 animate-slide-up">
                    <span className="text-primary-600 font-medium tracking-widest text-sm uppercase mb-2 block">
                        {t.categories_page.collection}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-neutral-900 mb-6">
                        {t.categories_page.title}
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                        {t.categories_page.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {categories.map((category, idx) => (
                        <Link
                            href={`/articles?category=${category.slug}`}
                            key={category.slug}
                            className="group relative h-[240px] md:h-[300px] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 block w-full"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>

                            {/* Glassmorphic Label */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                <div className="bg-white/90 backdrop-blur-md px-8 py-6 rounded-2xl transform transition-all duration-300 group-hover:scale-105 group-hover:bg-white">
                                    <h3 className="text-2xl font-serif text-neutral-900 mb-2">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm text-neutral-600 line-clamp-2 max-w-[200px] mx-auto opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto transition-all duration-300 overflow-hidden">
                                        {category.description}
                                    </p>
                                    <span className="text-xs font-bold text-primary-600 uppercase tracking-wider mt-2 block">
                                        {category.count} {t.categories_page.articles_count}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
