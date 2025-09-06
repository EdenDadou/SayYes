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

export default function Portfolio() {
  //   const isMobile = useViewport();
  const { isImageFixed, imageOpacity } = useScrollProgress();

  return (
    <div className="w-screen h-fit relative">
      <Header />

      {/* Section des cartes du haut - scroll normal */}
      <section className="px-36 flex flex-col gap-8 py-8">
        <PortfolioTitle />
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
      <div className="relative">
        {/* Image ClientsWall - sticky au scroll */}
        <div
          className={`w-screen h-screen ${
            isImageFixed ? "sticky top-0 z-0" : "relative"
          }`}
        >
          <img
            src="/images/portfolio/ClientsWall.png"
            alt="Clients Wall"
            className="w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: imageOpacity }}
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

      <Footer />
    </div>
  );
}
