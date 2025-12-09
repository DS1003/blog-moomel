# 💄 TrMoomel — Blog Cosmétique Gamifié

## 📋 C'est quoi Moomel ?

Moomel est un **blog de cosmétique Bio Made In Sénégal** où les filles peuvent :
- **Lire des articles** sur les tendances cosmétiques et routines beauté
- **Commenter et discuter** avec d'autres filles
- **Liker leurs articles préférés**
- **Gagner des points (XP) et des badges** en interagissant avec la communauté
- **Monter en niveau** au fur et à mesure qu'elles participent

C'est comme un **jeu social** : plus tu commente, plus tu like, plus tu gagne de récompenses ! 🏆

---

## 👥 Qui fait quoi ?

### Les utilisatrices
- Créent un compte
- Lisent les articles beauté postés par d'autres
- Écrivent des commentaires et des conseils
- Likent les articles qu'elles aiment
- Sauvegardent leurs favoris
- Montent en niveau en gagnant des XP
- Partagent les articles

### L'admin (toi ou quelqu'un de confiance)
- Crée les articles principaux (pouvoir les publier modifier archivés ou supprimer)
- Modère les commentaires
- Gère les comptes utilisateurs

### Le système (site)
- Enregistre tous les articles, commentaires, likes
- Calcule les points (XP) et les niveaux
- Attribue les badges (Nouveau, Commentateur, Expert Beauté, etc.)
- Gère l'authentification (login/logout)

---

## ✨ Les fonctionnalités principales

| Fonctionnalité | Qu'est-ce que c'est ? |
|---|---|
| **Articles** | Blog posts sur la beauté, cosmétique, routines |
| **Commentaires** | Les filles discutent sous chaque article |
| **Likes** | Les filles likent les articles qu'elles aiment |
| **Système d'XP** | Gain de points à chaque action (commenter = +10 XP, liker = +5 XP, etc.) |
| **Niveaux** | Plus d'XP = montée de niveau (1, 2, 3... 10+) |
| **Badges** | Récompenses visuelles (Nouveau, Commentateur, Likeur, Expert Beauté, Influenceur) |
| **Authentification** | Login sécurisé (email/password ou réseaux sociaux) |
| **Profil utilisateur** | Affiche ta photo, ton XP, ton niveau, tes badges |
| **Sauvegarde (Bookmarks)** | Sauvegarde tes articles préférés |

---

## 🏗️ Comment c'est construit ? (Architecture simple)

```
┌─────────────────────────────────────────────────────┐
│         Interface Web (ce qu'on voit)               │
│  - Pages d'accueil, articles, profil, commentaires  │
│  - Formulaires pour commenter, liker                │
└─────────────────┬───────────────────────────────────┘
                  │
                  ↓ (Appels)
┌─────────────────────────────────────────────────────┐
│         API / Backend (ce qui fait le travail)      │
│  - Créer/lire articles                              │
│  - Ajouter commentaires                             │
│  - Calculer XP et niveaux                           │
│  - Valider l'authentification                       │
└─────────────────┬───────────────────────────────────┘
                  │
                  ↓ (Stockage)
┌─────────────────────────────────────────────────────┐
│    Base de données (Postgres / Neon)                │
│  - Profils utilisateurs                             │
│  - Articles et images                               │
│  - Commentaires                                     │
│  - XP et badges                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ Technologies utilisées

- **Next.js** — framework pour faire un site web et une API
- **React** — pour l'interface (boutons, formulaires, pages)
- **TypeScript** — pour coder sans erreurs
- **Prisma** — pour gérer la base de données
- **PostgreSQL (Neon)** — stocke toutes les données
- **NextAuth** — gère la connexion/sécurité
- **Cloudinary** — héberge les images
- **TailwindCSS** — pour le design des pages

---

## 🎨 Design et visuel

- **Logo Moomel** : `https://moomel.sn/wp-content/uploads/2024/12/Logo-512-4.png`
- **Badges badges** (icônes Flaticon) : cœurs, étoiles, couronnes pour les récompenses
- **Responsive** : fonctionne sur téléphone, tablette, ordinateur

---

## 🚀 Pour démarrer (dev local)

1. Installer les dépendances :
   ```bash
   npm install
   ```

2. Générer la base de données :
   ```bash
   npx prisma generate
   ```

3. Lancer le serveur :
   ```bash
   npm run dev
   ```

4. Ouvrir `http://localhost:3000` dans le navigateur

---

## 💡 Exemple de flux utilisateur

1. **Alice** se crée un compte
2. Elle lit l'article "Routine beauté d'été" → **+5 XP**
3. Elle écrit un commentaire "Super conseil !" → **+10 XP**
4. Elle like l'article → **+5 XP**
5. Après plusieurs interactions → elle monte de niveau et gagne le badge "Commentateur" 🏆

---

## 📁 Structure du projet (simplifié)

```
blog-moomel/
├── app/                    # Pages et composants (UI)
│   ├── page.tsx           # Accueil
│   ├── article/[id]/      # Page d'un article
│   ├── admin/             # Zone admin
│   └── api/               # API (commentaires, likes, etc.)
├── lib/                    # Outils réutilisables
│   ├── prisma.ts          # Connexion BD
│   └── cloudinary.ts      # Gestion des images
├── prisma/                # Configuration BD
│   └── schema.prisma      # Modèle des données
└── README.md              # Ce fichier
```

