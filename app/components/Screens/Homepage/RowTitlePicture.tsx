import { useViewport } from "~/utils/hooks/useViewport";
import MobileLayout from "~/components/Layout/Mobile";
import Arrow from "~/assets/icons/Arrow";
import BackgroundSideLueur from "~/assets/icons/BacgroundSideLueur";
import "~/styles/tailwind.css";

export default function RowTitlePicture() {
  const isMobile = useViewport();

  return isMobile ? (
    <MobileLayout>
      <div>TODO</div>
    </MobileLayout>
  ) : (
    <div className="w-screen">
      <BackgroundSideLueur className="scale-x-[-1] absolute left-0 h-auto z-0" />
      <section className="relative z-10 md:w-[988px] mx-auto flex flex-row gap-16 pt-32 pb-20">
        <div className="w-2/5 flex flex-col gap-8">
          <div className="h-[3px] md:w-20 w-20 holographic-bg rounded-full" />
          <h2 className="glassy font-jakarta-semi-bold text-[56px] text-start leading-[56px] tracking-[-2px] weight-600 whitespace-pre-line">
            {`15 ans\n d'expertise\n créative !`}
            <Arrow className="w-10 inline-block ml-4" color="grey" />
          </h2>
          <div className="grid grid-cols-2 gap-6 w-full">
            <div className="text-center">
              <p className="text-[52px] leading-[62px] holographic-text font-jakarta-semi-bold tracking-[-3px]">
                + 140
              </p>
              <p className="font-jakarta text-[16px] text-white/70">
                Clients accompagnées
              </p>
            </div>
            <div className="text-center">
              <p className="text-[52px] leading-[62px] holographic-text font-jakarta-semi-bold tracking-[-3px]">
                + 250
              </p>
              <p className="font-jakarta text-[16px] text-white/70">
                Projets livrés
              </p>
            </div>
            <div className="text-center">
              <p className="text-[52px] leading-[62px] holographic-text font-jakarta-semi-bold tracking-[-3px]">
                + 1000
              </p>
              <p className="font-jakarta text-[16px] text-white/70">
                Supports au compteur
              </p>
            </div>
            <div className="text-center">
              <p className="text-[52px] leading-[62px] holographic-text font-jakarta-semi-bold tracking-[-3px]">
                92%
              </p>
              <p className="font-jakarta text-[16px] text-white/70">
                de clients fidèles
              </p>
            </div>
          </div>
        </div>
        <div className="-mt-10">
          <img src="./images/homepage/grid-partenaire.png" />
        </div>
      </section>
    </div>
  );
}
