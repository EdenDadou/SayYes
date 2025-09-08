import Header from "~/components/Header";
import Footer from "~/components/Footer";
import "~/styles/tailwind.css";
import Card from "~/components/Card";
import PortfolioTitle from "~/components/Portfolio/components/PortfolioTitle";
import {
  portfolioTopCards,
  portfolioBottomCards,
} from "~/components/Portfolio/data";
import { useScrollProgress } from "~/utils/hooks/useScrollProgress";
import Background from "~/components/Solutions/components/Background";
import Filter from "~/components/Portfolio/components/Filter";

export default function Portfolio() {
  //   const isMobile = useViewport();
  const { isImageFixed, imageOpacity, imageScale } = useScrollProgress();

  return (
    <div className="w-screen h-fit relative">
      {/* Background SVG - seulement sur la partie haute */}
      <Background className="absolute top-0 left-0 w-full h-auto z-0 opacity-80" />
      <Header />

      {/* Section des cartes du haut - scroll normal */}
      <section className="relative z-10 px-36 flex flex-col gap-8 py-8">
        <PortfolioTitle />
        <Filter />
        <div className="grid grid-cols-2 gap-4">
          {portfolioTopCards.map((card) => (
            <Card
              key={card.imageUrl}
              imageUrl={card.imageUrl}
              height={card.height}
              content={card.content}
              borderClass={card.borderClass}
              imagesClass={card.imagesClass}
            />
          ))}
        </div>
      </section>

      {/* Section avec image sticky et cartes qui passent par-dessus */}
      <div className="relative z-10">
        {/* Image ClientsWall - sticky au scroll */}
        <div
          className={`w-screen h-screen ${
            isImageFixed ? "sticky top-0 z-0" : "relative"
          }`}
        >
          <img
            src="/images/portfolio/ClientsWall.png"
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

        {/* Cartes du bas qui passent par-dessus pendant le fade */}
        <div className="relative z-10 bg-transparent min-h-screen">
          <div className="pt-32 pb-32">
            <section className="px-36 flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-4">
                {portfolioBottomCards.map((card) => (
                  <Card
                    key={card.imageUrl}
                    imageUrl={card.imageUrl}
                    height={card.height}
                    content={card.content}
                    borderClass={card.borderClass}
                    imagesClass={card.imagesClass}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
