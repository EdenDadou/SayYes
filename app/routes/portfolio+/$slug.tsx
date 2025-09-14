import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  getPortfolioBySlug,
  PortfolioWithMedia,
} from "~/server/portfolio.server";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Background from "~/assets/icons/Background";
import BackgroundMobile from "~/assets/icons/BackgroundMobile";
import { useViewport } from "~/utils/hooks/useViewport";
import "~/styles/tailwind.css";
import ArrowLight from "~/assets/icons/ArrowLight";
import Star from "~/assets/icons/Star";
import Coche from "~/assets/icons/Coche";

// Loader pour récupérer le portfolio par slug
export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  if (!slug) {
    throw new Response("Slug manquant", { status: 400 });
  }

  const portfolio = await getPortfolioBySlug(slug);

  if (!portfolio) {
    throw new Response("Portfolio non trouvé", { status: 404 });
  }

  return json({ portfolio });
}

export default function PortfolioSlug() {
  const { portfolio } = useLoaderData<typeof loader>();
  const isMobile = useViewport();

  return (
    <div className="w-screen h-fit relative">
      {/* Background */}
      {/* {isMobile ? (
        <BackgroundMobile className="absolute top-0 left-0 w-full h-auto z-0 opacity-80" />
      ) : (
        <Background className="absolute top-0 left-0 w-full h-auto z-0 opacity-80" />
      )} */}

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 px-4 md:px-36 py-12 flex flex-col gap-10">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="flex flex-col gap-10">
            {/* Title and Kicker */}
            <div className="flex flex-col gap-8">
              <div className="h-[3px] w-28 holographic-bg" />
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 flex flex-row items-center gap-6">
                  <ArrowLight className="w-16 h-16" />
                  {portfolio.titre}
                </h1>
                <div className="text-right"></div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden">
              <img
                src={portfolio.photoCouverture}
                alt={portfolio.titre}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Description */}
          <div className="md:col-span-1">
            <p className="text-gray-300 text-lg leading-relaxed">
              {portfolio.description}
            </p>
          </div>
          <div className="md:col-span-1">
            <div className="flex flex-col gap-4">
              <p className="text-gray-300 text-lg leading-relaxed">
                <span className="font-bold">Le Brief :</span> {portfolio.kicker}
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                <span className="font-bold">L'équipe créative' :</span>{" "}
                {portfolio.kicker}
              </p>
            </div>
          </div>
        </section>
        {/* Deliverables */}
        <div className="flex flex-col items-start justify-between gap-4 w-full ">
          <h3 className=" flex flex-row items-center gap-2 text-xl font-bold text-white mb-6">
            <Star className="w-10 h-10" />
            Nos Livrables
          </h3>
          <div className="flex flex-row gap-2 w-full">
            {portfolio.livrable.map((item, index) => (
              <span
                key={index}
                className="flex flex-row items-center gap-6 px-5 py-3 text-blue-300 rounded-full text-sm border border-blue-500/30"
              >
                <Coche className="w-4 h-4" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Bento Grid - Project Gallery */}
        {portfolio.bento && portfolio.bento.length > 0 && (
          <section className="mb-16">
            <h2
              className="flex flex-row justify-center items-center gap-2 text-[40px] font-bold text-white 
        font jakarta mb-6"
            >
              <Star className="w-5 h-5" />
              {portfolio.sousTitre}
              <Star className="w-5 h-5" />
            </h2>

            <div className="space-y-6">
              {portfolio.bento.map((bentoItem, bentoIndex) => (
                <div key={bentoIndex} className="space-y-4">
                  {bentoItem.lines.map((line, lineIndex) => (
                    <div
                      key={lineIndex}
                      className={`grid gap-4 ${
                        line.format === "1/3 - 2/3"
                          ? "grid-cols-3"
                          : line.format === "3 carrés"
                            ? "grid-cols-3"
                            : line.format === "2 carré"
                              ? "grid-cols-2"
                              : line.format === "banner"
                                ? "grid-cols-1"
                                : "grid-cols-1"
                      }`}
                    >
                      {line.listImage.map((image, imageIndex) => (
                        <div
                          key={imageIndex}
                          className={`relative rounded-lg overflow-hidden ${
                            line.format === "1/3 - 2/3" && imageIndex === 1
                              ? "col-span-2"
                              : line.format === "banner"
                                ? "aspect-[21/9]"
                                : "aspect-square"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${portfolio.titre} - Image ${imageIndex + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Media Gallery */}
        {portfolio.medias && portfolio.medias.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">
              Médias additionnels
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.medias.map((media) => (
                <div
                  key={media.id}
                  className="relative aspect-square rounded-lg overflow-hidden group"
                >
                  {media.type === "IMAGE" ? (
                    <img
                      src={media.url}
                      alt={media.originalName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-400">{media.type}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <section className="flex justify-between items-center pt-12 border-t border-gray-800">
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Retour au portfolio
          </button>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Projet suivant
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
