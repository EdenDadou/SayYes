import { useRef } from "react";
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

  const { scrollYProgress } = useScroll({ target: containerRef });

  // Lissage du scroll avec useSpring
  const rawX = useTransform(scrollYProgress, [0.05, 1], ["0%", "-330%"]);
  const x = useSpring(rawX, {
    stiffness: 70,
    damping: 20,
    mass: 1,
  });

  const isInView = useInView(introRef, { once: true, amount: "all" });

  return (
    <section
      ref={containerRef}
      className="relative h-[600vh] w-screen"
      style={{
        backgroundImage: 'url("/images/section4/bg.png")',
        backgroundSize: "contain",
        backgroundPositionY: "-100px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start mt-80 overflow-hidden">
        {/* Halos */}
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

        {/* Intro */}
        <div
          ref={introRef}
          className="flex flex-col justify-center items-center gap-2 w-screen py-8 px-10"
        >
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
          className="flex flex-row gap-5 mt-5 w-max px-5 no-scrollbar"
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
