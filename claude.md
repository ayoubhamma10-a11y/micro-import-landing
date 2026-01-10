# CLAUDE.md - Documentation Micro-Import Elite Landing Page

## Vue d'ensemble

Landing page pour une application de gestion d'importation sous le décret 080101 algérien. L'objectif est de collecter des inscriptions à une liste d'attente (waitlist) pour le lancement de l'application.

---

## Stack Technique

| Technologie | Version | Usage |
|-------------|---------|-------|
| React | 18.x | Framework UI |
| TypeScript | 5.x | Typage statique |
| Vite | 5.0 | Build tool & dev server |
| Tailwind CSS | 3.4 | Styling utilitaire |
| Shadcn/ui | - | Composants UI réutilisables |
| React Hook Form | 7.49 | Gestion formulaires |
| Zod | 3.22 | Validation de schémas |
| Supabase | - | Base de données PostgreSQL |
| Lucide React | 0.312 | Icônes |

---

## Structure du Projet

```
micro-import-landing/
├── src/
│   ├── components/
│   │   ├── ui/                    # Composants Shadcn/ui
│   │   │   ├── button.tsx         # Bouton avec variantes
│   │   │   ├── card.tsx           # Conteneur carte
│   │   │   ├── checkbox.tsx       # Case à cocher
│   │   │   ├── input.tsx          # Champ de saisie
│   │   │   ├── label.tsx          # Label accessible
│   │   │   └── radio-group.tsx    # Groupe de boutons radio
│   │   ├── WaitlistForm.tsx       # Formulaire inscription (5 étapes)
│   │   ├── SpotsCounter.tsx       # Compteur de places disponibles
│   │   └── SuccessScreen.tsx      # Écran de confirmation
│   ├── lib/
│   │   ├── supabase.ts            # Client Supabase
│   │   ├── schema.ts              # Schémas Zod + options formulaire
│   │   └── utils.ts               # Utilitaires (cn)
│   ├── App.tsx                    # Page principale
│   ├── main.tsx                   # Point d'entrée React
│   └── index.css                  # Styles globaux + animations
├── supabase/
│   └── waitlist.sql               # Schéma SQL + triggers
├── tailwind.config.js             # Configuration Tailwind étendue
├── vite.config.ts                 # Configuration Vite
└── package.json                   # Dépendances
```

---

## Composants Principaux

### 1. App.tsx - Page Principale

**Fichier**: `src/App.tsx`

Page landing complète avec toutes les sections. Gère l'état global et les animations au scroll.

#### États React

```typescript
const [isSuccess, setIsSuccess] = useState(false)     // Affiche SuccessScreen après inscription
const [openFaq, setOpenFaq] = useState<number | null>(null)  // FAQ accordion
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)  // Menu mobile
```

#### Hook useScrollAnimation

Custom hook utilisant Intersection Observer pour déclencher les animations au scroll.

```typescript
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  // Observer avec threshold 0.1 et rootMargin "-50px"
  // Ajoute l'ID de la section visible au Set
}
```

#### Sections de la Page

| Section | ID | Description |
|---------|-----|-------------|
| Header | - | Navigation sticky avec logo et CTA |
| Hero | `#waitlist` | Proposition de valeur + badge SpotsCounter |
| Problème | `#problem-section` | 3 points de douleur des importateurs |
| Solution | `#solution-section` | 4 fonctionnalités clés de l'app |
| Comment ça marche | `#how-section` | Processus en 3 étapes |
| Témoignages | `#testimonials-section` | 3 avis utilisateurs |
| Réglementation | `#regulation-section` | Détails décret 080101 |
| FAQ | `#faq-section` | 5 questions fréquentes |
| CTA | - | Appel à l'action final |
| Footer | - | Liens, contact, copyright |

---

### 2. WaitlistForm.tsx - Formulaire d'Inscription

**Fichier**: `src/components/WaitlistForm.tsx`

Formulaire multi-étapes pour collecter les données des prospects.

#### Champs du Formulaire

| Étape | Champ | Type | Options |
|-------|-------|------|---------|
| 1 | `email` | Input email | Validation format email |
| 2 | `profil` | Radio | debutant, quelques_voyages, actif_regulier |
| 3 | `marches` | Checkbox[] | chine, turquie, emirats, europe, autre |
| 4 | `budget` | Radio | moins_2000 → 10000_12000 (EUR) |
| 5 | `investissement` | Radio | moins_500 → plus_2000 (DA/mois) |

#### Validation Zod

