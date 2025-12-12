import { useState, useEffect, useRef } from "react";
import { useViewport } from "~/utils/hooks/useViewport";
import "~/styles/tailwind.css";
import Card from "~/components/Card";
import Coche from "~/assets/icons/Coche";

export default function TitleStepImage() {
  const isMobile = useViewport();
  const [activeSteps, setActiveSteps] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [justCompletedStep, setJustCompletedStep] = useState<number | null>(
    null
  );
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Activer immédiatement la première étape
            setActiveSteps(1);
            // Déclencher l'animation pour la première étape
            setJustCompletedStep(1);
            setTimeout(() => {
              setJustCompletedStep(null);
            }, 600);
            // Une fois visible, on peut arrêter d'observer
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2, // Déclencher quand 20% de la section est visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Incrémenter le nombre d'étapes actives toutes les 3 secondes
    const interval = setInterval(() => {
      setActiveSteps((prev) => {
        if (prev < 4) {
          const newStep = prev + 1;
          // Déclencher l'animation pour l'étape qui vient d'être complétée
          setJustCompletedStep(newStep);
          // Réinitialiser après l'animation (0.6s)
          setTimeout(() => {
            setJustCompletedStep(null);
          }, 600);
          return newStep;
        }
        return prev; // Arrêter à 4 étapes
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible]);

  // Fonction pour rendre une étape selon son état
  const renderStep = (
    stepNumber: number,
    title: string,
    description: string
  ) => {
    const isCompleted = stepNumber <= activeSteps;
    const isPending = stepNumber === activeSteps + 1;
    const isInactive = stepNumber > activeSteps + 1;
    const showBar = stepNumber < 4; // Toujours afficher la barre pour les 3 premières étapes

    // Déterminer l'opacité selon l'état pour le fade
    let opacity = 0; // Inactive par défaut
    if (isCompleted) {
      opacity = 1; // Complétée = opacité maximale
    } else if (isPending) {
      opacity = 1; // En attente = opacité maximale (mais avec gradient pour la barre)
    }

    if (isCompleted) {
      // Étape complétée (avec coche)
      return (
        <div className="relative flex items-start gap-6">
          <div className="relative flex flex-col items-center">
            <div className="relative z-10 flex items-center justify-center w-[32px] h-[32px] rounded-full bg-black flex-shrink-0">
              {/* Bordure inactive en dessous */}
              <div className="absolute inset-0 rounded-full border-2 border-[#DCC4FF]/40" />
              {/* Bordure active au-dessus avec fade */}
              <div
                className="absolute inset-0 rounded-full border-2 border-[#DCC4FF] transition-opacity duration-500 ease-in-out"
                style={{ opacity }}
              />
              <Coche
                color="#DCC4FF"
                className="w-6 h-6 relative z-10"
                style={{
                  animation: "fadeIn 0.5s ease-in-out forwards",
                }}
              />
            </div>
            {showBar && (
              <div className="relative w-[2px] h-10 mt-0">
                {/* Barre inactive en dessous */}
                <div className="absolute inset-0 bg-[#DCC4FF]/40" />
                {/* Barre active au-dessus avec fade */}
                <div
                  className="absolute inset-0 bg-[#DCC4FF] transition-opacity duration-500 ease-in-out"
                  style={{ opacity }}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 pt-1">
            <h3
              className="font-jakarta-semi-bold md:text-[24px] text-[16px] text-white leading-[28px] tracking-[-1px]"
              style={{
                animation:
                  justCompletedStep === stepNumber
                    ? "textScale 0.6s ease-in-out"
                    : "none",
              }}
            >
              {title}
            </h3>
            <p
              className="font-jakarta text-[14px] text-white/60 leading-[18px]"
              style={{
                animation:
                  justCompletedStep === stepNumber
                    ? "textScale 0.6s ease-in-out"
                    : "none",
              }}
            >
              {description}
            </p>
          </div>
        </div>
      );
    } else if (isPending) {
      // Étape en attente
      return (
        <div className="relative flex items-start gap-6">
          <div className="relative flex flex-col items-center">
            <div className="relative z-10 flex items-center justify-center w-[32px] h-[32px] rounded-full bg-transparent flex-shrink-0">
              {/* Bordure inactive en dessous */}
              <div className="absolute inset-0 rounded-full border-2 border-[#DCC4FF]/40" />
              {/* Bordure active au-dessus avec fade */}
              <div
                className="absolute inset-0 rounded-full border-2 border-[#DCC4FF] transition-opacity duration-500 ease-in-out"
                style={{ opacity }}
              />
              <div className="relative w-6 h-6 bg-transpatent rounded-full z-10" />
            </div>
            {showBar && (
              <div className="relative w-[2px] h-10 mt-0">
                {/* Barre inactive en dessous */}
                <div className="absolute inset-0 bg-[#DCC4FF]/40" />
                {/* Barre en attente au-dessus avec fade (gradient) */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-[#8d7da4] to-[#8d7da4]/50 transition-opacity duration-500 ease-in-out"
                  style={{ opacity }}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 pt-1">
            <h3 className="font-jakarta-semi-bold md:text-[24px] text-[16px] text-white/90 leading-[28px] tracking-[-1px]">
              {title}
            </h3>
            <p className="font-jakarta text-[14px] text-white/50 leading-[18px]">
              {description}
            </p>
          </div>
        </div>
      );
    } else {
      // Étape inactive
      return (
        <div className="relative flex items-start gap-6">
          <div className="relative flex flex-col items-center">
            <div className="relative z-10 flex items-center justify-center w-[32px] h-[32px] rounded-full bg-transparent flex-shrink-0">
              {/* Bordure inactive en dessous */}
              <div className="absolute inset-0 rounded-full border-2 border-[#DCC4FF]/40" />
              {/* Bordure active au-dessus avec fade */}
              <div
                className="absolute inset-0 rounded-full border-2 border-[#DCC4FF] transition-opacity duration-500 ease-in-out"
                style={{ opacity }}
              />
            </div>
            {showBar && (
              <div className="relative w-[2px] h-10 mt-0">
                {/* Barre inactive en dessous */}
                <div className="absolute inset-0 bg-[#DCC4FF]/40" />
                {/* Barre active au-dessus avec fade */}
                <div
                  className="absolute inset-0 bg-[#DCC4FF] transition-opacity duration-500 ease-in-out"
                  style={{ opacity }}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 pt-1">
            <h3 className="font-jakarta-semi-bold md:text-[24px] text-[16px] text-white/50 leading-[28px] tracking-[-1px]">
              {title}
            </h3>
            <p className="font-jakarta text-[14px] text-white/30 leading-[18px]">
              {description}
            </p>
          </div>
        </div>
      );
    }
  };

  return isMobile ? (
    <section
      ref={sectionRef}
      className="w-full relative px-5 pt-20 pb-12 flex flex-col gap-10 overflow-hidden"
    >
      <img
        src="./images/homepage/bg-halo.png"
        alt="background"
        className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-auto z-0 opacity-60 rotate-180"
      />
      <div className="relative z-10 flex flex-col gap-6 items-center">
        <div className="h-[3px] w-16 holographic-bg rounded-full" />
        <h2 className="glassy font-jakarta-semi-bold text-[32px] leading-[34px] tracking-[-2px] whitespace-pre-line text-center">
          {`Prêt à transformer\nvotre image`}
        </h2>
        <p className="font-jakarta text-[16px] text-white text-center">
          Les 4 étapes pour lancer votre projet :
        </p>
        <div className="relative flex flex-col w-full">
          {renderStep(
            1,
            "01. Indiquez vos coordonnées",
            "1 minute maximum, promis!"
          )}
          {renderStep(
            2,
            "02. Nous vous rappelons sous 48h",
            "Ou l'on vous offre un support de com'!"
          )}
          {renderStep(
            3,
            "03. Devis express ou visio de cadrage",
            "C'est gratuit, profitez-en!"
          )}
          {renderStep(
            4,
            "04. Démarrage de votre projet",
            "Kick-Off > Idéation > Création > Livraison"
          )}
        </div>
      </div>
      <Card
        height="auto"
        borderRadius="30px"
        borderClass="light-border rounded-[30px] p-3"
        content={
          <div>
            <img src="./images/homepage/step-img.png" alt="step-image" />
          </div>
        }
      />
    </section>
  ) : (
    <div className="w-screen relative">
      <img
        src="./images/homepage/bg-halo.png"
        alt="background"
        className="scale-x-[-1] absolute left-0 h-auto z-0 w-1/2 top-0 rotate-180"
      />
      <img
        src="./images/homepage/bg-halo.png"
        alt="background"
        className="absolute right-0 h-auto z-0 w-1/2 top-40 rotate-180"
      />
      <section
        ref={sectionRef}
        className="relative z-10 md:w-[988px] mx-auto flex flex-row gap-4 pt-32 pb-20"
      >
        <div className="w-1/2 flex flex-col gap-8">
          <div className="h-[3px] md:w-20 w-20 holographic-bg rounded-full" />
          <h2 className="glassy font-jakarta-semi-bold text-[56px] text-start leading-[56px] pb-2 tracking-[-3px] weight-600 whitespace-pre-line">
            {`Prêt à transformer\n votre image`}
          </h2>
          <p className="font-jakarta text-[24px] text-white">
            Les 4 étapes pour lancer votre projet :
          </p>

          {/* Timeline des étapes */}
          <div className="relative flex flex-col mt-4">
            {renderStep(
              1,
              "01. Indiquez vos coordonnées",
              "1 minute maximum, promis!"
            )}
            {renderStep(
              2,
              "02. Nous vous rappelons sous 48h",
              "Ou l'on vous offre un support de com'!"
            )}
            {renderStep(
              3,
              "03. Devis express ou visio de cadrage",
              "C'est gratuit, profitez-en!"
            )}
            {renderStep(
              4,
              "04. Démarrage de votre projet",
              "Kick-Off > Idéation > Création > Livraison"
            )}
          </div>
        </div>
        <div className="w-1/2">
          <Card
            height="auto"
            borderRadius="45px"
            borderClass="light-border rounded-[45px] p-3"
            content={
              <div>
                <img src="./images/homepage/step-img.png" alt="step-image" />
              </div>
            }
          />
        </div>
      </section>
    </div>
  );
}
