import { useViewport } from "~/utils/hooks/useViewport";
import Card from "~/components/Card";
import PortfolioTitle from "~/components/Screens/Portfolio/components/PortfolioTitle";
import PortfolioTitleMobile from "~/components/Screens/Portfolio/components/PortfolioTitleMobile";
import Filter from "~/components/Screens/Portfolio/components/Filter";
import ContentPortfolio from "~/components/Card/components/ContentPortfolio";
import Background from "~/assets/icons/Background";
import BackgroundMobile from "~/assets/icons/BackgroundMobile";
import "~/styles/tailwind.css";
import Desktoplayout from "~/components/Layout/Desktop";
import MobileLayout from "~/components/Layout/Mobile";
import { AnimatePresence, motion } from "framer-motion";
import { usePortfolio } from "~/contexts/PortfolioContext";
import { useEffect } from "react";
import useScrollProgress from "~/utils/hooks/useScrollProgress";

export default function Portfolio() {
  const { allPortfolios, fetchAllPortfolios } = usePortfolio();
  const isMobile = useViewport();

  const { isImageFixed, imageOpacity, imageScale } = useScrollProgress();

  // Fetch portfolios on mount
  useEffect(() => {
    fetchAllPortfolios();
  }, [fetchAllPortfolios]);

  // Diviser les portfolios en deux groupes pour l'affichage
  const portfolioTopCards = allPortfolios.slice(0, 4);
  const portfolioBottomCards = allPortfolios.slice(4, 20);

  const imageMobile = isMobile
    ? "/images/portfolio/ClientsWallMobile.png"
    : "/images/portfolio/ClientsWall.png";

  return isMobile ? (
    <MobileLayout>
      <BackgroundMobile className="absolute top-0 left-0 w-full h-auto z-0 opacity-80" />
      {/* Contenu par-dessus */}
      <section className="relative z-10 flex flex-col justify-center  items-center overflow-hidden gap-10">
        <div className="flex flex-col items-center gap-8 w-full justify-center px-4">
          <div className="h-[3px] w-20 holographic-bg my-6 rounded-full" />
          <PortfolioTitleMobile />
        </div>
        <Filter />
        <div className="flex flex-wrap justify-start gap-[14px] w-full m-auto">
          {portfolioTopCards.map((portfolio, index) => (
            <div key={portfolio.id} className="w-screen flex-shrink-0 px-4">
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
                borderClass="card-hover"
              />
            </div>
          ))}
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
        <section className="relative z-10 md:w-[988px] mx-auto flex flex-col justify-center  items-center gap-10">
          <div className="flex flex-col items-start gap-8 w-[988px] justify-center">
            <div className="h-[3px] md:w-28 w-20 holographic-bg mt-6 mb-2 rounded-full" />
            <PortfolioTitle />
          </div>
          <Filter />
          <div className="flex flex-wrap justify-start gap-[24px] w-[996px] m-auto">
            {portfolioTopCards.map((portfolio, index) => (
              <div
                key={portfolio.id}
                className="w-[482px] flex-shrink-0 border-custom-thin rounded-[28px]"
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
              </div>
            ))}
          </div>
        </section>

        {/* Section avec image sticky et cartes qui passent par-dessus */}
        {/* <div className="relative z-10"> */}
        {/* Image ClientsWall - sticky au scroll */}
        <div
          className={`w-screen h-screen ${
            isImageFixed ? "sticky top-0 z-0" : "relative"
          }`}
        >
          <img
            src={imageMobile}
            alt="Clients Wall"
            className="w-full h-full object-cover transition-all duration-500"
            style={{
              opacity: imageOpacity,
              transform: `scale(${imageScale})`,
            }}
            loading="lazy"
            width={"100%"}
            height={"100%"}
          />
        </div>

        {/* Cartes du bas */}
        <div className="relative z-10 bg-transparent min-h-screen">
          <div className="pt-32 pb-32">
            <section className="md:px-36 px-4 flex flex-col gap-8">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {portfolioBottomCards.map((portfolio, index) => (
                  <Card
                    key={portfolio.id}
                    height="370px"
                    content={
                      <ContentPortfolio
                        imageUrl={portfolio.photoCouverture}
                        titre={portfolio.titre}
                        slug={portfolio.slug}
                      />
                    }
                    borderClass="card-hover"
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
        {/* </div> */}
      </div>
    </Desktoplayout>
  );
}
