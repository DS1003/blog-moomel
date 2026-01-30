'use client';

import React from 'react';
import ScrollReveal from '@/app/_components/ui/ScrollReveal';
import { useLanguage } from '@/app/_components/providers/LanguageProvider';

export default function MentionsLegalesView() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-neutral-50 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto pt-16">
                <ScrollReveal animation="fade-up">
                    <header className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-neutral-900 mb-6 tracking-tight">
                            Mentions Légales
                        </h1>
                        <div className="w-24 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
                    </header>
                </ScrollReveal>

                <div className="space-y-12">
                    {/* Éditeur du site */}
                    <ScrollReveal animation="fade-up" delay={0.1}>
                        <section className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500">
                            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900 mb-8 flex items-center gap-4">
                                <span className="flex-none w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold">01</span>
                                Éditeur du site
                            </h2>
                            <div className="space-y-5 text-neutral-600 leading-relaxed pl-2 md:pl-14">
                                <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-4">
                                    <span className="font-semibold text-neutral-900">Nom du site :</span>
                                    <span>Moomel</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-4">
                                    <span className="font-semibold text-neutral-900">Responsable :</span>
                                    <span>Mame Penda Ndoye</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-4">
                                    <span className="font-semibold text-neutral-900">Statut :</span>
                                    <span>Entreprise individuelle enregistrée au registre du commerce de Dakar</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-4">
                                    <span className="font-semibold text-neutral-900">Email :</span>
                                    <a href="mailto:moomel.sn@gmail.com" className="text-primary-600 hover:text-primary-700 underline transition-colors">moomel.sn@gmail.com</a>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-4">
                                    <span className="font-semibold text-neutral-900">Site web :</span>
                                    <a href="https://moomel.sn/blog" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline transition-colors">moomel.sn/blog</a>
                                </div>
                            </div>
                        </section>
                    </ScrollReveal>

                    {/* Hébergement */}
                    <ScrollReveal animation="fade-up" delay={0.15}>
                        <section className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500">
                            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900 mb-8 flex items-center gap-4">
                                <span className="flex-none w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold">02</span>
                                Hébergement
                            </h2>
                            <div className="space-y-5 text-neutral-600 leading-relaxed pl-2 md:pl-14">
                                <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-4">
                                    <span className="font-semibold text-neutral-900">Hébergeur :</span>
                                    <span>Hostinger</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-4">
                                    <span className="font-semibold text-neutral-900">Localisation :</span>
                                    <span>France</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-4">
                                    <span className="font-semibold text-neutral-900">Site web :</span>
                                    <a href="https://hostinger.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline transition-colors">hostinger.com</a>
                                </div>
                            </div>
                        </section>
                    </ScrollReveal>

                    {/* Accès au site */}
                    <ScrollReveal animation="fade-up" delay={0.2}>
                        <section className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500">
                            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900 mb-8 flex items-center gap-4">
                                <span className="flex-none w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold">03</span>
                                Accès au site
                            </h2>
                            <div className="space-y-5 text-neutral-600 leading-relaxed pl-2 md:pl-14">
                                <p>
                                    Le site Moomel est accessible gratuitement à tout utilisateur disposant d’un accès à Internet.
                                </p>
                                <p className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 text-neutral-500 text-sm">
                                    Tous les frais supportés par l’utilisateur pour accéder au service (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge.
                                </p>
                            </div>
                        </section>
                    </ScrollReveal>

                    {/* Propriété intellectuelle */}
                    <ScrollReveal animation="fade-up" delay={0.25}>
                        <section className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500">
                            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900 mb-8 flex items-center gap-4">
                                <span className="flex-none w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold">04</span>
                                Propriété intellectuelle
                            </h2>
                            <div className="space-y-6 text-neutral-600 leading-relaxed pl-2 md:pl-14">
                                <p>
                                    L’ensemble des contenus présents sur le site Moomel (textes, images, photographies, illustrations, logos, vidéos, graphismes, etc.) est protégé par le droit d’auteur et le droit de la propriété intellectuelle.
                                </p>
                                <p>
                                    Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l’autorisation écrite préalable de l’éditeur.
                                </p>
                                <p className="text-accent-600 font-medium">
                                    Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient pourra être considérée comme constitutive d’une contrefaçon.
                                </p>
                            </div>
                        </section>
                    </ScrollReveal>

                    {/* Responsabilité */}
                    <ScrollReveal animation="fade-up" delay={0.3}>
                        <section className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500">
                            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900 mb-8 flex items-center gap-4">
                                <span className="flex-none w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold">05</span>
                                Responsabilité
                            </h2>
                            <div className="space-y-6 text-neutral-600 leading-relaxed pl-2 md:pl-14">
                                <p>
                                    L’éditeur du site s’efforce de fournir des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes ou des carences dans la mise à jour des informations.
                                </p>
                                <div className="relative p-6 bg-primary-50/50 rounded-2xl border-l-4 border-primary-300">
                                    <p className="italic font-light text-neutral-700">
                                        Les informations fournies sur Moomel sont données à titre informatif et ne sauraient remplacer des conseils professionnels, médicaux ou dermatologiques.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </ScrollReveal>

                    {/* Liens hypertextes */}
                    <ScrollReveal animation="fade-up" delay={0.35}>
                        <section className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500">
                            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900 mb-8 flex items-center gap-4">
                                <span className="flex-none w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold">06</span>
                                Liens hypertextes
                            </h2>
                            <div className="space-y-5 text-neutral-600 leading-relaxed pl-2 md:pl-14">
                                <p>
                                    Le site peut contenir des liens hypertextes vers d’autres sites.
                                </p>
                                <p>
                                    Moomel ne dispose d’aucun moyen de contrôle du contenu de ces sites et ne saurait être tenu responsable de leur contenu ou de leurs pratiques.
                                </p>
                            </div>
                        </section>
                    </ScrollReveal>

                    {/* Données personnelles */}
                    <ScrollReveal animation="fade-up" delay={0.4}>
                        <section className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500">
                            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900 mb-8 flex items-center gap-4">
                                <span className="flex-none w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold">07</span>
                                Données personnelles
                            </h2>
                            <div className="space-y-5 text-neutral-600 leading-relaxed pl-2 md:pl-14">
                                <p>
                                    La collecte et le traitement des données personnelles sont effectués conformément à la réglementation en vigueur.
                                </p>
                                <p>
                                    Pour plus d’informations, veuillez consulter la <a href="/privacy" className="text-primary-600 hover:text-primary-700 font-semibold underline underline-offset-4 decoration-primary-200 hover:decoration-primary-600 transition-all">Politique de confidentialité</a> du site.
                                </p>
                            </div>
                        </section>
                    </ScrollReveal>

                    {/* Cookies */}
                    <ScrollReveal animation="fade-up" delay={0.45}>
                        <section className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500">
                            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900 mb-8 flex items-center gap-4">
                                <span className="flex-none w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold">08</span>
                                Cookies
                            </h2>
                            <div className="space-y-5 text-neutral-600 leading-relaxed pl-2 md:pl-14">
                                <p>
                                    Le site peut utiliser des cookies afin d’améliorer l’expérience utilisateur et mesurer l’audience.
                                </p>
                                <p>
                                    L’utilisateur peut configurer son navigateur pour refuser les cookies.
                                </p>
                            </div>
                        </section>
                    </ScrollReveal>
                </div>

                <div className="mt-20 text-center text-neutral-400 text-sm pb-10 flex items-center justify-center gap-2">
                    <span className="w-8 h-px bg-neutral-200"></span>
                    <p>© {new Date().getFullYear()} Moomel. {t.footer.rights}</p>
                    <span className="w-8 h-px bg-neutral-200"></span>
                </div>
            </div>
        </div>
    );
}
