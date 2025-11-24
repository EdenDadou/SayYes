import { useRef } from "react";
import { projetList } from "./../components/projetList";
import { useInView } from "framer-motion";
import Intro3Mobile from "./components/Intro3Mobile";
import SpecialityLinesMobile from "./components/SpecialityLineMobile";

export default function Section3Mobile() {
  const containerCarroussel = useRef(null);
  const isInView = useInView(containerCarroussel, {
    once: false,
    amount: "some",
  });
  return (
    <div
      className="w-full relative z-10"
      style={{
        backgroundImage: 'url("images/section3/bg.png")',
        backgroundSize: "110% 90%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundPositionY: "-30px",
      }}
    >
      <div className="relative w-full h-fit flex flex-col justify-center items-center mb-32">
        <Intro3Mobile />
        <SpecialityLinesMobile />
      </div>
      <div
        id="section3WrapperMobile"
        className="relative w-screen overflow-x-hidden"
      >
        <div
          className="absolute top-0 left-0 bottom-0 w-full h-full z-10 bg-gradient-to-b from-[#1B1B1B]/80 via-transparent to-[#1B1B1B]/80 
           [background:linear-gradient(to bottom,#1B1B1B 15%,transparent 40%,transparent 60%,#1B1B1B 85%)] pointer-events-none"
          ref={containerCarroussel}
        />
        <div id="section3ClipPathMobile" className="overflow-y-hidden">
          <div className="grid grid-cols-2 gap-3 w-[110%] h-full rotate-[7deg] -ml-6">
            {Array.from({ length: 2 }).map((_, colIndex) => (
              <div
                key={colIndex}
                className={`inline-flex whitespace-nowrap ${
                  !isInView
                    ? ""
                    : colIndex % 2 === 0
                      ? "scroll-top-mobile"
                      : "scroll-bottom-mobile"
                }`}
              >
                <div className="gap-3 flex flex-col items-center justify-center">
                  {projetList[colIndex]
                    .concat(projetList[colIndex])
                    .concat(projetList[colIndex])
                    .concat(projetList[colIndex])
                    .concat(projetList[colIndex])
                    .map((item, index) => (
                      <img
                        loading="lazy"
                        key={index}
                        src={item}
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
  );
}
