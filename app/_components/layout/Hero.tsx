'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/app/_components/ui/Button';
import SplitText from '@/app/_components/ui/SplitText';
import ScrollReveal from '@/app/_components/ui/ScrollReveal';
import { useLanguage } from '@/app/_components/providers/LanguageProvider';

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-[90dvh] flex items-center overflow-hidden pt-20 lg:pt-24 bg-neutral-50 pb-10 px-4 sm:px-6">
            {/* Blurred Background Image */}
            <div className="absolute inset-0 z-0 opacity-70 select-none pointer-events-none">
                <Image
                    src="https://img.freepik.com/photos-premium/maquillage-naturel-beaute-soins-peau-femme-noire-visage-peau-cosmetologie-publicite-arriere-plan-studio-africain-heureux-frais-lueur-cosmetiques-soins-du-visage-traitement-marketing-gros-plan_590464-94117.jpg"
                    alt="Background"
                    fill
                    className="object-cover blur-[70px] scale-110"
                    priority
                    sizes="10vw" // Very small since it's blurred anyway
                />
                <div className="absolute inset-0 bg-white/60"></div>
            </div>

            <div className="container mx-auto max-w-7xl relative z-10 h-full">
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-center h-full">

                    {/* Left: Text Content */}
                    <div className="lg:col-span-7 flex flex-col justify-center text-left order-1 pt-8 lg:pt-0 pb-12 lg:pb-0">
                        {/* Elegant Tag - Reveal Animation */}
                        <ScrollReveal animation="fade-in" delay={0.1} duration={0.8}>
                            <div className="mb-6 lg:mb-8 flex justify-start">
                                <span className="inline-block py-1.5 px-4 rounded-full border border-primary-100 bg-primary-50/50 backdrop-blur-sm text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-primary-700 shadow-sm">
                                    {t.hero?.tag || 'EST. 2026'}
                                </span>
                            </div>
                        </ScrollReveal>

                        {/* Big Headline - Split Text Animation */}
                        <div className="text-[clamp(2.75rem,7vw,4.5rem)] xl:text-[6rem] font-serif font-medium text-neutral-900 leading-[1.2] mb-6 lg:mb-8 tracking-tight flex flex-col items-start w-full py-2">
                            <SplitText
                                text={t.hero?.title1 || "Naturellement"}
                                delay={200}
                                className="justify-start flex-wrap pt-2"
                            />
                            <div className="italic text-primary-600 drop-shadow-sm filter w-full flex justify-start py-1">
                                <SplitText
                                    text={t.hero?.title2 || "Authentique"}
                                    delay={400}
                                    className="justify-start flex-wrap"
                                />
                            </div>
                            <SplitText
                                text={t.hero?.title3 || "Éthique"}
                                delay={600}
                                className="justify-start flex-wrap pb-2"
                            />
                        </div>

                        {/* Description - Fade Up Reveal */}
                        <ScrollReveal animation="fade-up" delay={0.4} duration={0.8}>
                            <p className="text-base sm:text-lg md:text-xl text-neutral-600 mb-8 lg:mb-10 max-w-lg leading-relaxed font-light text-balance text-left">
                                {t.hero?.subtitle}
                            </p>
                        </ScrollReveal>

                        {/* Actions - Staggered Reveal */}
                        <ScrollReveal animation="fade-up" delay={0.6} duration={0.8}>
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-start items-center w-full">
                                <Button
                                    size="lg"
                                    href="/articles"
                                    className="w-full sm:w-auto bg-neutral-900 text-white rounded-full px-10 py-4 text-base tracking-wide hover:bg-neutral-800 transition-all font-medium hover:scale-105 active:scale-95 shadow-lg shadow-neutral-900/20"
                                >
                                    {t.hero?.cta_explore || "Découvrir"}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    href="/about"
                                    className="w-full sm:w-auto text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full px-8 py-4 transition-all text-base font-medium"
                                >
                                    {t.hero?.cta_vision || "Notre Mission"}
                                </Button>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Right: Visual - Scroll Reveal */}
                    <div className="lg:col-span-5 w-full order-2 flex justify-center lg:block mt-4 lg:mt-0">
                        <ScrollReveal animation="zoom-in" duration={1} delay={0.2}>
                            <div className="relative w-full max-w-[350px] sm:max-w-md lg:max-w-full aspect-[4/5] lg:aspect-[3/4] lg:h-[550px] xl:h-[700px] mx-auto">
                                {/* Single Hero Image - Arch Shape */}
                                <div className="relative w-full h-full rounded-t-[500px] rounded-b-[40px] lg:rounded-b-[200px] overflow-hidden shadow-2xl shadow-neutral-200/50 mx-auto transform transition-transform hover:scale-[1.02] duration-700">
                                    <Image
                                        src="https://img.freepik.com/photos-premium/maquillage-naturel-beaute-soins-peau-femme-noire-visage-peau-cosmetologie-publicite-arriere-plan-studio-africain-heureux-frais-lueur-cosmetiques-soins-du-visage-traitement-marketing-gros-plan_590464-94117.jpg"
                                        alt="Moomel Beauty"
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 768px) 90vw, 40vw"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent opacity-40"></div>

                                    {/* Mobile Floating Badge - Refined & Minimal */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 1.5 }} // Delay until after image reveals
                                        className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-[-1rem] bg-white/70 backdrop-blur-xl border border-white/50 py-3 px-6 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex items-center gap-4 min-w-[max-content] z-20 hover:scale-105 transition-transform duration-300"
                                    >
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm text-primary-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 leading-tight">Coup de cœur</span>
                                            <span className="text-sm font-serif text-neutral-900 leading-tight">Huile de Baobab</span>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Decorative glow */}
                                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-primary-100/40 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                            </div>
                        </ScrollReveal>
                    </div>

                </div>
            </div>
        </section>
    );
}
