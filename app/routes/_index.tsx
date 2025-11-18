import type { MetaFunction } from "@remix-run/node";
import { useViewport } from "~/utils/hooks/useViewport";
import MobileLayout from "~/components/Layout/Mobile";
import Desktoplayout from "~/components/Layout/Desktop";
import { AnimatePresence, motion } from "framer-motion";
import BackgroundHomepage from "~/assets/icons/BackgroundHomepage";
import TitleHomepage from "~/assets/icons/TitleHomepage";
import ArrowLight from "~/assets/icons/ArrowLight";
import "~/styles/tailwind.css";
import Arrow from "~/assets/icons/Arrow";
import Button from "~/components/Button";
import ChatBuble from "~/components/Header/assets/ChatBuble";
import Card from "~/components/Card";
import { useRef, useState } from "react";

export const VIDEO_DURATION = 4.5;

export const meta: MetaFunction = () => {
  return [
    { title: "Say Yes !" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const isMobile = useViewport();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return isMobile ? (
    <MobileLayout>
      <div>TODO</div>
    </MobileLayout>
  ) : (
    <Desktoplayout>
      <div className="w-screen h-fit relative pt-20">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut", delay: 0.2 }}
          >
            <BackgroundHomepage className="absolute -top-20 left-0 w-full h-auto z-0 opacity-80" />
          </motion.div>
        </AnimatePresence>
        {/* Contenu par-dessus */}
        <section className="relative z-10 md:w-[988px] mx-auto flex flex-col justify-center items-center overflow-hidden gap-10">
          <div className="flex flex-col items-center w-[988px] justify-center gap-10 py-20">
            <div className="h-[3px] md:w-36 w-20 holographic-bg rounded-full" />
            <TitleHomepage width={900} />

            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-row items-center gap-3 w-full justify-center text-white font-jakarta-semibold text-[25px]">
                <p>Brand</p>
                <Arrow className="w-4" />
                <p>Print</p>
                <Arrow className="w-4" />
                <p>Digital</p>
                <Arrow className="w-4" />
                <p>Vidéo</p>
                <Arrow className="w-4" />
                <p>Facilitation graphique</p>
                <Arrow className="w-4" />
                <p>Illustration</p>
              </div>
              <p className="text-white font-jakarta-semibold text-[25px]">
                Say Yes réunit toutes les expertises créatives
              </p>
            </div>
            <Button
              type="border"
              label="Démarrer un projet"
              leftIcon={<ChatBuble color="white" className="w-6 h-6" />}
            />
          </div>
          <Card
            height="554px"
            content={
              <div
                className="size-full relative overflow-hidden md:rounded-[15px] rounded-[10px] hover:rounded-[25px] md:p-4 p-1 cursor-pointer shadow-lg"
                onClick={togglePlay}
              >
                <video
                  ref={videoRef}
                  src="/video/bureau.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-[15px]"
                />

                {/* Bouton Play/Pause */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className={`w-20 h-20 rounded-full bg-blue-500/10 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
                      isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
                    }`}
                  >
                    {!isPlaying ? (
                      <svg
                        className="w-10 h-10 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-10 h-10 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            }
            borderClass="light-border"
          />
        </section>

        {/* Section avec image sticky et cartes qui passent par-dessus */}
        {/* <div className="relative z-10"> */}
        {/* Image ClientsWall - sticky au scroll */}
        {/* <div
          className={`w-screen h-screen ${
            isImageFixed ? "sticky top-0 z-0" : "relative"
          }`}
        >
          <img
            src={imageMobile}
            alt="Clients Wall"
            className="w-full h-full object-cover transition-all duration-500"
            style={{
              opacity: imageOpacity,
              transform: `scale(${imageScale})`,
            }}
            loading="lazy"
            width={"100%"}
            height={"100%"}
          />
        </div> */}

        {/* Cartes du bas */}
        {/* <div className="relative z-10 bg-transparent min-h-screen">
            <div className="pt-32 pb-32">
              <section className="md:px-36 px-4 flex flex-col gap-8">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                  {portfolioBottomCards.map((portfolio, index) => (
                    <Card
                      key={portfolio.id}
                      height="370px"
                      content={
                        <ContentPortfolio
                          imageUrl={portfolio.photoCouverture}
                          titre={portfolio.titre}
                          slug={portfolio.slug}
                        />
                      }
                      borderClass="card-hover"
                    />
                  ))}
                </div>
              </section>
            </div>
          </div> */}
        {/* </div> */}
      </div>
    </Desktoplayout>
  );
}
