import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  getPortfolioBySlug,
  getPublicPortfolios,
} from "~/server/portfolio.server";
import { useViewport } from "~/utils/hooks/useViewport";
import ArrowLight from "~/assets/icons/ArrowLight";
import { PortfolioData } from "~/utils/admin/manage-portfolio-types";
import BackgroundProject1 from "~/components/Screens/PortfolioProject/BackgroundProject1";
import BackgroundProject2 from "~/components/Screens/PortfolioProject/BackgroundProject2";
import PhotoMain from "~/components/Screens/Portfolio/components/PhotoMain";
import Desktoplayout from "~/components/Layout/Desktop";
import Bento from "~/components/Screens/Portfolio/components/Bento";
import ProjectCarousel from "~/components/Screens/Portfolio/components/ProjectCarousel";
import "~/styles/tailwind.css";
import PortfolioProjectMobile from "~/components/Screens/PortfolioProject/mobile/PortfolioProjectMobile";
import Coche from "~/assets/icons/Coche";
import NoteStar from "~/assets/icons/NoteStar";
import Star from "~/assets/icons/Star";
import BackgroundProject3 from "~/components/Screens/PortfolioProject/BackgroundProject3";

// Loader pour récupérer le portfolio par slug
export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  if (!slug) {
    throw new Response("Slug manquant", { status: 400 });
  }

  try {
    const portfolio = await getPortfolioBySlug(slug);
    const allPortfolios = await getPublicPortfolios();

    if (!portfolio) {
      throw new Response("Portfolio non trouvé", { status: 404 });
    }

    return json({ portfolio, allPortfolios });
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    throw new Response("Erreur interne du serveur", { status: 500 });
  }
}

// Meta fonction pour les métadonnées SEO
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.portfolio) {
    return [
      { title: "Portfolio non trouvé - SayYes" },
      { name: "description", content: "Ce portfolio n'existe pas." },
    ];
  }

  const { portfolio } = data;

  // Préparer les métadonnées de base
  const metaTitle = portfolio.metaTitle || `${portfolio.titre} - SayYes`;
  const metaDescription =
    portfolio.metaDescription ||
    portfolio.description ||
    `Découvrez le projet ${portfolio.titre}`;

  // Construire l'URL complète de l'image
  const baseUrl = "https://vps-f16913b8.vps.ovh.net";
  const imageRelativePath =
    portfolio.metaImage || portfolio.photoMain || portfolio.photoCouverture;
  const metaImage = imageRelativePath.startsWith("http")
    ? imageRelativePath
    : `${baseUrl}${imageRelativePath}`;

  // URL complète de la page
  const url = `${baseUrl}/portfolio/${portfolio.slug}`;

  // Parser le Schema.org si présent
  let schemaOrgScript = null;
  if (portfolio.schemaOrg && portfolio.schemaOrg !== "{}") {
    try {
      const schemaData = JSON.parse(portfolio.schemaOrg);
      schemaOrgScript = {
        "script:ld+json": schemaData,
      };
    } catch (e) {
      console.error("Erreur lors du parsing du Schema.org:", e);
    }
  }

  const metaTags = [
    // Métadonnées de base
    { title: metaTitle },
    { name: "description", content: metaDescription },

    // Open Graph / Facebook
    { property: "og:title", content: metaTitle },
    { property: "og:description", content: metaDescription },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: metaImage },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: metaTitle },
    { name: "twitter:description", content: metaDescription },
    { name: "twitter:image", content: metaImage },

    // Métadonnées supplémentaires
    { name: "keywords", content: portfolio.categories.join(", ") },
  ];

  // Ajouter le Schema.org si présent
  if (schemaOrgScript) {
    metaTags.push(schemaOrgScript as any);
  }

  return metaTags;
};

