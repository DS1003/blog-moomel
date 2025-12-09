import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/comments : ajouter un commentaire
export async function POST(req: NextRequest) {
  const { content, articleId, authorId } = await req.json();
  // TODO: Valider avec Zod et vérifier l'utilisateur
  const comment = await prisma.comment.create({
    data: { content, articleId, authorId },
  });
  return NextResponse.json(comment, { status: 201 });
}
