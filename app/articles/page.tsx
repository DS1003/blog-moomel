import React from 'react';
import { prisma } from "@/lib/prisma";
import ArticlesPageView from '@/app/_components/pages/ArticlesPageView';

export const dynamic = 'force-dynamic';

export default async function ArticlesPage() {
    let articles = [];
    try {
        articles = await prisma.article.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                slug: true,
                excerpt: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                        image: true,
                    }
                },
                images: {
                    select: {
                        url: true,
                    }
                },
                _count: { select: { likes: true, comments: true } }
            },
        });
    } catch (error) {
        console.error("Database connection failed on articles page:", error);
        // Fallback for development/deployment testing
        articles = [
            {
                id: "mock-1",
                title: "Les Secrets du Beurre de Karité",
                slug: "secrets-beurre-karite",
                excerpt: "Découvrez pourquoi cet or blanc est indispensable à votre routine beauté naturelle.",
                createdAt: new Date(),
                author: { name: "Moomel Team" },
                images: [{ url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop" }],
                _count: { likes: 0, comments: 0 }
            }
        ];
    }

    return <ArticlesPageView articles={articles as any} />;
}
