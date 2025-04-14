import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Halo from "~/components/BackgroundLayer/components/Halo";
import { MemoCard } from "./AnimatedCardMobile";

const cards = [
  { img: "/images/section4/card_kick_off.png" },
  { img: "/images/section4/card_conception.png" },
  { img: "/images/section4/card_creation.png" },
  { img: "/images/section4/card_declinaison.png" },
  { img: "/images/section4/card_livraison.png" },
];

const variants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, delay: 0.2, ease: "easeOut" },
  },
  hidden: { opacity: 0, x: -100 },
};

export default function Section4IntroMobile() {
  const containerRef = useRef(null);
  const introRef = useRef(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const [totalWidth, setTotalWidth] = useState(0);

  useEffect(() => {
    const update = () => {
      if (sliderRef.current) {
        const cardWidth = window.innerWidth * 0.8;
        const totalCardsWidth = cards.length * cardWidth;
        const totalGap = (cards.length - 1) * 20; // 20px gap
        const totalScrollWidth = totalCardsWidth + totalGap;
        const extraPadding = window.innerHeight; // pour que sticky reste visible
        setTotalWidth(totalScrollWidth + extraPadding);
      }
    };
    update();
    // window.addEventListener("resize", update);
    // return () => window.removeEventListener("resize", update);
  }, []);

  const rawX = useTransform(
    scrollYProgress,
    [0.2, 1],
    [0, -totalWidth + window.innerWidth]
  );
  const x = useSpring(rawX, {
    stiffness: 50, // plus réactif (répond vite au scroll)
    damping: 60, // bien amorti, sans rebond
    mass: 0.6,
  });

  const isInView = useInView(introRef, { once: true, amount: "all" });

  return (
    <section
      ref={containerRef}
      className={`relative w-screen `}
      style={{
        height: `${totalWidth}px`,
        backgroundImage: 'url("/images/section4/bg.png")',
        backgroundSize: "contain",
        backgroundPositionY: "-100px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Halo
        size={1000}
        rotation={-30}
        style={{ top: "0%", left: "-20%", position: "absolute" }}
      />
      <Halo
        size={1000}
        rotation={30}
        style={{ top: "100%", right: "-20%", position: "absolute" }}
      />
      <div className="sticky top-0 h-screen w-full flex flex-col items-start justify-start mt-80 overflow-hidden">
        {/* Halos */}

        {/* Intro */}
        <div ref={introRef} className="flex flex-col gap-2 w-screen py-8 px-10">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
          >
            <img
              loading="lazy"
              src="/images/section4/Intro.png"
              alt="vous pilotez nous creons !"
              className="w-full"
            />
          </motion.div>
          <p className="text-black text-md font-bold font-jakarta w-full text-center">
            Gardez la main sur le process de
            <br /> création tout en libérant votre
            <br /> inspiration.
          </p>
        </div>

        {/* Défilement horizontal animé */}
        <motion.div
          ref={sliderRef}
          className="flex flex-row justify-start gap-5 mt-5 w-max px-5 no-scrollbar"
          style={{
            x,
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        >
          {cards.map((card, index) => (
            <MemoCard key={index} src={card.img} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
