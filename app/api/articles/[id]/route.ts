import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

export const dynamic = 'force-dynamic';

// GET /api/articles/[id]
export async function GET(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;

    // Await params if necessary in newer Next.js versions, but for now standard access
    const id = params.id;

    try {
        const article = await prisma.article.findUnique({
            where: { id },
            include: {
                images: true,
                category: true,
                tags: true,
            },
        });

        if (!article) {
            return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
        }

        return NextResponse.json(article);
    } catch (error) {
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}

const articleUpdateSchema = z.object({
    title: z.string().min(3).optional(),
    excerpt: z.string().min(10).optional(),
    content: z.string().min(20).optional(),
    published: z.boolean().optional(),
    imageUrl: z.string().url().optional().or(z.literal('')),
    categoryId: z.string().optional(),
});

// PUT /api/articles/[id]
export async function PUT(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const id = params.id;
    const body = await request.json();
    const parse = articleUpdateSchema.safeParse(body);

    if (!parse.success) {
        return NextResponse.json({ error: "Entrée invalide", details: parse.error.flatten() }, { status: 400 });
    }

    const data = parse.data;

    try {
        // Prepare update data
        const updateData: any = { ...data };
        delete updateData.imageUrl; // Handle manually
        delete updateData.categoryId;

        if (data.categoryId) {
            updateData.category = { connect: { id: data.categoryId } };
        }

        // Handle Image Update if provided
        // Logic: If imageUrl is new, we might need to delete old one or just add?
        // Simple logic: If there is an imageUrl, update the first image or create one.
        // For simplicity: delete existing images and create new one if imageUrl is provided.
        if (data.imageUrl) {
            await prisma.image.deleteMany({ where: { articleId: id } });
            updateData.images = {
                create: { url: data.imageUrl }
            };
        } else if (data.imageUrl === '') {
            // If explicity cleared
            await prisma.image.deleteMany({ where: { articleId: id } });
        }

        const article = await prisma.article.update({
            where: { id },
            data: updateData,
            include: { images: true }
        });

        return NextResponse.json(article);
    } catch (error: any) {
        console.error("Update error", error);
        return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
    }
}

// DELETE /api/articles/[id]
export async function DELETE(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const id = params.id;

    try {
        await prisma.article.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
    }
}
