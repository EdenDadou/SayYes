import SvgSection4Intro from "~/components/Sections/Section-4/components/assets/Section4Intro";
import SvgCardKickOff from "~/components/Sections/Section-4/components/assets/CardKickOff";
import SvgCardConception from "~/components/Sections/Section-4/components/assets/CardConception";
import SvgCardCreation from "~/components/Sections/Section-4/components/assets/CardCreation";
import SvgCardDeclinaison from "~/components/Sections/Section-4/components/assets/CardDeclinaison";
import SvgCardLivraison from "~/components/Sections/Section-4/components/assets/CardLivraison";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Halo from "~/components/BackgroundLayer/components/Halo";
import { AnimatedCardMobile } from "./AnimatedCardMobile";
import SvgAnnotation from "../../components/assets/Annotation";
import SvgSection4BgLt from "../../components/assets/Section4BgLt";
import SvgSection4BgBottom from "../../components/assets/Section4BgBottom";
import SvgSection4BgRt from "../../components/assets/Section4BgRt";

// const cards = [
//   {
//     svg: <SvgCardKickOff />,
//   },
//   {
//     svg: <SvgCardConception />,
//   },
//   {
//     svg: <SvgCardCreation />,
//   },
//   {
//     svg: <SvgCardDeclinaison />,
//   },
//   {
//     svg: <SvgCardLivraison />,
//   },
// ];

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

  const x = useTransform(scrollYProgress, [0, 0.8], ["5%", "-440%"]);
  const isInView = useInView(containerIntro, { once: true, amount: "all" });

  return (
    <section ref={container} className="relative h-[300vh] top-40 pb-32">
      <div className="sticky -top-0 h-screen  flex justify-center flex-col w-full items-center">
        {/* <SvgAnnotation className="absolute z-50 top-[5%] right-[27%] w-auto" />
        <Halo size={1000} rotation={-30} style={{ top: "0%", left: "-20%" }} />
        <Halo
          size={1000}
          rotation={30}
          style={{ top: "100%", right: "-20%" }}
        />
        <SvgSection4BgLt
          className={`w-[35%] absolute z-50 -top-52 left-0 ${
            isInView ? "line" : "hidden"
          }`}
        />
        <SvgSection4BgRt
          className={`w-[30%] absolute z-50 -top-40  right-0 ${
            isInView ? "line" : "hidden"
          }`}
        />
        <SvgSection4BgBottom
          className={`w-full absolute top-[210px] left-0 z-20 ${
            isInView ? "line" : "hidden"
          }`}
        /> */}

        <div
          className="flex flex-col justify-center items-center  gap-2 w-screen pt-10 px-10"
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
            {/* <SvgSection4Intro className="w-full" /> */}
          </motion.div>
          <p className="text-black text-md font-bold font-jakarta w-full text-center">
            Gardez la main sur le process de
            <br /> création tout en libérant votre
            <br /> inspiration.
          </p>
        </div>
        {/* <motion.div
          style={{ x }}
          ref={horizontalRef}
          className="flex flex-row w-screen h-fit mt-5 z-20"
        >
          {cards.map((item, index) => {
            return (
              <AnimatedCardMobile
                i={index}
                key={`p_${index}`}
                card={item.svg}
                progress={scrollYProgress}
              />
            );
          })}
        </motion.div> */}
      </div>
    </section>
  );
}
