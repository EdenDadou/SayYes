import {
  unstable_parseMultipartFormData,
  unstable_createMemoryUploadHandler,
  json,
} from "@remix-run/node";
import { saveMedia } from "~/server/media.server";
import { PortfolioFormData } from "./portfolio-form-handlers";
import { BentoItem } from "~/server";

// Options pour les formats de bento
export const BENTO_FORMATS = [
  "1/3 - 2/3",
  "2/3 - 1/3",
  "3 square",
  "banner",
  "2 square",
  "full",
] as const;

// Constantes
export const MAX_BENTO_LINES = 10;
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * Crée un handler pour l'upload de fichiers
 */
export function createUploadHandler() {
  return unstable_createMemoryUploadHandler({
    maxPartSize: MAX_FILE_SIZE,
  });
}

/**
 * Parse les données du formulaire multipart
 */
export async function parseFormData(request: Request) {
  const uploadHandler = createUploadHandler();
  return await unstable_parseMultipartFormData(request, uploadHandler);
}

/**
 * Extrait les données du portfolio depuis FormData
 */
export function extractPortfolioData(formData: FormData): PortfolioFormData {
  // Traitement des catégories - peut être un string ou un array
  const categoriesValue = formData.get("categories") as string;
  let categories: string[] = [];
  if (categoriesValue) {
    categories = [categoriesValue];
  }

  // Traitement des livrables - récupérer tous les éléments avec le nom "livrable"
  const livrableValues = formData.getAll("livrable") as string[];
  let livrable: string[] = [];
  if (livrableValues.length > 0) {
    // Filtrer les valeurs vides et les trimmer
    livrable = livrableValues.filter(
      (value) => value && value.trim().length > 0
    );
  }

  // Extraction de la photo de couverture (priorité au fichier uploadé)
  let photoCouverture = (formData.get("photoCouvertureUrl") as string) || "";
  const photoCouvertureFile = formData.get(
    "photoCouvertureFile"
  ) as File | null;

  if (photoCouvertureFile && photoCouvertureFile.size > 0) {
    // Si un fichier est uploadé, on utilisera une URL temporaire pour la création
    // Le fichier sera traité après la création du portfolio
    photoCouverture = "temp_" + photoCouvertureFile.name; // URL temporaire
  }

  // Extraction de la meta image (priorité au fichier uploadé)
  let metaImage = (formData.get("metaImageUrl") as string) || "";
  const metaImageFile = formData.get("metaImageFile") as File | null;

  if (metaImageFile && metaImageFile.size > 0) {
    metaImage = "temp_" + metaImageFile.name; // URL temporaire
  }

  const extractedData = {
    titre: (formData.get("titre") as string) || "",
    categories: categories,
    slug: (formData.get("slug") as string) || "",
    photoCouverture: photoCouverture,
    photoCouvertureAlt: (formData.get("photoCouvertureAlt") as string) || "",
    photoMain: (formData.get("photoMainUrl") as string) || "",
    photoMainAlt: (formData.get("photoMainAlt") as string) || "",
    description: (formData.get("description") as string) || "",
    kicker: (formData.get("kicker") as string) || "",
    livrable: livrable,
    sousTitre: (formData.get("sousTitre") as string) || "",
    topTitle: (formData.get("topTitle") as string) || "",
    couleur: (formData.get("couleur") as string) || "",
    temoignage: {
      auteur: (formData.get("temoignageAuteur") as string) || "",
      contenu: (formData.get("temoignageContenu") as string) || "",
      poste: (formData.get("temoignagePoste") as string) || undefined,
    },
    bento: (() => {
      try {
        const bentoData = formData.get("bento") as string;
        const parsed = bentoData ? JSON.parse(bentoData) : [];
        return parsed;
      } catch (_e) {
        return [];
      }
    })(),
    metaTitle: (formData.get("metaTitle") as string) || "",
    metaDescription: (formData.get("metaDescription") as string) || "",
    metaImage: metaImage,
    schemaOrg: (formData.get("schemaOrg") as string) || "{}",
  };

  return extractedData;
}

