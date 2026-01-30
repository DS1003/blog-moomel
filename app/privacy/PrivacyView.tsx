'use client';

import React from 'react';
import ScrollReveal from '@/app/_components/ui/ScrollReveal';
import { useLanguage } from '@/app/_components/providers/LanguageProvider';

export default function PrivacyView() {
    const { t } = useLanguage();

    const sections = [
        {
            title: "Reconnaissance et acceptation des conditions",
            content: (
                <div className="space-y-4">
                    <p>En accédant au blog Moomel, vous reconnaissez et comprenez pleinement la déclaration de confidentialité et consentez librement aux pratiques de collecte et d'utilisation des informations décrites dans la présente déclaration de confidentialité du site web.</p>
                    <p>Lorsque vous interagissez avec nous par le biais du Service, nous pouvons collecter des Données personnelles et d'autres informations vous concernant. En nous fournissant volontairement des données personnelles, vous consentez à ce que nous les utilisions conformément à la présente politique de confidentialité.</p>
                </div>
            )
        },
        {
            title: "Données personnelles collectées",
            content: (
                <div className="space-y-4">
                    <p>Lors de votre navigation sur le blog, certaines données peuvent être collectées :</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-4">
                        {[
                            "Données relatives à votre identité : civilité, nom, prénom, adresse, date de naissance...",
                            "Données de contact : adresse, numéro de téléphone, adresse e-mail...",
                            "Données financières : informations liées aux moyens de paiement...",
                            "Données techniques : données de connexions, adresse IP, login et mot de passe…",
                            "Données de navigation (pages consultées, durée de visite, type de navigateur)",
                            "Données commerciales : numéro de client, historique d’achats, avis sur nos produits...",
                            "Données de bien-être, données relatives à l'état de votre peau",
                            "Données de géolocalisation",
                            "Toute information transmise volontairement via un formulaire ou commentaire"
                        ].map((item, i) => (
                            <li key={i} className="text-sm flex items-start gap-2 italic">
                                <span className="text-primary-400">•</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        },
        {
            title: "Utilisation des données",
            content: (
                <div className="space-y-4">
                    <p>Les données personnelles collectées peuvent être utilisées pour :</p>
                    <ul className="space-y-2 pl-4">
                        {[
                            "Répondre aux messages et demandes de contact",
                            "Gérer les commentaires publiés sur le blog",
                            "Améliorer le contenu et l’expérience utilisateur",
                            "Envoyer une newsletter ou des informations (si vous y avez consenti)",
                            "Enregistrer et exécuter vos commandes",
                            "Vous fournir les services auxquels vous souscrivez",
                            "Traiter vos demandes et vos réclamations",
                            "Analyser les statistiques de fréquentation du site"
                        ].map((item, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                                <span className="text-primary-500 font-bold">→</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        },
        {
            title: "Cookies",
            content: (
                <p>Un cookie est une information que l'ordinateur qui héberge notre Service transmet à votre navigateur lorsque vous accédez au Service. Nos cookies contribuent à fournir des fonctionnalités supplémentaires au Service et nous aident à analyser plus précisément l'utilisation du Service. Vous pouvez à tout moment désactiver les cookies via les paramètres de votre navigateur.</p>
            )
        },
        {
            title: "Partage des données",
            content: (
                <p>Les données personnelles ne sont ni vendues, ni échangées, ni cédées à des tiers. Cependant, certains services tiers (hébergement, outils statistiques comme Google Analytics, plateforme d’envoi d’e-mails) peuvent avoir accès à certaines données uniquement dans le cadre de leur mission.</p>
            )
        },
        {
            title: "Durée de conservation des données",
            content: (
                <div className="space-y-4">
                    <p>Les données personnelles sont conservées uniquement le temps nécessaire à la finalité pour laquelle elles ont été collectées :</p>
                    <ul className="space-y-2 text-sm">
                        <li><strong>Données de contact :</strong> jusqu’à traitement de la demande</li>
                        <li><strong>Commentaires :</strong> aussi longtemps qu’ils sont visibles sur le blog</li>
                        <li><strong>Données statistiques :</strong> selon la durée définie par les outils utilisés</li>
                    </ul>
                </div>
            )
        },
        {
            title: "Sécurité des données",
            content: (
                <p>Moomel prend des mesures raisonnables pour protéger les données personnelles que nous collectons et conservons. Le responsable du site met en œuvre des mesures de sécurité techniques et organisationnelles afin de protéger vos données personnelles contre toute perte, accès non autorisé ou divulgation.</p>
            )
        },
        {
            title: "Droits des utilisateurs",
            content: (
                <div className="space-y-4">
                    <p>Conformément à la réglementation en vigueur, vous disposez des droits suivants :</p>
                    <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-widest">
                        {["Accès", "Rectification", "Effacement", "Limitation", "Opposition", "Portabilité"].map(d => (
                            <span key={d} className="bg-neutral-100 px-3 py-1 rounded-full">{d}</span>
                        ))}
                    </div>
                    <p className="pt-4 border-t border-neutral-100">Pour exercer ces droits, vous pouvez contacter : <a href="mailto:moomel.sn@gmail.com" className="text-primary-600 font-bold">moomel.sn@gmail.com</a></p>
                </div>
            )
        },
        {
            title: "Liens externes",
            content: (
                <p>Le blog peut contenir des liens vers des sites externes. Moomel n’est pas responsable de leur contenu ni de leur politique de confidentialité. Les services connexes ont leurs propres déclarations de confidentialité consultables sur leurs sites respectifs.</p>
            )
        },
        {
            title: "Modification de la politique de confidentialité",
            content: (
                <p>Cette politique de confidentialité peut être modifiée à tout moment afin de rester conforme à la législation en vigueur. Les utilisateurs sont invités à la consulter régulièrement.</p>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-neutral-50 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto pt-16">
                <ScrollReveal animation="fade-up">
                    <header className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-neutral-900 mb-6 tracking-tight">
                            Politique de Confidentialité
                        </h1>
                        <div className="w-24 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
                    </header>
                </ScrollReveal>

                <div className="mb-10 text-center">
                    <p className="text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                        La présente politique de confidentialité a pour objectif d’informer les utilisateurs du blog <span className="font-bold text-neutral-900">Moomel.sn</span> sur la manière dont leurs données personnelles sont collectées, utilisées et protégées.
                    </p>
                </div>

                <div className="space-y-8 md:space-y-12">
                    {sections.map((section, index) => (
                        <ScrollReveal key={index} animation="fade-up" delay={index * 0.05}>
                            <section className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-white/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500">
                                <h2 className="text-xl md:text-2xl font-serif font-bold text-neutral-900 mb-6 flex items-center gap-4">
                                    <span className="flex-none w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs md:text-sm font-black">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </span>
                                    {section.title}
                                </h2>
                                <div className="text-neutral-600 leading-relaxed md:pl-14 text-base">
                                    {section.content}
                                </div>
                            </section>
                        </ScrollReveal>
                    ))}
                </div>

                <div className="mt-20 text-center text-neutral-400 text-xs pb-10 flex items-center justify-center gap-4">
                    <span className="w-12 h-px bg-neutral-200"></span>
                    <p>© {new Date().getFullYear()} MOOMEL. SN — TOUS DROITS RÉSERVÉS.</p>
                    <span className="w-12 h-px bg-neutral-200"></span>
                </div>
            </div>
        </div>
    );
}
