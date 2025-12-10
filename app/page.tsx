import { prisma } from "@/lib/prisma";
import ArticleList from "@/app/_components/articles/ArticleList";
import Hero from "@/app/_components/layout/Hero";
import Marquee from "@/app/_components/ui/Marquee";
import ScrollReveal from "@/app/_components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import ArticleCard from "@/app/_components/articles/ArticleCard";

export default async function HomePage() {
  // Artificial delay for splash screen effect (3 seconds)
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const articles = await prisma.article.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' },
    include: {
      author: true,
      images: true,
      _count: { select: { likes: true, comments: true } }
    },
  });

  return (
    <div className="bg-neutral-50 overflow-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Trust / Brands Marquee - Infinite Scroll */}
      <div className="border-y border-neutral-100 bg-white py-12 overflow-hidden relative z-10">
        <Marquee baseVelocity={-1} className="py-4">
          {['Dakart', 'Karité Pur', 'Essence Bio', 'Sunu Nature', 'Wolof Beauty', 'Nubi Art', 'Sahel Glow', 'Racines'].map((brand, i) => (
            <span key={i} className="text-3xl md:text-5xl font-serif font-bold mx-8 text-neutral-200 uppercase tracking-tighter opacity-70">
              {brand} <span className="text-primary-200 mx-4">•</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Features Section - Scroll Reveal */}
      <section className="py-24 bg-[#F9F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif text-neutral-900 mb-6">Pourquoi Moomel ?</h2>
              <p className="text-neutral-600 max-w-2xl mx-auto text-lg font-light">
                Une approche holistique qui valorise votre beauté naturelle et soutient l'artisanat local.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "100% Naturel", desc: "Ingrédients purs et non transformés, directement de la terre.", icon: "🌿" },
              { title: "Made in Sénégal", desc: "Valorisation du savoir-faire local et des circuits courts.", icon: "🇸🇳" },
              { title: "Communauté", desc: "Échangez avec des passionnées et partagez vos astuces.", icon: "💬" },
              { title: "Récompenses", desc: "Gagnez des points d'expérience (XP) à chaque action.", icon: "🏆" }
            ].map((feature, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} animation="zoom-in" className="h-full">
                <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 group h-full hover:-translate-y-2">
                  <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform bg-gradient-to-br from-primary-50 to-white shadow-inner">
                    {feature.icon}
                  </div>
                  <h3 className="font-serif text-xl font-medium text-neutral-900 mb-3">{feature.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial / Featured Section - Magazine Layout */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal animation="zoom-in" duration={0.8}>
          <div className="bg-neutral-900 rounded-[3rem] overflow-hidden text-white relative shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30 mix-blend-overlay">
              <Image
                src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop"
                alt="Texture"
                fill
                className="object-cover"
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 to-transparent z-0"></div>

            <div className="grid lg:grid-cols-2 relative z-10">
              <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center order-2 lg:order-1">
                <ScrollReveal animation="slide-right" delay={0.2}>
                  <span className="text-primary-400 font-medium tracking-widest text-sm uppercase mb-4 block">
                    Moomel Marketplace
                  </span>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={0.3}>
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif mb-8 leading-[0.95] tracking-tight">
                    L'Authenticité <br /> <span className="italic text-primary-300 font-light">Révélée.</span>
                  </h2>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={0.4}>
                  <p className="text-lg text-neutral-300 mb-10 max-w-md font-light leading-relaxed">
                    Moomel connecte les consommatrices exigeantes aux meilleurs artisans du Sénégal.
                    Découvrez une sélection rigoureuse de produits sains et efficaces.
                  </p>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={0.5}>
                  <Link href="/about" className="group inline-flex items-center bg-white text-neutral-900 px-8 py-3 rounded-full font-medium hover:bg-primary-100 transition-colors w-fit">
                    <span className="mr-2">Découvrir notre histoire</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </ScrollReveal>
              </div>

              <div className="relative h-[400px] md:h-[500px] lg:h-auto min-h-[400px] order-1 lg:order-2">
                <Image
                  src="/images/senegalese-woman-medium.png"
                  alt="Femme Sénégalaise Moomel"
                  fill
                  className="object-cover object-center lg:object-left hover:scale-105 transition-transform duration-1000"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Categories Bento Grid - Scroll Animations */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif text-neutral-900 mb-4">Nos Univers</h2>
            <p className="text-neutral-600">Plongez dans nos collections exclusives.</p>
          </div>
          <Link href="/categories" className="btn-secondary rounded-full px-6 py-2 text-sm whitespace-nowrap">
            Tout explorer
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
          {/* Large Item - Skincare */}
          <div className="md:col-span-2 md:row-span-2 h-[300px] md:h-full">
            <Link href="/categories?cat=skincare" className="relative block h-full rounded-[2rem] overflow-hidden group cursor-pointer shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=1200"
                alt="Soins Visage & Corps"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white max-w-md p-4">
                <span className="bg-primary-500/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">Populaire</span>
                <h3 className="text-3xl md:text-5xl font-serif mb-2">Soins Visage & Corps</h3>
                <p className="text-neutral-300 text-sm md:text-base opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  La quintessence du soin naturel sénégalais.
                </p>
              </div>
            </Link>
          </div>

          {/* Top Right - Hair */}
          <div className="h-[250px] md:h-auto">
            <Link href="/categories?cat=hair" className="relative block h-full rounded-[2rem] overflow-hidden group cursor-pointer shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1605265058749-78afeb7b57bd?auto=format&fit=crop&q=80&w=600"
                alt="Cheveux"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              <div className="absolute bottom-6 left-6 text-white p-2">
                <h3 className="text-2xl font-serif">Cheveux</h3>
              </div>
            </Link>
          </div>

          {/* Bottom Right - Wellness */}
          <div className="h-[250px] md:h-auto">
            <Link href="/categories?cat=wellness" className="relative block h-full rounded-[2rem] overflow-hidden group cursor-pointer shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600"
                alt="Bien-être"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              <div className="absolute bottom-6 left-6 text-white p-2">
                <h3 className="text-2xl font-serif">Bien-être</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Articles Grid Preview */}
      <section className="py-24 bg-white relative z-10 rounded-t-[3rem] -mt-10 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif text-neutral-900 mb-4">Journal de Beauté</h2>
              <p className="text-neutral-500">Les dernières tendances et conseils de nos expertes.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <ScrollReveal key={article.id} delay={index * 0.1} animation="fade-up">
                <ArticleCard
                  id={article.id}
                  slug={article.slug}
                  title={article.title}
                  excerpt={article.excerpt || ""}
                  author={article.author.name || "Moomel"}
                  date={new Date(article.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  images={article.images.map(img => img.url)}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Minimalist CTA */}
      <section className="py-24 px-4 text-center overflow-hidden bg-[#F5F2EA] relative">
        <ScrollReveal animation="zoom-in">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="inline-block p-1 rounded-full border border-primary-200 bg-white mb-8">
              <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center animate-bounce-slow">
                <span className="text-3xl">✨</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 text-neutral-900 leading-tight">Rejoignez le cercle <br /> <span className="text-primary-600">Trésor Moomel</span></h2>
            <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto font-light">
              Une communauté exclusive de femmes passionnées par la beauté authentique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register" className="btn-primary hover:scale-105 transition-transform">
                Créer mon compte
              </Link>
              <Link href="/contact" className="btn-secondary">
                Nous contacter
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
