import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/OldHeader";
import { useState } from "react";
import Section1 from "~/components/Sections/Section-1";
import Section2 from "~/components/Sections/Section-2";
import Section3 from "~/components/Sections/Section-3";
import Section4 from "~/components/Sections/Section-4";
import Section5 from "~/components/Sections/Section-5";
import ModalParlonsDesign from "~/components/ModalParlonsDesign";
import Footer from "~/components/OldFooter";
import "~/styles/tailwind.css";
import LoaderIntro from "~/components/LoaderIntro";
import useIntroTimer from "~/utils/hooks/useIntroTimer";
import useSmoothScroll from "~/utils/hooks/useSmoothScroll";

export const VIDEO_DURATION = 4.5;

export const meta: MetaFunction = () => {
  return [
    { title: "Say Yes !" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Desktop() {
  const [isOpen, setIsOpen] = useState(false);
  const { isIntroFinish, shouldPlayIntro } = useIntroTimer();

  useSmoothScroll();

  return (
    <div className="flex items-center justify-center w-screen">
      <ModalParlonsDesign isOpen={isOpen} close={() => setIsOpen(false)} />
      {shouldPlayIntro ? (
        <LoaderIntro />
      ) : (
        <div
          className={`flex flex-col items-center justify-start w-screen bg-gray-600 ${
            isOpen ? "fixed top-0" : ""
          }`}
        >
          <Header setIsOpen={setIsOpen} isIntroFinish={isIntroFinish} />
          <Section1 isIntroFinish={isIntroFinish} />
          <Section2 />
          <Section3 />
          <Section4 />
          <Section5 setIsOpen={setIsOpen} />
          <Footer />
        </div>
      )}
    </div>
  );
}
