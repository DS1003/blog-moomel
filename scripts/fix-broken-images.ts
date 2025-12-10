import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Fixing broken image URLs in database...');

    // The bad fallback image that is causing 404s
    const badFallback = 'https://images.unsplash.com/photo-1546539782-d922a9332baa?q=80&w=800&auto=format&fit=crop';

    // A stable, high-quality spa/nature image as the new fallback
    const newFallback = 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800';

    // 1. Find images with the bad fallback URL
    const badFallbackImages = await prisma.image.findMany({
        where: {
            url: {
                contains: '1546539782-d922a9332baa',
            },
        },
    });

    console.log(`Found ${badFallbackImages.length} images with the broken fallback URL.`);

    for (const img of badFallbackImages) {
        await prisma.image.update({
            where: { id: img.id },
            data: { url: newFallback },
        });
    }

    // 2. Also check for any remaining 'zigunyzoryda' or other broken patterns if needed
    // (Optional: keep strictly to fixing the current issue to avoid unintended side effects)

    console.log('Database images fixed successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
