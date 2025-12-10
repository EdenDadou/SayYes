import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import { useViewport } from "~/utils/hooks/useViewport";
import MobileLayout from "~/components/Layout/Mobile";
import Desktoplayout from "~/components/Layout/Desktop";
import IntroSection from "~/components/Screens/Homepage/IntroSection";
import "~/styles/tailwind.css";
import TitleCards from "~/components/Screens/Homepage/TitleCards/TitleCards";
import {
  CardBottomIdentiteVisuelle,
  CardsIdentiteVisuelle,
  contentIdentiteVisuelle,
} from "~/components/Screens/Homepage/TitleCards/TitleCards.helpers";
import RowTitlePicture from "~/components/Screens/Homepage/RowTitlePicture";
import CarouselCard from "~/components/Screens/Homepage/CarrouselCard";
import LoadingBar from "~/components/LoadingBar";
import TitleFullWidthCard from "~/components/Screens/Homepage/TitleFullWidthCard";
import BigTemoignage from "~/components/Screens/Homepage/BigTemoignage";
import TemoignagesCards from "~/components/Screens/Homepage/TemoignagesCards";
import HomeProjectCarousel from "~/components/Screens/Homepage/HomeProjectCarroussel";
import TitleStepImage from "~/components/Screens/Homepage/TitleStepImage";
import FadeInView from "~/components/FadeInView";

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

  // Attendre que le viewport soit détecté pour éviter le flash
  if (isMobile === null) {
    return <LoadingBar />;
  }

  return (
    <>
      {isLoading && <LoadingBar />}
      {isMobile ? (
        <MobileLayout>
          <div className="w-full h-fit relative flex flex-col gap-16">
            <FadeInView>
              <IntroSection />
            </FadeInView>
            <FadeInView>
              <TitleCards />
            </FadeInView>
            <FadeInView>
              <RowTitlePicture />
            </FadeInView>
            <FadeInView>
              <BigTemoignage />
            </FadeInView>
            <FadeInView>
              <CarouselCard />
            </FadeInView>
            <FadeInView>
              <TitleFullWidthCard />
            </FadeInView>
            <FadeInView>
              <TemoignagesCards />
            </FadeInView>
            <FadeInView>
              <HomeProjectCarousel />
            </FadeInView>
            <FadeInView>
              <TitleStepImage />
            </FadeInView>
          </div>
        </MobileLayout>
      ) : (
        <Desktoplayout footerType="home">
          <div className="w-screen h-fit relative pt-20 flex flex-col gap-20">
            {/* //Section 1 */}
            <FadeInView>
              <IntroSection />
            </FadeInView>
            {/* //Section 2 */}
            <FadeInView>
              <TitleCards />
            </FadeInView>
            {/* //Section 3 */}
            <FadeInView>
              <RowTitlePicture />
            </FadeInView>
            {/* //Section 4 */}
            <FadeInView>
              <BigTemoignage />
            </FadeInView>
            {/* //Section 5 */}
            <FadeInView>
              <CarouselCard />
            </FadeInView>
            {/* //Section 6 */}
            <FadeInView>
              <TitleFullWidthCard />
            </FadeInView>
            {/* //Section 7 */}
            <FadeInView>
              <TemoignagesCards />
            </FadeInView>
            {/* //Section 8 */}
            <FadeInView>
              <HomeProjectCarousel />
            </FadeInView>
            {/* //Section 9 */}
            <FadeInView>
              <TitleStepImage />
            </FadeInView>
          </div>
        </Desktoplayout>
      )}
    </>
  );
}
