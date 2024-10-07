import SvgSection2Bg from "~/assets/icons/Section2/Section2Bg";
import ScrollingBanner from "../Section-1/components/ScrollingBanner";
import CardYellow from "./components/CardYellow";
import "~/styles/index";
import CardBlue from "./components/CardBlue";
import CardPink from "./components/CardPink";
import Intro2 from "./components/Intro2";

export default function Section2() {
  return (
    <div className="relative w-full h-fit overflow-hidden mb-5 z-40">
      <ScrollingBanner />
      <div className="relative w-full h-fit z-10 flex justify-center">
        {/* Bg Layer */}
        <div className="absolute h-screen w-full top-10 right-0 left-0 z-0 ">
          <SvgSection2Bg className="w-full" />
        </div>
        {/* Front Layer */}
        <div className="max-w-[1200px] py-40 flex flex-col justify-center">
          <Intro2 />
          <div className="flex flex-col gap-20">
            <CardYellow />
            <CardPink />
            <CardBlue />
          </div>
        </div>
      </div>
    </div>
  );
}
