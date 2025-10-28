// Types et constantes pour les données du portfolio (utilisables côté client)
export interface BentoLine {
  format:
    | "1/3 - 2/3"
    | "2/3 - 1/3"
    | "3 square"
    | "banner"
    | "2 square"
    | "full";
  listImage: string[]; // URLs des médias (images et vidéos)
}

export interface BentoItem {
  lines: BentoLine[];
}

export interface PortfolioData {
  id: string;
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
  "2/3 - 1/3",
  "3 square",
  "2 square",
  "banner",
  "full",
] as const;

// Constantes
export const MAX_BENTO_LINES = 10;
export const MAX_FILE_SIZE = 40 * 1024 * 1024; // 10MB
