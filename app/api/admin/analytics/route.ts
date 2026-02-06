import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { startOfMonth, subMonths, format, startOfDay, endOfDay, eachDayOfInterval, subDays, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const thirtyDaysAgo = subDays(new Date(), 29);

        // 1. Overall Totals & Advanced KPIs
        const [
            totalArticles,
            totalUsers,
            totalComments,
            totalViewsData,
            totalLikes,
            totalBadges,
            newUsers30d,
            newArticles30d
        ] = await Promise.all([
            prisma.article.count(),
            prisma.user.count(),
            prisma.comment.count(),
            prisma.article.aggregate({ _sum: { views: true } }),
            prisma.like.count(),
            prisma.badge.count(),
            prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
            prisma.article.count({ where: { createdAt: { gte: thirtyDaysAgo } } })
        ]);

        const totalViews = totalViewsData._sum.views || 0;
        const avgEngagement = totalArticles > 0 ? ((totalComments + totalLikes) / totalArticles).toFixed(1) : 0;

        // 2. Performance Tracking (Last 30 days)
        const dailyStats = await prisma.article.findMany({
            where: { createdAt: { gte: thirtyDaysAgo } },
            select: { views: true, createdAt: true, _count: { select: { comments: true, likes: true } } }
        });

        const last30Days = eachDayOfInterval({
            start: thirtyDaysAgo,
            end: new Date()
        });

        const performanceData = last30Days.map(day => {
            const dayStr = format(day, 'dd MMM', { locale: fr });
            const dayArticles = dailyStats.filter(v =>
                isSameDay(new Date(v.createdAt), day)
            );

            const views = dayArticles.reduce((sum, curr) => sum + (curr.views || 0), 0);
            const interactions = dayArticles.reduce((sum, curr) => sum + curr._count.comments + curr._count.likes, 0);

            return {
                name: dayStr,
                vues: views,
                interactions: interactions,
                conversion: views > 0 ? ((interactions / views) * 100).toFixed(1) : 0
            };
        });

        // 3. Category Distribution with weighted performance
        const categories = await prisma.category.findMany({
            include: {
                articles: {
                    select: { views: true }
                },
                _count: { select: { articles: true } }
            }
        });

        const categoryData = categories.map((c: any) => {
            const catViews = c.articles.reduce((sum: number, a: any) => sum + (a.views || 0), 0);
            return {
                name: c.name,
                value: c._count.articles,
                views: catViews,
                color: c.color || '#B88636'
            };
        });

        // 4. Tag Cloud Data
        const tags = await prisma.tag.findMany({
            take: 10,
            include: { _count: { select: { articles: true } } },
            orderBy: { articles: { _count: 'desc' } }
        });

        // 5. Elite Articles (By Engagement = Likes + Comments)
        const topArticles = await prisma.article.findMany({
            take: 6,
            orderBy: { views: 'desc' },
            include: {
                category: { select: { name: true } },
                _count: { select: { comments: true, likes: true } }
            }
        });

        // 6. User Leaderboard (XP + Level)
        const topUsers = await prisma.user.findMany({
            take: 6,
            orderBy: { xp: 'desc' },
            select: { name: true, xp: true, level: true, image: true, createdAt: true }
        });

        return NextResponse.json({
            totals: {
                articles: totalArticles,
                users: totalUsers,
                comments: totalComments,
                views: totalViews,
                likes: totalLikes,
                badges: totalBadges,
                newUsers30d,
                newArticles30d,
                avgEngagement
            },
            performanceData,
            categoryData,
            tagCloud: tags.map(t => ({ name: t.name, count: t._count.articles })),
            topArticles: topArticles.map(a => ({
                title: a.title,
                views: a.views,
                category: a.category?.name || 'Inconnu',
                engagement: a._count.comments + a._count.likes
            })),
            topUsers
        });

    } catch (error) {
        console.error('Advanced Analytics API Error:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
