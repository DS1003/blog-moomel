import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import PDFParser from "pdf2json";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
        const rawLines = parsedText.split(/\r\n|\n/);
        const nonEmptyLines = rawLines.map(l => l.trim()).filter(l => l.length > 0);

        let title = file.name.replace('.pdf', '');
        let excerpt = "";
        let content = "";
        
        const geminiApiKey = process.env.GEMINI_API_KEY;

        if (geminiApiKey && nonEmptyLines.length > 0) {
            try {
                const genAI = new GoogleGenerativeAI(geminiApiKey);
                const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
                
                const prompt = `Tu es un assistant de formatage expert. Je vais te donner le texte brut extrait d'un fichier PDF.
Ton objectif est de renvoyer ce texte formaté en HTML propre, prêt à être inséré dans un éditeur WYSIWYG de blog (comme ReactQuill).

Règles strictes :
1. Corrige les mots coupés (ex: "re markable" -> "remarkable", "po llution" -> "pollution") dus à l'extraction PDF.
2. Structure le texte avec des balises sémantiques: <h2> pour le titre principal, <h3> pour les sous-titres, <p> pour les paragraphes.
3. Si tu vois des puces (●, -), transforme-les en listes HTML (<ul><li>).
4. Conserve TOUT le texte original, ne résume pas, n'invente rien.
5. Ne renvoie QUE le code HTML, sans bloc Markdown (\`\`\`html).
6. L'extrait HTML ne doit pas contenir de balises <html>, <head> ou <body>. Juste le contenu.

Voici le texte extrait du PDF :

${parsedText}`;

                const result = await model.generateContent(prompt);
                let htmlText = result.response.text().trim();
                
                if (htmlText.startsWith('```html')) htmlText = htmlText.substring(7);
                if (htmlText.startsWith('```')) htmlText = htmlText.substring(3);
                if (htmlText.endsWith('```')) htmlText = htmlText.substring(0, htmlText.length - 3);
                
                content = htmlText.trim();
                
                title = nonEmptyLines[0];
                if (nonEmptyLines.length > 2) {
                    const potentialExcerpt = nonEmptyLines.slice(1, 5).join(' ');
                    excerpt = potentialExcerpt.substring(0, 300) + (potentialExcerpt.length > 300 ? "..." : "");
                }
            } catch (aiError) {
                console.error("Erreur avec l'IA Gemini, utilisation de la méthode classique :", aiError);
            }
        }

        // Fallback to heuristic method if Gemini failed or is not configured
        if (!content && nonEmptyLines.length > 0) {
            // Simple heuristic: First line is likely title (or close to it)
            title = nonEmptyLines[0];

            // Try to get a decent excerpt
            if (nonEmptyLines.length > 2) {
                const potentialExcerpt = nonEmptyLines.slice(1, 5).join(' ');
                excerpt = potentialExcerpt.substring(0, 300) + (potentialExcerpt.length > 300 ? "..." : "");
            }
            
            // Build content HTML
            let cleaned = parsedText.replace(/----------------Page \(\d+\) Break----------------/g, '');
            let paragraphs = cleaned.split(/\r?\n\s*\r?\n/);
            
            let validParagraphs = paragraphs
                .map(p => {
                    let text = p.replace(/[-‐‑‒–—―\u00AD]\s*\r?\n\s*/g, '');
                    text = text.replace(/([a-zA-Z])\r?\n([a-z])/g, '$1$2');
                    text = text.replace(/\r?\n/g, ' ').trim();
                    return text.replace(/\s{2,}/g, ' ');
                })
                .filter(p => p.length > 0);
                
            if (validParagraphs.length <= 2) {
                validParagraphs = nonEmptyLines.slice(1);
            } else {
                if (validParagraphs[0] === title) {
                    validParagraphs = validParagraphs.slice(1);
                }
            }
            
            content = validParagraphs.map(p => {
                if (p.length < 80 && !p.endsWith('.') && !p.endsWith(',')) {
                    return `<h2>${p}</h2>`;
                }
                const bulletMatch = p.match(/^[●•*\-]\s+([A-Z][^.!?]{2,60}?)\s+([A-Z].+)$/);
                if (bulletMatch) {
                    return `<h3>${bulletMatch[1].trim()}</h3><p>${bulletMatch[2].trim()}</p>`;
                }
                if (p.startsWith('●') || p.startsWith('•') || p.startsWith('- ')) {
                    return `<ul><li>${p.substring(1).trim()}</li></ul>`;
                }
                return `<p>${p}</p>`;
            }).join('');
            
            content = content.replace(/<\/ul>\s*<ul>/g, '');
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
