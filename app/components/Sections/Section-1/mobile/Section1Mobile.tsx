import SvgTexteIntro from "./../components/TexteIntro";
import { motion } from "framer-motion";

export default function Section1Mobile() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Front Layer */}
      <div className="relative w-full z-10 h-[calc(100vh-192px)] flex flex-row items-center">
        {/* Contenu central */}
        <motion.div
          className="relative flex flex-col justify-start items-center w-full h-full top-20 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div className="holographic-text font-jakarta-bold text-lg">
            Communication visuelle*
          </div>
          <SvgTexteIntro className="w-4/5" />
          <div className="w-2/3 flex flex-col items-center justify-center">
            <p className="font-jakarta md:text-2xl 2xl:text-4xl text-center text-gray-50">
              Nous imaginons des solutions visuelles pour rendre votre marque
              mémorable
            </p>
          </div>
        </motion.div>

        {/* Contenu bas */}
        <motion.div
          className="absolute bottom-0 h-full w-full flex items-center justify-end overflow-hidden"
          initial={{ translateY: "100%" }}
          animate={{ translateY: "0%" }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div className="absolute left-10 bottom-0 h-fit w-[200%]">
            <img src="./images/illuIntro.png" alt="deco" className="w-[40%]" />
          </div>
        </motion.div>
      </div>
      {/* <ScrollingBanner /> */}
    </div>
  );
}
