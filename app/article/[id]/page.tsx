"use client";

import React, { useState } from "react";
import { notFound, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import CommentList from "@/app/_components/comments/CommentList";
import CommentForm from "@/app/_components/comments/CommentForm";
import Image from "next/image";
import Button from "@/app/_components/ui/Button";

async function fetchArticle(id: string) {
  const res = await fetch(`/api/articles?id=${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default function ArticlePage() {
  const params = useParams();
  const { data: session } = useSession();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<any[]>([]);

  React.useEffect(() => {
    fetchArticle(params.id as string).then((data) => {
      setArticle(data);
      setComments(data?.comments || []);
      setLoading(false);
    });
  }, [params.id]);

  const handleAddComment = async (content: string) => {
    if (!content.trim() || !session?.user?.id) return;
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        articleId: article.id,
        authorId: session.user.id,
      }),
    });
    if (res.ok) {
      const newComment = await res.json();
      setComments((prev) => [newComment, ...prev]);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[40vh]">
      <div className="shimmer w-16 h-16 rounded-full" />
      <span className="ml-4 text-lg text-neutral-500 animate-pulse">Chargement de l'article...</span>
    </div>
  );
  if (!article) return notFound();

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      {/* Hero Image */}
      {article.images && article.images.length > 0 && (
        <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-8 shadow-lg">
          <Image
            src={article.images[0].url}
            alt={article.title}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* Card Article */}
      <article className="card card-hover p-8 md:p-12 mb-12 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4 leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-semibold">
              {article.author?.name?.charAt(0) || "A"}
            </span>
          </div>
          <span className="text-neutral-700 font-medium">
            {article.author?.name || "Anonyme"}
          </span>
          <span className="text-neutral-400">•</span>
          <span className="text-neutral-500">
            {new Date(article.createdAt).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
          </span>
        </div>
        <div className="prose prose-lg max-w-none text-neutral-800 mb-8">
          {article.content}
        </div>
        {article.images && article.images.length > 1 && (
          <div className="flex gap-4 overflow-x-auto mt-6">
            {article.images.slice(1).map((img: { url: string }, i: number) => (
              <div key={i} className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={img.url}
                  alt={article.title}
                  fill
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
        )}
      </article>

      {/* Commentaires */}
      <section className="card card-hover p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-primary-700">Commentaires</h2>
        {session?.user?.id ? (
          <CommentForm onSubmit={handleAddComment} />
        ) : (
          <div className="mb-4 text-sm text-neutral-500">Connecte-toi pour commenter.</div>
        )}
        <CommentList comments={comments} />
      </section>

      <div className="flex justify-center">
        <Button href="/" variant="secondary" size="md">
          ← Retour à l'accueil
        </Button>
      </div>
    </main>
  );
}