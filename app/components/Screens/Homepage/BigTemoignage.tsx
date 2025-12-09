import { useViewport } from "~/utils/hooks/useViewport";
import { lazy, Suspense, useRef } from "react";
import AnimatedText from "~/components/AnimatedText";
import { motion, useScroll, useTransform } from "framer-motion";
import "~/styles/tailwind.css";

// Lazy load du composant Background volumineux
const BackgroundTemoignage = lazy(
  () => import("~/assets/icons/BackgroundTemoignage")
);

const temoignageText = `"L'expérience se résume ainsi :\nOn a envie de recommencer ! Ils sont très\nprofessionnels, disponibles, fiables et fournissent\nun travail de grande qualité. Je ne compte plus les\npersonnes qui m'ont félicité de mon choix de les\navoir engagés ou qui me demandent leur\ncoordonnées."`;
const temoignageTextMobile = `"L'expérience se résume ainsi :\nOn a envie de recommencer ! Ils sont\ntrès professionnels, disponibles,\nfiables et fournissent un travail de\ngrande qualité. Je ne compte plus\nles personnes qui m'ont félicité de\nmon choix de les avoir engagés ou\nqui me demandent leur\ncoordonnées."`;

export default function BigTemoignage() {
  const isMobile = useViewport();
  const imagesContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imagesContainerRef,
    offset: ["start end", "end start"], // Commence quand le bas de l'élément atteint le viewport, finit quand le haut sort
  });

  // Différentes vitesses de parallax pour chaque image
  const y1 = useTransform(scrollYProgress, [0.3, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0.3, 1], [0, -200]);

  return isMobile ? (
    <section className="w-full relative px-5 py-16 flex flex-col items-center gap-10">
      <Suspense fallback={<div className="absolute right-0 h-auto z-0" />}>
        <BackgroundTemoignage className="absolute right-0 h-auto z-0 opacity-50" />
      </Suspense>
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <img
          src="./images/homepage/logo-generali.png"
          alt="logo Generali"
          className="w-14"
        />
        <AnimatedText
          text={temoignageTextMobile}
          className="text-center font-jakarta-sans text-[18px] leading-[36px]"
        />
        <p className="text-[16px] leading-[24px] font-jakarta">
          <span className="font-jakarta-semi-bold mb-2">Franck Dauger</span>
          <br />
          Manager design d'expérience
        </p>

        <div className="relative mt-6 w-full flex justify-center">
          <div className="relative w-56 h-56">
            <motion.img
              src="./images/homepage/icone-logiciel-1.png"
              style={{ y: y1 }}
              className="relative z-0 top-6 w-full mx-auto"
            />
            <motion.img
              src="./images/homepage/icone-logiciel-2.png"
              style={{ y: y2 }}
              className="absolute top-0 z-10 w-full"
            />
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div className="w-screen relative">
      <Suspense fallback={<div className="absolute right-0 h-auto z-0" />}>
        <BackgroundTemoignage className="absolute right-0 h-auto z-0" />
      </Suspense>
      <section className="relative z-10 md:w-[988px] mx-auto flex flex-col justify-center items-center overflow-hidden gap-8 pt-52">
        <img src="./images/homepage/logo-generali.png" alt="logo Generali" />
        <AnimatedText
          text={temoignageText}
          className="text-center font-jakarta-sans text-[36px] leading-[44px]"
        />
        <p className="text-[24px] font-jakarta">
          <span className="font-jakarta-semi-bold">Franck Dauger</span> I
          Manager design d'expérience
        </p>
        <div className="relative my-32" ref={imagesContainerRef}>
          <motion.img
            src="./images/homepage/icone-logiciel-1.png"
            style={{ y: y1 }}
            className="relative z-0 top-10"
          />
          <motion.img
            src="./images/homepage/icone-logiciel-2.png"
            style={{ y: y2 }}
            className="absolute top-0 left-0 z-10"
          />
        </div>
      </section>
    </div>
  );
}
