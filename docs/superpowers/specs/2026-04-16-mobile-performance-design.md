# Design — Performance mobile : cache médias & navigation fluide

**Date :** 2026-04-16  
**Contexte :** Problèmes de performance constatés sur appareil réel (data mobile). Symptômes : blanc trop long au premier affichage, images qui apparaissent en retard, navigation lente entre pages.

---

## Problèmes identifiés

| # | Problème | Impact |
|---|---|---|
| 1 | `useViewport()` retourne `null` → flash `<LoadingBar>` à chaque navigation | Blanc systématique ~50-100ms |
| 2 | `LoadingBar` attend `document.readyState === "complete"` incluant la vidéo | Bloque l'UI pendant plusieurs secondes sur data mobile |
| 3 | Vidéo `bureau.mp4` charge en `autoPlay` immédiatement sur mobile | Téléchargement parasite de plusieurs MB au chargement initial |
| 4 | `ContentPortfolio` utilise `background-image` CSS raw sans `/api/image` | Images de cartes à pleine résolution (~2-4MB chacune) |
| 5 | Liens Remix sans `prefetch="intent"` | Latence 300-800ms au tap avant affichage |
| 6 | Service Worker sans stratégie pour `/api/image` | Images re-téléchargées à chaque session |

---

## Approche retenue : Approche C (quick wins + cache SW + vidéo lazy)

Combinaison des 3 axes :
- **Axe 1 :** Éliminer les blocages de rendu (null flash, LoadingBar, images)
- **Axe 2 :** Cache Service Worker persistant pour les images optimisées
- **Axe 3 :** Lazy loading de la vidéo mobile

---

## Design détaillé

### 1. `useViewport` — initialisation immédiate depuis SSR

**Fichier :** `app/utils/hooks/useViewport.tsx`

`useViewport()` initialise son état à `null` inconditionnellement. Le root loader calcule déjà `isMobileSSR` via User-Agent côté serveur. `OptimizedImage` l'utilise déjà via `useRouteLoaderData("root")` — `useViewport` doit faire pareil.

**Changement :**
```ts
// Ajouter useRouteLoaderData import depuis @remix-run/react
// Lire rootData?.isMobileSSR comme valeur initiale du useState

export function useViewport() {
  const rootData = useRouteLoaderData<RootLoaderData>("root");
  const [isMobile, setIsMobile] = useState<boolean | null>(() => {
    if (typeof window === "undefined") return null;
    if (rootData?.isMobileSSR !== undefined) return rootData.isMobileSSR;
    return detectMobile();
  });
  // useEffect inchangé (écoute les changements de taille de fenêtre)
}
```

**Résultat :** Plus jamais de `null` retourné sur mobile → les routes ne montrent plus le `<LoadingBar>` systématique.

---

### 2. `LoadingBar` — timeout maximum 400ms

**Fichier :** `app/components/LoadingBar/index.tsx`

La barre progresse via `setInterval` à 50ms, mais se bloque à ~30-40% tant que `readyState !== "complete"`. Sur mobile data avec une vidéo lourde, ça peut durer 5-10 secondes.

**Changement :** Ajouter un `setTimeout` de 400ms qui force la barre à 100% et démonte le composant, indépendamment de `readyState`. Les assets continuent de charger en arrière-plan — seule la barre est libérée.

```ts
// Dans le useEffect du mode normal :
const forceComplete = setTimeout(() => {
  setProgress(100);
  clearInterval(interval);
  setTimeout(() => {
    setIsComplete(true);
    onComplete?.();
  }, 300);
}, 400);

return () => {
  clearInterval(interval);
  clearTimeout(forceComplete);
};
```

---

### 3. Vidéo `bureau.mp4` — lazy loading via IntersectionObserver

**Fichier :** `app/components/Screens/Homepage/IntroSection.tsx`

Sur mobile, la vidéo se trouve en bas de la section intro — pas visible immédiatement. Avec `autoPlay` + `src` direct, le navigateur commence le téléchargement dès le chargement de la page.

