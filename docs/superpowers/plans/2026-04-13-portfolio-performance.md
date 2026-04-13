# Optimisation performances portfolio — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Éliminer les temps de chargement lents sur les pages `/portfolio/$slug` en supprimant les fetches réseau inutiles, en activant la navigation client-side, et en ajoutant un loader SSR pour les visites directes.

**Architecture:** (1) `getPublicPortfolios` retourne les données SEO complètes → le contexte pré-remplit le cache portfolio au chargement de la grille. (2) Suppression de `reloadDocument` sur les cartes → navigation client-side Remix, le cache persiste. (3) Prefetch image au hover desktop → image déjà dans le cache HTTP au clic. (4) Loader SSR dans `$slug.tsx` → visites directes et Google reçoivent les données immédiatement.

**Tech Stack:** Remix v2, React 18, Prisma/SQLite, Sharp (cache image L1+L2), Framer Motion, TypeScript

---

## Fichiers modifiés

| Fichier | Action | Responsabilité |
|---------|--------|---------------|
| `app/server/portfolio.server.ts` | Modifier | Ajouter champs SEO au `select` et au `map` de `getPublicPortfolios` |
| `app/contexts/PortfolioContext.tsx` | Modifier | Pré-remplir `portfolioCache` après `fetchAllPortfolios` |
| `app/components/Card/components/ContentPortfolio.tsx` | Modifier | Supprimer `reloadDocument`, ajouter prefetch image au hover |
| `app/routes/portfolio+/$slug.tsx` | Modifier | Réduire timers staged loading + ajouter loader SSR |
| `app/routes/admin+/warm-cache.tsx` | Créer | Route admin pour pré-chauffer le cache image |

---

## Task 1 : Ajouter les champs SEO à `getPublicPortfolios`

**Fichier :** `app/server/portfolio.server.ts`

**Contexte :** `getPublicPortfolios` (ligne ~449) a un `select` Prisma et un `map` de retour. Les champs `metaTitle`, `metaDescription`, `schemaOrg`, `photoCouvertureAlt`, `photoMainAlt` sont absents du `select` (donc non chargés depuis la BDD). Les `Alt` sont déjà dans le `map` via `(portfolio as any)` mais retournent `undefined` car absents du `select`.

- [ ] **Étape 1 : Ajouter les champs manquants au `select` Prisma**

Dans `app/server/portfolio.server.ts`, trouver le bloc `select` de `getPublicPortfolios` (vers ligne 452) et ajouter :

```ts
select: {
  id: true,
  titre: true,
  categories: true,
  slug: true,
  photoCouverture: true,
  photoCouvertureAlt: true,   // ← AJOUTER
  photoMain: true,
  photoMainAlt: true,         // ← AJOUTER
  description: true,
  kicker: true,
  sousTitre: true,
  topTitle: true,
  couleur: true,
  temoignage: true,
  livrable: true,
  bento: true,
  metaTitle: true,            // ← AJOUTER
  metaDescription: true,      // ← AJOUTER
  schemaOrg: true,            // ← AJOUTER
  createdAt: true,
},
```

- [ ] **Étape 2 : Ajouter les champs au `map` de retour**

Dans le même `getPublicPortfolios`, trouver le bloc `return { id: portfolio.id, ...}` (vers ligne 474) et ajouter les champs SEO. Le bloc complet devient :

```ts
return {
  id: portfolio.id,
  titre: portfolio.titre,
  categories: safeParse(portfolio.categories, []),
  slug: portfolio.slug,
  photoCouverture: portfolio.photoCouverture,
  photoCouvertureAlt: portfolio.photoCouvertureAlt || "",
  photoMain: portfolio.photoMain || "",
  photoMainAlt: portfolio.photoMainAlt || "",
  description: portfolio.description || "",
  kicker: portfolio.kicker || "",
  sousTitre: portfolio.sousTitre || "",
  topTitle: portfolio.topTitle || "",
  couleur: portfolio.couleur || "",
  createdAt: portfolio.createdAt,
  livrable: safeParse(portfolio.livrable, []),
  bento: safeParse(portfolio.bento, []),
  temoignage: safeParse(portfolio.temoignage, {
    auteur: "",
    contenu: "",
  }),
  metaTitle: portfolio.metaTitle || "",
  metaDescription: portfolio.metaDescription || "",
  schemaOrg: portfolio.schemaOrg || "{}",
};
```

