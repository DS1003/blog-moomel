import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from '@/lib/prisma';
import { z } from "zod";

const commentSchema = z.object({
  content: z.string().min(1),
  articleId: z.string(),
  parentId: z.string().optional(),
});

// POST /api/comments : Ajouter un commentaire
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { content, articleId, parentId } = commentSchema.parse(body);

    const comment = await prisma.comment.create({
      data: {
        content,
        articleId,
        authorId: session.user.id,
        parentId: parentId || null,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          }
        }
      }
    });

    // Gamification: +10 XP pour un commentaire
    await prisma.user.update({
      where: { id: session.user.id },
      data: { xp: { increment: 10 } }
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de l'ajout du commentaire" }, { status: 400 });
  }
}

// GET /api/comments?articleId=... : Récupérer les commentaires d'un article
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const articleId = searchParams.get('articleId');

  if (!articleId) {
    return NextResponse.json({ error: "Article ID requis" }, { status: 400 });
  }

  const comments = await prisma.comment.findMany({
    where: {
      articleId,
      parentId: null, // Récupérer seulement les commentaires racines
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          role: true,
        }
      },
      replies: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
              role: true,
            }
          }
        },
        orderBy: { createdAt: 'asc' }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json(comments);
}
