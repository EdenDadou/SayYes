import Coche from "~/assets/icons/Coche";
import Star from "~/assets/icons/Star";
import ArrowLight from "~/assets/icons/ArrowLight";
import Masque from "~/components/Card/components/Masque";
import "~/styles/tailwind.css";

interface PropsContent {
  subtitle: string;
  title1: string;
  title2: string;
  bulletPoints: string[];
}

export default function Content({
  subtitle,
  title1,
  title2,
  bulletPoints,
}: PropsContent) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Masque en arrière-plan */}
      <Masque className="absolute inset-0 w-full h-full object-contain rounded-xl z-0" />
      {/* Contenu au premier plan */}
      <div className="relative z-10 flex flex-col items-start justify-center size-full px-20 gap-4">
        <div className="flex flex-row items-center justify-center gap-2 ">
          <Star className="w-4 h-4" />
          <h2 className="text-lg">{subtitle}</h2>
        </div>
        <span className="flex flex-col items-start justify-center gap-2 font-jakarta-bold text-[50px] leading-[50px]">
          <span>{title1}</span>
          <span className="flex flex-row items-center justify-center gap-2 holographic-text">
            <ArrowLight className="w-10 h-10" />
            {title2}
          </span>
        </span>
        <div className="flex flex-col items-start justify-center gap-2 font-jakarta text-[16px]">
          {bulletPoints.map((bullet) => (
            <span className="flex flex-row items-center justify-center gap-2">
              <Coche />
              {bullet}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
