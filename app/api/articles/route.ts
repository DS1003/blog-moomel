import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

export const dynamic = 'force-dynamic';

// GET /api/articles : liste des articles récents
export async function GET() {
  const articles = await prisma.article.findMany({
    include: {
      author: true,
      images: true,
      likes: true,
      comments: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(articles);
}

const articleSchema = z.object({
  title: z.string().min(3),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  published: z.boolean().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // Strict Admin Check
  if (!session || session.user?.role !== "ADMIN") {
    // For development, we might want to allow it if easy testing is needed, 
    // but the requirement says "Login Admin sécurisé".
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();
  const parse = articleSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json({ error: "Entrée invalide", details: parse.error.flatten() }, { status: 400 });
  }

  const data = parse.data;

  // Generate slug from title
  const slug = data.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  // Ensure slug is unique
  const existing = await prisma.article.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  try {
    const article = await prisma.article.create({
      data: {
        title: data.title,
        slug: finalSlug,
        excerpt: data.excerpt,
        content: data.content,
        author: { connect: { email: session.user?.email! } }, // Connect via email from session
        published: data.published || false,
        images: data.imageUrl ? {
          create: { url: data.imageUrl }
        } : undefined,
      },
    });
    return NextResponse.json(article, { status: 201 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur", details: e.message }, { status: 500 });
  }
}
