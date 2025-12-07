import { type LoaderFunctionArgs } from "@remix-run/node";
import { readFile } from "fs/promises";
import { join } from "path";

// Route catch-all pour servir les fichiers uploadés
// Gère les URLs comme /uploads/landing-pages/image.png
export async function loader({ params }: LoaderFunctionArgs) {
  const filePath = params["*"];

  if (!filePath) {
    throw new Response("Fichier non trouvé", { status: 404 });
  }

  // Sécurité: empêcher la traversée de répertoire
  if (filePath.includes("..")) {
    throw new Response("Accès non autorisé", { status: 403 });
  }

  const fullPath = join(process.cwd(), "public", "uploads", filePath);

  try {
    const file = await readFile(fullPath);

    // Déterminer le type MIME
    const extension = filePath.split(".").pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      // Images
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
      webp: "image/webp",
      svg: "image/svg+xml",
      // Vidéos
      mp4: "video/mp4",
      webm: "video/webm",
      ogg: "video/ogg",
      mov: "video/quicktime",
      // Documents
      pdf: "application/pdf",
    };

    const contentType = mimeTypes[extension || ""] || "application/octet-stream";

    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error(`Erreur lecture fichier ${fullPath}:`, error);
    throw new Response("Fichier non trouvé", { status: 404 });
  }
}
