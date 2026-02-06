'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Users,
    FileText,
    MessageCircle,
    Eye,
    Download,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Loader2,
    Zap,
    Heart,
    Award,
    Hash,
    Target,
    BarChart2,
    PieChart as PieChartIcon,
    ArrowRight,
    TrendingUp
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from 'recharts';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function AnalyticsPage() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isExporting, setIsExporting] = useState(false);
    const reportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const res = await fetch('/api/admin/analytics');
            if (res.ok) {
                const json = await res.json();
                setData(json);
            }
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const exportToPDF = async () => {
        if (!data) return;
        setIsExporting(true);

        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const margin = 20;
            let currentY = 20;

            // Header & Branding
            pdf.setFillColor(249, 247, 242);
            pdf.rect(0, 0, pageWidth, 45, 'F');

            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(26);
            pdf.setTextColor(184, 134, 54);
            pdf.text('TRÉSOR MOOMEL', margin, 28);

            pdf.setFontSize(11);
            pdf.setTextColor(80, 80, 80);
            pdf.setFont('helvetica', 'normal');
            pdf.text('RAPPORT ANALYTIQUE STRATÉGIQUE - ADMINISTRATION', margin, 36);

            pdf.setFontSize(9);
            pdf.setTextColor(120, 120, 120);
            pdf.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}`, pageWidth - margin - 50, 25, { align: 'right' });
            pdf.text('ID Rapport: TMOO-ADMIN-FULL', pageWidth - margin - 50, 30, { align: 'right' });

            currentY = 60;

            // Section I: Indicateurs de Performance (KPIs)
            pdf.setFontSize(14);
            pdf.setTextColor(10, 10, 10);
            pdf.setFont('helvetica', 'bold');
            pdf.text('I. INDICATEURS CLÉS DE PERFORMANCE', margin, currentY);
            currentY += 12;

            const stats = [
                { label: 'Vues Totales', value: data.totals.views.toLocaleString(), sub: `+${data.totals.newArticles30d} contenus` },
                { label: 'Utilisatrices', value: data.totals.users.toString(), sub: `+${data.totals.newUsers30d} ce mois` },
                { label: 'Interactions', value: (data.totals.comments + data.totals.likes).toString(), sub: `${data.totals.avgEngagement} mov./art.` },
                { label: 'Badges Gagnés', value: data.totals.badges.toString(), sub: 'Niveaux XP actifs' }
            ];

            pdf.setFontSize(9);
            stats.forEach((stat, i) => {
                const xPos = margin + (i % 2) * 85;
                const yPos = currentY + Math.floor(i / 2) * 20;
                pdf.setFillColor(250, 250, 250);
                pdf.roundedRect(xPos, yPos - 5, 80, 16, 2, 2, 'F');
                pdf.setDrawColor(230, 230, 230);
                pdf.roundedRect(xPos, yPos - 5, 80, 16, 2, 2, 'D');

                pdf.setTextColor(100, 100, 100);
                pdf.setFont('helvetica', 'normal');
                pdf.text(stat.label, xPos + 5, yPos + 2);

                pdf.setTextColor(184, 134, 54);
                pdf.setFont('helvetica', 'bold');
                pdf.setFontSize(11);
                pdf.text(stat.value, xPos + 5, yPos + 8);
            });

            currentY += 45;

            // Section II: Analyse du Contenu
            pdf.setFontSize(14);
            pdf.setTextColor(10, 10, 10);
            pdf.setFont('helvetica', 'bold');
            pdf.text('II. ANALYSE DÉTAILLÉE DU CONTENU', margin, currentY);
            currentY += 12;

            pdf.setFillColor(184, 134, 54);
            pdf.rect(margin, currentY - 5, pageWidth - margin * 2, 10, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(9);
            pdf.text('Article / Titre', margin + 5, currentY + 1.5);
            pdf.text('Secteur / Cat.', margin + 95, currentY + 1.5);
            pdf.text('Vues', margin + 135, currentY + 1.5);
            pdf.text('Eng.', margin + 155, currentY + 1.5);

            currentY += 11;
            pdf.setTextColor(30, 30, 30);
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(8);

            data.topArticles.slice(0, 8).forEach((a: any, i: number) => {
                const title = a.title.length > 50 ? a.title.substring(0, 47) + '...' : a.title;
                pdf.text(title, margin + 5, currentY);
                pdf.text(a.category, margin + 95, currentY);
                pdf.text(a.views.toLocaleString(), margin + 135, currentY);
                pdf.text(a.engagement.toString(), margin + 155, currentY);

                pdf.setDrawColor(240, 240, 240);
                pdf.line(margin, currentY + 2.5, pageWidth - margin, currentY + 2.5);
                currentY += 9;
            });

            const pageCount = (pdf as any).internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                pdf.setPage(i);
                const footerY = pdf.internal.pageSize.getHeight() - 15;
                pdf.setFontSize(8);
                pdf.setTextColor(180, 180, 180);
                pdf.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
                pdf.text('© 2026 Trésor Moomel - Rapport Confidentiel Interne', margin, footerY);
                pdf.text(`Page ${i} sur ${pageCount}`, pageWidth - margin - 20, footerY);
            }

            pdf.save(`Rapport_Strategique_TrésorMoomel_${new Date().getFullYear()}.pdf`);
        } catch (error) {
            console.error('PDF Export error:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const COLORS = ['#B88636', '#D4A373', '#E9EDC9', '#FEFAE0', '#FAEDCD'];

    if (isLoading) {
        return (
            <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-neutral-400" size={40} />
                <p className="text-sm font-bold text-neutral-400 uppercase tracking-[0.2em]">Extraction des données...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
                <div className="p-8 bg-rose-50 border border-rose-100 rounded-[2.5rem] text-center max-w-lg">
                    <p className="text-rose-600 font-bold mb-4 uppercase tracking-widest text-xs">Erreur Système</p>
                    <p className="text-sm text-rose-500/70 mb-8">Impossible d'extraire les données analytiques.</p>
                    <button
                        onClick={() => { setIsLoading(true); fetchAnalytics(); }}
                        className="px-8 py-3 bg-neutral-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 transition-all active:scale-95"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 pb-10"
        >
            {/* Page Header with Featured Image */}
            <div className="relative overflow-hidden rounded-[3.5rem] bg-neutral-900 text-white shadow-2xl shadow-neutral-900/10 mb-10">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                    <Image
                        src="/admin/analytics-hero.png"
                        alt="Background"
                        fill
                        className="object-cover scale-110 blur-[2px]"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-900/60 to-transparent"></div>

                <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="px-3 py-1 bg-primary-500 text-neutral-950 text-[10px] font-black rounded-full uppercase tracking-widest">
                                Live Intelligence
                            </div>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 leading-tight">
                            Tableau de Bord <br /> <span className="text-primary-400">Trésor Moomel</span>
                        </h1>
                        <p className="text-neutral-300 text-sm md:text-base lg:text-lg font-medium max-w-md">
                            Vision stratégique en temps réel. Analysez vos performances et optimisez l'expérience de votre communauté.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-3xl flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Période</p>
                                <p className="text-sm font-bold">30 derniers jours</p>
                            </div>
                        </div>
                        <button
                            onClick={exportToPDF}
                            disabled={isExporting}
                            className="bg-white text-neutral-950 px-8 py-5 rounded-[2rem] hover:bg-primary-400 transition-all font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-white/5 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3"
                        >
                            {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                            <span>Exporter Strategic PDF</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Grid - Optimized for 13" and larger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                <KPICard title="Vues Totales" value={data.totals.views} icon={Eye} sub={`+${data.totals.newArticles30d} contenus`} />
                <KPICard title="Utilisatrices" value={data.totals.users} icon={Users} sub={`+${data.totals.newUsers30d} ce mois`} />
                <KPICard title="Engagement" value={data.totals.avgEngagement} icon={Heart} sub="Moyenne / article" />
                <KPICard title="Système XP" value={data.totals.badges} icon={Award} sub="Badges distribués" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                {/* Main performance chart */}
                <div className="lg:col-span-8 bg-white p-6 md:p-10 rounded-[3.5rem] border border-neutral-100 shadow-xl shadow-neutral-200/20">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-neutral-900">Vision de Croissance</h3>
                            <p className="text-xs text-neutral-400 font-medium mt-1">Évolution des vues et interactions.</p>
                        </div>
                        <div className="flex gap-4">
                            <LegendItem color="#B88636" label="Vues" />
                            <LegendItem color="#E9EDC9" label="Inter." />
                        </div>
                    </div>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.performanceData}>
                                <defs>
                                    <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#B88636" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#B88636" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#FAFAFA" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 'bold', fill: '#A3A3A3' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 'bold', fill: '#A3A3A3' }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="vues" stroke="#B88636" strokeWidth={4} fillOpacity={1} fill="url(#primaryGradient)" />
                                <Area type="monotone" dataKey="interactions" stroke="#D1D5DB" strokeWidth={2} fillOpacity={0} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Categories Bar Chart */}
                <div className="lg:col-span-4 bg-white p-6 md:p-10 rounded-[3.5rem] border border-neutral-100 shadow-xl shadow-neutral-200/20 flex flex-col">
                    <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-2">Secteurs</h3>
                    <p className="text-xs text-neutral-400 font-medium mb-10">Répartition par catégorie.</p>
                    <div className="h-[280px] w-full mb-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.categoryData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F5" />
                                <XAxis dataKey="name" hide />
                                <YAxis hide />
                                <Tooltip
                                    cursor={{ fill: 'rgba(184, 134, 54, 0.05)' }}
                                    content={({ active, payload }: any) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-neutral-900 p-4 rounded-2xl border border-white/10 shadow-2xl">
                                                    <p className="text-[10px] font-black uppercase text-primary-400 mb-1">{payload[0].payload.name}</p>
                                                    <p className="text-xs font-bold text-white">{payload[0].value} articles</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Bar dataKey="value" fill="#B88636" radius={[12, 12, 0, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-4 flex-1 overflow-y-auto max-h-[220px] pr-2 custom-scrollbar">
                        {data.categoryData.map((cat: any, i: number) => (
                            <div key={i} className="flex items-center justify-between py-3 border-b border-neutral-50 last:border-0 hover:bg-neutral-50 rounded-xl px-2 transition-colors">
                                <span className="text-xs font-bold text-neutral-600 truncate mr-4">{cat.name}</span>
                                <span className="text-xs font-black text-neutral-400">{cat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Tables */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Articles */}
                <div className="xl:col-span-8 bg-white p-8 rounded-[3rem] border border-neutral-100 shadow-sm">
                    <div className="flex justify-between items-center mb-8 px-2">
                        <h3 className="text-xl font-serif font-bold text-neutral-900">Articles les plus performants</h3>
                        <Link href="/admin/articles" className="text-xs font-bold text-primary-600 hover:underline">Voir tout</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-neutral-50">
                                    <th className="text-left pb-4 text-[10px] font-black text-neutral-300 uppercase tracking-widest px-2">Titre</th>
                                    <th className="text-left pb-4 text-[10px] font-black text-neutral-300 uppercase tracking-widest px-2 group">Engagement</th>
                                    <th className="text-right pb-4 text-[10px] font-black text-neutral-300 uppercase tracking-widest px-2">Vues</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.topArticles.slice(0, 5).map((article: any, i: number) => (
                                    <tr key={i} className="group border-b border-neutral-50 last:border-0">
                                        <td className="py-4 px-2">
                                            <p className="text-sm font-bold text-neutral-800 line-clamp-1 group-hover:text-primary-600 transition-colors">{article.title}</p>
                                            <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest">{article.category}</p>
                                        </td>
                                        <td className="py-4 px-2 text-sm font-bold text-neutral-500">
                                            <div className="flex items-center gap-1.5">
                                                <Heart size={14} className="text-neutral-300 group-hover:text-rose-500" />
                                                <span>{article.engagement}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2 text-right">
                                            <span className="text-sm font-black text-neutral-900">{article.views.toLocaleString()}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Users / Tags */}
                <div className="xl:col-span-4 space-y-8 lg:space-y-10">
                    <div className="bg-white p-8 md:p-10 rounded-[3.5rem] border border-neutral-100 shadow-xl shadow-neutral-200/20">
                        <h3 className="text-xl font-serif font-bold text-neutral-900 mb-8 px-2 flex items-center gap-3">
                            <Zap size={18} className="text-amber-500 fill-amber-500" />
                            Leaderboard Communauté
                        </h3>
                        <div className="space-y-6">
                            {data.topUsers.slice(0, 4).map((user: any, i: number) => (
                                <div key={i} className="flex items-center justify-between group p-2 hover:bg-neutral-50 rounded-2xl transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-neutral-100 overflow-hidden relative border border-neutral-50 shadow-sm group-hover:scale-105 transition-transform">
                                            {user.image ? (
                                                <Image src={user.image} alt={user.name} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-sm font-black text-neutral-400">
                                                    {user.name?.[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-neutral-800">{user.name}</p>
                                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Lvl {user.level}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black px-3 py-1 bg-primary-50 text-primary-700 rounded-full">{user.xp} XP</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-8 md:p-10 rounded-[3.5rem] border border-neutral-100 shadow-xl shadow-neutral-200/20">
                        <h3 className="text-xl font-serif font-bold text-neutral-900 mb-8 px-2 flex items-center gap-3">
                            <Hash size={18} className="text-primary-600" />
                            Sujets Chauds
                        </h3>
                        <div className="flex flex-wrap gap-2.5">
                            {data.tagCloud.map((tag: any, i: number) => (
                                <div key={i} className="px-4 py-2 bg-neutral-50 rounded-2xl text-[10px] font-black text-neutral-500 border border-neutral-100 uppercase tracking-widest hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all cursor-default">
                                    #{tag.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function KPICard({ title, value, icon: Icon, sub }: any) {
    return (
        <div className="bg-white p-6 rounded-[2.5rem] border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-neutral-200/40 transition-all duration-500 group">
            <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-800 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-inner">
                    <Icon size={22} />
                </div>
                <div className="text-[10px] font-black px-2.5 py-1 bg-green-50 text-green-600 rounded-full flex items-center gap-1">
                    <TrendingUp size={10} />
                    +12%
                </div>
            </div>
            <h3 className="text-[11px] font-black text-neutral-400 uppercase tracking-widest mb-1">{title}</h3>
            <p className="text-3xl font-serif font-black text-neutral-900 mb-1">{typeof value === 'number' ? value.toLocaleString() : value}</p>
            <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">{sub}</p>
        </div>
    );
}

function LegendItem({ color, label }: any) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{label}</span>
        </div>
    );
}

function CustomTooltip({ active, payload, label }: any) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded-2xl shadow-xl border border-neutral-100 min-w-[150px]">
                <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest mb-3 border-b border-neutral-50 pb-2">{label}</p>
                <div className="space-y-2">
                    <div className="flex justify-between items-center gap-6">
                        <span className="text-xs font-bold text-neutral-400">Vues</span>
                        <span className="text-sm font-black text-primary-600">{payload[0].value.toLocaleString()}</span>
                    </div>
                    {payload[1] && (
                        <div className="flex justify-between items-center gap-6">
                            <span className="text-xs font-bold text-neutral-400">Inter.</span>
                            <span className="text-sm font-black text-neutral-700">{payload[1].value.toLocaleString()}</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    return null;
}
