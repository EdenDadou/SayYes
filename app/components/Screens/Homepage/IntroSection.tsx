import type { MetaFunction } from "@remix-run/node";
import { useViewport } from "~/utils/hooks/useViewport";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense } from "react";
import TitleHomepage from "~/assets/icons/TitleHomepage";
import "~/styles/tailwind.css";
import Arrow from "~/assets/icons/Arrow";
import Button from "~/components/Button";
import ChatBuble from "~/components/Header/assets/ChatBuble";
import Card from "~/components/Card";
import { useRef, useState } from "react";
import Play from "~/assets/icons/Play";
import Pause from "~/assets/icons/Pause";
import { useModalContact } from "~/contexts/ModalContactContext";
import GridBg from "~/assets/icons/GridBg";
import SvgLogoAllClients from "~/components/Sections/Section-2/components/assets/LogoAllClients";

export const VIDEO_DURATION = 4.5;

export const meta: MetaFunction = () => {
  return [
    { title: "Say Yes !" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function IntroSection() {
  const isMobile = useViewport();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { openModalContact } = useModalContact();

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
    <section className="relative w-full flex flex-col gap-10 px-5 pb-4 text-white">
      <img
        src="/images/homepage/bg-halo-mobile.png"
        alt="background"
        className="absolute -top-36 left-0 w-full h-auto z-0 opacity-80"
      />
      <GridBg className="absolute -top-36 w-full left-0 right-0 h-auto z-0 opacity-80" />
      <div className="relative z-10 flex flex-col items-center gap-7">
        <div className="h-[3px] w-16 holographic-bg rounded-full" />
        <TitleHomepage width="100%" />
        <div className="flex flex-col gap-1 text-[18px] leading-[22px] font-jakarta-semibold items-center">
          <div className="flex flex-row items-center gap-2">
            <Arrow className="w-4" />
            <p>Branding</p>
            <Arrow className="w-4" />
            <p>Print</p>
            <Arrow className="w-4" />
            <p>Digital</p>
            <Arrow className="w-4" />
            <p>Vidéo</p>
          </div>
          <div className="flex items-center gap-2">
            <Arrow className="w-4" />
            <p>Facilitation graphique</p>
            <Arrow className="w-4" />
            <p>Illustration</p>
          </div>
        </div>
        <p className="text-white text-[20px] leading-[25px] font-jakarta-semibold text-center">
          Say Yes réunit toutes les <br /> expertises créatives
        </p>
        <Button
          className="mt-2"
          type="border"
          label="Démarrer un projet"
          leftIcon={<ChatBuble color="white" className="w-6 h-6" />}
          textSize="S"
          onClick={openModalContact}
        />
      </div>

      <div className="relative filter w-full md:h-[100px] bottom-0 left-0 right-0 flex items-center overflow-hidden">
        {/* Overlay sombre à gauche */}
        <div className="absolute left-0 top-0 h-full w-[20px] bg-gradient-to-r from-[rgba(10,10,10,1)] to-transparent pointer-events-none z-10"></div>

        {/* Dégradé sombre à droite */}
        <div className="absolute right-0 top-0 h-full w-[20px] bg-gradient-to-l from-[rgba(10,10,10,1)] to-transparent pointer-events-none z-10"></div>

        <div className="inline-flex animate-scroll whitespace-nowrap scroll-right gap-10 z-24">
          <SvgLogoAllClients className="inline-block" />
          <SvgLogoAllClients className="inline-block" />
        </div>
      </div>

      <Card
        height="200px"
        borderRadius="14px"
        borderClass="light-border rounded-[14px]"
        content={
          <div
            className="size-full relative p-2 cursor-pointer shadow-lg"
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              src="/video/bureau.mp4"
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-[10px]"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className={`w-16 h-16 rounded-full backdrop-blur-2xl flex items-center justify-center transition-opacity duration-300 border border-white ${
                  isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
                }`}
              >
                {!isPlaying ? (
                  <Play className="w-10 h-10 text-white" fill="currentColor" />
                ) : (
                  <Pause className="w-9 h-9 text-white" fill="currentColor" />
                )}
              </div>
            </div>
          </div>
        }
      />
    </section>
  ) : (
    <div className="w-screen">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut", delay: 0.2 }}
        >
          <Suspense
            fallback={
              <div className="absolute left-0 w-full h-auto z-0 opacity-80" />
            }
          >
            <img
              src="/images/homepage/bg-section-1.png"
              alt="background"
              className="absolute -top-[88px] left-0 w-full h-auto z-0 opacity-80"
            />
            {/* <BackgroundHomepage className="absolute -top-20 left-0 w-full h-auto z-0 opacity-80" /> */}
          </Suspense>
        </motion.div>
      </AnimatePresence>
      <section className="relative z-10 md:w-[988px] mx-auto flex flex-col justify-center items-center overflow-hidden">
        <div className="flex flex-col items-center w-[988px] justify-center gap-9 py-20">
          <div className="h-[3px] md:w-36 w-20 holographic-bg rounded-full" />
          <TitleHomepage width={940} />

          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center gap-3 w-full justify-center text-white font-jakarta-semibold text-[28px]">
              <p>Branding</p>
              <Arrow className="w-[22px]" />
              <p>Print</p>
              <Arrow className="w-[22px]" />
              <p>Digital</p>
              <Arrow className="w-[22px]" />
              <p>Vidéo</p>
              <Arrow className="w-[22px]" />
              <p>Facilitation graphique</p>
              <Arrow className="w-[22px]" />
              <p>Illustration</p>
            </div>
            <p className="text-white font-jakarta-semibold text-[28px]">
              Say Yes réunit toutes les expertises créatives
            </p>
          </div>
          <Button
            className="mt-4"
            type="border"
            label="Démarrer un projet"
            leftIcon={<ChatBuble color="white" className="w-6 h-6" />}
            onClick={openModalContact}
          />
        </div>
        <Card
          height="620px"
          borderRadius="40px"
          content={
            <div
              className="size-full relative md:p-5 p-1 cursor-pointer shadow-lg"
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                src="/video/bureau.mp4"
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-[23px]"
              />

              {/* Bouton Play/Pause */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className={`w-20 h-20 rounded-full backdrop-blur-2xl flex items-center justify-center transition-opacity duration-300  border border-white ${
                    isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
                  }`}
                >
                  {!isPlaying ? (
                    <Play
                      className="w-14 h-14 text-white"
                      fill="currentColor"
                    />
                  ) : (
                    <Pause
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                    />
                  )}
                </div>
              </div>
            </div>
          }
          borderClass="light-border"
        />
      </section>
    </div>
  );
}
