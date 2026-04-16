# Images statiques pré-optimisées en WebP — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pré-générer des WebP optimisés pour tous les PNGs de `/public/images/` afin d'éliminer le traitement Sharp à la volée sur les images statiques.

**Architecture:** Un script Node.js (`scripts/optimize-images.js`) génère des WebP à 4 tailles (20/640/1024/1920px) à côté des PNGs sources. `getOptimizedImageUrl` est modifiée pour retourner le chemin statique pour les URLs `/images/` au lieu de passer par `/api/image`. Un pre-commit hook git génère automatiquement les WebPs pour chaque nouveau PNG ajouté. Les `/uploads/` restent inchangés (pipeline Sharp).

**Tech Stack:** Node.js ESM, Sharp 0.34 (déjà installé), bash, TypeScript.

---

## Fichiers

| Fichier | Action | Responsabilité |
|---|---|---|
| `scripts/optimize-images.js` | Créer | Génère les WebP à 4 tailles, supporte `--file <path>` |
| `.githooks/pre-commit` | Créer | Détecte les PNGs stagés, génère leurs WebPs, les ajoute au commit |
| `package.json` | Modifier | Ajout scripts `images:optimize` et `prepare` |
| `app/utils/optimizeImage.ts` | Modifier | Retourne chemin statique WebP pour `/images/` aux 4 tailles supportées |

---

## Task 1 — Script `scripts/optimize-images.js`

**Files:**
- Create: `scripts/optimize-images.js`

- [ ] **Step 1 : Créer le script**

```js
// scripts/optimize-images.js
import { readdirSync, statSync, existsSync } from "node:fs";
import { resolve, join, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = resolve(fileURLToPath(import.meta.url), "..");
const ROOT = resolve(__dirname, "..");
const IMAGES_DIR = join(ROOT, "public/images");

// Tailles générées — doit correspondre à SIZE_CONFIG dans optimizeImage.ts
const SIZES = [
  { suffix: "-20", width: 20, quality: 30, enlarge: true },   // placeholder : toujours 20px
  { suffix: "-640", width: 640, quality: 75, enlarge: false },
  { suffix: "-1024", width: 1024, quality: 80, enlarge: false },
  { suffix: "-1920", width: 1920, quality: 85, enlarge: false },
];

function findImages(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findImages(full));
    } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

async function processImage(srcPath) {
  const ext = extname(srcPath);
  const base = srcPath.slice(0, -ext.length);
  const generated = [];

  for (const { suffix, width, quality, enlarge } of SIZES) {
    const outPath = `${base}${suffix}.webp`;

    // Skip si le WebP existe déjà et est plus récent que la source
    if (existsSync(outPath)) {
      const srcMtime = statSync(srcPath).mtimeMs;
      const outMtime = statSync(outPath).mtimeMs;
      if (outMtime > srcMtime) continue;
    }

    await sharp(srcPath)
      .resize({ width, withoutEnlargement: !enlarge })
      .webp({ quality })
      .toFile(outPath);

    generated.push(basename(outPath));
  }

  return generated;
}

async function main() {
  // Mode --file <path> : ne traite qu'une image (utilisé par le pre-commit hook)
  const fileArgIndex = process.argv.indexOf("--file");
  const sources =
    fileArgIndex !== -1
      ? [resolve(process.argv[fileArgIndex + 1])]
      : findImages(IMAGES_DIR);

  let processed = 0;
  let skipped = 0;

  for (const srcPath of sources) {
    const generated = await processImage(srcPath);
    if (generated.length > 0) {
      console.log(`✓ ${basename(srcPath)} → ${generated.join(", ")}`);
      processed++;
    } else {
      skipped++;
    }
  }

  console.log(`\nDone. ${processed} image(s) processed, ${skipped} skipped.`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
```

- [ ] **Step 2 : Tester le script sur une seule image**

```bash
node scripts/optimize-images.js --file public/images/bg-menu-mobile.png
```

