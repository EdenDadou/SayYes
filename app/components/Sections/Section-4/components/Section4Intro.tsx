import SvgSection4Intro from "~/assets/icons/IconsSection4/Section4Intro";
import SvgCardKickOff from "~/assets/icons/IconsSection4/CardKickOff";
import SvgCardConception from "~/assets/icons/IconsSection4/CardConception";
import SvgCardCreation from "~/assets/icons/IconsSection4/CardCreation";
import SvgCardDeclinaison from "~/assets/icons/IconsSection4/CardDeclinaison";
import SvgCardLivraison from "~/assets/icons/IconsSection4/CardLivraison";
import { useInView } from "react-intersection-observer";
import { AnimatedCard } from "./AnimatedCard";
import "~/styles/index";
import useDetectScroll from "@smakss/react-scroll-direction";

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
  const { scrollDir } = useDetectScroll();

  const { ref, inView } = useInView({
    threshold: scrollDir === "down" ? 0.9 : 0.1, // Trigger when 10% of the card is visible
  });
  return (
    <div className="flex flex-col  items-center w-full px-10 z-20 h-full">
      <div className="flex flex-col justify-center items-center max-w-[1200px] gap-8">
        <SvgSection4Intro />
        <p className="text-black text-2xl font-bold font-jakarta w-2/3 text-center">
          Gardez la main sur le process de création tout en libérant votre
          inspiration.
        </p>
      </div>
      <div className="relative w-screen h-[500px]">
        <div
          className="flex flex-row w-screen absolute left-0 h-fit top-20"
          ref={ref}
        >
          {cards.map((item, index) => (
            <AnimatedCard
              key={index}
              svg={item.svg}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
