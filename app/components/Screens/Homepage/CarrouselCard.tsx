import { useViewport } from "~/utils/hooks/useViewport";
import MobileLayout from "~/components/Layout/Mobile";
import Card from "~/components/Card";
import Arrow from "~/assets/icons/Arrow";
import BackgroundSideLueur from "~/assets/icons/BacgroundSideLueur";
import "~/styles/tailwind.css";
import { AnimatedCard } from "~/components/Card/AnimatedCard";
import { useInView, useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function CarouselCard() {
  const isMobile = useViewport();

  const container = useRef(null);
  const horizontalRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
  });

  const x = useTransform(scrollYProgress, [0, 0.8], ["5%", "-20%"]);

  return isMobile ? (
    <MobileLayout>
      <div>TODO</div>
    </MobileLayout>
  ) : (
    <div className="w-screen relative">
      <BackgroundSideLueur className="absolute right-0 h-auto z-0 w-1/2 top-80" />
      <BackgroundSideLueur className="scale-x-[-1] absolute left-0 h-auto z-0 w-[60%]" />
      <section
        ref={container}
        className="relative z-10 md:w-[988px] mx-auto flex flex-col justify-start items-center gap-8 py-52 h-[300vh]"
      >
        <div className="sticky -top-0 h-screen  flex justify-center flex-col w-full items-center">
          <div className="h-[3px] md:w-36 w-20 holographic-bg rounded-full" />
          <h2 className="font-jakarta-semi-bold text-[48px] leading-[56px] text-center glassy tracking-[-1px] whitespace-pre-line">
            {`Nous designons tous vos\n supports de communication !`}
          </h2>
          <div className="flex flex-row items-center gap-3 w-full justify-center text-white font-jakarta-semibold text-[28px]">
            <p>Branding</p>
            <Arrow className="w-4" />
            <p>Print</p>
            <Arrow className="w-4" />
            <p>Digital</p>
            <Arrow className="w-4" />
            <p>Vidéo</p>
            <Arrow className="w-4" />
            <p>Facilitation graphique</p>
          </div>
          <motion.div
            style={{ x }}
            ref={horizontalRef}
            className="flex flex-row w-screen h-fit mt-5 z-20"
          >
            {supports.map((card, index) => {
              const data = CardsSupport(card);
              return (
                <AnimatedCard
                  i={index}
                  key={`p_${index}`}
                  card={
                    <Card
                      key={data.name}
                      height={data.height + "px"}
                      borderRadius={data.borderRadius + "px"}
                      content={data.content}
                      borderClass={data.borderClass}
                    />
                  }
                  progress={scrollYProgress}
                />
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export const CardsSupport = ({
  name,
  image,
}: {
  name: string;
  image: string;
}) => {
  return {
    height: 422,
    image: "./images/homepage/identite-visuelle-1.png",
    borderRadius: 40,
    name,
    borderClass: "light-border",
    content: (
      <div className="h-full w-[422px] relative md:p-8 p-4 cursor-pointer shadow-lg overflow-hidden backdrop-blur-sm bg-white/5 rounded-[40px]">
        <div
          className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] object-cover bg-center bg-no-repeat bg-cover z-0 rounded-[34px]"
          style={{
            backgroundImage: `url("${image}")`,
          }}
        />
        <div className="z-10 relative flex flex-col gap-4 h-full justify-end py-2 text-white">
          <p className="glassy font-jakarta-semi-bold text-[33px] leading-[36px] tracking-[-1px] whitespace-pre-line">
            {name}
          </p>
        </div>
      </div>
    ),
  };
};

const supports = [
  {
    name: "Identité visuelle",
    image: "./images/homepage/carousel-cards/card1.png",
  },
  {
    name: "Supports de com’",
    image: "./images/homepage/carousel-cards/card2.png",
  },
  {
    name: "Présentation",
    image: "./images/homepage/carousel-cards/card3.png",
  },
  {
    name: "Site web & App",
    image: "./images/homepage/carousel-cards/card4.png",
  },
  {
    name: "Vidéo & Motion",
    image: "./images/homepage/carousel-cards/card5.png",
  },
  {
    name: "Illustration",
    image: "./images/homepage/carousel-cards/card6.png",
  },
  {
    name: "Fresque murale",
    image: "./images/homepage/carousel-cards/card7.png",
  },
  {
    name: "Live sketching",
    image: "./images/homepage/carousel-cards/card8.png",
  },
];
