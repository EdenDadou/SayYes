import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  getPortfolioBySlug,
  getPublicPortfolios,
} from "~/server/portfolio.server";
import { useViewport } from "~/utils/hooks/useViewport";
import ArrowLight from "~/assets/icons/ArrowLight";
import Star from "~/assets/icons/Star";
import Coche from "~/assets/icons/Coche";
import NoteStar from "~/assets/icons/NoteStar";
import BackgroundProject1 from "~/components/PortfolioProject/BackgroundProject1";
import BackgroundProject2 from "~/components/PortfolioProject/BackgroundProject2";
import PhotoMain from "~/components/Portfolio/components/PhotoMain";
import Desktoplayout from "~/components/Layout/Desktop";
import Bento from "~/components/Portfolio/components/Bento";
import Card from "~/components/Card";
import ContentPortfolio from "~/components/Card/components/ContentPortfolio";
import ProjectCarousel from "~/components/Portfolio/components/ProjectCarousel";
import "~/styles/tailwind.css";
import BackgroundProject3 from "~/components/PortfolioProject/BackgroundProject3";

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

export default function PortfolioSlug() {
  const { portfolio, allPortfolios } = useLoaderData<typeof loader>();
  const isMobile = useViewport();

  return (
    <Desktoplayout>
      <BackgroundProject1
        fill={portfolio.couleur}
        className="absolute top-0 left-0 right-0 w-screen object-cover"
      />
      <main className="w-screen h-fit relative pb-20">
        {/* Main Content */}
        <div className="relative z-10 pt-12 flex flex-col ">
          {/* Hero Section */}
          <section className="py-12 md:px-20 flex flex-col gap-12">
            {/* Title and Kicker */}
            <div className="flex flex-row justify-between items-end pl-16">
              <div className="flex flex-col gap-12">
                <div className="h-[3px] w-28 holographic-bg" />

                <div className="flex flex-col">
                  {/* Top Title si disponible */}
                  {portfolio.topTitle ? (
                    <p
                      className="text-4xl md:text-7xl font-bold text-white flex flex-row items-center
                  font-jakarta mb-2"
                    >
                      {portfolio.topTitle}
                    </p>
                  ) : null}
                  <h1
                    className="text-4xl md:text-7xl font-bold text-white flex flex-row items-center gap-6 font-jakarta leading-[60px]"
                    style={{ color: portfolio.couleur }}
                  >
                    <ArrowLight className="w-20 h-20" />
                    {portfolio.titre}
                  </h1>
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
          <section className="grid md:grid-cols-2 gap-32 py-12 bg-white md:px-36">
            {/* Description */}
            <div className="md:col-span-1">
              <p className="text-black text-[30px] font-jakarta leading-relaxed">
                {portfolio.description}
              </p>
            </div>
            <div className="md:col-span-1">
              <div className="flex flex-col gap-4">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {portfolio.kicker}
                </p>
              </div>
            </div>
          </section>
          {/* Deliverables */}
          <div className="flex flex-col items-start justify-between w-full md:px-36 bg-white py-12">
            <h3 className=" flex flex-row items-center gap-2 text-2xl text-black mb-6 font-jakarta-bold">
              <Star className="w-6 h-6" fill="black" />
              Nos Livrables
            </h3>
            <div className="flex flex-row gap-6 w-full">
              {portfolio.livrable.map((item: string, index: number) => (
                <span
                  key={index}
                  className="flex flex-row items-center gap-6 px-3 py-3 rounded-full text-sm border font-jakarta-bold"
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

          <section className="mb-16 relative px-32">
            <BackgroundProject2
              fill={portfolio.couleur}
              className="absolute top-0 left-0 right-0 w-screen"
            />
            <div className="relative z-50">
              <h2 className="flex flex-row justify-center items-center gap-2 text-[40px] font-bold text-black font jakarta mb-12 z-50">
                <Star className="w-5 h-5" fill="black" />
                {portfolio.sousTitre.split(" ").slice(0, 3).join(" ")}{" "}
                <span style={{ color: portfolio.couleur }}>
                  {portfolio.sousTitre.split(" ").slice(3).join(" ")}
                </span>
                <Star className="w-5 h-5" fill="black" />
              </h2>
            </div>

            <div className="space-y-6">
              {portfolio.bento[0] && <Bento bento={portfolio.bento[0]} />}
            </div>
          </section>

          <section className="flex flex-col items-center justify-center py-12 md:px-60">
            <div className="h-[3px] w-28 holographic-bg" />
            {/* Témoignage */}
            {portfolio.temoignage && portfolio.temoignage.contenu ? (
              <div className="p-8 flex flex-col items-center justify-center gap-8 ">
                <blockquote className="text-white text-xl leading-relaxed text-center font-jakarta">
                  {portfolio.temoignage.contenu}
                </blockquote>
                <div className="flex flex-col gap-1">
                  <cite className="text-white font-jakarta-bold">
                    {portfolio.temoignage.auteur}
                    {portfolio.temoignage.poste}
                    {portfolio.temoignage.entreprise &&
                      ` chez ${portfolio.temoignage.entreprise}`}
                  </cite>
                </div>
              </div>
            ) : null}
          </section>
          <section className="mb-16 relative px-32 z-10">
            <div className="space-y-6">
              {portfolio.bento[1] && <Bento bento={portfolio.bento[1]} />}
            </div>
          </section>
        </div>
        <ProjectCarousel portfolios={allPortfolios} />
      </main>
      <BackgroundProject3
        fill={portfolio.couleur}
        className="absolute bottom-[620px] left-0 right-0 w-screen h-auto z-0"
      />
    </Desktoplayout>
  );
}