Faire de même pour le bloc `catch` de fallback (vers ligne 498) — ajouter les mêmes champs avec des valeurs vides :

```ts
metaTitle: "",
metaDescription: "",
schemaOrg: "{}",
```

- [ ] **Étape 3 : Vérifier la compilation TypeScript**

```bash
npm run typecheck
```

Résultat attendu : aucune erreur TypeScript.

- [ ] **Étape 4 : Commit**

```bash
git add app/server/portfolio.server.ts
git commit -m "feat: add SEO fields to getPublicPortfolios select and map"
```

---

## Task 2 : Pré-remplir le portfolioCache depuis allPortfolios

**Fichier :** `app/contexts/PortfolioContext.tsx`

**Contexte :** `fetchAllPortfolios` (ligne ~50) appelle `setAllPortfolios(data.portfolios)` mais ne touche pas au `portfolioCache`. Résultat : `fetchPortfolioBySlug` ne trouve jamais rien en cache depuis la grille et déclenche un fetch réseau inutile. `setPortfolioCache` est un `useState` setter exposé uniquement en interne.

- [ ] **Étape 1 : Modifier `fetchAllPortfolios` pour pré-remplir le cache**

Dans `app/contexts/PortfolioContext.tsx`, trouver `fetchAllPortfolios` (vers ligne 50). Après `setAllPortfolios(data.portfolios)`, ajouter :

```ts
const cache = new Map<string, PortfolioData>();
data.portfolios.forEach((p: PortfolioData) => cache.set(p.slug, p));
setPortfolioCache(cache);
```

Le bloc complet de `fetchAllPortfolios` devient :

```ts
const fetchAllPortfolios = useCallback(async () => {
  if (allPortfolios.length > 0) return;
  setIsLoading(true);
  setError(null);
  try {
    const response = await fetch("/api/portfolios");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Erreur lors du chargement des portfolios"
      );
    }

    setAllPortfolios(data.portfolios);

    // Pré-remplir le cache par slug pour un affichage instantané depuis la grille
    const cache = new Map<string, PortfolioData>();
    data.portfolios.forEach((p: PortfolioData) => cache.set(p.slug, p));
    setPortfolioCache(cache);
  } catch (err) {
    setError(err instanceof Error ? err.message : "Une erreur est survenue");
    console.error("Erreur fetch portfolios:", err);
  } finally {
    setIsLoading(false);
  }
}, [allPortfolios.length]);
```

- [ ] **Étape 2 : Vérifier la compilation TypeScript**

```bash
npm run typecheck
```

Résultat attendu : aucune erreur TypeScript.

- [ ] **Étape 3 : Commit**

```bash
git add app/contexts/PortfolioContext.tsx
git commit -m "perf: pre-populate portfolioCache from allPortfolios on grid load"
```

---

## Task 3 : Supprimer `reloadDocument` et ajouter prefetch au hover

**Fichier :** `app/components/Card/components/ContentPortfolio.tsx`

**Contexte :** Le `Link` de `ContentPortfolio` a `reloadDocument` (ligne 29), ce qui force un rechargement complet de la page à chaque clic. Cela réinitialise le `PortfolioContext` et annule le bénéfice du cache pré-rempli (Task 2). En supprimant `reloadDocument`, Remix fait une navigation client-side et le contexte persiste.

Le prefetch au hover déclenche le chargement de l'image principale avant le clic, de sorte qu'elle est déjà dans le cache HTTP du navigateur à l'arrivée sur la page de détail.

- [ ] **Étape 1 : Ajouter les imports nécessaires**

Dans `app/components/Card/components/ContentPortfolio.tsx`, ajouter `useCallback` et `useState` à l'import React (si pas déjà présents), et importer `getOptimizedImageUrl` :

