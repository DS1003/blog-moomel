'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
    Image as ImageIcon,
    UploadCloud,
    Search,
    Filter,
    Grid,
    List,
    MoreVertical,
    Download,
    Trash2,
    Eye,
    Plus,
    X,
    FileText,
    Settings2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

function MediaLibraryPageContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('searchQuery') || '';

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState(initialQuery);

    // Mock Media Data
    const mediaItems = [
        { id: 1, name: 'shea-butter-hero.jpg', size: '2.4 MB', type: 'image/jpeg', dimensions: '2400x1200', url: 'https://images.unsplash.com/photo-1616671285419-869383808620?w=400&q=80' },
        { id: 2, name: 'baobab-oil-product.png', size: '1.2 MB', type: 'image/png', dimensions: '1200x1200', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80' },
        { id: 3, name: 'moringa-leaves.jpg', size: '3.1 MB', type: 'image/jpeg', dimensions: '3000x2000', url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80' },
        { id: 4, name: 'bissap-flower.jpg', size: '1.8 MB', type: 'image/jpeg', dimensions: '1920x1080', url: 'https://images.unsplash.com/photo-1589182397057-b82d519703f8?w=400&q=80' },
        { id: 5, name: 'dakar-atelier.jpg', size: '4.5 MB', type: 'image/jpeg', dimensions: '4000x3000', url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&q=80' },
        { id: 6, name: 'moomel-logo-v2.png', size: '0.4 MB', type: 'image/png', dimensions: '500x500', url: 'https://res.cloudinary.com/dgro5x4h8/image/upload/v1765297757/Logo_512_vwh0kd.png' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-10"
        >
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-2">Médiathèque</h1>
                    <p className="text-neutral-500 font-medium">Gérez vos visuels, logos et ressources graphiques.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white text-neutral-700 px-5 py-3 rounded-2xl border border-neutral-200 hover:bg-neutral-50 transition-all text-sm font-bold shadow-sm">
                        <Settings2 size={18} />
                        <span>Serveur</span>
                    </button>
                    <button className="flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-2xl hover:bg-neutral-800 transition-all text-sm font-bold shadow-lg shadow-neutral-900/10 active:scale-95">
                        <UploadCloud size={18} strokeWidth={3} />
                        <span>Importer</span>
                    </button>
                </div>
            </div>

            {/* Utility Bar */}
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-neutral-100 flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="relative w-full md:w-[450px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Chercher une image, une vidéo, un document..."
                        className="w-full pl-12 pr-6 py-3 rounded-2xl border border-neutral-100 bg-neutral-50 focus:bg-white focus:border-primary-300 transition-all outline-none text-sm font-medium"
                    />
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="flex bg-neutral-50 p-1.5 rounded-2xl border border-neutral-100">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-400 hover:bg-white/50'}`}
                        >
                            <Grid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-400 hover:bg-white/50'}`}
                        >
                            <List size={18} />
                        </button>
                    </div>
                    <div className="w-px h-10 bg-neutral-100 mx-2 hidden md:block"></div>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-50 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-all text-xs font-black uppercase tracking-widest whitespace-nowrap">
                        <Filter size={14} />
                        Filtres
                    </button>
                </div>
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">

                {/* Upload Placeholder */}
                <div className="aspect-square rounded-[2.5rem] border-4 border-dashed border-neutral-100 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-neutral-50 hover:border-primary-200 group transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-300 group-hover:bg-white group-hover:text-primary-500 transition-all shadow-inner">
                        <Plus size={24} />
                    </div>
                    <span className="text-[10px] font-black text-neutral-300 uppercase tracking-widest group-hover:text-primary-500">Ajouter</span>
                </div>

                {mediaItems
                    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.type.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((item, i) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            key={item.id}
                            className="aspect-square rounded-[2.5rem] bg-white border border-neutral-100 overflow-hidden relative group shadow-sm hover:shadow-xl hover:shadow-neutral-200/50 transition-all cursor-pointer"
                        >
                            <Image
                                src={item.url}
                                alt={item.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay Controls */}
                            <div className="absolute inset-0 bg-neutral-900/60 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm p-4 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <span className="px-2 py-1 bg-white/20 text-[8px] font-black text-white uppercase tracking-tighter backdrop-blur-md rounded border border-white/20">
                                        {item.type.split('/')[1]}
                                    </span>
                                    <button className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-red-500 transition-all">
                                        <Trash2 size={14} />
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-[10px] font-bold text-white truncate">{item.name}</p>
                                    <div className="flex gap-2">
                                        <button className="flex-1 py-2 bg-primary-500 text-white rounded-xl flex items-center justify-center hover:bg-primary-400 transition-all">
                                            <Eye size={14} />
                                        </button>
                                        <button className="flex-1 py-2 bg-white/20 text-white rounded-xl flex items-center justify-center hover:bg-white/40 transition-all">
                                            <Download size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
            </div>

            {/* Selection Info (Floating - Mockup) */}
            <div className="hidden md:flex fixed bottom-10 left-1/2 -translate-x-1/2 bg-neutral-900 text-white px-8 py-4 rounded-[2rem] shadow-2xl items-center gap-10 z-50">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/10 rounded-xl">
                        <ImageIcon size={20} className="text-primary-400" />
                    </div>
                    <div>
                        <p className="text-xs font-bold whitespace-nowrap">Système de Fichiers</p>
                        <p className="text-[10px] text-neutral-400 uppercase font-black tracking-widest">Capacité: 82% utilisée</p>
                    </div>
                </div>
                <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[82%] h-full bg-primary-500"></div>
                </div>
                <button className="p-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                    <MoreVertical size={18} />
                </button>
            </div>
        </motion.div>
    );
}

export default function MediaLibraryPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <MediaLibraryPageContent />
        </Suspense>
    );
}
