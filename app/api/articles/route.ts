import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
    take: 10,
  });
  return NextResponse.json(articles);
}

// POST /api/articles : création d'un article (admin uniquement)
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const articleSchema = z.object({
  title: z.string().min(3),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  authorId: z.string().uuid(),
  images: z.array(z.string().url()).optional(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
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

  // Ensure slug is unique (simple check, in production use better logic)
  const existing = await prisma.article.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  const article = await prisma.article.create({
    data: {
      title: data.title,
      slug: finalSlug,
      excerpt: data.excerpt,
      content: data.content,
      authorId: data.authorId,
      published: true, // Auto publish for now
      images: {
        create: data.images?.map((url: string) => ({ url })) || [],
      },
    },
  });
  return NextResponse.json(article, { status: 201 });
}
