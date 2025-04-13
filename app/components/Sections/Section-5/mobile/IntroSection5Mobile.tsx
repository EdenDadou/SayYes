import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import Svg100Entreprises from "../components/assets/100Entreprises";
import Svg240Projets from "../components/assets/240Projets";
import Svg999Supports from "../components/assets/999Supports";
import InfiniteCarousel from "../components/infiniteCarrousel";

const keyNumber = [
  <Svg100Entreprises key="1" width={130} />,
  <Svg999Supports key="2" width={130} />,
  <Svg240Projets key="3" width={130} />,
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

export default function IntroSection5Mobile() {
  const container = useRef(null);
  const containerIntro = useRef(null);
  const isInView = useInView(containerIntro, { once: true, amount: "all" });

  return (
    <div
      className="flex flex-col justify-center items-center gap-14 w-screen"
      ref={container}
    >
      <div
        className="w-full flex flex-col justify-center item-center"
        ref={containerIntro}
      >
        <motion.div
          initial={{
            opacity: 0,
            x: -100,
          }}
          variants={variants}
          animate={isInView ? "visible" : "hidden"}
          className="w-screen flex justify-center items-center"
        >
          <img
            loading="lazy"
            src="images/section5/Intro5.png"
            alt="intro"
            className="w-screen"
          />
        </motion.div>
        <div className="w-screen flex flex-row h-48 relative px-2 pt-5">
          {keyNumber.map((key, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: 0,
              }}
              variants={variantsKey(i)}
              animate={isInView ? "visible" : "hidden"}
            >
              {key}
            </motion.div>
          ))}
        </div>
      </div>
      <InfiniteCarousel />
    </div>
  );
}
