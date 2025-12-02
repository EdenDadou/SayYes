import Coche from "~/assets/icons/Coche";
import Star from "~/assets/icons/Star";
import ArrowLight from "~/assets/icons/ArrowLight";
import { useViewport } from "~/utils/hooks/useViewport";
import { cn } from "~/utils/ui/ui";

import "~/styles/tailwind.css";
import MasqueMobile from "./MasqueMobile";

interface PropsContent {
  imageUrl?: string;
  videoUrl?: string;
  subtitle: string;
  title1: string;
  title2: string;
  bulletPoints: string[];
}

export default function ContentSolutionMobile({
  imageUrl,
  videoUrl,
  subtitle,
  title1,
  title2,
  bulletPoints,
}: PropsContent) {
  const imageClasses = cn(
    "h-full flex items-center justify-center rounded-[15px] relative"
  );

  return (
    <div className="size-full p-2">
      <div className="size-full relative overflow-hidden rounded-[18px]">
        <div className="absolute inset-0 size-full bg-gradient-to-b from-transparent via-black/70 to-black/10 z-20" />
        <MasqueMobile className="absolute bottom-14 size-full object-cover z-10 rounded-[16px] blur-[80px]" />
        {videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            className="absolute inset-0 w-full h-full object-cover rounded-t-[15px] z-0"
            style={{
              backgroundPosition: "top",
              height: "60%",
            }}
          />
        ) : (
          <div
            className={imageClasses}
            style={{
              backgroundImage: videoUrl ? undefined : `url(${imageUrl})`,
              backgroundSize: "200% 60%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top right",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        )}
        <div className="relative w-full h-full flex flex-col items-center justify-center z-20 pb-16 px-2">
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
  );
}
