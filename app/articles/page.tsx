import React from 'react';
import { prisma } from "@/lib/prisma";
import ArticlesPageView from '@/app/_components/pages/ArticlesPageView';

export const dynamic = 'force-dynamic';

export default async function ArticlesPage() {
    const articles = await prisma.article.findMany({
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

    return <ArticlesPageView articles={articles as any} />;
}
