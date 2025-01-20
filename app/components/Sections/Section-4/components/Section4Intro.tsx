import SvgSection4Intro from "~/components/Sections/Section-4/components/assets/Section4Intro";
import SvgCardKickOff from "~/components/Sections/Section-4/components/assets/CardKickOff";
import SvgCardConception from "~/components/Sections/Section-4/components/assets/CardConception";
import SvgCardCreation from "~/components/Sections/Section-4/components/assets/CardCreation";
import SvgCardDeclinaison from "~/components/Sections/Section-4/components/assets/CardDeclinaison";
import SvgCardLivraison from "~/components/Sections/Section-4/components/assets/CardLivraison";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { AnimatedCard } from "./AnimatedCard";
import SvgSection4BgRt from "./assets/Section4BgRt";
import SvgSection4BgLt from "./assets/Section4BgLt";
import SvgAnnotation from "~/assets/icons/AnnotationSection4";
import Halo from "~/components/BackgroundLayer/components/Halo";
import SvgSection4BgBottom from "./assets/Section4BgBottom";

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
    <section ref={container} className="relative h-[300vh] top-40 pb-32">
      <div className="sticky -top-0 h-screen  flex justify-center flex-col w-full items-center">
        <SvgAnnotation className="absolute z-50 top-[220px] left-56 w-auto" />
        <Halo size={1000} rotation={-30} style={{ top: "0%", left: "-20%" }} />
        <Halo
          size={1000}
          rotation={30}
          style={{ top: "100%", right: "-20%" }}
        />
        <SvgSection4BgLt className="w-[35%] absolute z-50 -top-52 left-0 line" />
        <SvgSection4BgRt className="w-[30%] absolute z-50 -top-40  right-0 line" />
        <SvgSection4BgBottom className="w-full absolute top-[210px] left-0 line z-20" />

        <div className="flex flex-col justify-center items-center max-w-[1200px] gap-2 w-screen pt-10">
          <SvgSection4Intro />
          <p className="text-black text-2xl font-bold font-jakarta w-2/3 text-center">
            Gardez la main sur le process de création <br /> tout en libérant
            votre inspiration.
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
