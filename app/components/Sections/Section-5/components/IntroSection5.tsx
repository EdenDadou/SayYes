import SvgIntroSection5 from "~/components/Sections/Section-5/components/assets/IntroSection5";
import SvgSection5IntroBg from "./assets/Section5IntroBg";
import Halo from "~/components/BackgroundLayer/components/Halo";
import { useInView, motion } from "framer-motion";
import Svg100Entreprises from "./assets/100Entreprises";
import Svg240Projets from "./assets/240Projets";
import Svg999Supports from "./assets/999Supports";
import InfiniteCarousel from "./infiniteCarrousel";
import { useRef } from "react";

const keyNumber = [
  { item: Svg100Entreprises, className: "absolute top-[24%] right-[60%] z-0" },
  { item: Svg999Supports, className: "absolute top-[20%] right-[20%]  z-0" },
  { item: Svg240Projets, className: "absolute top-[60%] right-[40%] z-0" },
];

const variants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      delay: 0.2,
      ease: "easeOut",
    },
  },
  hidden: { opacity: 0, x: -100 },
};
const variantsKey = (i: number) => ({
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 14,
      duration: 0.6,
      delay: 0.6 + 0.3 * i,
      ease: "easeInOut",
    },
  },
  hidden: { opacity: 0, y: -40 },
});

export default function IntroSection5() {
  const container = useRef(null);
  const containerIntro = useRef(null);
  const isInView = useInView(containerIntro, { once: true, amount: "all" });

  return (
    <div
      className="relative flex flex-col justify-center items-center gap-14 w-full z-10 -top-20"
      ref={container}
    >
      {/* Background */}
      <SvgSection5IntroBg className="absolute -top-22 z-0" />
      <Halo
        size={700}
        rotation={30}
        style={{ top: "-20%", right: "-10%", position: "absolute" }}
      />
      <Halo
        size={700}
        rotation={-30}
        style={{ top: "5%", left: "-5%", position: "absolute" }}
      />
      <Halo
        size={800}
        rotation={0}
        style={{ top: "35%", right: "-50%", zIndex: 10, position: "absolute" }}
        opacity={0.5}
        color="rgba(27,27,27,1)"
      />
      <Halo
        size={800}
        rotation={0}
        style={{ top: "35%", left: "-30%", zIndex: 10, position: "absolute" }}
        opacity={0.5}
        color="rgba(27,27,27,1)"
      />
      {/* Section content */}
      <div className="w-full flex flex-row mt-20" ref={containerIntro}>
        <motion.div
          initial={{
            opacity: 0,
            x: -100,
          }}
          variants={variants}
          animate={isInView ? "visible" : "hidden"}
          className="w-3/5 pl-40 z-10 ml-6"
        >
          <SvgIntroSection5 className="w-full" />
        </motion.div>
        <div className="w-2/5 relative">
          {keyNumber.map((key, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: 0,
              }}
              variants={variantsKey(i)}
              animate={isInView ? "visible" : "hidden"}
              className={key.className}
            >
              {key.item({ className: key.className })}
            </motion.div>
          ))}
        </div>
      </div>
      <InfiniteCarousel />
    </div>
  );
}
