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
import { useEffect } from "react";

export default function Portfolio() {
  const { filteredPortfolios, fetchAllPortfolios } = usePortfolio();
  const isMobile = useViewport();

  // Fetch portfolios on mount
  useEffect(() => {
    fetchAllPortfolios();
  }, [fetchAllPortfolios]);

  // Diviser les portfolios en deux groupes pour l'affichage
  const portfolioTopCards = filteredPortfolios.slice(0, 6);
  const portfolioBottomCards = filteredPortfolios.slice(6);

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
              className="w-full px-4"
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
