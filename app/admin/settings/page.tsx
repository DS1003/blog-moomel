'use client';

import React, { useState } from 'react';
import {
    Settings,
    Globe,
    Bell,
    Shield,
    Palette,
    User,
    Mail,
    Languages,
    Smartphone,
    Cloud,
    Save,
    CheckCircle2,
    Lock,
    Eye,
    ChevronRight,
    Search,
    Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');
    const [isSaving, setIsSaving] = useState(false);

    const tabs = [
        { id: 'general', label: 'Général', icon: Settings },
        { id: 'appearance', label: 'Apparence', icon: Palette },
        { id: 'security', label: 'Sécurité', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'languages', label: 'Langues & SEO', icon: Languages },
    ];

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
        >
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-2">Paramètres</h1>
                    <p className="text-neutral-500 font-medium">Configurez l'écosystème Moomel selon vos besoins.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`flex items-center gap-2 px-8 py-3 rounded-2xl transition-all text-sm font-bold shadow-lg active:scale-95 ${isSaving
                            ? 'bg-green-500 text-white shadow-green-500/20'
                            : 'bg-neutral-900 text-white shadow-neutral-900/10 hover:bg-neutral-800'
                        }`}
                >
                    {isSaving ? (
                        <>
                            <CheckCircle2 size={18} className="animate-bounce" />
                            <span>Enregistré</span>
                        </>
                    ) : (
                        <>
                            <Save size={18} />
                            <span>Enregistrer</span>
                        </>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Navigation Sidebar */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="bg-white p-3 rounded-[2.5rem] shadow-sm border border-neutral-100">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-sm font-bold transition-all group ${activeTab === tab.id
                                        ? 'bg-neutral-900 text-white shadow-xl shadow-neutral-900/20'
                                        : 'text-neutral-400 hover:bg-neutral-50 hover:text-neutral-900'
                                    }`}
                            >
                                <tab.icon size={20} className={activeTab === tab.id ? 'text-primary-400' : 'text-neutral-300 group-hover:text-neutral-900'} />
                                <span>{tab.label}</span>
                                {activeTab === tab.id && <ChevronRight size={16} className="ml-auto opacity-50" />}
                            </button>
                        ))}
                    </div>

                    <div className="bg-primary-50 p-6 rounded-[2.5rem] border border-primary-100 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                            <Zap size={24} className="text-primary-600" />
                        </div>
                        <h3 className="text-sm font-black text-primary-900 uppercase tracking-widest mb-2">Version Pro</h3>
                        <p className="text-[10px] text-primary-700/70 font-bold leading-relaxed">Vous utilisez Moomel v2.4.0 Engine.</p>
                    </div>
                </div>

                {/* Content Panel */}
                <div className="lg:col-span-9 space-y-8">

                    {/* General Settings */}
                    {activeTab === 'general' && (
                        <div className="bg-white rounded-[3rem] shadow-sm border border-neutral-100 overflow-hidden">
                            <div className="p-8 border-b border-neutral-50 bg-neutral-50/30">
                                <h2 className="text-xl font-serif font-bold text-neutral-900">Préférences Générales</h2>
                            </div>

                            <div className="p-10 space-y-10">
                                {/* App Info */}
                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Globe size={14} /> Profil de l'Application
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-neutral-500 ml-1">Nom du Site</label>
                                            <input type="text" defaultValue="Moomel" className="w-full px-5 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl focus:bg-white focus:border-primary-300 transition-all outline-none font-medium text-sm" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-neutral-500 ml-1">Email de Contact</label>
                                            <input type="email" defaultValue="bonjour@moomel.sn" className="w-full px-5 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl focus:bg-white focus:border-primary-300 transition-all outline-none font-medium text-sm" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-neutral-500 ml-1">Description (Meta-tag)</label>
                                        <textarea rows={3} className="w-full px-5 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl focus:bg-white focus:border-primary-300 transition-all outline-none font-medium text-sm resize-none">Moomel, votre guide de la beauté naturelle et conscience du Sénégal.</textarea>
                                    </div>
                                </div>

                                <div className="h-px bg-neutral-50"></div>

                                {/* Maintenance Mode */}
                                <div className="flex items-center justify-between p-6 bg-neutral-50 border border-neutral-100 rounded-[2.5rem]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                                            <Smartphone size={22} className="text-neutral-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-neutral-900">Mode Maintenance</p>
                                            <p className="text-xs text-neutral-400">Désactiver le site pour les visiteurs pendant les mises à jour.</p>
                                        </div>
                                    </div>
                                    <div className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-14 h-8 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-500 shadow-inner"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Settings (Partial) */}
                    {activeTab === 'security' && (
                        <div className="bg-white rounded-[3rem] shadow-sm border border-neutral-100 overflow-hidden">
                            <div className="p-8 border-b border-neutral-50 bg-neutral-50/30 font-serif font-bold">Sécurité du Compte</div>
                            <div className="p-10 space-y-8">
                                <div className="flex items-center gap-4 p-4 bg-orange-50 border border-orange-100 rounded-2xl mb-4">
                                    <Lock className="text-orange-500" size={24} />
                                    <p className="text-xs font-bold text-orange-700">Il est recommandé de changer votre mot de passe tous les 3 mois.</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-neutral-500 ml-1">Mot de passe actuel</label>
                                            <div className="relative">
                                                <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl focus:bg-white focus:border-primary-300 transition-all outline-none font-medium text-sm" />
                                                <Eye size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-300 cursor-pointer" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-neutral-500 ml-1">Nouveau mot de passe</label>
                                            <div className="relative">
                                                <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl focus:bg-white focus:border-primary-300 transition-all outline-none font-medium text-sm" />
                                                <Eye size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-300 cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Placeholder for other tabs */}
                    {['appearance', 'notifications', 'languages'].includes(activeTab) && (
                        <div className="bg-white rounded-[3rem] p-20 text-center border border-neutral-100">
                            <Cloud className="text-neutral-100 mx-auto mb-6" size={64} />
                            <h2 className="text-xl font-serif font-bold text-neutral-300 uppercase tracking-widest">Section en développement</h2>
                            <p className="text-xs text-neutral-400 mt-2">Cette configuration sera disponible dans la prochaine mise à jour.</p>
                        </div>
                    )}

                </div>

            </div>
        </motion.div>
    );
}
