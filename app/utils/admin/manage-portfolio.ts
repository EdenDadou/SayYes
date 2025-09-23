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
  console.log("🔍 Extraction des données du formulaire...");

  // Debug: Afficher tous les champs reçus
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      console.log(
        `📋 FormData[${key}]:`,
        value.substring(0, 100) + (value.length > 100 ? "..." : "")
      );
    } else {
      console.log(
        `📋 FormData[${key}]:`,
        value instanceof File ? `File(${value.name})` : value
      );
    }
  }

  // Traitement des catégories - peut être un string ou un array
  const categoriesValue = formData.get("categories") as string;
  let categories: string[] = [];
  if (categoriesValue) {
    categories = [categoriesValue];
    console.log("📂 Catégories extraites:", categories);
  } else {
    console.log("⚠️ Aucune catégorie trouvée dans FormData");
  }

  // Traitement des livrables - peut être envoyé différemment
  const livrableValue = formData.get("livrable") as string;
  let livrable: string[] = [];
  if (livrableValue) {
    try {
      livrable = JSON.parse(livrableValue);
      console.log("📦 Livrables extraits (JSON):", livrable);
    } catch {
      livrable = [livrableValue];
      console.log("📦 Livrables extraits (string):", livrable);
    }
  } else {
    console.log("⚠️ Aucun livrable trouvé dans FormData");
  }

  // Extraction de la photo de couverture (priorité au fichier uploadé)
  let photoCouverture = (formData.get("photoCouvertureUrl") as string) || "";
  const photoCouvertureFile = formData.get(
    "photoCouvertureFile"
  ) as File | null;

  if (photoCouvertureFile && photoCouvertureFile.size > 0) {
    // Si un fichier est uploadé, on utilisera une URL temporaire pour la création
    // Le fichier sera traité après la création du portfolio
    console.log(
      "📸 Fichier photo de couverture détecté:",
      photoCouvertureFile.name
    );
    photoCouverture = "temp_" + photoCouvertureFile.name; // URL temporaire
  } else if (photoCouverture) {
    console.log("📸 URL photo de couverture:", photoCouverture);
  } else {
    console.log("⚠️ Aucune photo de couverture trouvée");
  }

  const extractedData = {
    titre: (formData.get("titre") as string) || "",
    categories: categories,
    slug: (formData.get("slug") as string) || "",
    photoCouverture: photoCouverture,
    photoMain: (formData.get("photoMainUrl") as string) || "",
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
        console.log("🎯 Bento extraits:", parsed);
        return parsed;
      } catch (e) {
        console.log("⚠️ Erreur parsing bento:", e);
        return [];
      }
    })(),
  };

  console.log("✅ Données extraites:", {
    titre: extractedData.titre,
    categories: extractedData.categories,
    slug: extractedData.slug,
    hasPhotoCouverture: !!extractedData.photoCouverture,
    hasDescription: !!extractedData.description,
    hasKicker: !!extractedData.kicker,
    hasSousTitre: !!extractedData.sousTitre,
    livrableCount: extractedData.livrable.length,
    temoignageAuteur: extractedData.temoignage.auteur,
    temoignageContenu: extractedData.temoignage.contenu,
    bentoCount: extractedData.bento.length,
  });

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
    console.log(
      "📸 Traitement du fichier photo de couverture:",
      photoCouvertureFile.name
    );
    console.log("📸 Taille du fichier:", photoCouvertureFile.size, "bytes");
    console.log("📸 Type du fichier:", photoCouvertureFile.type);

    try {
      const savedMedia = await saveMedia(
        photoCouvertureFile,
        "portfolio",
        portfolioId
      );
      photoCouverture = savedMedia.url;
      console.log("✅ Photo de couverture sauvegardée:", photoCouverture);
    } catch (error) {
      console.error(
        "❌ Erreur lors de la sauvegarde de la photo de couverture:",
        error
      );
      throw error;
    }
  } else {
    console.log("ℹ️ Aucun fichier photo de couverture à traiter");
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
    console.log("📸 Traitement du fichier photo main:", photoMainFile.name);
    const savedMedia = await saveMedia(photoMainFile, "portfolio", portfolioId);
    photoMain = savedMedia.url;
    console.log("✅ Photo main sauvegardée:", photoMain);
  }

  return photoMain;
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

  // Créer une map des fichiers uploadés pour un accès plus facile
  const uploadedFiles = new Map<string, string>();

  // Traiter tous les fichiers bento
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
          portfolioId
        );

        uploadedFiles.set(`${bentoIndex}_${globalIndex}`, savedMedia.url);
      }
    }
  }

  // CORRECTION PRINCIPALE: Utiliser un index global qui correspond à celui du formulaire
  let globalFileIndex = 0;

  updatedBento.forEach((bento, bentoIndex) => {
    bento.lines.forEach((line, lineIndex) => {
      line.listImage.forEach((image, imgIndex) => {
        if (image.startsWith("pending_")) {
          const fileKey = `${bentoIndex}_${globalFileIndex}`;
          const newUrl = uploadedFiles.get(fileKey);

          if (newUrl) {
            updatedBento[bentoIndex].lines[lineIndex].listImage[imgIndex] =
              newUrl;
          } else {
            console.warn(
              `⚠️ Aucun fichier trouvé pour ${fileKey} (image: ${image})`
            );
          }
          globalFileIndex++; // ← LA CORRECTION: index global au lieu de local
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
