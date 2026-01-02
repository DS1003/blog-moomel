import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/comments?articleId=...
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const articleId = searchParams.get('articleId');

  if (!articleId) {
    return NextResponse.json({ error: "Article ID manquant" }, { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: {
        articleId,
        parentId: null, // Fetch top-level comments first
        hidden: false, // Don't show hidden comments
      },
      include: {
        author: {
          select: { id: true, name: true, image: true, role: true }
        },
        replies: {
          include: {
            author: {
              select: { id: true, name: true, image: true, role: true }
            }
          },
          orderBy: { createdAt: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST /api/comments
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { content, articleId, parentId } = body;

    if (!content || !articleId) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        articleId,
        authorId: session.user.id,
        parentId: parentId || null,
      },
      include: {
        author: {
          select: { id: true, name: true, image: true, role: true }
        }
      }
    });

    // Award XP logic could go here
    // await addXP(session.user.id, 2); 

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
