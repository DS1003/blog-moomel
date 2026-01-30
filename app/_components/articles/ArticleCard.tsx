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
      className="group block relative w-full h-full flex flex-col gap-4"
    >
      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm transition-shadow duration-500 group-hover:shadow-md">
        {/* Image */}
        {images.length > 0 ? (
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
            <span className="font-serif text-3xl text-neutral-300 italic">M</span>
          </div>
        )}

        {/* Minimal Overlay & Button */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />

        <div className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm">
          <svg className="w-4 h-4 text-neutral-800 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </div>

        {/* Date on Image - Native Magazine Style */}
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] uppercase tracking-widest font-bold text-neutral-800 rounded-lg">
            {date.split(' ').slice(0, 2).join(' ')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 px-1">
        <h3 className="text-xl md:text-2xl font-serif text-neutral-900 leading-[1.2] group-hover:underline underline-offset-4 decoration-1 decoration-neutral-300 transition-all">
          {title}
        </h3>
        <p className="text-sm text-neutral-500 line-clamp-2 font-light leading-relaxed">
          {excerpt}
        </p>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-400 mt-2 font-medium">
          <span>{author}</span>
          <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
          <span>Article</span>
        </div>
      </div>
    </Link>
  );
}
