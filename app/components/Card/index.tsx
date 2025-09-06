import "~/styles/tailwind.css";
import { cn } from "~/utils/ui/ui";

interface CardProps {
  imageUrl: string;
  height: string;
  content?: React.ReactNode;
  borderClass?: string;
  imagesClass?: string;
}

export default function Card({
  imageUrl,
  content,
  height,
  borderClass,
  imagesClass,
}: CardProps) {
  //   const isMobile = useViewport();

  const containerClasses = cn(
    "border-custom w-full rounded-[25px] p-4 card-hover",
    borderClass
  );

  const imageClasses = cn(
    "h-full flex items-center justify-center rounded-[15px] card-image",
    imagesClass
  );

  return (
    <div className={containerClasses} style={{ height }}>
      <div
        className={imageClasses}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
        }}
      >
        {content}
      </div>
    </div>
  );
}
