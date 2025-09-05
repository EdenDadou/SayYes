import "~/styles/tailwind.css";
import Masque from "./components/Masque";

interface CardProps {
  imageUrl: string;
  content?: any;
}

export default function Card({ imageUrl, content }: CardProps) {
  //   const isMobile = useViewport();

  return (
    <div className="border-custom media-object h-[560px] w-full rounded-[25px] p-4">
      <div
        className="h-full flex items-center justify-center rounded-[15px]"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Masque className="w-full h-full object-contain rounded-xl" />
      </div>
    </div>
  );
}
