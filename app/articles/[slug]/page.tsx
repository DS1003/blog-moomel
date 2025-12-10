import { notFound } from 'next/navigation';
import Image from 'next/image';
import LikeButton from '@/app/_components/articles/LikeButton';
import Button from '@/app/_components/ui/Button';
import CommentSection from '@/app/_components/articles/CommentSection';
import { prisma } from '@/lib/prisma';

async function getArticle(slug: string) {
    const article = await prisma.article.findUnique({
        where: { slug },
        include: {
            author: true,
            images: true,
            tags: true,
            _count: {
                select: { likes: true }
            }
        }
    });
    return article;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) {
        notFound();
    }

    return (
        <article className="min-h-screen pt-24 pb-20">
            {/* Article Header */}
            <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
                <Image
                    src={article.images[0]?.url || "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&h=800&fit=crop"}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 lg:p-12 max-w-4xl mx-auto">
                    <div className="flex items-center space-x-4 mb-4">
                        {article.tags.map(tag => (
                            <span key={tag.id} className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium border border-white/30">
                                {tag.name}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex items-center justify-between text-white/90">
                        <div className="flex items-center space-x-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-neutral-200">
                                <Image
                                    src={article.author.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${article.author.name}`}
                                    alt={article.author.name || 'Auteur'}
                                    fill
                                    className="object-cover"
                                />
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

                        <LikeButton initialLikes={article._count.likes} />
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="prose prose-lg prose-neutral mx-auto">
                    <p className="lead">{article.excerpt}</p>
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>

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
                            <LikeButton initialLikes={article._count.likes} />
                            <Button variant="secondary" size="sm">
                                Partager
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <CommentSection articleId={article.id} />
            </div>
        </article>
    );
}
