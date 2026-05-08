# Nyumbani Landing Page

> Site vitrine de Nyumbani — la branche exclusive de courtage immobilier et conseil en investissement du groupe ITM, dédiée aux opportunités immobilières les plus prometteuses de Nairobi et d'Afrique.

## 🏠 À propos

**Nyumbani** (qui signifie « maison » en swahili) est un courtier immobilier basé à Nairobi, spécialisé dans l'accompagnement des particuliers, familles, professionnels et investisseurs de la diaspora à travers l'Afrique. Soutenu par **ITM Group** — un conglomérat panafricain présent dans 23 entités en Afrique, en Europe et aux Émirats arabes unis — Nyumbani propose des solutions immobilières transfrontalières de confiance.

La marque opère deux gammes distinctes :

| Gamme | Positionnement | Public cible |
|---|---|---|
| **Nyumbani Platinum** | Premium, luxe, investissement | Investisseurs recherchant des biens haut de gamme |
| **Nyumbani Gold** | Accessible, value-driven | Primo-accédants et investisseurs pragmatiques |

## ✨ Fonctionnalités

- **Landing page bilingue** (Anglais / Français) avec changement de langue dynamique
- **Modal d'enquête interactif** avec sélection de la gamme (Gold ou Platinum) et formulaire de contact
- **Galerie d'appartements** avec lightbox — 5 appartements/services en vitrine (Garden City, Mi Vida, Marcus Garden, Imagine by Benaa)
- **Pages de pricing** détaillées pour les gammes Gold et Platinum
- **Formulaire newsletter** avec endpoint API dédié
- **Animations fluides** via Motion (ex-Framer Motion)
- **Design responsive** optimisé jusqu'à 1600px
- **Optimisation d'images** automatisée (scripts Sharp)

## 🛠️ Stack technique

| Catégorie | Technologie |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Langage | TypeScript 5.9 |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) avec `tw-animate-css` |
| Animations | [Motion](https://motion.dev/) (ex-Framer Motion) |
| Formulaires | React Hook Form + resolvers |
| Icônes | [Lucide React](https://lucide.dev/) |
| Qualité code | ESLint 9 + config Next |
| Déploiement | Firebase (firebase-tools) |
| Traitement images | Sharp |

## 🚀 Démarrer le projet

### Prérequis

- **Node.js** ≥ 20
- **npm** ≥ 10

### Installation

```bash
git clone <url-du-repo>
cd Nyumbani-landing-page
npm install
