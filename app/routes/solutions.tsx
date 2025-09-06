import Header from "~/components/Header";
import Footer from "~/components/Footer";
import SolutionTitle from "~/components/Solutions/components/SolutionTitle";
import "~/styles/tailwind.css";
import Card from "~/components/Card";
import { solutionsCards } from "~/components/Solutions/data";

export default function Solutions() {
  //   const isMobile = useViewport();

  return (
    <div className="w-screen h-fit relative overflow-hidden">
      {/* Contenu par-dessus */}
      <div className="relative z-10">
        <Header />
        <section className="px-36 flex flex-col gap-8">
          <SolutionTitle />
          {solutionsCards.map((card) => (
            <Card
              key={card.imageUrl}
              imageUrl={card.imageUrl}
              height={card.height}
              content={card.content}
              borderClass={card.borderClass}
            />
          ))}
        </section>
        <Footer />
      </div>
    </div>
  );
}