```typescript
// src/lib/schema.ts
export const waitlistSchema = z.object({
  email: z.string().email("Email invalide"),
  profil: z.enum(["debutant", "quelques_voyages", "actif_regulier"]),
  marches: z.array(z.string()).min(1, "Sélectionnez au moins un marché"),
  budget: z.enum(["moins_2000", "2000_4000", "4000_6000", "6000_8000", "8000_10000", "10000_12000"]),
  investissement: z.enum(["moins_500", "500_1000", "1000_2000", "plus_2000"])
})
```

#### Gestion des Erreurs

- **Email dupliqué**: Code erreur Supabase `23505` → Message personnalisé
- **Validation temps réel**: Erreurs affichées sous chaque champ
- **État de chargement**: Spinner pendant la soumission

---

### 3. SpotsCounter.tsx - Compteur de Places

**Fichier**: `src/components/SpotsCounter.tsx`

Affiche le nombre de places restantes en temps réel depuis Supabase.

#### Props

```typescript
interface SpotsCounterProps {
  className?: string
  variant?: 'badge' | 'card'  // badge = inline, card = complet
}
```

#### Logique

- **Limite totale**: 500 places
- **Refresh**: Toutes les 30 secondes (setInterval)
- **Source données**: Vue `waitlist_stats` Supabase

#### Niveaux d'Urgence

| Places restantes | Niveau | Couleur | Message |
|-----------------|--------|---------|---------|
| < 100 | High | Rouge | "Presque complet" |
| 100-200 | Medium | Orange/Accent | - |
| > 200 | Low | Bleu primary | - |

---

### 4. SuccessScreen.tsx - Écran de Confirmation

**Fichier**: `src/components/SuccessScreen.tsx`

Affiché après inscription réussie.

#### Contenu

- Salutation arabe: "مرحبا بك" (Marhaba bik)
- Prochaines étapes (email de confirmation, invitation, vérifier spam)
- Assurance confidentialité
- Animation de célébration

---

## Composants UI (Shadcn/ui)

Tous dans `src/components/ui/`:

| Composant | Fichier | Description |
|-----------|---------|-------------|
| Button | `button.tsx` | Bouton avec variantes (default, destructive, outline, secondary, ghost, link) |
| Input | `input.tsx` | Champ texte avec focus ring |
| Label | `label.tsx` | Label accessible Radix UI |
| Checkbox | `checkbox.tsx` | Case à cocher Radix UI |
| RadioGroup | `radio-group.tsx` | Groupe radio Radix UI |
| Card | `card.tsx` | Conteneur avec Header, Title, Content, Footer |

---

## Base de Données Supabase

### Table: `waitlist`

```sql
CREATE TABLE public.waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    profil TEXT,
    marches TEXT[],
    budget TEXT,
    investissement TEXT,
    created_at TIMESTAMP DEFAULT now(),
    email_sent BOOLEAN DEFAULT false,
    notes TEXT
);
```

### Index

```sql
CREATE INDEX idx_waitlist_email ON public.waitlist(email);
CREATE INDEX idx_waitlist_created_at ON public.waitlist(created_at);
```

### Vue: `waitlist_stats`

```sql
CREATE VIEW waitlist_stats AS
SELECT
    COUNT(*) as total_inscrits,
    COUNT(*) FILTER (WHERE profil = 'debutant') as debutants,
    COUNT(*) FILTER (WHERE profil = 'quelques_voyages') as intermediaires,
    COUNT(*) FILTER (WHERE profil = 'actif_regulier') as actifs,
    COUNT(*) FILTER (WHERE 'chine' = ANY(marches)) as marche_chine,
    -- ... autres stats
    COUNT(*) as total_subscribers,
    COUNT(*) FILTER (WHERE created_at > now() - interval '7 days') as last_7d
FROM public.waitlist;
```

### Sécurité RLS

```sql
-- Lecture: service role uniquement
-- Écriture: public (pour le formulaire)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for public" ON public.waitlist
    FOR INSERT WITH CHECK (true);
```

### Trigger Notification

```sql
CREATE FUNCTION notify_new_signup() RETURNS trigger AS $$
BEGIN
    PERFORM pg_notify('new_signup', row_to_json(NEW)::text);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_waitlist_signup
    AFTER INSERT ON public.waitlist
    FOR EACH ROW EXECUTE FUNCTION notify_new_signup();
```

---

## Styling & Design System

### Palettes de Couleurs

```javascript
// tailwind.config.js
colors: {
  primary: { 50-950 }    // Indigo - couleur principale
  secondary: { 50-950 }  // Slate - texte/neutres
  accent: { 50-950 }     // Amber/Gold - accents premium
  elite: { 50-950 }      // Violet - branding elite
  destructive: {}        // Rouge - erreurs
}
```

### Classes CSS Personnalisées

#### Gradients

