import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import InfiniteCarouselMobile from "./InfiniteCarousselMobile";
const keyNumber = [
  <img key={1} loading="lazy" src="images/section5/puce1.png" alt="intro" />,
  <img key={2} loading="lazy" src="images/section5/puce2.png" alt="intro" />,
  <img key={3} loading="lazy" src="images/section5/puce3.png" alt="intro" />,
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
  const isInView = useInView(containerIntro, { once: true, amount: "some" });

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
            className="w-[90vw]"
          />
        </motion.div>
        <div className="w-screen flex flex-row relative px-2 pt-5">
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
      <InfiniteCarouselMobile />
    </div>
  );
}
