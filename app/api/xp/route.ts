import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/xp : ajouter de l'XP à un utilisateur
export async function POST(req: NextRequest) {
  const { userId, amount } = await req.json();
  // TODO: Valider avec Zod et vérifier l'utilisateur
  const user = await prisma.user.update({
    where: { id: userId },
    data: { xp: { increment: amount } },
  });
  return NextResponse.json(user);
}