/**
 * Traite l'upload de la photo de couverture
 */
export async function processPhotoCouverture(
  formData: FormData,
  portfolioId: string,
  currentUrl?: string
): Promise<string> {
  let photoCouverture =
    currentUrl || (formData.get("photoCouvertureUrl") as string) || "";
  const photoCouvertureFile = formData.get(
    "photoCouvertureFile"
  ) as File | null;

  if (photoCouvertureFile && photoCouvertureFile.size > 0) {
    try {
      const savedMedia = await saveMedia(
        photoCouvertureFile,
        "portfolio",
        portfolioId
      );
      photoCouverture = savedMedia.url;
    } catch (error) {
      console.error(
        "❌ Erreur lors de la sauvegarde de la photo de couverture:",
        error
      );
      throw error;
    }
  }

  return photoCouverture;
}

/**
 * Traite l'upload de la photo main
 */
export async function processPhotoMain(
  formData: FormData,
  portfolioId: string,
  currentUrl?: string
): Promise<string> {
  let photoMain = currentUrl || (formData.get("photoMainUrl") as string) || "";
  const photoMainFile = formData.get("photoMainFile") as File | null;

  if (photoMainFile && photoMainFile.size > 0) {
    const savedMedia = await saveMedia(photoMainFile, "portfolio", portfolioId);
    photoMain = savedMedia.url;
  }

  return photoMain;
}

/**
 * Traite l'upload de la meta image
 */
export async function processMetaImage(
  formData: FormData,
  portfolioId: string,
  currentUrl?: string
): Promise<string> {
  let metaImage = currentUrl || (formData.get("metaImageUrl") as string) || "";
  const metaImageFile = formData.get("metaImageFile") as File | null;

  if (metaImageFile && metaImageFile.size > 0) {
    const savedMedia = await saveMedia(metaImageFile, "portfolio", portfolioId);
    metaImage = savedMedia.url;
  }

  return metaImage;
}

/**
 * Traite l'upload des fichiers bento
 */
export async function processBentoFiles(
  formData: FormData,
  portfolioId: string,
  bentoData: BentoItem[]
): Promise<BentoItem[]> {
  const updatedBento = [...bentoData];

  // Parcourir les données bento et traiter chaque fichier pending
  for (let bentoIndex = 0; bentoIndex < updatedBento.length; bentoIndex++) {
    const bento = updatedBento[bentoIndex];

    for (let lineIndex = 0; lineIndex < bento.lines.length; lineIndex++) {
      const line = bento.lines[lineIndex];

      for (let imgIndex = 0; imgIndex < line.listImage.length; imgIndex++) {
        const image = line.listImage[imgIndex];

        if (image.startsWith("pending_")) {
          // Extraire l'ID unique (timestamp + random + nom original)
          const fileId = image.replace("pending_", "");
          // Utiliser le même format que dans renderBentoFileInputs
          const inputName = `bentoFile_${fileId.replace(/[^a-zA-Z0-9]/g, "_")}`;
          const file = formData.get(inputName) as File | null;

          if (file && file.size > 0) {
            try {
              // Sauvegarder le fichier exactement comme les autres
              const savedMedia = await saveMedia(
                file,
                "portfolio/bento",
                portfolioId
              );

              // Remplacer l'URL pending par l'URL finale
              updatedBento[bentoIndex].lines[lineIndex].listImage[imgIndex] =
                savedMedia.url;

            } catch (error) {
              console.error(
                `❌ Erreur sauvegarde fichier bento ${inputName}:`,
                error
              );
            }
          }
        }
      }
    }
  }

  return updatedBento;
}

/**
 * Valide les données du portfolio
 */
