import Header from "~/components/Header";
import Footer from "~/components/Footer";
import SolutionTitle from "~/components/Solutions/components/SolutionTitle";
import "~/styles/tailwind.css";
import Card from "~/components/Card";
import { solutionsCards } from "~/components/Solutions/data";
import { useViewport } from "~/utils/hooks/useViewport";
import SolutionTitleMobile from "~/components/Solutions/components/SolutionTitleMobile";
import Background from "~/assets/icons/Background";
import Star from "~/assets/icons/Star";
import BackgroundMobile from "~/assets/icons/BackgroundMobile";

export default function Solutions() {
  const isMobile = useViewport();

  return (
    <div className="w-full h-fit relative">
      {isMobile ? (
        <BackgroundMobile className="absolute top-0 left-0 w-full h-auto z-0 opacity-80" />
      ) : (
        <Background className="absolute top-0 left-0 w-full h-auto z-0 opacity-80" />
      )}
      {/* Contenu par-dessus */}
      <Header />
      <section className="relative z-10 px-6 md:px-36 flex flex-col gap-6 justify-center items-center md:items-start">
        <div className="h-[3px] md:w-28 w-20 holographic-bg my-6" />
        {isMobile ? <SolutionTitleMobile /> : <SolutionTitle />}
        <h2 className="flex flex-row items-center justify-start gap-2 md:text-xl text-sm font-jakarta pb-6">
          <Star className="w-4 h-4" />5 étapes pour un branding impeccable
          {isMobile ? <Star className="w-4 h-4" /> : " :"}
        </h2>
        {solutionsCards.map((card, index) => (
          <Card
            key={index}
            height={card.height}
            content={card.content}
            borderClass={card.borderClass}
          />
        ))}
      </section>
      <Footer />
    </div>
  );
}
