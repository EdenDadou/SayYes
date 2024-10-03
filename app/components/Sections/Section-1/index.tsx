import SvgBgGeometrie from "~/assets/icons/BgGeometrie";
import SvgDecoIntro from "~/assets/icons/DecoIntro";
import SvgStars from "~/assets/icons/Stars";
import SvgTexteIntro from "~/assets/icons/TexteIntro";
import "~/styles/index";
import ScrollingBanner from "./components/ScrollingBanner";

interface Section1Props {
  line: boolean;
}

export default function Section1({ line }: Section1Props) {
  return line ? (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Bg Layer */}
      <div className="absolute flex flex-row items-center justify-center w-full h-full left-0 right-0 -top-14 z-0">
        <div className="flex items-center justify-center w-1/2">
          <SvgBgGeometrie className="w-fit" />
        </div>
        <div className="flex items-center justify-center w-1/2">
          <SvgBgGeometrie className="w-fit" />
        </div>
        <div className="flex items-center justify-center w-1/2">
          <SvgBgGeometrie className="w-fit" />
        </div>
      </div>

      {/* Front Layer */}
      <div className="relative w-full h-full z-10">
        {/* Contenu gauche*/}
        <div className="absolute left-0 top-10 h-full w-1/2 overflow-hidden">
          <div className="absolute right-[-60%] h-full w-[200%]">
            <SvgDecoIntro className="w-full h-full" />
          </div>
        </div>

        {/* Contenu central */}
        <div className="relative flex flex-col justify-center items-center w-full h-full gap-8">
          <SvgTexteIntro />
          <div className="w-1/3 flex flex-col items-center justify-center gap-12">
            <p className="font-jakarta text-2xl text-center">
              Nous imaginons des solutions visuelles pour rendre votre marque
              mémorable
            </p>
            <div>
              <p className="font-jakarta-bold font-bold text-4xl">
                4.9 I 5 Shortlist
              </p>
              <div className="flex flex-row items-center">
                <SvgStars />
                <p className="font-jakarta text-base">Clients conquis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu droite */}
        <div className="absolute right-0 top-10 h-full w-1/2 overflow-hidden">
          <div className="absolute left-[50%] h-full w-[200%]">
            <SvgDecoIntro className="w-full h-full" />
          </div>
        </div>

        <ScrollingBanner />
      </div>
    </div>
  ) : null;
}
