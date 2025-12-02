import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { getLandingPageBySlug } from "~/server/landing-page.server";
import { prisma } from "~/server/db.server";
import { BlocRenderer } from "~/components/LandingPage";
import type { Bloc, BlocUseCase } from "~/types/landing-page";
import { useViewport } from "~/utils/hooks/useViewport";
import Page404 from "~/components/Screens/404";
import Page404Mobile from "~/components/Screens/404/mobile/Page404Mobile";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.landingPage) {
    return [
      { title: "Page non trouvée" },
      { name: "description", content: "Cette page n'existe pas" },
    ];
  }

  const { landingPage } = data;
  const seo = landingPage.seo;

  return [
    { title: seo.metaTitle || landingPage.title },
    { name: "description", content: seo.metaDescription || "" },
    // Open Graph
    { property: "og:title", content: seo.metaTitle || landingPage.title },
    { property: "og:description", content: seo.metaDescription || "" },
    { property: "og:type", content: "website" },
    ...(seo.image?.url
      ? [{ property: "og:image", content: seo.image.url }]
      : []),
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: seo.metaTitle || landingPage.title },
    { name: "twitter:description", content: seo.metaDescription || "" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  if (!slug) {
    throw new Response("Slug manquant", { status: 400 });
  }

  const landingPage = await getLandingPageBySlug(slug);

  if (!landingPage) {
    throw new Response("Landing page non trouvée", { status: 404 });
  }

  // Récupérer les portfolios si nécessaire pour les blocs UseCase
  let portfolios: {
    id: string;
    titre: string;
    imageCover: string;
    description?: string;
  }[] = [];

  const useCaseBlocs = landingPage.blocs.filter(
    (bloc): bloc is BlocUseCase => bloc.type === "useCase"
  );

  if (useCaseBlocs.length > 0) {
    const portfolioIds = useCaseBlocs.flatMap((bloc) => bloc.portfolioIds);

    if (portfolioIds.length > 0) {
      const dbPortfolios = await prisma.portfolio.findMany({
        where: {
          id: { in: portfolioIds },
        },
        select: {
          id: true,
          titre: true,
          photoCouverture: true,
          description: true,
        },
      });

      portfolios = dbPortfolios.map((p) => ({
        id: p.id,
        titre: p.titre,
        imageCover: p.photoCouverture,
        description: p.description || undefined,
      }));
    }
  }

  return json({ landingPage, portfolios });
}

export default function LandingPagePublic() {
  const { landingPage, portfolios } = useLoaderData<typeof loader>();

  return (
    <main className="min-h-screen bg-black">
      {/* Schema.org JSON-LD */}
      {landingPage.seo.schemaOrg && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: landingPage.seo.schemaOrg }}
        />
      )}

      {/* Render all blocs */}
      {landingPage.blocs.map((bloc: Bloc, index: number) => (
        <BlocRenderer
          key={index}
          bloc={bloc}
          color={landingPage.color}
          portfolios={portfolios}
        />
      ))}
    </main>
  );
}

// Error boundary
export function ErrorBoundary() {
  const error = useRouteError();
  const isMobile = useViewport();

  // Attendre que le viewport soit détecté pour éviter le flash
  if (isMobile === null) {
    return null;
  }

  // Afficher la page 404 uniquement pour les erreurs de route (404)
  if (isRouteErrorResponse(error) && error.status === 404) {
    return !isMobile ? <Page404 /> : <Page404Mobile />;
  }

  // Pour les autres erreurs, on peut afficher un message générique
  // ou relancer l'erreur pour le débogage
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Une erreur est survenue</h1>
        <p className="mt-2 text-gray-600">Veuillez réessayer plus tard.</p>
      </div>
    </div>
  );
}
