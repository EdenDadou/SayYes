import { LoaderFunctionArgs } from "@remix-run/node";
import sharp from "sharp";
import { readFile } from "fs/promises";
import { join } from "path";

// Cache en mémoire simple pour les images redimensionnées
const imageCache = new Map<string, { buffer: Buffer; timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 60; // 1 heure

// Tailles prédéfinies
const ALLOWED_WIDTHS = [150, 320, 480, 640, 768, 1024, 1280, 1920];
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
  if (imagePath.includes("..") || !imagePath.startsWith("/uploads/")) {
    return new Response("Invalid path", { status: 403 });
  }

  // Valider la largeur (doit être une des tailles autorisées ou 0 pour original)
  const finalWidth = width > 0 ? ALLOWED_WIDTHS.reduce((prev, curr) =>
    Math.abs(curr - width) < Math.abs(prev - width) ? curr : prev
  ) : 0;

  // Clé de cache
  const cacheKey = `${imagePath}-${finalWidth}-${quality}-${format || "auto"}`;

  // Vérifier le cache
  const cached = imageCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    const contentType = format === "avif" ? "image/avif" :
                        format === "webp" ? "image/webp" : "image/jpeg";
    return new Response(cached.buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Cache": "HIT",
      },
    });
  }

  try {
    // Lire le fichier original
    const filePath = join(process.cwd(), "public", imagePath);
    const fileBuffer = await readFile(filePath);

    // Détecter le format de sortie optimal
    const acceptHeader = request.headers.get("Accept") || "";
    let outputFormat: "webp" | "avif" | "jpeg" = "jpeg";

    if (format) {
      outputFormat = format;
    } else if (acceptHeader.includes("image/avif")) {
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

    // Mettre en cache
    imageCache.set(cacheKey, {
      buffer: outputBuffer,
      timestamp: Date.now(),
    });

    // Nettoyer le cache si trop grand (max 100 entrées)
    if (imageCache.size > 100) {
      const oldestKey = imageCache.keys().next().value;
      if (oldestKey) imageCache.delete(oldestKey);
    }

    return new Response(outputBuffer, {
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
