import SvgBgGeometrie from "~/assets/icons/Section1/BgGeometrie";
import SvgDecoIntro from "~/assets/icons/Section1/DecoIntro";
import SvgStars from "~/assets/icons/Section1/Stars";
import SvgTexteIntro from "~/assets/icons/Section1/TexteIntro";
import "~/styles/index";

interface Section1Props {
  isIntroFinish: boolean;
}

export default function Section1({ isIntroFinish }: Section1Props) {
  return (
    <div className="relative w-full h-fit overflow-hidden">
      {/* Bg Layer */}
      {isIntroFinish ? (
        <div className="absolute flex flex-row items-center justify-center w-full h-screen left-0 right-0 -top-14 ">
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
      ) : null}

      {/* Front Layer */}
      <div className="relative w-full z-10">
        {/* Contenu gauche*/}
        <div className="absolute left-0 top-10 h-full w-1/2 overflow-hidden">
          <div className="absolute right-[-60%] h-full w-[200%]">
            {/* <SvgDecoIntro className="w-full h-full" /> */}
          </div>
        </div>

        {/* Contenu central */}
        <div className="relative flex flex-col justify-center items-center w-full h-max gap-8 py-36">
          <SvgTexteIntro />
          <div className="w-1/3 flex flex-col items-center justify-center gap-12">
            <p className="font-jakarta text-2xl text-center">
              Nous imaginons des solutions visuelles pour rendre votre marque
              mémorable
            </p>
            <div>
              <p className="font-jakarta-bold text-4xl">
                4.9 <span className="font-jakarta font-extralight">I</span> 5
                Shortlist
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
            {/* <SvgDecoIntro className="w-full h-full" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
