import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "ADMIN") {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    try {
        const { text } = await req.json();

        if (!text || text.trim() === '') {
            return NextResponse.json({ error: "Aucun texte fourni" }, { status: 400 });
        }

        const geminiApiKey = process.env.GEMINI_API_KEY;

        if (!geminiApiKey) {
            return NextResponse.json({ error: "La clé API Gemini n'est pas configurée dans le fichier .env" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
        
        const prompt = `Tu es un assistant de formatage expert. Voici un brouillon ou un texte brut (possiblement issu d'un extracteur PDF ou copié/collé).
Ton objectif est de renvoyer ce texte formaté en HTML propre, prêt à être inséré dans un éditeur WYSIWYG de blog (comme ReactQuill).

Règles strictes :
1. Corrige tous les mots coupés au milieu par erreur (ex: "re markable" -> "remarkable", "po llution" -> "pollution", "b y" -> "by", "mois turize" -> "moisturize").
2. Structure le texte avec des balises sémantiques HTML: <h2> pour les titres principaux, <h3> pour les sous-titres, <p> pour les paragraphes normaux.
3. Si tu vois des listes ou puces (●, -), transforme-les en vraies listes HTML (<ul><li>).
4. Ne résume pas le texte, n'invente rien, conserve toutes les informations d'origine.
5. Rends la lecture agréable (ajoute des balises <strong> sur quelques mots-clés importants si pertinent, mais reste subtil).
6. Ne renvoie STRICTEMENT QUE le code HTML, sans bloc Markdown (\`\`\`html) autour, ni balises <html>, <head> ou <body>.

Voici le texte à formater :

${text}`;

        const result = await model.generateContent(prompt);
        let htmlText = result.response.text().trim();
        
        // Clean up markdown code blocks if the AI included them
        if (htmlText.startsWith('```html')) htmlText = htmlText.substring(7);
        if (htmlText.startsWith('```')) htmlText = htmlText.substring(3);
        if (htmlText.endsWith('```')) htmlText = htmlText.substring(0, htmlText.length - 3);
        
        return NextResponse.json({
            content: htmlText.trim()
        }, { status: 200 });

    } catch (error: any) {
        console.error("Erreur de formatage IA:", error);
        return NextResponse.json({ error: "Erreur lors du formatage avec l'IA", details: error.message }, { status: 500 });
    }
}
