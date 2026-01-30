import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const categories = await (prisma as any).category.findMany({
            orderBy: { name: 'asc' },
            include: { _count: { select: { articles: true } } }
        });
        return NextResponse.json(categories, {
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
            },
        });
    } catch (e: any) {
        console.error("GET CATEGORIES ERROR:", e);
        return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
    }
}

const catSchema = z.object({
    name: z.string().min(2),
    description: z.string().optional().or(z.literal('')),
    icon: z.string().optional(),
    color: z.string().optional(),
});

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parse = catSchema.safeParse(body);
    if (!parse.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

    const slug = parse.data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Check uniqueness
    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) return NextResponse.json({ error: "Category already exists" }, { status: 400 });

    try {
        const cat = await (prisma as any).category.create({
            data: {
                name: parse.data.name,
                slug,
                description: parse.data.description,
                icon: parse.data.icon || "Box",
                color: parse.data.color || "text-emerald-500 bg-emerald-50"
            }
        });
        return NextResponse.json(cat);
    } catch (e: any) {
        console.error("CREATE CATEGORY ERROR:", e);
        return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
    }
}
