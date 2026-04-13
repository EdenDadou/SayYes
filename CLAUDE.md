# SayYes - Guide projet complet

## Vue d'ensemble

Site vitrine / portfolio de l'agence **SayYes** (La Sainte Paire). Application full-stack Remix avec un back-office admin pour la gestion des portfolios et landing pages dynamiques.

- **Client** : Javier / La Sainte Paire
- **Email contact** : javier@lasaintepaire.com
- **VPS production** : OVH (141.95.53.183, port SSH 49999, user debian)
- **Langue UI** : Francais

## Stack technique

| Couche          | Technologie                               |
| --------------- | ----------------------------------------- |
| Framework       | Remix v2.14 (Vite plugin, flat routes)    |
| Frontend        | React 18.2, TypeScript 5.1                |
| Styling         | Tailwind CSS 3.4 + PostCSS + Autoprefixer |
| Base de donnees | SQLite via Prisma v6.16.1                 |
| Animations      | Framer Motion 11.11, Three.js 0.169       |
| Images          | Sharp 0.34 (optimisation server-side)     |
| Email           | Nodemailer 7.0 + Brevo SMTP               |
| Scroll          | Lenis (smooth scroll, desktop uniquement) |
| PWA             | vite-plugin-pwa (auto-update, 50MB cache) |
| Process         | PM2 (production)                          |
| CI/CD           | GitHub Actions -> SSH deploy sur VPS      |
| Linting         | ESLint 8 + Prettier 3.6                   |

## Commandes essentielles

```bash
# Developpement
npm run dev              # Serveur dev port 4000 (nettoie caches avant)
npm run dev:clean        # Nettoie build/, .cache/, .vite-dev-cache/

# Build & Production
npm run build            # Build Vite production (+ prisma generate en postbuild)
npm start                # Serveur prod via remix-serve

# Base de donnees
npm run db:studio        # Prisma Studio (GUI)
npm run db:setup         # prisma generate + prisma db push
npm run db:migrate       # prisma migrate deploy
npm run db:reset         # prisma db push --force-reset (DESTRUCTIF)
npm run db:baseline      # Fix migrations P3005

# Qualite de code
npm run lint             # ESLint (cache dans node_modules/.cache/eslint)
npm run lint:fix         # ESLint --fix
npm run format           # Prettier --write
npm run format:check     # Prettier --check
npm run typecheck        # tsc --noEmit

# Utilitaires
npm run icons            # Genere composants React depuis SVG (app/assets/icons/svg -> app/assets/icons/)
npm run deploy:setup     # npm install + db:setup + build
```

## Architecture du projet

