import { prisma } from "../lib/prisma";
import { hash } from "bcryptjs";

async function main() {
  // Création des badges
  const badges = await prisma.badge.createMany({
    data: [
      { name: "Nouveau", icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", description: "Bienvenue sur Moomel" },
      { name: "Commentateur", icon: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png", description: "A posté 5 commentaires" },
      { name: "Likeur", icon: "https://cdn-icons-png.flaticon.com/512/1828/1828961.png", description: "A liké 10 articles" },
      { name: "Expert Beauté", icon: "https://cdn-icons-png.flaticon.com/512/1828/1828925.png", description: "Niveau 10 atteint" },
      { name: "Influenceur", icon: "https://cdn-icons-png.flaticon.com/512/1828/1828959.png", description: "Article partagé 5 fois" },
    ],
    skipDuplicates: true,
  });

  // Création de l'admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@moomel.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@moomel.com",
      password: await hash("admin1234", 10),
      role: "ADMIN",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      xp: 1000,
      level: 10,
    },
  });

  // Création d'utilisateurs
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "alice@moomel.com" },
      update: {},
      create: {
        name: "Alice",
        email: "alice@moomel.com",
        password: await hash("alice1234", 10),
        role: "USER",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
        xp: 200,
        level: 2,
      },
    }),
    prisma.user.upsert({
      where: { email: "bob@moomel.com" },
      update: {},
      create: {
        name: "Bob",
        email: "bob@moomel.com",
        password: await hash("bob1234", 10),
        role: "USER",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
        xp: 500,
        level: 5,
      },
    }),
  ]);

  // Création des catégories
  const categories = await prisma.category.createMany({
    data: [
      { name: "Skincare", slug: "skincare", description: "Tout pour une belle peau" },
      { name: "Maquillage", slug: "maquillage", description: "Astuces et tutoriels makeup" },
      { name: "Cheveux", slug: "cheveux", description: "Soins capillaires et coiffures" },
      { name: "Bien-être", slug: "bien-etre", description: "Santé et relaxation" },
    ],
    skipDuplicates: true,
  });

  // Récupération des catégories pour les lier
  const skincareCat = await prisma.category.findUnique({ where: { slug: "skincare" } });
  const makeupCat = await prisma.category.findUnique({ where: { slug: "maquillage" } });

  // Création des tags
  const tags = await prisma.tag.createMany({
    data: [
      { name: "Routine", slug: "routine" },
      { name: "Été", slug: "ete" },
      { name: "Tendance 2025", slug: "tendance-2025" },
      { name: "Anti-âge", slug: "anti-age" },
      { name: "Hydratation", slug: "hydratation" },
    ],
    skipDuplicates: true,
  });

  // Récupération des tags
  const routineTag = await prisma.tag.findUnique({ where: { slug: "routine" } });
  const eteTag = await prisma.tag.findUnique({ where: { slug: "ete" } });
  const trendTag = await prisma.tag.findUnique({ where: { slug: "tendance-2025" } });

  // Création d'articles
  const articles = await Promise.all([
    prisma.article.upsert({
      where: { slug: "bienvenue-sur-moomel" },
      update: {},
      create: {
        title: "Bienvenue sur Moomel!",
        slug: "bienvenue-sur-moomel",
        excerpt: "Découvre le blog cosmétique gamifié.",
        content: "Ceci est le premier article du blog. Partage, commente et gagne des XP!",
        published: true,
        authorId: admin.id,
        categoryId: skincareCat?.id,
        tags: {
          connect: [{ id: routineTag?.id }],
        },
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2" },
            { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
          ],
        },
      },
    }),
    prisma.article.upsert({
      where: { slug: "routine-beaute-pour-l-ete" },
      update: {},
      create: {
        title: "Routine beauté pour l'été",
        slug: "routine-beaute-pour-l-ete",
        excerpt: "Nos conseils pour une peau éclatante tout l'été.",
        content: "Hydratez, protégez, rayonnez ! Découvrez nos astuces et produits favoris.",
        published: true,
        authorId: users[0].id,
        categoryId: skincareCat?.id,
        tags: {
          connect: [{ id: routineTag?.id }, { id: eteTag?.id }],
        },
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1464983953574-0892a716854b" },
          ],
        },
      },
    }),
    prisma.article.upsert({
      where: { slug: "top-5-des-rouges-a-levres-2025" },
      update: {},
      create: {
        title: "Top 5 des rouges à lèvres 2025",
        slug: "top-5-des-rouges-a-levres-2025",
        excerpt: "Les nouveautés à ne pas manquer cette année.",
        content: "Découvrez notre sélection testée et approuvée par la communauté.",
        published: true,
        authorId: users[1].id,
        categoryId: makeupCat?.id,
        tags: {
          connect: [{ id: trendTag?.id }],
        },
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1517841905240-472988babdf9" },
          ],
        },
      },
    }),
  ]);

  // Création de commentaires
  await prisma.comment.createMany({
    data: [
      { content: "Super article !", authorId: users[0].id, articleId: articles[0].id },
      { content: "Merci pour les conseils.", authorId: users[1].id, articleId: articles[0].id },
      { content: "J'adore cette routine !", authorId: admin.id, articleId: articles[1].id },
    ],
  });

  // Création de likes
  await prisma.like.createMany({
    data: [
      { userId: users[0].id, articleId: articles[0].id },
      { userId: users[1].id, articleId: articles[0].id },
      { userId: admin.id, articleId: articles[1].id },
    ],
  });

  // Ajout de badges aux utilisateurs
  const allBadges = await prisma.badge.findMany();
  await prisma.user.update({
    where: { id: users[0].id },
    data: { badges: { connect: [{ id: allBadges[0].id }, { id: allBadges[1].id }] } },
  });
  await prisma.user.update({
    where: { id: users[1].id },
    data: { badges: { connect: [{ id: allBadges[2].id }] } },
  });

  // Bookmarks
  await prisma.user.update({
    where: { id: users[0].id },
    data: { bookmarks: { connect: [{ id: articles[2].id }] } },
  });

  console.log("Toutes les données de base ont été seedées !");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
