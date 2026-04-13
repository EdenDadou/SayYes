# Optimisation performances — Pages portfolio `/portfolio/$slug`

**Date :** 2026-04-13  
**Contexte :** Les pages de détail portfolio mettent trop longtemps à afficher l'image principale. Le site contient beaucoup de médias (images, vidéos bento). Les utilisateurs arrivent principalement via la grille `/portfolio`.

---

## Diagnostic

### Waterfall actuel (navigation depuis la grille)

```
1. [instant]   allPortfolios chargé en mémoire (grille)
2. [~100ms]    fetchPortfolioBySlug → fetch /api/portfolios/slug/${slug}   ← INUTILE
3. [~50-250ms] timers staged loading (50ms, 150ms, 250ms)                 ← DÉLAIS ARTIFICIELS
4. [~200-800ms] fetch /api/image (Sharp processing si cache froid)        ← LENT À FROID
```

### Cause racine

`getPublicPortfolios` retourne déjà toutes les données nécessaires à la page de détail (bento, temoignage, livrable, couleur, photoMain…), **mais** le `portfolioCache` n'est jamais pré-rempli depuis cette liste. Résultat : un fetch réseau inutile est déclenché à chaque navigation depuis la grille.

### Contrainte SEO

Les champs `metaTitle`, `metaDescription`, `schemaOrg`, `photoMainAlt`, `photoCouvertureAlt` sont absents de `getPublicPortfolios`. Ils doivent être ajoutés pour que le cache pré-rempli soit complet et que les métadonnées SEO soient disponibles sans fetch supplémentaire.

---

## Solutions (dans l'ordre d'implémentation)

### 1. Pre-populate le portfolioCache depuis allPortfolios

**Fichiers concernés :**
- `app/server/portfolio.server.ts` — `getPublicPortfolios`
- `app/contexts/PortfolioContext.tsx` — `fetchAllPortfolios`

**Changements :**

`getPublicPortfolios` : ajouter au `select` Prisma les champs manquants :
- `metaTitle`, `metaDescription`, `schemaOrg` (SEO)
- `photoMainAlt`, `photoCouvertureAlt` (alt images)

`PortfolioContext.fetchAllPortfolios` : après `setAllPortfolios(data.portfolios)`, construire le `portfolioCache` en indexant chaque portfolio par son slug :

```ts
const cache = new Map<string, PortfolioData>();
data.portfolios.forEach((p) => cache.set(p.slug, p));
setPortfolioCache(cache);
```

**Résultat :** `fetchPortfolioBySlug` trouve le portfolio en cache immédiatement → 0 appel réseau depuis la grille.

---

### 2. Prefetch image au hover (desktop uniquement)

**Fichiers concernés :**
- `app/components/Card/components/ContentPortfolio.tsx` (ou le composant Card de la grille)

**Changement :**

Au `onMouseEnter` de la carte, déclencher le préchargement de l'image principale :

```ts
const handleMouseEnter = () => {
  const url = getOptimizedImageUrl(imageUrl, "desktop");
  const img = new Image();
  img.src = url;
};
```

Le navigateur met l'image en cache HTTP. Au clic → navigation → `PhotoMain` trouve l'image déjà en cache → affichage immédiat.

**Scope :** desktop uniquement (pas de hover sur mobile). Throttle recommandé (une seule instanciation par carte).

---

### 3. Réduction des timers staged loading

**Fichier concerné :**
- `app/routes/portfolio+/$slug.tsx`

**Changement :**

Réduire les délais artificiels maintenant que les données sont disponibles instantanément :
- Stage 1 (fond) : 0ms au lieu de 50ms
- Stage 2 (titre) : 50ms au lieu de 150ms  
- Stage 3 (photo) : 100ms au lieu de 250ms
- Fallback stage 4 : 1500ms au lieu de 2000ms

---

### 4. Loader Remix SSR pour les visites directes

**Fichiers concernés :**
- `app/routes/portfolio+/$slug.tsx` — ajouter un `loader`
- `app/server/portfolio.server.ts` — `getPortfolioBySlug` (déjà existant)

**Changement :**

Ajouter un `loader` Remix qui fetch le portfolio server-side et le retourne via `json()`. Dans le composant, utiliser `useLoaderData` pour initialiser le state et pré-remplir le `PortfolioContext`.

```ts
export async function loader({ params }: LoaderFunctionArgs) {
  const portfolio = await getPortfolioBySlug(params.slug!);
  if (!portfolio) throw new Response("Not found", { status: 404 });
  return json({ portfolio });
}
```

Dans le composant, initialiser le `portfolio` depuis `useLoaderData` en priorité, puis laisser le contexte prendre le relais pour la navigation interne.

**Bénéfices :**
- Rendu HTML avec données dès le premier octet (pas de LoadingBar pour les visites directes)
- Métadonnées SEO disponibles au SSR (suppression de la manipulation DOM via `useMetaData`)
- Amélioration Core Web Vitals (LCP, FCP)
- Meilleure indexation Google

**Note :** `useMetaData` (manipulation DOM) reste en fallback pour la navigation client-side, mais le `meta` Remix prend le dessus pour les visites directes.

---

### 5. Pré-chauffe du cache image (bonus)

**Fichier concerné :**
- `app/routes/admin+/warm-cache.tsx` (nouveau fichier)

**Changement :**

Route admin protégée qui itère sur tous les portfolios et envoie des requêtes parallèles vers `/api/image` pour les tailles clés (640px, 1280px) des `photoMain` et `photoCouverture`. À déclencher manuellement après un déploiement ou un redémarrage serveur.

```ts
// Action : GET /admin/warm-cache
// Déclenche le warm-up de toutes les images portfolios
```

---

## Ordre d'implémentation

| Priorité | Changement | Impact | Effort |
|----------|------------|--------|--------|
| 1 | Ajouter champs SEO à `getPublicPortfolios` | Critique (SEO + cache) | Très faible |
| 2 | Pre-populate `portfolioCache` depuis `allPortfolios` | Très élevé | Faible |
| 3 | Prefetch image au hover | Élevé (desktop) | Faible |
| 4 | Réduire timers staged loading | Moyen | Très faible |
| 5 | Loader SSR dans `$slug.tsx` | Élevé (SEO + direct) | Moyen |
| 6 | Route warm-cache admin | Moyen | Faible |

---

## Ce qui ne change pas

- Architecture globale `PortfolioContext` conservée
- `OptimizedImage` / `PhotoMain` inchangés
- Cache L1/L2 de `/api/image` inchangé
- Animations staged loading conservées (délais réduits seulement)
- Pas de CDN ajouté (hors scope)
