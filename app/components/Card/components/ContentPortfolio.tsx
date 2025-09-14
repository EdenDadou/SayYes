import { useViewport } from "~/utils/hooks/useViewport";
import { cn } from "~/utils/ui/ui";

import "~/styles/tailwind.css";
import Arrow from "~/assets/icons/Arrow";
import { useNavigate } from "@remix-run/react";

interface PropsContent {
  imageUrl?: string;
  videoUrl?: string;
  titre?: string;
  slug?: string;
}

export default function ContentPortfolio({
  imageUrl,
  videoUrl,
  titre,
  slug,
}: PropsContent) {
  const navigate = useNavigate();
  const imageClasses = cn(
    "h-full flex items-center justify-center rounded-[15px] relative card-image"
  );

  return (
    <div
      className="size-full relative overflow-hidden rounded-[15px] hover:rounded-[25px] md:p-4 p-2 cursor-pointer"
      onClick={() => {
        navigate(`/portfolio/${slug}`);
      }}
    >
      <div
        className={imageClasses}
        style={{
          backgroundImage: videoUrl ? undefined : `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="size-full absolute top-0 left-0 bottom-0">
        <div className="flex flex-col items-center justify-end w-full h-full p-4 bg-gradient-to-b from-transparent via-black/70 to-black/90">
          <div className="flex flex-row items-center justify-between w-full p-4 ">
            <div className="flex flex-row justify-center items-center ">
              <div className="h-[3px] w-14 holographic-bg rotate-90" />
              <div className="flex flex-col items-start justify-center">
                <span className="text-white text-3xl font-jakarta-bold">
                  {titre}
                </span>
                <span className="text-white text-2xl font-jakarta">
                  {titre}
                </span>
              </div>
            </div>
            <Arrow />
          </div>
        </div>
      </div>
    </div>
  );
}