| Classe | Usage |
|--------|-------|
| `.hero-gradient` | Background hero avec overlays animés |
| `.elite-dark-gradient` | Background premium foncé |
| `.gradient-bg` | Gradient léger pour sections |
| `.animated-gradient` | Gradient multicolore animé (8s) |
| `.gold-shimmer` | Effet brillant doré sur texte |

#### Effets Cartes

| Classe | Effet |
|--------|-------|
| `.glass-card` | Glassmorphism (blur + transparence) |
| `.glass-card-dark` | Variante sombre |
| `.card-hover` | Élévation au hover (-translate-y-2) |
| `.card-hover-glow` | Effet lueur au hover |

#### Boutons

| Classe | Style |
|--------|-------|
| `.btn-elite` | Gradient avec animation shine |
| `.btn-gold` | Bouton doré avec shine |

#### Animations

| Classe | Description |
|--------|-------------|
| `.floating` | Flottement vertical |
| `.animate-fade-in` | Fondu apparition (0.6s) |
| `.animate-fade-in-up` | Slide up + fondu |
| `.animate-scale-in` | Scale + fondu |

---

## Configuration

### Variables d'Environnement

```env
# .env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anonymous-key
```

### Vite Config

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### Scripts NPM

```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext ts,tsx"
}
```

---

## Fonctionnalités Clés

### 1. Inscription Waitlist

- Formulaire 5 étapes avec validation Zod
- Détection email dupliqué
- Messages d'erreur contextuels
- État de chargement avec spinner
- Écran de confirmation post-inscription

### 2. Compteur de Places Temps Réel

- Sync avec Supabase toutes les 30s
- Indicateurs d'urgence visuels
- Barre de progression
- Variantes badge/card

### 3. Animations au Scroll

- Intersection Observer
- Fade-in progressif des sections
- Animations staggered pour enfants

### 4. Design Responsive

- Mobile-first
- Menu hamburger mobile
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Typography adaptive

### 5. Navigation

- Header sticky
- Liens anchor smooth scroll
- Menu mobile toggle
- CTA multiples

---

## Contenu Métier

### Décret 080101

L'application aide les importateurs algériens à respecter le décret 080101:

- **Plafond annuel**: 1.800.000 DA
- **Droits de douane**: 5%
- **IFU**: 0.5%

### Problèmes Résolus

1. **Calculs manuels fastidieux** → Calculs automatiques
2. **Risque de dépasser le plafond** → Alertes intelligentes
3. **Paperasse chronophage** → Génération de rapports

### Proposition de Valeur

- Calculateur automatique DA/EUR
- Alertes proches du plafond
- Analyse rentabilité par produit
- Mode hors-ligne
- Support arabe

---

## Internationalisation

- **Langue principale**: Français
- **Support secondaire**: Arabe
  - Salutation success screen: "مرحبا بك"
  - Police: Noto Sans Arabic
  - Mention "Support en arabe"

---

## Développement

### Lancer en Local

```bash
npm install
npm run dev
```

### Build Production

```bash
npm run build
npm run preview
```

### Déploiement

Compatible Netlify, Vercel, ou tout hébergeur statique.

Variables d'environnement à configurer:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## Architecture des Données

```
┌─────────────────┐     ┌──────────────────┐
│   WaitlistForm  │────▶│  Supabase        │
│   (React)       │     │  PostgreSQL      │
└─────────────────┘     └──────────────────┘
                               │
                               ▼
                        ┌──────────────────┐
                        │  waitlist table  │
                        │  - email         │
                        │  - profil        │
                        │  - marches[]     │
                        │  - budget        │
                        │  - investissement│
                        └──────────────────┘
                               │
                               ▼
┌─────────────────┐     ┌──────────────────┐
│  SpotsCounter   │◀────│  waitlist_stats  │
│  (React)        │     │  (view)          │
└─────────────────┘     └──────────────────┘
```

---

## Points d'Attention

1. **Validation côté client uniquement** - Ajouter validation serveur si nécessaire
2. **RLS Supabase** - Insert public, Read service role only
3. **Refresh SpotsCounter** - 30s interval, peut être ajusté
4. **Animations** - Désactivables via `prefers-reduced-motion`

---

## Résumé

| Aspect | Détail |
|--------|--------|
| **Type** | Landing page waitlist |
| **Framework** | React 18 + TypeScript |
| **Styling** | Tailwind CSS + Shadcn/ui |
| **Database** | Supabase PostgreSQL |
| **Formulaire** | 5 étapes, React Hook Form + Zod |
| **Langue** | Français + support Arabe |
| **Responsive** | Mobile-first |
| **Animations** | Scroll-based + CSS keyframes |
