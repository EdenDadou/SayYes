import type { MetaFunction } from "@remix-run/node";
import { useViewport } from "~/utils/hooks/useViewport";
import MobileLayout from "~/components/Layout/Mobile";
import Desktoplayout from "~/components/Layout/Desktop";
import { AnimatePresence, motion } from "framer-motion";
import BackgroundHomepage from "~/assets/icons/BackgroundHomepage";
import "~/styles/tailwind.css";

export const VIDEO_DURATION = 4.5;

export const meta: MetaFunction = () => {
  return [
    { title: "Say Yes !" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const isMobile = useViewport();

  return isMobile ? (
    <MobileLayout>
      <div>TODO</div>
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
            <BackgroundHomepage className="absolute -top-40 left-0 w-full h-auto z-0 opacity-80" />
          </motion.div>
        </AnimatePresence>
        {/* Contenu par-dessus */}
        <section className="relative z-10 md:w-[988px] mx-auto flex flex-col justify-center  items-center overflow-hidden gap-10">
          <div className="flex flex-col items-start gap-8 w-[988px] justify-center">
            <div className="h-[3px] md:w-28 w-20 holographic-bg my-6 rounded-full" />
            {/* <PortfolioTitle /> */}
          </div>
        </section>

        {/* Section avec image sticky et cartes qui passent par-dessus */}
        {/* <div className="relative z-10"> */}
        {/* Image ClientsWall - sticky au scroll */}
        {/* <div
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
        </div> */}

        {/* Cartes du bas */}
        {/* <div className="relative z-10 bg-transparent min-h-screen">
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
          </div> */}
        {/* </div> */}
      </div>
    </Desktoplayout>
  );
}
