import { prisma } from "@/lib/prisma";
import HomePageView from "@/app/_components/pages/HomePageView";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Artificial delay for splash screen effect (3 seconds)
  await new Promise((resolve) => setTimeout(resolve, 3000));

  let articles = [];
  try {
    articles = await prisma.article.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
      include: {
        author: true,
        images: true,
        _count: { select: { likes: true, comments: true } }
      },
    });
  } catch (error) {
    console.error("Database connection failed, using mock data:", error);
    // Fallback mock data to allow UI development without DB
    articles = [
      {
        id: "mock-1",
        title: "Les Secrets du Beurre de Karité (Mode Hors-Ligne)",
        slug: "secrets-beurre-karite",
        content: "",
        excerpt: "Découvrez pourquoi cet or blanc est indispensable à votre routine beauté naturelle.",
        userId: "mock-user",
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        published: true,
        authorId: "mock-author",
        author: {
          id: "mock-author",
          name: "Moomel Team",
          email: "team@moomel.com",
          emailVerified: null,
          image: null,
          password: "",
          role: "ADMIN" as const,
          level: 1,
          xp: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        images: [{
          id: "img-1",
          url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop",
          publicId: "mock",
          articleId: "mock-1",
          createdAt: new Date()
        }],
        tags: [],
        categoryId: null,
        _count: { likes: 42, comments: 5, tags: 0 }
      },
      {
        id: "mock-2",
        title: "Rituel du Soir : L'Huile de Baobab",
        slug: "rituel-soir-baobab",
        content: "",
        excerpt: "Une routine simple pour revitaliser votre peau durant la nuit.",
        userId: "mock-user",
        createdAt: new Date('2023-12-25'),
        updatedAt: new Date('2023-12-25'),
        published: true,
        authorId: "mock-author",
        author: {
          id: "mock-author",
          name: "Sarah Diop",
          email: "sarah@moomel.com",
          emailVerified: null,
          image: null,
          password: "",
          role: "USER" as const,
          level: 2,
          xp: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        images: [{
          id: "img-2",
          url: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&h=600&fit=crop",
          publicId: "mock2",
          articleId: "mock-2",
          createdAt: new Date()
        }],
        tags: [],
        categoryId: null,
        _count: { likes: 28, comments: 3, tags: 0 }
      }
    ];
  }

  // Type assertion or data transformation if needed, but for now passing as is.
  // The client component expects strict types, prisma result matches enough.
  return <HomePageView articles={articles as any} />;
}
