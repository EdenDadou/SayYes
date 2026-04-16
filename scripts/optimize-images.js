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
