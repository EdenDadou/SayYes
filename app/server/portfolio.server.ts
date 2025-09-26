import { prisma } from "./db.server";
import { deleteMedia } from "./media.server";

// Types pour les données du portfolio (repris du fichier existant)
export interface BentoLine {
  format: "1/3 - 2/3" | "3 carrés" | "banner" | "2 carré" | "full";
  listImage: string[]; // URLs des médias (images et vidéos)
}

export interface BentoItem {
  lines: BentoLine[];
}

export interface PortfolioData {
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

export interface PortfolioWithMedia {
  id: string;
  titre: string;
  categories: string[];
  slug: string;
  photoCouverture: string;
  photoMain: string;
  description: string;
  kicker: string;
  sousTitre: string;
  topTitle: string;
  couleur: string;
  temoignage: {
    auteur: string;
    contenu: string;
    poste?: string;
    entreprise?: string;
  };
  livrable: string[];
  bento: BentoItem[];
  createdAt: Date;
  updatedAt: Date;
  medias: Array<{
    id: string;
    filename: string;
    originalName: string;
    url: string;
    type: string;
  }>;
}

// Vérifier si un slug existe déjà
export async function isSlugUnique(
  slug: string,
  excludeId?: string
): Promise<boolean> {
  const existingPortfolio = await prisma.portfolio.findUnique({
    where: { slug },
    select: { id: true },
  });

  // Si aucun portfolio trouvé, le slug est unique
  if (!existingPortfolio) return true;

  // Si on exclut un ID (pour les mises à jour), vérifier que ce n'est pas le même portfolio
  if (excludeId && existingPortfolio.id === excludeId) return true;

  return false;
}

// Créer un nouveau portfolio
export async function createPortfolio(data: PortfolioData): Promise<string> {
  const portfolio = await prisma.portfolio.create({
    data: {
      titre: data.titre,
      categories: JSON.stringify(data.categories),
      slug: data.slug,
      photoCouverture: data.photoCouverture,
      photoMain: data.photoMain || "",
      description: data.description,
      kicker: data.kicker,
      sousTitre: data.sousTitre,
      ...(data.topTitle && { topTitle: data.topTitle }),
      ...(data.couleur && { couleur: data.couleur }),
      ...(data.temoignage && { temoignage: JSON.stringify(data.temoignage) }),
      livrable: JSON.stringify(data.livrable),
      bento: JSON.stringify(data.bento),
    },
  });

  return portfolio.id;
}

// Mettre à jour un portfolio
export async function updatePortfolio(
  id: string,
  data: Partial<PortfolioData>
): Promise<void> {
  const updateData: any = { ...data };

  // Convertir les arrays/objects en JSON strings si nécessaire
  if (data.livrable) {
    updateData.livrable = JSON.stringify(data.livrable);
  }
  if (data.bento) {
    updateData.bento = JSON.stringify(data.bento);
  }
  if (data.photoMain !== undefined) {
    updateData.photoMain = data.photoMain;
  }
  if (data.categories !== undefined) {
    updateData.categories = JSON.stringify(data.categories);
  }
  if (data.temoignage) {
    updateData.temoignage = JSON.stringify(data.temoignage);
  }

  await prisma.portfolio.update({
    where: { id },
    data: updateData,
  });
}

// Récupérer un portfolio par ID
export async function getPortfolio(
  id: string
): Promise<PortfolioWithMedia | null> {
  const portfolio = await prisma.portfolio.findUnique({
    where: { id },
    include: {
      medias: {
        select: {
          id: true,
          filename: true,
          originalName: true,
          url: true,
          type: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!portfolio) return null;

  // Fonction helper pour parser les données JSON de manière sécurisée
  const safeParse = (data: string | null | undefined, fallback: any = []) => {
    if (!data || data === "undefined" || data === "null") {
      return fallback;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      console.warn("Erreur parsing JSON:", e, "data:", data);
      return fallback;
    }
  };

  return {
    id: portfolio.id,
    titre: portfolio.titre,
    categories: safeParse(portfolio.categories, []),
    slug: portfolio.slug,
    photoCouverture: portfolio.photoCouverture,
    photoMain: (portfolio as any).photoMain || "",
    description: portfolio.description,
    kicker: portfolio.kicker,
    sousTitre: portfolio.sousTitre,
    topTitle: (portfolio as any).topTitle || "",
    couleur: (portfolio as any).couleur || "",
    createdAt: portfolio.createdAt,
    updatedAt: portfolio.updatedAt,
    livrable: safeParse(portfolio.livrable, []),
    bento: safeParse(portfolio.bento, []),
    temoignage: safeParse((portfolio as any).temoignage, {
      auteur: "",
      contenu: "",
    }),
    medias: portfolio.medias,
  };
}

// Récupérer un portfolio par slug
export async function getPortfolioBySlug(
  slug: string
): Promise<PortfolioWithMedia | null> {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { slug },
      include: {
        medias: {
          select: {
            id: true,
            filename: true,
            originalName: true,
            url: true,
            type: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!portfolio) {
      return null;
    }

    // Fonction helper pour parser les données JSON de manière sécurisée
    const safeParse = (data: string | null | undefined, fallback: any = []) => {
      if (!data || data === "undefined" || data === "null") {
        return fallback;
      }
      try {
        return JSON.parse(data);
      } catch (e) {
        return fallback;
      }
    };

    return {
      id: portfolio.id,
      titre: portfolio.titre,
      categories: safeParse(portfolio.categories, []),
      slug: portfolio.slug,
      photoCouverture: portfolio.photoCouverture,
      photoMain: (portfolio as any).photoMain || "",
      description: portfolio.description || "",
      kicker: portfolio.kicker || "",
      sousTitre: portfolio.sousTitre || "",
      topTitle: (portfolio as any).topTitle || "",
      couleur: (portfolio as any).couleur || "",
      createdAt: portfolio.createdAt,
      updatedAt: portfolio.updatedAt,
      livrable: safeParse(portfolio.livrable, []),
      bento: safeParse(portfolio.bento, []),
      temoignage: safeParse((portfolio as any).temoignage, {
        auteur: "",
        contenu: "",
      }),
      medias: portfolio.medias,
    };
  } catch (error) {
    return null;
  }
}

// Récupérer tous les portfolios
export async function getAllPortfolios(): Promise<PortfolioWithMedia[]> {
  try {
    const portfolios = await prisma.portfolio.findMany({
      include: {
        medias: {
          select: {
            id: true,
            filename: true,
            originalName: true,
            url: true,
            type: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Fonction helper pour parser les données JSON de manière sécurisée
    const safeParse = (data: string | null | undefined, fallback: any = []) => {
      if (!data || data === "undefined" || data === "null") {
        return fallback;
      }
      try {
        return JSON.parse(data);
      } catch (e) {
        console.warn("Erreur parsing JSON:", e, "data:", data);
        return fallback;
      }
    };

    return portfolios.map((portfolio) => ({
      id: portfolio.id,
      titre: portfolio.titre,
      categories: safeParse(portfolio.categories, []),
      slug: portfolio.slug,
      photoCouverture: portfolio.photoCouverture,
      photoMain: (portfolio as any).photoMain || "",
      description: portfolio.description || "",
      kicker: portfolio.kicker || "",
      sousTitre: portfolio.sousTitre || "",
      topTitle: (portfolio as any).topTitle || "",
      couleur: (portfolio as any).couleur || "",
      createdAt: portfolio.createdAt,
      updatedAt: portfolio.updatedAt,
      livrable: safeParse(portfolio.livrable, []),
      bento: safeParse(portfolio.bento, []),
      temoignage: safeParse((portfolio as any).temoignage, {
        auteur: "",
        contenu: "",
      }),
      medias: portfolio.medias,
    }));
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des portfolios:", error);
    throw error;
  }
}

// Mettre à jour un portfolio par slug
export async function updatePortfolioBySlug(
  slug: string,
  data: Partial<PortfolioData>
): Promise<void> {
  const updateData: any = { ...data };

  // Convertir les arrays/objects en JSON strings si nécessaire
  if (data.livrable) {
    updateData.livrable = JSON.stringify(data.livrable);
  }
  if (data.bento) {
    updateData.bento = JSON.stringify(data.bento);
  }
  if (data.photoMain !== undefined) {
    updateData.photoMain = data.photoMain;
  }
  if (data.categories !== undefined) {
    updateData.categories = JSON.stringify(data.categories);
  }
  if (data.temoignage) {
    updateData.temoignage = JSON.stringify(data.temoignage);
  }

  await prisma.portfolio.update({
    where: { slug },
    data: updateData,
  });
}

// Supprimer un portfolio par slug
export async function deletePortfolioBySlug(slug: string): Promise<void> {
  // Récupérer le portfolio avec ses médias
  const portfolio = await prisma.portfolio.findUnique({
    where: { slug },
    include: { medias: true },
  });

  if (!portfolio) {
    throw new Error("Portfolio non trouvé");
  }

  // Supprimer tous les médias associés
  for (const media of portfolio.medias) {
    try {
      await deleteMedia(media.id);
    } catch (error) {
      console.error(
        `Erreur lors de la suppression du média ${media.id}:`,
        error
      );
    }
  }

  // Supprimer le portfolio
  await prisma.portfolio.delete({
    where: { slug },
  });
}

// Supprimer un portfolio
export async function deletePortfolio(id: string): Promise<void> {
  // Récupérer le portfolio avec ses médias
  const portfolio = await prisma.portfolio.findUnique({
    where: { id },
    include: { medias: true },
  });

  if (!portfolio) {
    throw new Error("Portfolio non trouvé");
  }

  // Supprimer tous les médias associés
  for (const media of portfolio.medias) {
    try {
      await deleteMedia(media.id);
    } catch (error) {
      console.error(
        `Erreur lors de la suppression du média ${media.id}:`,
        error
      );
    }
  }

  // Supprimer le portfolio
  await prisma.portfolio.delete({
    where: { id },
  });
}

// Récupérer les portfolios pour l'affichage public (sans les médias)
export async function getPublicPortfolios() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      select: {
        id: true,
        titre: true,
        categories: true,
        slug: true,
        photoCouverture: true,
        photoMain: true,
        description: true,
        kicker: true,
        sousTitre: true,
        topTitle: true,
        couleur: true,
        temoignage: true,
        livrable: true,
        bento: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Fonction helper pour parser les données JSON de manière sécurisée
    const safeParse = (data: string | null | undefined, fallback: any = []) => {
      if (!data || data === "undefined" || data === "null") {
        return fallback;
      }
      try {
        return JSON.parse(data);
      } catch (e) {
        return fallback;
      }
    };

    return portfolios.map((portfolio) => {
      try {
        return {
          id: portfolio.id,
          titre: portfolio.titre,
          categories: safeParse(portfolio.categories, []),
          slug: portfolio.slug,
          photoCouverture: portfolio.photoCouverture,
          photoMain: (portfolio as any).photoMain || "",
          description: portfolio.description || "",
          kicker: portfolio.kicker || "",
          sousTitre: portfolio.sousTitre || "",
          topTitle: (portfolio as any).topTitle || "",
          couleur: (portfolio as any).couleur || "",
          createdAt: portfolio.createdAt,
          livrable: safeParse(portfolio.livrable, []),
          bento: safeParse(portfolio.bento, []),
          temoignage: safeParse((portfolio as any).temoignage, {
            auteur: "",
            contenu: "",
          }),
        };
      } catch (error) {
        // En cas d'erreur sur un portfolio, retourner un portfolio par défaut plutôt que de faire planter
        return {
          id: portfolio.id,
          titre: portfolio.titre || "Titre par défaut",
          categories: [],
          slug: portfolio.slug,
          photoCouverture: portfolio.photoCouverture,
          photoMain: "",
          description: "",
          kicker: "",
          sousTitre: "",
          topTitle: "",
          couleur: "",
          createdAt: portfolio.createdAt,
          livrable: [],
          bento: [],
          temoignage: {
            auteur: "",
            contenu: "",
          },
        };
      }
    });
  } catch (error) {
    return [];
  }
}

// Compter le nombre total de portfolios
export async function getPortfolioCount(): Promise<number> {
  return await prisma.portfolio.count();
}
