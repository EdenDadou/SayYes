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

  // Hauteur du container paramétrable
  const CONTAINER_HEIGHT_VH = 1000;

  // État pour suivre l'index de la carte active
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const cardWidthRef = useRef(422);
  const cardGapRef = useRef(64); // gap-16 = 64px
  const lastScrollPxRef = useRef(0); // Dernière position de scroll en pixels
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Timeout pour détecter la fin du scroll

  // Fonction pour définir les dimensions des cartes (valeurs fixes)
  const measureCardDimensions = () => {
    // Cartes de 422px de large avec gap-16 (64px) entre chaque carte
    cardWidthRef.current = 422;
    cardGapRef.current = 64;
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

  // Calculer les positions de snap : au milieu de chaque section
  // Section par carte = CONTAINER_HEIGHT_VH / nombre de cartes
  // Snap pour carte i = (i * sectionHeight) + (sectionHeight / 2)
  const snapPositions = useMemo(() => {
    const sectionHeight = CONTAINER_HEIGHT_VH / supports.length;
    return supports.map((_, index) => {
      const snapVh = index * sectionHeight + sectionHeight / 2;
      // Convertir en progress (0-1)
      return snapVh / CONTAINER_HEIGHT_VH;
    });
  }, []);

  // Obtenir la hauteur du container au montage et calculer la position initiale
  useEffect(() => {
    if (typeof window !== "undefined" && container.current) {
      const containerHeight = (window.innerHeight * CONTAINER_HEIGHT_VH) / 100;
      // Initialiser la position de référence au snap de la première carte
      lastScrollPxRef.current = snapPositions[0] * containerHeight;

      // Attendre que les cartes soient rendues pour mesurer leurs dimensions
      // const timeoutId = setTimeout(() => {
      //   measureCardDimensions();
      //   // Calculer la position x initiale pour centrer la première carte
      //   x.set(calculateXForIndex(0));
      // }, 100);

      // return () => clearTimeout(timeoutId);
    }
  }, []);

  // Mettre à jour la position x quand l'index change
  useEffect(() => {
    if (typeof window !== "undefined") {
      x.set(calculateXForIndex(activeCardIndex));
    }
  }, [activeCardIndex]);

  // Nettoyer le timeout au démontage
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Écouter le scroll et déterminer quelle carte doit être active
  // Vérifier à la fin du scroll (après 150ms d'inactivité) si on a scrollé de plus de 80 pixels
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (typeof window === "undefined" || !container.current) return;

    // Annuler le timeout précédent
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Attendre 150ms après la fin du scroll pour vérifier
    scrollTimeoutRef.current = setTimeout(() => {
      const containerHeight = (window.innerHeight * CONTAINER_HEIGHT_VH) / 100;
      const currentScrollPx = latest * containerHeight;
      const scrollDelta = Math.abs(currentScrollPx - lastScrollPxRef.current);

      // Si on a scrollé de plus de 80 pixels, changer de snap
      if (scrollDelta >= 80) {
        const direction = currentScrollPx > lastScrollPxRef.current ? 1 : -1;
        const newIndex = Math.max(
          0,
          Math.min(supports.length - 1, activeCardIndex + direction)
        );

        // Mettre à jour seulement si l'index change
        if (newIndex !== activeCardIndex) {
          setActiveCardIndex(newIndex);
          // Mettre à jour la position de référence au snap correspondant
          const snapProgress = snapPositions[newIndex];
          const snapPositionPx = snapProgress * containerHeight;
          lastScrollPxRef.current = snapPositionPx;

          // Scroller automatiquement jusqu'à la position du snap
          if (container.current) {
            // Calculer la position actuelle du scroll dans le container
            const currentScrollInContainer = latest * containerHeight;

            // Calculer la différence entre la position cible et la position actuelle
            const scrollDelta = snapPositionPx - currentScrollInContainer;

            // Ajouter cette différence à la position actuelle du scroll de la fenêtre
            const currentWindowScrollY = window.scrollY;
            const targetScrollY = currentWindowScrollY + scrollDelta;

            window.scrollTo({
              top: targetScrollY,
              behavior: "smooth",
            });
          }
        } else {
          // Si on ne peut pas changer d'index, mettre à jour la référence quand même
          lastScrollPxRef.current = currentScrollPx;
        }
      }
    }, 300);
  });

  // Utiliser useSpring pour un mouvement fluide
  const springX = useSpring(x, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  // Transformer scrollYProgress en largeur de barre (0-100%)
  const progressBarWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return isMobile ? (
    <MobileLayout>
      <div>TODO</div>
    </MobileLayout>
  ) : (
    <div className="w-screen relative mb-[60vh]">
      {/* Barre de progression du scroll pour débogage */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <motion.div
          className="h-full bg-pink-500"
          style={{ width: progressBarWidth }}
        />
      </div>
      <section
        ref={container}
        className="relative z-10 flex flex-col justify-start items-start gap-8"
        style={{ height: `${CONTAINER_HEIGHT_VH}vh` }}
      >
        <div className="sticky top-0 h-screen flex justify-center flex-col w-full items-center gap-6">
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
