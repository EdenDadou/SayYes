# Images statiques pré-optimisées en WebP

**Date :** 2026-04-16  
**Scope :** `/public/images/` uniquement (fichiers statiques, jamais modifiés manuellement)  
**Objectif :** Éliminer le traitement Sharp à la volée pour les images statiques. Les WebP sont générés une fois, committés dans git, servis directement par Express static — zéro latence Sharp, zéro passage par `/api/image`.

---

## Contexte

Les 90 PNGs dans `/public/images/` pèsent 73 MB. À chaque première visite, Sharp les traite à la volée via `/api/image`. Ces fichiers ne changent jamais entre deux déploiements : ils sont donc des candidats parfaits pour une pré-optimisation statique.

Les fichiers dans `/uploads/` sont gérés par l'admin et peuvent changer → ils restent sur le pipeline Sharp (`/api/image`). Ce spec ne les touche pas.

---

## Ce qui existe déjà (ne pas toucher)

- **`/api/image`** : Sharp + cache L1/L2. Reste en service pour `/uploads/` et les tailles `thumbnail`/`full` des images statiques.
- **`app/utils/optimizeImage.ts`** : `getOptimizedImageUrl()`, `generateSrcSet()`, `SIZE_CONFIG`.
- **`app/components/ui/OptimizedImage.tsx`** : composant qui consomme `getOptimizedImageUrl`.
- **Service Worker** : règle CacheFirst pour `/images/` déjà en place — les WebP seront automatiquement mis en cache.

---

## Section 1 — Script de génération

**Fichier :** `scripts/optimize-images.js`

Script Node.js ESM. Utilise `sharp` (déjà installé).

**Comportement :**
- Parcourt récursivement `public/images/**/*.{png,jpg,jpeg}` (exclut les fichiers déjà en `.webp`)
- Pour chaque image source, génère 4 WebP dans le **même dossier** :
  - `{basename}-20.webp` — qualité 30 (placeholder blur)
  - `{basename}-640.webp` — qualité 75 (mobile)
  - `{basename}-1024.webp` — qualité 80 (tablet)
  - `{basename}-1920.webp` — qualité 85 (desktop)
- **Skip** si le WebP cible existe déjà ET que son `mtime` est postérieur à celui du fichier source
- Log par fichier : `✓ Card5.png → 4 WebP (Card5-20.webp, Card5-640.webp, ...)`
- Log final : `Done. X images processed, Y skipped.`

**Exemples de chemins générés :**
```
public/images/solutions/Card5.png
  → public/images/solutions/Card5-20.webp
  → public/images/solutions/Card5-640.webp
  → public/images/solutions/Card5-1024.webp
  → public/images/solutions/Card5-1920.webp

public/images/homepage/mobile/title.png
  → public/images/homepage/mobile/title-20.webp
  → public/images/homepage/mobile/title-640.webp
  → public/images/homepage/mobile/title-1024.webp
  → public/images/homepage/mobile/title-1920.webp
```

**Script npm :**
```json
"images:optimize": "node scripts/optimize-images.js"
```

**Première utilisation :**
```bash
npm run images:optimize   # génère ~360 WebP
git add public/images/    # inclure les WebP générés
git commit -m "perf: pre-optimized WebP for all static images"
```

---

## Section 2 — Modification de `getOptimizedImageUrl`

**Fichier :** `app/utils/optimizeImage.ts`

**Tailles avec chemin statique** (celles pour lesquelles des WebP sont générés) :
```
placeholder → -20.webp
mobile      → -640.webp
tablet      → -1024.webp
desktop     → -1920.webp
```

**Tailles qui restent sur `/api/image`** (non générées) :
```
thumbnail → /api/image?src=...&w=150&q=60
full      → /api/image?src=...&w=2560&q=90
```

**Logique :**
```ts
const STATIC_WEBP_SIZES: ImageSize[] = ["placeholder", "mobile", "tablet", "desktop"];

// Dans getOptimizedImageUrl(), après les guards existants :
if (normalizedUrl.startsWith("/images/") && STATIC_WEBP_SIZES.includes(size)) {
  const config = SIZE_CONFIG[size];
  const dotIndex = normalizedUrl.lastIndexOf(".");
  const base = dotIndex !== -1 ? normalizedUrl.slice(0, dotIndex) : normalizedUrl;
  return `${base}-${config.width}.webp`;
}
// Suite normale → /api/image pour /uploads/ et les tailles non générées
```

**Résultats :**
```
getOptimizedImageUrl('/images/solutions/Card5.png', 'mobile')
  → '/images/solutions/Card5-640.webp'  ← fichier statique direct

getOptimizedImageUrl('/images/solutions/Card5.png', 'thumbnail')
  → '/api/image?src=/images/solutions/Card5.png&w=150&q=60'  ← Sharp

getOptimizedImageUrl('/uploads/bento/photo.jpg', 'mobile')
  → '/api/image?src=/uploads/bento/photo.jpg&w=640&q=75'  ← Sharp inchangé
```

`generateSrcSet` fonctionne sans modification (appelle `getOptimizedImageUrl` pour chaque taille).

---

## Section 3 — Pre-commit hook

**Fichier à créer :** `.githooks/pre-commit`

Script bash exécuté automatiquement lors de chaque `git commit`.

**Comportement :**
1. Récupère la liste des fichiers `.png`/`.jpg`/`.jpeg` stagés dans `public/images/`
2. Si aucun PNG stagé → exit 0 immédiatement (pas d'overhead)
3. Pour chaque PNG stagé → génère les 4 WebP via `node scripts/optimize-images.js --file <path>` (mode single-file)
4. `git add` les WebP générés → ils sont inclus dans le commit en cours
5. Log : `[pre-commit] Optimizing 2 new image(s)...`

**Activation :**
```json
// package.json
"prepare": "git config core.hooksPath .githooks"
```

Activation automatique au prochain `npm install`.

**Mode `--file` du script :**
Le script `optimize-images.js` accepte un argument optionnel `--file <path>` pour ne traiter qu'une image spécifique (utilisé par le hook) sans re-parcourir tout `public/images/`.

---

## Fichiers créés / modifiés

| Fichier | Changement |
|---|---|
| `scripts/optimize-images.js` | Nouveau script Sharp (créer) |
| `.githooks/pre-commit` | Nouveau hook (créer) |
| `app/utils/optimizeImage.ts` | Branching statique pour `/images/` dans `getOptimizedImageUrl` |
| `package.json` | Ajout `"images:optimize"` + `"prepare"` |
| `public/images/**/*.webp` | ~360 fichiers générés (committés dans git) |

---

## Ce qu'on ne fait PAS

- Pas de modification de `/api/image` (reste pour `/uploads/`)
- Pas de WebP pour les SVGs (déjà vectoriels)
- Pas de WebP pour les fichiers dans `/uploads/` (contenu admin dynamique)
- Pas de tailles `thumbnail` (150px) ni `full` (2560px) en statique (usage rare, Sharp suffit)
- Pas de conversion batch JPG→WebP des uploads (hors scope)
