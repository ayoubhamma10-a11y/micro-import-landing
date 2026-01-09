# Micro-Import Elite - Landing Page

Landing page pour la collecte des inscriptions à la liste d'attente de Micro-Import Elite.

## Stack Technique

- **React 18** + **Vite** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **React Hook Form** + **Zod** (validation)
- **Supabase** (base de données)

## Installation

```bash
# Cloner le repo
git clone https://github.com/ton-username/micro-import-landing.git
cd micro-import-landing

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Configurer les variables Supabase dans .env
# VITE_SUPABASE_URL=https://ton-projet.supabase.co
# VITE_SUPABASE_ANON_KEY=ta-cle-anon

# Lancer en développement
npm run dev
```

## Configuration Supabase

1. Créer un nouveau projet sur [Supabase](https://supabase.com)
2. Aller dans **SQL Editor**
3. Exécuter le contenu de `supabase/waitlist.sql`
4. Copier l'URL et la clé anon depuis **Settings > API**
5. Les coller dans le fichier `.env`

## Déploiement Netlify

1. Connecter le repo GitHub à Netlify
2. Configurer les variables d'environnement :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Build command : `npm run build`
4. Publish directory : `dist`

## Structure du Projet

```
micro-import-landing/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/              # Composants shadcn/ui
│   │   ├── WaitlistForm.tsx # Formulaire principal
│   │   └── SuccessScreen.tsx
│   ├── lib/
│   │   ├── supabase.ts      # Client Supabase
│   │   ├── schema.ts        # Validation Zod
│   │   └── utils.ts
│   ├── App.tsx              # Landing page
│   ├── main.tsx
│   └── index.css
├── supabase/
│   └── waitlist.sql         # Migration SQL
└── package.json
```

## Données Collectées

| Champ | Description |
|-------|-------------|
| email | Adresse email |
| profil | Débutant / Quelques voyages / Actif régulier |
| marches | Pays d'approvisionnement (multi-select) |
| budget | Tranche de budget par voyage (EUR) |
| investissement | Investissement mensuel accepté (DA) |

## Email de Bienvenue

Pour configurer l'envoi automatique d'emails :

1. Créer une Edge Function Supabase
2. Utiliser Resend ou SendGrid
3. Connecter au trigger `on_waitlist_signup`

---

Conçu pour les micro-importateurs algériens 🇩🇿
