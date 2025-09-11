import Coche from "~/assets/icons/Coche";
import Star from "~/assets/icons/Star";
import ArrowLight from "~/assets/icons/ArrowLight";
import Masque from "~/components/Card/components/Masque";
import { useViewport } from "~/utils/hooks/useViewport";
import { cn } from "~/utils/ui/ui";

import "~/styles/tailwind.css";
import Arrow from "~/assets/icons/Arrow";
import TitleCard1 from "~/components/Portfolio/components/TitleCard1";

interface PropsContent {
  imageUrl?: string;
  videoUrl?: string;
}

export default function ContentPortfolio({ imageUrl, videoUrl }: PropsContent) {
  const isMobile = useViewport();

  const imageClasses = cn(
    "h-full flex items-center justify-center rounded-[15px] relative card-image"
  );

  return (
    <div className="size-full relative overflow-hidden rounded-[15px] hover:rounded-[25px] md:p-4 p-2">
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
          <div className="flex flex-row items-center justify-between w-full">
            <TitleCard1 />
            <Arrow />
          </div>
        </div>
      </div>
    </div>
  );
}
