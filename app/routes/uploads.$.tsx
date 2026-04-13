import { type LoaderFunctionArgs } from "@remix-run/node";
import { createReadStream, statSync } from "fs";
import { join } from "path";

const MIME_TYPES: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
  mp4: "video/mp4",
  webm: "video/webm",
  ogg: "video/ogg",
  mov: "video/quicktime",
  pdf: "application/pdf",
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const filePath = params["*"];

  if (!filePath) {
    throw new Response("Fichier non trouvé", { status: 404 });
  }

  if (filePath.includes("..")) {
    throw new Response("Accès non autorisé", { status: 403 });
  }

  const fullPath = join(process.cwd(), "public", "uploads", filePath);

  try {
    const fileStat = statSync(fullPath);
    const extension = filePath.split(".").pop()?.toLowerCase();
    const contentType =
      MIME_TYPES[extension || ""] || "application/octet-stream";

    const rangeHeader = request.headers.get("Range");

    // Support HTTP Range requests pour les vidéos
    if (rangeHeader && contentType.startsWith("video/")) {
      const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
      if (match) {
        const start = parseInt(match[1], 10);
        const end = match[2]
          ? parseInt(match[2], 10)
          : Math.min(start + 1024 * 1024 - 1, fileStat.size - 1);

        const stream = createReadStream(fullPath, { start, end });
        const readable = new ReadableStream({
          start(controller) {
            stream.on("data", (chunk: string | Buffer) =>
              controller.enqueue(
                new Uint8Array(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
              )
            );
            stream.on("end", () => controller.close());
            stream.on("error", (err) => controller.error(err));
          },
        });

        return new Response(readable, {
          status: 206,
          headers: {
            "Content-Type": contentType,
            "Content-Range": `bytes ${start}-${end}/${fileStat.size}`,
            "Accept-Ranges": "bytes",
            "Content-Length": String(end - start + 1),
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }
    }

    // Streaming complet pour les autres requêtes
    const stream = createReadStream(fullPath);
    const readable = new ReadableStream({
      start(controller) {
        stream.on("data", (chunk: string | Buffer) =>
          controller.enqueue(
            new Uint8Array(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
          )
        );
        stream.on("end", () => controller.close());
        stream.on("error", (err) => controller.error(err));
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(fileStat.size),
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    throw new Response("Fichier non trouvé", { status: 404 });
  }
}
