import type { MetaFunction } from "@remix-run/node";
import LoaderIntro from "../components/LoaderIntro";
import Header from "~/components/Header";
import "../styles/index";
import { useEffect, useState } from "react";
import Section1 from "~/components/Sections/Section-1";
import Section2 from "~/components/Sections/Section-2";

export const meta: MetaFunction = () => {
  return [
    { title: "Say Yes !" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [line, setLine] = useState(false);
  useEffect(() => {
    const timeoutLoading = setTimeout(() => {
      setLoading(false);
    }, 4500);

    const timeoutLine = setTimeout(() => {
      setLine(true);
    }, 5000);
    return () => {
      clearTimeout(timeoutLoading);
      clearTimeout(timeoutLine);
    };
  }, []);

  // const [loading, setLoading] = useState(false);
  // const [line, setLine] = useState(true);

  return (
    <div className="flex items-center justify-center w-full overflow-hidden">
      <LoaderIntro loading={loading} />
      <div className="flex flex-col items-center justify-start w-full h-full z-40">
        <Header />
        <Section1 line={line} />
        <Section2 />
      </div>
    </div>
  );
}
