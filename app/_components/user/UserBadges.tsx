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
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
      <Link href={`/article/${id}`}>
        <div className="h-48 overflow-hidden">
          {images && images.length > 0 ? (
            <img 
              src={images[0]} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Pas d'image</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
          <p className="text-gray-600 mb-3 line-clamp-3">{excerpt}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{author}</span>
            <span>{date}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}