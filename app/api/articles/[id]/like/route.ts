import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    const { id: articleId } = await params;

    if (!session) {
        return NextResponse.json({ error: "Connectez-vous pour aimer cet article" }, { status: 401 });
    }

    const userId = session.user.id;

    try {
        // Check if like exists
        const existingLike = await prisma.like.findUnique({
            where: {
                userId_articleId: {
                    userId,
                    articleId,
                },
            },
        });

        if (existingLike) {
            // Unlike
            await prisma.like.delete({
                where: {
                    userId_articleId: {
                        userId,
                        articleId,
                    },
                },
            });
            return NextResponse.json({ liked: false });
        } else {
            // Like
            await prisma.like.create({
                data: {
                    userId,
                    articleId,
                },
            });

            // Award XP for liking (Example: +5 XP)
            // await addXP(userId, 5);

            return NextResponse.json({ liked: true });
        }
    } catch (error) {
        console.error("Like error:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
