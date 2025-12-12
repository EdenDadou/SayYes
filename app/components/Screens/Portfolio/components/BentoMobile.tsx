import { memo, useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { BentoItem } from "~/server/portfolio.server";
import { getOptimizedImageUrl, generateSrcSet, generateSizes } from "~/utils/optimizeImage";
import "~/styles/tailwind.css";

// Fonction pour déterminer si un média est une vidéo
function isVideoFile(url: string): boolean {
  const isVideo = /\.(mp4|webm|ogg|mov|avi|mkv)(\?.*)?$/i.test(url);
  return isVideo;
}

// Composant image optimisé avec effet de flou au chargement et animation d'apparition
const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  className,
  index,
}: {
  src: string;
  alt: string;
  className: string;
  index: number;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Utiliser l'URL optimisée pour mobile
  const optimizedSrc = getOptimizedImageUrl(src, "mobile");
  const srcSet = generateSrcSet(src);
  const sizes = generateSizes();

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
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
    </motion.div>
  );
});

// Composant vidéo optimisé avec effet de flou et animation d'apparition
const OptimizedVideo = memo(function OptimizedVideo({
  src,
  className,
  index,
}: {
  src: string;
  className: string;
  index: number;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: false, margin: "100px" });

  // Fonction pour tenter de lancer la vidéo
  const attemptPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});
  };

  // Déclencher la lecture quand la vidéo entre dans le viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      attemptPlay();
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover object-center transition-all duration-500"
        style={{
          filter: isLoaded ? "blur(0px)" : "blur(8px)",
          transform: isLoaded ? "scale(1)" : "scale(1.02)",
        }}
        onLoadedMetadata={attemptPlay}
        onCanPlay={() => {
          setIsLoaded(true);
          attemptPlay();
        }}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
      >
        Votre navigateur ne prend pas en charge la lecture de vidéos.
      </video>
    </motion.div>
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

  let globalIndex = 0;

  return bento.lines
    .filter((line) => line.format !== "3 square")
    .map((line, lineIndex) => (
      <div key={lineIndex} className="gap-4 w-full flex flex-col m-auto">
        {line.listImage &&
          line.listImage.map((image, imageIndex) => {
            const heightClass = getHeightClass(line.format, imageIndex);
            const containerClass = `rounded-[16px] overflow-hidden ${heightClass} w-full`;
            const currentIndex = globalIndex++;

            return isVideoFile(image) ? (
              <OptimizedVideo
                key={imageIndex}
                src={image}
                className={containerClass}
                index={currentIndex}
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
                index={currentIndex}
              />
            );
          })}
      </div>
    ));
});

export default BentoMobile;
