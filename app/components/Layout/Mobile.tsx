import { useState } from "react";
import ModalParlonsDesign from "~/components/ModalParlonsDesign";
// import LoaderIntro from "~/components/LoaderIntro";
import useIntroTimer from "~/utils/hooks/useIntroTimer";
import HeaderMobile from "../Header/mobile/HeaderMobile";
import Section1Mobile from "../Sections/Section-1/mobile/Section1Mobile";
import Section2Mobile from "../Sections/Section-2/mobile/Section2Mobile";
// import Section3Mobile from "../Sections/Section-3/mobile/Section3Mobile";
// import Section4Mobile from "../Sections/Section-4/mobile/Section4Mobile";
// import Section5Mobile from "../Sections/Section-5/mobile/Section5Mobile";
// import BackgroundLayerMobile from "../BackgroundLayer/mobile/BackgroundLayerMobile";
import "~/styles/tailwind.css";
import useSmoothScroll from "~/utils/hooks/useSmoothScroll";
import Section3Mobile from "../Sections/Section-3/mobile/Section3Mobile";
import Section4Mobile from "../Sections/Section-4/mobile/Section4Mobile";
// import useSmoothScroll from "~/utils/hooks/useSmoothScroll";

export const VIDEO_DURATION = 4.5;

export default function Mobile() {
  const [isOpen, setIsOpen] = useState(false);
  const { isIntroFinish, shouldPlayIntro } = useIntroTimer();

  useSmoothScroll();

  return (
    <div className="flex items-center justify-center w-screen h-max">
      {/* <ModalParlonsDesign isOpen={isOpen} close={() => setIsOpen(false)} /> */}
      {/* {shouldPlayIntro ? (
        <LoaderIntro />
      ) : ( */}
      <div className="flex flex-col items-center justify-start w-screen bg-gray-600">
        <HeaderMobile setIsOpen={setIsOpen} isIntroFinish={isIntroFinish} />
        {/* Bg Layer */}
        {/* <BackgroundLayerMobile isIntroFinish={isIntroFinish} /> */}
        {/* Rendu des sections */}
        <Section1Mobile />
        <Section2Mobile />
        <Section3Mobile />
        <Section4Mobile />
        {/*  <Section5Mobile setIsOpen={setIsOpen} /> */}
        {/*<Footer /> */}
      </div>
      {/* )} */}
    </div>
  );
}
