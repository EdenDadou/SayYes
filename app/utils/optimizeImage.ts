/**
 * Utilitaire pour optimiser les URLs d'images selon le device
 * Utilise l'endpoint /api/image pour redimensionner à la volée avec sharp
 */

export type ImageSize = "placeholder" | "thumbnail" | "mobile" | "tablet" | "desktop" | "full";

interface ImageDimensions {
  width: number;
  quality: number;
}

const SIZE_CONFIG: Record<ImageSize, ImageDimensions> = {
  placeholder: { width: 20, quality: 30 }, // Ultra léger pour blur placeholder
  thumbnail: { width: 150, quality: 60 },
  mobile: { width: 640, quality: 75 },
  tablet: { width: 1024, quality: 80 },
  desktop: { width: 1920, quality: 85 },
  full: { width: 2560, quality: 90 },
};

/**
 * Détecte si on est sur mobile côté client
 */
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

/**
 * Retourne la taille optimale selon la largeur d'écran
 */
export function getOptimalSize(): ImageSize {
  if (typeof window === "undefined") return "desktop";

  const width = window.innerWidth;
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  if (width < 1920) return "desktop";
  return "full";
}

/**
 * Génère une URL optimisée pour l'image via l'API /api/image
 */
export function getOptimizedImageUrl(
  originalUrl: string,
  size: ImageSize = "mobile"
): string {
  if (!originalUrl) return "";

  // Si c'est une URL externe, la retourner telle quelle
  if (originalUrl.startsWith("http")) {
    return originalUrl;
  }

  // Si c'est une vidéo, retourner l'URL originale
  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(originalUrl)) {
    return originalUrl;
  }

  // Normaliser les chemins relatifs
  let normalizedUrl = originalUrl;

  // Gérer les chemins relatifs comme "./images/..." ou "images/..."
  if (originalUrl.startsWith("./images/")) {
    normalizedUrl = originalUrl.replace("./images/", "/images/");
  } else if (originalUrl.startsWith("images/")) {
    normalizedUrl = "/" + originalUrl;
  } else if (originalUrl.startsWith("./uploads/")) {
    normalizedUrl = originalUrl.replace("./uploads/", "/uploads/");
  } else if (originalUrl.startsWith("uploads/")) {
    normalizedUrl = "/" + originalUrl;
  }

  // Si ce n'est pas une image dans /uploads/ ou /images/, retourner l'URL originale
  if (!normalizedUrl.startsWith("/uploads/") && !normalizedUrl.startsWith("/images/")) {
    return originalUrl;
  }

  const config = SIZE_CONFIG[size];
  return `/api/image?src=${encodeURIComponent(normalizedUrl)}&w=${config.width}&q=${config.quality}`;
}

/**
 * Génère un srcset pour les images responsives
 */
export function generateSrcSet(originalUrl: string): string {
  if (!originalUrl) return "";

  // Pas de srcset pour les vidéos ou URLs externes
  if (
    originalUrl.startsWith("http") ||
    /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(originalUrl)
  ) {
    return "";
  }

  const sizes: ImageSize[] = ["mobile", "tablet", "desktop"];

  return sizes
    .map((size) => {
      const config = SIZE_CONFIG[size];
      const url = getOptimizedImageUrl(originalUrl, size);
      return `${url} ${config.width}w`;
    })
    .join(", ");
}

/**
 * Génère l'attribut sizes pour le srcset
 */
export function generateSizes(): string {
  return "(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px";
}
