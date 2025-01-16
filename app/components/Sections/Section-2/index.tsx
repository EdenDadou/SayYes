import SvgSection2Bg from "~/components/Sections/Section-2/components/assets/Section2Bg";
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
import { useScroll } from "framer-motion";
import Halo from "~/components/Halo";

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
      <Halo size={700} rotation={30} style={{ top: "5%", left: "-10%" }} />
      <Halo size={700} rotation={30} style={{ top: "10%", right: "-10%" }} />

      <SvgSection2Bg className="absolute z-10" />
      <Intro2 />

      <main className="pb-10" ref={container}>
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
