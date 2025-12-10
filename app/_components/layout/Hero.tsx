'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/app/_components/ui/Button';
import { BlurText } from '@/app/_components/ui/BlurText';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-24 lg:pt-20 bg-[#F9F7F2]">
            {/* Organic Background Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.6, 0.4, 0.6]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary-100/40 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.4, 1],
                    rotate: [0, -60, 0],
                    opacity: [0.6, 0.3, 0.6],
                    x: [0, -50, 0],
                    y: [0, 50, 0]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent-100/30 rounded-full blur-3xl pointer-events-none"
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">

                    {/* Text Content (Left - 5 Cols) */}
                    <div className="lg:col-span-5 text-center lg:text-left animate-fade-in order-2 lg:order-1 pt-8 lg:pt-0">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-100 shadow-sm mb-6 lg:mb-8 animate-slide-up bg-opacity-80 backdrop-blur-sm">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                            </span>
                            <span className="text-xs font-semibold tracking-widest uppercase text-neutral-600">Le Blog Officiel</span>
                        </div>

                        <div className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-neutral-900 mb-6 lg:mb-8 leading-[1.05] tracking-tight">
                            <BlurText
                                text="Naturelle"
                                delay={100}
                                animateBy="letters"
                                className="mb-2 block origin-center"
                                direction="top"
                            />
                            <div className="italic text-primary-600 my-2">
                                <BlurText
                                    text="Authentique"
                                    delay={150}
                                    animateBy="letters"
                                    className="inline-block"
                                    direction="bottom"
                                />
                            </div>
                            <BlurText
                                text="Sénégalaise."
                                delay={100}
                                animateBy="letters"
                                className="block mt-2"
                                direction="top"
                            />
                        </div>

                        <p className="text-lg md:text-xl text-neutral-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
                            L'âme de la cosmétique naturelle.
                            Découvrez des rituels de beauté ancestraux, revisités pour la femme moderne en quête d'excellence.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                            <Button size="lg" href="articles" className="rounded-full px-8 py-4 text-lg shadow-xl shadow-primary-500/20 hover:scale-105 transition-transform duration-300">
                                Explorer le blog
                            </Button>
                            <Button variant="secondary" size="lg" href="/about" className="rounded-full px-8 py-4 text-lg border-neutral-200 hover:bg-white hover:text-primary-600 transition-colors">
                                Notre vision
                            </Button>
                        </div>

                        <div className="mt-12 flex items-center justify-center lg:justify-start gap-4 opacity-80">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-neutral-200 overflow-hidden relative">
                                        <Image
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Moomel${i}`}
                                            alt="User"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm">
                                <span className="block font-bold text-neutral-900">2,000+</span>
                                <span className="text-neutral-500">Lectrices passionnées</span>
                            </div>
                        </div>
                    </div>

                    {/* Image Composition (Right - 7 Cols) */}
                    <div className="lg:col-span-7 relative h-[500px] md:h-[600px] lg:h-[700px] w-full order-1 lg:order-2 animate-fade-in">
                        {/* Abstract background shape for images */}
                        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] text-white opacity-40 z-0" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.3,82.1,22.9,71.3,34.6C60.5,46.3,50.3,56.1,38.6,63.6C26.9,71.1,13.7,76.3,-0.6,77.3C-14.9,78.3,-28.7,75.1,-41.4,68.2C-54.1,61.3,-65.7,50.7,-73.9,37.9C-82.1,25.1,-86.9,10.1,-84.9,-3.9C-82.9,-17.9,-74.1,-30.9,-64.1,-42.2C-54.1,-53.5,-42.9,-63.1,-30.5,-71.4C-18.1,-79.7,-4.5,-86.7,6.8,-97.8L9.1,-79.2Z" transform="translate(100 100)" />
                        </svg>

                        {/* Main Image (Medium) */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-80 md:w-80 md:h-[28rem] max-w-[80vw] rounded-[10rem] border-[6px] border-white shadow-2xl z-20 overflow-hidden hover:scale-105 transition-transform duration-500">
                            <Image
                                src="/images/senegalese-woman-medium.png"
                                alt="Beauté Naturelle"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 256px, 320px"
                                priority
                            />
                        </div>

                        {/* Left Float (Dark) */}
                        <div className="absolute top-[10%] left-[0%] md:left-[10%] lg:left-[5%] w-32 h-44 md:w-56 md:h-72 rounded-[3rem] md:rounded-[4rem] border-[4px] md:border-[6px] border-white shadow-xl z-10 animate-float overflow-hidden" style={{ animationDelay: '0.5s' }}>
                            <Image
                                src="/images/senegalese-woman-dark.png"
                                alt="Teint Ébène"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 160px, 224px"
                            />
                        </div>

                        {/* Right Float (Light) */}
                        <div className="absolute bottom-[10%] right-[0%] md:right-[10%] lg:right-[5%] w-40 h-56 md:w-56 md:h-72 rounded-[4rem] border-[6px] border-white shadow-xl z-10 animate-float overflow-hidden" style={{ animationDelay: '1.2s' }}>
                            <Image
                                src="/images/senegalese-woman-light.png"
                                alt="Teint Clair"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 160px, 224px"
                            />
                        </div>

                        {/* Decorative sticker */}
                        <div className="absolute top-[20%] right-[15%] z-30 animate-spin-slow">
                            <div className="w-24 h-24 relative">
                                <svg viewBox="0 0 100 100" className="w-full h-full text-neutral-900 fill-current">
                                    <defs>
                                        <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                                    </defs>
                                    <text fontSize="11">
                                        <textPath xlinkHref="#circle">
                                            • MOOMEL BEAUTE • AUTHENTICITE
                                        </textPath>
                                    </text>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl font-serif">M</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
