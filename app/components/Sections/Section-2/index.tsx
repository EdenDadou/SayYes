import Intro2 from "./components/Intro2";
import SvgCardYellowTitle from "~/components/Sections/Section-2/components/assets/CardYellowTitle";
import SvgCardYellowLogo from "~/components/Sections/Section-2/components/assets/CardYellowLogo";
import SvgCardYellowCta from "~/components/Sections/Section-2/components/assets/CardYellowCta";
import SvgCardYellowBg from "~/components/Sections/Section-2/components/assets/CardYellowBg";
import Card from "./components/Card";
import SvgCardPinkLogo from "~/components/Sections/Section-2/components/assets/CardPinkLogo";
import SvgCardPinkTitle from "~/components/Sections/Section-2/components/assets/CardPinkTitle";
import SvgCardPinkCta from "~/components/Sections/Section-2/components/assets/CardPinkCta";
import SvgCardPinkBg from "~/components/Sections/Section-2/components/assets/CardPinkBg";
import SvgCardBlueLogo from "~/components/Sections/Section-2/components/assets/CardBlueLogo";
import SvgCardBlueTitle from "~/components/Sections/Section-2/components/assets/CardBlueTitle";
import SvgCardBlueCta from "~/components/Sections/Section-2/components/assets/CardBlueCta";
import SvgCardBlueBg from "~/components/Sections/Section-2/components/assets/CardBlueBg";
import { useRef } from "react";
import { motion, useInView, useScroll } from "framer-motion";
import SvgSection2Bg from "~/components/BackgroundLayer/components/Section2Bg";
import Halo from "~/components/BackgroundLayer/components/Halo";

const cards = [
  {
    id: 1,
    logo: <SvgCardYellowLogo className="w-[45%]" />,
    title: <SvgCardYellowTitle />,
    desc: "Say Yes conçoit & coordonne votre identité pour faire rayonner votre marque durablement !",
    cta: <SvgCardYellowCta className="cursor-pointer w-64 pt-2" />,
    bg: <SvgCardYellowBg className="relative" />,
    image: "./images/illustration_identity.png",
  },
  {
    id: 2,
    logo: <SvgCardPinkLogo className="w-[45%]" />,
    title: <SvgCardPinkTitle />,
    desc: "Say Yes améliore votre visibilité et votre performance pour vous rendre incontournable !",
    cta: <SvgCardPinkCta className="cursor-pointer w-64 pt-2" />,
    bg: <SvgCardPinkBg className="relative" />,
    image: "./images/illustration_digital.png",
  },
  {
    id: 3,
    logo: <SvgCardBlueLogo className="w-[45%]" />,
    title: <SvgCardBlueTitle />,
    desc: "Say Yes interprète visuellement tous vos messages pour les rendre simples & accessibles !",
    cta: <SvgCardBlueCta className="cursor-pointer w-64 pt-2" />,
    bg: <SvgCardBlueBg className="relative" />,
    image: "./images/illustration_facilitation.png",
  },
];

export default function Section2() {
  const container = useRef(null);
  const isInView = useInView(container, { once: true });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div className="relative w-screen h-full">
      <SvgSection2Bg className="absolute top-0 z-0" />

      <Halo
        size={700}
        rotation={30}
        style={{ top: "20%", left: "-10%", position: "absolute" }}
      />
      <Halo
        size={700}
        rotation={30}
        style={{ top: "50%", right: "-10%", position: "absolute" }}
      />
      <Halo
        size={700}
        rotation={30}
        style={{ top: "300%", right: "-10%", position: "absolute" }}
      />

      <Intro2 />
      <motion.main
        className="pb-10"
        ref={container}
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {cards.map((item, index) => {
          const targetScale = 1 - (cards.length - index) * 0.05;
          return (
            <Card
              i={index}
              key={`p_${index}`}
              {...item}
              progress={scrollYProgress}
              range={[index * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </motion.main>
    </div>
  );
}
