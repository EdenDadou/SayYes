import { memo, useState } from "react";
import { BentoItem } from "~/server/portfolio.server";
import { getOptimizedImageUrl, generateSrcSet, generateSizes } from "~/utils/optimizeImage";
import "~/styles/tailwind.css";

// Fonction pour déterminer si un média est une vidéo
function isVideoFile(url: string): boolean {
  const isVideo = /\.(mp4|webm|ogg|mov|avi|mkv)(\?.*)?$/i.test(url);
  return isVideo;
}

// Composant image optimisé avec effet de flou au chargement
const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Utiliser l'URL optimisée pour mobile
  const optimizedSrc = getOptimizedImageUrl(src, "mobile");
  const srcSet = generateSrcSet(src);
  const sizes = generateSizes();

  return (
    <div className={`relative ${className}`}>
      <img
        src={optimizedSrc}
        srcSet={srcSet || undefined}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        className="w-full h-full object-cover object-center transition-all duration-500"
        style={{
          filter: isLoaded ? "blur(0px)" : "blur(8px)",
          transform: isLoaded ? "scale(1)" : "scale(1.02)",
        }}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
});

// Composant vidéo optimisé avec effet de flou
const OptimizedVideo = memo(function OptimizedVideo({
  src,
  className,
}: {
  src: string;
  className: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <video
        src={src}
        className="w-full h-full object-cover object-center transition-all duration-500"
        style={{
          filter: isLoaded ? "blur(0px)" : "blur(8px)",
          transform: isLoaded ? "scale(1)" : "scale(1.02)",
        }}
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setIsLoaded(true)}
      >
        Votre navigateur ne prend pas en charge la lecture de vidéos.
      </video>
    </div>
  );
});

const BentoMobile = memo(function BentoMobile({ bento }: { bento: BentoItem }) {
  if (!bento || !bento.lines || bento.lines.length === 0) {
    return null;
  }

  const getHeightClass = (format: string, imageIndex: number): string => {
    switch (format) {
      case "1/3 - 2/3":
        return imageIndex === 1 ? "h-[286px]" : "h-[222px]";
      case "2/3 - 1/3":
        return imageIndex === 0 ? "h-[286px]" : "h-[222px]";
      case "banner":
        return "h-[180px]";
      case "3 square":
        return "w-[319px] h-[319px]";
      case "2 square":
        return "grid-cols-2";
      case "full":
        return "h-[620px]";
      default:
        return "aspect-square";
    }
  };

  return bento.lines
    .filter((line) => line.format !== "3 square")
    .map((line, lineIndex) => (
      <div key={lineIndex} className="gap-4 w-full flex flex-col m-auto">
        {line.listImage &&
          line.listImage.map((image, imageIndex) => {
            const heightClass = getHeightClass(line.format, imageIndex);
            const containerClass = `rounded-[16px] overflow-hidden ${heightClass} w-full`;

            return isVideoFile(image) ? (
              <OptimizedVideo
                key={imageIndex}
                src={image}
                className={containerClass}
              />
            ) : (
              <OptimizedImage
                key={imageIndex}
                src={image}
                alt={
                  line.listImageAlt?.[imageIndex] ||
                  image.split("/").pop()?.split(".")[0] ||
                  `Image ${imageIndex + 1}`
                }
                className={containerClass}
              />
            );
          })}
      </div>
    ));
});

export default BentoMobile;
