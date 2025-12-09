import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/likes : liker un article
export async function POST(req: NextRequest) {
  const { articleId, userId } = await req.json();
  // TODO: Valider avec Zod et vérifier l'utilisateur
  const like = await prisma.like.create({
    data: { articleId, userId },
  });
  return NextResponse.json(like, { status: 201 });
}
