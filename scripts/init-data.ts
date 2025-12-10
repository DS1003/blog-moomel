import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Initialisation des données...');

    // Création des catégories
    await prisma.category.createMany({
        data: [
            { name: "Skincare", slug: "skincare", description: "Tout pour une belle peau" },
            { name: "Maquillage", slug: "maquillage", description: "Astuces et tutoriels makeup" },
            { name: "Cheveux", slug: "cheveux", description: "Soins capillaires et coiffures" },
            { name: "Bien-être", slug: "bien-etre", description: "Santé et relaxation" },
        ],
        skipDuplicates: true,
    });
    console.log('Catégories créées.');

    // Création des tags
    await prisma.tag.createMany({
        data: [
            { name: "Routine", slug: "routine" },
            { name: "Été", slug: "ete" },
            { name: "Tendance 2025", slug: "tendance-2025" },
            { name: "Anti-âge", slug: "anti-age" },
            { name: "Hydratation", slug: "hydratation" },
        ],
        skipDuplicates: true,
    });
    console.log('Tags créés.');

    console.log('Terminé !');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
