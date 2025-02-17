import SvgTexteIntro from "./components/TexteIntro";
import { motion } from "framer-motion";
import ScrollingBanner from "./components/ScrollingBanner";

export default function Section1() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Front Layer */}
      <div className="relative w-full z-10 h-[calc(100vh-192px)] flex flex-row items-center">
        {/* Contenu gauche*/}
        <motion.div
          className="absolute left-0 h-full w-1/2 flex items-center justify-end overflow-hidden"
          initial={{ translateX: "-100%" }}
          animate={{ translateX: "0%" }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div className="absolute right-[-70%] h-fit w-[200%]">
            <img src="./images/illuIntro.png" alt="deco" className="w-[40%]" />
          </div>
        </motion.div>

        {/* Contenu central */}
        <motion.div
          className="relative flex flex-col justify-center items-center w-full h-full top-6 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <SvgTexteIntro className="w-[42%]" />
          <div className="w-1/3 flex flex-col items-center justify-center">
            <p className="font-jakarta md:text-2xl 2xl:text-4xl text-center text-gray-50">
              Nous imaginons des solutions visuelles pour rendre votre marque
              mémorable
            </p>
          </div>
        </motion.div>

        {/* Contenu droite */}
        <motion.div
          className="absolute right-0 h-full w-1/2 flex items-center justify-end overflow-hidden"
          initial={{ translateX: "100%" }}
          animate={{ translateX: "0%" }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div className="absolute left-[50%] h-fit w-[200%]">
            <img src="./images/illuIntro.png" alt="deco" className="w-[40%]" />
          </div>
        </motion.div>
      </div>
      <ScrollingBanner />
    </div>
  );
}
