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
        <div className="absolute inset-0 size-fullz-20" />
        {videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
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
        {/* Masque avec transparence en haut pour laisser voir l'image/vidéo */}
        <div
          className="absolute inset-0 size-full z-10 rounded-[16px]"
          style={{
            backgroundImage: "url(/images/solutions/MasqueMobile.png)",
            backgroundSize: "cover",
            maskImage: "linear-gradient(to top, gray 50%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 60%, transparent 100%)",
          }}
        />
        <div className="relative w-full h-full flex flex-col items-center justify-center z-20 pb-16 px-2">
          <div className="relative z-10 flex flex-col items-start md:justify-center justify-end size-full px-4 md:px-20 gap-4">
            {subtitle !== "last" && (
              <div className="flex flex-row items-center justify-center gap-2 text-[#9DA4AA]">
                <Star className="w-4 h-4" fill="rgb(255 255 255 / 0.5)" />
                <h2 className="text-[13px]">Say Yes</h2>
              </div>
            )}
            <span className="flex flex-col items-start justify-center gap-2 font-jakarta-semi-bold text-[30px] leading-[30px] tracking-[-2px]">
              <span>{title1}</span>
              <span className="flex flex-row items-center justify-center gap-1 holographic-text whitespace-nowrap pb-2">
                <ArrowLight className="w-8 h-8" />
                {title2}
              </span>
            </span>
            <div className="flex flex-col items-start justify-center gap-3 font-jakarta text-[12px] md:text-[16px] md:mt-6">
              {bulletPoints.map((bullet) => (
                <span className="flex flex-row items-start gap-2" key={bullet}>
                  <Coche className="flex-shrink-0 w-4" />
                  <span className="leading-tight text-[16px]">{bullet}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
