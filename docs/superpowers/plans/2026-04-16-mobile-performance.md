# Mobile Performance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Éliminer le chargement visible des assets au scroll sur mobile, mettre en cache les images/vidéos statiques via le Service Worker, et précharger les pages de navigation après le chargement de la homepage.

**Architecture:** Trois axes indépendants — (1) correction des timings d'animation/lazy-load dans `BentoMobile`, (2) extension du cache Workbox dans `vite.config.ts` pour couvrir les assets statiques, (3) hook de prefetch silencieux déclenché 2s après le montage de la homepage.

**Tech Stack:** React 18, Framer Motion (`useInView`), IntersectionObserver API, Workbox (via `vite-plugin-pwa`), Remix.

---

## Fichiers touchés

| Fichier | Action |
|---|---|
| `app/components/Screens/Portfolio/components/BentoMobile.tsx` | Modifier |
| `vite.config.ts` | Modifier |
| `app/utils/hooks/usePrefetchOnIdle.ts` | Créer |
| `app/routes/_index.tsx` | Modifier |
| `app/components/Header/components/MenuMobile.tsx` | Modifier |

---

## Task 1 : Fix animation timing BentoMobile

**Fichiers :**
- Modifier : `app/components/Screens/Portfolio/components/BentoMobile.tsx`

**Contexte :** La fonction `OptimizedImage` locale dans ce fichier utilise `useInView(ref, { once: true, margin: "-50px" })`. Une margin négative signifie que l'élément doit être 50px dans le viewport avant que l'animation de reveal se déclenche — l'utilisateur voit une boîte vide pendant qu'il scrolle.

- [ ] **Confirmer l'état actuel**

```bash
grep -n "margin:" app/components/Screens/Portfolio/components/BentoMobile.tsx
```
Résultat attendu : deux lignes — une avec `"-50px"` (OptimizedImage) et une avec `"100px"` (OptimizedVideo).

- [ ] **Corriger le margin de OptimizedImage**

Dans `app/components/Screens/Portfolio/components/BentoMobile.tsx`, trouver :
```tsx
const isInView = useInView(ref, { once: true, margin: "-50px" });
```
Remplacer par :
```tsx
const isInView = useInView(ref, { once: true, margin: "300px" });
```

- [ ] **Vérifier visuellement en dev**

```bash
npm run dev
```
Ouvrir `http://localhost:4000` en mode responsive mobile (DevTools), naviguer vers une page portfolio avec un bento, scroller lentement. Les images doivent être déjà visibles (opacity:1) avant que tu arrives dessus.

- [ ] **Commit**

```bash
git add app/components/Screens/Portfolio/components/BentoMobile.tsx
git commit -m "perf: BentoMobile — déclencher animation images 300px avant le viewport"
```

---

## Task 2 : Lazy loading des vidéos BentoMobile

**Fichiers :**
- Modifier : `app/components/Screens/Portfolio/components/BentoMobile.tsx`

**Contexte :** Le composant `OptimizedVideo` rend `<video src={src} preload="auto">`. Le `src` est assigné immédiatement au montage — le navigateur démarre le téléchargement de toutes les vidéos bento dès que la page charge, peu importe leur position dans la page.

**Fix :** La `<video>` est rendue sans `src`. Un `IntersectionObserver` natif avec `rootMargin: "600px"` assigne `video.src` 600px avant que l'utilisateur y arrive. Le `useInView` framer-motion (margin: "100px") continue de gérer play/pause.

- [ ] **Remplacer entièrement le composant `OptimizedVideo`**

Dans `app/components/Screens/Portfolio/components/BentoMobile.tsx`, remplacer tout le bloc `const OptimizedVideo = memo(...)` par :

```tsx
const OptimizedVideo = memo(function OptimizedVideo({
  src,
  className,
  index,
}: {
  src: string;
  className: string;
  index: number;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const srcRef = useRef(src);
  const isInView = useInView(ref, { once: false, margin: "100px" });

  // Pré-charger la vidéo 600px avant d'entrer dans le viewport
  useEffect(() => {
    const wrapper = ref.current;
    const video = videoRef.current;
    if (!wrapper || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && video) {
          video.src = srcRef.current;
          observer.disconnect();
        }
      },
      { rootMargin: "600px" }
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  const attemptPlay = () => {
    const video = videoRef.current;
    if (!video || !video.src) return;
    video.muted = true;
    video.play().catch(() => {});
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isInView) {
      attemptPlay();
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <video
        ref={videoRef}
        className="w-full h-auto object-contain transition-all duration-500"
        style={{
          filter: isLoaded ? "blur(0px)" : "blur(8px)",
          transform: isLoaded ? "scale(1)" : "scale(1.02)",
        }}
        onLoadedMetadata={attemptPlay}
        onCanPlay={() => {
          setIsLoaded(true);
          attemptPlay();
        }}
        muted
        loop
        playsInline
        preload="none"
      >
        Votre navigateur ne prend pas en charge la lecture de vidéos.
      </video>
    </motion.div>
  );
});
```

