import React from 'react';
import Image from 'next/image';
import Button from '@/app/_components/ui/Button';

export default function AboutPage() {
    return (
        <div className="bg-neutral-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=2000&auto=format&fit=crop"
                        alt="Moomel Story"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                </div>

                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-slide-up">
                        Notre Histoire
                    </h1>
                    <p className="text-xl md:text-2xl font-light opacity-90 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        L'âme de la cosmétique naturelle sénégalaise.
                    </p>
                </div>
            </section>

            {/* Scope / Vision Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl order-2 md:order-1">
                        <Image
                            src="/images/senegalese-woman-medium.png"
                            alt="Vision Moomel"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                        <div className="absolute bottom-8 left-8 text-white">
                            <span className="text-sm tracking-widest uppercase mb-2 block font-semibold">Authenticité</span>
                            <span className="text-3xl font-serif">Beauté & Valeurs</span>
                        </div>
                    </div>

                    <div className="order-1 md:order-2">
                        <span className="text-primary-600 font-medium tracking-widest text-sm uppercase mb-2 block">
                            À propos de nous
                        </span>
                        <h2 className="text-4xl font-serif text-neutral-900 mb-6">
                            Plus qu'une marketplace, <br className="hidden lg:block" />
                            <span className="text-primary-600 italic">un espace d'échange.</span>
                        </h2>

                        <div className="prose prose-lg text-neutral-600">
                            <p className="mb-6">
                                <strong>Moomel</strong> est un magnifique espace dédié aux produits cosmétiques naturels fabriqués au Sénégal.
                                Sa vocation est d'être une marketplace, un marché en ligne vivant regroupant vendeurs passionnés et acheteurs exigeants.
                            </p>
                            <p>
                                L’objectif principal de cette plateforme est de faciliter la rencontre.
                                Nous offrons aux vendeurs un canal de distribution performant et aux acheteurs une interface de qualité
                                pour découvrir un panorama de marques à travers une expérience authentique.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Target Audience / Values Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-50/50 -skew-x-12 transform translate-x-20"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl md:text-5xl font-serif text-neutral-900 mb-6">Pour la Femme Moderne</h2>
                        <div className="w-24 h-1 bg-primary-300 mx-auto mb-8"></div>
                        <p className="text-xl text-neutral-600 leading-relaxed">
                            Nous nous adressons à la femme en quête d'expériences authentiques.
                            Celle qui a des aspirations élevées, des valeurs fortes et qui se soucie de son environnement.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Cœur de Cible",
                                desc: "Femme 30-50 ans, à la recherche d'authenticité et de produits sains qui respectent ses valeurs et son corps.",
                                image: "/images/senegalese-woman-dark.png"
                            },
                            {
                                title: "Esprit Moderne",
                                desc: "Une approche simple et efficace de la beauté. Des solutions naturelles pour une vie active et dynamique.",
                                image: "/images/senegalese-woman-light.png"
                            },
                            {
                                title: "Bien-être Familial",
                                desc: "Toute personne qui s'intéresse à la santé et la beauté de son corps et celles de sa famille.",
                                image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=800&auto=format&fit=crop"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group relative h-[400px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-8 transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                                    <h3 className="text-2xl font-serif text-white mb-3">{item.title}</h3>
                                    <p className="text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-neutral-900 text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl font-serif mb-8">Rejoignez l'aventure Trésor Moomel</h2>
                    <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
                        Que vous soyez vendeuse passionnée ou acheteuse en quête de qualité, votre place est ici.
                    </p>
                    <div className="flex justify-center gap-6">
                        <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100">
                            Explorer la boutique
                        </Button>
                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-neutral-900">
                            Devenir vendeur
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
