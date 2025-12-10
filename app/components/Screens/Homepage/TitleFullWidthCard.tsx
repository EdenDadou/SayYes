import { useViewport } from "~/utils/hooks/useViewport";
import ParallaxCard from "~/components/Card/ParallaxCard";
import Arrow from "~/assets/icons/Arrow";
import { useRef } from "react";
import Coche from "~/assets/icons/Coche";
import { useScroll } from "framer-motion";
import "~/styles/tailwind.css";
import Card from "~/components/Card";

function AccompagnementCardsParallax() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="relative -mt-20">
      {cardsAccompagnement.map((card, index) => {
        const data = CardsAccompagnement({ ...card, isMobile: false });
        const targetScale =
          index === cardsAccompagnement.length - 1
            ? 1
            : 1 - (cardsAccompagnement.length - index) * 0.06;

        return (
          <ParallaxCard
            key={data.title}
            index={index}
            totalCards={cardsAccompagnement.length}
            content={data.content}
            borderClass={data.borderClass}
            progress={scrollYProgress}
            targetScale={targetScale}
            height={`${data.height}px`}
          />
        );
      })}
    </div>
  );
}

export default function TitleFullWidthCard() {
  const isMobile = useViewport();

  return isMobile ? (
    <section className="w-full pt-20 flex flex-col items-center justify-center gap-6">
      <div className="h-[3px] w-16 holographic-bg rounded-full" />
      <h2 className="font-jakarta-semi-bold text-[30px] leading-[36px] text-center glassy tracking-[-1px]">
        Accompagnement sur-mesure
      </h2>
      <div className="flex flex-col items-center gap-2 w-full text-white font-jakarta-semibold text-[16px] ">
        <p>En co-conception :</p>
        <div className="flex flex-row items-center gap-2">
          <p>Simple</p>
          <Arrow className="w-[18px]" />
          <p>Efficace</p>
          <Arrow className="w-[18px]" />
          <p>Prouvée</p>
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full px-4">
        {cardsAccompagnement.map((card) => {
          const data = CardsAccompagnement({ ...card, isMobile: true });
          return (
            <Card
              key={data.title}
              height="575px"
              borderRadius="28px"
              borderClass="light-border rounded-[28px]"
              content={data.content}
            />
          );
        })}
      </div>
      <div className="flex flex-col gap-4">
        {cardsAccompagnementSmall.map((card) => {
          const data = CardsAccompagnementSmall(card);
          return (
            <div key={card.title} className="w-full">
              {data.content}
            </div>
          );
        })}
      </div>
    </section>
  ) : (
    <section className="w-screen">
      <div className="relative">
        <div className="sticky top-0 -mt-20 w-full h-[120vh] z-0 pointer-events-none overflow-hidden flex items-start">
          <img
            src="./images/homepage/bg-halo.png"
            alt="background"
            className="absolute left-0 top-0 w-[60%] max-w-none h-auto opacity-90 scale-x-[-1] rotate-180"
          />
        </div>
        <div className="relative z-10 -mt-[90vh] flex flex-col justify-center items-center gap-8 w-full">
          <div className="h-[3px] md:w-36 w-20 holographic-bg rounded-full" />
          <h2 className="font-jakarta-semi-bold text-[48px] leading-[56px] text-center glassy tracking-[-1px] whitespace-pre-line">
            {`Accompagnement sur-mesure`}
          </h2>
          <div className="flex flex-row items-center gap-3 w-full justify-center text-white font-jakarta-semibold text-[28px]">
            <p>En co-conception :</p>
            <p>Simple</p>
            <Arrow className="w-[20px]" />
            <p>Efficace</p>
            <Arrow className="w-[20px]" />
            <p>Prouvée</p>
          </div>
          <AccompagnementCardsParallax />
          <div className="flex flex-row items-center gap-8 justify-center -mt-20 w-[988px]">
            {cardsAccompagnementSmall.map((card) => {
              const data = CardsAccompagnementSmall(card);
              return data.content;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export const CardsAccompagnement = ({
  icon,
  title,
  bgImage,
  bgImageMobile,
  liste,
  isMobile,
}: {
  icon: string;
  title: string;
  bgImage: string;
  bgImageMobile: string;
  liste: string[];
  isMobile: boolean;
}) => {
  return {
    height: 490,
    borderRadius: 40,
    title,
    borderClass: "light-border rounded-[40px]",
    content: (
      <div className="h-full w-full md:w-[988px] relative md:p-14 p-6 cursor-pointer shadow-lg overflow-hidden rounded-[40px] max-h-full flex flex-col items-center justify-end">
        <div
          className="absolute top-0 left-0 w-full h-full bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url("${isMobile ? bgImageMobile : bgImage}")`,
            backgroundSize: isMobile ? "contain" : "cover",
          }}
        />
        <div className="border-grey-animed z-10 relative md:h-full h-[344px] md:w-[335px] justify-center rounded-[40px] bg-black/90 max-h-full">
          <div className="relative flex flex-col md:gap-4 gap-2 justify-center py-2 overflow-hidden size-full rounded-[40px] md:p-12 p-6 max-h-full">
            <div className="purple-halo absolute -bottom-100 translate-y-2/3 left-0 w-full h-full z-0" />
            <div className="flex flex-col md:gap-4 gap-2 z-10">
              <div className="md:p-4 p-3 metal w-fit h-fit">
                <img src={icon} alt={title} className="md:h-8 h-5" />
              </div>
              <p className="glassy font-jakarta-semi-bold text-[39px] leading-[61px] tracking-[-1px] whitespace-pre-line">
                {title}
              </p>
              <ul className="flex flex-col gap-4">
                {liste.map((item) => (
                  <li key={item} className="flex flex-row items-center gap-2">
                    <Coche className="w-4 h-4 shrink-0 text-[#DCC4FF]" />
                    <p className="text-white font-jakarta md:text-[16px] text-[14px] leading-[18px] md:tracking-[-1px] tracking-[-0.5px] whitespace-pre-line">
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
    bgImageMobile: "images/homepage/card-accompagnement/bg-1-mobile.png",
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
    bgImageMobile: "images/homepage/card-accompagnement/bg-2-mobile.png",
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
    bgImageMobile: "images/homepage/card-accompagnement/bg-3-mobile.png",
    liste: [
      "Livraison fichiers sources et guide d’utilisation",
      "Formation des équipes",
      "2 mois de support technique inclus",
    ],
  },
];

export const CardsAccompagnementSmall = ({
  icon,
  title,
  liste,
}: {
  icon: string;
  title: string;
  liste: string[];
}) => {
  return {
    content: (
      <div className="border-grey-animed z-10 relative h-[230px] w-full md:w-[476px] justify-center rounded-[40px] bg-black/90">
        <div className="relative flex flex-col gap-4 justify-center py-2 overflow-hidden size-full rounded-[40px] p-12">
          <div className="purple-halo absolute -bottom-100 translate-y-2/3 left-0 w-full h-full z-0" />
          <div className="flex flex-row items-start justify-between">
            <div className="flex flex-col gap-4 z-10">
              <p className="glassy font-jakarta-semi-bold text-[33px] leading-[36px] tracking-[-1px] whitespace-pre-line">
                {title}
              </p>
              <ul className="flex flex-col gap-4">
                {liste.map((item) => (
                  <li key={item} className="flex flex-row items-center gap-2">
                    <Coche className="w-4 h-4 shrink-0 text-[#DCC4FF]" />
                    <p className="text-white font-jakarta text-[16px] leading-[18px] tracking-[-1px] whitespace-pre-line">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 metal w-fit h-fit">
              <img src={icon} alt={title} className="h-8" />
            </div>
          </div>
        </div>
      </div>
    ),
  };
};

const cardsAccompagnementSmall = [
  {
    icon: "images/homepage/card-accompagnement/timer.png",
    title: "Timing",
    liste: [
      "3 à 4 semaines en moyenne",
      "Roadmap viable et personnalisée",
      "Obligation de résultat",
    ],
  },
  {
    icon: "images/homepage/card-accompagnement/courbe.png",
    title: "Résultats",
    liste: [
      "Des projets cohérents de A à Z",
      "Des équipes formées",
      "Une communication qui performe",
    ],
  },
];
