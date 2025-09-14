import Coche from "~/assets/icons/Coche";
import Star from "~/assets/icons/Star";
import ArrowLight from "~/assets/icons/ArrowLight";
import Masque from "~/components/Card/components/Masque";
import { useViewport } from "~/utils/hooks/useViewport";
import { cn } from "~/utils/ui/ui";

import "~/styles/tailwind.css";

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

  const backgroundMobile = isMobile
    ? "bg-gradient-to-b from-transparent via-black/70 to-black/90"
    : "";

  const imageClasses = cn(
    "h-full flex items-center justify-center rounded-[15px] relative "
  );

  return (
    <div className="size-full md:p-4 p-2">
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
          <div
            className={`relative w-full h-full flex flex-col items-center justify-center ${backgroundMobile}`}
          >
            {!isMobile ? (
              <Masque className="absolute inset-0 w-full h-full object-contain rounded-xl z-0" />
            ) : null}
            {/* Contenu au premier plan */}
            <div className="relative z-10 flex flex-col items-start md:justify-center justify-end size-full px-4 md:px-20 gap-4">
              <div className="flex flex-row items-center justify-center gap-2 ">
                <Star className="w-4 h-4" />
                <h2 className="text-lg">{subtitle}</h2>
              </div>
              <span className="flex flex-col items-start justify-center gap-2 font-jakarta-bold md:text-[50px] md:leading-[50px] text-[30px] leading-[30px]">
                <span>{title1}</span>
                <span className="flex flex-row items-center justify-center gap-2 holographic-text">
                  <ArrowLight className="w-10 h-10" />
                  {title2}
                </span>
              </span>
              <div className="flex flex-col items-start justify-center gap-2 font-jakarta text-[12px] md:text-[16px] md:mt-6">
                {bulletPoints.map((bullet) => (
                  <span
                    className="flex flex-row items-center justify-center gap-2"
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
