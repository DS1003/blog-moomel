import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
    {
        slug: 'soins-visage',
        name: 'Soins Visage',
        description: 'Crèmes, sérums et masques naturels pour un teint éclatant.',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=800&auto=format&fit=crop',
        count: 12
    },
    {
        slug: 'corps-bain',
        name: 'Corps & Bain',
        description: 'Rituels de bain et hydratation profonde pour le corps.',
        image: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=800&auto=format&fit=crop',
        count: 8
    },
    {
        slug: 'cheveux',
        name: 'Cheveux',
        description: 'Solutions naturelles pour des cheveux forts et sains.',
        image: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=800&auto=format&fit=crop',
        count: 15
    },
    {
        slug: 'sante-bien-etre',
        name: 'Santé & Bien-être',
        description: 'Compléments et astuces pour une beauté qui vient de l\'intérieur.',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
        count: 6
    },
    {
        slug: 'maquillage',
        name: 'Maquillage',
        description: 'Mise en beauté naturelle et respectueuse de la peau.',
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=800&auto=format&fit=crop',
        count: 10
    },
    {
        slug: 'bebe-maman',
        name: 'Bébé & Maman',
        description: 'Douceur et sécurité pour les peaux les plus délicates.',
        image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop',
        count: 4
    }
];

export default function CategoriesPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 animate-slide-up">
                    <span className="text-primary-600 font-medium tracking-widest text-sm uppercase mb-2 block">
                        Collection
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-neutral-900 mb-6">
                        Nos Catégories
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                        Explorez nos univers dédiés à la beauté sénégalaise et naturelle.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, idx) => (
                        <Link
                            href={`/articles?category=${category.slug}`}
                            key={category.slug}
                            className="group relative h-[300px] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 block"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>

                            {/* Glassmorphic Label */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                <div className="bg-white/90 backdrop-blur-md px-8 py-6 rounded-2xl transform transition-all duration-300 group-hover:scale-105 group-hover:bg-white">
                                    <h3 className="text-2xl font-serif text-neutral-900 mb-2">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm text-neutral-600 line-clamp-2 max-w-[200px] mx-auto opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto transition-all duration-300 overflow-hidden">
                                        {category.description}
                                    </p>
                                    <span className="text-xs font-bold text-primary-600 uppercase tracking-wider mt-2 block">
                                        {category.count} Articles
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
