import { useViewport } from "~/utils/hooks/useViewport";
import Arrow from "~/assets/icons/Arrow";
import BackgroundSideLueur from "~/assets/icons/BacgroundSideLueur";
import "~/styles/tailwind.css";

export default function RowTitlePicture() {
  const isMobile = useViewport();

  return isMobile ? (
    <section className="w-full relative px-5 pb-4 flex flex-col gap-8">
      <img
        src="./images/homepage/bg-halo.png"
        alt="background"
        className="absolute -top-10 left-0 w-full h-auto z-0 opacity-70 rotate-180"
      />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="h-[3px] w-16 holographic-bg rounded-full" />
        <h2 className="glassy font-jakarta-semi-bold text-[34px] leading-[38px] tracking-[-1px] whitespace-pre-line text-center">
          {`15 ans\n d'expertise\n créative !`}
          <Arrow className="w-8 inline-block ml-2" color="grey" />
        </h2>
        <div className="flex flex-col items-center gap-12">
          <div className="text-center">
            <p className="text-[60px] leading-[67px] holographic-text font-jakarta-semi-bold tracking-[-2px]">
              +140
            </p>
            <p className="font-jakarta text-[14px] text-white/70">
              Clients accompagnées
            </p>
          </div>
          <div className="text-center">
            <p className="text-[60px] leading-[67px] holographic-text font-jakarta-semi-bold tracking-[-2px]">
              +250
            </p>
            <p className="font-jakarta text-[14px] text-white/70">
              Projets livrés
            </p>
          </div>
          <div className="text-center">
            <p className="text-[60px] leading-[67px] holographic-text font-jakarta-semi-bold tracking-[-2px]">
              +1000
            </p>
            <p className="font-jakarta text-[14px] text-white/70">
              Supports au compteur
            </p>
          </div>
          <div className="text-center">
            <p className="text-[60px] leading-[67px] holographic-text font-jakarta-semi-bold tracking-[-2px]">
              92%
            </p>
            <p className="font-jakarta text-[14px] text-white/70">
              de clients fidèles
            </p>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-white/5">
          <img
            src="./images/homepage/grid-partenaire.png"
            alt="partenaires"
            className="w-screen"
          />
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-5 pointer-events-none py-5 gap-2">
            {[...Array(15)].map((_, i) => {
              const row = Math.floor(i / 3);
              const col = i % 3;
              const isBlack = (row + col) % 2 === 0;
              return (
                <div key={i} className="relative overflow-hidden">
                  {isBlack && (
                    <div className="absolute inset-0 glassy-overlay rounded-3xl" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div className="w-screen relative">
      {/* <BackgroundSideLueur className="scale-x-[-1] absolute left-0 h-auto z-0 w-1/2" /> */}
      <img
        src="./images/homepage/bg-halo.png"
        alt="background"
        className="scale-x-[-1] absolute left-0 h-auto z-0 w-1/2 top-0 rotate-180"
      />
      <section className="relative z-10 md:w-[988px] mx-auto flex flex-row gap-16 pt-32 pb-20">
        <div className="w-2/5 flex flex-col gap-8">
          <div className="h-[3px] md:w-20 w-20 holographic-bg rounded-full" />
          <h2 className="glassy font-jakarta-semi-bold text-[56px] text-start leading-[56px] tracking-[-2px] weight-600 whitespace-pre-line">
            {`15 ans\n d'expertise\n créative !`}
            <Arrow className="w-10 inline-block ml-4" color="grey" />
          </h2>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="text-center">
              <p className="text-[52px] leading-[62px] holographic-text font-jakarta-semi-bold tracking-[-3px]">
                +140
              </p>
              <p className="font-jakarta text-[16px] text-white/70 whitespace-nowrap">
                Clients accompagnées
              </p>
            </div>
            <div className="text-center">
              <p className="text-[52px] leading-[62px] holographic-text font-jakarta-semi-bold tracking-[-3px]">
                +250
              </p>
              <p className="font-jakarta text-[16px] text-white/70 whitespace-nowrap">
                Projets livrés
              </p>
            </div>
            <div className="text-center">
              <p className="text-[52px] leading-[62px] holographic-text font-jakarta-semi-bold tracking-[-3px]">
                +1000
              </p>
              <p className="font-jakarta text-[16px] text-white/70 whitespace-nowrap">
                Supports au compteur
              </p>
            </div>
            <div className="text-center">
              <p className="text-[52px] leading-[62px] holographic-text font-jakarta-semi-bold tracking-[-3px]">
                92%
              </p>
              <p className="font-jakarta text-[16px] text-white/70 whitespace-nowrap">
                de clients fidèles
              </p>
            </div>
          </div>
        </div>
        <div className="-mt-10 relative overflow-hidden">
          <img src="./images/homepage/grid-partenaire.png" />
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-5 pointer-events-none py-5 gap-2">
            {[...Array(15)].map((_, i) => {
              const row = Math.floor(i / 3);
              const col = i % 3;
              const isBlack = (row + col) % 2 === 0;
              return (
                <div key={i} className="relative overflow-hidden">
                  {isBlack && (
                    <div className="absolute inset-0 glassy-overlay rounded-3xl" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
