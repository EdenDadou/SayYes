# Mobile Performance — Cache Médias & Navigation Fluide

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Éliminer les blocages de rendu mobile (flash null, LoadingBar lente, images full-res) et ajouter un cache Service Worker persistant pour les images optimisées.

**Architecture:** 6 modifications ciblées sur des fichiers existants — `useViewport` lit la valeur SSR immédiatement, `LoadingBar` se libère en 400ms max, la vidéo mobile charge via IntersectionObserver, `ContentPortfolio` passe par `OptimizedImage`, `CardHomePagePortfolio` utilise `<Link prefetch="intent">`, et Workbox met en cache les réponses `/api/image` en CacheFirst.

**Tech Stack:** Remix v2.14, React 18, TypeScript 5.1, Framer Motion 11, Workbox (vite-plugin-pwa 0.x)

---

## Fichiers modifiés

| Fichier | Changement |
|---|---|
| `app/utils/hooks/useViewport.tsx` | Ajoute `useRouteLoaderData` pour init depuis SSR |
| `app/components/LoadingBar/index.tsx` | Timeout max 400ms pour libérer l'UI |
| `app/components/Screens/Homepage/IntroSection.tsx` | Vidéo mobile lazy via IntersectionObserver |
| `app/components/Card/components/ContentPortfolio.tsx` | `OptimizedImage` + `prefetch="intent"` |
| `app/components/Screens/Homepage/components/CardHomePagePortfolio.tsx` | `<Link prefetch="intent">` au lieu de `div + useNavigate` |
| `vite.config.ts` | Workbox `runtimeCaching` CacheFirst pour `/api/image` |

---

## Task 1 : `useViewport` — init immédiate depuis la valeur SSR

**Problème :** `useState<boolean | null>(null)` force `null` au premier rendu client → flash `<LoadingBar>` à chaque navigation.  
**Fix :** Lire `rootData.isMobileSSR` (déjà disponible via le root loader) dans l'initializer du `useState`.

**Files:**
- Modify: `app/utils/hooks/useViewport.tsx`

- [ ] **Remplacer le contenu de `useViewport.tsx`**

```tsx
import { useEffect, useState } from "react";
import { useRouteLoaderData } from "@remix-run/react";
import type { RootLoaderData } from "~/root";

export const MOBILE_BREAKPOINT = 768;

const MOBILE_UA_REGEX =
  /Android|webOS|Mobile|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

/** Détecte un mobile à partir d'une chaîne User-Agent (fonctionne côté serveur et client) */
export function isMobileUserAgent(userAgent: string): boolean {
  return MOBILE_UA_REGEX.test(userAgent);
}

function detectMobile(): boolean {
  return (
    isMobileUserAgent(navigator.userAgent) ||
    window.innerWidth < MOBILE_BREAKPOINT
  );
}

export function useViewport() {
  const rootData = useRouteLoaderData<RootLoaderData>("root");

  const [isMobile, setIsMobile] = useState<boolean | null>(() => {
    // Côté serveur : pas de window, on retourne null (sera résolu à l'hydration)
    if (typeof window === "undefined") return null;
    // Côté client : utiliser la valeur SSR calculée via User-Agent (disponible immédiatement)
    if (rootData?.isMobileSSR !== undefined) return rootData.isMobileSSR;
    // Fallback : détecter directement (cas edge sans rootData)
    return detectMobile();
  });

  useEffect(() => {
    // Synchroniser avec la détection client réelle (couvre rotation / resize)
    setIsMobile(detectMobile());

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handleChange = () => setIsMobile(detectMobile());
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}
```

- [ ] **Vérifier le typage**

```bash
cd /Users/eden/Desktop/BANZAI/Projets/SayYes/SayYes
npm run typecheck 2>&1 | head -30
```

Résultat attendu : pas d'erreur sur `useViewport.tsx`. Si erreur sur `RootLoaderData`, vérifier que `~/root` exporte bien `export type RootLoaderData = { isMobileSSR: boolean }` (c'est déjà le cas dans `root.tsx` ligne 21).

- [ ] **Commit**