```
app/
  routes/                        # Remix flat routes (remix-flat-routes)
    _index.tsx                   # Page d'accueil (10 sections)
    $slug.tsx                    # Landing pages dynamiques (catch-all)
    solutions.tsx                # Page solutions (parallax)
    admin+/
      _index.tsx                 # Login admin
      dashboard.tsx              # Tableau de bord (stats, quick actions)
      manage-portfolio+/
        _index.tsx               # Liste + creation portfolios
        $slug.tsx                # Edition portfolio
      manage-landing-page+/
        _index.tsx               # Liste + creation landing pages
        $slug.tsx                # Edition landing page
      migrate-methods-title.tsx  # Migration one-off
    api+/
      contact.tsx                # POST: envoi email via Brevo
      media.tsx                  # GET/POST/DELETE: gestion medias
      portfolios.tsx             # GET: liste portfolios, DELETE: suppression
      portfolios.$id.tsx         # GET/PUT/DELETE: portfolio par ID
      portfolios.slug.$slug.tsx  # GET: portfolio par slug
      image.ts                   # GET: optimisation images (cache L1+L2)
    portfolio+/
      _index.tsx                 # Grille portfolios + filtres
      $slug.tsx                  # Detail projet (staged loading desktop)
    mention-legale+/_index.tsx   # Mentions legales
    uploads.$.tsx                # Catch-all pour servir fichiers uploades

  server/                        # Logique backend (.server.ts)
    db.server.ts                 # Singleton PrismaClient (global.__db__ en dev)
    auth.server.ts               # Session cookie (__session, 7j, httpOnly)
                                 # verifyCredentials, createUserSession, requireAuth, logout
    portfolio.server.ts          # CRUD portfolios, types (PortfolioData, BentoItem, BentoLine)
                                 # isSlugUnique, create/update/delete, getPublicPortfolios
    media.server.ts              # Upload fichiers (public/uploads/), validation type/taille
                                 # saveMedia, deleteMedia (fichier + DB)
    landing-page.server.ts       # CRUD landing pages, 11 types de blocs
                                 # migrateBlocMethodsTitleToLineTitle()
    index.ts                     # Re-exports

  components/
    Admin/
      FormulaireAdmin/           # Formulaire portfolio (onglets general/seo)
        index.tsx                # Composant principal
        useFormulaireState.ts    # Hook de state formulaire
        BentoSection.tsx         # Editeur grille bento
        GeneralInfoSection.tsx   # Infos generales
        LivrablesSection.tsx     # Livrables
        SousTitreSection.tsx     # Sous-titre
        TemoignageSection.tsx    # Temoignage
        SEOSection.tsx           # Meta tags
        HiddenInputs.tsx         # Champs hidden FormData
      BentoEditor/               # Editeur drag-and-drop grille bento
      InputAdmin/                # Input multi-type (text, textarea, color, file, select, rich-text)
      LandingPage/
        BlocEditor.tsx           # Editeur de bloc (collapsible, drag)
        LandingPageForm.tsx      # Formulaire landing page
        editors/                 # Editeurs par type de bloc (12 editeurs)

    Screens/
      Homepage/                  # Sections page d'accueil
        IntroSection.tsx         # Hero video + animations
        TitleCards/              # Cartes de services
        RowTitlePicture.tsx      # Texte + image
        BigTemoignage.tsx        # Grand temoignage
        CarrouselCard.tsx        # Carrousel de cartes
        TitleFullWidthCard.tsx   # Section pleine largeur
        TemoignagesCards.tsx     # Plusieurs temoignages
        HomeProjectCarousel.tsx  # Carrousel projets
        TitleStepImage.tsx       # Etapes avec images
      Portfolio/                 # Page listing portfolio
      PortfolioProject/          # Page detail projet
      ModalContact/              # Modale formulaire contact
      404/                       # Pages 404

    Card/                        # Composants carte
      index.tsx                  # Card de base (memo)
      ParallaxCard.tsx           # Carte parallax au scroll (useTransform)
      AnimatedCard.tsx           # Carte animee snap
      components/
        ContentPortfolio.tsx     # Contenu carte portfolio
        Solution/                # Contenu carte solution

    Layout/
      Desktop.tsx                # Layout desktop (AnimatePresence transitions)
      Mobile.tsx                 # Layout mobile

    LandingPage/
      BlocRenderer.tsx           # Switch type -> composant (11 types)
      BlocIntroFront.tsx         # Hero landing page
      BlocCardsFront.tsx         # Cartes comparaison
      BlocOffresFront.tsx        # Cartes offres/prix
      BlocMethodsFront.tsx       # Methodes
      BlocChiffresClesFront.tsx  # Chiffres cles
      BlocFAQFront.tsx           # FAQ accordion
      BlocEtapeFront.tsx         # Etapes
      BlocTestimonialFront.tsx   # Temoignages
      BlocFooterFront.tsx        # Footer custom
      BlocUseCaseFront.tsx       # Portfolio showcase
      BlocCommentaireClientFront.tsx  # Citation client
      BlocSeparatorFront.tsx     # Separateur
      AnimatedTitle.tsx          # Titre anime

    Header/                      # Header desktop (scroll-aware, spring physics)
      components/MenuMobile.tsx  # Menu burger mobile
      assets/AnimatedBurgerMenu.tsx
    Footer/                      # Footer (animations, social links)
    Button/                      # Boutons (plain, transparent, mobile, border)
    AnimatedText/                # Reveal mot par mot au scroll
    FadeInView/                  # Fade-in intersection observer
    BrandBanner/                 # Banniere defilante logos
    LoadingBar/                  # Barre de progression
    ui/OptimizedImage.tsx        # Image responsive (srcset, blur placeholder, lazy)
    icons/                       # Icones React (DeleteIcon, LoadingIcon, FileIcon, etc.)

  contexts/
    PortfolioContext.tsx          # State global portfolios, filtres, fetch /api/portfolios
    ScrollLockContext.tsx         # Verrouillage scroll (modales)
    ModalContactContext.tsx       # Ouverture modale contact

  utils/
    hooks/
      useViewport.tsx            # Detection mobile (userAgent + width < 768px) -> boolean | null
      useSmoothScroll.tsx        # Lenis smooth scroll (desktop only)
      useScrollProgress.tsx      # Animation scroll lock (opacity, scale, progress 0-2)
      useIntroTimer.tsx          # Timer intro video (1x/jour via localStorage)
      useFooterVisibility.tsx    # IntersectionObserver footer (30% threshold)
      useFooterMotion.tsx        # Animations footer (useScroll + useTransform)
      useMetaData.ts             # Meta tags dynamiques (og:, twitter:, JSON-LD)
      useReducedMotion.tsx       # prefers-reduced-motion + mobile detection
    admin/
      manage-portfolio-types.ts  # Types client (BentoLine, BentoItem, BENTO_FORMATS)
      portfolio-form-handlers.ts # Factory createFormHandlers() pour formulaires
      portfolio-edit-handlers.ts # Handlers edition (extends create handlers)
      manage-portfolio.ts        # Extraction FormData, validation, upload, utilitaires
    optimizeImage.ts             # getOptimizedImageUrl(), generateSrcSet(), tailles responsive
    ui/ui.tsx                    # cn() = clsx + tailwind-merge

  types/
    landing-page.ts              # Types blocs landing page (11 types), LandingPageSEO,
                                 # createEmptyBloc(), BLOC_TYPES constant

  styles/
    index.css                    # Aggrege tous les CSS
    tailwind.css                 # Directives Tailwind + variables CSS
    border.css                   # Utilitaires bordure (border-custom, border-custom-thin)
    texture.css                  # Effets texture
    footer.css                   # Styles footer
    animations/
      holographic.css            # Effets holographiques
      halo.css                   # Effets halo/glow
      gradient.css               # Animations gradient
      line.css                   # Animations ligne
      scroll.css                 # Animations scroll

  assets/icons/                  # SVG -> composants React (40+ icones)
  entry.server.tsx               # SSR (bot: onAllReady, browser: onShellReady, abort 5s)
  entry.client.tsx               # Hydration + Service Worker registration
  root.tsx                       # <html lang="fr">, ScrollLockProvider + PortfolioProvider

prisma/
  schema.prisma                  # SQLite, 4 modeles, enum MediaType
  migrations/                    # 12 migrations
  dev.db                         # Base locale

public/uploads/                  # Fichiers uploades (gitignore)
scripts/fix-prisma-baseline.sh   # Fix P3005 baseline
ecosystem.config.cjs             # PM2 config (remix-app, port 4000, 1GB max)
```

