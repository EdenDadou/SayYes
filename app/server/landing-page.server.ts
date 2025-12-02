import { prisma } from "./db.server";
import type { LandingPage, LandingPageSEO, Bloc } from "~/types/landing-page";

// Interface pour les données parsées
export interface LandingPageWithParsedData {
  id: string;
  title: string;
  slug: string;
  color: string;
  seo: LandingPageSEO;
  blocs: Bloc[];
  createdAt: Date;
  updatedAt: Date;
}

// Helper pour parser JSON de manière sécurisée
function safeParse<T>(data: string | null | undefined, fallback: T): T {
  if (!data || data === "undefined" || data === "null") {
    return fallback;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    console.warn("Erreur parsing JSON:", e, "data:", data);
    return fallback;
  }
}

// Vérifier si un slug existe déjà
export async function isLandingPageSlugUnique(
  slug: string,
  excludeId?: string
): Promise<boolean> {
  const existing = await prisma.landingPage.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!existing) return true;
  if (excludeId && existing.id === excludeId) return true;

  return false;
}

// Créer une nouvelle landing page
export async function createLandingPage(data: {
  title: string;
  slug: string;
  color: string;
  seo: LandingPageSEO;
  blocs: Bloc[];
}): Promise<string> {
  const landingPage = await prisma.landingPage.create({
    data: {
      title: data.title,
      slug: data.slug,
      color: data.color,
      seo: JSON.stringify(data.seo),
      blocs: JSON.stringify(data.blocs),
    },
  });

  return landingPage.id;
}

// Mettre à jour une landing page
export async function updateLandingPage(
  id: string,
  data: Partial<{
    title: string;
    slug: string;
    color: string;
    seo: LandingPageSEO;
    blocs: Bloc[];
  }>
): Promise<void> {
  const updateData: any = {};

  if (data.title !== undefined) updateData.title = data.title;
  if (data.slug !== undefined) updateData.slug = data.slug;
  if (data.color !== undefined) updateData.color = data.color;
  if (data.seo !== undefined) updateData.seo = JSON.stringify(data.seo);
  if (data.blocs !== undefined) updateData.blocs = JSON.stringify(data.blocs);

  await prisma.landingPage.update({
    where: { id },
    data: updateData,
  });
}

// Mettre à jour une landing page par slug
export async function updateLandingPageBySlug(
  slug: string,
  data: Partial<{
    title: string;
    slug: string;
    color: string;
    seo: LandingPageSEO;
    blocs: Bloc[];
  }>
): Promise<void> {
  const updateData: any = {};

  if (data.title !== undefined) updateData.title = data.title;
  if (data.slug !== undefined) updateData.slug = data.slug;
  if (data.color !== undefined) updateData.color = data.color;
  if (data.seo !== undefined) updateData.seo = JSON.stringify(data.seo);
  if (data.blocs !== undefined) updateData.blocs = JSON.stringify(data.blocs);

  await prisma.landingPage.update({
    where: { slug },
    data: updateData,
  });
}

// Récupérer une landing page par ID
export async function getLandingPage(
  id: string
): Promise<LandingPageWithParsedData | null> {
  const landingPage = await prisma.landingPage.findUnique({
    where: { id },
  });

  if (!landingPage) return null;

  return {
    id: landingPage.id,
    title: landingPage.title,
    slug: landingPage.slug,
    color: landingPage.color,
    seo: safeParse<LandingPageSEO>(landingPage.seo, {
      metaTitle: "",
      metaDescription: "",
    }),
    blocs: safeParse<Bloc[]>(landingPage.blocs, []),
    createdAt: landingPage.createdAt,
    updatedAt: landingPage.updatedAt,
  };
}

// Récupérer une landing page par slug
export async function getLandingPageBySlug(
  slug: string
): Promise<LandingPageWithParsedData | null> {
  const landingPage = await prisma.landingPage.findUnique({
    where: { slug },
  });

  if (!landingPage) return null;

  return {
    id: landingPage.id,
    title: landingPage.title,
    slug: landingPage.slug,
    color: landingPage.color,
    seo: safeParse<LandingPageSEO>(landingPage.seo, {
      metaTitle: "",
      metaDescription: "",
    }),
    blocs: safeParse<Bloc[]>(landingPage.blocs, []),
    createdAt: landingPage.createdAt,
    updatedAt: landingPage.updatedAt,
  };
}

// Récupérer toutes les landing pages
export async function getAllLandingPages(): Promise<LandingPageWithParsedData[]> {
  const landingPages = await prisma.landingPage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return landingPages.map((lp) => ({
    id: lp.id,
    title: lp.title,
    slug: lp.slug,
    color: lp.color,
    seo: safeParse<LandingPageSEO>(lp.seo, {
      metaTitle: "",
      metaDescription: "",
    }),
    blocs: safeParse<Bloc[]>(lp.blocs, []),
    createdAt: lp.createdAt,
    updatedAt: lp.updatedAt,
  }));
}

// Supprimer une landing page par slug
export async function deleteLandingPageBySlug(slug: string): Promise<void> {
  const landingPage = await prisma.landingPage.findUnique({
    where: { slug },
  });

  if (!landingPage) {
    throw new Error("Landing page non trouvée");
  }

  await prisma.landingPage.delete({
    where: { slug },
  });
}

// Supprimer une landing page par ID
export async function deleteLandingPage(id: string): Promise<void> {
  await prisma.landingPage.delete({
    where: { id },
  });
}

// Compter le nombre total de landing pages
export async function getLandingPageCount(): Promise<number> {
  return await prisma.landingPage.count();
}