```ts
import { useCallback, useRef } from "react";
import { getOptimizedImageUrl } from "~/utils/optimizeImage";
```

- [ ] **Étape 2 : Ajouter le handler prefetch et supprimer `reloadDocument`**

Remplacer la totalité du composant `ContentPortfolio` par :

```tsx
export default function ContentPortfolio({
  imageUrl,
  videoUrl,
  titre,
  topTitle,
  slug,
}: PropsContent) {
  const prefetchedRef = useRef(false);

  const handleMouseEnter = useCallback(() => {
    // Prefetch une seule fois par carte, desktop uniquement
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
      onMouseEnter={handleMouseEnter}
      className="size-full relative overflow-hidden md:rounded-[16px] hover:rounded-[26px] rounded-[10px]  md:p-2 p-1 cursor-pointer
      shadow-lg block"
    >
      <div
        style={{
          backgroundImage: videoUrl ? undefined : `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className={`${imageClasses}`}
      >
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
}
```

- [ ] **Étape 3 : Vérifier la compilation TypeScript**

```bash
npm run typecheck
```

Résultat attendu : aucune erreur TypeScript.

- [ ] **Étape 4 : Tester manuellement**

```bash
npm run dev
```

1. Aller sur `/portfolio`
2. Passer la souris sur une carte → dans DevTools Network, vérifier qu'une requête `/api/image?src=...&w=1920` apparaît
3. Cliquer sur la carte → vérifier que la navigation est fluide (pas de rechargement complet de page — la barre d'adresse change sans flash blanc)
4. Vérifier que l'image principale s'affiche rapidement (cache HTTP hit)

- [ ] **Étape 5 : Commit**

```bash
git add app/components/Card/components/ContentPortfolio.tsx
git commit -m "perf: remove reloadDocument, add image prefetch on hover for portfolio cards"
```

---

## Task 4 : Réduire les timers staged loading

**Fichier :** `app/routes/portfolio+/$slug.tsx`

**Contexte :** Les timers (50ms, 150ms, 250ms, 2000ms) dans le `useEffect` de chargement progressif ajoutent des délais artificiels. Maintenant que les données arrivent instantanément via le cache (Tasks 2-3), ces délais sont perceptibles. On les réduit sans toucher à la logique d'animation.

- [ ] **Étape 1 : Réduire les délais**

Dans `app/routes/portfolio+/$slug.tsx`, trouver le `useEffect` avec les timers (vers ligne 66). Remplacer :

```ts
// Stage 1: fond apparaît après 50ms
timers.push(setTimeout(() => setLoadStage(1), 50));
// Stage 2: hero title après 150ms
timers.push(setTimeout(() => setLoadStage(2), 150));
// Stage 3: photo main après 250ms (le stage 4 sera déclenché par onImageLoad)
timers.push(
  setTimeout(() => setLoadStage((prev) => Math.max(prev, 3)), 250)
);
// Fallback: si l'image prend trop de temps, passer au stage 4 après 2s
timers.push(setTimeout(() => setLoadStage(4), 2000));
```

Par :

```ts
// Stage 1: fond immédiat
timers.push(setTimeout(() => setLoadStage(1), 0));
// Stage 2: hero title après 50ms
timers.push(setTimeout(() => setLoadStage(2), 50));
// Stage 3: photo main après 100ms (le stage 4 sera déclenché par onImageLoad)
timers.push(
  setTimeout(() => setLoadStage((prev) => Math.max(prev, 3)), 100)
);
// Fallback: si l'image prend trop de temps, passer au stage 4 après 1500ms
timers.push(setTimeout(() => setLoadStage(4), 1500));
```

- [ ] **Étape 2 : Vérifier la compilation TypeScript**

```bash
npm run typecheck
```

- [ ] **Étape 3 : Commit**

```bash
git add app/routes/portfolio+/$slug.tsx
git commit -m "perf: reduce staged loading timers (50/150/250ms -> 0/50/100ms)"
```

---

## Task 5 : Ajouter un loader SSR à `portfolio+/$slug.tsx`

**Fichiers :** `app/routes/portfolio+/$slug.tsx`

**Contexte :** Pour les visites directes (lien partagé, Google, réseaux sociaux), il n'y a pas de contexte pré-chargé. Le loader Remix permet de rendre le HTML avec les données dès le premier octet. `getPortfolioBySlug` existe déjà dans `app/server/portfolio.server.ts` et retourne `PortfolioWithMedia | null`.

Le composant continuera à utiliser `usePortfolio()` pour la navigation client-side (cache), mais utilisera les données du loader comme fallback initial.

- [ ] **Étape 1 : Ajouter les imports du loader**

Dans `app/routes/portfolio+/$slug.tsx`, ajouter en haut du fichier :

```ts
import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPortfolioBySlug } from "~/server/portfolio.server";
import type { PortfolioData } from "~/utils/admin/manage-portfolio-types";
```

- [ ] **Étape 2 : Ajouter la fonction `loader` et la fonction `meta`**

Avant la fonction `PortfolioSlug`, ajouter :

```ts
export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  if (!slug) throw new Response("Not found", { status: 404 });

  const portfolio = await getPortfolioBySlug(slug);
  if (!portfolio) throw new Response("Not found", { status: 404 });

  return json({ portfolio });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.portfolio) return [{ title: "Portfolio — SayYes" }];
  const p = data.portfolio;
  return [
    { title: p.metaTitle || p.titre },
    { name: "description", content: p.metaDescription || p.description },
    { property: "og:title", content: p.metaTitle || p.titre },
    { property: "og:description", content: p.metaDescription || p.description },
    { property: "og:image", content: p.metaImage || p.photoCouverture },
  ];
};
```

- [ ] **Étape 3 : Utiliser les données du loader dans le composant**

Dans la fonction `PortfolioSlug`, ajouter juste après la destructuration de `usePortfolio()` :

```ts
const { portfolio: loaderPortfolio } = useLoaderData<typeof loader>();

