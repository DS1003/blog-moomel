import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// PATCH /api/users/[id] - Update user (role, isActive)
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
    }

    try {
        const body = await request.json();

        // Prevent admin from blocking themselves or demoting themselves (basic safety)
        if (id === session.user.id && (body.isActive === false || body.role !== 'ADMIN')) {
            return NextResponse.json({ error: "Impossible de modifier son propre statut administrateur" }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: body,
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
                isActive: true,
                createdAt: true,
                level: true,
                xp: true,
                _count: {
                    select: {
                        comments: true,
                        articles: true
                    }
                }
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: "Erreur lors de la modification" }, { status: 500 });
    }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
    }

    if (id === session.user.id) {
        return NextResponse.json({ error: "Impossible de supprimer son propre compte ici" }, { status: 400 });
    }

    try {
        await prisma.user.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
    }
}
