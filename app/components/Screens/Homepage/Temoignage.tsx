import { useViewport } from "~/utils/hooks/useViewport";
import { lazy, Suspense } from "react";
import MobileLayout from "~/components/Layout/Mobile";
import "~/styles/tailwind.css";

// Lazy load du composant Background volumineux
const BackgroundTemoignage = lazy(
  () => import("~/assets/icons/BackgroundTemoignage")
);

export default function Temoignage() {
  const isMobile = useViewport();

  return isMobile ? (
    <MobileLayout>
      <div>TODO</div>
    </MobileLayout>
  ) : (
    <div className="w-screen relative">
      <Suspense fallback={<div className="absolute right-0 h-auto z-0" />}>
        <BackgroundTemoignage className="absolute right-0 h-auto z-0" />
      </Suspense>
      <section className="relative z-10 md:w-[988px] mx-auto flex flex-col justify-center items-center overflow-hidden gap-8 pt-52">
        <img src="./images/homepage/logo-generali.png" alt="logo Generali" />
        <p className="text-center font-jakarta-sans text-[36px] leading-[44px] whitespace-pre-line">
          {`"L'expérience se résume ainsi :\n On a envie de recommencer ! Ils sont très 
            professionnels, disponibles, fiables et fournissent
            un travail de grande qualité. Je ne compte plus les
            personnes qui m'ont félicité de mon choix de les
            avoir engagés ou qui me demandent leur
            coordonnées."`}
        </p>
        <p className="text-[24px] font-jakarta">
          Franck Dauger I Manager design d’expérience
        </p>
        <img src="./images/homepage/icone-logiciel.png" />
      </section>
    </div>
  );
}
