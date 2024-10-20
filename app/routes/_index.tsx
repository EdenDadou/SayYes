import type { MetaFunction } from "@remix-run/node";
import LoaderIntro from "../components/LoaderIntro";
import Header from "~/components/Header";
import "../styles/index";
import { useEffect, useState } from "react";
import Section1 from "~/components/Sections/Section-1";
import Section2 from "~/components/Sections/Section-2";
import Section3 from "~/components/Sections/Section-3";
import Section4 from "~/components/Sections/Section-4";
import Section5 from "~/components/Sections/Section-5";
import Lenis from "@studio-freight/lenis";
import ModalParlonsDesign from "~/components/ModalParlonsDesign";
import Footer from "~/components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "Say Yes !" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  // const [loading, setLoading] = useState(false);
  // const [isIntroFinish, setIsIntroFinish] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isIntroFinish, setIsIntroFinish] = useState(false);
  useEffect(() => {
    const timeoutLoading = setTimeout(() => {
      setLoading(false);
    }, 6500);

    const timeoutLine = setTimeout(() => {
      setIsIntroFinish(true);
    }, 6300);
    return () => {
      clearTimeout(timeoutLoading);
      clearTimeout(timeoutLine);
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <div className="flex items-center justify-center w-screen">
      <LoaderIntro />
      <ModalParlonsDesign isOpen={isOpen} close={() => setIsOpen(false)} />
      {!loading ? (
        <div className="flex flex-col items-center justify-start w-screen bg-gray-600 ">
          <Header setIsOpen={setIsOpen} />
          <Section1 isIntroFinish={isIntroFinish} />
          <Section2 />
          <Section3 />
          <Section4 />
          <Section5 setIsOpen={setIsOpen} />
          <Footer />
        </div>
      ) : null}
    </div>
  );
}
