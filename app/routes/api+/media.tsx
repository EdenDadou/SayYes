import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  json,
  unstable_parseMultipartFormData,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node";
import { saveMedia, deleteMedia, getAllMedias } from "~/server/media.server";
import { requireAuth } from "~/server/auth.server";

// GET /api/media - Récupérer tous les médias (admin seulement)
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    await requireAuth(request);

    const medias = await getAllMedias();
    return json({ medias });
  } catch (error) {
    console.error("Erreur lors de la récupération des médias:", error);
    return json({ error: "Non autorisé" }, { status: 401 });
  }
}

// POST /api/media - Upload d'un média
// DELETE /api/media - Suppression d'un média
export async function action({ request }: ActionFunctionArgs) {
  try {
    await requireAuth(request);

    if (request.method === "POST") {
      // Upload de fichier avec limite augmentée pour les vidéos
      const maxSize = parseInt(process.env.MAX_FILE_SIZE || "40485760"); // 40MB par défaut
      const uploadHandler = unstable_createMemoryUploadHandler({
        maxPartSize: maxSize,
      });

      const formData = await unstable_parseMultipartFormData(
        request,
        uploadHandler
      );

      const file = formData.get("file") as File | null;
      const folder = (formData.get("folder") as string) || "general";
      const portfolioId = formData.get("portfolioId") as string | null;

      if (!file || file.size === 0) {
        console.error("❌ Aucun fichier valide reçu");
        return json({ error: "Fichier requis" }, { status: 400 });
      }

      const savedMedia = await saveMedia(
        file,
        folder,
        portfolioId || undefined
      );

      return json({
        success: true,
        message: "Média uploadé avec succès",
        media: savedMedia,
      });
    }

    if (request.method === "DELETE") {
      // Suppression de média
      const body = await request.json();
      const { mediaId } = body;

      if (!mediaId) {
        return json({ error: "ID du média requis" }, { status: 400 });
      }

      await deleteMedia(mediaId);

      return json({
        success: true,
        message: "Média supprimé avec succès",
      });
    }

    return json({ error: "Méthode non autorisée" }, { status: 405 });
  } catch (error) {
    console.error("Erreur lors de l'opération sur le média:", error);
    return json(
      {
        error: error instanceof Error ? error.message : "Erreur serveur",
      },
      { status: 500 }
    );
  }
}
