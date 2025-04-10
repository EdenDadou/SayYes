import { useRef, useEffect, useState } from "react";
import SvgNext from "./assets/Next";
import SvgPrevious from "./assets/Previous";
const cards = [
  { src: "./images/section5/card1.png" },
  { src: "./images/section5/card1.png" },
  { src: "./images/section5/card2.png" },
  { src: "./images/section5/card3.png" },
  { src: "./images/section5/card3.png" },
];

const InfiniteCarousel = () => {
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const duplicatedCards = [...cards, ...cards, ...cards];
  const [cardsArray, setCardsArray] = useState(duplicatedCards);

  const moveElement = ({
    fromIndex,
    toIndex,
  }: {
    fromIndex: number;
    toIndex: number;
  }) => {
    const newArray = [...cardsArray]; // Cloner le tableau pour éviter de modifier l'original
    const [movedItem] = newArray.splice(fromIndex, 1); // Supprime l'élément
    newArray.splice(toIndex, 0, movedItem); // Insère à la nouvelle position
    setCardsArray(newArray);
  };

  useEffect(() => {
    if (swiperContainerRef.current) {
      const children = swiperContainerRef.current.children;
      if (children.length >= 3) {
        const targetCard = children[7] as HTMLElement; // La 3ème carte
        const containerWidth = swiperContainerRef.current.offsetWidth;

        // Calculer le scroll pour centrer la carte
        const targetCardOffsetLeft = targetCard.offsetLeft;
        const targetCardWidth = targetCard.offsetWidth;

        swiperContainerRef.current.scrollLeft =
          targetCardOffsetLeft - (containerWidth - targetCardWidth) / 2;
      }
    }
  }, []);

  const handleScroll = (direction: string) => {
    if (!swiperContainerRef.current) return;

    const scrollAmount = window.innerWidth * 0.28; // taille d'une carte
    if (direction === "left") {
      //   moveElement({ fromIndex: cardsArray.length - 1, toIndex: 0 });
      swiperContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    } else {
      //   moveElement({ fromIndex: 0, toIndex: cardsArray.length - 1 });
      swiperContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Bouton pour défiler vers la gauche */}
      <SvgPrevious
        className="absolute left-0 top-60 z-20"
        onClick={() => handleScroll("left")}
      />
      {/* Conteneur des éléments défilants */}
      <div
        ref={swiperContainerRef}
        className="flex gap-0 overflow-x-auto scroll-smooth snap-mandatory w-full no-scrollbar"
      >
        {cardsArray.map((c, i) => (
          <div
            className="snap-start flex-shrink-0 w-[28%] flex items-center justify-center holographic-speciality"
            key={`card-${c.src}-${i}`}
            style={{
              maskImage: `url(${c.src})`,
              WebkitMaskImage: `url(${c.src})`,
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          >
            <img src={c.src} alt="card1" className="cursor-pointer w-full" />
          </div>
        ))}
      </div>
      <SvgNext
        className="absolute right-0 top-60 z-20"
        onClick={() => handleScroll("right")}
      />
    </div>
  );
};

export default InfiniteCarousel;
