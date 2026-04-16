# Optimisation performance mobile — images, vidéos, cache, prefetch

**Date :** 2026-04-16  
**Scope :** Mobile uniquement  
**Objectif :** Éliminer le chargement visible des assets au scroll, mettre en cache tout ce qui peut l'être, et précharger les pages de navigation avant que l'utilisateur les visite.

---

## Contexte

Sur mobile, trois problèmes distincts sont observés :

1. **Images bento en opacity:0 quand l'utilisateur arrive dessus** — `useInView` avec `margin: "-50px"` déclenche l'animation trop tard.
2. **Vidéos bento démarrent leur téléchargement immédiatement** — `preload="auto"` + `src` direct au montage. Plusieurs vidéos lourdes en parallèle dès le chargement de la page.
3. **Zéro cache HTTP sur `/public/images/` et `/public/video/`** — tout est retéléchargé à chaque visite. Le Service Worker ne couvre que `/api/image` (déjà en place).

---

## Ce qui existe déjà (ne pas toucher)

- **API `/api/image`** : Sharp + cache L1 mémoire (1h) + L2 disque (7j). Headers `Cache-Control: public, max-age=31536000, immutable`. AVIF désactivé iOS Safari.
- **Composant `OptimizedImage`** (global) : srcset responsive, blur placeholder, fallback 5s, GPU optimizations mobile.
- **PWA Service Worker** : Workbox, CacheFirst 30j, 200 entrées pour `/api/image` — déjà configuré dans `vite.config.ts`.
- **`IntroSection.tsx`** : IntersectionObserver `rootMargin: "200px"` sur la vidéo mobile — pattern correct à réutiliser.

---

## Section 1 — Fix animations et lazy loading vidéo

### 1.1 `BentoMobile.tsx` — Timing d'animation des images

**Fichier :** `app/components/Screens/Portfolio/components/BentoMobile.tsx`

**Problème :** `useInView(ref, { once: true, margin: "-50px" })` → l'image est encore en `opacity: 0, y: 40` quand l'utilisateur la voit pour la première fois.

**Fix :** Passer à `margin: "300px"` → l'animation de reveal commence 300px avant que l'image entre dans le viewport.

```tsx
// Avant
const isInView = useInView(ref, { once: true, margin: "-50px" });

// Après
const isInView = useInView(ref, { once: true, margin: "300px" });
```

### 1.2 `BentoMobile.tsx` — Lazy loading des vidéos bento

**Problème :** `<video src={src} preload="auto">` → téléchargement immédiat de chaque vidéo au montage, quelle que soit sa position dans la page.

**Fix :** Remplacer par le pattern IntersectionObserver d'`IntroSection` :
- Supprimer `src={src}` du JSX initial — la vidéo est rendue sans `src`
- Stocker l'URL cible dans une `ref`
- `IntersectionObserver` avec `rootMargin: "600px"` (marge large, les vidéos sont lourdes)
- Quand l'élément entre dans la zone → `video.src = srcRef.current` → `video.play()`
- `preload="none"` sur le `<video>` — le navigateur ne précharge rien avant que l'Observer ne décide

**Résultat :** Une vidéo bento en bas de page ne commence à charger que 600px avant que l'utilisateur y arrive.

---

## Section 2 — Cache HTTP + Service Worker

### 2.1 Service Worker — Étendre le runtime caching

**Fichier :** `vite.config.ts` → section `workbox.runtimeCaching`

Ajouter après la règle existante `/api/image` :

```ts
{
  // Images statiques /public/images/
  urlPattern: /^https?:\/\/[^/]+\/images\//,
  handler: "CacheFirst",
  options: {
    cacheName: "static-images",
    expiration: { maxEntries: 150, maxAgeSeconds: 60 * 60 * 24 * 30 },
    cacheableResponse: { statuses: [0, 200] },
  },
},
{
  // Vidéos /public/video/ et uploads
  urlPattern: /^https?:\/\/[^/]+\/(video|uploads)\//,
  handler: "CacheFirst",
  options: {
    cacheName: "static-videos",
    expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 7 },
    cacheableResponse: { statuses: [0, 200] },
    rangeRequests: true, // Obligatoire pour les vidéos (Range requests HTTP)
  },
},
```

