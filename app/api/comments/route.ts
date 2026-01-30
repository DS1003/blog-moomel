import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/comments?articleId=...
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const articleId = searchParams.get('articleId');

  try {
    const whereClause: any = {};
    if (articleId) {
      whereClause.articleId = articleId;
      whereClause.hidden = false; // Public view hides hidden comments
      whereClause.parentId = null; // Public view shows threads
    }
    // If no articleId is provided, we assume it's the admin dashboard asking for everything (including hidden, reports, etc.)

    const comments = await prisma.comment.findMany({
      where: whereClause,
      include: {
        author: {
          select: { id: true, name: true, image: true, role: true, email: true }
        },
        article: {
          select: { title: true, slug: true }
        },
        replies: {
          include: {
            author: { select: { name: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 50 // Limit for safety
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
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
