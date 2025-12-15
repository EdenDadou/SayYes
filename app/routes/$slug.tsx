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
import Desktoplayout from "~/components/Layout/Desktop";
import MobileLayout from "~/components/Layout/Mobile";
import { usePortfolio } from "~/contexts/PortfolioContext";
import { AnimatePresence, motion } from "framer-motion";

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  if (!slug) {
    throw new Response("Slug manquant", { status: 400 });
  }

  const landingPage = await getLandingPageBySlug(slug);

  if (!landingPage) {
    throw new Response("Landing page non trouvée", { status: 404 });
  }

  return json({ landingPage });
}

export default function LandingPagePublic() {
  const { landingPage } = useLoaderData<typeof loader>();
  const { allPortfolios: portfolios } = usePortfolio();
  const isMobile = useViewport();

  const content = (
    <>
      {/* Schema.org JSON-LD */}
      {landingPage.seo.schemaOrg && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: landingPage.seo.schemaOrg }}
        />
      )}

      {/* Render all blocs */}
      <div className="w-screen h-fit relative pt-">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut", delay: 0.2 }}
          >
            {/* <Background className="absolute -top-48 left-0 w-full h-auto z-0 opacity-80" /> */}
            <img
              src="/images/portfolio/bg.png"
              alt="Background"
              className="absolute -top-20 left-0 w-full h-auto z-0 opacity-80"
            />
          </motion.div>
        </AnimatePresence>
        <section className="relative z-10 md:w-[988px] mx-auto flex flex-col justify-center  items-center gap-10">
          {landingPage.blocs.map((bloc: Bloc, index: number) => (
            <BlocRenderer
              key={index}
              bloc={bloc}
              color={landingPage.color}
              portfolios={portfolios}
            />
          ))}
        </section>
      </div>
    </>
  );

  if (isMobile === null) {
    return null;
  }

  return isMobile ? (
    <MobileLayout>{content}</MobileLayout>
  ) : (
    <Desktoplayout>{content}</Desktoplayout>
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
