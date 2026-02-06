import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const settings = await (prisma as any).setting.findMany();
        const settingsObj = settings.reduce((acc: Record<string, string>, curr: any) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string>);

        return NextResponse.json(settingsObj);
    } catch (error) {
        console.error('Settings GET Error:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const body = await request.json();
        const { settings } = body;

        if (!settings || typeof settings !== 'object') {
            return new NextResponse('Invalid settings data', { status: 400 });
        }

        // Batch update settings
        const updates = Object.entries(settings).map(([key, value]) => {
            return (prisma as any).setting.upsert({
                where: { key },
                update: { value: String(value) },
                create: { key, value: String(value) },
            });
        });

        await Promise.all(updates);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Settings POST Error:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
