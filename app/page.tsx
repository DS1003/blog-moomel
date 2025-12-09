import React from "react";
import ArticleList from "@/app/_components/articles/ArticleList";
import Hero from "@/app/_components/layout/Hero";

// Données de démonstration pour la présentation
const demoArticles = [
  {
    id: "1",
    title: "La révolution de la cosmétique gamifiée en 2025",
    excerpt: "Découvrez comment la gamification transforme l'expérience beauté et engage les utilisateurs dans leur routine cosmétique quotidienne.",
    author: { name: "Dr. Sarah Martin" },
    createdAt: "2024-12-15T10:00:00Z",
    images: [
      { url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop" }
    ]
  },
  {
    id: "2",
    title: "Les innovations technologiques dans le skincare",
    excerpt: "IA, réalité augmentée et capteurs connectés : comment la technologie révolutionne nos soins de la peau.",
    author: { name: "Marie Dubois" },
    createdAt: "2024-12-14T14:30:00Z",
    images: [
      { url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&h=600&fit=crop" }
    ]
  },
  {
    id: "3",
    title: "Gamification et engagement utilisateur",
    excerpt: "Comment les mécaniques de jeu augmentent l'adhérence aux routines beauté et améliorent les résultats.",
    author: { name: "Alexandre Chen" },
    createdAt: "2024-12-13T09:15:00Z",
    images: [
      { url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop" }
    ]
  },
  {
    id: "4",
    title: "L'avenir de la beauté personnalisée",
    excerpt: "Découvrez comment l'IA et les données personnelles créent des expériences beauté sur mesure.",
    author: { name: "Emma Rodriguez" },
    createdAt: "2024-12-12T16:45:00Z",
    images: [
      { url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop" }
    ]
  },
  {
    id: "5",
    title: "Les tendances cosmétiques pour 2025",
    excerpt: "Durabilité, technologie et personnalisation : les trois piliers de la cosmétique de demain.",
    author: { name: "Sophie Laurent" },
    createdAt: "2024-12-11T11:20:00Z",
    images: [
      { url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop" }
    ]
  },
  {
    id: "6",
    title: "Comment Moomel révolutionne l'expérience beauté",
    excerpt: "Plongez dans l'univers Moomel et découvrez notre approche unique de la cosmétique gamifiée.",
    author: { name: "L'équipe Moomel" },
    createdAt: "2024-12-10T13:00:00Z",
    images: [
      { url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&h=600&fit=crop" }
    ]
  }
];

export default async function HomePage() {
  // Utilisation des données de démonstration au lieu de l'API
  const articles = demoArticles;

  return (
    <>
      <Hero />

      {/* Articles Section */}
      <section id="articles" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">
              Nos derniers articles
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Explorez nos contenus sur la cosmétique gamifiée et les innovations beauté
            </p>
          </div>

          {/* Articles Grid */}
          <div className="animate-fade-in">
            <ArticleList articles={articles} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-50 to-primary-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">
              Pourquoi choisir Moomel ?
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Une approche innovante de la cosmétique avec la gamification
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card card-hover p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">Gamification</h3>
              <p className="text-neutral-600">
                Transformez votre routine beauté en expérience ludique et engageante
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card card-hover p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">Innovation</h3>
              <p className="text-neutral-600">
                Découvrez les dernières innovations en cosmétique et technologie
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card card-hover p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">Communauté</h3>
              <p className="text-neutral-600">
                Rejoignez une communauté passionnée de beauté et de cosmétique
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

