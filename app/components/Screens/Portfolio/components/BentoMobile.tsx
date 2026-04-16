import { memo, useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { BentoItem } from "~/server/portfolio.server";
import {
  getOptimizedImageUrl,
  generateSrcSet,
  generateSizes,
} from "~/utils/optimizeImage";
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
  const isInView = useInView(ref, { once: true, margin: "300px" });

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
        className="w-full h-auto object-contain transition-all duration-500"
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
  const srcRef = useRef(src);
  // Sync srcRef if src prop changes after mount
  useEffect(() => {
    srcRef.current = src;
  }, [src]);
  const isInView = useInView(ref, { once: false, margin: "300px" });

  // Pré-charger la vidéo 600px avant d'entrer dans le viewport
  useEffect(() => {
    const wrapper = ref.current;
    const video = videoRef.current;
    if (!wrapper || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && video) {
          video.src = srcRef.current;
          observer.disconnect();
        }
      },
      { rootMargin: "600px" }
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  // Guard intentionnel : si src n'est pas encore assigné (observer en attente),
  // on retourne tôt. onCanPlay/onLoadedMetadata relancent attemptPlay dès que src est prêt.
  const attemptPlay = () => {
    const video = videoRef.current;
    if (!video || !video.src) return;
    video.muted = true;
    video.play().catch(() => {});
  };

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
        className="w-full h-auto object-contain transition-all duration-500"
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
        loop
        playsInline
        preload="none"
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

  let globalIndex = 0;

  return (
    <div className="flex flex-col gap-4 w-full">
      {bento.lines.map((line) =>
        line.listImage?.map((image, imageIndex) => {
          const containerClass = "rounded-[16px] overflow-hidden w-full";
          const currentIndex = globalIndex++;

          return isVideoFile(image) ? (
            <OptimizedVideo
              key={`${currentIndex}-${imageIndex}`}
              src={image}
              className={containerClass}
              index={currentIndex}
            />
          ) : (
            <OptimizedImage
              key={`${currentIndex}-${imageIndex}`}
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
        })
      )}
    </div>
  );
});

export default BentoMobile;
