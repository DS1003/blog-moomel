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
        <article className="min-h-screen pb-20">
            {/* Article Header - Minimalist with Gradient */}
            <div className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-neutral-900">
                {/* Abstract Background Shapes */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                        {article.tags.map(tag => (
                            <span key={tag.id} className="bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold border border-white/20">
                                {tag.name}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-sm">
                        {article.title}
                    </h1>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-white/90">
                        <div className="flex items-center space-x-4">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/10 border-2 border-white/30">
                                <Image
                                    src={article.author.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${article.author.name}`}
                                    alt={article.author.name || 'Auteur'}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="text-left">
                                <p className="font-medium text-lg leading-none mb-1">{article.author.name}</p>
                                <p className="text-sm text-white/70 font-light">
                                    {new Date(article.createdAt).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="hidden md:block w-px h-8 bg-white/20"></div>
                        <LikeButton initialLikes={article._count.likes} />
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="prose prose-lg md:prose-xl prose-neutral mx-auto prose-p:my-8 prose-p:leading-loose prose-headings:font-serif prose-headings:text-primary-900">

                    {/* Excerpt */}
                    {article.excerpt && (
                        <div className="mb-12 not-prose">
                            <p className="text-xl md:text-2xl font-serif text-neutral-600 leading-relaxed italic border-l-4 border-primary-300 pl-6 py-2">
                                {article.excerpt}
                            </p>
                        </div>
                    )}

                    {/* Featured Image - Clean & Simple */}
                    <div className="my-12 not-prose">
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-100 shadow-md">
                            <Image
                                src={article.images[0]?.url || "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&h=800&fit=crop"}
                                alt={article.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        {/* Optional caption if available, using title for now */}
                        <p className="text-center text-sm text-neutral-500 mt-3 italic">
                            {article.title}
                        </p>
                    </div>

                    {/* Main Content */}
                    <div
                        dangerouslySetInnerHTML={{ __html: article.content }}
                        className="
                            [&>p]:mb-8 
                            [&>p]:text-justify 
                            text-neutral-800
                        "
                    />
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
