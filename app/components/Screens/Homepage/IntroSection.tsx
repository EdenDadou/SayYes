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
import Play from "~/assets/icons/Play";
import Pause from "~/assets/icons/Pause";

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
    <div className="w-screen">
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
      <section className="relative z-10 md:w-[988px] mx-auto flex flex-col justify-center items-center overflow-hidden gap-16">
        <div className="flex flex-col items-center w-[988px] justify-center gap-10 py-20">
          <div className="h-[3px] md:w-36 w-20 holographic-bg rounded-full" />
          <TitleHomepage width={940} />

          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center gap-3 w-full justify-center text-white font-jakarta-semibold text-[28px]">
              <p>Branding</p>
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
            <p className="text-white font-jakarta-semibold text-[28px]">
              Say Yes réunit toutes les expertises créatives
            </p>
          </div>
          <Button
            className="mt-4"
            type="border"
            label="Démarrer un projet"
            leftIcon={<ChatBuble color="white" className="w-6 h-6" />}
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
