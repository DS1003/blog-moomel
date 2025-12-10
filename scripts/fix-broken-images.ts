import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Fixing image URLs...');

    // Update articles with the zigunyzoryda domain
    const brokenImages = await prisma.image.findMany({
        where: {
            url: {
                contains: 'zigunyzoryda',
            },
        },
    });

    console.log(`Found ${brokenImages.length} broken images.`);

    // Replace with a default Unsplash image
    const fallbackImage = 'https://images.unsplash.com/photo-1546539782-d922a9332baa?q=80&w=800&auto=format&fit=crop';

    for (const img of brokenImages) {
        await prisma.image.update({
            where: { id: img.id },
            data: {
                url: fallbackImage,
            },
        });
    }

    console.log('Images updated.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