// Pour les visites directes : utiliser les données du loader si le contexte n'est pas encore chargé
const portfolio = contextPortfolio ?? (loaderPortfolio as unknown as PortfolioData);
```

Et renommer `portfolio` de `usePortfolio()` en `contextPortfolio` :

```ts
const {
  portfolio: contextPortfolio,
  allPortfolios: _allPortfolios,
  fetchPortfolioBySlug,
  fetchAllPortfolios,
} = usePortfolio();
```

Le `useMetaData(portfolio)` existant peut rester — il gère les meta pour la navigation client-side. La fonction `meta` Remix prend le dessus pour les rendus SSR.

- [ ] **Étape 4 : Supprimer la condition `!portfolio` bloquante pour les visites directes**

La condition ligne ~117 :
```ts
if (isMobile === null || !portfolio) {
  return <LoadingBar />;
}
```

Devient (le loader garantit qu'on a toujours un portfolio) :
```ts
if (isMobile === null) {
  return <LoadingBar />;
}
```

- [ ] **Étape 5 : Vérifier la compilation TypeScript**

```bash
npm run typecheck
```

Résultat attendu : aucune erreur TypeScript.

- [ ] **Étape 6 : Tester les deux scénarios**

```bash
npm run dev
```

**Scénario 1 — Visite directe :**
1. Ouvrir un onglet en navigation privée
2. Accéder directement à `/portfolio/[un-slug]`
3. Vérifier que la page s'affiche sans LoadingBar prolongée
4. Inspecter le HTML source → les données doivent être dans le HTML (pas seulement chargées côté client)

**Scénario 2 — Navigation depuis la grille :**
1. Aller sur `/portfolio`
2. Attendre le chargement de la grille
3. Cliquer sur une carte
4. Vérifier que la page de détail s'affiche instantanément (pas de nouvelle requête réseau vers `/api/portfolios/slug/...` dans DevTools)

- [ ] **Étape 7 : Commit**

```bash
git add app/routes/portfolio+/$slug.tsx
git commit -m "feat: add SSR loader and meta function to portfolio slug route"
```

---

## Task 6 : Route admin warm-cache

**Fichier :** `app/routes/admin+/warm-cache.tsx` (nouveau fichier)

**Contexte :** Après un redémarrage PM2 ou un déploiement, le cache image (L1 mémoire + L2 disque `.cache/images/`) est vide. La première visite sur chaque portfolio déclenche un traitement Sharp lent. Cette route admin permet de pré-chauffer le cache pour les tailles desktop (1280px) et mobile (640px) de toutes les images de couverture.

- [ ] **Étape 1 : Créer la route**

Créer le fichier `app/routes/admin+/warm-cache.tsx` :

```tsx
import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { requireAuth } from "~/server/auth.server";
import { getPublicPortfolios } from "~/server/portfolio.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request);
  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  await requireAuth(request);

  const baseUrl = new URL(request.url).origin;
  const portfolios = await getPublicPortfolios();

  // Collecter toutes les URLs d'images uniques (photoMain + photoCouverture)
  const imageUrls = new Set<string>();
  portfolios.forEach((p) => {
    if (p.photoMain) imageUrls.add(p.photoMain);
    if (p.photoCouverture) imageUrls.add(p.photoCouverture);
  });

  const sizes = [640, 1280];
  const requests: Promise<Response>[] = [];

  imageUrls.forEach((url) => {
    sizes.forEach((w) => {
      requests.push(
        fetch(`${baseUrl}/api/image?src=${encodeURIComponent(url)}&w=${w}&q=80`)
      );
    });
  });

  const results = await Promise.allSettled(requests);
  const succeeded = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected").length;

  return json({
    success: true,
    total: requests.length,
    succeeded,
    failed,
    images: imageUrls.size,
  });
}

