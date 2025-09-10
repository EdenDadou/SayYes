import "~/styles/tailwind.css";
import { cn } from "~/utils/ui/ui";
import Masque from "~/components/Card/components/Masque";
import { useViewport } from "~/utils/hooks/useViewport";

interface CardProps {
  imageUrl?: string;
  videoUrl?: string;
  height: string;
  content?: React.ReactNode;
  borderClass?: string;
  imagesClass?: string;
}

export default function Card({
  imageUrl,
  videoUrl,
  content,
  height,
  borderClass,
  imagesClass,
}: CardProps) {
  const isMobile = useViewport();

  const containerClasses = cn(
    "border-custom w-full rounded-[25px] md:p-4 p-2",
    borderClass
  );

  const imageClasses = cn(
    "h-full flex items-center justify-center rounded-[15px] relative",
    imagesClass
  );

  return (
    <div className={containerClasses} style={{ height }}>
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

        {!isMobile ? (
          <Masque className="absolute inset-0 w-full h-full object-contain rounded-xl z-0" />
        ) : null}
        <div className="size-full relative">{content}</div>
      </div>
    </div>
  );
}
