import Intro3 from "./components/Intro3";
import SpecialityLines from "./components/SpecialityLines";
import { projetList } from "./components/projetList";

export default function Section3() {
  return (
    <>
      <div className="w-full h-fit relative">
        <div className="relative w-full h-fit flex flex-col justify-center items-center mb-32 ">
          <Intro3 />
          <SpecialityLines />
        </div>
        <div id="section3Wrapper" className="relative">
          <div
            className="absolute top-0 left-0 bottom-0 w-full h-full z-10 bg-gradient-to-b from-[#1B1B1B]/70 via-transparent to-[#1B1B1B]/70 
           [background:linear-gradient(to bottom,#1B1B1B 15%,transparent 40%,transparent 60%,#1B1B1B 85%)]pointer-events-none"
          />
          <div id="section3ClipPath">
            <div className="grid grid-cols-3 gap-4 w-[110%] h-full rotate-[15deg]  left-[-90px]">
              {Array.from({ length: 3 }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className={`inline-flex animate-scroll whitespace-nowrap w-[35vw] ${
                    colIndex % 2 === 0 ? "scroll-top" : "scroll-bottom"
                  }`}
                >
                  <div className="gap-5 flex flex-col items-center justify-center overflow-hidden">
                    {projetList[colIndex]
                      .concat(projetList[colIndex])
                      .concat(projetList[colIndex])
                      .map((item, index) => (
                        <img
                          key={index}
                          src={item}
                          loading="lazy"
                          alt={`Projet ${index + 1}`}
                          className="w-full object-cover"
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
