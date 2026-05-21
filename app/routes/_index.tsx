import type { MetaFunction } from "@remix-run/node";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useState, useEffect, lazy, Suspense } from "react";
import { useViewport, isMobileUserAgent } from "~/utils/hooks/useViewport";
import { getOptimizedImageUrl } from "~/utils/optimizeImage";
import MobileLayout from "~/components/Layout/Mobile";
import Desktoplayout from "~/components/Layout/Desktop";
import IntroSection from "~/components/Screens/Homepage/IntroSection";
import "~/styles/tailwind.css";
import TitleCards from "~/components/Screens/Homepage/TitleCards/TitleCards";
import RowTitlePicture from "~/components/Screens/Homepage/RowTitlePicture";
import CarouselCard from "~/components/Screens/Homepage/CarrouselCard";
import LoadingBar from "~/components/LoadingBar";
import TitleFullWidthCard from "~/components/Screens/Homepage/TitleFullWidthCard";
import BigTemoignage from "~/components/Screens/Homepage/BigTemoignage";
import FadeInView from "~/components/FadeInView";
import { usePrefetchOnIdle } from "~/utils/hooks/usePrefetchOnIdle";

// Sections below-the-fold : code-split pour alléger le bundle initial
const TemoignagesCards = lazy(
  () => import("~/components/Screens/Homepage/TemoignagesCards")
);
const HomeProjectCarousel = lazy(
  () => import("~/components/Screens/Homepage/HomeProjectCarroussel")
);
const TitleStepImage = lazy(
  () => import("~/components/Screens/Homepage/TitleStepImage")
);

export const VIDEO_DURATION = 4.5;

export async function loader({ request }: LoaderFunctionArgs) {
  const userAgent = request.headers.get("User-Agent") || "";
  const isMobile = isMobileUserAgent(userAgent);

  const headers = new Headers();
  if (isMobile) {
    const titleUrl = getOptimizedImageUrl(
      "/images/homepage/mobile/title.png",
      "mobile"
    );
    const haloUrl = getOptimizedImageUrl(
      "/images/homepage/bg-halo-mobile.png",
      "tablet"
    );
    headers.append("Link", `<${titleUrl}>; rel=preload; as=image`);
    headers.append("Link", `<${haloUrl}>; rel=preload; as=image`);
  }

  return json({}, { headers });
}

export const meta: MetaFunction = () => {
  return [
    { title: "Say Yes !" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const isMobile = useViewport();
  usePrefetchOnIdle();
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
            <IntroSection />
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
            <Suspense fallback={null}>
              <FadeInView>
                <TemoignagesCards />
              </FadeInView>
              <FadeInView>
                <HomeProjectCarousel />
              </FadeInView>
              <FadeInView>
                <TitleStepImage />
              </FadeInView>
            </Suspense>
          </div>
        </MobileLayout>
      ) : (
        <Desktoplayout footerType="home">
          <div className="w-screen h-fit relative pt-16 flex flex-col gap-20">
            {/* //Section 1 */}
            <IntroSection />
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
            <Suspense fallback={null}>
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
            </Suspense>
          </div>
        </Desktoplayout>
      )}
    </>
  );
}