```bash
git add app/utils/hooks/useViewport.tsx
git commit -m "perf: useViewport init depuis isMobileSSR SSR — supprime le flash null mobile"
```

---

## Task 2 : `LoadingBar` — timeout maximum 400ms

**Problème :** La barre attend `document.readyState === "complete"` qui inclut le téléchargement de `bureau.mp4`. Sur data mobile, la barre bloque l'affichage pendant 5-10s.  
**Fix :** Ajouter un `setTimeout` de 400ms qui force la complétion de la barre indépendamment du readyState.

**Files:**
- Modify: `app/components/LoadingBar/index.tsx`

- [ ] **Dans le `useEffect` du mode normal (après `checkPageLoad()`), ajouter le `forceComplete`**

Remplacer le bloc du useEffect (du `if (indefinite)` exclu jusqu'à la fin du `return () => {...}`) par :

```tsx
useEffect(() => {
  // Mode indéfini : la barre progresse jusqu'à 90% et reste là
  if (indefinite) {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        const increment =
          prev < 60 ? 3 + Math.random() * 4 : 1 + Math.random() * 2;
        return Math.min(prev + increment, 90);
      });
    }, 50);

    return () => clearInterval(interval);
  }

  // Mode normal : timeout maximum 400ms pour ne pas bloquer sur les assets lourds (vidéo)
  const completeBar = () => {
    setProgress(100);
    setTimeout(() => {
      setIsComplete(true);
      onComplete?.();
    }, 300);
  };

  // Si la page est déjà chargée, compléter immédiatement
  if (document.readyState === "complete") {
    setProgress(90);
    setTimeout(completeBar, 200);
    return;
  }

  // Progression visuelle fluide
  const interval = setInterval(() => {
    setProgress((prev) => {
      if (prev >= 95) return prev; // Plafonner à 95% en attendant la complétion
      const increment =
        prev < 70 ? 2 + Math.random() * 3 : 0.5 + Math.random() * 1;
      return Math.min(prev + increment, 95);
    });
  }, 50);

  // Forcer la complétion après 400ms maximum (ne pas attendre la vidéo)
  const forceComplete = setTimeout(() => {
    clearInterval(interval);
    completeBar();
  }, 400);

  // Complétion anticipée si la page charge avant 400ms
  const handleLoad = () => {
    clearInterval(interval);
    clearTimeout(forceComplete);
    setProgress(95);
    setTimeout(completeBar, 200);
  };
  window.addEventListener("load", handleLoad);

  return () => {
    clearInterval(interval);
    clearTimeout(forceComplete);
    window.removeEventListener("load", handleLoad);
  };
}, [onComplete, indefinite]);
```

- [ ] **Vérifier le typage**

```bash
npm run typecheck 2>&1 | grep "LoadingBar" | head -10
```

Résultat attendu : pas d'erreur.

- [ ] **Commit**

```bash
git add app/components/LoadingBar/index.tsx
git commit -m "perf: LoadingBar timeout max 400ms — ne plus bloquer sur vidéo mobile"
```

---

## Task 3 : Vidéo `bureau.mp4` — lazy loading mobile via IntersectionObserver

**Problème :** `autoPlay` + `src` direct télécharge la vidéo immédiatement au chargement de la page, même si elle est hors viewport.  
**Fix :** Sur mobile, supprimer `src` et `autoPlay` du JSX — le `src` est affecté programmatiquement via IntersectionObserver quand la vidéo entre dans le viewport.

**Files:**
- Modify: `app/components/Screens/Homepage/IntroSection.tsx`

- [ ] **Ajouter le `useEffect` IntersectionObserver dans `IntroSection`**

Dans le composant `IntroSection`, après la définition de `togglePlay`, ajouter :

```tsx
// Lazy loading de la vidéo sur mobile : charge uniquement quand visible
useEffect(() => {
  if (!isMobile || !videoRef.current) return;
  const video = videoRef.current;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        video.src = "/video/bureau.mp4";
        video.play().catch(() => {
          // Autoplay bloqué par le navigateur — l'utilisateur cliquera
        });
        observer.disconnect();
      }
    },
    { rootMargin: "200px" }
  );

  observer.observe(video);
  return () => observer.disconnect();
}, [isMobile]);
```

- [ ] **Dans le JSX mobile, supprimer `src` et `autoPlay` de la `<video>`**

Localiser le bloc mobile de `IntroSection` (condition `isMobile ? (...)`). Remplacer la `<video>` par :

```tsx
<video
  ref={videoRef}
  loop
  muted
  playsInline
  onPlay={() => setIsPlaying(true)}
  onPause={() => setIsPlaying(false)}
  className="w-full h-full object-cover rounded-[10px]"
/>
```

Note : `src` et `autoPlay` sont retirés. Le `src` est affecté par l'observer. `autoPlay` est inutile sans `src` et interférerait avec le `.play()` manuel.

- [ ] **Vérifier le typage**

```bash
npm run typecheck 2>&1 | grep "IntroSection" | head -10
```

Résultat attendu : pas d'erreur.

- [ ] **Commit**

```bash
git add app/components/Screens/Homepage/IntroSection.tsx
git commit -m "perf: vidéo bureau.mp4 lazy loading mobile — IntersectionObserver 200px rootMargin"
```

---

## Task 4 : `ContentPortfolio` — `OptimizedImage` + `prefetch="intent"`

**Problème :** Les images des cartes passent par `background-image: url(rawUrl)` CSS sans passer par `/api/image` → chargement full-res (~2-4MB par image sur mobile).  
**Fix :** Remplacer le div background-image par `<OptimizedImage>` en position absolue. Ajouter `prefetch="intent"` sur le `<Link>`.

**Files:**
- Modify: `app/components/Card/components/ContentPortfolio.tsx`

- [ ] **Remplacer le contenu de `ContentPortfolio.tsx`**

```tsx
import { useCallback, useRef, memo } from "react";
import { cn } from "~/utils/ui/ui";
import { Link } from "@remix-run/react";
import ArrowLight from "~/assets/icons/ArrowLight";
import { getOptimizedImageUrl } from "~/utils/optimizeImage";
import "~/styles/tailwind.css";
import OptimizedImage from "~/components/ui/OptimizedImage";

interface PropsContent {
  imageUrl?: string;
  videoUrl?: string;
  titre?: string;
  topTitle?: string;
  slug?: string;
}

export default memo(function ContentPortfolio({
  imageUrl,
  videoUrl,
  titre,
  topTitle,
  slug,
}: PropsContent) {
  const prefetchedRef = useRef(false);

  // Précharge l'image desktop optimisée au survol (desktop uniquement)
  const handleMouseEnter = useCallback(() => {
    if (prefetchedRef.current || !imageUrl || !slug) return;
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    prefetchedRef.current = true;

    const url = getOptimizedImageUrl(imageUrl, "desktop");
    const img = new Image();
    img.src = url;
  }, [imageUrl, slug]);

  const imageClasses = cn(
    "h-full flex items-center justify-center md:rounded-[20px] rounded-[10px] relative card-image"
  );

  return (
    <Link
      to={`/portfolio/${slug}`}
      prefetch="intent"
      onMouseEnter={handleMouseEnter}
      className="size-full relative overflow-hidden md:rounded-[16px] hover:rounded-[26px] rounded-[10px] md:p-2 p-1 cursor-pointer shadow-lg block"
    >
      <div className={imageClasses}>
        {/* Image optimisée via /api/image — mobile 640px, desktop 1024px */}
        {imageUrl && !videoUrl && (
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
        {/* Gradient overlay - seulement sur les 20% inférieurs */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,rgba(0,0,0,0.7)_80%,rgba(0,0,0,0.9)_100%)] md:rounded-[15px] rounded-[10px]" />
      </div>
      <div className="size-full absolute top-0 left-0 bottom-0 md:p-4 p-2">
        <div className="flex flex-col items-center justify-end w-full h-full p-4">
          <div className="flex flex-row items-center justify-between w-full md:p-4">
            <div className="flex flex-row justify-center items-center">
              <div className="self-stretch w-[3px] holographic-bg-vertical rounded-full mr-4" />
              <div className="flex flex-col items-start justify-center">
                <span className="text-white md:text-3xl text-[18px] font-jakarta-bold">
                  {titre}
                </span>
                <span className="text-white md:text-2xl text-[12px] font-jakarta">
                  {topTitle}
                </span>
              </div>
            </div>
            <ArrowLight className="w-8 h-8 md:w-12 md:h-12" />
          </div>
        </div>
      </div>
    </Link>
  );
});
```

- [ ] **Vérifier le typage**

```bash
npm run typecheck 2>&1 | grep "ContentPortfolio" | head -10
```

Résultat attendu : pas d'erreur.

- [ ] **Commit**

```bash
git add app/components/Card/components/ContentPortfolio.tsx
git commit -m "perf: ContentPortfolio OptimizedImage mobile + prefetch intent — images cartes compressées"
```

---

## Task 5 : `CardHomePagePortfolio` — `<Link prefetch="intent">`

**Problème :** Navigation via `div + useNavigate + onClick` → impossible pour Remix de précharger la route. L'image est déjà optimisée via `getOptimizedImageUrl`.  
**Fix :** Convertir la div racine en `<Link prefetch="intent">`. Supprimer `useNavigate`.

**Files:**
- Modify: `app/components/Screens/Homepage/components/CardHomePagePortfolio.tsx`

- [ ] **Remplacer le contenu de `CardHomePagePortfolio.tsx`**

```tsx
import { cn } from "~/utils/ui/ui";
import { Link } from "@remix-run/react";
import ArrowLight from "~/assets/icons/ArrowLight";
import "~/styles/tailwind.css";
import { getOptimizedImageUrl } from "~/utils/optimizeImage";

interface PropsContent {
  imageUrl?: string;
  videoUrl?: string;
  titre?: string;
  topTitle?: string;
  slug?: string;
  isMobile?: boolean;
}

export default function CardHomePagePortfolio({
  imageUrl,
  videoUrl,
  titre,
  topTitle,
  slug,
  isMobile,
}: PropsContent) {
  const imageClasses = cn(
    "h-full flex items-center justify-center md:rounded-[45px] rounded-[10px] relative"
  );

  const optimizedImageUrl = imageUrl
    ? getOptimizedImageUrl(imageUrl, isMobile ? "mobile" : "desktop")
    : undefined;

  return (
    <Link
      to={`/portfolio/${slug}`}
      prefetch="intent"
      className="size-full relative overflow-hidden md:rounded-[45px] rounded-[14px] p-2 cursor-pointer shadow-lg block"
    >
      <div
        style={{
          backgroundImage: videoUrl ? undefined : `url(${optimizedImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: isMobile ? "20px" : "40px",
        }}
        className={`${imageClasses}`}
      >
        {/* Gradient overlay - seulement sur les 20% inférieurs */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,rgba(0,0,0,0.7)_80%,rgba(0,0,0,0.9)_100%)] md:rounded-[40px] rounded-[14px]" />
      </div>
      <div className="size-full absolute top-0 left-0 bottom-0 md:p-4 p-2">
        <div className="flex flex-col items-center justify-end w-full h-full p-4">
          <div className="flex flex-row items-center justify-between w-full md:p-4">
            <div className="flex flex-row justify-center items-center">
              <div className="self-stretch w-[3px] holographic-bg-vertical rounded-full mr-4" />
              <div className="flex flex-col items-start justify-center">
                <span className="text-white md:text-3xl text-[18px] font-jakarta-bold">
                  {titre}
                </span>
                <span className="text-white md:text-2xl text-[12px] font-jakarta">
                  {topTitle}
                </span>
              </div>
            </div>
            <ArrowLight className="w-8 h-8 md:w-12 md:h-12" />
          </div>
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Vérifier le typage**

