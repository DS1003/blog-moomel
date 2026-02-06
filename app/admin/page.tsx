'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  Users,
  FileText,
  MessageSquare,
  Zap,
  TrendingUp,
  Clock,
  ExternalLink,
  Heart,
  ArrowRight,
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Article {
  id: string;
  title: string;
  author: { name: string };
  createdAt: string;
  published: boolean;
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardSearch, setDashboardSearch] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/articles');
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-10"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-2">Tableau de bord</h1>
          <p className="text-neutral-500 font-medium">Vue d'ensemble de l'activité de Moomel Beauté.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 bg-white text-neutral-700 px-5 py-2.5 rounded-2xl border border-neutral-200 hover:bg-neutral-50 transition-all text-sm font-bold shadow-sm"
          >
            <ExternalLink size={16} />
            <span>Aperçu site</span>
          </Link>
          <Link
            href="/admin/articles/new"
            className="flex items-center gap-2 bg-neutral-900 text-white px-6 py-2.5 rounded-2xl hover:bg-neutral-800 transition-all text-sm font-bold shadow-lg shadow-neutral-900/10"
          >
            <span>+ Nouveau</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Utilisatrices", value: "1,234", change: "+12%", icon: Users, color: "blue" },
          { title: "Articles", value: articles.length.toString(), change: "+3", icon: FileText, color: "purple" },
          { title: "Commentaires", value: "856", change: "+24", icon: MessageSquare, color: "orange" },
          { title: "XP Distribués", value: "15.4k", change: "Total", icon: Zap, color: "yellow" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-neutral-100 hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-500 group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-inner bg-neutral-50 border border-neutral-100`}>
                <stat.icon size={22} className={`text-neutral-800`} />
              </div>
              <div className={`flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full ${stat.change.includes('+') ? 'bg-green-50 text-green-600' : 'bg-neutral-50 text-neutral-400'}`}>
                {stat.change.includes('+') && <TrendingUp size={10} />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-neutral-400 text-[11px] font-black uppercase tracking-[0.2em] mb-1">{stat.title}</h3>
            <p className="text-3xl font-serif font-black text-neutral-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Articles Table */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-8 bg-white rounded-[3rem] p-8 shadow-sm border border-neutral-100"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 px-2 gap-4">
            <h2 className="text-2xl font-serif font-bold text-neutral-900">Articles récents</h2>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={dashboardSearch}
                  onChange={(e) => setDashboardSearch(e.target.value)}
                  placeholder="Filtrer ces articles..."
                  className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
              </div>
              <Link href="/admin/articles" className="group flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-700 whitespace-nowrap">
                <span>Tout voir</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="w-full">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-10 h-10 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin"></div>
                <p className="text-sm font-bold text-neutral-400 animate-pulse uppercase tracking-widest">Chargement...</p>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <table className="w-full hidden md:table">
                  <thead>
                    <tr className="border-b border-neutral-50">
                      <th className="px-4 py-4 text-left text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Titre</th>
                      <th className="hidden lg:table-cell px-4 py-4 text-left text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Auteur</th>
                      <th className="px-4 py-4 text-left text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Statut</th>
                      <th className="px-4 py-4 text-right text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50">
                    {articles
                      .filter(a => a.title.toLowerCase().includes(dashboardSearch.toLowerCase()))
                      .slice(0, 5)
                      .map((article) => (
                        <tr key={article.id} className="group hover:bg-neutral-50/50 transition-all cursor-pointer">
                          <td className="px-4 py-5 font-medium text-neutral-900">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-neutral-100 flex-shrink-0 flex items-center justify-center text-neutral-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                <FileText size={16} />
                              </div>
                              <span className="text-sm font-bold group-hover:text-primary-600 transition-colors line-clamp-1">{article.title}</span>
                            </div>
                          </td>
                          <td className="hidden lg:table-cell px-4 py-5 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-neutral-200 border border-white"></div>
                              <span className="text-xs font-bold text-neutral-500">{article.author?.name || 'Moomel'}</span>
                            </div>
                          </td>
                          <td className="px-4 py-5 whitespace-nowrap">
                            <span className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest ${article.published
                              ? 'bg-green-50 text-green-600 border border-green-100'
                              : 'bg-neutral-50 text-neutral-400 border border-neutral-100'
                              }`}>
                              {article.published ? 'Publié' : 'Brouillon'}
                            </span>
                          </td>
                          <td className="px-4 py-5 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-1.5 text-xs text-neutral-400 font-serif italic">
                              <Clock size={12} className="not-italic opacity-50" />
                              {new Date(article.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                {/* Mobile Card View for Dashboard */}
                <div className="md:hidden flex flex-col gap-4">
                  {articles
                    .filter(a => a.title.toLowerCase().includes(dashboardSearch.toLowerCase()))
                    .slice(0, 5)
                    .map((article) => (
                      <div key={article.id} className="flex items-center gap-4 p-4 rounded-3xl bg-neutral-50/50 border border-neutral-100/50">
                        <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-100 flex-shrink-0 flex items-center justify-center text-neutral-400 shadow-sm">
                          <FileText size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-neutral-900 truncate mb-1">{article.title}</h4>
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${article.published ? 'bg-green-500' : 'bg-neutral-300'}`}></span>
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{article.published ? 'Publié' : 'Brouillon'}</span>
                            <span className="text-[10px] text-neutral-300">•</span>
                            <span className="text-[10px] font-medium text-neutral-400">{new Date(article.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-4 bg-white rounded-[3rem] p-8 shadow-sm border border-neutral-100"
        >
          <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-8 px-2">Activité récente</h2>
          <div className="space-y-2">
            {[
              { user: "Fatou K.", action: "a commenté", detail: "Les vertus du secret...", type: "comment", time: "2 min" },
              { user: "Aissatou B.", action: "a aimé", detail: "Retour aux sources...", type: "like", time: "15 min" },
              { user: "Mariama D.", action: "s'est inscrite", detail: "Nouveau membre", type: "user", time: "1h" },
              { user: "Khoudia S.", action: "a commenté", detail: "L'art du henné...", type: "comment", time: "3h" },
              { user: "Ndeye P.", action: "a aimé", detail: "Dakar Morning Routine", type: "like", time: "5h" },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-4 p-4 hover:bg-neutral-50 rounded-[2rem] transition-all cursor-pointer group">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${activity.type === 'comment' ? 'bg-purple-50 text-purple-500' :
                  activity.type === 'like' ? 'bg-pink-50 text-pink-500' :
                    'bg-blue-50 text-blue-500'
                  } shadow-sm`}>
                  {activity.type === 'comment' ? <MessageSquare size={18} /> :
                    activity.type === 'like' ? <Heart size={18} /> :
                      <Users size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-neutral-900">
                    <span className="font-black">{activity.user}</span>
                    <span className="text-neutral-500 font-medium mx-1">{activity.action}</span>
                  </p>
                  <p className="text-[11px] text-neutral-400 font-bold truncate mt-0.5 uppercase tracking-tighter">{activity.detail}</p>
                </div>
                <div className="text-[10px] font-bold text-neutral-300 whitespace-nowrap pt-1">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-4 rounded-2xl border-2 border-dashed border-neutral-100 text-xs font-black text-neutral-300 uppercase tracking-widest hover:bg-neutral-50 hover:border-neutral-200 transition-all">
            Charger plus d'activité
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
