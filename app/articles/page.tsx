import React from 'react';
import { prisma } from "@/lib/prisma";
import ArticlesPageView from '@/app/_components/pages/ArticlesPageView';

export const dynamic = 'force-dynamic';

export default async function ArticlesPage() {
    const articles = await prisma.article.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            author: true,
            images: true,
            _count: { select: { likes: true, comments: true } }
        },
    });

    return <ArticlesPageView articles={articles as any} />;
}
