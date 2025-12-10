import React from "react";
import Link from "next/link";

interface ArticleCardProps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  images: string[];
}

export default function ArticleCard({ id, slug, title, excerpt, author, date, images }: ArticleCardProps) {
  return (
    <Link
      href={`/articles/${slug}`}
      className="group block card card-hover overflow-hidden h-full flex flex-col"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {images.length > 0 ? (
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
            <span className="text-neutral-400 font-serif italic text-lg">Moomel</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

        {/* Category Tag (Mockup) */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-neutral-800">
          Article
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-2xl font-serif text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
          {title}
        </h2>

        <p className="text-neutral-600 mb-6 line-clamp-3 leading-relaxed font-light text-sm flex-grow">
          {excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-neutral-500 pt-4 border-t border-neutral-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden relative">
              {/* Fallback avatar */}
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`} alt={author} className="object-cover w-full h-full" />
            </div>
            <span className="font-medium text-neutral-800">{author}</span>
          </div>

          <span className="font-serif italic text-neutral-400">{date}</span>
        </div>
      </div>
    </Link>
  );
}
