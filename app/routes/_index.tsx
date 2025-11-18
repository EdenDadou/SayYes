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
        <section className="relative z-10 md:w-[988px] mx-auto flex flex-col justify-center items-center overflow-hidden gap-16">
          <img src="" />
          <p className="text-center font-jakarta text-[36px] leading-[44px] whitespace-pre-line">
            {`L'expérience se résume ainsi :\n On a envie de recommencer ! Ils sont très 
            professionnels, disponibles, fiables et fournissent
            un travail de grande qualité. Je ne compte plus les
            personnes qui m'ont félicité de mon choix de les
            avoir engagés ou qui me demandent leur
            coordonnées."`}
          </p>
        </section>
      </div>
    </Desktoplayout>
  );
}
