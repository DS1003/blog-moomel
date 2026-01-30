import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    try {
        const body = await req.json();
        // Remove id and other immutable fields from body if present
        const { id, _count, createdAt, updatedAt, ...updateData } = body;

        if (updateData.xpRequired) {
            updateData.xpRequired = Number(updateData.xpRequired);
        }

        const badge = await prisma.badge.update({
            where: { id: params.id },
            data: updateData
        });

        return NextResponse.json(badge);
    } catch (error) {
        console.error("Error updating badge:", error);
        return NextResponse.json({ error: "Erreur lors de la modification du badge" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    try {
        await prisma.badge.delete({
            where: { id: params.id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting badge:", error);
        return NextResponse.json({ error: "Erreur lors de la suppression du badge" }, { status: 500 });
    }
}
