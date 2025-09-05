import Header from "~/components/Header";
import Footer from "~/components/Footer";
import SolutionTitle from "~/components/Solutions/components/SolutionTitle";
import "~/styles/tailwind.css";
import Card from "~/components/Card";

export default function Solutions() {
  //   const isMobile = useViewport();

  return (
    <div className="w-screen h-fit relative overflow-hidden">
      {/* Contenu par-dessus */}
      <div className="relative z-10">
        <Header />
        <section className="px-40 flex flex-col gap-8">
          <SolutionTitle />
          <Card imageUrl="/images/solutions/Card2.png" />
          <Card imageUrl="/images/solutions/Card3.png" />
          <Card imageUrl="/images/solutions/Card4.png" />
          <Card imageUrl="/images/solutions/Card5.png" />
        </section>
        <Footer />
      </div>
    </div>
  );
}
