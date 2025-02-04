import SvgIntroSection5 from "~/components/Sections/Section-5/components/assets/IntroSection5";
import SvgSection5IntroBg from "./assets/Section5IntroBg";
import Halo from "~/components/BackgroundLayer/components/Halo";
import { useInView, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import SvgNext from "./assets/Next";
import SvgPrevious from "./assets/Previous";

const cards = [
  { src: "./images/section5/card1.png" },
  { src: "./images/section5/card1.png" },
  { src: "./images/section5/card2.png" },
  { src: "./images/section5/card3.png" },
  { src: "./images/section5/card3.png" },
];

const variants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      delay: 0.2,
      ease: "easeOut",
    },
  },
  hidden: { opacity: 0, x: -100 },
};

export default function IntroSection5() {
  const container = useRef(null);
  const isInView = useInView(container, { once: true, margin: "-100px" });
  const swiperContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiperContainerRef.current) {
      const children = swiperContainerRef.current.children;
      if (children.length >= 3) {
        const targetCard = children[2] as HTMLElement; // La 3ème carte
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

    const scrollAmount = 20; // Ajustez la distance de défilement
    if (direction === "left") {
      swiperContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    } else {
      swiperContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="relative flex flex-col justify-center items-center gap-14 w-full z-10"
      ref={container}
    >
      {/* Background */}
      <SvgSection5IntroBg className="absolute -top-22 z-0" />
      <Halo size={700} rotation={30} style={{ top: "-20%", right: "-10%" }} />
      <Halo size={700} rotation={-30} style={{ top: "5%", left: "-5%" }} />
      {/* Overlay sombre card */}
      <Halo
        size={800}
        rotation={0}
        style={{ top: "35%", right: "-50%", zIndex: 10 }}
        opacity={0.5}
        color="rgba(27,27,27,1)"
      />
      <Halo
        size={800}
        rotation={0}
        style={{ top: "35%", left: "-30%", zIndex: 10 }}
        opacity={0.5}
        color="rgba(27,27,27,1)"
      />
      {/* Section content */}
      <motion.div
        initial={{
          opacity: 0,
          x: -100,
        }}
        variants={variants}
        animate={isInView ? "visible" : "hidden"}
        className=" w-full px-40 z-10 ml-6"
      >
        <SvgIntroSection5 className="w-full" />
      </motion.div>
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
          {cards.map((c, i) => (
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
    </div>
  );
}
