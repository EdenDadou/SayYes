import SvgSection3Bg from "~/assets/icons/Section3/Section3Bg";
import "~/styles/index";
import Intro3 from "./components/Intro3";
import SpecialityLines from "./components/SpecialityLines";
import { projetList } from "./components/projetList";
import SvgFooterSection3 from "~/assets/icons/IconsSection3/FooterSection3";

export default function Section3() {
  return (
    <div>
      <div className="w-screen flex justify-center items-center">
        {/* SVG de fond */}
        {/* <SvgSection3Bg
          className="w-full absolute z-10 -top-[300px] left-0 right-0 overflow-hidden bg-gray-600"
          height={1400}
          width={1900}
        /> */}
      </div>
      <div className="w-full h-fit">
        <div className="relative w-full h-fit z-10 flex flex-col justify-center items-center mb-32 ">
          <Intro3 />
          <SpecialityLines />
        </div>
        <div className="w-full relative overflow-hidden">
          <SvgFooterSection3 className="w-full h-auto z-10 top-0 right-0 overflow-hidden relative" />
          <div className="absolute top-0 -left-[90px] w-full h-full ">
            <div className="grid grid-cols-3 gap-4 w-[110%] h-full rotate-[15deg]">
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
