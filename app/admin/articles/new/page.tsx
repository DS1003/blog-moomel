'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ScrollReveal from '@/app/_components/ui/ScrollReveal';

export default function NewArticlePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Upload states
    const [parsingPdf, setParsingPdf] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    // Refs for file inputs
    const pdfInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        imageUrl: '',
        published: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, published: e.target.checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push('/admin/articles');
                router.refresh();
            } else {
                const error = await res.json();
                alert(`Erreur: ${error.error || 'Impossible de créer l\'article'}`);
            }
        } catch (error) {
            console.error(error);
            alert("Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <ScrollReveal animation="fade-up">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-medium text-neutral-900">Nouvel Article</h1>
                        <p className="text-neutral-500 mt-1">Créez un contenu inspirant pour votre communauté.</p>
                    </div>
                    <div className="flex gap-3">
                        <button type="button" onClick={() => router.back()} className="px-4 py-2 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 font-medium transition-colors">
                            Annuler
                        </button>
                        <button
                            type="submit"
                            form="article-form"
                            disabled={loading || uploadingImage || parsingPdf}
                            className="btn-primary disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    <span>Création...</span>
                                </>
                            ) : (
                                <span>Publier</span>
                            )}
                        </button>
                    </div>
                </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.1}>
                <div className="bg-white rounded-[2rem] shadow-sm border border-neutral-100 p-8">
                    <form id="article-form" onSubmit={handleSubmit} className="space-y-8">

                        {/* Main Info */}
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-bold text-neutral-700 mb-2">Titre de l'article</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-50 transition-all outline-none font-serif text-lg"
                                    placeholder="Ex: Les secrets du beurre de karité..."
                                />
                            </div>

                            <div>
                                <label htmlFor="excerpt" className="block text-sm font-bold text-neutral-700 mb-2">Résumé (Excerpt)</label>
                                <textarea
                                    id="excerpt"
                                    name="excerpt"
                                    required
                                    rows={3}
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-50 transition-all outline-none"
                                    placeholder="Une brève description qui apparaîtra dans les cartes..."
                                />
                                <p className="text-xs text-neutral-400 mt-2 text-right">{formData.excerpt.length}/300 caractères</p>
                            </div>
                        </div>

                        <div className="h-px bg-neutral-100"></div>

                        {/* Content & PDF Import */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="content" className="block text-sm font-bold text-neutral-700">Contenu</label>
                                <div className="relative">
                                    <input
                                        ref={pdfInputRef}
                                        type="file"
                                        accept=".pdf"
                                        className="hidden"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;

                                            const formData = new FormData();
                                            formData.append('file', file);

                                            setParsingPdf(true);

                                            try {
                                                const res = await fetch('/api/parse-pdf', { method: 'POST', body: formData });
                                                if (res.ok) {
                                                    const data = await res.json();
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        title: data.title || prev.title,
                                                        excerpt: data.excerpt || prev.excerpt,
                                                        content: data.content || prev.content
                                                    }));
                                                } else {
                                                    const err = await res.json();
                                                    alert("Erreur: " + (err.error || "Lecture PDF échouée"));
                                                }
                                            } catch (err) {
                                                console.error(err);
                                                alert("Erreur inattendue");
                                            } finally {
                                                setParsingPdf(false);
                                                if (e.target) e.target.value = '';
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => pdfInputRef.current?.click()}
                                        disabled={parsingPdf}
                                        className="text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1.5 rounded-lg hover:bg-primary-100 transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-wait"
                                    >
                                        {parsingPdf ? (
                                            <>
                                                <span className="w-3 h-3 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></span>
                                                Lecture...
                                            </>
                                        ) : '📄 Importer depuis un PDF'}
                                    </button>
                                </div>
                            </div>
                            <div className="relative">
                                <textarea
                                    id="content"
                                    name="content"
                                    required
                                    rows={15}
                                    value={formData.content}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-50 transition-all outline-none font-serif leading-relaxed"
                                    placeholder="Écrivez votre article ici... (Support Markdown simple)"
                                />
                            </div>
                        </div>

                        <div className="h-px bg-neutral-100"></div>

                        {/* Media & Settings */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2">Image de couverture</label>

                                {/* Image Preview / Upload Area */}
                                <div
                                    className="relative aspect-video rounded-xl overflow-hidden border-2 border-dashed border-neutral-200 bg-neutral-50 hover:bg-neutral-100 transition-colors group cursor-pointer"
                                    onClick={() => !uploadingImage && imageInputRef.current?.click()}
                                >
                                    {formData.imageUrl ? (
                                        <img src={formData.imageUrl} alt="Cover" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400">
                                            <span className="text-2xl mb-2">🖼️</span>
                                            <span className="text-sm font-medium">Cliquez pour uploader une image</span>
                                        </div>
                                    )}

                                    {uploadingImage && (
                                        <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center text-primary-600">
                                            <div className="w-8 h-8 border-3 border-primary-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                                            <span className="text-xs font-bold">Upload en cours...</span>
                                        </div>
                                    )}

                                    <input
                                        ref={imageInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;

                                            const formData = new FormData();
                                            formData.append('file', file);

                                            setUploadingImage(true);
                                            try {
                                                const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                                if (res.ok) {
                                                    const data = await res.json();
                                                    setFormData(prev => ({ ...prev, imageUrl: data.url }));
                                                } else {
                                                    const err = await res.json();
                                                    alert("Erreur: " + (err.error || (err.details ? err.details : "Upload échoué")));
                                                }
                                            } catch (err) {
                                                console.error(err);
                                                alert("Erreur d'upload network");
                                            } finally {
                                                setUploadingImage(false);
                                                if (e.target) e.target.value = '';
                                            }
                                        }}
                                    />
                                </div>
                                {/* Fallback URL input */}
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    placeholder="Ou collez une URL directe..."
                                    className="mt-2 w-full px-3 py-2 text-sm border-b border-neutral-200 focus:border-primary-500 outline-none bg-transparent"
                                />
                            </div>

                            <div className="bg-neutral-50 rounded-xl p-6 flex flex-col gap-4">
                                <h3 className="text-sm font-bold text-neutral-900">Paramètres de publication</h3>

                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            name="published"
                                            checked={formData.published}
                                            onChange={handleCheckbox}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                    </div>
                                    <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900">Publier immédiatement</span>
                                </label>

                                <div className="text-xs text-neutral-400">
                                    <p>• L'article sera visible sur la page d'accueil si publié.</p>
                                    <p>• Les abonnés recevront une notification (bientôt).</p>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </ScrollReveal>
        </div>
    );
}