Points clés :
- `preload="none"` → le browser ne télécharge rien avant que l'Observer le décide
- Pas de `src` sur le `<video>` dans le JSX
- `srcRef` stocke l'URL, assignée via l'Observer à 600px
- `autoPlay` supprimé (géré manuellement via `attemptPlay`)
- `attemptPlay` vérifie `video.src` avant de jouer (guard)

- [ ] **Vérifier : pas de requête vidéo au chargement initial**

```bash
npm run dev
```
DevTools → Network → filter "video". Ouvrir une page portfolio bento sur mobile. Au chargement, **aucune vidéo ne doit apparaître dans le Network**. En scrollant vers une vidéo, elle doit apparaître dans le Network uniquement quand on est à ~600px de distance.

- [ ] **Commit**

```bash
git add app/components/Screens/Portfolio/components/BentoMobile.tsx
git commit -m "perf: BentoMobile — lazy loading vidéos par IntersectionObserver (rootMargin 600px)"
```

---

## Task 3 : Étendre le cache Workbox (SW)

**Fichiers :**
- Modifier : `vite.config.ts`

**Contexte :** La config Workbox existante ne cache que `/api/image`. Les images dans `/images/` et les vidéos dans `/video/` et `/uploads/` sont retéléchargées à chaque visite. On ajoute deux règles `CacheFirst` après la règle existante.

Note : `rangeRequests: true` active le `RangeRequestsPlugin` de Workbox — indispensable pour les vidéos qui utilisent des Range requests HTTP (status 206).

- [ ] **Ajouter les deux règles dans `vite.config.ts`**

Dans `vite.config.ts`, trouver le bloc `runtimeCaching: [` (section Workbox). Il contient une entrée pour `/api/image`. Ajouter les deux règles suivantes **après** cette entrée, avant le `]` de fermeture :

```ts
          {
            // Images statiques /public/images/
            urlPattern: /^https?:\/\/[^/]+\/images\//,
            handler: "CacheFirst",
            options: {
              cacheName: "static-images",
              expiration: {
                maxEntries: 150,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 jours
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Vidéos /public/video/ et uploads bento
            urlPattern: /^https?:\/\/[^/]+\/(video|uploads)\//,
            handler: "CacheFirst",
            options: {
              cacheName: "static-videos",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 jours
              },
              cacheableResponse: { statuses: [0, 200] },
              rangeRequests: true,
            },
          },
```

- [ ] **Vérifier le build**

```bash
npm run build 2>&1 | tail -20
```
Résultat attendu : build terminé sans erreur. Le SW généré doit inclure les nouvelles règles.

- [ ] **Commit**

```bash
git add vite.config.ts
git commit -m "perf: SW Workbox — cache CacheFirst pour /images/, /video/, /uploads/"
```

---

## Task 4 : Branding manifest PWA

**Fichiers :**
- Modifier : `vite.config.ts`

**Contexte :** Le manifest PWA contient encore `"Mon App Remix"` — affiché quand l'utilisateur ajoute le site à son écran d'accueil.

- [ ] **Mettre à jour le manifest dans `vite.config.ts`**

Trouver la section `manifest:` dans `vite.config.ts`. Remplacer :
```ts
          name: "Mon App Remix",
          short_name: "App Remix",
          description: "Mon application Remix avec Tailwind CSS",
          theme_color: "#ffffff",
```
Par :
```ts
          name: "Say Yes",
          short_name: "Say Yes",
          description: "Say Yes — Agence créative, branding, digital, vidéo",
          theme_color: "#0a0a0a",
```

- [ ] **Commit**

```bash
git add vite.config.ts
git commit -m "chore: manifest PWA — branding Say Yes"
```

---

## Task 5 : Créer le hook `usePrefetchOnIdle`

**Fichiers :**
- Créer : `app/utils/hooks/usePrefetchOnIdle.ts`

**Contexte :** Après 2 secondes sur la homepage, on injecte des `<link rel="prefetch">` pour les routes `/solutions` et `/portfolio` et pour les images critiques du menu/pages cibles. Le `rel="prefetch"` a une priorité navigateur `Idle` — ne concurrence pas le chargement courant. Les images passent par `/api/image` pour être mises en cache par le SW.

- [ ] **Créer `app/utils/hooks/usePrefetchOnIdle.ts`**

```ts
import { useEffect } from "react";

const ROUTES_TO_PREFETCH = ["/solutions", "/portfolio"];

const IMAGES_TO_PREFETCH = [
  "/images/bg-menu-mobile.png",
  "/images/solutions/Card1.png",
  "/images/solutions/Card2.png",
  "/images/solutions/Card3.png",
  "/images/solutions/Card4.png",
  "/images/solutions/Card5.png",
  "/images/solutions/MasqueMobile.png",
  "/images/portfolio/bg.png",
  "/images/portfolio/ClientWallmobile.png",
];

function injectPrefetchLink(href: string, as?: string): HTMLLinkElement {
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = href;
  if (as) link.setAttribute("as", as);
  document.head.appendChild(link);
  return link;
}

/**
 * Déclenche un prefetch silencieux 2s après le montage.
 * Mobile uniquement (window.innerWidth < 768). N'affecte pas le chargement initial.
 */
export function usePrefetchOnIdle(): void {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 768) return;

    const links: HTMLLinkElement[] = [];

    const prefetch = () => {
      // Routes Remix — précharge les chunks JS + données loader
      for (const route of ROUTES_TO_PREFETCH) {
        links.push(injectPrefetchLink(route, "document"));
      }

      // Images via /api/image → passent dans le SW CacheFirst
      for (const imgPath of IMAGES_TO_PREFETCH) {
        const url = `/api/image?src=${encodeURIComponent(imgPath)}&w=640&q=75`;
        links.push(injectPrefetchLink(url, "image"));
      }
    };

    const timer = setTimeout(prefetch, 2000);

    return () => {
      clearTimeout(timer);
      links.forEach((link) => link.parentNode?.removeChild(link));
    };
  }, []);
}
```

