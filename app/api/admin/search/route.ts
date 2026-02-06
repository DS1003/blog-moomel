import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
        return NextResponse.json({ results: [] });
    }

    try {
        const [articles, users, categories, comments] = await Promise.all([
            prisma.article.findMany({
                where: {
                    OR: [
                        { title: { contains: query, mode: 'insensitive' } },
                        { excerpt: { contains: query, mode: 'insensitive' } }
                    ]
                },
                select: { id: true, title: true, slug: true, category: { select: { name: true } } },
                take: 5
            }),
            prisma.user.findMany({
                where: {
                    OR: [
                        { name: { contains: query, mode: 'insensitive' } },
                        { email: { contains: query, mode: 'insensitive' } }
                    ]
                },
                select: { id: true, name: true, email: true, image: true },
                take: 5
            }),
            prisma.category.findMany({
                where: {
                    name: { contains: query, mode: 'insensitive' }
                },
                select: { id: true, name: true, slug: true },
                take: 3
            }),
            prisma.comment.findMany({
                where: {
                    content: { contains: query, mode: 'insensitive' }
                },
                select: { id: true, content: true, author: { select: { name: true } } },
                take: 3
            })
        ]);

        const results = [
            ...articles.map(a => ({ id: a.id, title: a.title, type: 'article', link: `/admin/articles/${a.id}`, subtitle: a.category?.name || 'Article' })),
            ...users.map(u => ({ id: u.id, title: u.name || u.email, type: 'user', link: `/admin/users`, subtitle: u.email })),
            ...categories.map(c => ({ id: c.id, title: c.name, type: 'category', link: `/admin/categories`, subtitle: 'Catégorie' })),
            ...comments.map(c => ({ id: c.id, title: c.content.substring(0, 50) + '...', type: 'comment', link: `/admin/comments`, subtitle: `Par ${c.author.name}` }))
        ];

        return NextResponse.json({ results });
    } catch (error) {
        console.error('Search API Error:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