export default function WarmCache() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isWarming = navigation.state === "submitting";

  return (
    <div className="p-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Pré-chauffe du cache image</h1>
      <p className="text-gray-600 mb-6">
        Déclenche le traitement Sharp pour toutes les images de portfolios aux
        tailles 640px et 1280px. À utiliser après un redémarrage serveur ou un
        déploiement.
      </p>

      <Form method="post">
        <button
          type="submit"
          disabled={isWarming}
          className="px-6 py-3 bg-black text-white rounded-lg font-semibold disabled:opacity-50"
        >
          {isWarming ? "Chauffe en cours..." : "Lancer le warm-up"}
        </button>
      </Form>

      {actionData?.success && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="font-semibold text-green-800">Terminé ✓</p>
          <p className="text-green-700 text-sm mt-1">
            {actionData.images} images × {2} tailles ={" "}
            {actionData.total} requêtes
          </p>
          <p className="text-green-700 text-sm">
            ✓ {actionData.succeeded} succès · ✗ {actionData.failed} échecs
          </p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Étape 2 : Vérifier la compilation TypeScript**

```bash
npm run typecheck
```

Résultat attendu : aucune erreur TypeScript.

- [ ] **Étape 3 : Tester la route**

```bash
npm run dev
```

1. Se connecter à l'admin (`/admin`)
2. Naviguer sur `/admin/warm-cache`
3. Cliquer "Lancer le warm-up"
4. Vérifier le résultat affiché (nombre d'images, succès/échecs)
5. Dans DevTools Network → vérifier les requêtes `/api/image` parties depuis l'action

- [ ] **Étape 4 : Commit**

```bash
git add app/routes/admin+/warm-cache.tsx
git commit -m "feat: add admin warm-cache route to pre-heat image processing cache"
```

---

## Récapitulatif des gains attendus

| Scénario | Avant | Après |
|----------|-------|-------|
| Navigation grille → détail | ~600-1200ms (fetch + timers + image) | ~100-200ms (cache + image prefetchée) |
| Visite directe `/portfolio/$slug` | ~800-1500ms (JS + fetch + image) | ~200-400ms (SSR + image eager) |
| Image principale (desktop, cache froid) | ~300-800ms (Sharp processing) | ~0ms si prefetch hover, ~50ms si warm-up fait |
| SEO (Google, partage) | Métadonnées en JS-only (post-hydration) | Métadonnées dans le HTML initial |
