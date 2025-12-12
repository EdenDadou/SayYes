import { useViewport } from "~/utils/hooks/useViewport";
import Card from "~/components/Card";
import Arrow from "~/assets/icons/Arrow";
import BackgroundSideLueur from "~/assets/icons/BacgroundSideLueur";
import "~/styles/tailwind.css";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function CarouselCard() {
  const isMobile = useViewport();

  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  // Calculer la largeur totale du contenu horizontal
  useEffect(() => {
    if (horizontalRef.current) {
      const totalWidth = horizontalRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      // Padding supplémentaire après la dernière carte (24vw)
      const endPadding = viewportWidth * 0.24;
      setScrollRange(totalWidth - viewportWidth + endPadding);
    }
  }, []);

  // useScroll avec offset pour contrôler quand l'animation commence/finit
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transformer le scroll vertical en déplacement horizontal
  // scrollYProgress va de 0 à 1, on le transforme en translation X
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return isMobile ? (
    <section className="w-full  flex flex-col  gap-6 relative overflow-x-clip">
      <div className="absolute -translate-x-1 w-[200%] h-full">
        <img
          src="./images/homepage/bg-halo.png"
          alt="background"
          className=" h-auto w-full rotate-180 scale-x-[-1]"
        />
      </div>
      <div className="flex flex-col items-center gap-6 px-5">
        <div className="h-[3px] w-16 holographic-bg rounded-full" />
        <h2 className="font-jakarta-semi-bold text-[30px] leading-[36px] text-center glassy tracking-[-1px] whitespace-pre-line">
          {`Nous designons tous vos\nsupports de communication !`}
        </h2>
      </div>
      <div className="flex flex-row items-center justify-center gap-2 w-full text-white font-jakarta-semibold text-[16px] flex-wrap">
        <p>Branding</p>
        <Arrow className="w-[18px]" />
        <p>Print</p>
        <Arrow className="w-[18px]" />
        <p>Digital</p>
        <Arrow className="w-[18px]" />
        <p>Vidéo</p>
        <Arrow className="w-[18px]" />
        <p>Facilitation graphique</p>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 px-8 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {supports.map((card, index) => {
          const data = CardsSupport(card);
          return (
            <div
              key={`card_${index}`}
              className="flex-shrink-0 w-[260px]"
              style={{ scrollSnapAlign: "start" }}
            >
              <Card
                key={data.name}
                height="260px"
                borderRadius="28px"
                content={data.content}
                borderClass={data.borderClass}
              />
            </div>
          );
        })}
      </div>
    </section>
  ) : (
    <section ref={containerRef} className="relative w-screen">
      {/* Conteneur avec hauteur pour créer la zone de scroll */}
      {/* La hauteur détermine combien il faut scroller pour parcourir toutes les cartes */}
      <div style={{ height: `${supports.length * 50}vh` }}>
        {/* Sticky container qui reste fixe pendant le scroll */}
        <div className="sticky top-0 h-screen flex flex-col justify-center items-center">
          {/* Backgrounds positionnés en dehors du flux */}
          <BackgroundSideLueur className="absolute right-0 h-auto z-0 w-1/2 top-80 pointer-events-none" />
          <BackgroundSideLueur className="scale-x-[-1] absolute left-0 h-auto z-0 w-[60%] pointer-events-none" />

          <div className="h-[3px] md:w-36 w-20 holographic-bg rounded-full" />
          <h2 className="font-jakarta-semi-bold text-[48px] leading-[56px] text-center glassy tracking-[-1px] whitespace-pre-line mt-6">
            {`Nous designons tous vos\n supports de communication !`}
          </h2>
          <div className="flex flex-row items-center gap-3 w-full justify-center text-white font-jakarta-semibold text-[28px] mt-6">
            <p>Branding</p>
            <Arrow className="w-[22px]" />
            <p>Print</p>
            <Arrow className="w-[22px]" />
            <p>Digital</p>
            <Arrow className="w-[22px]" />
            <p>Vidéo</p>
            <Arrow className="w-[22px]" />
            <p>Facilitation graphique</p>
          </div>

          {/* Conteneur horizontal qui se déplace */}
          <div className="w-full overflow-hidden">
            <motion.div
              ref={horizontalRef}
              style={{ x }}
              className="flex gap-10 mt-12 pl-[calc(24vw)] pr-[calc(24vw)]"
            >
              {supports.map((card, index) => {
                const data = CardsSupport(card);
                return (
                  <div key={`card_${index}`} className="flex-shrink-0">
                    <Card
                      key={data.name}
                      height={data.height + "px"}
                      borderRadius={data.borderRadius + "px"}
                      content={data.content}
                      borderClass={data.borderClass}
                    />
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
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
    borderClass: "light-border rounded-[40px]",
    content: (
      <div className="h-full w-full md:w-[422px] relative md:p-8 p-4 cursor-pointer shadow-lg overflow-hidden backdrop-blur-sm bg-white/5 rounded-[40px]">
        <div
          className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] object-cover bg-center bg-no-repeat bg-cover z-0 rounded-[34px]"
          style={{
            backgroundImage: `url("${image}")`,
          }}
        />
        <div className="z-10 relative flex flex-col gap-4 h-full justify-end pt-4 pb-2 text-white">
          <p className="glassy font-jakarta-semi-bold text-[36px] leading-[36px] tracking-[-1px] whitespace-pre-line text-center pb-1">
            {name}
          </p>
        </div>
      </div>
    ),
  };
};

const supports = [
  {
    name: "Identité visuelle.",
    image: "./images/homepage/carousel-cards/card1.png",
  },
  {
    name: "Supports de com’.",
    image: "./images/homepage/carousel-cards/card2.png",
  },
  {
    name: "Présentation.",
    image: "./images/homepage/carousel-cards/card3.png",
  },
  {
    name: "Site web & App.",
    image: "./images/homepage/carousel-cards/card4.png",
  },
  {
    name: "Vidéo & Motion.",
    image: "./images/homepage/carousel-cards/card5.png",
  },
  {
    name: "Illustration.",
    image: "./images/homepage/carousel-cards/card6.png",
  },
  {
    name: "Fresque murale.",
    image: "./images/homepage/carousel-cards/card7.png",
  },
  {
    name: "Live sketching.",
    image: "./images/homepage/carousel-cards/card8.png",
  },
];
