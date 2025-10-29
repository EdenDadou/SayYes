import Coche from "~/assets/icons/Coche";
import Star from "~/assets/icons/Star";
import ArrowLight from "~/assets/icons/ArrowLight";
import Masque from "~/components/Card/components/Solution/Masque";
import { useViewport } from "~/utils/hooks/useViewport";
import { cn } from "~/utils/ui/ui";

import "~/styles/tailwind.css";
import ContentSolutionMobile from "./ContentSolutionMobile";

interface PropsContent {
  imageUrl?: string;
  videoUrl?: string;
  subtitle: string;
  title1: string;
  title2: string;
  bulletPoints: string[];
}

export default function ContentSolution({
  imageUrl,
  videoUrl,
  subtitle,
  title1,
  title2,
  bulletPoints,
}: PropsContent) {
  const isMobile = useViewport();

  const imageClasses = cn(
    "h-full flex items-center justify-center rounded-[16px] relative "
  );

  return isMobile ? (
    <ContentSolutionMobile
      imageUrl={imageUrl}
      videoUrl={videoUrl}
      subtitle={subtitle}
      title1={title1}
      title2={title2}
      bulletPoints={bulletPoints}
    />
  ) : (
    <div className="size-full md:p-3 p-2">
      <div
        className={imageClasses}
        style={{
          backgroundImage: videoUrl ? undefined : `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            className="absolute inset-0 w-full h-full object-cover rounded-[15px] z-0"
          />
        ) : null}

        <div className="size-full relative">
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <Masque className="absolute inset-0 w-[80%] h-full object-contain rounded-xl z-0" />
            {/* Contenu au premier plan */}
            <div className="relative z-10 flex flex-col items-start justify-center size-full gap-4 px-20">
              {subtitle !== "last" && (
                <div className="flex flex-row items-center justify-center gap-2 text-white/30">
                  <Star className="w-4 h-4" fill="rgb(255 255 255 / 0.3)" />
                  <h2 className="text-lg">Say Yes</h2>
                </div>
              )}
              <span className="flex flex-col items-start justify-center font-jakarta-bold md:text-[50px] md:leading-[60px] text-[30px] leading-[36px] tracking-[-2.5px]">
                <span>{title1}</span>
                <span className="flex flex-row items-center justify-center -mt-2 gap-2 holographic-text">
                  <ArrowLight className="w-10 h-10" />
                  {title2}
                </span>
              </span>
              <div className="flex flex-col items-start justify-center gap-2 font-jakarta text-[12px] md:text-[20px] md:mt-4">
                {bulletPoints.map((bullet) => (
                  <span
                    className="flex flex-row items-center justify-center gap-[10px]"
                    key={bullet}
                  >
                    <Coche />
                    {bullet}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
