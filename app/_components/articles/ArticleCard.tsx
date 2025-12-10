import React from "react";
import Link from "next/link";
import Image from "next/image";

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
      className="group block relative w-full h-full"
    >
      <div className="relative aspect-[3/4] md:aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] bg-neutral-100 mb-6">
        {/* Image */}
        {images.length > 0 ? (
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-200">
            <span className="font-serif text-neutral-400 italic">Moomel</span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

        {/* "Read" Button appearing on hover */}
        <div className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
          <svg className="w-5 h-5 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </div>

        {/* Category Pill */}
        <div className="absolute top-6 left-6">
          <span className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider text-neutral-900 shadow-sm border border-white/20">
            Article
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="pr-4">
        <div className="flex items-center space-x-3 mb-3 text-xs font-medium uppercase tracking-widest text-neutral-400">
          <span>{date}</span>
          <span className="w-1 h-1 bg-primary-400 rounded-full"></span>
          <span>{author}</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-serif text-neutral-900 leading-tight mb-3 group-hover:text-primary-700 transition-colors">
          {title}
        </h3>
        <p className="text-neutral-500 line-clamp-2 md:line-clamp-3 leading-relaxed font-light">
          {excerpt}
        </p>
        <div className="mt-4 inline-flex items-center text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 group-hover:decoration-primary-400 transition-all">
          Lire l'article
        </div>
      </div>
    </Link>
  );
}