Résultat attendu :
```
✓ bg-menu-mobile.png → bg-menu-mobile-20.webp, bg-menu-mobile-640.webp, bg-menu-mobile-1024.webp, bg-menu-mobile-1920.webp

Done. 1 image(s) processed, 0 skipped.
```

Vérifier que les 4 fichiers existent :
```bash
ls -lh public/images/bg-menu-mobile-*.webp
```

- [ ] **Step 3 : Vérifier le skip (idempotence)**

Relancer la même commande :
```bash
node scripts/optimize-images.js --file public/images/bg-menu-mobile.png
```

Résultat attendu :
```
Done. 0 image(s) processed, 1 skipped.
```

- [ ] **Step 4 : Commit**

```bash
git add scripts/optimize-images.js
git commit -m "feat: script de génération WebP pour les images statiques"
```

---

## Task 2 — Scripts npm

**Files:**
- Modify: `package.json`

- [ ] **Step 1 : Ajouter les scripts dans `package.json`**

Localiser le bloc `"scripts"` et ajouter après `"icons:watch"` :

```json
"images:optimize": "node scripts/optimize-images.js",
"prepare": "git config core.hooksPath .githooks",
```

Résultat attendu dans `package.json` :
```json
"scripts": {
  "icons": "node ./app/utils/scripts/generate-icons.js",
  "icons:watch": "npm-watch icons",
  "images:optimize": "node scripts/optimize-images.js",
  "prepare": "git config core.hooksPath .githooks",
  "dev:svg": "run-s icons icons:watch",
  ...
}
```

- [ ] **Step 2 : Vérifier que le script npm fonctionne**

```bash
npm run images:optimize -- --file public/images/bg-menu-mobile.png
```

Résultat attendu :
```
Done. 0 image(s) processed, 1 skipped.
```
(skip car déjà généré à la Task 1)

- [ ] **Step 3 : Commit**

```bash
git add package.json
git commit -m "feat: npm scripts images:optimize et prepare (git hooks)"
```

---

## Task 3 — Pre-commit hook `.githooks/pre-commit`

**Files:**
- Create: `.githooks/pre-commit`

- [ ] **Step 1 : Créer le dossier `.githooks/` et le hook**

```bash
mkdir -p .githooks
```

Créer `.githooks/pre-commit` avec ce contenu :

```bash
#!/usr/bin/env bash
set -e

# Détecte les PNG/JPG nouvellement stagés dans public/images/
STAGED=$(git diff --cached --name-only --diff-filter=ACM | grep -E '^public/images/.*\.(png|jpe?g)$' || true)

if [ -z "$STAGED" ]; then
  exit 0
fi

echo "[pre-commit] Optimizing newly staged image(s)..."

while IFS= read -r FILE; do
  if [ -f "$FILE" ]; then
    node scripts/optimize-images.js --file "$FILE"
    BASENAME="${FILE%.*}"
    for SIZE in 20 640 1024 1920; do
      WEBP="${BASENAME}-${SIZE}.webp"
      if [ -f "$WEBP" ]; then
        git add "$WEBP"
      fi
    done
  fi
done <<< "$STAGED"

echo "[pre-commit] Done."
```

- [ ] **Step 2 : Rendre le hook exécutable**

```bash
chmod +x .githooks/pre-commit
```

- [ ] **Step 3 : Activer le dossier de hooks**

```bash
npm run prepare
```

Résultat attendu :
```
> say-yes@...
> git config core.hooksPath .githooks
```

Vérifier :
```bash
git config core.hooksPath
```

Résultat attendu : `.githooks`

- [ ] **Step 4 : Tester le hook manuellement (sans commit)**

Simuler un nouveau PNG stagé :
```bash
cp public/images/bg-menu-mobile.png public/images/test-hook.png
git add public/images/test-hook.png
# Exécuter le hook directement
bash .githooks/pre-commit
```

Résultat attendu :
```
[pre-commit] Optimizing newly staged image(s)...
✓ test-hook.png → test-hook-20.webp, test-hook-640.webp, test-hook-1024.webp, test-hook-1920.webp
[pre-commit] Done.
```

