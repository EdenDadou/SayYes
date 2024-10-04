import type { MetaFunction } from "@remix-run/node";
import LoaderIntro from "../components/LoaderIntro";
import Header from "~/components/Header";
import "../styles/index";
import { useEffect, useRef, useState } from "react";
import Section1 from "~/components/Sections/Section-1";
import Section2 from "~/components/Sections/Section-2";

export const meta: MetaFunction = () => {
  return [
    { title: "Say Yes !" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  // const [loading, setLoading] = useState(false);
  // const [isIntroFinish, setIsIntroFinish] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isIntroFinish, setIsIntroFinish] = useState(false);
  useEffect(() => {
    const timeoutLoading = setTimeout(() => {
      setLoading(false);
    }, 4500);

    const timeoutLine = setTimeout(() => {
      setIsIntroFinish(true);
    }, 5000);
    return () => {
      clearTimeout(timeoutLoading);
      clearTimeout(timeoutLine);
    };
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    if (containerRef.current) {
      const currentScrollY = window.scrollY;
      console.log("coucou", currentScrollY);
      if (currentScrollY > lastScrollY) {
        // Scroll vers le bas - cacher le header
        setShowHeader(false);
      } else {
        // Scroll vers le haut - afficher le header
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY]);

  return (
    <div className="flex items-center justify-center w-full">
      <LoaderIntro loading={loading} />
      {!loading ? (
        <div
          className="flex flex-col items-center justify-start w-full"
          ref={containerRef}
        >
          <Header showHeader={showHeader} />
          <Section1 isIntroFinish={isIntroFinish} />
          <Section2 />
        </div>
      ) : null}
    </div>
  );
}
