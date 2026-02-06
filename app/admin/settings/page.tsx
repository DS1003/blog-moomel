'use client';

import React, { useState, useEffect } from 'react';
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
    Zap,
    Loader2,
    Check,
    Moon,
    Sun,
    Monitor,
    ShieldAlert,
    Clock,
    Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Settings State
    const [settings, setSettings] = useState({
        site_name: 'Trésor Moomel',
        contact_email: 'bonjour@moomel.sn',
        site_description: 'Moomel, votre guide de la beauté naturelle et conscience du Sénégal.',
        maintenance_mode: 'false',
        primary_color: '#B88636',
        font_family: 'Playfair Display',
        dark_mode: 'system',
        notify_comments: 'true',
        notify_users: 'true',
        notify_reports: 'true',
        default_language: 'fr',
        ga_id: 'G-XXXXXXXXXX',
        search_indexing: 'true',
        session_timeout: '24'
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/admin/settings');
            if (res.ok) {
                const data = await res.json();
                if (Object.keys(data).length > 0) {
                    setSettings(prev => ({ ...prev, ...data }));
                }
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ settings }),
            });

            if (res.ok) {
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);
            }
        } catch (error) {
            console.error('Failed to save settings:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const updateSetting = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const tabs = [
        { id: 'general', label: 'Général', icon: Settings },
        { id: 'appearance', label: 'Apparence', icon: Palette },
        { id: 'security', label: 'Sécurité', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'languages', label: 'Langues & SEO', icon: Languages },
    ];

    if (isLoading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-primary-500" size={40} />
                <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Chargement des paramètres...</p>
            </div>
        );
    }

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
                        ? 'bg-neutral-400 text-white cursor-not-allowed'
                        : saveSuccess
                            ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                            : 'bg-neutral-900 text-white shadow-neutral-900/10 hover:bg-neutral-800'
                        }`}
                >
                    {isSaving ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : saveSuccess ? (
                        <Check size={18} />
                    ) : (
                        <Save size={18} />
                    )}
                    <span>{isSaving ? 'Enregistrement...' : saveSuccess ? 'Enregistré !' : 'Enregistrer'}</span>
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
                <div className="lg:col-span-9 space-y-8 min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {/* GENERAL TAB */}
                        {activeTab === 'general' && (
                            <motion.div
                                key="general"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-[3rem] shadow-sm border border-neutral-100 overflow-hidden"
                            >
                                <div className="p-8 border-b border-neutral-50 bg-neutral-50/30">
                                    <h2 className="text-xl font-serif font-bold text-neutral-900">Préférences Générales</h2>
                                </div>

                                <div className="p-10 space-y-10">
                                    <div className="space-y-6">
                                        <h3 className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Globe size={14} /> Profil de l'Application
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-neutral-500 ml-1">Nom du Site</label>
                                                <input
                                                    type="text"
                                                    value={settings.site_name}
                                                    onChange={(e) => updateSetting('site_name', e.target.value)}
                                                    className="w-full px-5 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl focus:bg-white focus:border-primary-300 transition-all outline-none font-medium text-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-neutral-500 ml-1">Email de Contact</label>
                                                <input
                                                    type="email"
                                                    value={settings.contact_email}
                                                    onChange={(e) => updateSetting('contact_email', e.target.value)}
                                                    className="w-full px-5 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl focus:bg-white focus:border-primary-300 transition-all outline-none font-medium text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-neutral-500 ml-1">Description (Meta-tag)</label>
                                            <textarea
                                                rows={3}
                                                value={settings.site_description}
                                                onChange={(e) => updateSetting('site_description', e.target.value)}
                                                className="w-full px-5 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl focus:bg-white focus:border-primary-300 transition-all outline-none font-medium text-sm resize-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="h-px bg-neutral-50"></div>

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
                                        <div className={`relative inline-flex items-center cursor-pointer`} onClick={() => updateSetting('maintenance_mode', settings.maintenance_mode === 'true' ? 'false' : 'true')}>
                                            <div className={`w-14 h-8 transition-colors rounded-full shadow-inner relative ${settings.maintenance_mode === 'true' ? 'bg-primary-500' : 'bg-neutral-200'}`}>
                                                <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform shadow-md ${settings.maintenance_mode === 'true' ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* APPEARANCE TAB */}
                        {activeTab === 'appearance' && (
                            <motion.div
                                key="appearance"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-[3rem] shadow-sm border border-neutral-100 overflow-hidden"
                            >
                                <div className="p-8 border-b border-neutral-50 bg-neutral-50/30">
                                    <h2 className="text-xl font-serif font-bold text-neutral-900">Design & Visuels</h2>
                                </div>
                                <div className="p-10 space-y-10">
                                    <div className="space-y-6">
                                        <h3 className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Couleur Primaire</h3>
                                        <div className="grid grid-cols-5 gap-4">
                                            {['#B88636', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6'].map(color => (
                                                <button
                                                    key={color}
                                                    onClick={() => updateSetting('primary_color', color)}
                                                    className={`h-16 rounded-2xl transition-all relative flex items-center justify-center ${settings.primary_color === color ? 'ring-4 ring-neutral-100 scale-105' : 'hover:scale-105'}`}
                                                    style={{ backgroundColor: color }}
                                                >
                                                    {settings.primary_color === color && <Check className="text-white" size={20} />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="h-px bg-neutral-50"></div>

                                    <div className="space-y-6">
                                        <h3 className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] flex items-center gap-2"><Layout size={14} /> Typographie</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {['Playfair Display', 'Inter', 'Outfit', 'Montserrat'].map(font => (
                                                <button
                                                    key={font}
                                                    onClick={() => updateSetting('font_family', font)}
                                                    className={`p-6 rounded-3xl border text-left transition-all ${settings.font_family === font ? 'border-primary-500 bg-primary-50/30 text-primary-900 shadow-sm' : 'border-neutral-100 hover:border-neutral-200 text-neutral-500'}`}
                                                >
                                                    <p className="text-xs font-bold uppercase tracking-widest mb-1">{font}</p>
                                                    <p className={`text-xl font-serif`} style={{ fontFamily: font }}>L'élégance du naturel</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="h-px bg-neutral-50"></div>

                                    <div className="space-y-6">
                                        <h3 className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Thème par défaut</h3>
                                        <div className="flex gap-3">
                                            {[
                                                { id: 'light', icon: Sun, label: 'Clair' },
                                                { id: 'dark', icon: Moon, label: 'Sombre' },
                                                { id: 'system', icon: Monitor, label: 'Système' }
                                            ].map(mode => (
                                                <button
                                                    key={mode.id}
                                                    onClick={() => updateSetting('dark_mode', mode.id)}
                                                    className={`flex-1 flex flex-col items-center gap-3 p-6 rounded-3xl border transition-all ${settings.dark_mode === mode.id ? 'border-neutral-900 bg-neutral-900 text-white shadow-xl shadow-neutral-900/10' : 'border-neutral-100 text-neutral-400 hover:border-neutral-200'}`}
                                                >
                                                    <mode.icon size={20} />
                                                    <span className="text-xs font-bold">{mode.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* SECURITY TAB */}
                        {activeTab === 'security' && (
                            <motion.div
                                key="security"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-[3rem] shadow-sm border border-neutral-100 overflow-hidden"
                            >
                                <div className="p-8 border-b border-neutral-50 bg-neutral-50/30">
                                    <h2 className="text-xl font-serif font-bold text-neutral-900">Sécurité & Contrôle</h2>
                                </div>
                                <div className="p-10 space-y-10">
                                    <div className="flex items-center gap-4 p-5 bg-amber-50 rounded-[2rem] border border-amber-100">
                                        <ShieldAlert className="text-amber-500 flex-shrink-0" size={24} />
                                        <p className="text-xs font-bold text-amber-700 leading-relaxed">Assurez-vous que votre compte admin utilise une authentification forte.</p>
                                    </div>

                                    <div className="space-y-6">
                                        <h3 className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] flex items-center gap-2"><Clock size={14} /> Accès</h3>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-neutral-500 ml-1">Délais avant déconnexion automatique (Heures)</label>
                                            <select
                                                value={settings.session_timeout}
                                                onChange={(e) => updateSetting('session_timeout', e.target.value)}
                                                className="w-full px-5 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl focus:bg-white focus:border-primary-300 transition-all outline-none font-medium text-sm appearance-none"
                                            >
                                                <option value="1">1 heure</option>
                                                <option value="6">6 heures</option>
                                                <option value="24">24 heures</option>
                                                <option value="168">7 jours</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="h-px bg-neutral-50"></div>

                                    <div className="space-y-6">
                                        <h3 className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Protection</h3>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-bold text-neutral-900">Double Authentification (2FA)</p>
                                                <p className="text-xs text-neutral-400">Ajouter une couche de sécurité supplémentaire.</p>
                                            </div>
                                            <div className="px-4 py-2 bg-neutral-100 rounded-full text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                                                Bientôt Disponible
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* NOTIFICATIONS TAB */}
                        {activeTab === 'notifications' && (
                            <motion.div
                                key="notifications"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-[3rem] shadow-sm border border-neutral-100 overflow-hidden"
                            >
                                <div className="p-8 border-b border-neutral-50 bg-neutral-50/30">
                                    <h2 className="text-xl font-serif font-bold text-neutral-900">Mail & Notifications</h2>
                                </div>
                                <div className="p-10 space-y-8">
                                    {[
                                        { id: 'notify_comments', title: 'Nouveaux Commentaires', desc: 'Recevoir un mail pour chaque nouveau commentaire.', icon: Mail },
                                        { id: 'notify_users', title: 'Inscriptions Utilisateurs', desc: 'Être alerté lorsqu\'une nouvelle utilisatrice rejoint Moomel.', icon: User },
                                        { id: 'notify_reports', title: 'Signalements', desc: 'Recevoir une alerte immédiate pour tout contenu signalé.', icon: ShieldAlert },
                                    ].map(card => (
                                        <button
                                            key={card.id}
                                            onClick={() => updateSetting(card.id, settings[card.id as keyof typeof settings] === 'true' ? 'false' : 'true')}
                                            className={`w-full flex items-center justify-between p-6 rounded-[2.5rem] border transition-all ${settings[card.id as keyof typeof settings] === 'true' ? 'bg-primary-50/30 border-primary-200' : 'bg-neutral-50/50 border-neutral-100 hover:border-neutral-200'}`}
                                        >
                                            <div className="flex items-center gap-5 text-left">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${settings[card.id as keyof typeof settings] === 'true' ? 'bg-white text-primary-600 shadow-sm' : 'bg-white text-neutral-300 shadow-sm'}`}>
                                                    <card.icon size={20} />
                                                </div>
                                                <div>
                                                    <p className={`text-sm font-bold ${settings[card.id as keyof typeof settings] === 'true' ? 'text-primary-900' : 'text-neutral-500'}`}>{card.title}</p>
                                                    <p className="text-xs text-neutral-400">{card.desc}</p>
                                                </div>
                                            </div>
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${settings[card.id as keyof typeof settings] === 'true' ? 'bg-primary-500 text-white' : 'border-2 border-neutral-200'}`}>
                                                {settings[card.id as keyof typeof settings] === 'true' && <Check size={14} />}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* LANGUAGES & SEO TAB */}
                        {activeTab === 'languages' && (
                            <motion.div
                                key="languages"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-[3rem] shadow-sm border border-neutral-100 overflow-hidden"
                            >
                                <div className="p-8 border-b border-neutral-50 bg-neutral-50/30">
                                    <h2 className="text-xl font-serif font-bold text-neutral-900">Langues & SEO</h2>
                                </div>
                                <div className="p-10 space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-neutral-500 ml-1">Langue par défaut</label>
                                            <select
                                                value={settings.default_language}
                                                onChange={(e) => updateSetting('default_language', e.target.value)}
                                                className="w-full px-5 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl focus:bg-white focus:border-primary-300 transition-all outline-none font-medium text-sm appearance-none"
                                            >
                                                <option value="fr">Français (Sénégal)</option>
                                                <option value="en">English (International)</option>
                                                <option value="wo">Wolof (Bêta)</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-neutral-500 ml-1">Google Analytics ID</label>
                                            <input
                                                type="text"
                                                value={settings.ga_id}
                                                onChange={(e) => updateSetting('ga_id', e.target.value)}
                                                className="w-full px-5 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl focus:bg-white focus:border-primary-300 transition-all outline-none font-medium text-sm"
                                                placeholder="G-XXXXXXXXXX"
                                            />
                                        </div>
                                    </div>

                                    <div className="h-px bg-neutral-50"></div>

                                    <div className="p-8 bg-emerald-50/50 border border-emerald-100 rounded-[2.5rem] flex items-center justify-between">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                                                <Search size={22} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-neutral-900">Indexation par les moteurs</p>
                                                <p className="text-xs text-neutral-400">Autoriser Google et Bing à parcourir votre site.</p>
                                            </div>
                                        </div>
                                        <div className={`relative inline-flex items-center cursor-pointer`} onClick={() => updateSetting('search_indexing', settings.search_indexing === 'true' ? 'false' : 'true')}>
                                            <div className={`w-14 h-8 transition-colors rounded-full shadow-inner relative ${settings.search_indexing === 'true' ? 'bg-emerald-500' : 'bg-neutral-200'}`}>
                                                <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform shadow-md ${settings.search_indexing === 'true' ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </motion.div>
    );
}