## Modeles de donnees (Prisma)

### Portfolio

- `id` (CUID), `titre`, `slug` (unique), `couleur`
- Photos : `photoCouverture`, `photoMain` (+ alt), `metaImage`
- Contenu : `description`, `kicker`, `sousTitre`, `topTitle`
- JSON : `categories` (string[]), `temoignage` ({text, author, role, entreprise}), `livrable` (string[]), `bento` (BentoItem[])
- SEO : `metaTitle`, `metaDescription`, `schemaOrg`
- Relations : `medias[]` (cascade delete)
- Timestamps : `createdAt`, `updatedAt`

### Media

- `id`, `filename`, `originalName`, `mimetype`, `size`, `path`, `url`
- `type` : enum IMAGE | VIDEO | DOCUMENT
- `portfolioId` (nullable, cascade on delete)

### Solution

- `id`, `titre`, `description`, `image?`, timestamps

### LandingPage

- `id`, `title`, `slug` (unique), `color` (default #000000)
- `seo` : JSON {metaTitle, metaDescription, schemaOrg}
- `blocs` : JSON array de 11 types possibles
- Timestamps

### Types de blocs Landing Page

`blocIntro`, `cards`, `chiffresCles`, `commentaireClient`, `methods`, `testimonial`, `etape`, `faq`, `footer`, `useCase`, `separator`

### BentoItem / BentoLine

- BentoLine : `format` (1/3-2/3 | 2/3-1/3 | 3 square | banner | 2 square | full) + `listImage[]`, `listImageAlt[]`
- BentoItem : `lines: BentoLine[]`
- Max 10 lignes par bento, max 40MB par fichier

## Authentification

- Cookie session Remix `__session` (httpOnly, 7j, secure en prod, sameSite: lax)
- Credentials via `ADMIN_LOGIN` / `ADMIN_PASSWORD` (env vars)
- `requireAuth(request)` dans loaders/actions des routes admin
- `verifyCredentials()` -> `createUserSession()` -> redirect `/admin/dashboard`
- `logout()` -> destroy session -> redirect `/admin`
- `getSessionData()` -> { isAuthenticated, loginTime }

## Optimisation images

### API `/api/image` (GET)

- Params : `src` (requis, prefix /uploads/ ou /images/), `w`, `q` (50-95), `f` (webp/avif/jpeg)
- Tailles autorisees : 20, 150, 320, 480, 640, 768, 1024, 1280, 1920px
- Cache L1 memoire (1h, max 100 entries) + L2 disque (7j, `.cache/images/`)
- Format auto : AVIF > WebP > JPEG (AVIF desactive sur iOS Safari)
- Headers : Cache-Control 1 an immutable, X-Cache: HIT-MEMORY/HIT-DISK/MISS

### Composant OptimizedImage

- Props : src, alt, mobileSize, desktopSize, priority, noPlaceholder, forceMobile, noWrapper, onImageLoad
- Blur placeholder avec fallback 5s
- srcset responsive desktop, image simple mobile
- GPU optimization mobile (will-change, translateZ)
- Lazy loading avec async decoding

## Deploiement

### Pipeline CI/CD (GitHub Actions)

Trigger : push sur `main` -> deploy auto sur VPS via SSH.

1. Checkout code
2. SSH au VPS (141.95.53.183:49999, user debian)
3. `git pull --force` depuis origin/main
4. `rm -rf node_modules` + `npm install --legacy-peer-deps`
5. Creation `.env` avec DATABASE_URL
6. Migrations Prisma (avec fallback baseline P3005)
7. `prisma generate`
8. Creation dossiers upload (`public/uploads/portfolio/bento`, `logs`)
9. Build (timeout 5 min)
10. `prisma db push`
11. `pm2 restart remix-app`

### PM2 (ecosystem.config.cjs)

- App : `remix-app`, `npm start`, port 4000
- Env : NODE_ENV=production, MAX_FILE_SIZE=40MB
- Memoire max : 1GB restart
- Logs : `./logs/{app,out,error}.log` (format YYYY-MM-DD HH:mm:ss Z)

### Secrets GitHub requis

- `PRIVATEKEY` : Cle SSH privee pour le VPS

## Variables d'environnement

```env
DATABASE_URL="file:./prisma/dev.db"    # SQLite local, PostgreSQL en prod possible

BREVOS_API_KEY=...                      # Brevo SMTP auth
BREVOS_SMTP_SERVER=smtp-relay.brevo.com # SMTP server
BREVOS_PORT=587                         # SMTP port
BREVOS_LOGIN=...                        # SMTP login
BREVOS_FROM_EMAIL=javier@lasaintepaire.com

ADMIN_LOGIN=...                         # Defaut: SayYes
ADMIN_PASSWORD=...                      # Defaut: Sisiiiiiiii
SESSION_SECRET=...                      # Defaut: default-secret-change-in-production

NODE_ENV=production
```

## Conventions de code

- **Langue code** : Variables/fonctions en anglais, UI en francais
- **Routing** : Flat routes Remix (`admin+/`, `api+/`, `portfolio+/`)
- **Fichiers serveur** : Suffixe `.server.ts` (ex: `auth.server.ts`)
- **State** : React Context API uniquement (pas de Redux/Zustand)
- **Responsive** : `useViewport()` retourne `boolean | null`, layouts Desktop/Mobile separes
- **Alias** : `~/` -> `./app/` (tsconfig paths)
- **CSS** : Tailwind + classes custom (border-custom, holographic-bg, etc.)
- **Formatting** : Prettier (double quotes, semi, 80 cols, 2 spaces, trailing comma es5)
- **Linting** : ESLint recommended + TypeScript + React + JSX-A11y + Import
- **Unused vars** : Prefixer avec `_` (ex: `_unused`), pattern `/^_/`
- **Icons** : SVG -> React via SVGR (`npm run icons`), stockes dans `app/assets/icons/`
- **Images** : Toujours utiliser `OptimizedImage` pour les images publiques

## Patterns importants

### Data fetching

- **Server-side** : Loaders Remix + Prisma -> `useLoaderData<typeof loader>()`
- **Client-side** : PortfolioContext fetch vers `/api/portfolios`
- **Mutations** : Actions Remix + `useFetcher` pour updates sans navigation
- **Flash messages** : Cookie-based pour messages entre redirects

### Gestion des medias

- Upload via FormData multipart -> `/api/media`
- Stockage : `public/uploads/{folder}/` (timestamp_random_filename)
- Types : IMAGE (jpeg/png/webp/gif), VIDEO (mp4/webm/ogg), DOCUMENT (pdf/doc)
- Max : 40MB (configurable via env MAX_FILE_SIZE)
- Tracking DB : modele Media lie a Portfolio (cascade delete)
- Serving : route catch-all `uploads.$.tsx` avec MIME detection

### Formulaires admin

- State via hook `useFormulaireState()` (create/edit mode)
- Handlers via factory `createFormHandlers()` / `usePortfolioEditFormHandlers()`
- Validation server-side `validatePortfolioDataAsync()` (+ slug uniqueness)
- Upload progress tracking (isUploadingFiles, uploadProgress, uploadedCount)
- Reponse JSON `{ success, message, details? }`
- Toast notifications cote client + reload on success

### Landing pages dynamiques

- Blocs JSON en BDD -> `BlocRenderer` switch par type
- 11 types de blocs avec editeurs admin correspondants
- Support Schema.org JSON-LD (inject via `<script type="application/ld+json">`)
- SEO complet : metaTitle, metaDescription, og:, twitter:

### Animations

- **Framer Motion** : useScroll + useTransform (parallax), AnimatePresence (transitions), whileInView (reveal)
- **Stagger** : delay index \* 0.1 pour animations en cascade
- **Spring physics** : Header hide/show (stiffness 300, damping 30)
- **Scroll lock** : ScrollLockContext pendant animations (useScrollProgress)
- **Staged loading** : Portfolio detail desktop (4 stages: bg -> title -> photo -> content)
- **Reduced motion** : useReducedMotion hook (prefers-reduced-motion + mobile)

### SEO

- Meta function Remix pour landing pages (dynamique depuis loader data)
- Hook useMetaData pour portfolio detail (manipulation DOM directe)
- Base URL : `https://vps-f16913b8.vps.ovh.net`
- Schema.org JSON-LD support

## Configuration Tailwind

### Couleurs custom

- `yellow: #E1FF8B`, `blue-100: #B0F5FF`, `blue-200: #B0F5F0`
- `pink-100: #DCD5FF`, `pink-200: #DCC4FF`
- `gray-50: #DEDEDE` -> `gray-600: #121212`
- `dark-blue: #1A1750`

### Polices

- `jakarta` (regular, bold, semi-bold, extra-bold)
- `made-brush` (MADE Soulmaze Brush)
- `made` (MADE)

### Plugins

- tailwindcss-textshadow, tailwind-scrollbar-hide

## Ce qui n'existe PAS

- Pas de tests (ni Jest, ni Vitest, ni Cypress)
- Pas de Docker/containerisation
- Pas de Redis/cache externe
- Pas de paiement (Stripe)
- Pas de stockage cloud (S3, Cloudinary)
- Pas de CMS headless externe
- Pas de GraphQL
- Pas de backup automatise de la BDD
- Pas de monitoring/logging externe
- Pas de rate limiting sur les API