Vérifier que les WebPs ont été auto-stagés :
```bash
git diff --cached --name-only | grep test-hook
```

Résultat attendu :
```
public/images/test-hook-1024.webp
public/images/test-hook-1920.webp
public/images/test-hook-20.webp
public/images/test-hook-640.webp
public/images/test-hook.png
```

Nettoyer sans laisser de trace :
```bash
git restore --staged public/images/test-hook.png public/images/test-hook-20.webp public/images/test-hook-640.webp public/images/test-hook-1024.webp public/images/test-hook-1920.webp
rm public/images/test-hook.png public/images/test-hook-*.webp
```

- [ ] **Step 5 : Commit**

```bash
git add .githooks/pre-commit
git commit -m "feat: pre-commit hook — WebP auto-généré pour nouveaux PNGs"
```

---

## Task 4 — `getOptimizedImageUrl` — chemin statique pour `/images/`

**Files:**
- Modify: `app/utils/optimizeImage.ts`

- [ ] **Step 1 : Ajouter la constante `STATIC_WEBP_SIZES` après `SIZE_CONFIG`**

Dans `app/utils/optimizeImage.ts`, après la déclaration de `SIZE_CONFIG` (ligne ~26), ajouter :

```ts
// Tailles pour lesquelles des WebP statiques sont pré-générés dans /public/images/
// Doit correspondre aux SIZES dans scripts/optimize-images.js
const STATIC_WEBP_SIZES: ImageSize[] = ["placeholder", "mobile", "tablet", "desktop"];
```

- [ ] **Step 2 : Ajouter le branch statique dans `getOptimizedImageUrl`**

Dans `getOptimizedImageUrl`, **après** le bloc guard lignes 88-93 (le `if (!normalizedUrl.startsWith...)`) et **avant** `const config = SIZE_CONFIG[size]` (ligne 95), insérer :

```ts
  // Images statiques /images/ → WebP pré-généré, bypass /api/image
  if (normalizedUrl.startsWith("/images/") && STATIC_WEBP_SIZES.includes(size)) {
    const config = SIZE_CONFIG[size];
    const dotIndex = normalizedUrl.lastIndexOf(".");
    const base = dotIndex !== -1 ? normalizedUrl.slice(0, dotIndex) : normalizedUrl;
    return `${base}-${config.width}.webp`;
  }
```

Résultat final de la fonction (lignes 87-97 après modification) :

```ts
  // Si ce n'est pas une image dans /uploads/ ou /images/, retourner l'URL originale
  if (
    !normalizedUrl.startsWith("/uploads/") &&
    !normalizedUrl.startsWith("/images/")
  ) {
    return originalUrl;
  }

  // Images statiques /images/ → WebP pré-généré, bypass /api/image
  if (normalizedUrl.startsWith("/images/") && STATIC_WEBP_SIZES.includes(size)) {
    const config = SIZE_CONFIG[size];
    const dotIndex = normalizedUrl.lastIndexOf(".");
    const base = dotIndex !== -1 ? normalizedUrl.slice(0, dotIndex) : normalizedUrl;
    return `${base}-${config.width}.webp`;
  }

  const config = SIZE_CONFIG[size];
  return `/api/image?src=${encodeURIComponent(normalizedUrl)}&w=${config.width}&q=${config.quality}`;
```

- [ ] **Step 3 : Vérifier TypeScript**

```bash
npm run typecheck
```

Résultat attendu : aucune erreur.

- [ ] **Step 4 : Vérification manuelle de la logique**

