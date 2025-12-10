import { useViewport } from "~/utils/hooks/useViewport";
import { Suspense, useRef } from "react";
import Card from "~/components/Card";
import ParallaxCard from "~/components/Card/ParallaxCard";
import { useScroll } from "framer-motion";
import "~/styles/tailwind.css";
import {
  CardBottomIdentiteVisuelle,
  CardsIdentiteVisuelle,
  contentIdentiteVisuelle,
} from "./TitleCards.helpers";

// Composant Cards parallax pour mobile
function TitleCardsParallaxMobile() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const rowCards = contentIdentiteVisuelle.map((card) =>
    CardsIdentiteVisuelle({ ...card, isMobile: true })
  );
  const bottomCard = CardBottomIdentiteVisuelle;
  const allCards = [...rowCards, bottomCard];

  return (
    <div ref={container} className="relative w-full px-6">
      {allCards.map((card, index) => {
        const targetScale =
          index === allCards.length - 1
            ? 1
            : 1 - (allCards.length - index) * 0.03;
        return (
          <ParallaxCard
            key={index}
            index={index}
            totalCards={allCards.length}
            content={card.content}
            borderClass={card.borderClass}
            progress={scrollYProgress}
            targetScale={targetScale}
            isMobile
            height={
              index === allCards.length - 1 ? "146px" : `${card.height}px`
            }
          />
        );
      })}
    </div>
  );
}

export default function TitleCards() {
  const isMobile = useViewport();

  const getBorderRadius = (value?: string | number) => {
    if (typeof value === "number") return `${value}px`;
    return value;
  };

  const rowCards = contentIdentiteVisuelle.map((card) =>
    CardsIdentiteVisuelle({ ...card, isMobile: false })
  );

  const bottomCard = CardBottomIdentiteVisuelle;

  return isMobile ? (
    <section className="w-full flex flex-col gap-6 items-center relative">
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none overflow-hidden">
        <div className="sticky top-0 h-screen w-full">
          <div className="absolute left-1/2 -translate-x-1/2 w-[200%] h-full">
            <Suspense fallback={<div />}>
              <img
                src="./images/homepage/bg-halo.png"
                alt="background"
                className="absolute right-0 h-auto w-full rotate-180 top-0"
              />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="relative z-10 h-[3px] w-16 holographic-bg rounded-full" />
      <h2 className="relative z-10 text-center glassy font-jakarta-semi-bold text-[34px] leading-[40px] tracking-[-1px] whitespace-pre-line">
        {`Reprenez la main\nsur votre\nidentité visuelle !`}
      </h2>
      <div className="relative z-10 w-full">
        <TitleCardsParallaxMobile />
      </div>
    </section>
  ) : (
    <div className="w-screen">
      <div className="absolute left-0 right-0 h-auto z-0 opacity-80 flex flex-row justify-between w-screen">
        <Suspense fallback={<div className="scale-x-[-1]" />}>
          {/* <BackgroundSideLueur className="scale-x-[-1]" /> */}
          <img
            src="./images/homepage/bg-halo.png"
            alt="background"
            className="scale-x-[-1] absolute left-0 h-auto z-0 w-1/2 rotate-180 top-0"
          />
        </Suspense>

        <Suspense fallback={<div />}>
          <img
            src="./images/homepage/bg-halo.png"
            alt="background"
            className="absolute right-0 h-auto z-0 w-1/2 rotate-180 top-0"
          />
          {/* <BackgroundSideLueur /> */}
        </Suspense>
      </div>
      <section className="relative z-10 md:w-[988px] mx-auto flex flex-col justify-center items-center overflow-hidden gap-16 pt-48 pb-14">
        <div className="flex flex-col items-center w-[988px] justify-center gap-10">
          <div className="h-[3px] md:w-36 w-20 holographic-bg rounded-full" />
          <h2 className="glassy font-jakarta-semi-bold text-[56px] text-center leading-[52px] w-[55%] tracking-[-3px] weight-600">
            Reprenez la main sur votre identité visuelle !
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-full flex flex-row gap-4">
            {rowCards.map((card, index) => (
              <Card
                key={index}
                height={card.height + "px"}
                borderRadius={getBorderRadius(card.borderRadius)}
                content={card.content}
                borderClass={card.borderClass}
              />
            ))}
          </div>
          {bottomCard ? (
            <Card
              height={bottomCard.height + "px"}
              borderRadius={getBorderRadius(bottomCard.borderRadius)}
              content={bottomCard.content}
              borderClass={bottomCard.borderClass}
            />
          ) : null}
        </div>
      </section>
    </div>
  );
}
