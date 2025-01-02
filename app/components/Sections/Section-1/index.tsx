import SvgBgGeometrie from "./components/BgGeometrie";
import SvgStars from "./components/Stars";
import SvgTexteIntro from "./components/TexteIntro";
import { motion } from "framer-motion";
import "~/styles/index";

interface Section1Props {
  isIntroFinish: boolean;
}

export default function Section1({ isIntroFinish }: Section1Props) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Bg Layer */}
      {isIntroFinish ? (
        <div className="absolute flex flex-row items-center justify-center w-[150%] h-full -top-14 -left-[25%] ">
          <div className="flex items-center justify-center w-1/2">
            <SvgBgGeometrie className="w-fit h-screen" />
          </div>
          <div className="flex items-center justify-center w-1/2">
            <SvgBgGeometrie className="w-fit h-screen" />
          </div>
          <div className="flex items-center justify-center w-1/2">
            <SvgBgGeometrie className="w-fit h-screen" />
          </div>
        </div>
      ) : null}

      {/* Front Layer */}
      <div className="relative w-full z-10 h-full ">
        {/* Contenu gauche*/}
        <motion.div
          className="absolute left-0 top-20 h-full w-1/2 overflow-hidden"
          initial={{ translateX: "-100%" }}
          animate={{ translateX: "0%" }}
          transition={{ duration: 5, ease: "easeInOut", delay: 5 }}
        >
          <div className="absolute right-[-60%] h-fit w-[200%]">
            <img src="./images/illuIntro.png" alt="deco" className="w-[40%]" />
          </div>
        </motion.div>

        {/* Contenu central */}
        <motion.div
          className="relative flex flex-col justify-center items-center w-full h-full gap-8 py-36"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 7.5 }}
        >
          <SvgTexteIntro className="w-1/3" />
          <div className="w-1/3 flex flex-col items-center justify-center gap-12">
            <p className="font-jakarta md:text-2xl 2xl:text-4xl text-center text-gray-50">
              Nous imaginons des solutions visuelles pour rendre votre marque
              mémorable
            </p>
            <div>
              <p className="font-jakarta-bold md:text-4xl 2xl:text-6xl">
                4.9 <span className="font-jakarta font-extralight">I</span> 5
                Shortlist
              </p>
              <div className="flex flex-row items-center justify-center">
                <SvgStars />
                <p className="font-jakarta md:text-base 2xl:text-3xl">
                  Clients conquis
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contenu droite */}
        <motion.div
          className="absolute right-0 top-20 h-full w-1/2 overflow-hidden"
          initial={{ translateX: "100%" }}
          animate={{ translateX: "0%" }}
          transition={{ duration: 5, ease: "easeInOut", delay: 5 }}
        >
          <div className="absolute left-[50%] h-fit w-[200%]">
            <img src="./images/illuIntro.png" alt="deco" className="w-[40%]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
