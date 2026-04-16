import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArrowLight from "~/assets/icons/ArrowLight";
import Card from "~/components/Card";
import NoteStar from "~/assets/icons/NoteStar";
import ScrollingBanner from "~/components/BrandBanner/ScrollingBanner";
import OptimizedImage from "~/components/ui/OptimizedImage";
import { useViewport } from "~/utils/hooks/useViewport";
import ScrollingBannerMobile from "~/components/BrandBanner/ScrollingBannerMobile";

export default function TemoignagesCards() {
  const isMobile = useViewport();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemsPerView = 4; // Affiche 4 cartes: 2 complètes au centre + 2 bouts sur les côtés

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % temoignagesCards.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? temoignagesCards.length - 1 : prevIndex - 1
    );
  };

  // Get items for display: 3 full cards centered + 1 partial right
  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < itemsPerView; i++) {
      const index =
        (currentIndex + i + temoignagesCards.length) % temoignagesCards.length;
      items.push({ ...temoignagesCards[index], position: i });
    }
    return items;
  };

  // Card width + gap
  const cardWidth = 314;
  const mobileCardWidth = 280;
  const gap = 16;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? cardWidth + gap : -(cardWidth + gap),
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (_direction: number) => ({
      zIndex: 0,
      opacity: 1,
    }),
  };

  const swipeConfidenceThreshold = 5000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div
      className={`relative w-full flex flex-col pt-8 md:pt-16 gap-8 md:gap-16 z-10`}
    >
      <OptimizedImage
        src="./images/homepage/bg-halo.png"
        alt="background"
        className="absolute inset-0 w-full md:w-1/2 h-full object-cover z-[-1] opacity-60 md:opacity-100"
        mobileSize="tablet"
        desktopSize="tablet"
        noPlaceholder
        noMobileOptimization
      />
      {/* Title Section */}
      <div className="max-w-[990px] m-auto flex flex-col items-center gap-4 px-4">
        <div className="h-[3px] md:w-36 w-20 holographic-bg rounded-full my-4 md:my-8" />
        <div className="flex flex-row font-jakarta-semibold text-[20px] md:text-[27px] leading-[24px] md:leading-[30px] text-white items-center gap-2">
          <NoteStar className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
          <span>Sortlist 4.9 I 5</span>
        </div>
        <h2 className="font-jakarta-semi-bold text-[28px] md:text-[48px] leading-[32px] md:leading-[50px] text-center glassy tracking-[-1px] whitespace-pre-line">
          {`Ils en parlent mieux que nous`}
        </h2>
      </div>

      {/* Mobile Carousel - Scroll horizontal */}
      <div className="md:hidden w-full">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {temoignagesCards.map((temoignage, index) => {
            const data = CardsTemoignage(temoignage);
            return (
              <div
                key={`mobile-${temoignage.auteur}-${index}`}
                className="flex-shrink-0 snap-center first:ml-0 last:mr-0"
                style={{ width: `${mobileCardWidth}px` }}
              >
                <Card
                  height="420px"
                  borderRadius={data.borderRadius + "px"}
                  content={data.content}
                  borderClass={data.borderClass}
                />
              </div>
            );
          })}
        </div>
        {/* Indicateurs de pagination mobile */}
        <div className="flex justify-center gap-2 mt-4">
          {temoignagesCards.map((_, index) => (
            <div
              key={`dot-${index}`}
              className="w-2 h-2 rounded-full bg-white/30"
            />
          ))}
        </div>
      </div>

      {/* Desktop Carousel Container */}
      <div className="hidden md:block relative w-full overflow-hidden">
        {/* Gradient overlay droite pour effet partial sur la 4ème card */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute right-0 top-0 bottom-0 w-[180px] bg-gradient-to-l from-[#0a0a0a] to-transparent" />
        </div>
        {/* Carousel Content */}
        <div className="relative h-[460px] w-full">
          {/* Navigation Arrows - à cheval sur les bords des 3 cards visibles */}
          <div className="absolute top-1/2 -translate-y-1/2 w-[1050px] left-1/2 -translate-x-1/2 flex flex-row justify-between items-center z-20 pointer-events-none">
            <button
              onClick={prevSlide}
              className="z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-300 group pointer-events-auto"
              aria-label="Projet précédent"
              style={{ visibility: currentIndex === 0 ? "hidden" : "visible" }}
            >
              <ArrowLight className="w-[77px] h-[77px] text-white rotate-180 group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={nextSlide}
              className="z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-300 group pointer-events-auto"
              aria-label="Projet suivant"
            >
              <ArrowLight className="w-[77px] h-[77px] text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 25, mass: 0.8 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                // Déclenche soit par vélocité, soit par distance parcourue
                if (swipe < -swipeConfidenceThreshold || offset.x < -100) {
                  nextSlide();
                } else if (swipe > swipeConfidenceThreshold || offset.x > 100) {
                  prevSlide();
                }
              }}
              className="absolute flex items-center -translate-y-1/2"
              style={{
                gap: `${gap}px`,
                // 3 cards centered + 1 partial right
                left: `calc(50% - ${cardWidth * 1.5 + gap}px)`,
              }}
            >
              {getVisibleItems().map((temoignage) => {
                const data = CardsTemoignage(temoignage);
                return (
                  <div
                    key={`${temoignage.auteur}-${temoignage.position}`}
                    className="flex-shrink-0"
                    style={{ width: `${cardWidth}px`, pointerEvents: "auto" }}
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    <Card
                      height={data.height + "px"}
                      borderRadius={data.borderRadius + "px"}
                      content={data.content}
                      borderClass={data.borderClass}
                    />
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {isMobile ? <ScrollingBannerMobile /> : <ScrollingBanner />}
    </div>
  );
}

const temoignagesCards = [
  {
    logo: "./images/homepage/logos_testimoniaux/logo_volvo.svg",
    texte:
      "“ Say Yes nous a accompagné dans notre projet du début à la fin, en prenant en considération tous nos besoins et nos attentes. L’équipe à été force de proposition et a réalisé une prestation impeccable devant nos clients. ”",
    auteur: "Tiffanie Juge",
    poste: "Responsable développement",
  },
  {
    logo: "./images/homepage/logos_testimoniaux/logo_societe_generale.svg",
    texte:
      "“ C’est la 1ère fois en 20 ans que je rencontre une telle équipe capable de s’adapter parfaitement et surtout rapidement à la culture et aux enjeux d’une DSI de 7000 collaborateurs dans un contexte mondial. ”",
    auteur: "Laurent Martin",
    poste: "Responsable expérience collaborateurs",
  },
  {
    logo: "./images/homepage/logos_testimoniaux/logo_vade.svg",
    texte:
      "“ Say Yes nous a accompagné dans notre projet du début à la fin, en prenant en considération tous nos besoins et nos attentes. L’équipe à été force de proposition et a réalisé une prestation impeccable devant nos clients. ”",
    auteur: "Émilie Ravet",
    poste: "Communication & Brand manager",
  },
  {
    logo: "./images/homepage/logos_testimoniaux/logo_cerballiance.svg",
    texte:
      "“ L’équipe nous a accompagnés sur la refonte graphique de notre site web en réussissant l’exercice délicat de dépoussiérer un secteur très conventionnel, celui de la santé, en donnant à notre marque une identité reconnaissable sur le digital. ”",
    auteur: "Dahbia Chemli",
    poste: "Responsable digital",
  },
];

export const CardsTemoignage = ({
  logo,
  texte,
  auteur,
  poste,
}: {
  logo: string;
  texte: string;
  auteur: string;
  poste: string;
}) => {
  // Les logos sont des SVG avec fond transparent, pas besoin d'optimisation
  const optimizedLogo = logo || "";
  return {
    height: 450,
    image: "./images/homepage/identite-visuelle-1.png",
    borderRadius: "32px",
    borderClass: "light-border rounded-[32px]",
    content: (
      <div className="size-full md:p-3 p-2">
        <div className="h-full flex items-center justify-center rounded-[24px] relative overflow-hidden bg-black/70">
          <div className="white-halo absolute -top-100 -translate-y-[60%] -left-100 -translate-x-1/2 w-full h-full z-0" />
          <div className="purple-halo absolute -bottom-100 translate-y-[60%] left-0 w-full h-full z-0" />
          <div className="flex flex-col p-8 gap-6">
            {optimizedLogo && (
              <img
                src={optimizedLogo}
                alt="logo entreprise"
                width={120}
                className="aspect-ratio"
              />
            )}
            <p className="font-jakarta-semi-bold text-[14px] leading-[20px]">
              {texte}
            </p>
            <div className="h-[3px] md:w-16 w-20 holographic-bg rounded-full" />
            <div className="z-10 flex flex-col gap-2">
              <p className="font-jakarta-bold text-[15px] leading-[14px]">
                {auteur}
              </p>
              <p className="font-jakarta text-[11px] leading-[12px]">{poste}</p>
            </div>
          </div>
        </div>
      </div>
    ),
  };
};
