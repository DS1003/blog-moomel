'use client';

import { useLanguage } from "@/app/_components/providers/LanguageProvider";
import ArticleList from "@/app/_components/articles/ArticleList";
import Hero from "@/app/_components/layout/Hero";
import Marquee from "@/app/_components/ui/Marquee";
import ScrollReveal from "@/app/_components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import ArticleCard from "@/app/_components/articles/ArticleCard";
import { dictionaries } from "@/app/_i18n/dictionaries";

// Define the Article type here or import it if shared
type Article = {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    author: { name: string | null };
    createdAt: Date;
    images: { url: string }[];
};

export default function HomePageView({ articles }: { articles: Article[] }) {
    const { t, locale } = useLanguage();

    return (
        <div className="bg-neutral-50 overflow-hidden">
            {/* Hero Section */}
            <Hero />

            {/* Trust / Brands Marquee - Infinite Scroll */}
            <div className="border-y border-neutral-100 bg-white py-8 md:py-12 overflow-hidden relative z-10">
                <Marquee baseVelocity={-1} className="py-2 md:py-4">
                    {['Dakart', 'Karité Pur', 'Essence Bio', 'Sunu Nature', 'Wolof Beauty', 'Nubi Art', 'Sahel Glow', 'Racines'].map((brand, i) => (
                        <span key={i} className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold mx-4 sm:mx-8 text-neutral-200 uppercase tracking-tighter opacity-70">
                            {brand} <span className="text-primary-200 mx-2 sm:mx-4">•</span>
                        </span>
                    ))}
                </Marquee>
            </div>

            {/* Our Pillars / Values - Upgraded Section */}
            <section className="py-16 md:py-24 bg-[#F9F7F2]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal animation="fade-up">
                        <div className="text-center mb-12 md:mb-16">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mb-4 md:mb-6">{t.home.pillars_title}</h2>
                            <p className="text-neutral-600 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
                                {t.home.pillars_subtitle}
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {t.home.pillars.map((pillar, idx) => (
                            <ScrollReveal key={idx} delay={idx * 0.1} animation="zoom-in" className="h-full">
                                <div className="bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-neutral-100 group h-full hover:-translate-y-3 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-50 rounded-full flex items-center justify-center text-3xl sm:text-4xl mb-6 md:mb-8 group-hover:scale-110 group-hover:rotate-12 transition-transform bg-gradient-to-br from-primary-50 to-white shadow-inner border border-primary-100/50 text-primary-600">
                                        {idx === 0 ? "🌿" : idx === 1 ? "💎" : idx === 2 ? "📖" : "🤝"}
                                    </div>
                                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-neutral-900 mb-3 md:mb-4">{pillar.title}</h3>
                                    <p className="text-neutral-500 text-sm leading-relaxed font-light">{pillar.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Discovery Section - Ingredients */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
                        <ScrollReveal animation="slide-right">
                            <div className="relative">
                                <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-24 h-24 md:w-40 md:h-40 bg-primary-100 rounded-full blur-3xl opacity-50"></div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mb-4 md:mb-6 leading-tight">
                                    {t.home.discovery_title}
                                </h2>
                                <p className="text-lg md:text-xl text-neutral-600 mb-8 md:mb-10 font-light leading-relaxed italic">
                                    "{t.home.discovery_subtitle}"
                                </p>

                                <div className="space-y-6 md:space-y-8">
                                    {t.home.ingredients.map((ing, i) => (
                                        <div key={i} className="flex gap-4 md:gap-6 group">
                                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-neutral-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300 shadow-sm border border-neutral-100">
                                                <span className="font-serif font-bold text-base md:text-lg">{i + 1}</span>
                                            </div>
                                            <div>
                                                <h4 className="text-lg md:text-xl font-medium text-neutral-900 mb-1">{ing.name}</h4>
                                                <p className="text-neutral-500 text-xs md:text-sm">{ing.benefit} • <span className="text-primary-600 font-medium">{ing.origin}</span></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="slide-left" delay={0.2}>
                            <div className="relative aspect-square rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl group mt-8 lg:mt-0">
                                <Image
                                    src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop"
                                    alt="Ingrédients Naturels"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                    sizes="(max-width: 1024px) 100vw, 600px"
                                />
                                <div className="absolute inset-0 bg-primary-900/10 group-hover:bg-transparent transition-colors"></div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Editorial / Featured Section - Magazine Layout */}
            <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <ScrollReveal animation="zoom-in" duration={0.8}>
                    <div className="bg-neutral-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden text-white relative shadow-2xl">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                            <Image
                                src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop"
                                alt="Texture"
                                fill
                                className="object-cover"
                                sizes="100vw"
                            />
                        </div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-neutral-900/40 to-transparent z-0"></div>

                        <div className="grid lg:grid-cols-2 relative z-10">
                            <div className="p-8 sm:p-12 md:p-16 lg:p-24 flex flex-col justify-center order-2 lg:order-1">
                                <ScrollReveal animation="slide-right" delay={0.2}>
                                    <span className="text-primary-400 font-medium tracking-widest text-xs sm:text-sm uppercase mb-3 sm:mb-4 block">
                                        {t.home.marketplace}
                                    </span>
                                </ScrollReveal>
                                <ScrollReveal animation="fade-up" delay={0.3}>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif mb-6 md:mb-8 leading-[1.1] md:leading-[0.95] tracking-tight">
                                        {t.home.auth_title} <br /> <span className="italic text-primary-300 font-light">{t.home.auth_subtitle}</span>
                                    </h2>
                                </ScrollReveal>
                                <ScrollReveal animation="fade-up" delay={0.4}>
                                    <p className="text-base sm:text-lg text-neutral-300 mb-8 md:mb-10 max-w-md font-light leading-relaxed">
                                        {t.home.auth_desc}
                                    </p>
                                </ScrollReveal>
                                <ScrollReveal animation="fade-up" delay={0.5}>
                                    <Link href="/about" className="group inline-flex items-center bg-white text-neutral-900 px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-primary-100 transition-colors w-fit text-sm sm:text-base">
                                        <span className="mr-2">{t.home.discover_story}</span>
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </Link>
                                </ScrollReveal>
                            </div>

                            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-auto min-h-[300px] order-1 lg:order-2">
                                <Image
                                    src="/images/senegalese-woman-medium.png"
                                    alt="Femme Sénégalaise Moomel"
                                    fill
                                    className="object-cover object-center lg:object-left hover:scale-105 transition-transform duration-1000"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Categories Bento Grid - Scroll Animations */}
            <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 md:mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mb-3 md:mb-4">{t.home.univers_title}</h2>
                        <p className="text-neutral-600 text-sm md:text-base">{t.home.univers_desc}</p>
                    </div>
                    <Link href="/categories" className="btn-secondary rounded-full px-6 py-2 text-sm whitespace-nowrap">
                        {t.home.explore_all}
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 h-auto md:h-[600px]">
                    {/* Large Item - Skincare */}
                    <div className="md:col-span-2 md:row-span-2 h-[350px] sm:h-[450px] md:h-full">
                        <Link href="/categories?cat=skincare" className="relative block h-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group cursor-pointer shadow-md">
                            <Image
                                src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=1200"
                                alt="Soins Visage & Corps"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 66vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 text-white max-w-md p-2">
                                <span className="bg-primary-500/90 backdrop-blur text-[10px] md:text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">{t.home.brand_tag}</span>
                                <h3 className="text-2xl sm:text-3xl md:text-5xl font-serif mb-2">{t.home.skincare}</h3>
                                <p className="text-neutral-300 text-xs md:text-sm lg:text-base opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 line-clamp-2 md:line-clamp-none">
                                    {t.home.skincare_desc}
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* Top Right - Hair */}
                    <div className="h-[200px] sm:h-[250px] md:h-auto">
                        <Link href="/categories?cat=hair" className="relative block h-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-md">
                            <Image
                                src="https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&q=80&w=1200"
                                alt="Cheveux"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white p-2">
                                <h3 className="text-xl md:text-2xl font-serif">{t.home.hair}</h3>
                            </div>
                        </Link>
                    </div>

                    {/* Bottom Right - Wellness */}
                    <div className="h-[200px] sm:h-[250px] md:h-auto">
                        <Link href="/categories?cat=wellness" className="relative block h-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group cursor-pointer shadow-md">
                            <Image
                                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600"
                                alt="Bien-être"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white p-2">
                                <h3 className="text-xl md:text-2xl font-serif">{t.home.wellness}</h3>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Latest Articles Grid Preview */}
            <section className="py-16 md:py-24 bg-white relative z-10 rounded-t-[2rem] md:rounded-t-[3rem] -mt-10 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal>
                        <div className="text-center mb-12 md:mb-16">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mb-3 md:mb-4">{t.home.journal_title}</h2>
                            <p className="text-neutral-500 text-sm md:text-base">{t.home.journal_desc}</p>
                        </div>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {articles.map((article, index) => (
                            <ScrollReveal key={article.id} delay={index * 0.1} animation="fade-up">
                                <ArticleCard
                                    id={article.id}
                                    slug={article.slug}
                                    title={article.title}
                                    excerpt={article.excerpt || ""}
                                    author={article.author.name || "Moomel"}
                                    date={new Date(article.createdAt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    images={article.images.map(img => img.url)}
                                />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Minimalist CTA */}
            <section className="py-20 md:py-24 px-4 text-center overflow-hidden bg-[#F5F2EA] relative">
                <ScrollReveal animation="zoom-in">
                    <div className="max-w-4xl mx-auto relative z-10">
                        <div className="inline-block p-1 rounded-full border border-primary-200 bg-white mb-6 md:mb-8">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary-100 flex items-center justify-center animate-bounce-slow">
                                <span className="text-2xl sm:text-3xl">✨</span>
                            </div>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif mb-6 md:mb-8 text-neutral-900 leading-tight">
                            {t.home.join_title} <br /> <span className="text-primary-600">Moomel</span>
                        </h2>
                        <p className="text-lg md:text-xl text-neutral-600 mb-8 md:mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                            {t.home.join_desc}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/auth/register" className="btn-primary hover:scale-105 transition-transform text-base sm:text-lg px-8 py-3 bg-neutral-900 text-white rounded-full">
                                {t.home.create_account}
                            </Link>
                            <Link href="/contact" className="btn-secondary rounded-full px-8 py-3 text-base sm:text-lg">
                                {t.home.contact_us}
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
}
