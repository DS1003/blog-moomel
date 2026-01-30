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
        const configs = await prisma.gamificationConfig.findMany();
        // Convert array to object for easier frontend consumption: { action: amount }
        const configObject = configs.reduce((acc: Record<string, number>, curr: any) => {
            acc[curr.action] = curr.xpAmount;
            return acc;
        }, {});

        return NextResponse.json(configObject);
    } catch (error) {
        console.error("Error fetching XP config:", error);
        return NextResponse.json({ error: "Erreur lors de la récupération de la configuration XP" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    try {
        const body = await req.json();
        // body should be { action: amount, action2: amount2, ... }

        const updates = Object.entries(body).map(([action, amount]) => {
            return (prisma as any).gamificationConfig.upsert({
                where: { action },
                update: { xpAmount: Number(amount) },
                create: { action, xpAmount: Number(amount) }
            });
        });

        await prisma.$transaction(updates);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating XP config:", error);
        return NextResponse.json({ error: "Erreur lors de la mise à jour de la configuration XP" }, { status: 500 });
    }
}
