'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

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
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-800">Tableau de bord Admin</h1>
          <Link
            href="/admin/articles/new"
            className="btn-primary"
          >
            + Nouvel Article
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6 border-l-4 border-primary-500">
            <h3 className="text-neutral-500 text-sm font-medium uppercase tracking-wider">Utilisateurs</h3>
            <p className="text-3xl font-bold text-neutral-800 mt-2">1,234</p>
            <p className="text-green-500 text-sm mt-1 flex items-center">
              <span className="mr-1">↑</span> 12% ce mois
            </p>
          </div>

          <div className="card p-6 border-l-4 border-accent-500">
            <h3 className="text-neutral-500 text-sm font-medium uppercase tracking-wider">Articles</h3>
            <p className="text-3xl font-bold text-neutral-800 mt-2">{articles.length}</p>
            <p className="text-green-500 text-sm mt-1 flex items-center">
              <span className="mr-1">↑</span> 3 cette semaine
            </p>
          </div>

          <div className="card p-6 border-l-4 border-yellow-500">
            <h3 className="text-neutral-500 text-sm font-medium uppercase tracking-wider">Commentaires</h3>
            <p className="text-3xl font-bold text-neutral-800 mt-2">856</p>
            <p className="text-green-500 text-sm mt-1 flex items-center">
              <span className="mr-1">↑</span> 24 aujourd'hui
            </p>
          </div>

          <div className="card p-6 border-l-4 border-purple-500">
            <h3 className="text-neutral-500 text-sm font-medium uppercase tracking-wider">XP Distribués</h3>
            <p className="text-3xl font-bold text-neutral-800 mt-2">15.4k</p>
            <p className="text-neutral-400 text-sm mt-1">Total cumulé</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Articles */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-neutral-800 mb-4">Articles récents</h2>
            <div className="overflow-x-auto">
              {isLoading ? (
                <p className="text-center py-4">Chargement...</p>
              ) : (
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Titre</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Auteur</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {articles.map((article) => (
                      <tr key={article.id} className="hover:bg-neutral-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-neutral-900">
                          {article.title}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">
                          {article.author?.name || 'Inconnu'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">
                          {new Date(article.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${article.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
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
            <div className="mt-4 text-right">
              <Link href="/admin/articles" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Voir tout →
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-neutral-800 mb-4">Activité récente</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start space-x-3 pb-4 border-b border-neutral-100 last:border-0">
                  <div className="w-8 h-8 rounded-full bg-neutral-200 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-neutral-800">
                      <span className="font-bold">Utilisateur {i}</span> a commenté sur "La révolution..."
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">Il y a {i * 5} minutes</p>
                  </div>
                  <div className="ml-auto text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                    +10 XP
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
