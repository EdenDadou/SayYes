import type { MetaFunction } from "@remix-run/node";
import { useViewport } from "~/utils/hooks/useViewport";
import MobileLayout from "~/components/Layout/Mobile";
import Desktoplayout from "~/components/Layout/Desktop";
import { AnimatePresence, motion } from "framer-motion";
import BackgroundHomepage from "~/assets/icons/BackgroundHomepage";
import Card from "~/components/Card";
import { useRef, useState } from "react";
import IntroSection from "~/components/Screens/Homepage/IntroSection";
import "~/styles/tailwind.css";
import TitleCards, {
  CardBottomIdentiteVisuelle,
  CardsIdentiteVisuelle,
  contentIdentiteVisuelle,
} from "~/components/Screens/Homepage/TitleCards";
import Arrow from "~/assets/icons/Arrow";
import ArrowLight from "~/assets/icons/ArrowLight";
import BackgroundTitleCards from "~/assets/icons/BackgroundTitleCards";
import BacgroundSideLueur from "~/assets/icons/BacgroundSideLueur";
import BackgroundSideLueur from "~/assets/icons/BacgroundSideLueur";
import RowTitlePicture from "~/components/Screens/Homepage/RowTitlePicture";
import SvgBackgroundTemoignage from "~/assets/icons/BackgroundTemoignage";
import BackgroundTemoignage from "~/assets/icons/BackgroundTemoignage";
import Temoignage from "~/components/Screens/Homepage/Temoignage";
import CarouselCard from "~/components/Screens/Homepage/CarrouselCard";

export const VIDEO_DURATION = 4.5;

export const meta: MetaFunction = () => {
  return [
    { title: "Say Yes !" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const isMobile = useViewport();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return isMobile ? (
    <MobileLayout>
      <div>TODO</div>
    </MobileLayout>
  ) : (
    <Desktoplayout>
      <div className="w-screen h-fit relative pt-20">
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
        <Temoignage />
        {/* //Section 5 */}
        <CarouselCard />
      </div>
    </Desktoplayout>
  );
}
