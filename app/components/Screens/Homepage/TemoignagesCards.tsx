import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArrowLight from "~/assets/icons/ArrowLight";
import Card from "~/components/Card";
import NoteStar from "~/assets/icons/NoteStar";
import ScrollingBanner from "~/components/BrandBanner/ScrollingBanner";

export default function TemoignagesCards({}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, 10));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className={`relative w-full flex  flex-col pt-16 gap-16 z-10 `}>
      <img
        src="./images/homepage/bg-halo.png"
        alt="background"
        className="absolute inset-0 w-1/2 h-full object-cover z-[-1]"
      />
      {/* Title Section */}
      <div className="max-w-[990px] m-auto flex flex-col items-center gap-4">
        <div className="h-[3px] md:w-36 w-20 holographic-bg rounded-full my-8" />
        <div className="flex flex-row font-jakarta-semibold text-[27px] leading-[30px] text-white items-center gap-2">
          <NoteStar className="w-6 h-6 flex-shrink-0" />
          <span>Sortlist 4.9 I 5</span>
        </div>
        <h2 className="font-jakarta-semi-bold text-[48px] leading-[50px] text-center glassy tracking-[-1px] whitespace-pre-line">
          {`Ils en parlent mieux que nous !`}
        </h2>
      </div>
      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden flex items-center gap-10">
        {/* Navigation Arrows */}
        <div className="absolute w-[1050px] left-1/2 -translate-x-1/2 flex flex-row justify-between items-center z-20">
          <button
            onClick={prevSlide}
            className={`z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-300 group ${
              currentIndex === 0 ? "opacity-0 invisible" : "opacity-100 visible"
            }`}
            aria-label="Projet précédent"
          >
            <ArrowLight className="w-[77px] h-[77px] text-white rotate-180 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className={`z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-300 group ${
              currentIndex >= 10 ? "opacity-0 invisible" : "opacity-100 visible"
            }`}
            aria-label="Projet suivant"
          >
            <ArrowLight className="w-[77px] h-[77px] text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Carousel Content */}
        <div className="relative h-[420px] overflow-visible">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  nextSlide();
                } else if (swipe > swipeConfidenceThreshold) {
                  prevSlide();
                }
              }}
              className={`absolute inset-0 flex items-center gap-4 ${
                currentIndex === 0
                  ? ""
                  : currentIndex >= 10
                    ? "justify-end"
                    : "justify-center"
              }`}
              style={{
                paddingLeft: currentIndex === 0 ? `128px` : undefined,
                paddingRight: currentIndex >= 10 ? `128px` : undefined,
              }}
            >
              {temoignagesCards.map((temoignage, index) => {
                const data = CardsTemoignage(temoignage);
                return (
                  <div key={index} className="w-[314px] flex-shrink-0">
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
      <ScrollingBanner />
    </div>
  );
}

const temoignagesCards = [
  {
    logo: "./images/homepage/temoignage-cards/volvo.png",
    texte:
      "“ Say Yes nous a accompagné dans notre projet du début à la fin, en prenant en considération tous nos besoins et nos attentes. L’équipe à été force de proposition et a réalisé une prestation impeccable devant nos clients. ”",
    auteur: "Tiffanie Juge",
    poste: "Responsable développement",
  },
  {
    logo: "./images/homepage/temoignage-cards/societe_generale.png",
    texte:
      "“ C’est la 1ère fois en 20 ans que je rencontre une telle équipe capable de s’adapter parfaitement et surtout rapidement à la culture et aux enjeux d’une DSI de 7000 collaborateurs dans un contexte mondial. ”",
    auteur: "Laurent Martin",
    poste: "Responsable expérience collaborateurs",
  },
  {
    logo: "./images/homepage/temoignage-cards/vade.png",
    texte:
      "“ Say Yes nous a accompagné dans notre projet du début à la fin, en prenant en considération tous nos besoins et nos attentes. L’équipe à été force de proposition et a réalisé une prestation impeccable devant nos clients. ”",
    auteur: "Émilie Ravet",
    poste: "Communication & Brand manager",
  },
  {
    logo: "",
    texte:
      "“ L'équipe nous a accompagnés sur la refonte graphique de notre site web en réussissant l’exercice délicat de dépoussiérer un secteur très conventionnel, celui de la santé, en donnant à notre marque une identité reconnaissable sur le digital. ”",
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
  return {
    height: 413,
    image: "./images/homepage/identite-visuelle-1.png",
    borderRadius: "40px",
    borderClass: "light-border rounded-[40px]",
    content: (
      <div className="size-full md:p-3 p-2">
        <div className="h-full flex items-center justify-center rounded-[24px] relative overflow-hidden bg-black/70">
          <div className="white-halo absolute -top-100 -translate-y-[60%] -left-100 -translate-x-1/2 w-full h-full z-0" />
          <div className="purple-halo absolute -bottom-100 translate-y-[60%] left-0 w-full h-full z-0" />
          <div className="flex flex-col p-8 gap-6">
            <img
              src={logo}
              alt="logo entreprise"
              width={120}
              className="aspect-ratio "
            />
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