```bash
node --input-type=module << 'EOF'
const STATIC_WEBP_SIZES = ["placeholder", "mobile", "tablet", "desktop"];
const SIZE_CONFIG = {
  placeholder: { width: 20 },
  mobile: { width: 640 },
  tablet: { width: 1024 },
  desktop: { width: 1920 },
  thumbnail: { width: 150 },
  full: { width: 2560 },
};

function getStaticPath(normalizedUrl, size) {
  if (!STATIC_WEBP_SIZES.includes(size)) return null;
  const config = SIZE_CONFIG[size];
  const dotIndex = normalizedUrl.lastIndexOf(".");
  const base = dotIndex !== -1 ? normalizedUrl.slice(0, dotIndex) : normalizedUrl;
  return `${base}-${config.width}.webp`;
}

// Tests
const cases = [
  ["/images/solutions/Card5.png", "mobile", "/images/solutions/Card5-640.webp"],
  ["/images/homepage/mobile/title.png", "placeholder", "/images/homepage/mobile/title-20.webp"],
  ["/images/bg-menu-mobile.png", "desktop", "/images/bg-menu-mobile-1920.webp"],
  ["/images/solutions/Card5.png", "thumbnail", null],  // pas statique
  ["/images/solutions/Card5.png", "full", null],        // pas statique
];

let ok = true;
for (const [src, size, expected] of cases) {
  const result = getStaticPath(src, size);
  if (result !== expected) {
    console.error(`FAIL: getStaticPath("${src}", "${size}") = "${result}", expected "${expected}"`);
    ok = false;
  }
}
if (ok) console.log("✓ Tous les cas passent");
EOF
```

Résultat attendu : `✓ Tous les cas passent`

- [ ] **Step 5 : Commit**

```bash
git add app/utils/optimizeImage.ts
git commit -m "perf: getOptimizedImageUrl retourne le chemin WebP statique pour /images/"
```

---

## Task 5 — Génération initiale des WebPs + commit

**Files:**
- Generated: `public/images/**/*.webp` (~360 fichiers)

- [ ] **Step 1 : Générer tous les WebPs**

```bash
npm run images:optimize
```

Résultat attendu (extrait) :
```
✓ 404/Title404.png → Title404-20.webp, Title404-640.webp, Title404-1024.webp, Title404-1920.webp
✓ BACKGROUND.png → BACKGROUND-20.webp, BACKGROUND-640.webp, ...
✓ bg-menu-mobile.png → ...
...
Done. 90 image(s) processed, 0 skipped.
```

- [ ] **Step 2 : Vérifier le nombre de fichiers générés**

```bash
find public/images -name "*.webp" | wc -l
```

Résultat attendu : environ 360 (90 × 4).

- [ ] **Step 3 : Vérifier les tailles (rapport poids)**

```bash
du -sh public/images/*.webp public/images/**/*.webp 2>/dev/null | tail -1 || du -sh $(find public/images -name "*.webp") | tail -1
echo "---"
du -sh public/images/
```

Les WebPs doivent peser nettement moins que les 73 MB de PNGs originaux.

- [ ] **Step 4 : Commit des WebPs générés**

```bash
git add public/images/
git commit -m "perf: pre-optimized WebP statiques — 90 images × 4 tailles"
```

---

## Task 6 — Vérification intégration dev

**Files:** aucune modification

- [ ] **Step 1 : Démarrer le serveur de dev**

```bash
npm run dev
```

- [ ] **Step 2 : Ouvrir la homepage sur mobile (DevTools → émulation iPhone)**

Dans Chrome DevTools → Toggle device toolbar → iPhone 12.

- [ ] **Step 3 : Vérifier les URLs d'images dans l'onglet Network**

Filtrer par "img". Les requêtes d'images `/images/` doivent pointer vers des `.webp` statiques :
- Exemple : `GET /images/solutions/Card5-640.webp` → status 200, type `image/webp`
- Aucune requête vers `/api/image?src=/images/...` ne doit apparaître pour les tailles mobile/tablet/desktop

- [ ] **Step 4 : Vérifier que les uploads restent sur `/api/image`**

Ouvrir une page portfolio avec des images bento. Les images `/uploads/` doivent toujours passer par `/api/image?src=/uploads/...`.

- [ ] **Step 5 : Commit final si tout est OK**

```bash
git add -A
git status  # doit être clean (aucun fichier non-committé)
```

Aucun commit supplémentaire nécessaire si les 5 tâches précédentes ont bien été committées séparément.
