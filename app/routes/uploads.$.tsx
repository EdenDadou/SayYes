import type { LoaderFunctionArgs } from "@remix-run/node";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { createReadStream, statSync } from "fs";
import { join } from "path";

/**
 * Route pour servir les fichiers uploadés en production
 * Gère les URLs comme /uploads/portfolio/file.mp4
 */
export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const { "*": splat } = params;

    if (!splat) {
      throw new Response("Fichier non spécifié", { status: 400 });
    }

    // Construire le chemin du fichier
    const isDev = process.env.NODE_ENV !== "production";
    const uploadsDir = isDev ? "public/uploads" : "build/client/uploads";
    const filePath = join(process.cwd(), uploadsDir, splat);

    console.log(`📂 Tentative de service du fichier: ${filePath}`);

    // Vérifier que le fichier existe
    let stats;
    try {
      stats = statSync(filePath);
    } catch {
      console.log(`❌ Fichier introuvable: ${filePath}`);
      throw new Response("Fichier non trouvé", { status: 404 });
    }

    if (!stats.isFile()) {
      throw new Response("Le chemin ne correspond pas à un fichier", {
        status: 400,
      });
    }

    // Déterminer le type MIME
    const ext = splat.toLowerCase().split(".").pop() || "";
    const mimeTypes: Record<string, string> = {
      mp4: "video/mp4",
      webm: "video/webm",
      ogg: "video/ogg",
      mov: "video/quicktime",
      avi: "video/x-msvideo",
      mkv: "video/x-matroska",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
      webp: "image/webp",
      svg: "image/svg+xml",
      pdf: "application/pdf",
    };

    const contentType = mimeTypes[ext] || "application/octet-stream";

    // Créer le stream de lecture
    const stream = createReadStream(filePath);
    const readableStream = createReadableStreamFromReadable(stream);

    console.log(`✅ Service du fichier: ${splat} (${contentType})`);

    // Retourner la réponse avec les headers appropriés
    return new Response(readableStream, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": stats.size.toString(),
        "Cache-Control": "public, max-age=31536000", // Cache 1 an
        ETag: `"${stats.mtime.getTime()}"`,
        // Headers spéciaux pour les vidéos
        ...(contentType.startsWith("video/") && {
          "Accept-Ranges": "bytes",
        }),
      },
    });
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }

    console.error("❌ Erreur lors du service du fichier:", error);
    throw new Response("Erreur interne du serveur", { status: 500 });
  }
}
