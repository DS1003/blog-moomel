import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "ADMIN") {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    try {
        const badges = await prisma.badge.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { users: true }
                }
            }
        });

        // Transform data to match frontend expectation (count of users)
        const formattedBadges = badges.map(badge => ({
            ...badge,
            users: badge._count.users
        }));

        return NextResponse.json(formattedBadges);
    } catch (error) {
        console.error("Error fetching badges:", error);
        return NextResponse.json({ error: "Erreur lors de la récupération des badges" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "ADMIN") {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { name, description, icon, rarity, color, xpRequired } = body;

        // Basic validation
        if (!name || !description || !icon) {
            return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
        }

        const badge = await prisma.badge.create({
            data: {
                name,
                description,
                icon,
                rarity: rarity || "Common",
                color: color || "text-slate-500 bg-slate-50",
                xpRequired: Number(xpRequired) || 0
            }
        });

        return NextResponse.json(badge);
    } catch (error) {
        console.error("Error creating badge:", error);
        return NextResponse.json({ error: "Erreur lors de la création du badge" }, { status: 500 });
    }
}
