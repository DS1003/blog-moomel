import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

export const dynamic = 'force-dynamic';

const catSchema = z.object({
    name: z.string().min(2),
    description: z.string().optional().or(z.literal('')),
    icon: z.string().optional(),
    color: z.string().optional(),
});

export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parse = catSchema.safeParse(body);
    if (!parse.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

    const slug = parse.data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    try {
        const current = await prisma.category.findUnique({ where: { id: params.id } });
        if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 });

        if (slug !== current.slug) {
            const existing = await prisma.category.findUnique({ where: { slug } });
            if (existing) return NextResponse.json({ error: "Category slug already exists" }, { status: 400 });
        }

        const cat = await (prisma as any).category.update({
            where: { id: params.id },
            data: {
                name: parse.data.name,
                slug,
                description: parse.data.description,
                icon: parse.data.icon,
                color: parse.data.color
            }
        });
        return NextResponse.json(cat);
    } catch (e: any) {
        console.error("UPDATE CATEGORY ERROR:", e);
        return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const count = await prisma.article.count({ where: { categoryId: params.id } });
        if (count > 0) {
            return NextResponse.json({ error: "Cette catégorie contient des articles et ne peut pas être supprimée." }, { status: 400 });
        }

        await (prisma as any).category.delete({ where: { id: params.id } });
        return NextResponse.json({ success: true });
    } catch (e: any) {
        console.error("DELETE CATEGORY ERROR:", e);
        return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
    }
}