- [ ] **Vérifier le typage**

```bash
npm run typecheck
```
Résultat attendu : 0 erreurs TypeScript.

- [ ] **Commit**

```bash
git add app/utils/hooks/usePrefetchOnIdle.ts
git commit -m "feat: hook usePrefetchOnIdle — prefetch routes et images 2s après homepage"
```

---

## Task 6 : Intégrer le hook dans la homepage

**Fichiers :**
- Modifier : `app/routes/_index.tsx`

**Contexte :** Le hook doit être appelé dans le composant `Index()` de la homepage. Il s'auto-limite au mobile et au délai de 2s, aucune condition supplémentaire nécessaire.

- [ ] **Ajouter l'import dans `app/routes/_index.tsx`**

Après la ligne `import FadeInView from "~/components/FadeInView";`, ajouter :
```tsx
import { usePrefetchOnIdle } from "~/utils/hooks/usePrefetchOnIdle";
```

- [ ] **Appeler le hook dans `Index()`**

Dans la fonction `Index()`, après la ligne `const isMobile = useViewport();`, ajouter :
```tsx
  usePrefetchOnIdle();
```

- [ ] **Vérifier : les `<link rel="prefetch">` apparaissent dans le DOM**

```bash
npm run dev
```
Sur mobile (DevTools responsive), ouvrir `http://localhost:4000`. Attendre 2 secondes, puis inspecter le `<head>` dans DevTools Elements. Des éléments `<link rel="prefetch" href="/solutions">`, `<link rel="prefetch" href="/portfolio">` et des `<link rel="prefetch" href="/api/image?src=...">` doivent être présents.

Dans l'onglet Network, des requêtes vers `/api/image?src=%2Fimages%2Fbg-menu-mobile.png...` doivent apparaître environ 2s après le chargement.

- [ ] **Commit**

```bash
git add app/routes/_index.tsx
git commit -m "feat: homepage — intégration usePrefetchOnIdle pour navigation mobile"
```

---

## Task 7 : MenuMobile — image de fond via OptimizedImage

**Fichiers :**
- Modifier : `app/components/Header/components/MenuMobile.tsx`

**Contexte :** Le fond du menu burger est un `<img src="/images/bg-menu-mobile.png">` direct — servi en PNG brut. En passant par `OptimizedImage`, l'image passe par `/api/image` (WebP 640px) et le SW la met en cache après la première ouverture.

- [ ] **Ajouter l'import `OptimizedImage`**

Dans `app/components/Header/components/MenuMobile.tsx`, après les imports existants, ajouter :
```tsx
import OptimizedImage from "~/components/ui/OptimizedImage";
```

- [ ] **Remplacer le `<img>` par `<OptimizedImage>`**

Trouver :
```tsx
            <img
              src="/images/bg-menu-mobile.png"
              alt=""
              className="w-full h-full object-cover"
            />
```
Remplacer par :
```tsx
            <OptimizedImage
              src="/images/bg-menu-mobile.png"
              alt=""
              mobileSize="mobile"
              noWrapper
              noPlaceholder
              className="w-full h-full object-cover"
            />
```

`noWrapper` : évite le div wrapper qui casserait le layout (l'image est dans un `motion.div` avec position absolute).
`noPlaceholder` : pas de blur placeholder pour un fond de menu.

- [ ] **Vérifier visuellement**

```bash
npm run dev
```
Sur mobile, ouvrir le menu burger. Le fond doit s'afficher normalement. Dans DevTools Network, la requête doit cibler `/api/image?src=%2Fimages%2Fbg-menu-mobile.png&w=640&q=75`, pas `/images/bg-menu-mobile.png` directement.

- [ ] **Commit**

```bash
git add app/components/Header/components/MenuMobile.tsx
git commit -m "perf: menu mobile — image fond via OptimizedImage (WebP, cache SW)"
```

---

## Vérification finale

- [ ] **Build de production**

```bash
npm run build
```
Résultat attendu : build réussi, pas d'erreur Workbox, pas d'erreur TypeScript.

- [ ] **Test SW en prod locale**

```bash
npm start
```
Ouvrir `http://localhost:4000` en mode mobile. Dans DevTools → Application → Service Workers, vérifier que le SW est actif. Dans Cache Storage, après avoir navigué sur quelques pages, vérifier que les caches `optimized-images`, `static-images` et `static-videos` existent et contiennent des entrées.
