import SvgSection2Bg from "public/icons/IconsSection2/Section2Bg";
import ScrollingBanner from "../Section-1/components/ScrollingBanner";
import Intro2 from "./components/Intro2";
import SvgCardYellowTitle from "public/icons/IconsSection2/CardYellowTitle";
import SvgCardYellowLogo from "public/icons/IconsSection2/CardYellowLogo";
import SvgCardYellowCta from "public/icons/IconsSection2/CardYellowCta";
import SvgCardYellowBg from "public/icons/IconsSection2/CardYellowBg";
import Card from "./components/Card";
import SvgCardPinkLogo from "public/icons/IconsSection2/CardPinkLogo";
import SvgCardPinkTitle from "public/icons/IconsSection2/CardPinkTitle";
import SvgCardPinkCta from "public/icons/IconsSection2/CardPinkCta";
import SvgCardPinkBg from "public/icons/IconsSection2/CardPinkBg";
import SvgCardBlueLogo from "public/icons/IconsSection2/CardBlueLogo";
import SvgCardBlueTitle from "public/icons/IconsSection2/CardBlueTitle";
import SvgCardBlueCta from "public/icons/IconsSection2/CardBlueCta";
import SvgCardBlueBg from "public/icons/IconsSection2/CardBlueBg";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import "~/styles/index";

const cards = [
  {
    id: 1,
    logo: <SvgCardYellowLogo className="w-[40%]" />,
    title: <SvgCardYellowTitle />,
    desc: "Say Yes conçoit & coordonne votre identité pour faire rayonner votre marque durablement !",
    cta: <SvgCardYellowCta className="cursor-pointer" />,
    bg: <SvgCardYellowBg className="relative" />,
    image: "./images/illustration_identity.png",
  },
  {
    id: 2,
    logo: <SvgCardPinkLogo className="w-[40%]" />,
    title: <SvgCardPinkTitle />,
    desc: "Say Yes conçoit & coordonne votre identité pour faire rayonner votre marque durablement !",
    cta: <SvgCardPinkCta className="cursor-pointer" />,
    bg: <SvgCardPinkBg className="relative" />,
    image: "./images/illustration_digital.png",
  },
  {
    id: 3,
    logo: <SvgCardBlueLogo className="w-[40%]" />,
    title: <SvgCardBlueTitle />,
    desc: "Say Yes conçoit & coordonne votre identité pour faire rayonner votre marque durablement !",
    cta: <SvgCardBlueCta className="cursor-pointer" />,
    bg: <SvgCardBlueBg className="relative" />,
    image: "./images/illustration_facilitation.png",
  },
];

export default function Section2() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start start", "end end"],
  });

  return (
    <div className="relative w-full h-full">
      <ScrollingBanner />
      <SvgSection2Bg className="absolute top-40" />
      <Intro2 />
      <main className="pt-20 pb-10" ref={container}>
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
      </main>
    </div>
  );
}