export default function PortfolioSlug() {
  const { portfolio, allPortfolios } = useLoaderData<typeof loader>();
  const isMobile = useViewport();

  return isMobile ? (
    <PortfolioProjectMobile
      portfolio={portfolio}
      allPortfolios={allPortfolios as PortfolioData[]}
    />
  ) : (
    <Desktoplayout>
      <BackgroundProject1
        fill={portfolio.couleur}
        className="absolute top-0 left-0 right-0 w-screen object-cover"
      />
      <main className="w-screen h-fit relative pb-20">
        {/* Main Content */}
        <div className="relative z-10 pt-12 flex flex-col">
          {/* Hero Section */}
          <section className="pt-12 px-20 flex flex-col gap-10 pb-6 justify-center items-center">
            {/* Title and Kicker */}
            <div className="flex flex-row justify-between items-end w-[988px]">
              <div className="flex flex-col gap-10 w-full">
                <div className="h-[3px] w-24 holographic-bg" />

                <div className="flex flex-row justify-between items-end w-full">
                  <div className="flex flex-col">
                    {/* Top Title si disponible */}
                    {portfolio.topTitle ? (
                      <p
                        className="text-7xl text-white flex flex-row items-center
                    font-jakarta-semi-bold tracking-[-2px]"
                      >
                        {portfolio.topTitle}
                      </p>
                    ) : null}
                    <h1
                      className="text-7xl font-bold text-white flex flex-row items-center gap-6 font-jakarta leading-[60px] tracking-[-2px]"
                      style={{ color: portfolio.couleur }}
                    >
                      <ArrowLight className="w-20 h-20" />
                      {portfolio.titre}
                    </h1>
                  </div>
                  <p className="flex flex-row items-center gap-2 text-white text-2xl font-jakarta-semi-bold">
                    <NoteStar className="w-6 h-6" fill="black" /> Sortlist 4.9 I
                    5
                  </p>
                </div>
              </div>
            </div>

            {/* Photo Main */}
            <PhotoMain
              photo={portfolio.photoMain || portfolio.photoCouverture}
              title={portfolio.titre}
            />
          </section>

          {/* Content Grid */}
          <section className="flex justify-center py-12 bg-white px-8">
            <div className="w-[990px] flex flex-row">
              <div className="w-[487px] pr-10">
                <p className="text-black text-[26px] font-jakarta leading-relaxed">
                  {portfolio.description}
                </p>
              </div>
              <div className="flex flex-col gap-4 w-[495px]">
                <p
                  className="text-black text-[14px] leading-relaxed font-jakarta"
                  dangerouslySetInnerHTML={{
                    __html: portfolio.kicker.replaceAll(
                      "<b>",
                      "<b class='font-jakarta-bold text-[18px]'>"
                    ),
                  }}
                />
              </div>
            </div>
          </section>
          {/* Deliverables */}
          <div className="flex justify-center pb-[100px] bg-white px-8 z-20">
            <div className="w-[990px] flex flex-col">
              <h3 className=" flex flex-row items-center gap-2 text-2xl text-black mb-6 font-jakarta-semi-bold tracking-[-1px]">
                <Star className="w-6 h-6" fill="black" />
                Notre accompagnement
              </h3>
              <div className="flex flex-row gap-5 w-full">
                {portfolio.livrable.map((item: string, index: number) => (
                  <span
                    key={index}
                    className="flex flex-row items-center gap-2 px-4 py-3 rounded-full text-[13px] border font-jakarta-bold"
                    style={{
                      color: portfolio.couleur,
                      borderColor: portfolio.couleur,
                    }}
                  >
                    <Coche className="w-4 h-4" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <section className="relative px-32">
            <BackgroundProject2
              fill={portfolio.couleur}
              className="absolute -top-[150px] left-0 right-0 w-screen z-0"
            />
            <div className="relative z-50">
              <h2 className="flex flex-row justify-center items-center gap-2 text-[40px] font-bold text-black font-jakarta-semi-bold mb-12 z-50 tracking-[-2px]">
                <Star className="w-5 h-5" fill={portfolio.couleur} />
                {portfolio.sousTitre.split(" ").slice(0, 3).join(" ")}
                <span style={{ color: portfolio.couleur }}>
                  {portfolio.sousTitre.split(" ").slice(3).join(" ")}
                </span>
                <Star className="w-5 h-5" fill={portfolio.couleur} />
              </h2>
            </div>

            <div className="space-y-4">
              {portfolio.bento[0] && <Bento bento={portfolio.bento[0]} />}
            </div>
          </section>

          <section className="flex flex-col items-center justify-center py-[100px] w-[814px] self-center">
            <div className="h-[3px] w-28 holographic-bg" />
            {/* Témoignage */}
            {portfolio.temoignage && portfolio.temoignage.contenu ? (
              <div className="pt-8 flex flex-col items-center justify-center gap-8 ">
                <blockquote className="text-white text-[22px] leading-[32px] text-center font-jakarta">
                  {portfolio.temoignage.contenu}
                </blockquote>
                <div className="flex flex-col gap-1">
                  <cite className="text-white font-jakarta-bold text-[18px]">
                    {`${portfolio.temoignage.auteur} ${portfolio.temoignage.poste ? ` - ${portfolio.temoignage.poste}` : ""}`}
                  </cite>
                </div>
              </div>
            ) : null}
          </section>
          <section className="mb-16 relative px-32 z-10">
            <div className="space-y-4">
              {portfolio.bento[1] && <Bento bento={portfolio.bento[1]} />}
            </div>
          </section>
        </div>
        <ProjectCarousel portfolios={allPortfolios as PortfolioData[]} />
      </main>
      <BackgroundProject3
        fill={portfolio.couleur}
        className="absolute bottom-[620px] left-0 right-0 w-screen h-auto z-0"
      />
    </Desktoplayout>
  );
}