```bash
npm run typecheck 2>&1 | grep "CardHomePagePortfolio" | head -10
```

Résultat attendu : pas d'erreur.

- [ ] **Commit**

```bash
git add app/components/Screens/Homepage/components/CardHomePagePortfolio.tsx
git commit -m "perf: CardHomePagePortfolio Link prefetch intent — préchargement route au touch"
```

---

## Task 6 : Service Worker — cache `CacheFirst` pour `/api/image`

**Problème :** Workbox précache les assets statiques mais n'a aucune stratégie pour les URLs dynamiques `/api/image?...`. Les images optimisées sont re-téléchargées à chaque session.  
**Fix :** Ajouter `runtimeCaching` avec stratégie `CacheFirst`, cache `optimized-images`, TTL 30 jours, max 200 entrées.

**Files:**
- Modify: `vite.config.ts`

- [ ] **Dans `vite.config.ts`, mettre à jour la config `workbox`**

Localiser le bloc `workbox: { maximumFileSizeToCacheInBytes: ... }` et le remplacer par :

```ts
workbox: {
  maximumFileSizeToCacheInBytes: 50 * 1024 * 1024, // 50MB — inchangé
  runtimeCaching: [
    {
      // Cache CacheFirst pour les images optimisées par /api/image
      // Après la 1ère visite, les images sont servies depuis le cache local
      urlPattern: /^\/api\/image\?/,
      handler: "CacheFirst",
      options: {
        cacheName: "optimized-images",
        expiration: {
          maxEntries: 200,        // Max 200 images en cache
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 jours
        },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
  ],
},
```

