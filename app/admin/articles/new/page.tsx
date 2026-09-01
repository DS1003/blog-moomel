'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
    ChevronLeft,
    Save,
    Plus,
    UploadCloud,
    Zap,
    CheckCircle2,
    Info,
    Globe,
    FileEdit,
    AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface Category {
    id: string;
    name: string;
}

export default function NewArticlePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [parsingPdf, setParsingPdf] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    const pdfInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const [activeTab, setActiveTab] = useState<'fr' | 'en'>('fr');

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        titleEn: '',
        excerptEn: '',
        contentEn: '',
        imageUrl: '',
        published: false,
        categoryId: ''
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                if (res.ok) {
                    const data = await res.json();
                    setCategories(data);
                    if (data.length > 0) {
                        setFormData(prev => ({ ...prev, categoryId: data[0].id }));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, published: e.target.checked }));
    };

    // Fonction supprimée car remplacée par ReactQuill

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

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-6xl mx-auto space-y-8"
        >
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center gap-2 text-neutral-400 hover:text-neutral-900 transition-colors mb-4"
                    >
                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest">Retour aux articles</span>
                    </button>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-2">Nouvelle Création</h1>
                    <p className="text-neutral-500 font-medium">Capturez l'essence de la beauté Moomel dans cet article.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 rounded-2xl border border-neutral-100 bg-white text-neutral-600 hover:bg-neutral-50 font-bold transition-all text-sm shadow-sm active:scale-95"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        form="article-form"
                        disabled={loading || uploadingImage || parsingPdf}
                        className="flex items-center gap-2 bg-neutral-900 text-white px-8 py-3 rounded-2xl hover:bg-neutral-800 transition-all text-sm font-bold shadow-lg shadow-neutral-900/10 disabled:opacity-50 active:scale-95"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Publication...</span>
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                <span>Publier l'article</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            <form id="article-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Main Content Card */}
                <div className="lg:col-span-8 bg-white rounded-[3rem] shadow-sm border border-neutral-100 p-8 md:p-10 space-y-10">

                    {/* Language Tabs */}
                    <div className="flex gap-4 border-b border-neutral-100 pb-4">
                        <button
                            type="button"
                            onClick={() => setActiveTab('fr')}
                            className={`text-xs font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl transition-all ${activeTab === 'fr' ? 'bg-primary-50 text-primary-600' : 'text-neutral-400 hover:bg-neutral-50'}`}
                        >
                            Français
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('en')}
                            className={`text-xs font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl transition-all ${activeTab === 'en' ? 'bg-primary-50 text-primary-600' : 'text-neutral-400 hover:bg-neutral-50'}`}
                        >
                            English
                        </button>
                    </div>

                    {/* Header Input Area */}
                    <div className="space-y-8">
                        <div>
                            <label className="block text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] mb-4">Identité de l'article</label>
                            <input
                                type="text"
                                name={activeTab === 'fr' ? 'title' : 'titleEn'}
                                required={activeTab === 'fr'}
                                value={activeTab === 'fr' ? formData.title : formData.titleEn}
                                onChange={handleChange}
                                placeholder={activeTab === 'fr' ? "Donnez un titre puissant et évocateur..." : "Give a powerful and evocative title..."}
                                className="w-full px-0 py-4 bg-transparent border-b-2 border-neutral-50 focus:border-primary-500 transition-all outline-none font-serif text-3xl md:text-4xl text-neutral-900 placeholder:text-neutral-200"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Accroche Émotionnelle (Excerpt)</label>
                            <textarea
                                name={activeTab === 'fr' ? 'excerpt' : 'excerptEn'}
                                required={activeTab === 'fr'}
                                rows={2}
                                value={activeTab === 'fr' ? formData.excerpt : formData.excerptEn}
                                onChange={handleChange}
                                placeholder={activeTab === 'fr' ? "Quelques phrases pour séduire vos lectrices dès le premier coup d'œil..." : "A few sentences to seduce your readers at first glance..."}
                                className="w-full px-5 py-4 bg-neutral-50/50 border border-neutral-100 rounded-2xl focus:bg-white focus:border-primary-300 transition-all outline-none font-medium text-sm md:text-md text-neutral-700 leading-relaxed resize-none"
                            />
                            <div className="flex justify-end">
                                <span className={`text-[9px] font-black uppercase tracking-widest ${(activeTab === 'fr' ? formData.excerpt.length : formData.excerptEn.length) > 280 ? 'text-rose-500' : 'text-neutral-300'}`}>
                                    {activeTab === 'fr' ? formData.excerpt.length : formData.excerptEn.length} / 300
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-neutral-50"></div>

                    {/* Editor Content Area */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <label className="block text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Cœur de l'Article</label>

                            {/* Toolbar PDF uniquement (le reste est géré par Quill) */}
                            <div className="flex items-center gap-1 bg-neutral-50 rounded-xl p-1 border border-neutral-100">
                                <button
                                    type="button"
                                    onClick={() => pdfInputRef.current?.click()}
                                    disabled={parsingPdf}
                                    className="px-3 py-1 text-[9px] font-black uppercase tracking-widest text-primary-600 hover:bg-white hover:shadow-sm rounded-lg transition-all flex items-center gap-1"
                                >
                                    <Zap size={10} />
                                    <span>PDF</span>
                                </button>
                            </div>
                        </div>

                        <input ref={pdfInputRef} type="file" accept=".pdf" className="hidden" onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const fd = new FormData();
                            fd.append('file', file);
                            setParsingPdf(true);
                            try {
                                const res = await fetch('/api/parse-pdf', { method: 'POST', body: fd });
                                if (res.ok) {
                                    const data = await res.json();
                                    setFormData(prev => {
                                        if (activeTab === 'en') {
                                            return {
                                                ...prev,
                                                titleEn: data.title || prev.titleEn,
                                                excerptEn: data.excerpt || prev.excerptEn,
                                                contentEn: data.content || prev.contentEn
                                            };
                                        } else {
                                            return {
                                                ...prev,
                                                title: data.title || prev.title,
                                                excerpt: data.excerpt || prev.excerpt,
                                                content: data.content || prev.content
                                            };
                                        }
                                    });
                                }
                            } finally {
                                setParsingPdf(false);
                                if (e.target) e.target.value = '';
                            }
                        }} />

                        <div className="relative group">
                            <ReactQuill
                                key={`quill-${activeTab}`}
                                theme="snow"
                                value={activeTab === 'fr' ? formData.content : formData.contentEn}
                                onChange={(content) => setFormData(prev => ({ ...prev, [activeTab === 'fr' ? 'content' : 'contentEn']: content }))}
                                placeholder={activeTab === 'fr' ? "L'histoire commence ici..." : "The story begins here..."}
                                className="w-full bg-neutral-50/30 border-2 border-dashed border-neutral-100 rounded-3xl overflow-hidden focus-within:bg-white focus-within:border-primary-300 focus-within:border-solid transition-all [&_.ql-toolbar]:border-none [&_.ql-toolbar]:bg-neutral-50/50 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[400px] [&_.ql-editor]:font-serif [&_.ql-editor]:text-lg [&_.ql-editor]:leading-[1.8] [&_.ql-editor]:text-neutral-800"
                            />
                        </div>
                    </div>
                </div>

                {/* Settings & Sidebar */}
                <div className="lg:col-span-4 space-y-8">

                    {/* Category Selection */}
                    <div className="bg-white rounded-[3rem] shadow-sm border border-neutral-100 p-8 space-y-6">
                        <label className="block text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Catégorie</label>
                        <div className="relative">
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                className="w-full appearance-none bg-neutral-50 border border-neutral-100 rounded-2xl px-5 py-4 text-sm font-bold text-neutral-700 outline-none focus:border-primary-300 focus:bg-white transition-all"
                            >
                                <option value="" disabled>Sélectionner une catégorie</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                                <ChevronLeft size={14} className="-rotate-90" />
                            </div>
                        </div>
                    </div>

                    {/* Media Card */}
                    <div className="bg-white rounded-[3rem] shadow-sm border border-neutral-100 p-8 space-y-6">
                        <label className="block text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Visuel de Couverture</label>

                        <div
                            className="relative aspect-[4/3] rounded-[2rem] border-2 border-dashed border-neutral-100 bg-neutral-50/50 hover:bg-neutral-50 hover:border-primary-200 transition-all cursor-pointer group flex flex-col items-center justify-center overflow-hidden"
                            onClick={() => !uploadingImage && imageInputRef.current?.click()}
                        >
                            {formData.imageUrl ? (
                                <img src={formData.imageUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-inner flex items-center justify-center text-neutral-200 group-hover:text-primary-500 transition-colors mx-auto mb-4">
                                        <Plus size={24} />
                                    </div>
                                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Choisir un visuel</p>
                                </div>
                            )}

                            <AnimatePresence>
                                {uploadingImage && (
                                    <motion.div
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center"
                                    >
                                        <div className="w-10 h-10 border-4 border-primary-50 border-t-primary-500 rounded-full animate-spin mb-4"></div>
                                        <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest">Transfert en cours...</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const fd = new FormData();
                                fd.append('file', file);
                                setUploadingImage(true);
                                try {
                                    const res = await fetch('/api/upload', { method: 'POST', body: fd });
                                    if (res.ok) {
                                        const data = await res.json();
                                        setFormData(prev => ({ ...prev, imageUrl: data.url }));
                                    }
                                } finally {
                                    setUploadingImage(false);
                                    if (e.target) e.target.value = '';
                                }
                            }} />
                        </div>

                        <div className="space-y-2">
                            <input
                                type="url"
                                placeholder="URL externe..."
                                value={formData.imageUrl}
                                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                                className="w-full px-4 py-3 bg-neutral-50/50 border border-neutral-100 rounded-xl text-[10px] font-medium outline-none focus:bg-white focus:border-primary-200 transition-all"
                            />
                        </div>
                    </div>

                    {/* Publishing Card */}
                    <div className="bg-neutral-900 rounded-[3rem] p-8 text-white shadow-2xl shadow-neutral-900/40 space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-[40px]"></div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-serif font-bold flex items-center gap-2">
                                <Globe size={20} className="text-primary-400" />
                                Visibilité
                            </h3>
                            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${formData.published ? 'bg-primary-500 text-white' : 'bg-white/10 text-neutral-400'}`}>
                                        {formData.published ? <CheckCircle2 size={18} /> : <FileEdit size={18} />}
                                    </div>
                                    <span className="text-xs font-bold">{formData.published ? 'Public' : 'Brouillon'}</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={formData.published} onChange={handleCheckbox} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </motion.div>
    );
}
