// Types pour les Landing Pages

// Type Media (image ou video)
export interface Media {
  type: "image" | "video";
  url: string;
  alt?: string;
}

// Element de titre animé
export type TitleElement =
  | { type: "icon"; name: string }
  | { type: "text"; text: string; color: "white" | "animed" };

// Ligne de titre
export interface TitleLine {
  elements: TitleElement[];
  titleType: "h1" | "h2" | "h3";
}

// SEO
export interface LandingPageSEO {
  metaTitle: string;
  metaDescription: string;
  image?: Media;
  schemaOrg?: string;
}

// ===== TYPES DE BLOCS =====

// Bloc Intro
export interface BlocIntro {
  type: "blocIntro";
  lineTitle: TitleLine[];
  punchline: string;
  description: string;
  cta: string;
  tags: string[];
  media: Media;
  altTitle?: string;
}

// Card pour le bloc Cards
export interface CardConcurrence {
  type: "concurrence";
  titre: string;
  image?: Media;
  lines?: string;
  mention?: string;
  cta: string;
  blocs: {
    sousTitre: string;
    linesType: "coche" | "croix";
    lines: string[];
  }[];
}

export interface CardOffre {
  type: "offre";
  titre: string;
  image?: Media;
  lines?: string;
  mention?: string;
  cta: string;
}

export type Card = CardConcurrence | CardOffre;

// Bloc Cards
export interface BlocCards {
  type: "cards";
  title: string;
  cards: Card[];
  cta: {
    label: string;
    ctaType: "color" | "transparent";
  };
}

// Bloc Chiffres Clés
export interface BlocChiffresCles {
  type: "chiffresCles";
  title: string;
  numbers: {
    title: string;
    subtitle: string;
  }[];
  media: Media;
}

// Bloc Commentaire Client
export interface BlocCommentaireClient {
  type: "commentaireClient";
  text: string;
  author: string;
}

// Bloc Methods
export interface BlocMethods {
  type: "methods";
  lineTitle: TitleLine[];
  subTitle: string;
  conclusion: {
    elements: ({ type: "icon"; name: string } | { type: "text"; text: string; color: "white" | "animed" })[];
    colorType: "white" | "color";
  };
  cards: {
    media: Media;
    title: string;
    icons: string[];
    lines: string[];
  }[];
}

// Bloc Testimonial
export interface BlocTestimonial {
  type: "testimonial";
  title: string;
  conclusion: string;
}

// Bloc Etape
export interface BlocEtape {
  type: "etape";
  media: Media;
  lineTitle: TitleLine[];
  subTitle: string;
  text: string;
  cta: string;
  stepLines: {
    title: string;
    subtitle: string;
  }[];
}

// Bloc FAQ
export interface BlocFAQ {
  type: "faq";
  title: string;
  blocs: {
    question: string;
    answer: string;
  }[];
}

// Bloc Footer
export interface BlocFooter {
  type: "footer";
  lineTitle: TitleLine[];
  subTitle: string;
  cta: string;
}

// Bloc UseCase
export interface BlocUseCase {
  type: "useCase";
  title: string;
  portfolioIds: string[]; // IDs des portfolios à afficher
}

// Union de tous les types de blocs
export type Bloc =
  | BlocIntro
  | BlocCards
  | BlocChiffresCles
  | BlocCommentaireClient
  | BlocMethods
  | BlocTestimonial
  | BlocEtape
  | BlocFAQ
  | BlocFooter
  | BlocUseCase;

// Type principal Landing Page
export interface LandingPage {
  id?: string;
  title: string;
  slug: string;
  color: string;
  seo: LandingPageSEO;
  blocs: Bloc[];
  createdAt?: string;
  updatedAt?: string;
}

// Type pour la création (sans id ni dates)
export type LandingPageCreate = Omit<LandingPage, "id" | "createdAt" | "updatedAt">;

// Liste des types de blocs disponibles
export const BLOC_TYPES = [
  { value: "blocIntro", label: "Bloc Intro" },
  { value: "cards", label: "Cards" },
  { value: "chiffresCles", label: "Chiffres Clés" },
  { value: "commentaireClient", label: "Commentaire Client" },
  { value: "methods", label: "Méthodes" },
  { value: "testimonial", label: "Témoignages" },
  { value: "etape", label: "Étapes" },
  { value: "faq", label: "FAQ" },
  { value: "footer", label: "Footer" },
  { value: "useCase", label: "Use Cases" },
] as const;

// Fonction helper pour créer un bloc vide par type
export function createEmptyBloc(type: Bloc["type"]): Bloc {
  switch (type) {
    case "blocIntro":
      return {
        type: "blocIntro",
        lineTitle: [],
        punchline: "",
        description: "",
        cta: "",
        tags: [],
        media: { type: "image", url: "" },
      };
    case "cards":
      return {
        type: "cards",
        title: "",
        cards: [],
        cta: { label: "", ctaType: "color" },
      };
    case "chiffresCles":
      return {
        type: "chiffresCles",
        title: "",
        numbers: [],
        media: { type: "image", url: "" },
      };
    case "commentaireClient":
      return {
        type: "commentaireClient",
        text: "",
        author: "",
      };
    case "methods":
      return {
        type: "methods",
        lineTitle: [],
        subTitle: "",
        conclusion: { elements: [], colorType: "white" },
        cards: [],
      };
    case "testimonial":
      return {
        type: "testimonial",
        title: "",
        conclusion: "",
      };
    case "etape":
      return {
        type: "etape",
        media: { type: "image", url: "" },
        lineTitle: [],
        subTitle: "",
        text: "",
        cta: "",
        stepLines: [],
      };
    case "faq":
      return {
        type: "faq",
        title: "",
        blocs: [],
      };
    case "footer":
      return {
        type: "footer",
        lineTitle: [],
        subTitle: "",
        cta: "",
      };
    case "useCase":
      return {
        type: "useCase",
        title: "",
        portfolioIds: [],
      };
  }
}
