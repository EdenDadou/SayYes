import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Halo from "~/components/BackgroundLayer/components/Halo";
import { AnimatedCardMobile } from "./AnimatedCardMobile";
const cards = [
  {
    img: "/images/section4/card_kick_off.png",
  },
  {
    img: "/images/section4/card_conception.png",
  },
  {
    img: "/images/section4/card_creation.png",
  },
  {
    img: "/images/section4/card_declinaison.png",
  },
  {
    img: "/images/section4/card_livraison.png",
  },
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

export default function Section4IntroMobile() {
  const container = useRef(null);
  const containerIntro = useRef(null);
  const horizontalRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
  });

  const x = useTransform(scrollYProgress, [0.1, 3], ["40%", "-220%"]);
  const isInView = useInView(containerIntro, { once: true, amount: "all" });

  return (
    <section
      ref={container}
      className="relative top-0 h-[500vh] w-screen"
      style={{
        backgroundImage: 'url("images/section4/bg.png")',
        backgroundSize: "contain",
        backgroundPositionY: "-100px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="sticky h-screen top-0 flex justify-start flex-col w-full items-center mt-80 overflow-y-scroll">
        <Halo
          size={1000}
          rotation={-30}
          style={{ top: "0%", left: "-20%", position: "absolute" }}
        />
        <Halo
          size={1000}
          rotation={30}
          style={{ top: "100%", right: "-20%", position: "absolute" }}
        />

        <div
          className="flex flex-col justify-center items-center  gap-2 w-screen py-8 px-10"
          ref={containerIntro}
        >
          <motion.div
            initial={{
              opacity: 0,
              x: -100,
            }}
            variants={variants}
            animate={isInView ? "visible" : "hidden"}
          >
            <img
              src="images/section4/Intro.png"
              alt="vous pilotez nous creons !"
              className="w-full"
            />
          </motion.div>
          <p className="text-black text-md font-bold font-jakarta w-full text-center">
            Gardez la main sur le process de
            <br /> création tout en libérant votre
            <br /> inspiration.
          </p>
        </div>
        <motion.div
          style={{ x }}
          ref={horizontalRef}
          className="flex flex-row justify-start items-start gap-5 mt-5 w-auto px-5  overflow-x-hidden"
        >
          {cards.map((item, index) => (
            <img
              key={`p_${index}`}
              src={item.img}
              alt="cards"
              className="w-screen"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