- [ ] **Vérifier la syntaxe TypeScript**

```bash
npm run typecheck 2>&1 | grep "vite.config" | head -10
```

Résultat attendu : pas d'erreur. Si TypeScript se plaint du type `handler: "CacheFirst"`, vérifier que `vite-plugin-pwa` est bien installé (il embarque les types Workbox).

- [ ] **Commit**

```bash
git add vite.config.ts
git commit -m "perf: Workbox CacheFirst /api/image — images optimisées en cache 30j SW"
```

---

## Task 7 : Build de production & vérification finale

- [ ] **Typecheck complet**

```bash
npm run typecheck
```

Résultat attendu : `0 errors`. Si des erreurs apparaissent, les corriger avant de continuer.

- [ ] **Lint**

```bash
npm run lint
```

Résultat attendu : pas d'erreurs (warnings ignorables). Si erreurs ESLint, corriger.

- [ ] **Build de production**

```bash
npm run build 2>&1 | tail -20
```

Résultat attendu : build réussi, pas d'erreurs TypeScript. Des warnings Rollup sur `dynamic-import` sont normaux (filtrés par la config).

- [ ] **Test manuel sur mobile (ou DevTools device emulation + throttling "Slow 4G")**

Vérifications à faire :

1. **Flash null** : Ouvrir `http://localhost:4000` sur mobile → la page s'affiche directement sans LoadingBar systématique
2. **LoadingBar** : La barre disparaît en < 700ms (avant que la vidéo soit chargée)
3. **Vidéo lazy** : Dans DevTools Network > Media, `bureau.mp4` ne doit PAS apparaître dans les requêtes initiales — seulement quand on scrolle jusqu'à la vidéo
4. **Images cartes** : Dans DevTools Network > Img, les requêtes doivent être `/api/image?src=...&w=640&q=75` (et non les URLs `/uploads/...` directes)
5. **Navigation** : Taper sur une carte portfolio → la page portfolio s'affiche sans LoadingBar (isMobile déjà résolu)
6. **SW cache** : Recharger la page → dans DevTools Application > Cache Storage > `optimized-images`, les images doivent apparaître après la première visite

- [ ] **Commit final si tout est OK**

```bash
git add -A
git status  # Vérifier qu'il ne reste rien de non stagé
git commit -m "perf: vérification build et tests manuels mobile performance"
```

---

## Résumé des commits attendus

```
perf: useViewport init depuis isMobileSSR SSR — supprime le flash null mobile
perf: LoadingBar timeout max 400ms — ne plus bloquer sur vidéo mobile
perf: vidéo bureau.mp4 lazy loading mobile — IntersectionObserver 200px rootMargin
perf: ContentPortfolio OptimizedImage mobile + prefetch intent — images cartes compressées
perf: CardHomePagePortfolio Link prefetch intent — préchargement route au touch
perf: Workbox CacheFirst /api/image — images optimisées en cache 30j SW
```