Note critique : les vidéos utilisent des **Range requests** (`Range: bytes=...`). Sans `rangeRequests: true`, Workbox ne met jamais la vidéo en cache.

Note : `remix-serve` sert `/public/` via Express static avant d'atteindre le handler Remix — on ne peut pas y injecter de `Cache-Control` sans un serveur custom. Le SW Workbox couvre les visites suivantes, ce qui est l'objectif réel.

### 2.2 Manifest PWA — Branding

**Fichier :** `vite.config.ts` → section `manifest`

```ts
// Avant
name: "Mon App Remix",
short_name: "App Remix",
description: "Mon application Remix avec Tailwind CSS",

// Après
name: "Say Yes",
short_name: "Say Yes",
description: "Say Yes — Agence créative, branding, digital, vidéo",
```

---

## Section 3 — Prefetch routes + images

### 3.1 Hook `usePrefetchOnIdle`

**Fichier à créer :** `app/utils/hooks/usePrefetchOnIdle.ts`

Déclenché dans la homepage après un délai de **2 secondes** post-montage. Injecte des `<link rel="prefetch">` dans `document.head`.

**Routes prefetchées :**
- `/solutions` — chunk JS + données loader
- `/portfolio` — chunk JS + données loader

**Images prefetchées via `/api/image` (passe par le SW → mises en cache) :**
- `/images/bg-menu-mobile.png` (fond du menu burger)
- `/images/solutions/Card1.png` à `Card5.png`
- `/images/solutions/MasqueMobile.png`
- `/images/portfolio/bg.png`
- `/images/portfolio/ClientWallmobile.png`

**Règles :**
- Ne s'exécute que sur mobile (`window.innerWidth < 768`)
- `rel="prefetch"` = priorité `Idle` → ne concurrence pas le chargement courant
- Nettoie les `<link>` au démontage
- Images préfetchées avec `w=640&q=75` → cohérent avec `mobileSize="mobile"`

### 3.2 Intégration dans la homepage

**Fichier :** `app/routes/_index.tsx`

```tsx
usePrefetchOnIdle(); // après le montage, prefetch silencieux
```

### 3.3 Menu mobile — Image de fond via `OptimizedImage`

**Fichier :** `app/components/Header/components/MenuMobile.tsx`

Remplacer le `<img src="/images/bg-menu-mobile.png">` direct par `<OptimizedImage>` avec `noWrapper` et `mobileSize="mobile"`. L'image passera ainsi par `/api/image` (WebP 640px) et sera servie depuis le SW dès la deuxième ouverture du menu.

---

## Fichiers modifiés

| Fichier | Changement |
|---|---|
| `app/components/Screens/Portfolio/components/BentoMobile.tsx` | margin `-50px` → `300px` ; vidéos lazy via IntersectionObserver `600px` |
| `vite.config.ts` | SW runtime caching étendu (`/images/`, `/video/`, `/uploads/`) + manifest branding |
| `app/utils/hooks/usePrefetchOnIdle.ts` | Nouveau hook prefetch (créer) |
| `app/routes/_index.tsx` | Intégration hook prefetch |
| `app/components/Header/components/MenuMobile.tsx` | Image fond → `OptimizedImage` |

---

## Ce qu'on ne fait PAS

- Pas de modification du pipeline `/api/image` (déjà optimal)
- Pas de prefetch des pages portfolio individuelles (trop nombreuses et lourdes)
- Pas de changement desktop (hors scope)
- Pas de conversion batch des PNG en WebP côté fichiers (déjà géré à la volée par Sharp)
- Pas de skeleton loaders (hors scope visuel)
