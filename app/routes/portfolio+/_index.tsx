import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPublicPortfolios } from "~/server/portfolio.server";
import type { PortfolioData } from "~/utils/admin/manage-portfolio-types";
import { useViewport } from "~/utils/hooks/useViewport";
import Card from "~/components/Card";
import PortfolioTitle from "~/components/Screens/Portfolio/components/PortfolioTitle";
import PortfolioTitleMobile from "~/components/Screens/Portfolio/components/PortfolioTitleMobile";
import Filter from "~/components/Screens/Portfolio/components/Filter";
import ContentPortfolio from "~/components/Card/components/ContentPortfolio";
import BackgroundMobile from "~/assets/icons/BackgroundMobile";
import "~/styles/tailwind.css";
import Desktoplayout from "~/components/Layout/Desktop";
import MobileLayout from "~/components/Layout/Mobile";
import { AnimatePresence, motion } from "framer-motion";
import { usePortfolio } from "~/contexts/PortfolioContext";
import { useEffect, useMemo } from "react";

export const links = () => [
  { rel: "preload", href: "/images/portfolio/bg.png", as: "image" },
];

export async function loader() {
  const portfolios = await getPublicPortfolios();
  return json({ portfolios });
}

export default function Portfolio() {
  const { portfolios: serverPortfolios } = useLoaderData<typeof loader>();
  const { filteredPortfolios, initPortfolios, activeFilters } = usePortfolio();
  const isMobile = useViewport();

  // Remix's Jsonify<> infers null[] for categories; cast to the canonical client type
  const typedServerPortfolios = serverPortfolios as unknown as PortfolioData[];

  // Seed context once so filters work across route transitions without a client fetch
  useEffect(() => {
    initPortfolios(typedServerPortfolios);
  }, [typedServerPortfolios, initPortfolios]);

  // Use SSR data on first render; switch to context once filters are active
  // (activeFilters.length > 0 handles the case where a filter yields 0 results)
  const displayPortfolios =
    filteredPortfolios.length > 0 || activeFilters.length > 0
      ? filteredPortfolios
      : typedServerPortfolios;

  const [portfolioTopCards, portfolioBottomCards] = useMemo(
    () => [displayPortfolios.slice(0, 6), displayPortfolios.slice(6)],
    [displayPortfolios]
  );

  return isMobile ? (
    <MobileLayout>
      <BackgroundMobile className="absolute top-0 left-0 w-full h-auto z-0 opacity-80 blur-2xl" />
      {/* Contenu par-dessus */}
      <section className="relative z-10 flex flex-col justify-center  items-center overflow-hidden gap-10">
        <div className="flex flex-col items-center gap-8 w-full justify-center px-4">
          <div className="h-[3px] w-20 holographic-bg my-6 rounded-full" />
          <PortfolioTitleMobile />
        </div>
        <Filter />
        <div className="flex flex-col gap-[14px] w-full">
          {/* 6 premières cartes */}
          <AnimatePresence mode="popLayout">
            {portfolioTopCards.map((portfolio, index) => (
              <motion.div
                key={portfolio.id}
                className="w-screen flex-shrink-0 px-4"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                layout
              >
                <Card
                  height="260px"
                  content={
                    <ContentPortfolio
                      imageUrl={portfolio.photoCouverture}
                      titre={portfolio.titre}
                      topTitle={portfolio.topTitle}
                      slug={portfolio.slug}
                    />
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Image ClientsWall — fade-in au scroll */}
          {portfolioBottomCards.length > 0 && (
            <motion.div
              className="w-full -mx-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <img
                src="/images/portfolio/ClientWallmobile.png"
                alt="Clients Wall"
                className="w-full h-auto"
                loading="lazy"
              />
            </motion.div>
          )}

          {/* Cartes restantes */}
          <AnimatePresence mode="popLayout">
            {portfolioBottomCards.map((portfolio, index) => (
              <motion.div
                key={portfolio.id}
                className="w-screen flex-shrink-0 px-4"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                layout
              >
                <Card
                  height="260px"
                  content={
                    <ContentPortfolio
                      imageUrl={portfolio.photoCouverture}
                      titre={portfolio.titre}
                      topTitle={portfolio.topTitle}
                      slug={portfolio.slug}
                    />
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </MobileLayout>
  ) : (
    <Desktoplayout>
      <div className="w-screen h-fit relative pt-20">
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
              className="absolute -top-48 left-0 w-full h-auto z-0 opacity-80"
            />
          </motion.div>
        </AnimatePresence>
        {/* Contenu par-dessus */}
        <section className="relative z-10 md:w-[988px] mx-auto flex flex-col justify-center items-center gap-10">
          <div className="flex flex-col items-start gap-6 w-[988px] justify-center">
            <div className="h-[3px] md:w-24 w-20 holographic-bg mt-6 rounded-full" />
            <PortfolioTitle />
          </div>
          <div className="flex flex-wrap justify-start gap-[24px] w-[990px] m-auto">
            <Filter />

            {/* 6 premières cartes */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 w-full">
              <AnimatePresence mode="popLayout">
                {portfolioTopCards.map((portfolio, index) => (
                  <motion.div
                    key={portfolio.id}
                    className="w-[482px] flex-shrink-0 border-custom-thin rounded-[28px]"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: "easeOut",
                    }}
                    layout
                  >
                    <Card
                      height="364px"
                      content={
                        <ContentPortfolio
                          imageUrl={portfolio.photoCouverture}
                          titre={portfolio.titre}
                          topTitle={portfolio.topTitle}
                          slug={portfolio.slug}
                        />
                      }
                      borderClass="card-hover colspan-1 rounded-[28px]"
                      borderRadius="28px"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Image ClientsWall — fade-in au scroll */}
            {portfolioBottomCards.length > 0 && (
              <motion.div
                className="w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                viewport={{ once: true, amount: 0.3 }}
                style={{ transform: "scale(1.18)", transformOrigin: "center" }} /* slight zoom so image bleeds past grid margins */
              >
                <img
                  src="/images/portfolio/ClientsWall.png"
                  alt="Clients Wall"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </motion.div>
            )}

            {/* Cartes restantes */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 w-full">
              <AnimatePresence mode="popLayout">
                {portfolioBottomCards.map((portfolio, index) => (
                  <motion.div
                    key={portfolio.id}
                    className="w-[482px] flex-shrink-0 border-custom-thin rounded-[28px]"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: "easeOut",
                    }}
                    layout
                  >
                    <Card
                      height="364px"
                      content={
                        <ContentPortfolio
                          imageUrl={portfolio.photoCouverture}
                          titre={portfolio.titre}
                          topTitle={portfolio.topTitle}
                          slug={portfolio.slug}
                        />
                      }
                      borderClass="card-hover colspan-1 rounded-[28px]"
                      borderRadius="28px"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
        {/* </div> */}
      </div>
    </Desktoplayout>
  );
}
