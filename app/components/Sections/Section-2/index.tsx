import SvgSection2Bg from "~/assets/icons/Section2Bg";
import SvgSection2Intro from "~/assets/icons/Section2Intro";
import "~/styles/index";

export default function Section2() {
  return (
    <div className="relative w-full h-fit overflow-hidden">
      {/* Front Layer */}
      <div className="relative w-full h-full z-10">
        {/* Bg Layer */}
        <div className="absolute h-full left-0 top-10 right-0 z-0 w-full">
          <SvgSection2Bg />
        </div>
        <div className="px-32 py-40">
          <div className="flex flex-row justify-between items-center gap-36 w-full">
            <div className="w-1/3 h-fit">
              <SvgSection2Intro />
            </div>
            <p className="font-jakarta text-3xl font-bold">
              “Du (Re)branding au développement de votre communication visuelle,
              Say Yes vous accompagne sur tous vos projets”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