---

## 🎯 Cas d'usage réels

- **Pour toi** : montrer à ta sœur ce que tu fais comme développeur ✨
- **Pour les filles** : consulter des conseils beauté, partager leur avis, gagner des récompenses
- **Pour la communauté** : créer une plateforme d'échange bienveillante sur la beauté

---

**Voilà ! 🎉 Moomel est un blog beauté + un jeu d'engagement communautaire. Simple, fun et efficace !**# 🎨 Moomel Blog - Design 2025

Un blog moderne et épuré dédié à la cosmétique gamifiée, conçu avec les dernières tendances UI/UX de 2025.

## ✨ Caractéristiques du Design

### 🎯 Design Moderne 2025
- **Glassmorphism** : Effets de transparence et flou sophistiqués
- **Gradients subtils** : Palette de couleurs moderne et harmonieuse
- **Animations fluides** : Transitions et micro-interactions élégantes
- **Typography moderne** : Hiérarchie claire avec Inter font
- **Responsive design** : Optimisé pour tous les appareils

### 🎨 Palette de Couleurs
- **Primary** : Bleu moderne (#0ea5e9) avec variations
- **Accent** : Rose/violet (#d946ef) pour les accents
- **Neutral** : Gris sophistiqués pour le texte et les fonds
- **Gradients** : Combinaisons harmonieuses primary-accent

### 🚀 Composants Modernes
- **Navigation** : Navbar avec glassmorphism et scroll effects
- **Cards** : Design épuré avec hover effects et animations
- **Boutons** : Système de boutons cohérent avec variantes
- **Footer** : Footer moderne avec liens sociaux et navigation

## 🛠️ Technologies Utilisées

- **Next.js 14** : Framework React moderne
- **TypeScript** : Typage statique pour la robustesse
- **Tailwind CSS** : Framework CSS utilitaire
- **NextAuth.js** : Authentification sécurisée
- **Prisma** : ORM pour la base de données

## 🎨 Composants UI

### Button Component
```tsx
<Button variant="primary" size="lg" href="/articles">
  Découvrir les articles
</Button>
```

### LoadingSpinner Component
```tsx
<LoadingSpinner size="md" text="Chargement..." />
```

### ArticleCard Component
- Design moderne avec images
- Effets hover sophistiqués
- Indicateurs de métadonnées
- Animations fluides

## 🎯 Fonctionnalités Design

### Navigation
- **Navbar fixe** avec glassmorphism
- **Logo officiel Moomel** intégré
- **Menu responsive** avec animations
- **Effets de scroll** dynamiques

### Page d'Accueil
- **Hero section** avec logo animé
- **Gradients de fond** sophistiqués
- **Sections features** avec cards modernes
- **Animations d'entrée** fluides

### Articles
- **Grid responsive** élégante
- **Cards avec hover effects**
- **Images optimisées** avec Next.js Image
- **Métadonnées stylisées**

## 🚀 Installation et Démarrage

```bash
# Installation des dépendances
npm install

# Configuration de la base de données
npx prisma generate
npx prisma db push

# Démarrage du serveur de développement
npm run dev
```

## 🎨 Personnalisation

### Couleurs
Modifiez `tailwind.config.js` pour ajuster la palette :
```js
colors: {
  primary: {
    500: '#0ea5e9', // Couleur principale
    // ... autres variations
  },
  accent: {
    500: '#d946ef', // Couleur d'accent
    // ... autres variations
  }
}
```

### Animations
Les animations sont définies dans `tailwind.config.js` :
- `fade-in` : Apparition en fondu
- `slide-up` : Glissement vers le haut
- `scale-in` : Zoom d'entrée
- `float` : Animation de flottement

## 📱 Responsive Design

Le design s'adapte parfaitement à tous les écrans :
- **Mobile** : Navigation hamburger, grille 1 colonne
- **Tablet** : Grille 2 colonnes, navigation adaptée
- **Desktop** : Grille 3 colonnes, navigation complète

## 🎯 Performance

- **Images optimisées** avec Next.js Image
- **Lazy loading** automatique
- **CSS optimisé** avec Tailwind
- **Animations performantes** avec CSS transforms

## 🔧 Configuration

### Variables d'Environnement
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=your-database-url
```

### Images Externes
Configuration pour le domaine `moomel.sn` dans `next.config.ts`

## 🎨 Identité Visuelle

- **Logo officiel** : Intégré dans la navbar et le footer
- **Couleurs cohérentes** : Palette harmonieuse dans tout le site
- **Typography** : Inter font pour une lisibilité optimale
- **Espacement** : Système de spacing cohérent

## 🚀 Déploiement

Le blog est prêt pour le déploiement sur :
- Vercel (recommandé)
- Netlify
- AWS Amplify
- Tout autre plateforme supportant Next.js

---

**Fait avec ❤️ pour la cosmétique gamifiée** 🎨✨
