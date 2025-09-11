import { prisma } from "./db.server";
import { deleteMedia } from "./media.server";

// Types pour les données du portfolio (repris du fichier existant)
export interface BentoLine {
  format: "1/3 - 2/3" | "3 carrés" | "banner" | "2 carré" | "full";
  listImage: string[];
}

export interface BentoItem {
  lines: BentoLine[];
}

export interface PortfolioData {
  titre: string;
  photoCouverture: string;
  description: string;
  kicker: string;
  livrable: string[];
  sousTitre: string;
  bento: BentoItem[];
}

export interface PortfolioWithMedia {
  id: string;
  titre: string;
  photoCouverture: string;
  description: string;
  kicker: string;
  sousTitre: string;
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

// Créer un nouveau portfolio
export async function createPortfolio(data: PortfolioData): Promise<string> {
  const portfolio = await prisma.portfolio.create({
    data: {
      titre: data.titre,
      photoCouverture: data.photoCouverture,
      description: data.description,
      kicker: data.kicker,
      sousTitre: data.sousTitre,
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

  return {
    ...portfolio,
    livrable: JSON.parse(portfolio.livrable),
    bento: JSON.parse(portfolio.bento),
  };
}

// Récupérer tous les portfolios
export async function getAllPortfolios(): Promise<PortfolioWithMedia[]> {
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

  return portfolios.map((portfolio) => ({
    ...portfolio,
    livrable: JSON.parse(portfolio.livrable),
    bento: JSON.parse(portfolio.bento),
  }));
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
  const portfolios = await prisma.portfolio.findMany({
    select: {
      id: true,
      titre: true,
      photoCouverture: true,
      description: true,
      kicker: true,
      sousTitre: true,
      livrable: true,
      bento: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return portfolios.map((portfolio) => ({
    ...portfolio,
    livrable: JSON.parse(portfolio.livrable),
    bento: JSON.parse(portfolio.bento),
  }));
}

// Compter le nombre total de portfolios
export async function getPortfolioCount(): Promise<number> {
  return await prisma.portfolio.count();
}
