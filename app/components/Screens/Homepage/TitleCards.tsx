import { useViewport } from "~/utils/hooks/useViewport";
import { lazy, Suspense } from "react";
import MobileLayout from "~/components/Layout/Mobile";
import Card from "~/components/Card";
import "~/styles/tailwind.css";

const BackgroundSideLueur = lazy(
  () => import("~/assets/icons/BacgroundSideLueur")
);

interface ITitleCardsProps {
  title: string;
  rowCards: {
    height: number;
    image: string;
    borderRadius?: string;
    borderClass?: string;
    content: React.ReactNode;
  }[];
  bottomCard?: {
    height: number;
    image: string;
    borderRadius?: string;
    borderClass?: string;
    content: React.ReactNode;
  };
}

export default function TitleCards({
  title,
  rowCards,
  bottomCard,
}: ITitleCardsProps) {
  const isMobile = useViewport();

  return isMobile ? (
    <MobileLayout>
      <div>TODO</div>
    </MobileLayout>
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
            {title}
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-full flex flex-row gap-4">
            {rowCards.map((card, index) => (
              <Card
                key={index}
                height={card.height + "px"}
                borderRadius={card.borderRadius + "px"}
                content={card.content}
                borderClass={card.borderClass}
              />
            ))}
          </div>
          {bottomCard ? (
            <Card
              height={bottomCard.height + "px"}
              borderRadius={bottomCard.borderRadius + "px"}
              content={bottomCard.content}
              borderClass={bottomCard.borderClass}
            />
          ) : null}
        </div>
      </section>
    </div>
  );
}
