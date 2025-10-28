import { useViewport } from "~/utils/hooks/useViewport";
import { cn } from "~/utils/ui/ui";

import "~/styles/tailwind.css";
import Arrow from "~/assets/icons/Arrow";
import { useNavigate } from "@remix-run/react";

interface PropsContent {
  imageUrl?: string;
  videoUrl?: string;
  titre?: string;
  topTitle?: string;
  slug?: string;
}

export default function ContentPortfolio({
  imageUrl,
  videoUrl,
  titre,
  topTitle,
  slug,
}: PropsContent) {
  const navigate = useNavigate();
  const imageClasses = cn(
    "h-full flex items-center justify-center md:rounded-[15px] rounded-[10px] relative card-image"
  );

  return (
    <div
      className="size-full relative overflow-hidden md:rounded-[15px] rounded-[10px] hover:rounded-[25px] md:p-2 p-1 cursor-pointer
      shadow-lg"
      onClick={() => {
        navigate(`/portfolio/${slug}`);
      }}
    >
      <div
        style={{
          backgroundImage: videoUrl ? undefined : `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className={`${imageClasses}`}
      >
        {/* Gradient overlay - seulement sur les 20% inférieurs */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,rgba(0,0,0,0.7)_80%,rgba(0,0,0,0.9)_100%)] md:rounded-[15px] rounded-[10px]" />
      </div>
      <div className="size-full absolute top-0 left-0 bottom-0 md:p-4 p-2">
        <div className="flex flex-col items-center justify-end w-full h-full p-4">
          <div className="flex flex-row items-center justify-between w-full md:p-4">
            <div className="flex flex-row justify-center items-center">
              <div className="self-stretch w-[3px] holographic-bg-vertical rounded-full mr-4" />
              <div className="flex flex-col items-start justify-center">
                <span className="text-white md:text-3xl text-[18px] font-jakarta-bold">
                  {titre}
                </span>
                <span className="text-white md:text-2xl text-[12px] font-jakarta">
                  {topTitle}
                </span>
              </div>
            </div>
            <Arrow className="w-8 h-8 md:w-12 md:h-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
