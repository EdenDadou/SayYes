import "~/styles/index";
import Intro3 from "./components/Intro3";
import SpecialityLines from "./components/SpecialityLines";
import { projetList } from "./components/projetList";
import SvgFooterSection3 from "~/components/Sections/Section-3/components/assets/FooterSection3";
import SvgSection3Bg from "~/components/Sections/Section-3/components/assets/Section3Bg";

export default function Section3() {
  return (
    <div>
      <div className="w-screen flex justify-center items-center">
        {/* SVG de fond */}
        <SvgSection3Bg className="w-full absolute -top-[300px] left-0 right-0" />
      </div>
      <div className="w-full h-fit relative">
        <div className="relative w-full h-fit flex flex-col justify-center items-center mb-32 ">
          <Intro3 />
          <SpecialityLines />
        </div>
        <div className="w-screen relative overflow-hidden">
          <SvgFooterSection3 className="w-full h-auto min-h-[800px] absolute z-20" />
          {/* Application du clipPath à cette div */}
          <div
            id="section3ClipPath"
            className="absolute top-0 left-0 w-full h-full z-10"
          >
            <div className="grid grid-cols-3 gap-4 w-[110%] h-full rotate-[15deg] relative left-[-90px]">
              {Array.from({ length: 3 }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className={`inline-flex animate-scroll whitespace-nowrap w-[35vw] ${
                    colIndex % 2 === 0 ? "scroll-top" : "scroll-bottom"
                  }`}
                >
                  <div className="gap-5 flex flex-col items-center justify-center">
                    {[...projetList, ...projetList].map((item, index) => (
                      <img
                        key={index}
                        src={item}
                        alt={`Projet ${index + 1}`}
                        className="w-full"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
