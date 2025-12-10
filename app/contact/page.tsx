import React from 'react';
import Button from '@/app/_components/ui/Button';

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 animate-slide-up">
                    <span className="text-primary-600 font-medium tracking-widest text-sm uppercase mb-2 block">
                        Contactez-nous
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-neutral-900 mb-6">
                        Une question ? Un projet ?
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                        Notre équipe est à votre écoute pour vous accompagner dans votre expérience Beauté.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg animate-fade-in">
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-2">Prénom</label>
                                    <input type="text" id="firstName" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-neutral-50" placeholder="Votre prénom" />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-2">Nom</label>
                                    <input type="text" id="lastName" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-neutral-50" placeholder="Votre nom" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                                <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-neutral-50" placeholder="votre@email.com" />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">Sujet</label>
                                <select id="subject" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-neutral-50">
                                    <option value="">Sélectionnez un sujet</option>
                                    <option value="info">Renseignement produit</option>
                                    <option value="order">Suivi de commande</option>
                                    <option value="partnership">Devenir vendeur</option>
                                    <option value="other">Autre</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">Message</label>
                                <textarea id="message" rows={5} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-neutral-50 resize-none" placeholder="Comment pouvons-nous vous aider ?"></textarea>
                            </div>

                            <Button size="lg" className="w-full">
                                Envoyer le message
                            </Button>
                        </form>
                    </div>

                    {/* Info Card */}
                    <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="bg-primary-900 text-white rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                            <h3 className="text-2xl font-serif mb-6 relative z-10">Informations</h3>

                            <div className="space-y-6 relative z-10">
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-lg">Siège Social</p>
                                        <p className="text-primary-100 mt-1">Dakar, Sénégal<br />Quartier Mermoz</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-lg">Email</p>
                                        <p className="text-primary-100 mt-1">contact@moomel.sn</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-lg">Téléphone</p>
                                        <p className="text-primary-100 mt-1">+221 33 800 00 00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Quick Link */}
                        <div className="bg-neutral-100 rounded-3xl p-8 border border-neutral-200">
                            <h3 className="text-xl font-serif text-neutral-900 mb-4">Questions Fréquentes</h3>
                            <p className="text-neutral-600 mb-6">
                                Trouvez des réponses immédiates à vos questions sur la livraison, les retours et les produits.
                            </p>
                            <Button variant="secondary" className="w-full justify-center">
                                Voir la FAQ
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