**Changement (mobile uniquement) :**
- Rendre la `<video>` sans `src` initialement
- Utiliser un `useEffect` avec `IntersectionObserver` (rootMargin `200px`) sur le `videoRef`
- Retirer `src` ET `autoPlay` du JSX de la `<video>` mobile (sans `src`, `autoPlay` n'est pas nécessaire et interfèrerait avec le play manuel)
- Affecter `videoRef.current.src = "/video/bureau.mp4"` et appeler `.play()` quand l'élément entre dans le viewport
- Pas de changement sur desktop (comportement actuel conservé)

```tsx
// JSX mobile — supprimer src et autoPlay
<video
  ref={videoRef}
  loop
  muted
  playsInline
  onPlay={() => setIsPlaying(true)}
  onPause={() => setIsPlaying(false)}
  className="w-full h-full object-cover rounded-[10px]"
/>

// useEffect mobile uniquement
useEffect(() => {
  if (!isMobile || !videoRef.current) return;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && videoRef.current) {
        videoRef.current.src = "/video/bureau.mp4";
        videoRef.current.play().catch(() => {});
        observer.disconnect();
      }
    },
    { rootMargin: "200px" }
  );
  observer.observe(videoRef.current);
  return () => observer.disconnect();
}, [isMobile]);
```

---

### 4. `ContentPortfolio` — `OptimizedImage` au lieu de `background-image`

**Fichier :** `app/components/Card/components/ContentPortfolio.tsx`

Le `<div style={{ backgroundImage: url(imageUrl) }}>` charge l'URL brute de l'upload sans compression. Sur mobile, ce sont des images full-res.

**Changement :** Remplacer le div background par `<OptimizedImage>` en position absolue.

```tsx
// Avant
<div
  style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "cover", ... }}
  className={imageClasses}
>

// Après  
<div className={imageClasses}>
  {imageUrl && (
    <OptimizedImage
      src={imageUrl}
      alt={titre ?? ""}
      mobileSize="mobile"
      desktopSize="tablet"
      noPlaceholder
      noWrapper
      className="absolute inset-0 w-full h-full object-cover md:rounded-[20px] rounded-[10px]"
    />
  )}
```

Le gradient overlay, le texte et la flèche restent identiques.

**Prefetch :** Ajouter `prefetch="intent"` sur le `<Link>` dans ce composant.

---

### 5. `CardHomePagePortfolio` — prefetch

**Fichier :** `app/components/Screens/Homepage/components/CardHomePagePortfolio.tsx`

Ce composant utilise déjà `getOptimizedImageUrl` → les images sont déjà à la bonne taille. En revanche, il navigue via `div + useNavigate + onClick`, ce qui empêche tout prefetch Remix.

**Changement :** Convertir le `<div onClick={() => navigate(...)}>` en `<Link prefetch="intent" to={...}>`. Le style et le contenu restent identiques — seule la balise racine change.

---

### 6. Service Worker — cache `CacheFirst` pour `/api/image`

**Fichier :** `vite.config.ts`

Workbox est configuré mais sans `runtimeCaching`. Les réponses de `/api/image` (images optimisées compressées) ne sont pas mises en cache côté navigateur — elles repassent par le réseau à chaque session.

**Changement :**
```ts
workbox: {
  maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
  runtimeCaching: [
    {
      urlPattern: /^\/api\/image\?/,
      handler: "CacheFirst",
      options: {
        cacheName: "optimized-images",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 jours
        },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
  ],
},
```

**Stratégie `CacheFirst` :** La première visite charge depuis le réseau et met en cache. Toutes les visites suivantes (navigation interne ou rechargement) utilisent le cache local — instantané même avec mauvaise connexion.

---

## Fichiers modifiés

| Fichier | Nature du changement |
|---|---|
| `app/utils/hooks/useViewport.tsx` | Init depuis `isMobileSSR` via `useRouteLoaderData` |
| `app/components/LoadingBar/index.tsx` | Timeout max 400ms |
| `app/components/Screens/Homepage/IntroSection.tsx` | Vidéo lazy (IntersectionObserver, mobile uniquement) |
| `app/components/Card/components/ContentPortfolio.tsx` | `OptimizedImage` + `prefetch="intent"` |
| `app/components/Screens/Homepage/components/CardHomePagePortfolio.tsx` | `prefetch="intent"` |
| `vite.config.ts` | Workbox `runtimeCaching` pour `/api/image` |

---

## Ce qui n'est PAS dans ce scope

- Skeleton loaders (remplacement de `<LoadingBar>`) — changement visuel à part entière
- Optimisation des SVG de fond (`BackgroundProject1`, etc.)
- Compression de la vidéo `bureau.mp4` (hors code)
- Stratégie de cache pour les autres routes API

---

## Critères de succès

- Sur data mobile réelle : plus de blanc visible entre navigations
- `LoadingBar` disparaît en moins de 700ms sur page d'accueil
- Images de cartes portfolio visibles avant les textes (car chargées à taille mobile)
- Deuxième visite sur une page portfolio : images instantanées depuis le cache SW
