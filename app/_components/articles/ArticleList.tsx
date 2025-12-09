import React from "react";
import ArticleCard from "./ArticleCard";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: { name: string };
  createdAt: string;
  images: { url: string }[];
}

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-neutral-800 mb-2">Aucun article trouvé</h3>
        <p className="text-neutral-600 max-w-md mx-auto">
          Revenez bientôt pour découvrir nos nouveaux articles sur la cosmétique gamifiée.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {articles.map((article, index) => (
        <div 
          key={article.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <ArticleCard
            id={article.id}
            title={article.title}
            excerpt={article.excerpt}
            author={article.author?.name || "Anonyme"}
            date={new Date(article.createdAt).toLocaleDateString('fr-FR', {
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
