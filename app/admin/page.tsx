'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ScrollReveal from '@/app/_components/ui/ScrollReveal';

interface Article {
  id: string;
  title: string;
  author: { name: string };
  createdAt: string;
  published: boolean;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // In a real app, check for ADMIN role
  // if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
  //   redirect('/');
  // }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-[#F9F7F2]">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-medium text-neutral-900 mb-2">Tableau de bord</h1>
              <p className="text-neutral-500">Gérez votre contenu et analysez la croissance de la communauté.</p>
            </div>
            <Link
              href="/admin/articles/new"
              className="btn-primary flex items-center gap-2 group shadow-xl shadow-primary-500/20"
            >
              <span>+ Nouvel Article</span>
            </Link>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: "Utilisateurs", value: "1,234", change: "+12%", color: "primary", icon: "👥" },
            { title: "Articles", value: articles.length.toString(), change: "+3", color: "neutral", icon: "📝" },
            { title: "Commentaires", value: "856", change: "+24", color: "primary", icon: "💬" },
            { title: "XP Distribués", value: "15.4k", change: "Total", color: "neutral", icon: "✨" },
          ].map((stat, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1} animation="zoom-in" className="h-full">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 h-full hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl ${stat.color === 'primary' ? 'bg-primary-50 text-primary-600' : 'bg-neutral-100 text-neutral-600'}`}>
                    {stat.icon}
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.includes('+') ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-neutral-500 text-sm font-medium uppercase tracking-wider mb-1">{stat.title}</h3>
                <p className="text-3xl font-serif font-bold text-neutral-900">{stat.value}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Articles */}
          <ScrollReveal animation="slide-right" delay={0.2}>
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-neutral-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif text-neutral-900">Articles récents</h2>
                <Link href="/admin/articles" className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline underline-offset-4">
                  Voir tout
                </Link>
              </div>

              <div className="overflow-x-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-100">
                        <th className="px-4 py-3 text-left text-xs font-bold text-neutral-400 uppercase tracking-widest">Titre</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-neutral-400 uppercase tracking-widest">Auteur</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-neutral-400 uppercase tracking-widest">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-neutral-400 uppercase tracking-widest">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-50">
                      {articles.slice(0, 5).map((article) => (
                        <tr key={article.id} className="group hover:bg-neutral-50/50 transition-colors">
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 group-hover:text-primary-700 transition-colors">
                            {article.title}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-xs text-neutral-500 font-medium bg-neutral-50 rounded-full w-fit">
                            {article.author?.name || 'Inconnu'}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-500 font-serif italic">
                            {new Date(article.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs font-bold rounded-full uppercase tracking-wide ${article.published
                                ? 'bg-primary-100 text-primary-700'
                                : 'bg-neutral-100 text-neutral-500'
                              }`}>
                              {article.published ? 'Publié' : 'Brouillon'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Recent Activity */}
          <ScrollReveal animation="slide-left" delay={0.3}>
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-neutral-100 h-full">
              <h2 className="text-2xl font-serif text-neutral-900 mb-8">Activité récente</h2>
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start gap-4 pb-6 border-b border-neutral-50 last:border-0 last:pb-0 hover:bg-neutral-50/50 p-2 rounded-xl transition-colors -mx-2">
                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0 text-primary-600">
                      {i % 2 === 0 ? '💬' : '❤️'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-neutral-900 font-medium">
                        <span className="font-bold">Utilisateur {i}</span> {i % 2 === 0 ? 'a commenté un article' : 'a aimé un article'}
                      </p>
                      <p className="text-xs text-neutral-400 mt-1 truncate">"La révolution de la cosmétique..."</p>
                    </div>
                    <div className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-full whitespace-nowrap">
                      +10 XP
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
