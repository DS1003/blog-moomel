import React from "react";
import Link from "next/link";

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  images: string[];
}

export default function ArticleCard({ id, title, excerpt, author, date, images }: ArticleCardProps) {
  return (
    <Link 
      href={`/article/${id}`} 
      className="group block card card-hover overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        {images.length > 0 ? (
          <img 
            src={images[0]} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Multiple Images Indicator */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-neutral-700">
            +{images.length - 1}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-neutral-800 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
          {title}
        </h2>
        
        <p className="text-neutral-600 mb-4 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
        
        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-neutral-500">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">
                {author.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="font-medium">{author}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{date}</span>
          </div>
        </div>
        
        {/* Read More Indicator */}
        <div className="mt-4 flex items-center text-primary-600 font-medium text-sm group-hover:text-primary-700 transition-colors">
          Lire l'article
          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
