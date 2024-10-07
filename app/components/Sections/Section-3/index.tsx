import SvgSection3Bg from "~/assets/icons/Section3/Section3Bg";
import "~/styles/index";
import Intro3 from "./components/Intro3";
import SpecialityLines from "./components/SpecialityLines";
import SvgFooterSection3 from "~/assets/icons/Section3/FooterSection3";
import { projetList } from "./components/projetList";

export default function Section3() {
  function shuffleArray(array: string[]) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  return (
    <>
      <div className="w-screen flex justify-center items-center relative">
        {/* SVG de fond */}
        <SvgSection3Bg
          className="w-full absolute z-20 -top-[300px] left-0 right-0 overflow-hidden bg-inherit"
          height={1400}
          width={1900}
        />
      </div>
      <div className="w-full h-fit overflow-hidden">
        <div className="w-full h-fit z-10 flex flex-col justify-center items-center">
          <Intro3 />
          <SpecialityLines />
        </div>
        <div className="w-full z-10 mt-32 relative overflow-hidden">
          {/* Conteneur pour les éléments en bleu avec z-index inférieur */}
          <div className="relative z-0">
            <div className="h-40 bg-gray-600 w-full absolute -top-[115px] left-0 z-0" />
            <div className="h-32 bg-gray-600 w-80 absolute -top-[110px] right-[217px] rotate-[51deg] z-0" />
            <div className="h-32 bg-gray-600 w-[326px] absolute -top-[8px] right-0 z-0" />
          </div>

          <SvgFooterSection3 height={1055} width={1760} />
          <div className="relative z-0">
            <div className="h-40 bg-white w-full absolute -top-[45px] left-0 z-0" />
            <div className="h-32 bg-white w-80 absolute -top-[30px] left-[319px] rotate-[50deg] z-0" />
            <div className="h-32 bg-white w-[425px] absolute bottom-[3px] left-0 z-0" />
          </div>
          {/* Conteneur pour les colonnes */}
          <div className="absolute top-0 -left-[90px] w-full h-full z-[-10]">
            <div className="grid grid-cols-3 gap-4 w-[110%] h-full rotate-[15deg]">
              {Array.from({ length: 3 }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className={`inline-flex animate-scroll whitespace-nowrap w-[35vw] ${
                    colIndex % 2 === 0 ? "scroll-top" : "scroll-bottom"
                  }`}
                >
                  <div className="gap-5 flex flex-col items-center justify-center">
                    {shuffleArray([
                      ...projetList,
                      ...projetList,
                      ...projetList,
                    ]).map((item, index) => (
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
    </>
  );
}
