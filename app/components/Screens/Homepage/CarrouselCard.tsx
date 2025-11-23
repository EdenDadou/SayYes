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

export default function CarouselCard() {
  const isMobile = useViewport();

  const container = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress, scrollY } = useScroll({
    target: container,
  });

  // État pour suivre l'index de la carte active
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const activeCardIndexRef = useRef(0);
  const [lastSnapProgress, setLastSnapProgress] = useState(0);
  const lastSnapProgressRef = useRef(0);
  const containerHeightRef = useRef(0);
  const cardWidthRef = useRef(422);
  const cardGapRef = useRef(64); // gap-16 = 64px

  // Fonction pour mesurer les dimensions réelles des cartes
  const measureCardDimensions = () => {
    if (typeof window === "undefined" || !horizontalRef.current) return;

    const container = horizontalRef.current;
    const firstCard = container.firstElementChild as HTMLElement;

    if (firstCard) {
      const cardRect = firstCard.getBoundingClientRect();
      cardWidthRef.current = cardRect.width;

      // Mesurer le gap réel entre les cartes
      const secondCard = firstCard.nextElementSibling as HTMLElement;
      if (secondCard) {
        const secondCardRect = secondCard.getBoundingClientRect();
        const gap = secondCardRect.left - cardRect.right;
        cardGapRef.current = gap;
      }
    }
  };

  // Fonction pour calculer la position x d'une carte à un index donné
  const calculateXForIndex = (index: number) => {
    if (typeof window === "undefined") return 0;

    // Mesurer les dimensions si nécessaire
    measureCardDimensions();

    const centerX = window.innerWidth / 2;
    const cardWidth = cardWidthRef.current;
    const cardGap = cardGapRef.current;
    const totalCardWidth = cardWidth + cardGap;

    // Calculer la position pour centrer la carte au centre de l'écran
    // Le centre de l'écran moins la moitié de la largeur de la carte
    // moins le décalage basé sur l'index
    const cardCenterOffset = cardWidth / 2;
    return centerX - cardCenterOffset - index * totalCardWidth;
  };

  // Créer une MotionValue pour la position x
  const x = useMotionValue(0);

  // Obtenir la hauteur du container au montage et calculer la position initiale
  useEffect(() => {
    if (container.current && typeof window !== "undefined") {
      // La hauteur du container est 900vh
      containerHeightRef.current = window.innerHeight * 9; // 900vh = 9 * 100vh

      // Attendre que les cartes soient rendues pour mesurer leurs dimensions
      const timeoutId = setTimeout(() => {
        measureCardDimensions();
        // Calculer la position x initiale pour centrer la première carte
        x.set(calculateXForIndex(0));
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  // Recalculer les dimensions lors du redimensionnement de la fenêtre
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      measureCardDimensions();
      // Recalculer la position pour la carte active
      x.set(calculateXForIndex(activeCardIndex));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeCardIndex]);

  // Synchroniser le ref avec l'état
  useEffect(() => {
    activeCardIndexRef.current = activeCardIndex;
  }, [activeCardIndex]);

  // Mettre à jour la position x quand l'index change
  useEffect(() => {
    if (typeof window !== "undefined") {
      x.set(calculateXForIndex(activeCardIndex));
    }
  }, [activeCardIndex]);

  // Écouter le scroll et déterminer quelle carte doit être active
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!container.current || containerHeightRef.current === 0) return;

    // Convertir le progress en pixels
    const currentScrollPx = latest * containerHeightRef.current;
    const lastSnapPx = lastSnapProgressRef.current * containerHeightRef.current;
    const scrollDelta = Math.abs(currentScrollPx - lastSnapPx);

    // Ne changer de carte que si on a scrollé au moins 100px depuis le dernier snap
    if (scrollDelta >= 150) {
      const direction = latest > lastSnapProgressRef.current ? 1 : -1;
      const currentIndex = activeCardIndexRef.current;
      const newIndex = Math.max(
        0,
        Math.min(supports.length - 1, currentIndex + direction)
      );

      // Ne mettre à jour que si l'index change réellement
      if (newIndex !== currentIndex) {
        activeCardIndexRef.current = newIndex;
        setActiveCardIndex(newIndex);
        lastSnapProgressRef.current = latest;
        setLastSnapProgress(latest);
        // Mettre à jour la position x pour centrer la nouvelle carte
        x.set(calculateXForIndex(newIndex));
      }
    }
  });

  // Utiliser useSpring pour un mouvement fluide
  const springX = useSpring(x, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  return isMobile ? (
    <MobileLayout>
      <div>TODO</div>
    </MobileLayout>
  ) : (
    <div className="w-screen relative mb-[60vh]">
      <section
        ref={container}
        className="relative z-10 flex flex-col justify-start items-start gap-8 h-[500vh]"
      >
        <div className="sticky -top-0 h-screen flex justify-center flex-col w-full items-center gap-6">
          <BackgroundSideLueur className="absolute right-0 h-auto z-0 w-1/2 top-80" />
          <BackgroundSideLueur className="scale-x-[-1] absolute left-0 h-auto z-0 w-[60%]" />
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
            style={{ x: springX }}
            ref={horizontalRef}
            className="flex flex-row w-screen h-fit mt-5 z-20 gap-16"
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
                  isSnapped={activeCardIndex === index}
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
    borderClass: "light-border rounded-[40px]",
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
