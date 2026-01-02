'use client';

import React from 'react';
import ArticleCard from "./ArticleCard";
import { useLanguage } from "@/app/_components/providers/LanguageProvider";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: { name: string | null };
  createdAt: Date | string;
  images: { url: string }[];
}

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  const { locale } = useLanguage();

  if (articles.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 md:w-12 md:h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h3 className="text-xl md:text-2xl font-serif font-semibold text-neutral-800 mb-2">
          {locale === 'fr' ? 'Aucun article trouvé' : 'No articles found'}
        </h3>
        <p className="text-neutral-600 max-w-md mx-auto text-sm md:text-base">
          {locale === 'fr'
            ? 'Revenez bientôt pour découvrir nos nouveaux articles sur la cosmétique naturelle.'
            : 'Check back soon for our latest articles on natural beauty.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {articles.map((article, index) => (
        <div
          key={article.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <ArticleCard
            id={article.id}
            slug={article.slug}
            title={article.title}
            excerpt={article.excerpt}
            author={article.author?.name || "Moomel"}
            date={new Date(article.createdAt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
            images={article.images.map((img) => img.url)}
          />
        </div>
      ))}
    </div>
  );
}
