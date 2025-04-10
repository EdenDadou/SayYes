import SvgCardYellowLogo from "~/components/Sections/Section-2/components/assets/CardYellowLogo";
import SvgCardYellowCta from "~/components/Sections/Section-2/components/assets/CardYellowCta";
import SvgCardPinkLogo from "~/components/Sections/Section-2/components/assets/CardPinkLogo";
import SvgCardPinkCta from "~/components/Sections/Section-2/components/assets/CardPinkCta";
import SvgCardBlueLogo from "~/components/Sections/Section-2/components/assets/CardBlueLogo";
import SvgCardBlueCta from "~/components/Sections/Section-2/components/assets/CardBlueCta";
import { useRef } from "react";
import { motion, useInView, useScroll } from "framer-motion";
import Intro2Mobile from "./components/Intro2Mobile";
import CardMobile from "./components/CardsMobile";
import SvgTitleCardYellowMobile from "./components/TitleCardYellowMobile";
import SvgTitleCardPinkMobile from "./components/TitleCardPinkMobile";
import SvgTitleCardBlueMobile from "./components/TitleCardBlueMobile";

const cards = [
  {
    id: 1,
    logo: <SvgCardYellowLogo className="w-[25%]" />,
    title: <SvgTitleCardYellowMobile />,
    desc: "Say Yes conçoit & coordonne votre identité pour faire rayonner votre marque durablement !",
    cta: <SvgCardYellowCta className="cursor-pointer w-64 pt-2" />,
    bg: <img src="images/section2/cardBg.png" alt="bg" className="relative" />,
    image: "./images/illustration_identity.png",
  },
  {
    id: 2,
    logo: <SvgCardPinkLogo className="w-[25%]" />,
    title: <SvgTitleCardPinkMobile />,
    desc: "Say Yes améliore votre visibilité et votre performance pour vous rendre incontournable !",
    cta: <SvgCardPinkCta className="cursor-pointer w-64 pt-2" />,
    bg: <img src="images/section2/cardBg.png" alt="bg" className="relative" />,
    image: "./images/illustration_digital.png",
  },
  {
    id: 3,
    logo: <SvgCardBlueLogo className="w-[25%]" />,
    title: <SvgTitleCardBlueMobile />,
    desc: "Say Yes interprète visuellement tous vos messages pour les rendre simples & accessibles !",
    cta: <SvgCardBlueCta className="cursor-pointer w-64 pt-2" />,
    bg: <img src="images/section2/cardBg.png" alt="bg" className="relative" />,
    image: "./images/illustration_facilitation.png",
  },
];

export default function Section2Mobile() {
  const container = useRef(null);
  const isInView = useInView(container, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div
      className="relative w-full h-auto"
      style={{
        backgroundImage: 'url("images/section2/bg.png")',
        backgroundSize: "contain",
        backgroundPositionY: "-20px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Intro2Mobile />
      <motion.main
        className="pb-10 min-h-screen"
        ref={container}
        initial={{ y: 0, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {cards.map((item, index) => {
          const targetScale = 1 - (cards.length - index) * 0.05;
          return (
            <CardMobile
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
