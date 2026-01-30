'use client';

import React from 'react';
import Image from 'next/image';
import Button from '@/app/_components/ui/Button';
import { useLanguage } from '@/app/_components/providers/LanguageProvider';
import ScrollReveal from '@/app/_components/ui/ScrollReveal';

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <div className="bg-neutral-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/senegalese-modern-traditional.png"
                        alt="Moomel Story"
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-black/50 mix-blend-multiply" />
                </div>

                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                    <ScrollReveal animation="fade-up">
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
                            {t.about.hero_title}
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto">
                            {t.about.hero_subtitle}
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Scope / Vision Section */}
            <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                    <ScrollReveal animation="slide-right" className="order-2 md:order-1">
                        <div className="relative aspect-square sm:aspect-[4/3] md:aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                            <Image
                                src="/images/senegalese-modern-traditional.png"
                                alt="Vision Moomel"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 600px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white">
                                <span className="text-xs md:text-sm tracking-widest uppercase mb-2 block font-semibold opacity-80">{t.about.vision_tag}</span>
                                <span className="text-2xl md:text-3xl font-serif">{t.about.vision_title}</span>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="slide-left" className="order-1 md:order-2">
                        <div className="relative w-16 h-16 md:w-20 md:h-20 mb-6 mx-auto md:mx-0">
                            <Image
                                src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1765297757/Logo_512_vwh0kd.png"
                                alt="Moomel Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-primary-600 font-medium tracking-widest text-[10px] md:text-sm uppercase mb-2 block text-center md:text-left">
                            {t.about.about_us}
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-neutral-900 mb-6 text-center md:text-left leading-tight">
                            {t.about.main_title} <br className="hidden lg:block" />
                            <span className="text-primary-600 italic">{t.about.main_subtitle}</span>
                        </h2>

                        <div className="prose prose-base md:prose-lg text-neutral-600 max-w-none text-center md:text-left">
                            <p className="mb-6 leading-relaxed">
                                {t.about.story_p1}
                            </p>
                            <p className="leading-relaxed">
                                {t.about.story_p2}
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Share / What I share Section */}
            <section className="py-16 md:py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-50/50 -skew-x-12 transform translate-x-20 hidden md:block"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <ScrollReveal animation="fade-up">
                        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                            <h2 className="text-3xl md:text-5xl font-serif text-neutral-900 mb-4 md:mb-6">{t.about.share_title}</h2>
                            <div className="w-16 md:w-24 h-1 bg-primary-300 mx-auto"></div>
                        </div>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                        {(t.about.share_items || []).map((item: string, idx: number) => (
                            <ScrollReveal key={idx} delay={idx * 0.1} animation="fade-up">
                                <div className="bg-neutral-50 p-8 rounded-[2rem] border border-neutral-100 hover:border-primary-200 transition-all duration-300 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary-500 font-bold mb-6 group-hover:scale-110 transition-transform">
                                        <span className="text-xl">✓</span>
                                    </div>
                                    <p className="text-neutral-700 leading-relaxed font-medium">
                                        {item}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Welcome / Philosophy Section */}
            <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
                <ScrollReveal animation="fade-up">
                    <div className="relative inline-block mb-8">
                        <span className="text-6xl md:text-8xl font-serif text-primary-100 absolute -top-10 -left-10 select-none">“</span>
                        <h2 className="text-3xl md:text-5xl font-serif text-neutral-900 relative z-10">{t.about.welcome_title}</h2>
                    </div>
                    <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed font-light italic max-w-3xl mx-auto">
                        {t.about.welcome_text}
                    </p>
                </ScrollReveal>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-24 bg-neutral-900 text-white text-center rounded-t-[2rem] md:rounded-t-[4rem] -mt-10 relative z-20">
                <div className="max-w-4xl mx-auto px-6">
                    <ScrollReveal animation="fade-up">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 md:mb-8 leading-tight">{t.about.cta_title}</h2>
                        <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                            {t.about.cta_desc}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                            <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-full w-full sm:w-auto">
                                {t.about.cta_explore}
                            </Button>
                            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-neutral-900 rounded-full w-full sm:w-auto">
                                {t.about.cta_seller}
                            </Button>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
