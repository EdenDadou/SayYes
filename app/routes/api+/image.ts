import { LoaderFunctionArgs } from "@remix-run/node";
import sharp from "sharp";
import { readFile, writeFile, mkdir, stat } from "fs/promises";
import { join } from "path";
import { createHash } from "crypto";

// Cache en mémoire simple pour les images redimensionnées (cache L1)
const imageCache = new Map<string, { buffer: Buffer; timestamp: number }>();
const MEMORY_CACHE_DURATION = 1000 * 60 * 60; // 1 heure en mémoire
const DISK_CACHE_DURATION = 1000 * 60 * 60 * 24 * 7; // 7 jours sur disque

// Dossier de cache sur disque
const CACHE_DIR = join(process.cwd(), ".cache", "images");

// Créer le dossier de cache si nécessaire
let cacheDirectoryReady = false;
async function ensureCacheDirectory() {
  if (cacheDirectoryReady) return;
  try {
    await mkdir(CACHE_DIR, { recursive: true });
    cacheDirectoryReady = true;
  } catch {
    // Ignorer si déjà existant
  }
}

// Générer un hash pour le nom de fichier cache
function getCacheFileName(key: string): string {
  const hash = createHash("md5").update(key).digest("hex");
  return join(CACHE_DIR, `${hash}.cache`);
}

// Tailles prédéfinies (20px pour placeholder blur)
const ALLOWED_WIDTHS = [20, 150, 320, 480, 640, 768, 1024, 1280, 1920];
const DEFAULT_QUALITY = 80;
const MAX_QUALITY = 95;
const MIN_QUALITY = 50;

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  // Paramètres
  const imagePath = url.searchParams.get("src");
  const width = parseInt(url.searchParams.get("w") || "0");
  const quality = Math.min(
    MAX_QUALITY,
    Math.max(MIN_QUALITY, parseInt(url.searchParams.get("q") || String(DEFAULT_QUALITY)))
  );
  const format = url.searchParams.get("f") as "webp" | "avif" | "jpeg" | null;

  // Validation
  if (!imagePath) {
    return new Response("Missing src parameter", { status: 400 });
  }

  // Sécurité: empêcher le path traversal
  if (imagePath.includes("..")) {
    return new Response("Invalid path", { status: 403 });
  }

  // Autoriser /uploads/ et /images/ (fichiers statiques)
  const allowedPrefixes = ["/uploads/", "/images/"];
  if (!allowedPrefixes.some(prefix => imagePath.startsWith(prefix))) {
    return new Response("Invalid path", { status: 403 });
  }

  // Valider la largeur (doit être une des tailles autorisées ou 0 pour original)
  const finalWidth = width > 0 ? ALLOWED_WIDTHS.reduce((prev, curr) =>
    Math.abs(curr - width) < Math.abs(prev - width) ? curr : prev
  ) : 0;

  // Clé de cache (inclut le format demandé)
  const cacheKey = `${imagePath}-${finalWidth}-${quality}-${format || "auto"}`;
  const diskCacheFile = getCacheFileName(cacheKey);

  // 1. Vérifier le cache mémoire (L1)
  const memoryCached = imageCache.get(cacheKey);
  if (memoryCached && Date.now() - memoryCached.timestamp < MEMORY_CACHE_DURATION) {
    const contentType = format === "avif" ? "image/avif" :
                        format === "webp" ? "image/webp" : "image/jpeg";
    return new Response(new Uint8Array(memoryCached.buffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Cache": "HIT-MEMORY",
      },
    });
  }

  // 2. Vérifier le cache disque (L2)
  try {
    await ensureCacheDirectory();
    const diskStats = await stat(diskCacheFile);
    if (Date.now() - diskStats.mtimeMs < DISK_CACHE_DURATION) {
      const diskBuffer = await readFile(diskCacheFile);
      // Remettre en cache mémoire
      imageCache.set(cacheKey, { buffer: diskBuffer as Buffer, timestamp: Date.now() });
      const contentType = format === "avif" ? "image/avif" :
                          format === "webp" ? "image/webp" : "image/jpeg";
      return new Response(new Uint8Array(diskBuffer), {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
          "X-Cache": "HIT-DISK",
        },
      });
    }
  } catch {
    // Fichier cache n'existe pas, on continue
  }

  try {
    // Lire le fichier original
    const filePath = join(process.cwd(), "public", imagePath);
    const fileBuffer = await readFile(filePath);

    // Détecter le format de sortie optimal
    // Note: On désactive AVIF par défaut car il peut causer des problèmes sur iOS Safari
    const acceptHeader = request.headers.get("Accept") || "";
    const userAgent = request.headers.get("User-Agent") || "";
    const isIOSSafari = /iPhone|iPad|iPod/.test(userAgent) && /Safari/.test(userAgent) && !/Chrome|CriOS|FxiOS/.test(userAgent);

    let outputFormat: "webp" | "avif" | "jpeg" = "jpeg";

    if (format) {
      outputFormat = format;
    } else if (acceptHeader.includes("image/avif") && !isIOSSafari) {
      // Désactiver AVIF sur iOS Safari - problèmes de compatibilité
      outputFormat = "avif";
    } else if (acceptHeader.includes("image/webp")) {
      outputFormat = "webp";
    }

    // Traiter l'image avec sharp
    let sharpInstance = sharp(fileBuffer);

    // Redimensionner si une largeur est spécifiée
    if (finalWidth > 0) {
      sharpInstance = sharpInstance.resize(finalWidth, null, {
        withoutEnlargement: true,
        fit: "inside",
      });
    }

    // Convertir au format optimal
    let outputBuffer: Buffer;
    let contentType: string;

    switch (outputFormat) {
      case "avif":
        outputBuffer = await sharpInstance
          .avif({ quality, effort: 4 })
          .toBuffer();
        contentType = "image/avif";
        break;
      case "webp":
        outputBuffer = await sharpInstance
          .webp({ quality, effort: 4 })
          .toBuffer();
        contentType = "image/webp";
        break;
      default:
        outputBuffer = await sharpInstance
          .jpeg({ quality, progressive: true })
          .toBuffer();
        contentType = "image/jpeg";
    }

    // Mettre en cache mémoire (L1)
    imageCache.set(cacheKey, {
      buffer: outputBuffer,
      timestamp: Date.now(),
    });

    // Nettoyer le cache mémoire si trop grand (max 100 entrées)
    if (imageCache.size > 100) {
      const oldestKey = imageCache.keys().next().value;
      if (oldestKey) imageCache.delete(oldestKey);
    }

    // Écrire sur disque (L2) en arrière-plan
    writeFile(diskCacheFile, outputBuffer).catch(() => {
      // Ignorer les erreurs d'écriture cache
    });

    return new Response(new Uint8Array(outputBuffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Cache": "MISS",
        "Vary": "Accept",
      },
    });
  } catch (error) {
    console.error("Image optimization error:", error);
    return new Response("Image not found or processing error", { status: 404 });
  }
}
