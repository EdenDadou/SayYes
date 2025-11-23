import { useViewport } from "~/utils/hooks/useViewport";
import MobileLayout from "~/components/Layout/Mobile";
import Card from "~/components/Card";
import Arrow from "~/assets/icons/Arrow";
import BackgroundSideLueur from "~/assets/icons/BacgroundSideLueur";
import "~/styles/tailwind.css";
import { AnimatedCard } from "~/components/Card/AnimatedCard";
import {
  useInView,
  useScroll,
  useTransform,
  motion,
  useSpring,
  useMotionValueEvent,
  useMotionValue,
} from "framer-motion";
import { useRef, useMemo, useState, useEffect } from "react";
import Coche from "~/assets/icons/Coche";

export default function TitleFullWidthCard() {
  const isMobile = useViewport();

  const container = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress, scrollY } = useScroll({
    target: container,
  });

  return isMobile ? (
    <MobileLayout>
      <div>TODO</div>
    </MobileLayout>
  ) : (
    <div className="w-screen pb-[60vh]">
      <section
        ref={container}
        className="relative z-10 flex flex-col justify-start items-start gap-8"
      >
        <div className="h-screen flex justify-center flex-col w-full items-center gap-6">
          <BackgroundSideLueur className="absolute right-0 h-auto z-0 w-1/2 top-80" />
          <BackgroundSideLueur className="scale-x-[-1] absolute left-0 h-auto z-0 w-[60%]" />
          <div className="h-[3px] md:w-36 w-20 holographic-bg rounded-full" />
          <h2 className="font-jakarta-semi-bold text-[48px] leading-[56px] text-center glassy tracking-[-1px] whitespace-pre-line">
            {`Accompagnement sur-mesure`}
          </h2>
          <div className="flex flex-row items-center gap-3 w-full justify-center text-white font-jakarta-semibold text-[28px]">
            <p>En co-conception :</p>
            <p>Simple</p>
            <Arrow className="w-4" />
            <p>Efficace</p>
            <Arrow className="w-4" />
            <p>Prouvée</p>
          </div>
          <div className="flex flex-col gap-8">
            {cardsAccompagnement.map((card) => {
              const data = CardsAccompagnement(card);
              return (
                <Card
                  key={data.title}
                  height={data.height + "px"}
                  borderRadius={data.borderRadius + "px"}
                  content={data.content}
                  borderClass={data.borderClass}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export const CardsAccompagnement = ({
  icon,
  title,
  bgImage,
  liste,
}: {
  icon: string;
  title: string;
  bgImage: string;
  liste: string[];
}) => {
  return {
    height: 488,
    borderRadius: 40,
    title,
    borderClass: "light-border rounded-[40px]",
    content: (
      <div className="h-full w-[988px] relative md:p-12 p-4 cursor-pointer shadow-lg overflow-hidden backdrop-blur-sm bg-white/5 rounded-[40px]">
        <div
          className="absolute top-0 left-0 w-full h-full object-cover bg-center bg-no-repeat bg-cover z-0"
          style={{
            backgroundImage: `url("${bgImage}")`,
          }}
        />
        <div className="border-grey-animed z-10 relative h-[388px] w-[340px] justify-center rounded-[40px] bg-black/90">
          <div className="relative flex flex-col gap-4 justify-center py-2 overflow-hidden size-full rounded-[40px] p-8">
            <div className="purple-halo absolute -bottom-100 translate-y-2/3 left-0 w-full h-full z-0" />
            <div className="flex flex-col gap-4 z-10">
              <div className="p-4 metal w-fit h-fit">
                <img src={icon} alt={title} className="h-8" />
              </div>
              <p className="glassy font-jakarta-semi-bold text-[33px] leading-[36px] tracking-[-1px] whitespace-pre-line">
                {title}
              </p>
              <ul className="flex flex-col gap-2">
                {liste.map((item) => (
                  <li key={item} className="flex flex-row items-center gap-2">
                    <Coche className="w-4 text-[#DCC4FF]" />
                    <p className="text-white font-jakarta text-[18px] leading-[24px] tracking-[-1px] whitespace-pre-line">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  };
};

const cardsAccompagnement = [
  {
    icon: "images/homepage/card-accompagnement/ampoule.png",
    title: "On conseille",
    bgImage: "images/homepage/card-accompagnement/bg-1.png",
    liste: [
      "Brief stratégique et audit de l’existant",
      "Benchmark concurrentiel",
      "Recommandations créatives argumentées",
    ],
  },
  {
    icon: "images/homepage/card-accompagnement/pen.png",
    title: "On Design",
    bgImage: "images/homepage/card-accompagnement/bg-2.png",
    liste: [
      "Moodboard et ateliers",
      "3 pistes créatives uniques",
      "Allers-retours illimités",
      "Déclinaisons multi-supports",
    ],
  },
  {
    icon: "images/homepage/card-accompagnement/setting.png",
    title: "On Équipe",
    bgImage: "images/homepage/card-accompagnement/bg-3.png",
    liste: [
      "Livraison fichiers sources et guide d’utilisation",
      "Formation des équipes",
      "2 mois de support technique inclus",
    ],
  },
];
