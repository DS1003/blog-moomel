import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MODERATOR')) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
    }

    try {
        await prisma.comment.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting comment:", error);
        return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MODERATOR')) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
    }

    try {
        const body = await request.json();
        // Support hiding/unhiding
        if (typeof body.hidden !== 'undefined') {
            const updatedComment = await prisma.comment.update({
                where: { id },
                data: { hidden: body.hidden },
                include: {
                    author: { select: { name: true, image: true, email: true } },
                    article: { select: { title: true, slug: true } }
                }
            });
            return NextResponse.json(updatedComment);
        }

        return NextResponse.json({ error: "Aucune action reconnue" }, { status: 400 });

    } catch (error) {
        console.error("Error updating comment:", error);
        return NextResponse.json({ error: "Erreur lors de la modification" }, { status: 500 });
    }
}
