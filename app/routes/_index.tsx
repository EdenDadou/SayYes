import type { MetaFunction } from "@remix-run/node";
import LoaderIntro from "../components/LoaderIntro";
import Header from "~/components/Header";
import "../styles/index";
import { useEffect, useRef, useState } from "react";
import Section1 from "~/components/Sections/Section-1";
import Section2 from "~/components/Sections/Section-2";
import Section3 from "~/components/Sections/Section-3";

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

  return (
    <div className="flex items-center justify-center w-full">
      {/* <LoaderIntro loading={loading} /> */}
      {!loading ? (
        <div className="flex flex-col items-center justify-start w-full">
          <Header />
          <Section1 isIntroFinish={isIntroFinish} />
          <Section2 />
          <Section3 />
        </div>
      ) : null}
    </div>
  );
}
