import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LikeButton from '@/app/_components/articles/LikeButton';
import Button from '@/app/_components/ui/Button';

// Mock data
const article = {
    id: "1",
    title: "La révolution de la cosmétique gamifiée en 2025",
    excerpt: "Découvrez comment la gamification transforme l'expérience beauté et engage les utilisateurs dans leur routine cosmétique quotidienne.",
    content: `
    <p>La cosmétique ne se limite plus à l'application de produits. En 2025, elle devient une expérience immersive, ludique et connectée. C'est ce qu'on appelle la <strong>cosmétique gamifiée</strong>.</p>
    
    <h3>Pourquoi la gamification ?</h3>
    <p>Les routines de soins peuvent parfois être perçues comme une corvée. En intégrant des mécaniques de jeu (points, niveaux, récompenses), les marques encouragent la régularité, essentielle pour obtenir des résultats visibles.</p>
    
    <h3>L'approche Moomel</h3>
    <p>Chez Moomel, nous avons poussé le concept plus loin. Chaque interaction sur notre plateforme vous rapporte des points d'expérience (XP). Que vous lisiez un article, laissiez un commentaire ou partagiez une astuce, vous progressez dans votre parcours d'expert beauté.</p>
    
    <ul>
      <li><strong>Débutante</strong> : Vous découvrez les bases.</li>
      <li><strong>Passionnée</strong> : Vous commencez à maîtriser les actifs.</li>
      <li><strong>Experte</strong> : La peau n'a plus de secrets pour vous.</li>
    </ul>
    
    <p>Rejoignez le mouvement et transformez votre routine beauté dès aujourd'hui !</p>
  `,
    author: {
        name: "Dr. Sarah Martin",
        image: null
    },
    createdAt: "2024-12-15T10:00:00Z",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&h=800&fit=crop",
    likes: 42,
    tags: ["Gamification", "Tendance 2025", "Innovation"]
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
    return (
        <article className="min-h-screen pt-24 pb-20">
            {/* Article Header */}
            <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 lg:p-12 max-w-4xl mx-auto">
                    <div className="flex items-center space-x-4 mb-4">
                        {article.tags.map(tag => (
                            <span key={tag} className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium border border-white/30">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex items-center justify-between text-white/90">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold">
                                {article.author.name[0]}
                            </div>
                            <div>
                                <p className="font-medium">{article.author.name}</p>
                                <p className="text-sm opacity-80">
                                    {new Date(article.createdAt).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        <LikeButton initialLikes={article.likes} />
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div
                    className="prose prose-lg prose-neutral mx-auto"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Engagement Section */}
                <div className="mt-16 pt-8 border-t border-neutral-200">
                    <h3 className="text-2xl font-bold text-neutral-800 mb-6">
                        Cet article vous a plu ?
                    </h3>
                    <div className="flex items-center justify-between bg-primary-50 rounded-2xl p-6 border border-primary-100">
                        <div>
                            <p className="text-neutral-700 mb-2">
                                Gagnez <span className="font-bold text-primary-600">+5 XP</span> en likant cet article !
                            </p>
                            <p className="text-sm text-neutral-500">
                                Connectez-vous pour sauvegarder votre progression.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <LikeButton initialLikes={article.likes} />
                            <Button variant="secondary" size="sm">
                                Partager
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Comments Section Placeholder */}
                <div className="mt-16">
                    <h3 className="text-2xl font-bold text-neutral-800 mb-8">Commentaires (3)</h3>
                    {/* TODO: Add CommentList component */}
                    <div className="bg-neutral-50 rounded-xl p-8 text-center border border-neutral-200">
                        <p className="text-neutral-600 mb-4">Connectez-vous pour participer à la discussion et gagner des XP.</p>
                        <Button href="/login">Se connecter</Button>
                    </div>
                </div>
            </div>
        </article>
    );
}
