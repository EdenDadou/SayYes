import SvgStars from "../components/Stars";
import { motion } from "framer-motion";
import ScrollingBannerMobile from "./components/ScrollingBannerMobile";

export default function Section1Mobile() {
  return (
    <div
      className="relative w-full min-h-screen h-auto overflow-visible"
      style={{
        backgroundImage: 'url("images/section1/bg.png")',
        backgroundSize: "cover",
        backgroundPositionY: "-70px",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Front Layer */}
      <div className="relative w-full z-10 h-[calc(100vh-192px)] flex flex-row items-center">
        {/* Contenu central */}
        <motion.div
          className="relative flex flex-col justify-start items-center w-full h-full top-10 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          {/* <SvgTexteIntro className="w-[65%]" /> */}
          <img src="images/section1/Intro1.png" alt="" className="w-3/4" />
          <div className="w-full flex flex-col items-center justify-center text-gray-50 font-jakarta">
            <span>Nous imaginons des solutions</span>
            <span>visuelles pour rendre votre</span>
            <span> marque mémorable</span>
          </div>

          <div className="w-full flex flex-col items-center">
            <p className="font-jakarta-bold pl-1 text-lg">
              4.9 <span className="font-jakarta font-extralight">I</span> 5
              Shortlist
            </p>
            <div className="flex flex-row items-center justify-center">
              <SvgStars className="w-12" />
              <p className="font-jakarta text-xs">Clients conquis</p>
            </div>
          </div>
        </motion.div>

        {/* Contenu bas */}
        <motion.div
          className="absolute bottom-0 h-screen w-full flex items-center justify-end overflow-hidden"
          initial={{ translateY: "100%" }}
          animate={{ translateY: "40%" }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <img
            src="./images/illuIntro.png"
            alt="deco"
            className="w-full px-10"
          />
        </motion.div>
      </div>
      <ScrollingBannerMobile />
    </div>
  );
}
