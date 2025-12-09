import { useRef } from "react";
import ParallaxCard from "~/components/Card/ParallaxCard";
import { solutionsCards } from "~/components/Screens/Solutions/data";
import { useViewport } from "~/utils/hooks/useViewport";
import SolutionTitleMobile from "~/components/Screens/Solutions/components/SolutionTitleMobile";
import Desktoplayout from "~/components/Layout/Desktop";
import BackgroundMobile from "~/assets/icons/BackgroundMobile";
import MobileLayout from "~/components/Layout/Mobile";
import "~/styles/tailwind.css";
import SolutionTitle from "~/components/Screens/Solutions/components/SolutionTitle";
import { AnimatePresence, motion, useScroll } from "framer-motion";

// Variants pour les animations d'entrée
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Composant Cards parallax pour mobile
function SolutionCardsParallaxMobile() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="relative w-full">
      {solutionsCards.map((card, index) => {
        const targetScale =
          index === solutionsCards.length - 1
            ? 1
            : 1 - (solutionsCards.length - index) * 0.03;
        return (
          <ParallaxCard
            key={index}
            index={index}
            totalCards={solutionsCards.length}
            content={card.content}
            borderClass={card.borderClass}
            progress={scrollYProgress}
            targetScale={targetScale}
            isMobile
            height="540px"
          />
        );
      })}
    </div>
  );
}

// Composant Cards parallax pour desktop
function SolutionCardsParallax() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="relative">
      {solutionsCards.map((card, index) => {
        const targetScale =
          index === solutionsCards.length - 1
            ? 1
            : 1 - (solutionsCards.length - index) * 0.05;
        return (
          <ParallaxCard
            key={index}
            index={index}
            totalCards={solutionsCards.length}
            content={card.content}
            borderClass={card.borderClass}
            progress={scrollYProgress}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}

export default function Solutions() {
  const isMobile = useViewport();

  // Attendre que le viewport soit détecté pour éviter le flash
  if (isMobile === null) {
    return null;
  }

  return isMobile ? (
    <MobileLayout>
      <div className="relative">
        <div className="sticky top-0 -mt-20 w-full h-screen z-0 pointer-events-none">
          <BackgroundMobile className="w-full h-full opacity-80 blur-2xl" />
        </div>
        <section className="relative z-10 px-[14px] flex flex-col gap-8 justify-center items-center -mt-[90vh]">
          <div className="flex flex-col items-center gap-10 w-full justify-center -mb-10">
            <div className="h-[3px] md:w-24 w-20 holographic-bg mt-6 rounded-full" />
            <SolutionTitleMobile />
          </div>
          <SolutionCardsParallaxMobile />
        </section>
      </div>
    </MobileLayout>
  ) : (
    <Desktoplayout>
      <div className="relative">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut", delay: 0.2 }}
            className="sticky top-0 -mt-20 w-full h-screen z-0 pointer-events-none"
          >
            <img
              src="/images/portfolio/bg.png"
              alt="Background"
              className="w-full h-full object-cover opacity-80"
            />
          </motion.div>
        </AnimatePresence>
        <motion.div
          className="relative z-10 -mt-[90vh]"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <section className="w-[988px] mx-auto flex flex-col justify-center items-start pt-20 -mb-10">
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-[3px] md:w-24 w-20 holographic-bg mt-8 rounded-full"
            />
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <SolutionTitle />
            </motion.div>
          </section>
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SolutionCardsParallax />
          </motion.div>
        </motion.div>
      </div>
    </Desktoplayout>
  );
}