export function validatePortfolioData(data: PortfolioFormData): string[] {
  const errors: string[] = [];

  // Champs obligatoires de base
  if (!data.titre?.trim()) {
    errors.push("Le titre est obligatoire");
  }

  if (!data.slug?.trim()) {
    errors.push("Le slug est obligatoire");
  } else if (!/^[a-z0-9-]+$/.test(data.slug)) {
    errors.push(
      "Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets"
    );
  }

  // Validation des catégories
  if (!data.categories || data.categories.length === 0) {
    errors.push("Au moins une catégorie est obligatoire");
  }

  // Validation de la photo de couverture (accepter les URLs temporaires)
  if (!data.photoCouverture?.trim()) {
    errors.push("La photo de couverture est obligatoire");
  }

  // NOTE: Les autres champs (description, kicker, sousTitre, témoignage, livrable)
  // sont maintenant optionnels pour éviter les erreurs 500.
  // Le schéma Prisma accepte des chaînes vides pour ces champs.

  return errors;
}

/**
 * Valide les données du portfolio de manière asynchrone (incluant la vérification d'unicité du slug)
 */
export async function validatePortfolioDataAsync(
  data: PortfolioFormData,
  isSlugUniqueCheck: (slug: string, excludeId?: string) => Promise<boolean>,
  excludeId?: string
): Promise<string[]> {
  // Validation synchrone de base
  const errors = validatePortfolioData(data);

  // Vérification asynchrone de l'unicité du slug
  if (data.slug?.trim() && !/^[a-z0-9-]+$/.test(data.slug)) {
    // Pas besoin de vérifier l'unicité si le format est déjà invalide
  } else if (data.slug?.trim()) {
    const isUnique = await isSlugUniqueCheck(data.slug, excludeId);
    if (!isUnique) {
      errors.push("Ce slug existe déjà. Veuillez en choisir un autre.");
    }
  }

  return errors;
}

/**
 * Utilitaires pour parser les données JSON stockées en base
 */
export function parseJsonField<T>(field: any, defaultValue: T): T {
  try {
    if (Array.isArray(field) || (field && typeof field === "object")) {
      return field;
    }
    return typeof field === "string" ? JSON.parse(field) : defaultValue;
  } catch (e) {
    console.warn("⚠️ Erreur parsing JSON field:", e);
    return defaultValue;
  }
}

/**
 * Initialise les données du formulaire depuis un portfolio existant
 */
export function initializeFormData(portfolio: any): PortfolioFormData {
  return {
    titre: portfolio.titre || "",
    categories: parseJsonField(portfolio.categories, []),
    slug: portfolio.slug || "",
    photoCouverture: portfolio.photoCouverture || "",
    photoCouvertureAlt: portfolio.photoCouvertureAlt || "",
    photoMain: portfolio.photoMain || "",
    photoMainAlt: portfolio.photoMainAlt || "",
    description: portfolio.description || "",
    kicker: portfolio.kicker || "",
    livrable: parseJsonField(portfolio.livrable, []),
    sousTitre: portfolio.sousTitre || "",
    topTitle: portfolio.topTitle || "",
    couleur: portfolio.couleur || "",
    temoignage: parseJsonField(portfolio.temoignage, {
      auteur: "",
      contenu: "",
      poste: "",
    }),
    bento: parseJsonField(portfolio.bento, []),
  };
}

/**
 * Crée une réponse JSON standardisée
 */
export function createJsonResponse(
  success: boolean,
  message: string,
  data?: any,
  status: number = 200
) {
  try {
    const response = json(
      {
        success,
        message,
        ...(data && data),
      },
      { status }
    );
    return response;
  } catch (error) {
    console.error("❌ Erreur dans createJsonResponse:", error);
    // Fallback pour éviter les crashes
    return new Response(
      JSON.stringify({
        success,
        message,
        ...(data && data),
      }),
      {
        status,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

/**
 * Gère les erreurs de manière standardisée
 */
export function handleError(error: unknown, context: string) {
  console.error(`❌ Erreur dans ${context}:`, error);
  console.error(
    "❌ Stack trace:",
    error instanceof Error ? error.stack : "N/A"
  );

  const message =
    error instanceof Error ? error.message : `Erreur lors de ${context}`;

  return createJsonResponse(false, message, undefined, 500);
}
