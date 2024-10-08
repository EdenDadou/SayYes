import type { MetaFunction } from "@remix-run/node";
import LoaderIntro from "../components/LoaderIntro";
import Header from "~/components/Header";
import "../styles/index";
import { useEffect, useRef, useState } from "react";
import Section1 from "~/components/Sections/Section-1";
import Section2 from "~/components/Sections/Section-2";
import Section3 from "~/components/Sections/Section-3";
import SvgSection3Bg from "~/assets/icons/Section3/Section3Bg";
import Section4 from "~/components/Sections/Section-4";
import Section5 from "~/components/Sections/Section-5";
import Lenis from "@studio-freight/lenis";

export const meta: MetaFunction = () => {
  return [
    { title: "Say Yes !" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [isIntroFinish, setIsIntroFinish] = useState(true);
  // const [loading, setLoading] = useState(true);
  // const [isIntroFinish, setIsIntroFinish] = useState(false);
  // useEffect(() => {
  //   const timeoutLoading = setTimeout(() => {
  //     setLoading(false);
  //   }, 4500);

  //   const timeoutLine = setTimeout(() => {
  //     setIsIntroFinish(true);
  //   }, 5000);
  //   return () => {
  //     clearTimeout(timeoutLoading);
  //     clearTimeout(timeoutLine);
  //   };
  // }, []);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <div className="flex items-center justify-center w-full">
      {/* <LoaderIntro loading={loading} /> */}
      {!loading ? (
        <div className="flex flex-col items-center justify-start w-full bg-gray-600">
          <Header />
          <Section1 isIntroFinish={isIntroFinish} />
          <Section2 />
          <Section3 />
          {/* <Section4 />
          <Section5 /> */}
        </div>
      ) : null}
    </div>
  );
}
