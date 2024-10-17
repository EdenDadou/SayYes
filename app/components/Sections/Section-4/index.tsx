import SvgSection4BgBase from "~/assets/icons/IconsSection4/Section4BgBase";
import SvgSection4BgLt from "~/assets/icons/IconsSection4/Section4BgLt";
import SvgSection4BgRt from "~/assets/icons/IconsSection4/Section4BgRt";
import Section4Intro from "./components/Section4Intro";
import Section4Outro from "./components/Section4Outro";
import "~/styles/index";
import SvgSection4BgBottom from "~/assets/icons/IconsSection4/Section4BgBottom";

export default function Section4() {
  return (
    <div className="w-screen flex justify-center items-center py-36 relative">
      {/* SVG de fond */}
      <SvgSection4BgLt className="w-[38%] absolute z-[30] -top-20 left-0 line" />
      <SvgSection4BgRt className="w-[38%] absolute z-[30] -top-20 right-0 line" />
      <SvgSection4BgBase className="w-full absolute -top-20 left-0 right-0 overflow-hidden h-fit" />

      <div className="flex flex-col justify-center items-center gap-24 w-full px-10 z-20 bg-white">
        <Section4Intro />
        <Section4Outro />
      </div>
      <SvgSection4BgBottom className="w-full absolute z-[30] -bottom-10  right-0 line" />
      <SvgSection4BgBase className="w-full absolute -bottom-10 left-0 right-0 overflow-hidden h-fit z-0" />
    </div>
  );
}
