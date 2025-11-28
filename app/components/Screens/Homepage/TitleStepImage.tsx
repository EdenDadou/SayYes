import { useViewport } from "~/utils/hooks/useViewport";
import MobileLayout from "~/components/Layout/Mobile";
import Arrow from "~/assets/icons/Arrow";
import BackgroundSideLueur from "~/assets/icons/BacgroundSideLueur";
import "~/styles/tailwind.css";
import Card from "~/components/Card";
import Coche from "~/assets/icons/Coche";

export default function TitleStepImage() {
  const isMobile = useViewport();

  return isMobile ? (
    <MobileLayout>
      <div>TODO</div>
    </MobileLayout>
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
      <section className="relative z-10 md:w-[988px] mx-auto flex flex-row gap-4 pt-32 pb-20">
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
            {/* Étape 1 - Complétée */}
            <div className="relative flex items-start gap-6">
              <div className="relative flex flex-col items-center">
                <div className="relative z-10 flex items-center justify-center w-[32px] h-[32px] rounded-full bg-black border-2 border-[#DCC4FF] flex-shrink-0">
                  <Coche color="#DCC4FF" className="w-6 h-6" />
                </div>
                {/* Ligne sous la coche 1 */}
                <div className="w-[2px] h-10 bg-[#DCC4FF] mt-0" />
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <h3 className="font-jakarta-semi-bold text-[24px] text-white leading-[28px] tracking-[-1px]">
                  01. Indiquez vos coordonnées
                </h3>
                <p className="font-jakarta text-[14px] text-white/60 leading-[18px]">
                  1 minute maximum, promis!
                </p>
              </div>
            </div>

            {/* Étape 2 - Complétée */}
            <div className="relative flex items-start gap-6">
              <div className="relative flex flex-col items-center">
                <div className="relative z-10 flex items-center justify-center w-[32px] h-[32px] rounded-full bg-black border-2 border-[#DCC4FF] flex-shrink-0">
                  <Coche color="#DCC4FF" className="w-6 h-6" />
                </div>
                {/* Ligne sous la coche 2 */}
                <div className="w-[2px] h-10 bg-[#DCC4FF]  mt-0" />
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <h3 className="font-jakarta-semi-bold text-[24px] text-white leading-[28px] tracking-[-1px]">
                  02. Nous vous rappelons sous 48h
                </h3>
                <p className="font-jakarta text-[14px] text-white/60 leading-[18px]">
                  Ou l'on vous offre un support de com'!
                </p>
              </div>
            </div>

            {/* Étape 3 - En attente */}
            <div className="relative flex items-start gap-6">
              <div className="relative flex flex-col items-center">
                <div className="z-10 flex items-center justify-center w-[32px] h-[32px] rounded-full border-2 border-[#DCC4FF] bg-transparent flex-shrink-0">
                  <div className="absolute w-6 h-6 bg-transpatent rounded-full" />
                </div>
                {/* Ligne sous la coche 3 */}
                <div className="w-[2px] h-10 bg-gradient-to-b from-[#8d7da4] to-[#8d7da4]/50 mt-0" />
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <h3 className="font-jakarta-semi-bold text-[24px] text-white/90 leading-[28px] tracking-[-1px]">
                  03. Devis express ou visio de cadrage
                </h3>
                <p className="font-jakarta text-[14px] text-white/50 leading-[18px]">
                  C'est gratuit, profitez-en!
                </p>
              </div>
            </div>

            {/* Étape 4 - En attente */}
            <div className="relative flex items-start gap-6">
              <div className="relative flex flex-col items-center">
                <div className="relative z-10 flex items-center justify-center w-[32px] h-[32px] rounded-full border-2 border-[#DCC4FF]/40 bg-transparent flex-shrink-0" />
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <h3 className="font-jakarta-semi-bold text-[24px] text-white/50 leading-[28px] tracking-[-1px]">
                  04. Démarrage de votre projet
                </h3>
                <p className="font-jakarta text-[14px] text-white/30 leading-[18px]">
                  Kick-Off &gt; Idéation &gt; Création &gt; Livraison
                </p>
              </div>
            </div>
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
