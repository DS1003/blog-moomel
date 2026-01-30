import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "ADMIN") {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    // Explicit check for Cloudinary configuration
    const hasUrl = !!process.env.CLOUDINARY_URL;
    const hasKeys = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;

    if (!hasUrl && !hasKeys) {
        console.error("Cloudinary config missing during upload request");
        return NextResponse.json({
            error: "Configuration serveur manquante (Clés Cloudinary)",
            details: "Veuillez vérifier le fichier .env"
        }, { status: 500 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
        }

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary using a stream (better for large files) or direct upload
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "blog-moomel/articles" }, // Organized folder
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        if (!result || typeof result !== 'object' || !('secure_url' in result)) {
            throw new Error("Upload failed - No URL returned");
        }

        return NextResponse.json({ url: (result as any).secure_url }, { status: 200 });

    } catch (error: any) {
        console.error("Upload error details:", error);

        // Check for specific Cloudinary errors
        const errorMessage = error.message || "Erreur inconnue";
        if (errorMessage.includes("Must supply api_key")) {
            return NextResponse.json({ error: "Erreur de configuration API Cloudinary", details: "API Key manquante" }, { status: 500 });
        }

        return NextResponse.json({ error: "Erreur lors de l'upload", details: errorMessage }, { status: 500 });
    }
}
