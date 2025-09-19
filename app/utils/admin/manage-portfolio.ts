import {
  unstable_parseMultipartFormData,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node";
import { saveMedia } from "~/server/media.server";

// Types pour les données du portfolio
export interface BentoLine {
  format: "1/3 - 2/3" | "3 carrés" | "banner" | "2 carré" | "full";
  listImage: string[];
}

export interface BentoItem {
  lines: BentoLine[];
}

export interface PortfolioFormData {
  titre: string;
  categories: string[];
  slug: string;
  photoCouverture: string;
  photoMain: string;
  description: string;
  kicker: string;
  livrable: string[];
  sousTitre: string;
  topTitle: string;
  couleur: string;
  temoignage: {
    auteur: string;
    contenu: string;
    poste?: string;
    entreprise?: string;
  };
  bento: BentoItem[];
}

// Options pour les formats de bento
export const BENTO_FORMATS = [
  "1/3 - 2/3",
  "3 carrés",
  "banner",
  "2 carré",
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
  return {
    titre: formData.get("titre") as string,
    categories: formData.getAll("categories") as string[],
    slug: formData.get("slug") as string,
    photoCouverture: (formData.get("photoCouvertureUrl") as string) || "",
    photoMain: (formData.get("photoMainUrl") as string) || "",
    description: formData.get("description") as string,
    kicker: formData.get("kicker") as string,
    livrable: formData.getAll("livrable") as string[],
    sousTitre: formData.get("sousTitre") as string,
    topTitle: formData.get("topTitle") as string,
    couleur: formData.get("couleur") as string,
    temoignage: {
      auteur: (formData.get("temoignageAuteur") as string) || "",
      contenu: (formData.get("temoignageContenu") as string) || "",
      poste: (formData.get("temoignagePoste") as string) || undefined,
      entreprise: (formData.get("temoignageEntreprise") as string) || undefined,
    },
    bento: (() => {
      try {
        const bentoData = formData.get("bento") as string;
        return bentoData ? JSON.parse(bentoData) : [];
      } catch (e) {
        console.error("❌ Erreur parsing bento data:", e);
        return [];
      }
    })(),
  };
}

/**
 * Traite l'upload de la photo de couverture
 */
export async function processPhotoCouverture(
  formData: FormData,
  portfolioId: number,
  currentUrl?: string
): Promise<string> {
  let photoCouverture =
    currentUrl || (formData.get("photoCouvertureUrl") as string);
  const photoCouvertureFile = formData.get(
    "photoCouvertureFile"
  ) as File | null;

  if (photoCouvertureFile && photoCouvertureFile.size > 0) {
    const savedMedia = await saveMedia(
      photoCouvertureFile,
      "portfolio",
      portfolioId.toString()
    );
    photoCouverture = savedMedia.url;
  }

  return photoCouverture;
}

/**
 * Traite l'upload de la photo main
 */
export async function processPhotoMain(
  formData: FormData,
  portfolioId: number,
  currentUrl?: string
): Promise<string> {
  let photoMain = currentUrl || (formData.get("photoMainUrl") as string);
  const photoMainFile = formData.get("photoMainFile") as File | null;

  if (photoMainFile && photoMainFile.size > 0) {
    const savedMedia = await saveMedia(
      photoMainFile,
      "portfolio",
      portfolioId.toString()
    );
    photoMain = savedMedia.url;
  }

  return photoMain;
}

/**
 * Traite l'upload des fichiers bento
 */
export async function processBentoFiles(
  formData: FormData,
  portfolioId: number,
  bentoData: BentoItem[]
): Promise<BentoItem[]> {
  const updatedBento = [...bentoData];

  // Créer une map des fichiers uploadés pour un accès plus facile
  const uploadedFiles = new Map<string, string>();

  for (const [key, value] of formData.entries()) {
    if (
      key.startsWith("bentoFile_") &&
      value instanceof File &&
      value.size > 0
    ) {
      const match = key.match(/bentoFile_(\d+)_(\d+)/);
      if (match) {
        const bentoIndex = parseInt(match[1]);
        const globalIndex = parseInt(match[2]);

        // Sauvegarder le fichier
        const savedMedia = await saveMedia(
          value,
          "portfolio/bento",
          portfolioId.toString()
        );

        uploadedFiles.set(`${bentoIndex}_${globalIndex}`, savedMedia.url);
      }
    }
  }

  // Maintenant, parcourir le bento et remplacer les images pending
  updatedBento.forEach((bento, bentoIndex) => {
    let globalPendingIndex = 0;

    bento.lines.forEach((line, lineIndex) => {
      line.listImage.forEach((image, imgIndex) => {
        if (image.startsWith("pending_")) {
          const fileKey = `${bentoIndex}_${globalPendingIndex}`;
          const newUrl = uploadedFiles.get(fileKey);

          if (newUrl) {
            updatedBento[bentoIndex].lines[lineIndex].listImage[imgIndex] =
              newUrl;
          } else {
            console.warn(
              `⚠️ Aucun fichier trouvé pour ${fileKey} (image: ${image})`
            );
          }
          globalPendingIndex++;
        }
      });
    });
  });

  return updatedBento;
}

/**
 * Valide les données du portfolio
 */
export function validatePortfolioData(data: PortfolioFormData): string[] {
  const errors: string[] = [];

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

  if (!data.description?.trim()) {
    errors.push("La description est obligatoire");
  }

  if (!data.temoignage.auteur?.trim()) {
    errors.push("L'auteur du témoignage est obligatoire");
  }

  if (!data.temoignage.contenu?.trim()) {
    errors.push("Le contenu du témoignage est obligatoire");
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
    photoMain: portfolio.photoMain || "",
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
      entreprise: "",
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
  return Response.json(
    {
      success,
      message,
      ...data,
    },
    { status }
  );
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
