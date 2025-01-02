import SvgSection4Intro from "~/assets/icons/IconsSection4/Section4Intro";
import SvgCardKickOff from "~/assets/icons/IconsSection4/CardKickOff";
import SvgCardConception from "~/assets/icons/IconsSection4/CardConception";
import SvgCardCreation from "~/assets/icons/IconsSection4/CardCreation";
import SvgCardDeclinaison from "~/assets/icons/IconsSection4/CardDeclinaison";
import SvgCardLivraison from "~/assets/icons/IconsSection4/CardLivraison";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { AnimatedCard } from "./AnimatedCard";
import "~/styles/index";

const cards = [
  {
    svg: <SvgCardKickOff />,
  },
  {
    svg: <SvgCardConception />,
  },
  {
    svg: <SvgCardCreation />,
  },
  {
    svg: <SvgCardDeclinaison />,
  },
  {
    svg: <SvgCardLivraison />,
  },
];

export default function Section4Intro() {
  const container = useRef(null);
  const horizontalRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  const x = useTransform(scrollYProgress, [0, 1], ["20%", "-30%"]);

  return (
    <section ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex justify-center flex-col w-full items-center">
        <div className="flex flex-col justify-center items-center max-w-[1200px] gap-6 mt-10 w-screen">
          <SvgSection4Intro />
          <p className="text-black text-2xl font-bold font-jakarta w-2/3 text-center">
            Gardez la main sur le process de création tout en libérant votre
            inspiration.
          </p>
        </div>
        <motion.div
          style={{ x }}
          ref={horizontalRef}
          className="flex flex-row w-screen h-fit mt-5"
        >
          {cards.map((item, index) => {
            return (
              <AnimatedCard
                i={index}
                key={`p_${index}`}
                card={item.svg}
                progress={scrollYProgress}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
