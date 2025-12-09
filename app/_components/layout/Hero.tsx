import React from 'react';
import Image from 'next/image';
import Button from '@/app/_components/ui/Button';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-white to-accent-50/30"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="animate-fade-in">
                    {/* Logo Hero */}
                    <div className="flex justify-center mb-8">
                        <div className="relative w-24 h-24 lg:w-32 lg:h-32">
                            <Image
                                src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1765297757/Logo_512_vwh0kd.png"
                                alt="Trésor Moomel Logo"
                                fill
                                className="object-contain animate-float"
                                priority
                            />
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        <span className="text-gradient">Trésor Moomel</span>
                        <br />
                        <span className="text-neutral-800">Blog</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Découvrez l'univers de la cosmétique gamifiée.
                        Conseils, innovations et tendances beauté pour 2025.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button size="lg" href="#articles">
                            Découvrir les articles
                        </Button>
                        <Button variant="secondary" size="lg" href="/about">
                            En savoir plus
                        </Button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-neutral-400 rounded-full mt-2 animate-pulse"></div>
                </div>
            </div>
        </section>
    );
}
