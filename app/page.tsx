import React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ArticleList from "@/app/_components/articles/ArticleList";

import Hero from "@/app/_components/layout/Hero";

export default async function HomePage() {
  const articles = await prisma.article.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' },
    include: {
      author: true,
      images: true,
      _count: { select: { likes: true, comments: true } }
    },
  });

  const categories = await prisma.category.findMany({ take: 3 });

  return (
    <div className="bg-neutral-50 overflow-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Trust / Brands Marquee (Mockup) */}
      <div className="border-y border-neutral-100 bg-white py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          {['Dakart', 'Karité Pur', 'Essence Bio', 'Sunu Nature', 'Wolof Beauty'].map((brand, i) => (
            <span key={i} className="text-xl md:text-2xl font-serif font-bold mx-8 whitespace-nowrap">{brand}</span>
          ))}
        </div>
      </div>

      {/* Features Section - Modern Cards */}
      <section className="py-24 bg-[#F9F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-neutral-900 mb-6">Pourquoi Moomel ?</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-lg font-light">
              Une approche holistique qui valorise votre beauté naturelle et soutient l'artisanat local.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "100% Naturel", desc: "Ingrédients purs et non transformés." },
              { title: "Made in Sénégal", desc: "Valorisation du savoir-faire local." },
              { title: "Communauté", desc: "Échangez avec des passionnés." },
              { title: "Récompenses", desc: "Gagnez des points à chaque action." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 group">
                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform bg-gradient-to-br from-primary-50 to-white">
                  <span className="text-2xl">✦</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial / Featured Section - Magazine Layout */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-neutral-900 rounded-[3rem] overflow-hidden text-white relative">
          <div className="absolute inset-0 opacity-40">
            <Image
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2000&auto=format&fit=crop"
              alt="Background Pattern"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid lg:grid-cols-2 relative z-10">
            <div className="p-12 md:p-24 flex flex-col justify-center">
              <span className="text-primary-400 font-medium tracking-widest text-sm uppercase mb-4 block">
                Moomel Marketplace
              </span>
              <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
                L'Authenticité <br /> <span className="italic text-primary-300">Révélée</span>
              </h2>
              <p className="text-lg text-neutral-300 mb-10 max-w-md font-light leading-relaxed">
                Moomel connecte les consommatrices exigeantes aux meilleurs artisans du Sénégal.
                Découvrez une sélection rigoureuse de produits sains et efficaces.
              </p>
              <Link href="/about" className="group inline-flex items-center text-white border-b border-primary-500 pb-1 w-fit hover:text-primary-400 transition-colors">
                <span className="mr-3 text-lg">Découvrir notre histoire</span>
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>
            <div className="relative h-[500px] lg:h-auto border-t lg:border-t-0 lg:border-l border-white/10">
              <Image
                src="/images/senegalese-woman-medium.png"
                alt="Femme Sénégalaise Moomel"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bento Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-serif text-neutral-900 mb-4">Nos Univers</h2>
            <p className="text-neutral-600">Plongez dans nos collections exclusives.</p>
          </div>
          <Link href="/categories" className="hidden md:block btn-secondary rounded-full px-6 py-2 text-sm">
            Tout explorer
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
          {/* Large Item */}
          <Link href="/categories?cat=skincare" className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=1200"
              alt="Skincare"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <span className="bg-primary-500 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">Populaire</span>
              <h3 className="text-3xl font-serif">Soins Visage & Corps</h3>
              <p className="text-neutral-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">La quintessence du soin naturel.</p>
            </div>
          </Link>

          {/* Top Right */}
          <Link href="/categories?cat=hair" className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-md min-h-[250px] md:min-h-0">
            <Image
              src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&q=80&w=600"
              alt="Cheveux"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-serif">Cheveux</h3>
            </div>
          </Link>

          {/* Bottom Right */}
          <Link href="/categories?cat=wellness" className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-md min-h-[250px] md:min-h-0">
            <Image
              src="https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=600"
              alt="Bien-être"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-serif">Bien-être</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* Latest Articles Grid Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-neutral-900 mb-4">Journal de Beauté</h2>
            <p className="text-neutral-500">Les dernières tendances et conseils de nos expertes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article key={article.id} className="group cursor-pointer">
                <div className="relative aspect-[3/2] rounded-3xl overflow-hidden mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                  {article.images[0] ? (
                    <Image src={article.images[0].url} alt={article.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center text-neutral-400">Sans image</div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-neutral-900 shadow-sm">
                    Article
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-xs text-neutral-500 font-medium uppercase tracking-wider space-x-2">
                    <span>{new Date(article.createdAt).toLocaleDateString('fr-FR')}</span>
                    <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                    <span className="text-primary-600">Astuces</span>
                  </div>
                  <h3 className="font-serif text-2xl text-neutral-900 leading-tight group-hover:text-primary-700 transition-colors">
                    <Link href={`/articles/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-neutral-600 line-clamp-2 font-light leading-relaxed">
                    {article.excerpt}
                  </p>
                  <Link href={`/articles/${article.slug}`} className="inline-flex items-center text-primary-600 font-medium mt-2 group/link">
                    Lire l'article <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Minimalist CTA */}
      <section className="py-24 px-4 text-center overflow-hidden bg-[#F5F2EA]">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block p-1 rounded-full border border-primary-200 bg-white mb-8">
            <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-3xl">✨</span>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif mb-8 text-neutral-900">Rejoignez le cercle Moomel</h2>
          <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto font-light">
            Une communauté exclusive de femmes passionnées par la beauté authentique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="btn-primary">
              Créer mon compte
            </Link>
            <Link href="/contact" className="btn-secondary">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

