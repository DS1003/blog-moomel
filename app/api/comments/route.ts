import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user?.role !== "ADMIN" && session.user?.role !== "MODERATOR")) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: {
      author: {
        select: { name: true, image: true, email: true }
      },
      article: {
        select: { title: true, slug: true }
      },
      reports: true
    }
  });

  return NextResponse.json(comments);
}
