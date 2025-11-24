import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import { useViewport } from "~/utils/hooks/useViewport";
import MobileLayout from "~/components/Layout/Mobile";
import Desktoplayout from "~/components/Layout/Desktop";
import IntroSection from "~/components/Screens/Homepage/IntroSection";
import "~/styles/tailwind.css";
import TitleCards from "~/components/Screens/Homepage/TitleCards";
import {
  CardBottomIdentiteVisuelle,
  CardsIdentiteVisuelle,
  contentIdentiteVisuelle,
} from "~/components/Screens/Homepage/TitleCards.helpers";
import RowTitlePicture from "~/components/Screens/Homepage/RowTitlePicture";
import CarouselCard from "~/components/Screens/Homepage/CarrouselCard";
import LoadingBar from "~/components/LoadingBar";
import TitleFullWidthCard from "~/components/Screens/Homepage/TitleFullWidthCard";
import BigTemoignage from "~/components/Screens/Homepage/BigTemoignage";
import TemoignagesCards from "~/components/Screens/Homepage/TemoignagesCards";
import ProjectCarousel from "~/components/Screens/Portfolio/components/ProjectCarousel";

export const VIDEO_DURATION = 4.5;

export const meta: MetaFunction = () => {
  return [
    { title: "Say Yes !" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const isMobile = useViewport();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Attendre que tous les assets soient chargés
    const handleLoad = () => {
      // La barre de chargement gère sa propre progression
      // On attend juste que la page soit prête
      if (document.readyState === "complete") {
        // Petit délai pour une transition plus fluide
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <>
      {isLoading && <LoadingBar />}
      {isMobile ? (
        <MobileLayout>
          <div>TODO</div>
        </MobileLayout>
      ) : (
        <Desktoplayout>
          <div className="w-screen h-fit relative pt-20 flex flex-col gap-20">
            {/* //Section 1 */}
            <IntroSection />
            {/* //Section 2 */}
            <TitleCards
              title="Reprenez la main sur votre identité visuelle !"
              rowCards={contentIdentiteVisuelle.map((card) =>
                CardsIdentiteVisuelle(card)
              )}
              bottomCard={CardBottomIdentiteVisuelle}
            />
            {/* //Section 3 */}
            <RowTitlePicture />
            {/* //Section 4 */}
            <BigTemoignage />
            {/* //Section 5 */}
            <CarouselCard />
            {/* //Section 6 */}
            <TitleFullWidthCard />
            {/* //Section 7 */}
            <TemoignagesCards />
            {/* //Section 8 */}
            <ProjectCarousel />
          </div>
        </Desktoplayout>
      )}
    </>
  );
}
