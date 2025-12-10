import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import PDFParser from "pdf2json";

// Force dynamic to ensures this runs on the server properly
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "ADMIN") {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
        }

        if (file.type !== 'application/pdf') {
            return NextResponse.json({ error: "Le fichier doit être un PDF" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Using pdf2json which is more stable in Node environments
        const pdfParser = new PDFParser(null, 1); // 1 = text content only

        const parsedText = await new Promise<string>((resolve, reject) => {
            pdfParser.on("pdfParser_dataError", (errData: any) => reject(errData.parserError));
            pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
                // Extract raw text
                const rawText = pdfParser.getRawTextContent();
                resolve(rawText);
            });

            // Parse buffer
            pdfParser.parseBuffer(buffer);
        });

        // Extraction logic
        // pdf2json output often keeps layout, so we might need to clean it up
        const lines = parsedText.split(/\r\n|\n/).filter((line: string) => line.trim().length > 0);

        let title = file.name.replace('.pdf', '');
        let excerpt = "";
        let content = parsedText;

        if (lines.length > 0) {
            // Simple heuristic: First line is likely title (or close to it)
            title = lines[0].trim();

            // Try to get a decent excerpt
            if (lines.length > 2) {
                const potentialExcerpt = lines.slice(1, 5).join(' ');
                excerpt = potentialExcerpt.substring(0, 300) + (potentialExcerpt.length > 300 ? "..." : "");
            }
            content = lines.slice(1).join('\n\n');
        }

        return NextResponse.json({
            title,
            excerpt,
            content
        }, { status: 200 });

    } catch (error: any) {
        console.error("PDF Parse error:", error);
        return NextResponse.json({ error: "Erreur lors de la lecture du PDF", details: error.message }, { status: 500 });
    }
}
